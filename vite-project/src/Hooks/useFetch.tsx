import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(
  url: URL | RequestInfo,
  options?: RequestInit
): FetchState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setData(null);
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          ...optionsRef,
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = (await response.json()) as T;
        if (!controller.signal.aborted) {
          setData(json);
        }
      } catch (e) {
        if (!controller.signal.aborted && e instanceof Error) {
          setError(e.message);
          console.log(e.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url, options]);

  return { data, loading, error };
}

export default useFetch;
