# Product Requirements Document (PRD)
**Project Name:** Baku
**Initiative:** Ri Labs
**Lead Developer:** Kharis
**Version:** 1.0.0
**Status:** Draft

## 1. Ringkasan Eksekutif
Baku adalah aplikasi desktop *native* yang dirancang untuk membuat, mengedit, dan menganotasi dokumen PDF. Dibangun dengan kombinasi Rust dan Slint UI, Baku bertujuan untuk memberikan pengalaman pengguna yang sangat ringan, cepat, dan lintas platform (macOS, Windows, Linux) tanpa *overhead* memori yang sering ditemukan pada aplikasi berbasis Electron atau web. Baku mengusung antarmuka *flat design* murni yang berfokus pada fungsi dan meminimalkan distraksi visual.

## 2. Tujuan dan Metrik Kesuksesan
*   **Tujuan:** Menyediakan alternatif editor PDF *native* yang mampu merender antarmuka dalam waktu kurang dari 1 detik dan mengonsumsi RAM seminimal mungkin.
*   **Metrik Kesuksesan:**
    *   Ukuran *binary* aplikasi di bawah 20 MB.
    *   Mampu mengekspor kanvas berisi blok teks, gambar, dan tabel menjadi file PDF terstruktur.
    *   Waktu *startup* instan.

## 3. Spesifikasi Fitur Utama

### 3.1. Pembuatan Dokumen (Canvas & Page Management)
*   **Kanvas Kosong:** Pengguna dapat memulai dari dokumen kosong dengan preset ukuran standar (A4, Letter) atau kustom.
*   **Sistem Blok:** Konten dibangun dengan sistem blok (Teks, Gambar, Tabel) yang dapat diklik, disorot, dan digeser (*drag-and-drop*).
*   **Manajemen Multi-Halaman:** Penambahan halaman baru secara otomatis ketika konten melebihi batas bawah kertas, serta navigasi *thumbnail* halaman di panel samping.

### 3.2. Pengeditan dan Anotasi (Overlay)
*   **Teks Cepat:** Klik di mana saja pada dokumen (baik baru maupun PDF impor) untuk menambahkan lapisan teks.
*   **Impor & Manipulasi Gambar:** Mendukung format JPG/PNG dengan kemampuan ubah ukuran proporsional dan rotasi.
*   **Alat Gambar Bebas (Freehand) & Penyorot (Highlighter):** Untuk keperluan tanda tangan atau menandai bagian penting dalam dokumen.
*   **Bentuk (Shapes) Dasar:** Kotak, lingkaran, dan garis pemisah.

### 3.3. Ekspor & Manajemen File
*   **Simpan Projek:** Menyimpan format mentah (state blok/koordinat) sebelum diekspor.
*   **Flatten to PDF:** Menerjemahkan semua koordinat UI layar ke dalam koordinat standar PDF (titik asal kiri-bawah) dan membungkusnya menjadi satu file berektensi `.pdf`.
*   **Impor PDF:** Membaca file PDF yang sudah ada untuk ditambahkan anotasi atau lapisan gambar baru di atasnya.

## 4. Spesifikasi Teknis (Tech Stack)
*   **Logika Aplikasi & Backend:** Rust (Cargo)
*   **Antarmuka Pengguna (UI):** Slint UI (file `.slint` dikompilasi ke Rust)
*   **Pustaka Pemrosesan PDF:** 
    *   `printpdf`: Untuk membuat struktur PDF dari awal (menangani kanvas kosong, teks, dan penempatan gambar).
    *   `lopdf`: Untuk memanipulasi struktur PDF yang sudah ada.
    *   `pdfium-render` (opsional): Untuk merender *preview* PDF sebagai gambar ke dalam kanvas Slint.

## 5. Timeline & Fase Rilis (TBA)
*   **Fase 1 (Proof of Concept):** Setup Rust + Slint, rendering *window* dasar, dan *export* teks sederhana ke PDF.
*   **Fase 2 (UI & Block System):** Implementasi *Flat Design*, drag-and-drop gambar, dan manajemen state kordinat layar ke state Rust.
*   **Fase 3 (Advanced PDF):** Integrasi `lopdf` untuk membaca PDF lama, fitur coretan (freehand), dan tabel.