import React, { useEffect, useRef, useState, useCallback } from "react";

import ViewerControls from "./viewer/ViewerControls";
import ViewerErrorDisplay from "./viewer/ViewerErrorDisplay";
import ViewerLegend from "./viewer/ViewerLegend";
import ViewerLoadingOverlay from "./viewer/ViewerLoadingOverlay";
import ViewerInfoOverlay from "./viewer/ViewerInfoOverlay";
import ViewerNoDataDisplay from "./viewer/ViewerNoDataDisplay";

import {
  apply3DMolStyle,
  applyNGLRepresentation,
} from "./viewer/viewerStyleUtils";
import {
  useViewerDimensions,
  useViewerExpansion,
} from "./viewer/useViewerDimensions";
import { initialiseViewer as initViewerUtil } from "./viewer/viewerInitUtils";
import {
  switchViewer as switchViewerUtil,
  changeRepresentation as changeRepresentationUtil,
  centreView as centreViewUtil,
  resetViewer as resetViewerUtil,
} from "./viewer/viewerControlUtils";

const ProteinViewer = ({
  pdbContent,
  pdbCode,
  selectedChain = "A",
  segmentStart = null,
  segmentEnd = null,
  height = 400,
  showControls = true,
  isModelledStructure = false,
}) => {
  const viewerRef = useRef(null);
  const stageRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewerType, setViewerType] = useState("3dmol");
  const [representation, setRepresentation] = useState("cartoon");
  const [viewerReady, setViewerReady] = useState(false);
  const [lastSuccessfulStyle, setLastSuccessfulStyle] = useState("cartoon");

  const { isExpanded, toggleExpanded } = useViewerExpansion();
  const { currentHeight, setCurrentHeight, calculateViewerHeight } =
    useViewerDimensions(height, isExpanded);

  const [viewerKey, setViewerKey] = useState(0);

  const cleanup = useCallback(() => {
    try {
      if (stageRef.current) {
        if (viewerType === "ngl" && stageRef.current.dispose) {
          stageRef.current.dispose();
        } else if (viewerType === "3dmol") {
          try {
            stageRef.current.removeAllModels();
            stageRef.current.removeAllSurfaces();
            stageRef.current.clear();
          } catch (cleanupError) {
            console.warn("3DMol cleanup warning:", cleanupError);
          }
        }
      }
      stageRef.current = null;
      setViewerReady(false);
    } catch (e) {
      console.warn("Cleanup error:", e);
    }

    if (viewerRef.current) {
      viewerRef.current.innerHTML = "";
    }
  }, [viewerType]);

  useEffect(() => {
    setCurrentHeight(calculateViewerHeight());

    if (viewerReady && stageRef.current && viewerType === "ngl") {
      setTimeout(() => {
        if (stageRef.current && stageRef.current.autoView) {
          stageRef.current.handleResize();
          stageRef.current.autoView(500);

          setTimeout(() => {
            if (stageRef.current && stageRef.current.autoView) {
              stageRef.current.handleResize();
              stageRef.current.autoView(250);
            }
          }, 100);
        }
      }, 250);
    }
  }, [
    isExpanded,
    calculateViewerHeight,
    viewerReady,
    viewerType,
    setCurrentHeight,
  ]);

  const handleToggleExpanded = useCallback(() => {
    toggleExpanded();
  }, [toggleExpanded]);

  const applyVisualisationStyle = useCallback(
    (viewer, style) => {
      apply3DMolStyle(
        viewer,
        style,
        selectedChain,
        segmentStart,
        segmentEnd,
        isModelledStructure,
      );
    },
    [selectedChain, segmentStart, segmentEnd, isModelledStructure],
  );

  const applyNGLRepresentationCallback = useCallback(
    (structure, style) => {
      applyNGLRepresentation(
        structure,
        style,
        selectedChain,
        segmentStart,
        segmentEnd,
        isModelledStructure,
      );
    },
    [selectedChain, segmentStart, segmentEnd, isModelledStructure],
  );

  useEffect(() => {
    if (viewerReady && stageRef.current) {
      updateVisualisation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [representation, selectedChain, segmentStart, segmentEnd, viewerReady]);

  const updateVisualisation = useCallback(() => {
    if (!stageRef.current || !viewerReady) return;

    try {
      if (viewerType === "3dmol") {
        applyVisualisationStyle(stageRef.current, representation);
      } else if (viewerType === "ngl" && stageRef.current.structure) {
        applyNGLRepresentationCallback(
          stageRef.current.structure,
          representation,
        );

        setTimeout(() => {
          if (stageRef.current) {
            stageRef.current.autoView();
          }
        }, 200);
      }
      setLastSuccessfulStyle(representation);
    } catch (err) {
      console.error("Error updating visualisation:", err);
      if (representation !== lastSuccessfulStyle) {
        setRepresentation(lastSuccessfulStyle);
      }
    }
  }, [
    viewerType,
    representation,
    viewerReady,
    applyVisualisationStyle,
    applyNGLRepresentationCallback,
    lastSuccessfulStyle,
  ]);

  const initialiseViewer = useCallback(async () => {
    if (!pdbContent || !viewerRef.current) {
      setError("Missing PDB content or viewer container");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    setViewerReady(false);

    cleanup();

    // Ensure DOM is clean before initialisation
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const viewer = await initViewerUtil(
        viewerType,
        viewerRef,
        pdbContent,
        representation,
        applyVisualisationStyle,
        applyNGLRepresentationCallback,
      );
      stageRef.current = viewer;
      setViewerReady(true);
      setLastSuccessfulStyle(representation);
    } catch (err) {
      console.error("Viewer initialisation error:", err);
      setError(
        `Failed to initialise ${viewerType.toUpperCase()} viewer: ${err.message}`,
      );
      setViewerReady(false);
    } finally {
      setIsLoading(false);
    }
  }, [
    pdbContent,
    viewerType,
    cleanup,
    representation,
    applyVisualisationStyle,
    applyNGLRepresentationCallback,
  ]);

  useEffect(() => {
    if (pdbContent && viewerRef.current) {
      initialiseViewer();
    }
    return cleanup;
  }, [pdbContent, viewerType, initialiseViewer, cleanup]);

  const switchViewer = useCallback(
    (newViewerType) => {
      switchViewerUtil(
        newViewerType,
        viewerType,
        cleanup,
        setIsLoading,
        setViewerType,
        setViewerKey,
        setRepresentation,
        viewerRef,
      );
    },
    [viewerType, cleanup],
  );

  const changeRepresentation = useCallback(
    (newRepr) => {
      changeRepresentationUtil(newRepr, representation, setRepresentation);
    },
    [representation],
  );

  const centreView = useCallback(() => {
    centreViewUtil(stageRef, viewerReady, viewerType);
  }, [viewerReady, viewerType]);

  const resetViewer = useCallback(() => {
    resetViewerUtil(cleanup, setViewerKey, initialiseViewer);
  }, [cleanup, initialiseViewer]);

  if (error) {
    return (
      <ViewerErrorDisplay
        error={error}
        height={height}
        viewerType={viewerType}
        onResetViewer={resetViewer}
        onSwitchViewer={switchViewer}
      />
    );
  }

  if (!pdbContent) {
    return <ViewerNoDataDisplay height={height} />;
  }

  return (
    <div className="protein-viewer-container" key={viewerKey}>
      <ViewerControls
        viewerType={viewerType}
        representation={representation}
        isLoading={isLoading}
        viewerReady={viewerReady}
        selectedChain={selectedChain}
        segmentStart={segmentStart}
        segmentEnd={segmentEnd}
        isModelledStructure={isModelledStructure}
        isExpanded={isExpanded}
        onSwitchViewer={switchViewer}
        onChangeRepresentation={changeRepresentation}
        onCentreView={centreView}
        onResetViewer={resetViewer}
        onToggleExpanded={handleToggleExpanded}
        showControls={showControls}
      />
      <div
        className="position-relative bg-white border"
        style={{
          height: `${currentHeight}px`,
          width: "100%",
          transition: "height 0.3s ease-in-out",
        }}
      >
        <ViewerLoadingOverlay isLoading={isLoading} viewerType={viewerType} />
        <div
          ref={viewerRef}
          style={{
            width: "100%",
            height: "100%",
            minHeight: `${currentHeight}px`,
          }}
        />
        <ViewerInfoOverlay
          pdbCode={pdbCode}
          viewerReady={viewerReady}
          selectedChain={selectedChain}
          segmentStart={segmentStart}
          segmentEnd={segmentEnd}
          isModelledStructure={isModelledStructure}
          isExpanded={isExpanded}
        />
      </div>
      <ViewerLegend
        showControls={showControls}
        selectedChain={selectedChain}
        segmentStart={segmentStart}
        segmentEnd={segmentEnd}
        isModelledStructure={isModelledStructure}
        viewerType={viewerType}
        representation={representation}
        viewerReady={viewerReady}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default ProteinViewer;
