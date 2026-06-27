import type { CKANDataset, CKANOrganization, CKANGroupRef, CKANDatasetSearchResult } from "./ckanService";

/* ---------- Fallback Dataset ---------- */

export const fallbackDatasets: CKANDataset[] = [
  {
    id: "data-penduduk-2024",
    name: "data-penduduk-kabupaten-lebong-2024",
    title: "Data Penduduk Kabupaten Lebong 2024",
    notes: "Dataset lengkap jumlah penduduk Kabupaten Lebong berdasarkan kecamatan, jenis kelamin, dan kelompok umur. Diperbarui setiap semester oleh Disdukcapil.",
    author: "Dinas Kependudukan dan Catatan Sipil",
    maintainer: "Disdukcapil Lebong",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2024-01-12T08:00:00",
    metadata_modified: "2024-01-12T08:00:00",
    num_resources: 2,
    num_tags: 3,
    organization: {
      id: "disdukcapil",
      name: "disdukcapil",
      title: "Dinas Kependudukan dan Catatan Sipil",
      package_count: 38,
    },
    groups: [
      { id: "kependudukan", name: "kependudukan", display_name: "Kependudukan", package_count: 48 },
    ],
    tags: [
      { name: "Kependudukan" },
      { name: "Sosial" },
      { name: "Demografi" },
    ],
    resources: [
      {
        id: "r1",
        name: "Data Penduduk 2024",
        format: "CSV",
        url: "#",
        size: 2457600,
        created: "2024-01-12T08:00:00",
        last_modified: "2024-01-12T08:00:00",
      },
    ],
    tracking_summary: { total: 1248, recent: 42 },
  },
  {
    id: "statistik-pendidikan-sma",
    name: "statistik-pendidikan-sma",
    title: "Statistik Pendidikan Tingkat SMA/Sederajat",
    notes: "Statistik jumlah sekolah, guru, dan siswa tingkat SMA/sederajat di Kabupaten Lebong tahun ajaran 2023/2024.",
    author: "Dinas Pendidikan dan Kebudayaan",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2024-01-10T08:00:00",
    metadata_modified: "2024-01-10T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "disdikbud",
      name: "disdikbud",
      title: "Dinas Pendidikan dan Kebudayaan",
      package_count: 64,
    },
    groups: [
      { id: "pendidikan", name: "pendidikan", display_name: "Pendidikan", package_count: 42 },
    ],
    tags: [{ name: "Pendidikan" }, { name: "SMA" }],
    resources: [
      { id: "r2", name: "Data Pendidikan SMA", format: "XLSX", url: "#", size: 1843200 },
    ],
    tracking_summary: { total: 892, recent: 28 },
  },
  {
    id: "peta-administrasi",
    name: "peta-wilayah-administrasi-kecamatan",
    title: "Peta Wilayah Administrasi Kecamatan",
    notes: "Peta digital batas wilayah administrasi seluruh kecamatan di Kabupaten Lebong dalam format shapefile.",
    author: "Bagian Tata Pemerintahan",
    license_title: "Open Data Commons",
    license_id: "odc-pddl",
    metadata_created: "2024-01-08T08:00:00",
    metadata_modified: "2024-01-08T08:00:00",
    num_resources: 3,
    num_tags: 3,
    organization: {
      id: "tata-pemerintahan",
      name: "tata-pemerintahan",
      title: "Bagian Tata Pemerintahan",
      package_count: 24,
    },
    groups: [
      { id: "pemerintahan", name: "pemerintahan", display_name: "Pemerintahan", package_count: 38 },
      { id: "geospasial", name: "geospasial", display_name: "Geospasial", package_count: 18 },
    ],
    tags: [{ name: "Pemerintahan" }, { name: "Geospasial" }, { name: "Peta" }],
    resources: [
      { id: "r3", name: "Shapefile Kecamatan", format: "SHP", url: "#", size: 15925248 },
    ],
    tracking_summary: { total: 2103, recent: 65 },
  },
  {
    id: "produksi-pertanian",
    name: "data-produksi-pertanian-perkebunan",
    title: "Data Produksi Pertanian dan Perkebunan",
    notes: "Data produksi hasil pertanian dan perkebunan di Kabupaten Lebong per kecamatan, mencakup padi, kopi, karet, dan palawija.",
    author: "Dinas Pertanian",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2024-01-05T08:00:00",
    metadata_modified: "2024-01-05T08:00:00",
    num_resources: 2,
    num_tags: 2,
    organization: {
      id: "distan",
      name: "distan",
      title: "Dinas Pertanian",
      package_count: 41,
    },
    groups: [
      { id: "pertanian", name: "pertanian", display_name: "Pertanian", package_count: 54 },
    ],
    tags: [{ name: "Pertanian" }, { name: "Perkebunan" }],
    resources: [
      { id: "r4", name: "Produksi Pertanian 2023", format: "CSV", url: "#", size: 3251400 },
    ],
    tracking_summary: { total: 567, recent: 19 },
  },
  {
    id: "faskes-kecamatan",
    name: "fasilitas-kesehatan-kecamatan",
    title: "Jumlah Fasilitas Kesehatan per Kecamatan",
    notes: "Daftar puskesmas, pustu, posyandu, dan rumah sakit di setiap kecamatan Kabupaten Lebong.",
    author: "Dinas Kesehatan",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2024-01-04T08:00:00",
    metadata_modified: "2024-01-04T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "dinkes",
      name: "dinkes",
      title: "Dinas Kesehatan",
      package_count: 72,
    },
    groups: [
      { id: "kesehatan", name: "kesehatan", display_name: "Kesehatan", package_count: 36 },
    ],
    tags: [{ name: "Kesehatan" }, { name: "Fasilitas" }],
    resources: [
      { id: "r5", name: "Fasilitas Kesehatan", format: "XLSX", url: "#", size: 892000 },
    ],
    tracking_summary: { total: 432, recent: 15 },
  },
  {
    id: "umkm-lebong",
    name: "data-umkm-kabupaten-lebong",
    title: "Data UMKM Kabupaten Lebong",
    notes: "Daftar usaha mikro, kecil, dan menengah yang terdaftar di Kabupaten Lebong beserta klasifikasi usahanya.",
    author: "Dinas Koperasi dan UKM",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2024-01-03T08:00:00",
    metadata_modified: "2024-01-03T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "diskop-ukm",
      name: "diskop-ukm",
      title: "Dinas Koperasi dan UKM",
      package_count: 29,
    },
    groups: [
      { id: "ekonomi", name: "ekonomi", display_name: "Ekonomi & UMKM", package_count: 31 },
    ],
    tags: [{ name: "Ekonomi" }, { name: "UMKM" }],
    resources: [
      { id: "r6", name: "Data UMKM", format: "CSV", url: "#", size: 1258000 },
    ],
    tracking_summary: { total: 689, recent: 22 },
  },
  {
    id: "apbd-2024",
    name: "apbd-kabupaten-lebong-2024",
    title: "Anggaran Pendapatan dan Belanja Daerah 2024",
    notes: "Dokumen APBD Kabupaten Lebong tahun anggaran 2024 beserta realisasi per triwulan.",
    author: "Badan Keuangan Daerah",
    license_title: "Open Data Commons",
    license_id: "odc-pddl",
    metadata_created: "2024-01-02T08:00:00",
    metadata_modified: "2024-01-02T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "bkd",
      name: "bkd",
      title: "Badan Keuangan Daerah",
      package_count: 47,
    },
    groups: [
      { id: "keuangan", name: "keuangan", display_name: "Keuangan Daerah", package_count: 22 },
    ],
    tags: [{ name: "Keuangan" }, { name: "APBD" }],
    resources: [
      { id: "r7", name: "Dokumen APBD 2024", format: "PDF", url: "#", size: 5872000 },
    ],
    tracking_summary: { total: 1823, recent: 58 },
  },
  {
    id: "statistik-kemiskinan",
    name: "statistik-kemiskinan-kabupaten-lebong",
    title: "Statistik Kemiskinan Kabupaten Lebong",
    notes: "Data jumlah penduduk miskin, garis kemiskinan, dan indeks kedalaman kemiskinan per kecamatan.",
    author: "BPS Kabupaten Lebong",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2023-12-28T08:00:00",
    metadata_modified: "2023-12-28T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "bps",
      name: "bps",
      title: "BPS Kabupaten Lebong",
      package_count: 95,
    },
    groups: [
      { id: "sosial", name: "sosial", display_name: "Sosial", package_count: 28 },
    ],
    tags: [{ name: "Sosial" }, { name: "Kemiskinan" }],
    resources: [
      { id: "r8", name: "Statistik Kemiskinan 2023", format: "XLSX", url: "#", size: 1153000 },
    ],
    tracking_summary: { total: 745, recent: 21 },
  },
  {
    id: "jalan-infrastruktur",
    name: "data-jalan-infrastruktur",
    title: "Data Jalan dan Infrastruktur",
    notes: "Peta jaringan jalan kabupaten, kondisi jalan, dan infrastruktur dasar di Kabupaten Lebong.",
    author: "Dinas Pekerjaan Umum",
    license_title: "Open Data Commons",
    license_id: "odc-pddl",
    metadata_created: "2023-12-22T08:00:00",
    metadata_modified: "2023-12-22T08:00:00",
    num_resources: 2,
    num_tags: 2,
    organization: {
      id: "pupr",
      name: "pupr",
      title: "Dinas Pekerjaan Umum dan Penataan Ruang",
      package_count: 53,
    },
    groups: [
      { id: "infrastruktur", name: "infrastruktur", display_name: "Infrastruktur", package_count: 28 },
    ],
    tags: [{ name: "Infrastruktur" }, { name: "Jalan" }],
    resources: [
      { id: "r9", name: "Shapefile Jalan", format: "SHP", url: "#", size: 8810000 },
    ],
    tracking_summary: { total: 521, recent: 12 },
  },
  {
    id: "pasar-tradisional",
    name: "data-pasar-tradisional",
    title: "Data Pasar Tradisional",
    notes: "Daftar pasar tradisional di Kabupaten Lebong beserta jumlah pedagang dan jenis dagangan.",
    author: "Dinas Perdagangan",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2023-12-20T08:00:00",
    metadata_modified: "2023-12-20T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "disdag",
      name: "disdag",
      title: "Dinas Perdagangan",
      package_count: 22,
    },
    groups: [
      { id: "ekonomi", name: "ekonomi", display_name: "Ekonomi & UMKM", package_count: 31 },
    ],
    tags: [{ name: "Ekonomi" }, { name: "Perdagangan" }],
    resources: [
      { id: "r10", name: "Data Pasar", format: "CSV", url: "#", size: 670000 },
    ],
    tracking_summary: { total: 312, recent: 8 },
  },
  {
    id: "wisata-budaya",
    name: "data-wisata-budaya",
    title: "Data Wisata dan Budaya",
    notes: "Daftar destinasi wisata, situs budaya, dan event budaya tahunan Kabupaten Lebong.",
    author: "Dinas Pariwisata",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2023-12-18T08:00:00",
    metadata_modified: "2023-12-18T08:00:00",
    num_resources: 2,
    num_tags: 2,
    organization: {
      id: "dispar",
      name: "dispar",
      title: "Dinas Pariwisata",
      package_count: 33,
    },
    groups: [
      { id: "pariwisata", name: "pariwisata", display_name: "Pariwisata", package_count: 19 },
    ],
    tags: [{ name: "Pariwisata" }, { name: "Budaya" }],
    resources: [
      { id: "r11", name: "Buku Panduan Wisata", format: "PDF", url: "#", size: 12900000 },
    ],
    tracking_summary: { total: 1567, recent: 45 },
  },
  {
    id: "curah-hujan",
    name: "data-curah-hujan-iklim",
    title: "Data Curah Hujan dan Iklim",
    notes: "Data pengamatan curah hujan dan parameter iklim dari stasiun BMKG di Kabupaten Lebong.",
    author: "Dinas Lingkungan Hidup",
    license_title: "Creative Commons Attribution",
    license_id: "cc-by",
    metadata_created: "2023-12-15T08:00:00",
    metadata_modified: "2023-12-15T08:00:00",
    num_resources: 1,
    num_tags: 2,
    organization: {
      id: "dlh",
      name: "dlh",
      title: "Dinas Lingkungan Hidup",
      package_count: 26,
    },
    groups: [
      { id: "lingkungan", name: "lingkungan", display_name: "Lingkungan Hidup", package_count: 24 },
    ],
    tags: [{ name: "Lingkungan" }, { name: "Iklim" }],
    resources: [
      { id: "r12", name: "Data Curah Hujan", format: "CSV", url: "#", size: 4930000 },
    ],
    tracking_summary: { total: 298, recent: 7 },
  },
];

