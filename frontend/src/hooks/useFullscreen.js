import { useState, useCallback } from "react";

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenData, setFullscreenData] = useState(null);

  const openFullscreen = useCallback((data) => {
    setFullscreenData(data);
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setFullscreenData(null);
  }, []);

  const toggleFullscreen = useCallback(
    (data) => {
      if (isFullscreen) {
        closeFullscreen();
      } else {
        openFullscreen(data);
      }
    },
    [isFullscreen, openFullscreen, closeFullscreen],
  );

  return {
    isFullscreen,
    fullscreenData,
    openFullscreen,
    closeFullscreen,
    toggleFullscreen,
  };
};

export default useFullscreen;
