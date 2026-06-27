import { CKAN_CONFIG, CKAN_ENDPOINTS } from "../config/ckan";

/* ---------- Types ---------- */

export interface CKANResource {
  id: string;
  name: string;
  description?: string;
  format?: string;
  url: string;
  size?: number | null;
  created?: string;
  last_modified?: string | null;
  mimetype?: string | null;
}

export interface CKANTag {
  id?: string;
  name: string;
  display_name?: string;
}

export interface CKANGroupRef {
  id: string;
  name: string;
  display_name: string;
  title?: string;
  description?: string;
  image_display_url?: string;
  package_count?: number;
}

export interface CKANOrganization {
  id: string;
  name: string;
  title: string;
  description?: string;
  image_url?: string;
  package_count?: number;
}

export interface CKANDataset {
  id: string;
  name: string;
  title: string;
  notes?: string;
  author?: string;
  author_email?: string;
  maintainer?: string;
  maintainer_email?: string;
  license_title?: string;
  license_id?: string;
  metadata_created?: string;
  metadata_modified?: string;
  num_resources?: number;
  num_tags?: number;
  organization?: CKANOrganization | null;
  groups?: CKANGroupRef[];
  tags?: CKANTag[];
  resources?: CKANResource[];
  tracking_summary?: {
    total?: number;
    recent?: number;
  };
}

export interface CKANDatasetSearchResult {
  count: number;
  results: CKANDataset[];
  facets?: Record<string, Record<string, number>>;
  search_facets?: Record<string, any>;
}

export interface CKANApiResponse<T> {
  success: boolean;
  result?: T;
  error?: {
    __type?: string;
    message?: string;
    [key: string]: any;
  };
  help?: string;
}

/* ---------- Helper ---------- */

function buildUrl(endpoint: string, params?: Record<string, string | number | undefined>): string {
  const base = CKAN_CONFIG.baseUrl.replace(/\/$/, "");
  const url = new URL(`${base}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.append(k, String(v));
      }
    });
  }
  return url.toString();
}

async function ckanFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
  init?: RequestInit,
): Promise<T> {
  const url = buildUrl(endpoint, params);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CKAN_CONFIG.timeout);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (CKAN_CONFIG.apiKey) {
    headers["Authorization"] = CKAN_CONFIG.apiKey;
  }

  try {
    const response = await fetch(url, {
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const json = (await response.json()) as CKANApiResponse<T>;
    if (!json.success) {
      throw new Error(json.error?.message || "CKAN API returned unsuccessful response");
    }
    return (json.result as T);
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err?.name === "AbortError") {
      throw new Error("Request timeout - CKAN API tidak merespons");
    }
    throw err;
  }
}

/* ---------- Public API ---------- */

export interface SearchOptions {
  q?: string;
  fq?: string;
  rows?: number;
  start?: number;
  sort?: string;
  facetField?: string[];
}

export async function searchDatasets(options: SearchOptions = {}): Promise<CKANDatasetSearchResult> {
  const params: Record<string, string | number | undefined> = {
    rows: options.rows ?? CKAN_CONFIG.defaultRows,
    start: options.start ?? 0,
  };
  if (options.q) params.q = options.q;
  if (options.fq) params.fq = options.fq;
  if (options.sort) params.sort = options.sort;
  if (options.facetField && options.facetField.length) {
    params["facet.field"] = JSON.stringify(options.facetField);
    params["facet.limit"] = 10;
  }

  return ckanFetch<CKANDatasetSearchResult>(CKAN_ENDPOINTS.packageSearch, params);
}

export async function getDataset(idOrName: string): Promise<CKANDataset> {
  return ckanFetch<CKANDataset>(CKAN_ENDPOINTS.packageShow, { id: idOrName });
}

export async function listOrganizations(): Promise<CKANOrganization[]> {
  const data = await ckanFetch<CKANOrganization[]>(
    CKAN_ENDPOINTS.organizationList,
    { all_fields: 1 },
  );
  return data;
}

export async function getOrganization(idOrName: string): Promise<CKANOrganization> {
  const data = await ckanFetch<CKANOrganization>(CKAN_ENDPOINTS.organizationShow, {
    id: idOrName,
  });
  return data;
}

export async function listGroups(): Promise<CKANGroupRef[]> {
  const data = await ckanFetch<CKANGroupRef[]>(
    CKAN_ENDPOINTS.groupList,
    { all_fields: 1 },
  );
  return data;
}

export async function getGroup(idOrName: string): Promise<CKANGroupRef> {
  const data = await ckanFetch<CKANGroupRef>(CKAN_ENDPOINTS.groupShow, { id: idOrName });
  return data;
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function formatFileSize(bytes?: number | null): string {
  if (!bytes || bytes === 0) return "-";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v < 10 && i > 0 ? 1 : 0)} ${units[i]}`;
}

export function getPrimaryFormat(dataset: CKANDataset): string {
  const r = dataset.resources?.[0];
  return (r?.format || "N/A").toUpperCase();
}

export function getPrimaryResource(dataset: CKANDataset): CKANResource | undefined {
  return dataset.resources?.[0];
}