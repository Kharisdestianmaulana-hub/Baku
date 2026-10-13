<div align="center">
  <img src="src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Pengolah Kata Desktop Berstandar Baku, Super Ringan, dan 100% Privat</strong></p>
  <p><em>Lightweight, Local-First Standardized Desktop Word Processor for Academic, Official, and Formal Documents</em></p>

  <p>
    <a href="https://tauri.app"><img src="https://img.shields.io/badge/Tauri-v1.6-24C8D8?style=flat&logo=tauri&logoColor=white" alt="Tauri" /></a>
    <a href="https://www.rust-lang.org"><img src="https://img.shields.io/badge/Rust-2021%20Edition-DEA584?style=flat&logo=rust&logoColor=white" alt="Rust" /></a>
    <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-F7DF1E?style=flat" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-4F83CC?style=flat" alt="Cross Platform" />
    <img src="https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Local--First-10B981?style=flat" alt="Local First" />
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat" alt="License" /></a>
  </p>
</div>

---

## Daftar Isi / Table of Contents
- [Bahasa Indonesia](#bahasa-indonesia)
  - [Tentang Baku PDF](#tentang-baku-pdf)
  - [Fitur Utama](#fitur-utama)
  - [Alat Ekstra PDF (100% Luring)](#alat-ekstra-pdf-100-luring)
  - [Daftar Templat Baku Bawaan](#daftar-templat-baku-bawaan)
  - [Arsitektur & Spesifikasi Teknis](#arsitektur--spesifikasi-teknis)
  - [Persyaratan Sistem & Instalasi](#persyaratan-sistem--instalasi)
- [English](#english)
  - [About Baku PDF](#about-baku-pdf)
  - [Key Features](#key-features)
  - [Offline PDF Extra Tools](#offline-pdf-extra-tools)
  - [Built-In Standard Templates](#built-in-standard-templates)
  - [Architecture & Tech Stack](#architecture--tech-stack)
  - [System Requirements & Installation](#system-requirements--installation)
- [Lisensi / License](#lisensi--license)

---

## Bahasa Indonesia

### Tentang Baku PDF
Baku PDF adalah aplikasi pengolah kata desktop modern yang dirancang untuk mempermudah penyusunan karya ilmiah, tugas akhir, skripsi, dan surat dinas resmi dengan standar format baku yang presisi. Aplikasi ini berpegang pada filosofi **local-first**: seluruh pemrosesan teks, render halaman, dan manipulasi PDF berjalan 100% secara luring di komputer Anda tanpa server, tanpa analitik pelacak, dan tanpa langganan awan.

Dibangun dengan **Tauri** dan **Rust** serta lapisan tampilan web vanilla murni, Baku PDF berbobot sangat ringan (konsumsi memori RAM rendah ~50-80 MB), memiliki waktu mulai instan, dan bebas dari kelambatan (*lag*) yang umumnya dijumpai pada aplikasi pengolah dokumen berbasis Electron.

### Fitur Utama

1. **Peluncur Cepat Beranda (Word-Style Home Screen)**:
   - Mulai dokumen baru dengan lembar kosong (*Blank Document*).
   - Akses pembuka berkas format mandiri `.baku`.
   - Kotak kertas miniatur templat dokumen bergaya Microsoft Word (Skripsi/TA, Surat Dinas, Makalah) lengkap dengan garis thumbnail tata letak dan pill badge baku.
   - Akses cepat ke seluruh galeri templat dan daftar dokumen terakhir yang dibuka.

2. **Galeri Templat Baku & Pembuat Templat Kustom**:
   - Dilengkapi templat standar resmi siap pakai untuk skripsi, makalah, surat dinas, laporan praktikum, memo internal, notula rapat, dan CV ATS.
   - Filter kategori templat (Akademik, Surat & Dinas, Bisnis & Kantor, Templat Saya) dan pencarian kata kunci instan.
   - Pratinjau split-view dengan diagram miniatur lembar kertas potret/lanskap.
   - Buat templat baru dari nol (*Create New Template*) atau simpan dokumen editor yang sedang aktif menjadi templat (*Save As Template*).
   - Opsi penguncian standar baku (*Strict Standard Lock*) untuk menjamin margin dan ukuran kertas tidak sengaja berubah.
   - Ekspor dan impor berkas templat mandiri `.baku`.

3. **Multi-Halaman & Multi-Seksi Cerdas**:
   - Pemisah Halaman (*Page Break*, Ctrl/Cmd + Enter) instan berkinerja tinggi 60 FPS tanpa jeda input.
   - Pemisah Seksi (*Section Break*, Ctrl/Cmd + Shift + Enter) untuk memulai penomoran bab baru atau mengubah format nomor di tengah dokumen.
   - Format penomoran dokumen fleksibel: Angka Arab (1, 2, 3), Romawi Kecil (i, ii, iii), Romawi Besar (I, II, III), dan Huruf (A, B, C / a, b, c).
   - Posisi nomor halaman: Header atau Footer, rata kiri, tengah, atau kanan.
   - Opsi Beda Halaman Pertama (*Different First Page*) untuk menyembunyikan nomor pada halaman sampul/judul resmi.

4. **Penggaris Visual Interaktif (Interactive Visual Ruler)**:
   - Penggaris horizontal berskala presisi milimeter/sentimeter/inci dengan panduan visual margin aktif.
   - Tiga penanda seret interaktif: Indentasi Baris Pertama (*First Line Indent*), Indentasi Kiri (*Left Indent*), dan Margin Kanan (*Right Margin*).
   - Sinkronisasi instan terhadap paragraf aktif di kanvas editor.

5. **Galeri Gaya Tipografi & Tata Huruf Presisi**:
   - Palet gaya format dokumen standar: Normal, Judul Dokumen, Subjudul, Bab / Judul 1, Sub-bab / Judul 2, Sub-sub-bab / Judul 3, Kutipan Langsung (*Blockquote*), dan Monospace / Kode.
   - Pemilih ukuran huruf presisi (8pt hingga 72pt), pemilih tinggi baris (*Line Height*: 1.0, 1.15, 1.5, 2.0, kustom), dan pemilih palet warna teks/latar.
   - Pengaturan margin halaman baku (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal, dan kustom) serta ukuran kertas (A4, F4/Folio 215x330mm, Letter, Legal).

6. **Alat Bantu Dokumen Lengkap**:
   - **Ubah Kapitalisasi (Change Case)**: Kalimat awal (*Sentence case*), huruf kecil semua (*lowercase*), HURUF BESAR (*UPPERCASE*), Huruf Kapital Tiap Kata (*Capitalize Each Word*), dan Huruf Balik (*tOGGLE cASE*).
   - **Statistik Dokumen Real-time**: Hitungan jumlah kata, karakter dengan/tanpa spasi, jumlah paragraf, dan estimasi waktu baca.
   - **Penyunting Tabel Kustom**: Pembuat tabel matriks baris x kolom dengan toolbar mengambang (*floating toolbar*) untuk menambah/menghapus baris/kolom dan perataan teks sel.
   - **Penyunting Gambar**: Unggah gambar lokal, perataan (kiri, tengah, kanan), penyesuaian ukuran proporsional, serta penghapusan aman.
   - **Pemilih Simbol Khusus**: Dialog pemilih simbol tipografi, aksara, matematika, dan karakter resmi.

7. **Ekspor & Cetak WYSIWYG**:
   - Ekspor PDF WYSIWYG dengan keakuratan tata letak piksel terhadap kanvas editor.
   - Dialog Cetak langsung terintegrasi dengan daftar printer sistem operasi lokal dan pencetakan multi-eksemplar.

### Alat Ekstra PDF (100% Luring)
Baku PDF menyediakan utilitas pengolahan PDF mandiri langsung di perangkat Anda tanpa bantuan server luar:
- **Gabungkan PDF (Merge PDF)**: Satukan dua atau lebih berkas PDF menjadi satu dokumen utuh dengan urutan yang dapat diatur.
- **Pisahkan PDF (Split PDF)**: Ekstrak halaman atau rentang halaman tertentu (misalnya: 1-3, 5, 8-10) atau pisahkan setiap halaman menjadi berkas tersendiri.
- **Putar Halaman (Rotate PDF)**: Perbaiki orientasi halaman PDF yang miring atau terbalik (rotasi 90 derajat, 180 derajat, atau 270 derajat).
- **Gambar ke PDF (Images to PDF)**: Ubah kumpulan foto atau scan dokumen (JPG, PNG) menjadi satu berkas PDF rapi siap cetak.

### Daftar Templat Baku Bawaan
| Nama Templat | Kategori | Margin Baku | Tipografi Standar | Deskripsi |
|---|---|---|---|---|
| Skripsi / Tugas Akhir | Akademik | 4-4-3-3 cm | Times New Roman, 12pt, Spasi 1.5 | Format baku karya ilmiah perguruan tinggi (Sampul, Pengesahan, Abstrak, Bab I, Daftar Pustaka). |
| Makalah / Karya Ilmiah | Akademik | 4-3-4-3 cm | Times New Roman, 12pt, Spasi 1.5 | Format makalah mahasiswa, seminar ilmiah, dan jurnal terstruktur. |
| Laporan Praktikum | Akademik | 4-3-3-3 cm | Calibri, 11pt, Spasi 1.15 | Sistematika laporan laboratorium, tujuan praktikum, alat & bahan, serta analisis data. |
| Surat Resmi / Dinas | Surat & Dinas | 3-2.5-3-2.5 cm | Arial / Calibri, 11pt, Spasi 1.15 | Standar tata naskah dinas kedinasan & instansi (Kop surat, nomor, lampiran, perihal, tanda tangan). |
| Surat Lamaran Kerja | Surat & Dinas | 2.5 cm rata | Calibri, 11pt, Spasi 1.15 | Format formal korespondensi lamaran kerja HRD dengan ejaan baku. |
| Notula Rapat | Bisnis & Kantor | 2.5 cm rata | Segoe UI / Arial, 11pt, Spasi 1.15 | Format risalah rapat resmi dengan tabel agenda, kehadiran, dan matriks tindak lanjut. |
| CV ATS Standar | Bisnis & Kantor | 2 cm rata | Calibri / Arial, 10.5pt, Spasi 1.15 | Tata letak kurikulum vitae satu kolom ramah pemindaian sistem ATS perusahaan. |
| Memo Internal | Bisnis & Kantor | 2.5 cm rata | Arial, 11pt, Spasi 1.15 | Format memo ringkas untuk komunikasi antar departemen dan pimpinan divisi. |

### Arsitektur & Spesifikasi Teknis
- **Backend**: Rust 2021 dengan Tauri Framework v1.6.
- **I/O & PDF Engine**: `lopdf` v0.31 untuk manipulasi struktur internal PDF (merge, split, rotate) dan `printpdf` v0.7 untuk perakitan kanvas PDF mandiri.
- **Frontend**: HTML5, CSS3 murni, dan Vanilla JavaScript ES6+ (tanpa framework runtime tambahan).
- **Inti Editor**: Quill.js 2.0 (Custom Build dengan ekstensi multi-halaman & multi-seksi).
- **Penyimpanan Berkas**: Format `.baku` berbasis JSON terenkapsulasi dengan mekanisme penulisan atomik (*atomic write*) untuk mencegah korupsi data.
- **Akselerasi Grafis**: Lapisan lembar kertas `#page-sheets-layer` komposit independen yang di-cache langsung oleh GPU.

### Persyaratan Sistem & Instalasi

#### Prasyarat
- Node.js (versi 16 atau lebih baru)
- Rust & Cargo (versi stabil terbaru)
- Dependensi sistem Tauri (disesuaikan dengan OS macOS / Windows / Linux)

#### Menjalankan Proyek
1. Klon repositori:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Instal dependensi frontend:
   ```bash
   npm install
   ```

3. Jalankan dalam mode pengembangan:
   ```bash
   npm run tauri dev
   ```

4. Bangun berkas biner mandiri (*executable*):
   ```bash
   npm run tauri build
   ```

---

## English

### About Baku PDF
Baku PDF is a modern desktop word processor engineered specifically for drafting structured academic papers, undergraduate theses, and official correspondences adhering to strict formatting standards. Rooted in a **local-first** philosophy, all text processing, document rendering, and PDF manipulation take place 100% offline on your device, free from external servers, tracking analytics, and cloud subscriptions.

Powered by **Tauri** and **Rust** with a pure vanilla web frontend, Baku PDF is exceptionally lightweight (low memory footprint of ~50-80 MB RAM), launches instantaneously, and eliminates the layout sluggishness commonly found in Electron-based editors.

### Key Features

1. **Word-Style Home Screen Quick Launcher**:
   - Start with a clean Blank Document.
   - Open existing native `.baku` documents directly.
   - Microsoft Word-style miniature paper template cards (Thesis, Official Letter, Academic Paper) featuring layout lines and standard badges.
   - Direct shortcut to the full template gallery and recently opened document history.

2. **Standard Templates Gallery & Custom Template Creator**:
   - Ready-to-use strict standard templates for theses, research papers, official letters, lab reports, meeting minutes, and ATS resumes.
   - Category filtering (Academic, Letters & Official, Business & Office, My Templates) and real-time search.
   - Split-view preview dialog showcasing paper thumbnail dimensions in portrait or landscape.
   - Build new templates from scratch (*Create New Template*) or save the active editor document as a reusable template (*Save As Template*).
   - Strict standard format lock (*Strict Standard Lock*) to prevent accidental margin and paper size modifications.
   - Export and import standalone `.baku` template files.

3. **Smart Multi-Page & Multi-Section Engine**:
   - Instant 60 FPS Page Breaks (Ctrl/Cmd + Enter) engineered without layout thrashing bottlenecks.
   - High-performance Section Breaks (Ctrl/Cmd + Shift + Enter) allowing independent numbering restarts and varying formatting between chapters.
   - Comprehensive numbering formats: Arabic numerals (1, 2, 3), Lowercase Roman (i, ii, iii), Uppercase Roman (I, II, III), and Alphabetical (A, B, C / a, b, c).
   - Flexible page number positioning: Header or Footer, aligned left, center, or right.
   - Different First Page toggle to suppress numbers on formal title and cover pages.

4. **Interactive Visual Ruler**:
   - Millimeter, centimeter, and inch horizontal ruler with dynamic margin overlays.
   - Three draggable visual markers: First Line Indent, Left Indent, and Right Margin.
   - Synchronized in real time with the active cursor and paragraph.

5. **Typography Styles Gallery & Precision Layout**:
   - Standard style presets: Normal, Document Title, Subtitle, Chapter / Heading 1, Sub-heading / Heading 2, Sub-sub-heading / Heading 3, Blockquote, and Monospace / Code.
   - Font size combobox (8pt to 72pt), line height dropdown (1.0, 1.15, 1.5, 2.0, custom), and color pickers.
   - Academic margin standards (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal, custom) and paper presets (A4, F4/Folio 215x330mm, Letter, Legal).

6. **Integrated Document Utilities**:
   - **Change Case**: Sentence case, lowercase, UPPERCASE, Capitalize Each Word, and tOGGLE cASE.
   - **Real-Time Document Statistics**: Live count of words, characters (with and without spaces), paragraphs, and estimated reading time.
   - **Custom Table Editor**: Interactive table grid creator with a floating toolbar for adding/removing rows and columns and cell alignment.
   - **Image Handling**: Local image insertion, alignment (left, center, right), proportional resizing, and deletion dialog.
   - **Special Characters & Typographic Symbols**: Integrated symbol picker modal.

7. **WYSIWYG PDF Export & Native Printing**:
   - Pixel-perfect PDF generation matching on-screen canvas margins and page boundaries.
   - Direct system print dialog integrated with local printers and copy quantity controls.

### Offline PDF Extra Tools (100% Local)
Baku PDF includes standalone PDF utility tools running entirely on your machine without cloud dependencies:
- **Merge PDF**: Combine two or more PDF files into a single unified document with custom sequencing.
- **Split PDF**: Extract specific page ranges (e.g., 1-3, 5, 8-10) or separate every page into individual files.
- **Rotate PDF**: Correct skewed or inverted pages (rotate 90, 180, or 270 degrees clockwise).
- **Images to PDF**: Convert scanned documents and image collections (JPG, PNG) into a clean PDF document.

### Built-In Standard Templates
| Template Name | Category | Standard Margins | Standard Typography | Description |
|---|---|---|---|---|
| Undergraduate Thesis | Academic | 4-4-3-3 cm | Times New Roman, 12pt, 1.5 Line Spacing | Official university thesis structure (Cover, Approval Sheet, Bilingual Abstract, Chapter I, References). |
| Academic Paper | Academic | 4-3-4-3 cm | Times New Roman, 12pt, 1.5 Line Spacing | Standard research paper format for seminars and journals. |
| Lab Report | Academic | 4-3-3-3 cm | Calibri, 11pt, 1.15 Line Spacing | Laboratory experiment framework with objectives, materials, and data tables. |
| Official Letter | Letter & Official | 3-2.5-3-2.5 cm | Arial / Calibri, 11pt, 1.15 Line Spacing | Standard administrative letter format (Header, letter number, subject, signature block). |
| Job Application Letter | Letter & Official | 2.5 cm equal | Calibri, 11pt, 1.15 Line Spacing | Formal HR application letter layout. |
| Meeting Minutes | Business & Office | 2.5 cm equal | Segoe UI / Arial, 11pt, 1.15 Line Spacing | Professional minutes format with agenda, attendance list, and follow-up matrix. |
| ATS Standard Resume | Business & Office | 2 cm equal | Calibri / Arial, 10.5pt, 1.15 Line Spacing | Single-column curriculum vitae structure optimized for automated ATS parsers. |
| Internal Memo | Business & Office | 2.5 cm equal | Arial, 11pt, 1.15 Line Spacing | Compact internal company memorandum format. |

### Architecture & Tech Stack
- **Backend**: Rust 2021 with Tauri Framework v1.6.
- **I/O & PDF Pipeline**: `lopdf` v0.31 for low-level PDF manipulation (merge, split, rotate) and `printpdf` v0.7 for standalone canvas compilation.
- **Frontend**: HTML5, pure CSS3, and Vanilla JavaScript ES6+ (zero runtime UI frameworks).
- **Editor Engine**: Quill.js 2.0 (Custom Build with multi-page & multi-section blot extensions).
- **Storage Architecture**: Encapsulated `.baku` JSON format with atomic write operations to prevent corruption.
- **Graphics Acceleration**: Composite `#page-sheets-layer` rendered as independent GPU-cached tiles.

### System Requirements & Installation

#### Prerequisites
- Node.js (version 16 or newer)
- Rust & Cargo (latest stable toolchain)
- Platform-specific Tauri build tools (macOS, Windows, or Linux)

#### Running the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run tauri dev
   ```

4. Build release binary:
   ```bash
   npm run tauri build
   ```

---

## Lisensi / License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
