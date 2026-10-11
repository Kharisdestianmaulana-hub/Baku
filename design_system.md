# Baku Design System
**Version:** 1.0.0
**Style Approach:** Flat Design (Minimalist, Functional, Border-driven)

## 1. Filosofi Desain
Baku menggunakan pendekatan *flat design* murni. Semua elemen UI berbentuk dua dimensi tanpa ada ilusi kedalaman (*depth*). 
*   **Tanpa Drop Shadow:** Tidak ada bayangan di bawah kanvas dokumen, tombol, atau panel.
*   **Tanpa Gradien:** Semua elemen menggunakan warna solid (*flat*).
*   **Separasi Tegas:** Pemisahan antar area (toolbar, panel, kanvas) menggunakan garis batas (*border*) tipis berukuran 1px dengan kontras warna yang tepat.

## 2. Palet Warna (Color Tokens)

| Token Name | Hex Code | Penggunaan |
| :--- | :--- | :--- |
| `App-Background` | `#F4F5F7` | Latar belakang aplikasi, ruang kosong di luar kanvas, dan *sidebar*. |
| `Canvas-Paper` | `#FFFFFF` | Lembar dokumen PDF. |
| `Text-Primary` | `#2D3142` | Teks utama pada UI, judul menu, dan garis tepi (*border*) UI. |
| `Accent-Primary` | `#4F83CC` | Warna utama untuk status aktif, indikator halaman, dan tombol aksi (Ekspor). |
| `Accent-Secondary`| `#75B79E` | Warna alternatif untuk tombol sekunder atau sukses. |
| `State-Hover` | `#E1E4E8` | Efek *hover* pada tombol *toolbar* atau *thumbnail* halaman. |
| `Border-UI` | `#D1D5DB` | Garis tepi 1px untuk memisahkan toolbar dan area kerja utama. |

## 3. Tipografi
*   **Keluarga Font UI:** Inter atau Roboto (Sans-Serif geometris untuk tingkat keterbacaan tinggi di layar).
*   **Keluarga Font Dokumen:** Bebas (mendukung Serif seperti Times New Roman, dan Sans-Serif seperti Arial/Helvetica untuk diekspor ke PDF).
*   **Hierarki UI:**
    *   `UI-Heading`: 14pt, Medium (500), Warna: `Text-Primary`
    *   `UI-Body`: 12pt, Regular (400), Warna: `Text-Primary`
    *   `UI-Small`: 11pt, Regular (400), Warna: `#5A6072`

## 4. Komponen Antarmuka

### 4.1. Toolbar (Top Menu)
*   **Tinggi:** 48px
*   **Latar Belakang:** `App-Background`
*   **Batas Bawah:** 1px solid `Border-UI`
*   **Ikonografi:** SVG berbasis garis (*line art*) dengan ketebalan *stroke* seragam (1.5px). Ikon tidak memiliki warna isi (*fill*), kecuali saat dalam kondisi aktif.

### 4.2. Tombol (Flat Buttons)
*   **Radius Sudut:** 4px (Sedikit melengkung agar terasa modern, bukan neobrutalism kaku).
*   **Status Default:** Transparan atau `App-Background`.
*   **Status Hover:** Warna solid `State-Hover`.
*   **Status Aktif/Klik:** Latar warna `Accent-Primary`, warna teks/ikon berubah menjadi `Canvas-Paper` (`#FFFFFF`).

### 4.3. Kanvas Dokumen (Document Area)
*   **Latar Belakang:** `Canvas-Paper`
*   **Batas:** 1px solid `#B0B3B8` (Garis abu-abu sedikit lebih gelap dari latar aplikasi untuk menegaskan tepi kertas).
*   **Posisi:** Berada di tengah (*center aligned*) secara horizontal dalam area kerja dengan *padding* minimal 40px dari sisi atas dan bawah.

### 4.4. Elemen Blok (Dalam Kanvas)
*   Saat teks, gambar, atau tabel diklik oleh pengguna, sebuah *bounding box* (kotak pembatas) tipis berwarna biru (`Accent-Primary`) akan muncul di sekeliling elemen dengan titik *handle* kotak kecil di sudutnya untuk modifikasi ukuran (*resize*).