export const fallbackOrganizations: CKANOrganization[] = [
  { id: "diskominfo", name: "diskominfo", title: "Dinas Komunikasi dan Informatika", package_count: 87, description: "Mengelola infrastruktur TIK dan Portal Satu Data" },
  { id: "disdikbud", name: "disdikbud", title: "Dinas Pendidikan dan Kebudayaan", package_count: 64, description: "Mengelola data pendidikan formal dan non-formal" },
  { id: "dinkes", name: "dinkes", title: "Dinas Kesehatan", package_count: 72, description: "Mengelola data kesehatan masyarakat" },
  { id: "pupr", name: "pupr", title: "Dinas Pekerjaan Umum dan Penataan Ruang", package_count: 53, description: "Mengelola data infrastruktur dan penataan ruang" },
  { id: "distan", name: "distan", title: "Dinas Pertanian", package_count: 41, description: "Mengelola data pertanian, perkebunan, dan peternakan" },
  { id: "bps", name: "bps", title: "BPS Kabupaten Lebong", package_count: 95, description: "Badan Pusat Statistik Kabupaten Lebong" },
  { id: "disdukcapil", name: "disdukcapil", title: "Dinas Kependudukan dan Catatan Sipil", package_count: 38, description: "Mengelola data kependudukan dan catatan sipil" },
  { id: "diskop-ukm", name: "diskop-ukm", title: "Dinas Koperasi dan UKM", package_count: 29, description: "Mengelola data koperasi dan usaha kecil menengah" },
  { id: "bkd", name: "bkd", title: "Badan Keuangan Daerah", package_count: 47, description: "Mengelola data keuangan dan APBD daerah" },
  { id: "dispar", name: "dispar", title: "Dinas Pariwisata", package_count: 33, description: "Mengelola data destinasi wisata dan budaya" },
  { id: "dlh", name: "dlh", title: "Dinas Lingkungan Hidup", package_count: 26, description: "Mengelola data lingkungan dan kehutanan" },
  { id: "disdag", name: "disdag", title: "Dinas Perdagangan", package_count: 22, description: "Mengelola data perdagangan dan pasar tradisional" },
];

