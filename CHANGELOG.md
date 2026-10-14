# Catatan Perubahan / Changelog

**Languages / Bahasa**: [Bahasa Indonesia](#bahasa-indonesia) | [English](#english)

All notable changes to the **Baku PDF** project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Bahasa Indonesia

### [1.0.0] - 2026-10-14

#### Ditambahkan (Added)
- **Editor Dokumen WYSIWYG Berstandar Baku**:
  - Mesin editor teks berbasis Quill 2.0 dengan ekstensi blot kustom untuk penataan dokumen formal.
  - Pengaturan ukuran kertas standar: A4, F4 / Folio (215 × 330 mm), Letter, dan Legal.
  - Preset margin akademis baku: 4-4-3-3 cm (Skripsi), 4-3-4-3 cm (Makalah), 3-3-3-3 cm (Formal), 2.54 cm (Normal), dan pengaturan kustom.
- **Mesin Multi-Halaman & Multi-Seksi Cerdas**:
  - Pemisah Halaman (*Page Break*, Ctrl/Cmd + Enter) instan 60 FPS bebas *layout thrashing*.
  - Pemisah Seksi (*Section Break*, Ctrl/Cmd + Shift + Enter) untuk memulai penomoran bab baru secara terpisah.
  - Format penomoran dokumen fleksibel: Angka Arab (1, 2, 3), Romawi Kecil (i, ii, iii), Romawi Besar (I, II, III), dan Huruf (A, B, C / a, b, c).
  - Opsi Beda Halaman Pertama (*Different First Page*) untuk menyembunyikan penomoran pada halaman sampul dan lembar judul.
- **Penggaris Visual Interaktif (Interactive Visual Ruler)**:
  - Skala penggaris horizontal berskala milimeter, sentimeter, dan inci.
  - Tiga penanda seret visual: Indentasi Baris Pertama, Indentasi Kiri, dan Margin Kanan.
- **Tipografi & Gaya Dokumen Presisi**:
  - Palet gaya format dokumen: Normal, Judul Dokumen, Subjudul, Bab / Judul 1, Sub-bab / Judul 2, Sub-sub-bab / Judul 3, Kutipan Langsung (*Blockquote*), dan Monospace / Kode.
  - Pemilih ukuran huruf presisi (8pt hingga 72pt), pemilih tinggi baris (*Line Height*: 1.0, 1.15, 1.5, 2.0, kustom), dan pemilih palet warna teks/latar.
  - Perbaikan rendering font default Times New Roman pada lembar kerja.
- **Galeri Templat Baku & Pembuat Templat Kustom**:
  - 8 templat bawaan resmi siap pakai: Skripsi / Tugas Akhir, Makalah / Karya Ilmiah, Laporan Praktikum, Surat Resmi / Dinas, Surat Lamaran Kerja, Notula Rapat, CV ATS Standar, dan Memo Internal.
  - Pembuat templat baru dari nol (*Create New Template*) atau simpan dokumen editor yang sedang aktif menjadi templat (*Save As Template*).
  - Opsi penguncian standar baku (*Strict Standard Lock*) untuk menjamin format margin dan kertas tidak sengaja berubah.
  - Fitur ekspor dan impor berkas templat mandiri `.baku`.
- **Peluncur Cepat Beranda (Word-Style Home Screen)**:
  - Kartu miniatur kertas templat dokumen siap pakai ala Microsoft Word dengan garis thumbnail tata letak dan pill badge baku.
  - Tabel riwayat dokumen terakhir (*Recent Documents*) yang tersinkronisasi otomatis dengan folder penyimpanan kerja.
- **Alat Ekstra PDF Mandiri & Privat (100% Luring)**:
  - Gabungkan PDF (*Merge PDF*): Menggabungkan dua atau lebih berkas PDF menjadi satu dokumen berurutan.
  - Pisahkan PDF (*Split PDF*): Mengekstrak rentang halaman tertentu atau memecah setiap halaman menjadi berkas tersendiri.
  - Putar Halaman (*Rotate PDF*): Memutar halaman 90, 180, atau 270 derajat.
  - Gambar ke PDF (*Images to PDF*): Mengubah kumpulan foto JPG/PNG menjadi satu berkas PDF siap cetak.
- **Penyunting Tabel & Gambar Terpadu**:
  - Pembuat tabel matriks baris x kolom dengan toolbar mengambang (*floating toolbar*) untuk menambah/menghapus baris/kolom dan perataan sel.
  - Penyunting gambar lokal dengan pengaturan perataan, proporsi ukuran, dan penghapusan aman.
- **Utilitas Teks Tambahan**:
  - Ubah Kapitalisasi teks (*Change Case*): Sentence case, lowercase, UPPERCASE, Capitalize Each Word, dan tOGGLE cASE.
  - Statistik dokumen *real-time*: Hitungan kata, karakter, paragraf, dan estimasi waktu baca.
  - Dialog pemilih simbol tipografi dan karakter khusus.
- **Integrasi Desktop & Ekspor WYSIWYG**:
  - Ekspor PDF WYSIWYG berpresisi tinggi sesuai batas kanvas editor.
  - Dialog cetak terintegrasi langsung dengan daftar printer sistem operasi lokal.
  - Dukungan dwibahasa penuh (Bahasa Indonesia & English) tersinkronisasi dinamis dengan menu bar native sistem operasi (macOS & Windows).
  - Adaptasi dinamis simbol shortcut papan ketik multi-OS (macOS ⌘/⌥, Windows Alt+F4, Linux Ctrl+Q).
  - Installer macOS DMG Universal Binary (x86_64 Intel + arm64 Apple Silicon) dengan pencegat eksekusi volume sementara (*DMG launch guard*).

#### Keamanan (Security)
- Arsitektur *local-first* murni: seluruh pemrosesan berjalan 100% luring di perangkat pengguna tanpa transmisi jaringan atau telemetri.
- Penulisan berkas `.baku` atomik di sisi backend Rust untuk mencegah korupsi data saat sistem tertutup tiba-tiba.

---

## English

### [1.0.0] - 2026-10-14

#### Added
- **Standardized WYSIWYG Document Editor**:
  - Modern text editor core based on Quill 2.0 with custom blot extensions for formal formatting.
  - Standard paper size configurations: A4, F4 / Folio (215 × 330 mm), Letter, and Legal.
  - Standard academic margin presets: 4-4-3-3 cm (Thesis), 4-3-4-3 cm (Paper), 3-3-3-3 cm (Formal), 2.54 cm (Normal), and custom settings.
- **Smart Multi-Page & Multi-Section Engine**:
  - Instant 60 FPS Page Breaks (Ctrl/Cmd + Enter) free from layout thrashing bottlenecks.
  - High-performance Section Breaks (Ctrl/Cmd + Shift + Enter) for restarting numbering or modifying headers across chapters.
  - Diverse numbering formats: Arabic numerals (1, 2, 3), Lowercase Roman (i, ii, iii), Uppercase Roman (I, II, III), and Alphabetical (A, B, C / a, b, c).
  - Different First Page toggle to suppress numbering on cover and title pages.
- **Interactive Visual Ruler**:
  - Horizontal ruler scale in millimeters, centimeters, and inches.
  - Three draggable markers: First Line Indent, Left Indent, and Right Margin.
- **Precision Typography & Document Styles**:
  - Comprehensive style palette: Normal, Title, Subtitle, Headings 1 through 3, Blockquote, and Monospace / Code.
  - Font size selector (8pt to 72pt), line height dropdown (1.0, 1.15, 1.5, 2.0, custom), and color pickers.
  - Resolved default Times New Roman font rendering across the document editor.
- **Standard Templates Gallery & Custom Template Builder**:
  - 8 built-in official templates: Undergraduate Thesis, Academic Paper, Lab Report, Official Letter, Job Application Letter, Meeting Minutes, ATS Standard Resume, and Internal Memo.
  - Create new templates from scratch (*Create New Template*) or save the active editor document as a reusable template (*Save As Template*).
  - Strict Standard Lock to prevent accidental margin and paper size modifications.
  - Import and export standalone `.baku` template files.
- **Word-Style Home Screen Quick Launcher**:
  - Microsoft Word-style miniature paper template cards with thumbnail guidelines and official badges.
  - Recent Documents history table automatically synchronized with the working workspace folder.
- **Offline PDF Extra Utilities (100% Local)**:
  - Merge PDF: Combine two or more PDF files into a single unified document.
  - Split PDF: Extract specific pages or custom ranges (e.g., 1-3, 5, 8-10).
  - Rotate PDF: Reorient pages by 90, 180, or 270 degrees.
  - Images to PDF: Convert JPG/PNG scanned document collections into clean printable PDFs.
- **Integrated Table & Image Editors**:
  - Visual matrix table creator with floating toolbar for adding/removing rows and columns and cell alignment.
  - Local image insertion with alignment options, proportional resizing, and safe deletion.
- **Document Utilities & Typography Tools**:
  - Change Case: Sentence case, lowercase, UPPERCASE, Capitalize Each Word, and tOGGLE cASE.
  - Real-time document statistics: Live word, character, and paragraph counts with estimated reading time.
  - Special symbols and typographic character picker dialog.
- **Desktop Integration & WYSIWYG Export**:
  - Pixel-perfect WYSIWYG PDF export matching on-screen margins.
  - Native print dialog directly integrated with local operating system printers.
  - Full bilingual support (English and Bahasa Indonesia) synchronized with native OS menu bars.
  - Dynamic multi-OS keyboard shortcut adaptation (macOS ⌘/⌥, Windows Alt+F4, Linux Ctrl+Q).
  - Universal Binary macOS DMG Installer (x86_64 Intel + arm64 Apple Silicon) with automated Applications drag-and-drop and launch guard.

#### Security
- Pure local-first architecture: all processing runs 100% offline without network requests or telemetry tracking.
- Atomic file writing for `.baku` documents in the Rust backend to safeguard data integrity against sudden power failures.
