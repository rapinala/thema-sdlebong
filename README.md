# Portal Satu Data Kabupaten Lebong

Portal resmi pengelolaan data terpadu Pemerintah Kabupaten Lebong yang dibangun di atas **CKAN (Comprehensive Knowledge Archive Network)**.

## 🚀 Integrasi CKAN API

Portal ini terintegrasi dengan CKAN API standar. Semua data (dataset, organisasi, grup) diambil secara real-time dari instance CKAN yang dikonfigurasi.

### ⚙️ Konfigurasi API Key

Salin file `.env.example` menjadi `.env` dan isi nilai yang sesuai:

```bash
cp .env.example .env
```

Kemudian edit `.env`:

```env
# URL instance CKAN Kabupaten Lebong
VITE_CKAN_BASE_URL=https://ckan.lebonk.go.id

# API Key CKAN (opsional, kosongkan untuk akses publik)
VITE_CKAN_API_KEY=eyJ0eXAiOiJKV1QiLCJh...
```

### 🔑 Cara Mendapatkan API Key CKAN

1. Login ke instance CKAN Anda
2. Buka **User Profile** → **Manage** → **API Tokens**
3. Klik **Create API Token**
4. Salin token dan paste ke `.env`

### 📡 Endpoint CKAN yang Digunakan

| Endpoint | Fungsi |
|----------|--------|
| `package_search` | Mencari dataset dengan filter dan pagination |
| `package_show` | Mendapatkan detail dataset |
| `organization_list` | Mendapatkan daftar organisasi |
| `organization_show` | Detail organisasi |
| `group_list` | Daftar grup/kategori data |
| `group_show` | Detail grup |

### 🔄 Fallback Mode

Jika koneksi ke CKAN API terganggu atau API key tidak valid, portal akan otomatis:
- Menampilkan banner "Mode Offline" 
- Menampilkan data dari cache lokal (mock data)
- Tetap memungkinkan pengguna menelusuri katalog

### 🛠️ Tech Stack

- React 19 + Vite + TypeScript
- React Router v6
- Tailwind CSS v4
- CKAN Action API v3

## 📋 Halaman

1. **Beranda** - Hero slideshow budaya + featured datasets
2. **Dataset** - Katalog dataset dengan filter CKAN real-time
3. **Organisasi** - Daftar OPD dengan package_count dari CKAN
4. **Group** - Katalog grup sektoral
5. **Topik** - Ulasan & berita pemerintah
6. **Panduan** - Dokumentasi + API Key info
7. **Masuk** - Autentikasi via CKAN user endpoint

## 🚀 Menjalankan

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
```