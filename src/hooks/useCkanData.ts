import { useEffect, useState, useCallback } from "react";
import * as ckan from "../services/ckanService";
import {
  fallbackDatasets,
  fallbackOrganizations,
  fallbackGroups,
  fallbackSearch,
} from "../services/fallbackData";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
}

/**
 * Hook untuk mencari dataset dari CKAN API.
 * Jika API gagal/error, otomatis menggunakan fallback data.
 */
export function useDatasetsSearch(query: string, format: string, start = 0, rows = 12) {
  const [state, setState] = useState<ApiState<ckan.CKANDatasetSearchResult>>({
    data: null,
    loading: true,
    error: null,
    usingFallback: false,
  });

  const fetchData = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const fqParts: string[] = [];
      if (format && format !== "Semua") {
        fqParts.push(`res_format:${format.toUpperCase()}`);
      }
      const result = await ckan.searchDatasets({
        q: query || undefined,
        fq: fqParts.length ? fqParts.join(" AND ") : undefined,
        start,
        rows,
      });
      setState({ data: result, loading: false, error: null, usingFallback: false });
    } catch (err: any) {
      // Use fallback
      const result = fallbackSearch(query, format, start, rows);
      setState({
        data: result,
        loading: false,
        error: err?.message || "Menggunakan data lokal (offline)",
        usingFallback: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, format, start, rows]);

  useEffect(() => {
    const t = setTimeout(fetchData, 300);
    return () => clearTimeout(t);
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

/**
 * Hook untuk featured dataset di homepage.
 */
export function useFeaturedDatasets(limit = 4) {
  const [state, setState] = useState<ApiState<ckan.CKANDataset[]>>({
    data: null,
    loading: true,
    error: null,
    usingFallback: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await ckan.searchDatasets({ rows: limit, sort: "metadata_modified desc" });
        if (!cancelled) {
          setState({ data: res.results, loading: false, error: null, usingFallback: false });
        }
      } catch (err: any) {
        if (!cancelled) {
          setState({
            data: fallbackDatasets.slice(0, limit),
            loading: false,
            error: err?.message || "Mode offline",
            usingFallback: true,
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return state;
}

/**
 * Hook untuk statistik portal (total dataset, organisasi, group).
 */
export function usePortalStats() {
  const [state, setState] = useState<
    ApiState<{ datasets: number; organizations: number; groups: number; users: number }>
  >({ data: null, loading: true, error: null, usingFallback: false });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [search, orgs, grps] = await Promise.allSettled([
          ckan.searchDatasets({ rows: 0 }),
          ckan.listOrganizations(),
          ckan.listGroups(),
        ]);

        if (cancelled) return;
        const datasets = search.status === "fulfilled" ? search.value.count : fallbackDatasets.length;
        const organizations =
          orgs.status === "fulfilled" ? orgs.value.length : fallbackOrganizations.length;
        const groups = grps.status === "fulfilled" ? grps.value.length : fallbackGroups.length;

        const usingFallback = search.status !== "fulfilled";
        setState({
          data: {
            datasets,
            organizations,
            groups,
            users: 5832, // CKAN doesn't expose user count via standard endpoints
          },
          loading: false,
          error: usingFallback ? "Menggunakan data lokal" : null,
          usingFallback,
        });
      } catch (err: any) {
        if (!cancelled) {
          setState({
            data: {
              datasets: fallbackDatasets.length,
              organizations: fallbackOrganizations.length,
              groups: fallbackGroups.length,
              users: 5832,
            },
            loading: false,
            error: err?.message || "Mode offline",
            usingFallback: true,
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * Hook untuk list organisasi.
 */
export function useOrganizations() {
  const [state, setState] = useState<ApiState<ckan.CKANOrganization[]>>({
    data: null,
    loading: true,
    error: null,
    usingFallback: false,
  });

  const refetch = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const orgs = await ckan.listOrganizations();
      setState({ data: orgs, loading: false, error: null, usingFallback: false });
    } catch (err: any) {
      setState({
        data: fallbackOrganizations,
        loading: false,
        error: err?.message || "Mode offline",
        usingFallback: true,
      });
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}

/**
 * Hook untuk list groups.
 */
export function useGroups() {
  const [state, setState] = useState<ApiState<ckan.CKANGroupRef[]>>({
    data: null,
    loading: true,
    error: null,
    usingFallback: false,
  });

  const refetch = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const grps = await ckan.listGroups();
      setState({ data: grps, loading: false, error: null, usingFallback: false });
    } catch (err: any) {
      setState({
        data: fallbackGroups,
        loading: false,
        error: err?.message || "Mode offline",
        usingFallback: true,
      });
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
}