# Rencana Pembaruan Baku PDF Versi 1.5 (Roadmap & Feature List)

Dokumen ini memuat daftar rencana fitur, peningkatan performa, dan ekspansi modul untuk rilis **Baku PDF v1.5**. Pembaruan ini difokuskan pada penguatan ekosistem penulisan akademik dan kedinasan, penambahan alat manipulasi PDF luring, dukungan lintas platform penuh (Windows, macOS, Linux), serta efisiensi perenderan dokumen skala besar.

Prinsip utama pengembangan tetap dipertahankan:
- **100% Luring (Offline-First)**: Seluruh pemrosesan berjalan di komputer lokal tanpa server awan.
- **Privasi Mutlak**: Tanpa pelacak, telemetri, atau transmisi data keluar.
- **Konsumsi Sumber Daya Rendah**: Performa cepat dan hemat memori RAM.
- **Desain Minimalis Flat 2D**: Antarmuka bersih, fungsional, dan bebas distrasi.
- **Standar Format Baku**: Mengikuti kaidah tata tulis ilmiah dan administrasi resmi.

---

## Daftar Isi Rencana Pembaruan

1. [Editor Dokumen & Tipografi Baku Ilmiah](#1-editor-dokumen--tipografi-baku-ilmiah)
2. [Manajemen Struktur Dokumen Akademik Otomatis](#2-manajemen-struktur-dokumen-akademik-otomatis)
3. [Ekspansi Alat Ekstra PDF Luring](#3-ekspansi-alat-ekstra-pdf-luring)
4. [Koleksi Templat Standar Baru](#4-koleksi-templat-standar-baru)
5. [Dukungan Multi-Platform & Distribusi Biner](#5-dukungan-multi-platform--distribusi-biner)
6. [Arsitektur Inti, Performa, & Penanganan Dokumen Tebal](#6-arsitektur-inti-performa--penanganan-dokumen-tebal)
7. [Antarmuka Pengguna, Navigasi, & Aksesibilitas](#7-antarmuka-pengguna-navigasi--aksesibilitas)
8. [Interoperabilitas Format & Kompatibilitas Berkas](#8-interoperabilitas-format--kompatibilitas-berkas)
9. [Keamanan Dokumen & Pembersihan Metadata](#9-keamanan-dokumen--pembersihan-metadata)

---

## 1. Editor Dokumen & Tipografi Baku Ilmiah

### 1.1. Notasi Matematika & Rumus Ilmiah (KaTeX Luring)
- Integrasi parser formula KaTeX yang dikemas secara luring di dalam bundel aplikasi.
- Penyisipan blok persamaan matematika interaktif (`Inline Math` dan `Block Equation`).
- Penomoran otomatis persamaan di tepi kanan lembar kertas: `(1.1)`, `(1.2)`, dll.
- Dukungan simbol kalkulus, matriks, aljabar linear, dan notasi fisika/kimia standar.

### 1.2. Penggaris Lembar Kertas & Pengatur Indentasi Interaktif (Interactive Ruler)
- Menampilkan penggaris horizontal di atas lembar kertas dengan satuan sentimeter (cm) dan inci.
- Penanda seret visual (*draggable handles*) untuk:
  - Indentasi baris pertama (*First Line Indent*).
  - Indentasi gantung (*Hanging Indent*).
  - Margin kiri dan margin kanan halaman aktif.
- Panduan garis bantu putus-putus (*snap-to-grid guidelines*) saat menyeret elemen.

### 1.3. Pemformatan Tabel Tingkat Lanjut (Advanced Scientific Tables)
- Penggabungan sel horizontal (*Merge Columns*) dan vertikal (*Merge Rows*).
- Pemisah batas sel kustom: tabel tanpa garis vertikal sesuai konvensi publikasi ilmiah (hanya garis atas, garis bawah header, dan garis penutup).
- Perataan teks per kolom: kiri, tengah, kanan, atau penyesuaian angka desimal pada titik koma.
- Pengulangan baris judul tabel secara otomatis jika tabel terpotong ke halaman berikutnya (*Repeat Header Row across Pages*).
- Penomoran otomatis judul tabel: `Tabel 1.1: Judul Tabel`.

### 1.4. Pemeriksa Ejaan & Panduan PUEBI/KBBI Luring
- Kamus kata dasar Bahasa Indonesia luring terintegrasi untuk pendeteksian salah ketik (*typo*).
- Penanda garis bawah merah lembut untuk kata di luar perbendaharaan baku.
- Saran koreksi kata baku melalui menu klik kanan (misal: *analisa* -> *analisis*, *praktek* -> *praktik*, *jadual* -> *jadwal*).
- Pemisahan suku kata otomatis (*Hyphenation*) berdasarkan kaidah fonologi Bahasa Indonesia untuk paragraf rata kiri-kanan (*Justify*) agar spasi antar-kata tidak renggang berlebihan.

---

## 2. Manajemen Struktur Dokumen Akademik Otomatis

### 2.1. Penomoran Halaman Bertingkat Campuran (Hybrid Page Numbering)
- Pemisahan seksi dokumen (*Section Break*) untuk skripsi, tesis, dan disertasi:
  - **Seksi Awal**: Romawi kecil di tengah bawah (`i`, `ii`, `iii`, `iv`) untuk Halaman Judul, Pengesahan, Abstrak, dan Daftar Isi.
  - **Seksi Isi**: Angka Arab (`1`, `2`, `3`) untuk Bab I hingga Daftar Pustaka.
- Penyesuaian posisi nomor halaman bab baru:
  - Halaman awal setiap Bab diletakkan di **tengah bawah**.
  - Halaman lanjutan bab diletakkan di **sudut kanan atas**.
- Opsi pengecualian nomor halaman pada halaman sampul depan (*Different First Page*).

### 2.2. Pembuat Daftar Isi Otomatis (Dynamic Table of Contents)
- Pembangkitan Daftar Isi instan berdasarkan hierarki heading dokumen (Heading 1 = Bab, Heading 2 = Sub-bab, Heading 3 = Anak Sub-bab).
- Garis titik-titik pemandu (*dot leaders*) otomatis yang menghubungkan judul bab dengan nomor halaman.
- Tombol pembaruan satu klik (*Update Entire Table*) saat terjadi pergeseran halaman atau perubahan judul bab.

### 2.3. Pembuat Daftar Tabel & Daftar Gambar Otomatis
- Pelacakan otomatis seluruh keterangan (*caption*) tabel dan gambar dalam naskah.
- Penyusunan otomatis halaman Daftar Tabel dan Daftar Gambar dengan nomor halaman sinkron.

### 2.4. Pengelola Sitasi & Daftar Pustaka Luring (Citation Manager)
- Input bibliografi manual atau impor dari berkas pustaka BibTeX (`.bib`) dan RIS.
- Format sitasi otomatis dalam naskah:
  - Gaya APA 7th Edition: `(Maulana, 2026)`
  - Gaya IEEE: `[1]`
  - Gaya Harvard: `(Maulana 2026, hlm. 45)`
  - Gaya Vancouver
- Penyusunan Daftar Pustaka otomatis di akhir dokumen yang terurut secara alfabetis atau kronologis nomor kutipan.

---

## 3. Ekspansi Alat Ekstra PDF Luring

### 3.1. Kompresor Ukuran Berkas PDF (Offline PDF Compressor)
- Pengurangan ukuran berkas PDF secara lokal menggunakan pustaka Rust teroptimasi tanpa menurunkan keterbacaan teks naskah.
- Preset target kompresi instan:
  - **Di bawah 500 KB**: Standar unggah portal pendaftaran CPNS, BUMN, dan beasiswa.
  - **Di bawah 1 MB**: Standar portal akademik dan repositori tugas akhir.
  - **Di bawah 2 MB**: Standar berkas publikasi umum.
  - **Kustom**: Input manual target resolusi DPI gambar (150 DPI, 96 DPI, 72 DPI).
- Tampilan estimasi ukuran sebelum dan sesudah kompresi sebelum berkas disimpan.

### 3.2. Penandatangan & Pembubuh Paraf Digital Luring (Offline Signature & Stamp)
- Penggambaran tanda tangan langsung menggunakan kursor/stylus atau impor gambar tanda tangan berlatar transparan (PNG).
- Penempatan tanda tangan pada halaman mana pun dengan pratinjau seret-dan-lepas (*drag-and-drop*).
- Fitur tanda tangan massal pada koordinat tetap untuk dokumen multi-halaman.
- Pembubuhan stempel tanggal dan paraf luring.

### 3.3. Proteksi & Enkripsi Kata Sandi PDF (PDF Password Protect & Decrypt)
- Pemasangan kata sandi buka dokumen (*User Password*) menggunakan enkripsi standar industri AES-256 luring.
- Pemasangan kata sandi izin (*Owner/Permissions Password*):
  - Membatasi pencetakan dokumen.
  - Membatasi penyalinan teks dan ekstraksi konten.
  - Membatasi modifikasi anotasi.
- Alat penghapus proteksi sandi (bagi pemilik berkas yang memiliki kata sandi sah).

### 3.4. Penyusun & Pemilah Halaman Visual (Visual Page Organizer & Reorder)
- Antarmuka kisi thumbnail visual untuk setiap halaman PDF.
- Pemindahan urutan halaman dengan seret-dan-lepas (*drag-and-drop reordering*).
- Penghapusan halaman tunggal atau rentang halaman tertentu dengan tombol cepat.
- Penyisipan halaman kosong atau penyisipan halaman dari berkas PDF lain ke titik tertentu.

### 3.5. Penomoran Halaman PDF Eksternal (Bates Numbering & PDF Page Stamper)
- Penomoran berkas PDF pihak ketiga yang belum memiliki nomor halaman.
- Konfigurasi letak nomor: sudut kanan atas, sudut kanan bawah, atau tengah bawah.
- Konfigurasi awalan teks (misal: `Lampiran Halaman 1 dari 10`, `Hal. 1`, atau nomor perkara peradilan).

### 3.6. Pembubuh Watermark / Cap Teks Luring (PDF Watermark Tool)
- Pembubuhan teks watermark diagonal (kemiringan 45 derajat) atau horizontal.
- Preset kata: `DRAFT`, `SALINAN RESMI`, `RAHASIA`, `CONFIDENTIAL`, `SAMPLE`.
- Pengaturan transparansi teks (*opacity*), ukuran huruf, warna, dan pemilihan rentang halaman sasaran.

---

## 4. Koleksi Templat Standar Baru

### 4.1. Templat Publikasi & Jurnal Ilmiah
- **Jurnal Ilmiah Format SINTA (Kolom Ganda)**:
  - Tata letak dua kolom presisi dengan judul satu kolom penuh.
  - Blok abstrak dwibahasa (Bahasa Indonesia & Bahasa Inggris) dengan kata kunci (*keywords*).
  - Struktur IMRAD baku: Pendahuluan, Metode, Hasil dan Pembahasan, Kesimpulan.
- **Paper Prosiding Standar IEEE**:
  - Standar ukuran margin, font Times New Roman 10pt/8pt, dan penataan grafik dua kolom.

### 4.2. Templat Karir & Profesional ATS-Friendly
- **Curriculum Vitae (CV) Standar Baku ATS**:
  - Format satu kolom tanpa elemen grafis yang membingungkan sistem pemindai pelamar kerja.
  - Tipografi rapi terstruktur: Data Pribadi, Ringkasan Profesional, Pengalaman Kerja, Pendidikan, Keterampilan, dan Sertifikasi.
- **Surat Lamaran Kerja Formal (Cover Letter)**:
  - Format baku surat permohonan kerja resmi dalam Bahasa Indonesia dan Bahasa Inggris.

### 4.3. Templat Administrasi Kampus & Hibah Penelitian
- **Proposal Program Kreativitas Mahasiswa (PKM Kemendikbudristek)**:
  - Format baku sesuai panduan pedoman PKM terbaru: lembar pengesahan, rincian anggaran biaya format tabel baku, dan jadwal kegiatan.
- **Laporan Praktik Kerja Lapangan (PKL) / Magang Industri**:
  - Struktur pelaporan kegiatan mingguan, profil institusi mitra, dan logbook kegiatan.
- **Proposal Tesis & Disertasi Pascasarjana**:
  - Standar metodologi penelitian mendalam, kerangka pemikiran konseptual, dan hipotesis.

### 4.4. Templat Administrasi Pemerintahan & Lembaga Resmi
- **Nota Dinas & Surat Perintah Tugas (SPT)**:
  - Format administrasi instansi pemerintah dengan kop naskah dinas, dasar pertimbangan, dan diktum penetapan tugas.
- **Surat Keputusan (SK) Resmi**:
  - Format standar perundang-undangan: konsiderans Menimbang, Mengingat, Memperhatikan, dan Menetapkan.
- **Berita Acara Serah Terima (BAST)**:
  - Format baku penyerahan pekerjaan fisik atau dokumen dengan klausul saksi.

### 4.5. Sistem Templat Pengguna Kustom (Custom User Templates)
- Simpan dokumen aktif sebagai templat baru buatan pengguna (*Save as My Template*).
- Ekspor dan impor templat kustom dalam format berkas berkas tunggal `.bakutpl`.
- Pengelompokan kategori templat kustom di Galeri Templat.

---

## 5. Dukungan Multi-Platform & Distribusi Biner

### 5.1. Rilis Sistem Operasi Windows
- **Installer NSIS Terbimbing (`.exe`)**:
  - Installer 64-bit (`x64`) dan ARM64 untuk Windows 10 dan Windows 11.
  - Integrasi pintasan Menu Mulai (*Start Menu*), Desktop, dan pembuat asosiasi berkas `.baku`.
  - Pemasangan uninstaller bersih tanpa meninggalkan sisa sampah di registri.
- **Edisi Portabel Mandiri (`Baku_Portable.exe`)**:
  - Eksekusi langsung tanpa memerlukan hak administrator, cocok untuk komputer laboratorium atau warnet.
- **Dukungan Microsoft Package Manager (`winget`)**:
  - Penerbitan manifes rilis ke repositori resmi `winget-pkgs`:
    ```cmd
    winget install Baku.BakuPDF
    ```

### 5.2. Rilis Sistem Operasi Linux
- **Paket Universal `AppImage`**:
  - Satu berkas mandiri siap jalan yang kompatibel dengan berbagai distribusi (Ubuntu, Fedora, Arch Linux, Debian, openSUSE).
- **Paket Debian / Ubuntu (`.deb`)**:
  - Paket biner native dengan pemenuhan dependensi `webkit2gtk-4.1`.
- **Dukungan Flathub & Arch User Repository (AUR)**:
  - Pembuatan manifes `flatpak` untuk ekosistem distribusi terisolasi sandbox.
  - Paket `baku-bin` pada repositori komunitas Arch Linux (AUR).

### 5.3. Pembaruan Paket macOS
- **Universal Binary DMG**:
  - Satu paket `.dmg` yang mendukung arsitektur Apple Silicon (M1/M2/M3/M4) dan prosesor Intel x86_64 secara terpadu.
- **Distribusi Homebrew Cask**:
  - Dukungan instalasi praktis melalui terminal macOS:
    ```bash
    brew install --cask baku-pdf
    ```

---

## 6. Arsitektur Inti, Performa, & Penanganan Dokumen Tebal

### 6.1. Virtualisasi Lembar Kertas (Infinite Virtual DOM Page Rendering)
- Render hanya lembar kertas yang sedang berada dalam area pandang (*viewport*) layar pengguna ditambah buffer 1-2 halaman sebelum dan sesudah.
- Memungkinkan pembukaan dokumen berbobot lebih dari 500 halaman (seperti buku ajar dan draf disertasi utuh) tanpa lonjakan konsumsi memori RAM.
- Waktu respons pengetikan (*input latency*) tetap berada di bawah 8 milidetik terlepas dari ketebalan dokumen.

### 6.2. Mesin Pengekspor PDF Native Rust Murni
- Transisi modul ekspor PDF utama ke pustaka Rust native (`printpdf` dan `lopdf`) untuk melengkapi mekanisme cetak WebView.
- Hasil ekspor menghasilkan teks berbasis vektor murni yang dapat disalin (*searchable and selectable text*) dengan ukuran berkas keluaran hingga 60% lebih ringkas.
- Penanaman font (*Font Subsetting*) otomatis: hanya glif font yang digunakan yang disematkan ke dalam berkas PDF, menjaga ukuran PDF tetap efisien.

### 6.3. Sistem Simpan Otomatis & Pemulihan Pasca Gangguan (Crash Auto-Recovery)
- Penyimpanan berkas berkala (*Auto-Save*) setiap 60 detik ke direktori penyimpanan lokal terisolasi.
- Jika komputer mati mendadak atau aplikasi terhenti paksa, sesi dokumen yang belum tersimpan akan ditampilkan dalam dialog pemulihan otomatis saat aplikasi dibuka kembali.
- Riwayat snapshot versi lokal (*Local Revision History*) yang memungkinkan pengembalian dokumen ke status penulisan 15, 30, atau 60 menit sebelumnya.

---

## 7. Antarmuka Pengguna, Navigasi, & Aksesibilitas

### 7.1. Bilah Samping Navigasi Dokumen (Document Outline & Navigator Sidebar)
- Panel bilah samping kiri yang dapat dibuka-tutup (*Collapsible Sidebar*):
  - **Tab Navigasi Judul**: Pohon hierarki Bab dan Sub-bab; mengeklik judul akan langsung menggulir layar ke halaman bersangkutan.
  - **Tab Thumbnail Halaman**: Tinjauan miniatur seluruh halaman dokumen secara vertikal.
  - **Tab Hasil Pencarian**: Menampilkan daftar kutipan kalimat yang cocok saat menggunakan fitur Temukan & Ganti (*Find & Replace*).

### 7.2. Mode Gelap & Terang Adaptif Penuh (Adaptive Dark/Light Themes)
- Tema Gelap Khusus (*True Dark Theme*) yang dirancang dengan rasio kontras tinggi sesuai standar WCAG AAA.
- Pilihan representasi lembar kertas di Mode Gelap:
  - *Kertas Terang di Lingkungan Gelap* (representasi fisik asli cetak).
  - *Kertas Terbalik Gelap* (mode kenyamanan membaca malam hari untuk mengurangi kelelahan mata).
- Sinkronisasi otomatis dengan preferensi tema sistem operasi (*Follow System Theme*).

### 7.3. Mode Penulisan Bebas Gangguan (Zen / Distraction-Free Mode)
- Menyembunyikan seluruh bilah menu, tombol alat, dan panel navigasi dengan satu tombol pintas (`F11` atau `Cmd+Shift+F`).
- Hanya menampilkan lembar kertas terpusat dengan latar belakang redup untuk fokus penuh pada pembuatan draf naskah.

### 7.4. Kustomisasi Skala Tampilan & Tata Letak Multi-Halaman
- Kontrol perbesaran (*Zoom Control*) fleksibel:
  - Pilihan cepat: 50%, 75%, 100%, 125%, 150%, 200%.
  - Opsi *Fit to Width* (Sesuaikan Lebar Jendela) dan *Fit to Page* (Sesuaikan Satu Halaman Penuh).
- Tampilan Berdampingan (*Two-Page Spread View*): Menampilkan dua halaman lembar kertas berdampingan secara horizontal pada monitor layar lebar.

---

## 8. Interoperabilitas Format & Kompatibilitas Berkas

### 8.1. Impor & Konversi Berkas Word (.docx) Luring
- Parser berkas `.docx` lokal murni berbasis Rust untuk membaca naskah Word yang sudah ada.
- Menjaga integritas pemformatan dasar: teks tebal, miring, garis bawah, tabel, paragraf, dan daftar butir/nomor.
- Mengonversi otomatis margin dan ukuran kertas ke standar format baku Baku PDF.

### 8.2. Ekspor ke Format Naskah Standar
- Ekspor ke berkas `.docx` (Microsoft Word) untuk kebutuhan peninjauan oleh dosen pembimbing atau instansi yang mewajibkan format Word.
- Ekspor ke berkas teks polos (`.txt`) dan Markdown ilmiah (`.md`).

### 8.3. Penyempurnaan Format Berkas .baku (Spesifikasi v2.0)
- Menambahkan penampung lampiran berkas biner di dalam struktur JSON `.baku` (misalnya gambar beresolusi tinggi yang terkompresi secara lossless).
- Penyimpanan daftar pustaka internal dan status nomor halaman per seksi.
- Kompatibilitas mundur penuh (*backward-compatible*): berkas `.baku` versi 1.0.0 tetap dapat dibuka sempurna pada versi 1.5.

---

## 9. Keamanan Dokumen & Pembersihan Metadata

### 9.1. Pembersih Jejak Metadata Dokumen (Metadata Sanitizer)
- Pembersihan metadata tersembunyi sebelum berkas diekspor ke PDF publik:
  - Menghapus nama pembuat asli, nama perangkat komputer, dan riwayat path folder lokal.
  - Menghapus cap waktu penyuntingan tersembunyi.
- Sangat penting untuk proses *Blind Review* artikel jurnal ilmiah dan dokumen rahasia instansi.

### 9.2. Penguncian Dokumen Hanya-Baca (Read-Only Locking Mode)
- Opsi untuk mengunci berkas `.baku` ke status baca-saja (*Read-Only*) guna mencegah perubahan tak sengaja pada naskah yang telah disetujui atau ditandatangani.

---

## Ringkasan Matriks Rencana Implementasi v1.5

| Modul Fitur | Target Komponen | Prioritas | Estimasi Kompleksitas |
| :--- | :--- | :--- | :--- |
| Kompresor Ukuran Berkas PDF | Rust Backend (`lopdf` / `image`) | Sangat Tinggi | Menengah |
| Installer Windows (.exe) & Linux (AppImage) | Tauri Bundler & CI Workflow | Sangat Tinggi | Menengah |
| Penomoran Halaman Bertingkat (Romawi/Arab) | Frontend Sheet Engine | Tinggi | Tinggi |
| Panel Navigasi Outline & Thumbnail | Frontend UI & DOM Virtualizer | Tinggi | Menengah |
| Notasi Matematika KaTeX Luring | Frontend Parser Engine | Tinggi | Rendah |
| Pengelola Sitasi & Daftar Pustaka | Frontend Library & Data Store | Sedang | Menengah |
| Tanda Tangan & Paraf Digital Luring | Rust Backend & Canvas Overlay | Sedang | Menengah |
| Mode Gelap Adaptif (Dark Mode) | CSS Theme Engine | Sedang | Rendah |
| Impor Dokumen Word (.docx) Luring | Rust DOCX Parser | Masa Depan | Tinggi |

---

## Kontribusi & Diskusi Fitur

Rencana pembaruan ini bersifat terbuka untuk masukan dari komunitas pengguna dan pengembang. Jika Anda memiliki usulan templat baku baru, perbaikan alur kerja, atau kebutuhan alat PDF tambahan:
- Ajukan usulan melalui [.github/ISSUE_TEMPLATE/feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md).
- Baca panduan lengkap kontribusi di [CONTRIBUTING.md](CONTRIBUTING.md).
- Periksa arsitektur teknis Baku PDF di [ARCHITECTURE.md](ARCHITECTURE.md).
