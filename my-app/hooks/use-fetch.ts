import { useState, useEffect, useCallback } from "react";

function useFetch(url: string, type: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const { signal } = controller;
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, { method: type, signal });
      const json = await response.json();

      setData(json);
    } catch {
      setError("An error occurred. Awkward..");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [url, type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
export default useFetch;
