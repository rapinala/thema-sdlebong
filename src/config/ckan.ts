/**
 * CKAN API Configuration
 *
 * Untuk menggunakan Portal Satu Data dengan instance CKAN lokal,
 * ubah CKAN_BASE_URL ke URL instance Anda dan tambahkan API key
 * melalui environment variable VITE_CKAN_API_KEY.
 */

// Default base URL menggunakan demo CKAN. Ganti dengan URL instance CKAN Kabupaten Lebong Anda.
const DEFAULT_BASE_URL = "https://demo.ckan.org";

export const CKAN_CONFIG = {
  baseUrl:
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_CKAN_BASE_URL) ||
    DEFAULT_BASE_URL,
  apiKey:
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_CKAN_API_KEY) ||
    "",
  defaultRows: 20,
  timeout: 15000,
} as const;

export const CKAN_ENDPOINTS = {
  packageSearch: "/api/3/action/package_search",
  packageShow: "/api/3/action/package_show",
  packageList: "/api/3/action/package_list",
  organizationList: "/api/3/action/organization_list",
  organizationShow: "/api/3/action/organization_show",
  groupList: "/api/3/action/group_list",
  groupShow: "/api/3/action/group_show",
  tagList: "/api/3/action/tag_list",
} as const;