export const fallbackGroups: CKANGroupRef[] = [
  { id: "kependudukan", name: "kependudukan", display_name: "Kependudukan", description: "Data demografi, kelahiran, kematian, migrasi, dan catatan sipil", package_count: 48 },
  { id: "kesehatan", name: "kesehatan", display_name: "Kesehatan", description: "Fasilitas kesehatan, tenaga medis, dan program kesehatan masyarakat", package_count: 36 },
  { id: "pendidikan", name: "pendidikan", display_name: "Pendidikan", description: "Data sekolah, guru, siswa, dan capaian pendidikan", package_count: 42 },
  { id: "pertanian", name: "pertanian", display_name: "Pertanian", description: "Produksi pertanian, perkebunan, peternakan, dan perikanan", package_count: 54 },
  { id: "ekonomi", name: "ekonomi", display_name: "Ekonomi & UMKM", description: "Data usaha mikro, koperasi, perdagangan, dan investasi daerah", package_count: 31 },
  { id: "infrastruktur", name: "infrastruktur", display_name: "Infrastruktur", description: "Jalan, jembatan, irigasi, dan bangunan publik", package_count: 28 },
  { id: "lingkungan", name: "lingkungan", display_name: "Lingkungan Hidup", description: "Kualitas lingkungan, kehutanan, dan konservasi alam", package_count: 24 },
  { id: "pariwisata", name: "pariwisata", display_name: "Pariwisata", description: "Destinasi wisata, event budaya, dan akomodasi", package_count: 19 },
  { id: "keuangan", name: "keuangan", display_name: "Keuangan Daerah", description: "APBD, realisasi anggaran, dan pendapatan daerah", package_count: 22 },
];

export const fallbackSearch = (
  query: string,
  format?: string,
  start = 0,
  rows = 12,
): CKANDatasetSearchResult => {
  const q = query.toLowerCase();
  let filtered = fallbackDatasets;
  if (q) {
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (d.organization?.title || "").toLowerCase().includes(q) ||
        d.tags?.some((t) => t.name.toLowerCase().includes(q)),
    );
  }
  if (format && format !== "Semua") {
    filtered = filtered.filter((d) => d.resources?.[0]?.format?.toUpperCase() === format.toUpperCase());
  }
  return {
    count: filtered.length,
    results: filtered.slice(start, start + rows),
  };
};