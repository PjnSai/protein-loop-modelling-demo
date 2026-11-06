export const switchViewer = (
  newViewerType,
  currentViewerType,
  cleanup,
  setIsLoading,
  setViewerType,
  setViewerKey,
  setRepresentation,
  viewerRef,
) => {
  if (newViewerType === currentViewerType) return;

  setIsLoading(true);
  cleanup();

  setViewerType(newViewerType);
  setViewerKey((prev) => prev + 1);

  setRepresentation("cartoon");

  setTimeout(() => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML = "";
    }
  }, 50);
};

export const changeRepresentation = (
  newRepr,
  currentRepresentation,
  setRepresentation,
) => {
  if (newRepr === currentRepresentation) return;
  setRepresentation(newRepr);
};

export const centreView = (stageRef, viewerReady, viewerType) => {
  if (!stageRef.current || !viewerReady) return;

  try {
    if (viewerType === "ngl") {
      stageRef.current.autoView(100);

      setTimeout(() => {
        if (stageRef.current && stageRef.current.viewer) {
          stageRef.current.viewer.requestRender();
        }
      }, 100);
    } else {
      stageRef.current.zoomTo();
      stageRef.current.render();
    }
  } catch (err) {
    console.error("Error centring view:", err);
  }
};

export const resetViewer = (cleanup, setViewerKey, initialiseViewer) => {
  cleanup();

  setViewerKey((prev) => prev + 1);

  setTimeout(() => {
    initialiseViewer();
  }, 100);
};
