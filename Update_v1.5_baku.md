# Rencana Pembaruan Baku PDF Versi 1.5 (Roadmap & Feature List)

Dokumen ini memuat analisis status fitur saat ini pada rilis **Baku PDF v1.0.0** serta daftar rencana fitur baru, peningkatan performa, dan ekspansi modul untuk rilis **Baku PDF v1.5**. Pembaruan ini difokuskan pada penyempurnaan ekosistem penulisan akademik lanjutan, penambahan alat manipulasi PDF luring tingkat lanjut, dukungan multi-platform penuh (Windows, macOS, Linux), serta efisiensi perenderan dokumen naskah tebal.

Prinsip utama pengembangan Baku PDF tetap dipertahankan:
- **100% Luring (Offline-First)**: Seluruh pemrosesan berjalan di komputer lokal tanpa server awan.
- **Privasi Mutlak**: Tanpa analitik pelacak, telemetri, atau transmisi data keluar jaringan.
- **Konsumsi Sumber Daya Rendah**: Performa cepat dan hemat memori RAM (~50-80 MB).
- **Desain Minimalis Flat 2D**: Antarmuka bersih, fungsional, dan bebas distrasi.
- **Standar Format Baku**: Mengikuti kaidah tata tulis ilmiah dan administrasi resmi.

---

## Daftar Isi Dokumen

