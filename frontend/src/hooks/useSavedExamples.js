import { useEffect, useState } from "react";
import { loadManifest } from "../demo/precomputed";

export const useSavedExamples = () => {
  const [examples, setExamples] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    loadManifest()
      .then((list) => {
        if (!cancelled) setExamples(list.filter((e) => e.status !== "failed"));
      })
      .catch((err) => {
        console.error("Could not load saved examples:", err);
        if (!cancelled) setError("Saved results are unavailable right now");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { examples, isLoading, error };
};

export default useSavedExamples;
