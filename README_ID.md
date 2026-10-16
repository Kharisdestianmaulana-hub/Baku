<div align="center">
  <p>
    <strong>Bahasa / Languages:</strong><br />
    <a href="README.md">English</a> |
    <strong>Bahasa Indonesia</strong> |
    <a href="readme/README_ES.md">Español</a> |
    <a href="readme/README_FR.md">Français</a> |
    <a href="readme/README_DE.md">Deutsch</a> |
    <a href="readme/README_JA.md">日本語</a> |
    <a href="readme/README_ZH.md">简体中文</a> |
    <a href="readme/README_PT.md">Português</a> |
    <a href="readme/README_RU.md">Русский</a> |
    <a href="readme/README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Pengolah Kata Desktop Berstandar Baku, Super Ringan, dan 100% Privat</strong></p>

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

## Daftar Isi
- [Tentang Baku PDF](#tentang-baku-pdf)
- [Fitur Utama](#fitur-utama)
- [Alat Ekstra PDF (100% Luring)](#alat-ekstra-pdf-100-luring)
- [Daftar Templat Baku Bawaan](#daftar-templat-baku-bawaan)
- [Peta Jalan Pembaruan Mendatang (v1.1.0 – v1.5.0 & Selanjutnya)](#peta-jalan-pembaruan-mendatang-v110--v150--selanjutnya)
- [Arsitektur & Spesifikasi Teknis](#arsitektur--spesifikasi-teknis)
- [Persyaratan Sistem & Instalasi](#persyaratan-sistem--instalasi)
- [Dokumentasi Lengkap](#dokumentasi-lengkap)
- [Lisensi](#lisensi)

---

## Tentang Baku PDF

Baku PDF adalah aplikasi pengolah kata desktop modern yang dirancang untuk mempermudah penyusunan karya ilmiah, tugas akhir, skripsi, dan surat dinas resmi dengan standar format baku yang presisi. Aplikasi ini berpegang pada filosofi **local-first**: seluruh pemrosesan teks, render halaman, dan manipulasi PDF berjalan 100% secara luring di komputer Anda tanpa server, tanpa analitik pelacak, dan tanpa langganan awan.

Dibangun dengan **Tauri** dan **Rust** serta lapisan tampilan web vanilla murni, Baku PDF berbobot sangat ringan (konsumsi memori RAM rendah ~50-80 MB), memiliki waktu mulai instan, dan bebas dari kelambatan (*lag*) yang umumnya dijumpai pada aplikasi pengolah dokumen berbasis Electron.

---

## Fitur Utama

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

---

## Alat Ekstra PDF (100% Luring)

Baku PDF menyediakan utilitas pengolahan PDF mandiri langsung di perangkat Anda tanpa bantuan server luar:
- **Gabungkan PDF (Merge PDF)**: Satukan dua atau lebih berkas PDF menjadi satu dokumen utuh dengan urutan yang dapat diatur.
- **Pisahkan PDF (Split PDF)**: Ekstrak halaman atau rentang halaman tertentu (misalnya: 1-3, 5, 8-10) atau pisahkan setiap halaman menjadi berkas tersendiri.
- **Putar Halaman (Rotate PDF)**: Perbaiki orientasi halaman PDF yang miring atau terbalik (rotasi 90 derajat, 180 derajat, atau 270 derajat).
- **Gambar ke PDF (Images to PDF)**: Ubah kumpulan foto atau scan dokumen (JPG, PNG) menjadi satu berkas PDF rapi siap cetak.

---

## Daftar Templat Baku Bawaan

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

---

## Peta Jalan Pembaruan Mendatang (v1.1.0 – v1.5.0 & Selanjutnya)

Kami memelihara dokumen rencana kerja pengembangan terbuka yang merinci fitur-fitur baru, peningkatan arsitektur, dan rilis multi-platform untuk rilis bertahap v1.1.0 hingga v1.5.0 serta pembaruan selanjutnya:

- **Bilah Tab Multi-Dokumen**: Buka, sunting, dan beralih di antara banyak dokumen `.baku` dalam satu jendela aplikasi dengan isolasi status pengetikan dan pengguliran horizontal halus.
- **Kompresor Ukuran Berkas PDF Luring**: Preset target instan (<500 KB, <1 MB, <2 MB) dan setelan resolusi DPI gambar tanpa server awan.
- **Paket Distribusi Windows & Linux**: Installer NSIS Windows (`.exe`), edisi portabel tanpa instalasi, serta paket Linux `AppImage` dan Debian `.deb`.
- **Aturan Penomoran Halaman Skripsi Baku**: Penomoran halaman otomatis di tengah bawah untuk lembar judul bab dan sudut kanan atas untuk halaman lanjutan.
- **Fitur Ilmiah Luring Lanjutan**: Notasi matematika KaTeX luring, tabel ilmiah gaya booktabs, penyusun urutan halaman visual, dan tanda tangan digital luring.

### Dokumentasi Rencana Pembaruan Berdasarkan Bahasa

Seluruh perencanaan fitur baru, peta jalan teknis, dan catatan versi masa depan dipelihara dalam berkas terpisah sesuai bahasa di dalam direktori [`Update/`](Update/):

| Bahasa | Tautan Berkas | Keterangan / Cakupan |
| :--- | :--- | :--- |
| **Bahasa Indonesia** | [Update_Baku_id.md](Update/Update_Baku_id.md) | Rencana pembaruan resmi dan spesifikasi fitur Bahasa Indonesia. |
| **English** | [Update_Baku_en.md](Update/Update_Baku_en.md) | Official English release roadmap and feature specifications. |
| **Español** | [Update_Baku_es.md](Update/Update_Baku_es.md) | Hoja de ruta oficial y especificaciones de funciones en español. |
| **Français** | [Update_Baku_fr.md](Update/Update_Baku_fr.md) | Feuille de route officielle et spécifications des fonctionnalités en français. |
| **Deutsch** | [Update_Baku_de.md](Update/Update_Baku_de.md) | Offizielle Roadmap und Funktionsspezifikationen auf Deutsch. |
| **日本語** | [Update_Baku_ja.md](Update/Update_Baku_ja.md) | 日本語公式リリースロードマップおよび機能仕様書。 |
| **简体中文** | [Update_Baku_zh.md](Update/Update_Baku_zh.md) | 官方简体中文版本路线图及规划功能规范。 |
| **Português** | [Update_Baku_pt.md](Update/Update_Baku_pt.md) | Roteiro oficial de lançamentos e especificações em português. |
| **Русский** | [Update_Baku_ru.md](Update/Update_Baku_ru.md) | Официальный план развития и спецификации функций на русском языке. |
| **العربية** | [Update_Baku_ar.md](Update/Update_Baku_ar.md) | خارطة طريق الإصدارات الرسمية والمواصفات باللغة العربية. |

---

## Arsitektur & Spesifikasi Teknis

- **Backend**: Rust 2021 dengan Tauri Framework v1.6.
- **I/O & PDF Engine**: `lopdf` v0.31 untuk manipulasi struktur internal PDF (merge, split, rotate) dan `printpdf` v0.7 untuk perakitan kanvas PDF mandiri.
- **Frontend**: HTML5, CSS3 murni, dan Vanilla JavaScript ES6+ (tanpa framework runtime tambahan).
- **Inti Editor**: Quill.js 2.0 (Custom Build dengan ekstensi multi-halaman & multi-seksi).
- **Penyimpanan Berkas**: Format `.baku` berbasis JSON terenkapsulasi dengan mekanisme penulisan atomik (*atomic write*) untuk mencegah korupsi data.
- **Akselerasi Grafis**: Lapisan lembar kertas `#page-sheets-layer` komposit independen yang di-cache langsung oleh GPU.

---

## Persyaratan Sistem & Instalasi

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- Rust & Cargo (versi stabil terbaru)
- Dependensi sistem Tauri (disesuaikan dengan OS macOS / Windows / Linux)

### Menjalankan Proyek
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

## Dokumentasi Lengkap

Kami menyediakan dokumentasi teknis dan panduan komunitas lengkap untuk mendukung transparansi serta kolaborasi sumber terbuka:

| Dokumen | Deskripsi |
| :--- | :--- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Panduan kontribusi, alur kerja Git, dan standar kode. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Spesifikasi teknis, alur IPC Tauri, dan format `.baku`. |
| [CHANGELOG.md](CHANGELOG.md) | Riwayat pembaruan dan catatan rilis versi. |
| [SECURITY.md](SECURITY.md) | Kebijakan keamanan dan pelaporan celah kerentanan. |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Norma komunitas dan standar interaksi kontributor. |
| [Peta Jalan Pembaruan (v1.1.0 – v1.5.0)](Update/Update_Baku_id.md) | Peta jalan multi-bahasa dan daftar rencana fitur untuk versi pembaruan mendatang. |

---

## Lisensi

Proyek ini dilisensikan di bawah naungan Lisensi MIT. Lihat berkas [LICENSE](LICENSE) untuk informasi lebih lanjut.
