export const initialise3DMol = (
  viewerRef,
  pdbContent,
  representation,
  applyStyleCallback,
) => {
  return new Promise((resolve, reject) => {
    const init3DMol = () => {
      if (window.$3Dmol) {
        try {
          if (viewerRef.current) {
            viewerRef.current.innerHTML = "";
          }

          const config = {
            backgroundColor: "white",
            antialias: true,
            preserveDrawingBuffer: false,
            alpha: false,
          };

          const viewer = window.$3Dmol.createViewer(viewerRef.current, config);

          viewer.addModel(pdbContent, "pdb");

          applyStyleCallback(viewer, representation);

          viewer.zoomTo();
          viewer.render(() => {
            resolve(viewer);
          });
        } catch (err) {
          reject(err);
        }
      } else {
        // Retry if 3DMol library not loaded yet
        setTimeout(init3DMol, 100);
      }
    };

    init3DMol();
  });
};

export const initialiseNGL = (
  viewerRef,
  pdbContent,
  representation,
  applyRepresentationCallback,
) => {
  return new Promise((resolve, reject) => {
    const initNGL = () => {
      if (window.NGL) {
        try {
          if (viewerRef.current) {
            viewerRef.current.innerHTML = "";
          }

          const stage = new window.NGL.Stage(viewerRef.current, {
            backgroundColor: "white",
            quality: "medium",
            sampleLevel: 1,
            workerDefault: true,
            impostor: true,
          });

          const blob = new Blob([pdbContent], { type: "text/plain" });

          stage
            .loadFile(blob, { ext: "pdb" })
            .then((structure) => {
              stage.structure = structure;

              applyRepresentationCallback(structure, representation);

              setTimeout(() => {
                stage.autoView();
              }, 100);

              resolve(stage);
            })
            .catch(reject);
        } catch (err) {
          reject(err);
        }
      } else {
        // Retry if NGL library not loaded yet
        setTimeout(initNGL, 100);
      }
    };

    initNGL();
  });
};

export const initialiseViewer = async (
  viewerType,
  viewerRef,
  pdbContent,
  representation,
  applyVisualisationStyle,
  applyNGLRepresentation,
) => {
  if (!pdbContent || !viewerRef.current) {
    throw new Error("Missing PDB content or viewer container");
  }

  if (viewerType === "3dmol") {
    return await initialise3DMol(
      viewerRef,
      pdbContent,
      representation,
      applyVisualisationStyle,
    );
  } else if (viewerType === "ngl") {
    return await initialiseNGL(
      viewerRef,
      pdbContent,
      representation,
      applyNGLRepresentation,
    );
  } else {
    throw new Error(`Unknown viewer type: ${viewerType}`);
  }
};
