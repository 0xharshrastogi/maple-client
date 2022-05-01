import { useCallback, useEffect, useState } from "react";

export const useAsync = (callback, deps) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const reload = useCallback(async () => {
    try {
      (async () => {
        setIsLoading(true);
        const data = await callback();
        setData(data);
      })();
    } catch (err) {
      console.count("Error Count");
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [deps]);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { error, loading: isLoading, data, reload };
};
