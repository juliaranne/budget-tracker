import { useState, useEffect } from "react";

function useFetch(url: string, type: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const controller = new AbortController();
    const { signal } = controller;

    fetch(url, { method: type, signal })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((e) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });

    return () => {
      controller.abort();
    };
  }, [url, type]);

  return { data, loading, error };
}
export default useFetch;
