import { useState, useEffect, useCallback, useRef } from "react";

interface UseCkanState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseCkanOptions {
  enabled?: boolean;
  cacheKey?: string;
  cacheTime?: number; // ms
}

/**
 * Generic CKAN fetch hook with loading, error, and simple in-memory caching.
 */
export function useCkanQuery<T>(
  fetcher: () => Promise<T>,
  deps: any[] = [],
  options: UseCkanOptions = {},
) {
  const { enabled = true, cacheKey, cacheTime = 60_000 } = options;
  const [state, setState] = useState<UseCkanState<T>>({ data: null, loading: true, error: null });
  const cacheRef = useRef<Map<string, { data: T; ts: number }>>(new Map());
  const abortRef = useRef<AbortController | null>(null);

  const refetch = useCallback(async () => {
    if (!enabled) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    // Return cached if fresh
    if (cacheKey) {
      const cached = cacheRef.current.get(cacheKey);
      if (cached && Date.now() - cached.ts < cacheTime) {
        setState({ data: cached.data, loading: false, error: null });
        return;
      }
    }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const data = await fetcher();
      if (cacheKey) {
        cacheRef.current.set(cacheKey, { data, ts: Date.now() });
      }
      setState({ data, loading: false, error: null });
    } catch (err: any) {
      setState({ data: null, loading: false, error: err?.message || "Terjadi kesalahan" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, cacheKey, cacheTime, ...deps]);

  useEffect(() => {
    refetch();
    return () => abortRef.current?.abort();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Invalidate cache entry (e.g., on filter change).
 */
export function useInvalidateCache() {
  const cacheRef = useRef<Map<string, { data: any; ts: number }>>(new Map());
  return (key?: string) => {
    if (!key) cacheRef.current.clear();
    else cacheRef.current.delete(key);
  };
}