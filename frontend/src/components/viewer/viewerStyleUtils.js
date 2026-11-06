export const getHighlightingStrategy = (
  viewerType,
  style,
  isModelledStructure,
) => {
  const strategies = {
    "3dmol": {
      cartoon: {
        color: isModelledStructure ? "#FF0000" : "#000000",
        method: isModelledStructure ? "color" : "outline",
      },
      line: {
        color: isModelledStructure ? "#FF6600" : "#FF0000",
        method: "thick_red",
      },
      stick: {
        color: isModelledStructure ? "#00AA00" : "#00FF00",
        method: "color",
      },
      sphere: {
        color: isModelledStructure ? "#AA00AA" : "#FF00FF",
        method: "color",
      },
    },
  };

  const viewerStrategies = strategies[viewerType] || strategies["3dmol"];
  return viewerStrategies[style] || { color: "#FFFF00", method: "color" };
};

export const get3DMolStyle = (style) => {
  switch (style) {
    case "cartoon":
      return { cartoon: { color: "spectrum" } };
    case "line":
      return { line: { color: "spectrum" } };
    case "stick":
      return { stick: { color: "spectrum", radius: 0.2 } };
    case "sphere":
      return { sphere: { color: "spectrum", radius: 0.5 } };
    default:
      return { cartoon: { color: "spectrum" } };
  }
};

export const getNGLStyle = (style) => {
  switch (style) {
    case "cartoon":
      return "cartoon";
    case "line":
      return "backbone";
    case "stick":
      return "licorice";
    case "sphere":
      return "hyperball";
    default:
      return "cartoon";
  }
};

export const apply3DMolStyle = (
  viewer,
  style,
  selectedChain,
  segmentStart,
  segmentEnd,
  isModelledStructure,
) => {
  if (!viewer) return;

  try {
    viewer.setStyle({}, {});

    const baseStyle = get3DMolStyle(style);
    viewer.setStyle({}, baseStyle);

    if (selectedChain) {
      viewer.setStyle(
        { chain: selectedChain },
        { ...baseStyle, color: "blue" },
      );
    }

    if (selectedChain && segmentStart && segmentEnd) {
      const residues = [];
      for (let i = segmentStart; i <= segmentEnd; i++) {
        residues.push(i);
      }

      const strategy = getHighlightingStrategy(
        "3dmol",
        style,
        isModelledStructure,
      );

      if (style === "cartoon") {
        if (strategy.method === "outline") {
          viewer.addStyle(
            { chain: selectedChain, resi: residues },
            {
              stick: {
                color: strategy.color,
                radius: 0.3,
                opacity: 0.8,
              },
            },
          );
        } else {
          viewer.setStyle(
            { chain: selectedChain, resi: residues },
            { cartoon: { color: strategy.color, thickness: 0.8 } },
          );
        }
      } else if (style === "line") {
        viewer.setStyle(
          { chain: selectedChain, resi: residues },
          {
            line: {
              color: strategy.color,
              linewidth: 6,
              opacity: 1.0,
            },
          },
        );
      } else if (style === "stick") {
        viewer.setStyle(
          { chain: selectedChain, resi: residues },
          { stick: { color: strategy.color, radius: 0.4 } },
        );
      } else if (style === "sphere") {
        viewer.setStyle(
          { chain: selectedChain, resi: residues },
          { sphere: { color: strategy.color, radius: 0.8 } },
        );
      }
    }

    viewer.render();
  } catch (err) {
    console.error("Error applying 3DMol style:", err);
    // Fall back to a basic cartoon representation
    try {
      viewer.setStyle({}, { cartoon: { color: "spectrum" } });
      viewer.render();
    } catch (fallbackError) {
      console.error("3DMol fallback styling failed:", fallbackError);
    }
  }
};

export const applyNGLRepresentation = (
  structure,
  style,
  selectedChain,
  segmentStart,
  segmentEnd,
  isModelledStructure,
) => {
  if (!structure) return;

  try {
    structure.removeAllRepresentations();

    const nglStyle = getNGLStyle(style);

    structure.addRepresentation(nglStyle, {
      color: "chainname",
      opacity: 0.8,
    });

    if (selectedChain && segmentStart && segmentEnd) {
      const highlightParams = {
        sele: `:${selectedChain} and ${segmentStart}-${segmentEnd}`,
        opacity: 1.0,
      };

      if (nglStyle === "cartoon") {
        highlightParams.color = isModelledStructure ? "#FF0000" : "#FFFF00";
        highlightParams.radiusScale = 2.0;
      } else if (nglStyle === "backbone") {
        highlightParams.color = isModelledStructure ? "#AA00AA" : "#FF00FF";
        highlightParams.radius = 0.5;
      } else if (nglStyle === "licorice") {
        highlightParams.color = isModelledStructure ? "#FFFF00" : "#FF6600";
        highlightParams.radius = 0.5;
      } else if (nglStyle === "hyperball") {
        highlightParams.color = isModelledStructure ? "#FF69B4" : "#00FF00";
        highlightParams.radius = 2.0;
      }

      structure.addRepresentation(nglStyle, highlightParams);
    }
  } catch (err) {
    console.error("Error applying NGL representation:", err);
    // Fall back to a basic cartoon representation
    try {
      structure.addRepresentation("cartoon", {
        color: "chainname",
        opacity: 0.8,
      });
    } catch (fallbackError) {
      console.error("NGL fallback representation failed:", fallbackError);
    }
  }
};
