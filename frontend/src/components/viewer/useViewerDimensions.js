import { useState, useEffect, useCallback } from "react";

export const useViewerDimensions = (height, isExpanded) => {
  const calculateViewerHeight = useCallback(() => {
    const screenHeight = window.innerHeight;

    if (isExpanded) {
      return Math.min(800, Math.max(600, screenHeight * 0.6));
    } else {
      return Math.max(350, Math.min(height, screenHeight * 0.3));
    }
  }, [isExpanded, height]);

  const [currentHeight, setCurrentHeight] = useState(() =>
    calculateViewerHeight(),
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentHeight(calculateViewerHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateViewerHeight]);

  return {
    currentHeight,
    setCurrentHeight,
    calculateViewerHeight,
  };
};

export const useViewerExpansion = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return {
    isExpanded,
    toggleExpanded,
  };
};