1. [Status Fitur yang Sudah Tersedia (Baseline v1.0.0)](#1-status-fitur-yang-sudah-tersedia-baseline-v100)
2. [Editor Dokumen & Tipografi Baku Ilmiah Lanjutan](#2-editor-dokumen--tipografi-baku-ilmiah-lanjutan)
3. [Manajemen Struktur Dokumen Akademik Otomatis](#3-manajemen-struktur-dokumen-akademik-otomatis)
4. [Ekspansi Alat Ekstra PDF Luring Baru](#4-ekspansi-alat-ekstra-pdf-luring-baru)
5. [Koleksi Templat Standar Tambahan](#5-koleksi-templat-standar-tambahan)
6. [Dukungan Multi-Platform & Distribusi Biner](#6-dukungan-multi-platform--distribusi-biner)
7. [Arsitektur Inti, Performa, & Penanganan Dokumen Tebal](#7-arsitektur-inti-performa--penanganan-dokumen-tebal)
8. [Antarmuka Pengguna, Navigasi, & Aksesibilitas](#8-antarmuka-pengguna-navigasi--aksesibilitas)
9. [Interoperabilitas Format & Kompatibilitas Berkas](#9-interoperabilitas-format--kompatibilitas-berkas)
10. [Keamanan Dokumen & Pembersihan Metadata](#10-keamanan-dokumen--pembersihan-metadata)
11. [Matriks Prioritas Pengembangan v1.5](#11-matriks-prioritas-pengembangan-v15)

---

## 1. Status Fitur yang Sudah Tersedia (Baseline v1.0.0)

Berdasarkan audit menyeluruh terhadap kode sumber Baku PDF, modul-modul berikut **telah selesai diimplementasikan secara penuh pada versi 1.0.0**:

| Modul Fitur | Status v1.0.0 | Keterangan Implementasi |
| :--- | :--- | :--- |
| **Penggaris Horisontal Interaktif** | Sudah Ada | Penggaris visual atas dengan satuan cm, penanda geser margin kiri dan kanan (`ruler-marker-left`, `ruler-marker-right`), garis panduan putus-putus (*snap guideline*), serta tombol *toggle* pada pita alat dan menu Tampilan. |
| **8 Templat Baku Bawaan** | Sudah Ada | Termasuk templat Skripsi/TA 5 halaman lengkap, Makalah Ilmiah, Laporan Praktikum, Surat Resmi Dinas, **Surat Lamaran Kerja**, Notula Rapat, **Curriculum Vitae (CV) ATS**, dan Memorandum Internal. |
| **Sistem Perancangan Templat Kustom** | Sudah Ada | Fitur "Simpan Sebagai Templat..." (`#action-save-as-template`), "Buat Templat Baru" (`#btn-create-new-template`), banner mode authoring di editor, serta filter kategori "Templat Kustom Saya" di Galeri. |
| **Penomoran Halaman & Seksi Dasar** | Sudah Ada | Modal konfigurasi nomor halaman (`#modal-page-number`) dengan format angka Arab (`1, 2, 3`), Romawi kecil (`i, ii, iii`), dan Romawi besar (`I, II, III`), pengaturan awalan/akhiran, serta penyisipan *Section Break*. |
| **Header & Footer Berbeda Halaman Pertama** | Sudah Ada | Opsi *Different First Page* (`diffFirst`) pada editor Header/Footer untuk menyembunyikan atau membedakan kepala/kaki pada halaman judul. |
| **Modal Tautan (Link) Mandiri** | Sudah Ada | Modal Flat 2D (`#modal-link-overlay`) dengan kolom Teks Tampilan, Alamat URL, tombol Hapus Tautan, pintasan `Ctrl+K` / `Cmd+K`, dan pembukaan tautan eksternal via `Ctrl/Cmd + Klik`. |
| **Kontrol Perbesaran (Zoom)** | Sudah Ada | Tombol Zoom In, Zoom Out, Reset 100%, slider persentase zoom pada status bar bawah, dan setelan skala aplikasi di Pengaturan. |
| **4 Alat Ekstra PDF Luring** | Sudah Ada | Gabungkan PDF (*Merge*), Pisahkan PDF (*Split*), Putar Halaman PDF (*Rotate*), dan Gambar ke PDF (*Images to PDF*) berbasis pustaka Rust `lopdf` dan `image`. |
| **Paket macOS DMG Installer** | Sudah Ada | Bundel DMG resmi (`Baku_1.0.0_Installer.dmg`) dengan latar belakang panduan seret-lepas dan perlindungan eksekusi volume sementara (`check_running_from_dmg`). |

Fitur-fitur di atas merupakan fondasi stabil versi 1.0.0 dan **tidak lagi dicantumkan sebagai rencana fitur baru**, melainkan sebagai pijakan integrasi untuk fitur-fitur lanjutan versi 1.5 di bawah ini.

---

## 2. Editor Dokumen & Tipografi Baku Ilmiah Lanjutan

### 2.1. Notasi Matematika & Rumus Ilmiah (KaTeX Luring)
- Integrasi parser formula KaTeX yang dikemas 100% secara luring di dalam bundel aplikasi.
- Penyisipan blok persamaan matematika interaktif (`Inline Math` dan `Block Equation`).
- Penomoran otomatis persamaan di tepi kanan lembar kertas sesuai bab: `(1.1)`, `(1.2)`, dll.
- Dukungan simbol kalkulus, matriks, aljabar linear, dan notasi fisika/kimia standar.

### 2.2. Ekspansi Penggaris Interaktif: Indentasi Paragraf & Penggaris Vertikal
- Menambahkan penanda seret khusus pada penggaris horisontal yang sudah ada:
  - **Penanda Indentasi Baris Pertama (*First Line Indent*)**: Menentukan awal paragraf menjorok ke dalam (misal 1 cm atau 1.27 cm).
  - **Penanda Indentasi Gantung (*Hanging Indent*)**: Menentukan batas kiri baris lanjutan (standar penulisan Daftar Pustaka format APA/IEEE).
- **Penggaris Vertikal (Vertical Ruler)** di sebelah kiri lembar kertas:
  - Mengukur ketinggian halaman aktual (cm).
  - Penanda seret visual untuk mengatur margin atas (*top margin*) dan margin bawah (*bottom margin*) langsung dari kanvas.

### 2.3. Pemformatan Tabel Ilmiah Tingkat Lanjut (Advanced Scientific Tables)
- Penggabungan sel horizontal (*Merge Columns*) dan vertikal (*Merge Rows*).
- Pemisah batas sel kustom gaya publikasi ilmiah (*Booktabs Style*): tabel tanpa garis batas vertikal (hanya garis atas tebal, garis bawah header tipis, dan garis penutup tebal).
- Perataan angka desimal pada kolom numerik (penyesuaian posisi titik koma desimal).
- Pengulangan baris judul tabel secara otomatis jika tabel terpotong ke lembar halaman berikutnya (*Repeat Header Row across Pages*).
- Penomoran otomatis judul tabel: `Tabel 1.1: Judul Tabel`.

### 2.4. Pemeriksa Ejaan & Panduan PUEBI/KBBI Luring
- Kamus kata dasar Bahasa Indonesia luring terintegrasi untuk pendeteksian salah ketik (*typo*).
- Penanda garis bawah merah lembut untuk kata di luar perbendaharaan baku.
- Saran koreksi kata baku melalui menu klik kanan (misal: *analisa* -> *analisis*, *praktek* -> *praktik*, *jadual* -> *jadwal*).
- Pemisahan suku kata otomatis (*Hyphenation*) berdasarkan kaidah fonologi Bahasa Indonesia untuk paragraf rata kiri-kanan (*Justify*) agar spasi antar-kata tidak renggang berlebihan.

---

## 3. Manajemen Struktur Dokumen Akademik Otomatis

### 3.1. Aturan Penomoran Halaman Skripsi Baku Otomatis (Dual-Positioning Rules)
- Otomatisasi aturan penempatan nomor halaman karya ilmiah Indonesia:
  - Halaman pertama setiap Bab baru (memuat judul Bab) otomatis diletakkan di **tengah bawah**.
  - Halaman lanjutan Bab tersebut otomatis berpindah ke **sudut kanan atas**.
- Penomoran seksi independen (*Restart Numbering per Section*) yang terisolasi tanpa merusak penomoran seksi sebelumnya.

### 3.2. Pembuat Daftar Isi Dinamis (Auto Table of Contents)
- Pembangkitan Daftar Isi instan berdasarkan hierarki heading dokumen (Heading 1 = Bab, Heading 2 = Sub-bab, Heading 3 = Anak Sub-bab).
- Garis titik-titik pemandu (*dot leaders*) otomatis yang menghubungkan judul bab dengan nomor halaman di sisi kanan.
- Tombol pembaruan satu klik (*Update Entire Table*) saat terjadi pergeseran halaman atau perubahan judul naskah.

### 3.3. Pembuat Daftar Tabel & Daftar Gambar Dinamis
- Pelacakan otomatis seluruh keterangan (*caption*) tabel dan gambar dalam naskah dokumen.
- Penyusunan otomatis halaman Daftar Tabel dan Daftar Gambar dengan sinkronisasi nomor halaman real-time.

### 3.4. Pengelola Sitasi & Daftar Pustaka Luring (Citation Manager)
- Input bibliografi manual atau impor dari berkas pustaka BibTeX (`.bib`) dan RIS.
- Format sitasi otomatis dalam naskah:
  - Gaya APA 7th Edition: `(Maulana, 2026)`
  - Gaya IEEE: `[1]`
  - Gaya Harvard: `(Maulana 2026, hlm. 45)`
  - Gaya Vancouver
- Pembangkitan Daftar Pustaka otomatis di akhir dokumen yang terurut secara alfabetis atau kronologis nomor kutipan dengan format *hanging indent* baku.

---

## 4. Ekspansi Alat Ekstra PDF Luring Baru

Di luar 4 alat yang sudah ada (Gabung, Pisah, Putar, Gambar ke PDF), versi 1.5 menambahkan 6 alat manipulasi PDF luring baru:

### 4.1. Kompresor Ukuran Berkas PDF (Offline PDF Compressor)
- Pengurangan ukuran berkas PDF secara lokal menggunakan pustaka Rust teroptimasi tanpa menurunkan keterbacaan teks naskah.
- Preset target kompresi instan:
  - **Di bawah 500 KB**: Standar unggah portal pendaftaran CPNS, BUMN, dan beasiswa.
  - **Di bawah 1 MB**: Standar portal akademik dan repositori tugas akhir kampus.
  - **Di bawah 2 MB**: Standar berkas publikasi umum.
  - **Kustom**: Input manual target resolusi DPI gambar (150 DPI, 96 DPI, 72 DPI).
- Tampilan estimasi ukuran sebelum dan sesudah kompresi sebelum berkas disimpan.

### 4.2. Penandatangan & Pembubuh Paraf Digital Luring (Offline Signature & Stamp)
- Penggambaran tanda tangan langsung menggunakan kursor/stylus atau impor gambar tanda tangan berlatar transparan (PNG).
- Penempatan tanda tangan pada halaman mana pun dengan pratinjau seret-dan-lepas (*drag-and-drop*).
- Fitur tanda tangan massal pada koordinat tetap untuk dokumen multi-halaman.
- Pembubuhan stempel tanggal dan paraf luring.

### 4.3. Proteksi & Enkripsi Kata Sandi PDF (PDF Password Protect & Decrypt)
- Pemasangan kata sandi buka dokumen (*User Password*) menggunakan enkripsi standar industri AES-256 luring.
- Pemasangan kata sandi izin (*Owner/Permissions Password*):
  - Membatasi pencetakan dokumen.
  - Membatasi penyalinan teks dan ekstraksi konten.
  - Membatasi modifikasi anotasi.
- Alat penghapus proteksi sandi (bagi pemilik berkas yang memiliki kata sandi sah).

### 4.4. Penyusun & Pemilah Halaman Visual (Visual Page Organizer & Reorder)
- Antarmuka kisi thumbnail visual untuk setiap halaman dokumen PDF.
- Pemindahan urutan halaman dengan seret-dan-lepas (*drag-and-drop reordering*).
- Penghapusan halaman tunggal atau rentang halaman tertentu dengan tombol cepat.
- Penyisipan halaman kosong atau penyisipan halaman dari berkas PDF lain ke titik tertentu.

### 4.5. Penomoran Halaman PDF Eksternal (Bates Numbering & PDF Page Stamper)
- Penomoran berkas PDF pihak ketiga yang belum memiliki nomor halaman.
- Konfigurasi letak nomor: sudut kanan atas, sudut kanan bawah, atau tengah bawah.
- Konfigurasi awalan teks (misal: `Lampiran Halaman 1 dari 10`, `Hal. 1`, atau nomor perkara peradilan).

### 4.6. Pembubuh Watermark / Cap Teks Luring (PDF Watermark Tool)
- Pembubuhan teks watermark diagonal (kemiringan 45 derajat) atau horizontal.
- Preset kata: `DRAFT`, `SALINAN RESMI`, `RAHASIA`, `CONFIDENTIAL`, `SAMPLE`.
- Pengaturan transparansi teks (*opacity*), ukuran huruf, warna, dan pemilihan rentang halaman sasaran.

---

## 5. Koleksi Templat Standar Tambahan

Melengkapi 8 templat yang sudah tersedia pada v1.0.0, v1.5 menghadirkan templat standar baru untuk kebutuhan spesifik:

### 5.1. Templat Publikasi & Jurnal Ilmiah
- **Jurnal Ilmiah Format SINTA (Tata Letak Kolom Ganda)**:
  - Tata letak dua kolom presisi dengan bagian judul satu kolom penuh.
  - Blok abstrak dwibahasa (Bahasa Indonesia & Bahasa Inggris) dengan kata kunci (*keywords*).
  - Struktur IMRAD baku: Pendahuluan, Metode, Hasil dan Pembahasan, Kesimpulan.
- **Paper Prosiding Standar IEEE**:
  - Standar ukuran margin, font Times New Roman 10pt/8pt, dan penataan grafik dua kolom.

### 5.2. Templat Administrasi Kampus & Hibah Penelitian
- **Proposal Program Kreativitas Mahasiswa (PKM Kemendikbudristek)**:
  - Format baku sesuai panduan pedoman PKM terbaru: lembar pengesahan, rincian anggaran biaya format tabel baku, dan jadwal kegiatan.
- **Laporan Praktik Kerja Lapangan (PKL) / Magang Industri**:
  - Struktur pelaporan kegiatan mingguan, profil institusi mitra, dan logbook kegiatan.
- **Proposal Tesis & Disertasi Pascasarjana**:
  - Standar metodologi penelitian mendalam, kerangka pemikiran konseptual, dan hipotesis.

### 5.3. Templat Administrasi Pemerintahan & Lembaga Resmi
- **Nota Dinas & Surat Perintah Tugas (SPT)**:
  - Format administrasi instansi pemerintah dengan kop naskah dinas, dasar pertimbangan, dan diktum penetapan tugas.
- **Surat Keputusan (SK) Resmi**:
  - Format standar perundang-undangan: konsiderans Menimbang, Mengingat, Memperhatikan, dan Menetapkan.
- **Berita Acara Serah Terima (BAST)**:
  - Format baku penyerahan pekerjaan fisik atau dokumen dengan klausul saksi.

### 5.4. Ekspor/Impor Berkas Paket Templat Mandiri (.bakutpl)
- Mengembangkan fitur templat kustom yang sudah ada dengan kemampuan mengekspor templat buatan pengguna ke dalam satu berkas paket portabel `.bakutpl`.
- Kemampuan mengimpor berkas `.bakutpl` dari komputer lain langsung ke dalam Galeri Templat lokal.

---

## 6. Dukungan Multi-Platform & Distribusi Biner

### 6.1. Rilis Sistem Operasi Windows
- **Installer NSIS Terbimbing (`.exe`)**:
  - Installer 64-bit (`x64`) dan ARM64 untuk Windows 10 dan Windows 11.
  - Integrasi pintasan Menu Mulai (*Start Menu*), Desktop, dan pembuat asosiasi berkas `.baku`.
  - Pemasangan uninstaller bersih tanpa meninggalkan sisa sampah di registri.
- **Edisi Portabel Mandiri (`Baku_Portable.exe`)**:
  - Eksekusi langsung tanpa memerlukan hak administrator, cocok untuk komputer laboratorium atau lingkungan kerja terbatas.
- **Dukungan Microsoft Package Manager (`winget`)**:
  - Penerbitan manifes rilis ke repositori resmi `winget-pkgs`:
    ```cmd
    winget install Baku.BakuPDF
    ```

### 6.2. Rilis Sistem Operasi Linux
- **Paket Universal `AppImage`**:
  - Satu berkas mandiri siap jalan yang kompatibel dengan berbagai distribusi (Ubuntu, Fedora, Arch Linux, Debian, openSUSE).
- **Paket Debian / Ubuntu (`.deb`)**:
  - Paket biner native dengan pemenuhan dependensi `webkit2gtk-4.1`.
- **Dukungan Flathub & Arch User Repository (AUR)**:
  - Pembuatan manifes `flatpak` untuk ekosistem distribusi terisolasi sandbox.
  - Paket `baku-bin` pada repositori komunitas Arch Linux (AUR).

### 6.3. Pembaruan Paket macOS
- **Universal Binary DMG**:
  - Mengembangkan bundel DMG x86_64 yang sudah ada menjadi paket biner universal yang mendukung arsitektur Apple Silicon (M1/M2/M3/M4) dan prosesor Intel secara terpadu.
- **Distribusi Homebrew Cask**:
  - Dukungan instalasi praktis melalui terminal macOS:
    ```bash
    brew install --cask baku-pdf
    ```

---

## 7. Arsitektur Inti, Performa, & Penanganan Dokumen Tebal

### 7.1. Virtualisasi Lembar Kertas (Infinite Virtual DOM Page Rendering)
- Render hanya lembar kertas yang sedang berada dalam area pandang (*viewport*) layar pengguna ditambah buffer 1-2 halaman sebelum dan sesudah.
- Memungkinkan pembukaan dokumen berbobot lebih dari 500 halaman (seperti buku ajar dan draf disertasi utuh) tanpa lonjakan konsumsi memori RAM.
- Waktu respons pengetikan (*input latency*) tetap berada di bawah 8 milidetik terlepas dari ketebalan naskah.

### 7.2. Mesin Pengekspor PDF Native Rust Murni
- Transisi modul ekspor PDF utama ke pustaka Rust native (`printpdf` dan `lopdf`) untuk melengkapi mekanisme cetak WebView.
- Hasil ekspor menghasilkan teks berbasis vektor murni yang dapat disalin (*searchable and selectable text*) dengan ukuran berkas keluaran hingga 60% lebih ringkas.
- Penanaman font (*Font Subsetting*) otomatis: hanya glif font yang digunakan yang disematkan ke dalam berkas PDF.

### 7.3. Sistem Simpan Otomatis & Pemulihan Pasca Gangguan (Crash Auto-Recovery)
- Penyimpanan berkas berkala (*Auto-Save*) setiap 60 detik ke direktori penyimpanan lokal terisolasi.
- Jika komputer mati mendadak atau aplikasi terhenti paksa, sesi dokumen yang belum tersimpan akan ditampilkan dalam dialog pemulihan otomatis saat aplikasi dibuka kembali.
- Riwayat snapshot versi lokal (*Local Revision History*) yang memungkinkan pengembalian dokumen ke status penulisan 15, 30, atau 60 menit sebelumnya.

---

## 8. Antarmuka Pengguna, Navigasi, & Aksesibilitas

### 8.1. Bilah Samping Navigasi Dokumen (Document Outline & Navigator Sidebar)
- Panel bilah samping kiri pada kanvas editor yang dapat dibuka-tutup (*Collapsible Sidebar*):
  - **Tab Navigasi Judul**: Pohon hierarki Bab dan Sub-bab; mengeklik judul akan langsung menggulir layar ke halaman bersangkutan.
  - **Tab Thumbnail Halaman**: Tinjauan miniatur seluruh halaman dokumen secara vertikal.
  - **Tab Hasil Pencarian**: Menampilkan daftar kutipan kalimat yang cocok saat menggunakan fitur Temukan & Ganti (*Find & Replace*).

### 8.2. Mode Gelap & Terang Adaptif Penuh (Adaptive Dark/Light Themes)
- Tema Gelap Khusus (*True Dark Theme*) yang dirancang dengan rasio kontras tinggi sesuai standar WCAG AAA.
- Pilihan representasi lembar kertas di Mode Gelap:
  - *Kertas Terang di Lingkungan Gelap* (representasi fisik asli cetak).
  - *Kertas Terbalik Gelap* (mode kenyamanan membaca malam hari untuk mengurangi kelelahan mata).
- Sinkronisasi otomatis dengan preferensi tema sistem operasi (*Follow System Theme*).

### 8.3. Mode Penulisan Bebas Gangguan (Zen / Distraction-Free Mode)
- Menyembunyikan seluruh bilah menu, pita alat ribbon, dan bilah samping dengan satu tombol pintas (`F11` atau `Cmd+Shift+F`).
- Hanya menampilkan lembar kertas terpusat dengan latar belakang redup untuk fokus penuh pada pembuatan draf naskah.

### 8.4. Tata Letak Dua Halaman Berdampingan & Preset Skala Lanjutan
- **Tampilan Berdampingan (*Two-Page Spread View*)**: Menampilkan dua halaman lembar kertas berdampingan secara horizontal pada monitor layar lebar.
- **Opsi Skala Lanjutan**: Opsi *Fit to Width* (Sesuaikan Lebar Jendela) dan *Fit to Page* (Sesuaikan Satu Halaman Penuh) yang melengkapi kontrol zoom persentase yang sudah ada.

### 8.5. Bilah Tab Multi-Dokumen (Multi-Document Tab Bar)
- **Tujuan & Manfaat Kerja**:
  - Mengeliminasi kebutuhan berganti jendela sistem operasi (Alt+Tab / Cmd+`) saat menyusun naskah yang membutuhkan banyak dokumen rujukan sekaligus (misal: draf Bab I, catatan revisi pembimbing, dan dokumen templat panduan).
  - Membuka dan mengedit hingga banyak dokumen `.baku` secara bersamaan dalam satu jendela aplikasi yang terintegrasi.
- **Posisi Peletakan Ergonomis**:
  - Diletakkan secara strategis di **bawah Ribbon Toolbar dan tepat di atas Penggaris/Kanvas Editor**.
  - Mengikuti hierarki alami alur kerja pengguna (*top-to-bottom workflow*): memilih alat pemformatan di Ribbon -> memilih konteks berkas di Bilah Tab -> menyunting lembar kerja di Kanvas.
  - Memanfaatkan 100% lebar jendela aplikasi secara lega tanpa memadati area status bar bawah yang sudah memuat informasi halaman, jumlah kata, bahasa, dan slider perbesaran.
- **Tampilan Visual & Gaya Desain Flat 2D**:
  - Bilah tab ramping (*compact slim tab bar*, tinggi 30–32 px) yang hemat ruang vertikal.
  - **Tab Aktif**: Berlatar putih bersih (`#FFFFFF`) menyatu mulus dengan penggaris dan lembar kerja, beraksen garis biru presisi (`#2563EB`) pada sisi atas tab, teks judul tebal, tombol tutup `x`, dan indikator status belum disimpan.
  - **Tab Tidak Aktif**: Berlatar abu-abu netral (`#F3F2F1`) dengan batas pemisah tipis dan transisi hover yang halus.
  - Batas lebar maksimal tab dengan pemendekan elipsis (`text-overflow: ellipsis`) agar nama berkas yang panjang tetap rapi dan terbaca.
  - Tombol aksi cepat tambah tab `+` di sisi kanan bilah tab untuk membuat dokumen baru atau membuka dokumen dari repositori kerja.
- **Mekanisme Navigasi & Pengguliran Horizontal (Horizontal Scroll)**:
  - **Tampilan Proporsional**: Jika pengguna membuka 1 hingga 5 berkas, seluruh tab ditampilkan berdampingan secara proporsional.
  - **Pengguliran Adaptif (> 5 Dokumen)**: Jika dokumen yang dibuka melebihi 5 berkas, bilah tab dapat digeser horizontal secara halus (*smooth horizontal scroll*) menggunakan trackpad atau scroll wheel mouse.
  - **Tombol Pemandu Navigasi**: Tombol panah navigasi `<` dan `>` muncul otomatis di tepi kiri dan kanan bilah tab saat isi tab meluap (*overflow*) untuk mempermudah pergeseran dengan klik mouse.
- **Pengelolaan State & Keamanan Data (Session Persistence)**:
  - **Isolasi State Tiap Dokumen**: Setiap tab menyimpan dokumen dalam bentuk Delta JSON independen, lengkap dengan posisi pengguliran layar (*scroll position*) dan koordinat seleksi kursor terakhir. Pengguna tidak akan terlempar kembali ke halaman 1 saat berganti tab.
  - **Isolasi Riwayat Undo/Redo**: Tumpukan riwayat Undo (`Ctrl/Cmd+Z`) dan Redo (`Ctrl+Y` / `Cmd+Shift+Z`) terisolasi per tab, mencegah pembatalan ketikan tak disengaja pada dokumen lain.
  - **Indikator Dokumen Belum Disimpan (*Unsaved Dot*)**: Titik aksen biru atau tanda bintang `*` otomatis muncul pada tab saat ada perubahan naskah yang belum tersimpan ke media penyimpanan fisik.
  - **Dialog Konfirmasi Penutupan Aman**: Mengeklik tombol `x` pada tab yang sedang berstatus belum disimpan (*dirty*) memicu dialog konfirmasi simpan sebelum tab ditutup.
- **Efisiensi Memori (Local-First RAM Optimization)**:
  - Menerapkan virtualisasi tab: tab yang sedang tidak aktif di layar hanya disimpan dalam bentuk struktur data JSON/Delta ringan di memori RAM tanpa merender pohon elemen lembar kertas DOM.
  - Hanya dokumen pada tab yang sedang aktif yang dipasangkan ke kanvas editor Quill, memastikan konsumsi RAM Baku PDF tetap sangat hemat (~50-80 MB) dan bebas dari kelambatan (*zero lag*).
- **Pintasan Papan Ketik Cepat**:
  - `Ctrl+Tab` / `Cmd+Option+Right`: Berpindah ke tab dokumen berikutnya.
  - `Ctrl+Shift+Tab` / `Cmd+Option+Left`: Berpindah ke tab dokumen sebelumnya.
  - `Ctrl+W` / `Cmd+W`: Menutup tab aktif dengan pengaman konfirmasi simpan.

---

## 9. Interoperabilitas Format & Kompatibilitas Berkas

### 9.1. Impor & Konversi Berkas Word (.docx) Luring
- Parser berkas `.docx` lokal murni berbasis Rust untuk membaca naskah Word yang sudah ada.
- Menjaga integritas pemformatan dasar: teks tebal, miring, garis bawah, tabel, paragraf, dan daftar butir/nomor.
- Mengonversi otomatis margin dan ukuran kertas ke standar format baku Baku PDF.

### 9.2. Ekspor ke Format Naskah Standar
- Ekspor ke berkas `.docx` (Microsoft Word) untuk kebutuhan peninjauan oleh dosen pembimbing atau instansi yang mewajibkan format Word.
- Ekspor ke berkas teks polos (`.txt`) dan Markdown ilmiah (`.md`).

### 9.3. Penyempurnaan Format Berkas .baku (Spesifikasi v2.0)
- Menambahkan penampung lampiran berkas biner di dalam struktur JSON `.baku` (misalnya gambar beresolusi tinggi yang terkompresi secara lossless).
- Penyimpanan daftar pustaka internal dan status nomor halaman per seksi.
- Kompatibilitas mundur penuh (*backward-compatible*): berkas `.baku` versi 1.0.0 tetap dapat dibuka sempurna pada versi 1.5.

---

## 10. Keamanan Dokumen & Pembersihan Metadata

### 10.1. Pembersih Jejak Metadata Dokumen (Metadata Sanitizer)
- Pembersihan metadata tersembunyi sebelum berkas diekspor ke PDF publik:
  - Menghapus nama pembuat asli, nama perangkat komputer, dan riwayat path folder lokal.
  - Menghapus cap waktu penyuntingan tersembunyi.
- Sangat penting untuk proses *Blind Review* artikel jurnal ilmiah dan dokumen rahasia instansi.

### 10.2. Penguncian Dokumen Hanya-Baca (Read-Only Locking Mode)
- Opsi untuk mengunci berkas `.baku` ke status baca-saja (*Read-Only*) guna mencegah perubahan tak sengaja pada naskah yang telah disetujui atau ditandatangani.

---

## 11. Matriks Prioritas Pengembangan v1.5

| Modul Fitur | Target Komponen | Prioritas | Estimasi Kompleksitas |
| :--- | :--- | :--- | :--- |
| Bilah Tab Multi-Dokumen (Multi-Document Tabs) | Frontend Editor & State Engine | Sangat Tinggi | Menengah |
| Kompresor Ukuran Berkas PDF | Rust Backend (`lopdf` / `image`) | Sangat Tinggi | Menengah |
| Installer Windows (.exe) & Linux (AppImage) | Tauri Bundler & CI Workflow | Sangat Tinggi | Menengah |
| Aturan Posisi Nomor Halaman Bab Baku | Frontend Sheet Engine | Tinggi | Menengah |
| Panel Navigasi Outline & Thumbnail | Frontend UI & DOM Virtualizer | Tinggi | Menengah |
| Notasi Matematika KaTeX Luring | Frontend Parser Engine | Tinggi | Rendah |
| Penggaris Vertikal & Indentasi Paragraf | Frontend Ruler Engine | Sedang | Menengah |
| Pengelola Sitasi & Daftar Pustaka | Frontend Library & Data Store | Sedang | Menengah |
| Tanda Tangan & Paraf Digital Luring | Rust Backend & Canvas Overlay | Sedang | Menengah |
| Mode Gelap Adaptif (Dark Mode) | CSS Theme Engine | Sedang | Rendah |
| Impor Dokumen Word (.docx) Luring | Rust DOCX Parser | Masa Depan | Tinggi |

---

## Kontribusi & Diskusi Fitur

Rencana pembaruan ini bersifat terbuka untuk masukan dari komunitas pengguna dan pengembang:
- Ajukan usulan melalui [.github/ISSUE_TEMPLATE/feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md).
- Laporkan masalah melalui [.github/ISSUE_TEMPLATE/bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md).
- Baca panduan lengkap kontribusi di [CONTRIBUTING.md](CONTRIBUTING.md).
- Periksa arsitektur teknis Baku PDF di [ARCHITECTURE.md](ARCHITECTURE.md).
