<div align="center">
  <p>
    <strong>Bahasa Peta Jalan / Roadmap Languages:</strong><br />
    <a href="Update_Baku_en.md">English</a> |
    <strong>Bahasa Indonesia</strong> |
    <a href="Update_Baku_es.md">Español</a> |
    <a href="Update_Baku_fr.md">Français</a> |
    <a href="Update_Baku_de.md">Deutsch</a> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <a href="Update_Baku_pt.md">Português</a> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../README_ID.md">Kembali ke README Utama</a></p>
  <hr />
</div>

# Rencana Pembaruan Baku PDF (Roadmap v1.1.0 – v1.5.0)

Dokumen ini memuat analisis status fitur saat ini pada rilis **Baku PDF v1.0.0** serta daftar rencana fitur baru, peningkatan performa, dan ekspansi modul yang dikelompokkan secara terstruktur berdasarkan nomor versi rilis mulai dari **v1.1.0 hingga v1.5.0**. Setiap tahapan rilis dirancang terukur, teruji secara bertahap, dan mempertahankan prinsip dasar aplikasi:

Prinsip utama pengembangan Baku PDF:
- **100% Luring (Offline-First)**: Seluruh pemrosesan berjalan di komputer lokal tanpa server awan.
- **Privasi Mutlak**: Tanpa analitik pelacak, telemetri, atau transmisi data keluar jaringan.
- **Konsumsi Sumber Daya Rendah**: Performa cepat dan hemat memori RAM (~50-80 MB).
- **Desain Minimalis Flat 2D**: Antarmuka bersih, fungsional, dan bebas distrasi.
- **Standar Format Baku**: Mengikuti kaidah tata tulis ilmiah dan administrasi resmi.

---

## Daftar Isi Dokumen

1. [Status Fitur Fondasi Saat Ini (Rilis v1.0.0)](#1-status-fitur-fondasi-saat-ini-rilis-v100)
2. [Rencana Pembaruan Versi 1.1.0 (Tab Multi-Dokumen & Efisiensi Kerja)](#2-rencana-pembaruan-versi-110-tab-multi-dokumen--efisiensi-kerja)
3. [Rencana Pembaruan Versi 1.2.0 (Standar Akademik & Tipografi Ilmiah)](#3-rencana-pembaruan-versi-120-standar-akademik--tipografi-ilmiah)
4. [Rencana Pembaruan Versi 1.3.0 (Distribusi Multi-Platform Penuh & Navigasi)](#4-rencana-pembaruan-versi-130-distribusi-multi-platform-penuh--navigasi)
5. [Rencana Pembaruan Versi 1.4.0 (Utilitas PDF Luring & Keamanan Dokumen)](#5-rencana-pembaruan-versi-140-utilitas-pdf-luring--keamanan-dokumen)
6. [Rencana Pembaruan Versi 1.5.0 (Puncak Milestone Ekosistem & Performa Naskah Tebal)](#6-rencana-pembaruan-versi-150-puncak-milestone-ekosistem--performa-naskah-tebal)
7. [Matriks Prioritas Teknis & Rangkuman Tahapan Rilis (v1.1.0 – v1.5.0)](#7-matriks-prioritas-teknis--rangkuman-tahapan-rilis-v110--v150)
8. [Kontribusi & Diskusi Fitur](#8-kontribusi--diskusi-fitur)

---

## 1. Status Fitur Fondasi Saat Ini (Rilis v1.0.0)

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
| **Paket macOS Universal DMG Installer** | Sudah Ada | Bundel DMG Universal Binary (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) resmi (`Baku_1.0.0_Universal_Installer.dmg` / `Baku_1.0.0_Installer.dmg`) dengan latar belakang panduan seret-lepas dan perlindungan eksekusi volume sementara (`check_running_from_dmg`). |

Fitur-fitur di atas merupakan fondasi stabil versi 1.0.0 dan **tidak lagi dicantumkan sebagai rencana fitur baru**, melainkan sebagai pijakan integrasi untuk fitur-fitur rilis bertahap di bawah ini.

---

## 2. Rencana Pembaruan Versi 1.1.0 (Tab Multi-Dokumen & Efisiensi Kerja)

Tahap pembaruan **v1.1.0** difokuskan pada produktivitas pengetikan naskah paralel dan penyusutan berkas PDF hasil ekspor agar siap diunggah ke berbagai portal publik:

### 2.1. Bilah Tab Multi-Dokumen (Multi-Document Tab Bar)
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

### 2.2. Kompresor Ukuran Berkas PDF Luring (Offline PDF Compressor)
- Pengurangan ukuran berkas PDF secara lokal menggunakan pustaka Rust teroptimasi tanpa menurunkan keterbacaan teks naskah.
- Preset target kompresi instan:
  - **Di bawah 500 KB**: Standar unggah portal pendaftaran CPNS, BUMN, dan beasiswa.
  - **Di bawah 1 MB**: Standar portal akademik dan repositori tugas akhir kampus.
  - **Di bawah 2 MB**: Standar berkas publikasi umum.
  - **Kustom**: Input manual target resolusi DPI gambar (150 DPI, 96 DPI, 72 DPI).
- Tampilan estimasi ukuran sebelum dan sesudah kompresi sebelum berkas disimpan.

---

## 3. Rencana Pembaruan Versi 1.2.0 (Standar Akademik & Tipografi Ilmiah)

Tahap pembaruan **v1.2.0** difokuskan pada penegakan aturan tata tulis karya ilmiah perguruan tinggi serta kelengkapan instrumen matematis dan tipografi tabel:

### 3.1. Aturan Penomoran Halaman Skripsi Baku Otomatis (Dual-Positioning Rules)
- Otomatisasi aturan penempatan nomor halaman karya ilmiah Indonesia:
  - Halaman pertama setiap Bab baru (memuat judul Bab) otomatis diletakkan di **tengah bawah**.
  - Halaman lanjutan Bab tersebut otomatis berpindah ke **sudut kanan atas**.
- Penomoran seksi independen (*Restart Numbering per Section*) yang terisolasi tanpa merusak penomoran seksi sebelumnya.

### 3.2. Notasi Matematika & Rumus Ilmiah (KaTeX Luring)
- Integrasi parser formula KaTeX yang dikemas 100% secara luring di dalam bundel aplikasi.
- Penyisipan blok persamaan matematika interaktif (`Inline Math` dan `Block Equation`).
- Penomoran otomatis persamaan di tepi kanan lembar kertas sesuai bab: `(1.1)`, `(1.2)`, dll.
- Dukungan simbol kalkulus, matriks, aljabar linear, dan notasi fisika/kimia standar.

### 3.3. Pemformatan Tabel Ilmiah Tingkat Lanjut (Advanced Scientific Tables / Booktabs)
- Penggabungan sel horizontal (*Merge Columns*) dan vertikal (*Merge Rows*).
- Pemisah batas sel kustom gaya publikasi ilmiah (*Booktabs Style*): tabel tanpa garis batas vertikal (hanya garis atas tebal, garis bawah header tipis, dan garis penutup tebal).
- Perataan angka desimal pada kolom numerik (penyesuaian posisi titik koma desimal).
- Pengulangan baris judul tabel secara otomatis jika tabel terpotong ke lembar halaman berikutnya (*Repeat Header Row across Pages*).
- Penomoran otomatis judul tabel: `Tabel 1.1: Judul Tabel`.

### 3.4. Penggaris Vertikal & Indentasi Paragraf Lanjutan
- Menambahkan penanda seret khusus pada penggaris horisontal yang sudah ada:
  - **Penanda Indentasi Baris Pertama (*First Line Indent*)**: Menentukan awal paragraf menjorok ke dalam (misal 1 cm atau 1.27 cm).
  - **Penanda Indentasi Gantung (*Hanging Indent*)**: Menentukan batas kiri baris lanjutan (standar penulisan Daftar Pustaka format APA/IEEE).
- **Penggaris Vertikal (Vertical Ruler)** di sebelah kiri lembar kertas:
  - Mengukur ketinggian halaman aktual (cm).
  - Penanda seret visual untuk mengatur margin atas (*top margin*) dan margin bawah (*bottom margin*) langsung dari kanvas.

### 3.5. Pemeriksa Ejaan & Panduan PUEBI/KBBI Luring
- Kamus kata dasar Bahasa Indonesia luring terintegrasi untuk pendeteksian salah ketik (*typo*).
- Penanda garis bawah merah lembut untuk kata di luar perbendaharaan baku.
- Saran koreksi kata baku melalui menu klik kanan (misal: *analisa* -> *analisis*, *praktek* -> *praktik*, *jadual* -> *jadwal*).
- Pemisahan suku kata otomatis (*Hyphenation*) berdasarkan kaidah fonologi Bahasa Indonesia untuk paragraf rata kiri-kanan (*Justify*) agar spasi antar-kata tidak renggang berlebihan.

### 3.6. Manajemen Struktur Dokumen Akademik Otomatis
- **Pembuat Daftar Isi Dinamis (Auto Table of Contents)**: Pembangkitan Daftar Isi instan berdasarkan hierarki heading dokumen dengan garis titik-titik pemandu (*dot leaders*) otomatis dan pembaruan satu klik.
- **Pembuat Daftar Tabel & Daftar Gambar Dinamis**: Pelacakan otomatis seluruh keterangan (*caption*) tabel dan gambar dalam naskah dokumen dengan sinkronisasi nomor halaman real-time.
- **Pengelola Sitasi & Daftar Pustaka Luring (Citation Manager)**: Input bibliografi manual atau impor dari berkas pustaka BibTeX (`.bib`) dan RIS dengan pemformatan APA 7th, IEEE, Harvard, dan Vancouver.

---

## 4. Rencana Pembaruan Versi 1.3.0 (Distribusi Multi-Platform Penuh & Navigasi)

Tahap pembaruan **v1.3.0** difokuskan pada perluasan instalasi native untuk ekosistem Windows dan Linux serta instrumen navigasi dokumen panjang:

### 4.1. Paket Distribusi Sistem Operasi Windows
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

### 4.2. Paket Distribusi Sistem Operasi Linux
- **Paket Universal `AppImage`**:
  - Satu berkas mandiri siap jalan yang kompatibel dengan berbagai distribusi (Ubuntu, Fedora, Arch Linux, Debian, openSUSE).
- **Paket Debian / Ubuntu (`.deb`)**:
  - Paket biner native dengan pemenuhan dependensi `webkit2gtk-4.1`.
- **Dukungan Flathub & Arch User Repository (AUR)**:
  - Pembuatan manifes `flatpak` untuk ekosistem distribusi terisolasi sandbox.
  - Paket `baku-bin` pada repositori komunitas Arch Linux (AUR).

### 4.3. Distribusi macOS Lanjutan
- **Distribusi Homebrew Cask**:
  - Dukungan instalasi praktis melalui terminal macOS:
    ```bash
    brew install --cask baku-pdf
    ```
- **Penandatanganan Kode & Notarisasi Apple (Code Signing & Notarization)**:
  - Mengintegrasikan sertifikat Apple Developer ID dan notarisasi resmi Apple agar aplikasi dapat dibuka langsung tanpa peringatan Gatekeeper macOS.

### 4.4. Bilah Samping Navigasi Dokumen (Document Outline & Navigator Sidebar)
- Panel bilah samping kiri pada kanvas editor yang dapat dibuka-tutup (*Collapsible Sidebar*):
  - **Tab Navigasi Judul**: Pohon hierarki Bab dan Sub-bab; mengeklik judul akan langsung menggulir layar ke halaman bersangkutan.
  - **Tab Thumbnail Halaman**: Tinjauan miniatur seluruh halaman dokumen secara vertikal.
  - **Tab Hasil Pencarian**: Menampilkan daftar kutipan kalimat yang cocok saat menggunakan fitur Temukan & Ganti (*Find & Replace*).

---

## 5. Rencana Pembaruan Versi 1.4.0 (Utilitas PDF Luring & Keamanan Dokumen)

Tahap pembaruan **v1.4.0** difokuskan pada modul manipulasi berkas PDF independen dan keamanan privasi dokumen resmi:

### 5.1. Penandatangan & Pembubuh Paraf Digital Luring (Offline Signature & Stamp)
- Penggambaran tanda tangan langsung menggunakan kursor/stylus atau impor gambar tanda tangan berlatar transparan (PNG).
- Penempatan tanda tangan pada halaman mana pun dengan pratinjau seret-dan-lepas (*drag-and-drop*).
- Fitur tanda tangan massal pada koordinat tetap untuk dokumen multi-halaman.
- Pembubuhan stempel tanggal dan paraf luring.

### 5.2. Pembersih Jejak Metadata Dokumen (Metadata Sanitizer)
- Pembersihan metadata tersembunyi sebelum berkas diekspor ke PDF publik:
  - Menghapus nama pembuat asli, nama perangkat komputer, dan riwayat path folder lokal.
  - Menghapus cap waktu penyuntingan tersembunyi.
- Sangat penting untuk proses *Blind Review* artikel jurnal ilmiah dan dokumen rahasia instansi.

### 5.3. Penyusun & Pemilah Halaman Visual (Visual Page Organizer & Reorder)
- Antarmuka kisi thumbnail visual untuk setiap halaman dokumen PDF.
- Pemindahan urutan halaman dengan seret-dan-lepas (*drag-and-drop reordering*).
- Penghapusan halaman tunggal atau rentang halaman tertentu dengan tombol cepat.
- Penyisipan halaman kosong atau penyisipan halaman dari berkas PDF lain ke titik tertentu.

### 5.4. Pembubuh Watermark / Cap Teks Luring (PDF Watermark Tool)
- Pembubuhan teks watermark diagonal (kemiringan 45 derajat) atau horizontal.
- Preset kata: `DRAFT`, `SALINAN RESMI`, `RAHASIA`, `CONFIDENTIAL`, `SAMPLE`.
- Pengaturan transparansi teks (*opacity*), ukuran huruf, warna, dan pemilihan rentang halaman sasaran.

### 5.5. Proteksi & Enkripsi Kata Sandi PDF (PDF Password Protect & Decrypt)
- Pemasangan kata sandi buka dokumen (*User Password*) menggunakan enkripsi standar industri AES-256 luring.
- Pemasangan kata sandi izin (*Owner/Permissions Password*):
  - Membatasi pencetakan dokumen.
  - Membatasi penyalinan teks dan ekstraksi konten.
  - Membatasi modifikasi anotasi.
- Alat penghapus proteksi sandi (bagi pemilik berkas yang memiliki kata sandi sah).

### 5.6. Penomoran Halaman PDF Eksternal (Bates Numbering & PDF Page Stamper)
- Penomoran berkas PDF pihak ketiga yang belum memiliki nomor halaman.
- Konfigurasi letak nomor: sudut kanan atas, sudut kanan bawah, atau tengah bawah.
- Konfigurasi awalan teks (misal: `Lampiran Halaman 1 dari 10`, `Hal. 1`, atau nomor perkara peradilan).

---

## 6. Rencana Pembaruan Versi 1.5.0 (Puncak Milestone Ekosistem & Performa Naskah Tebal)

Tahap pembaruan **v1.5.0** merupakan puncak pencapaian (*Milestone Peak*) ekosistem Baku PDF untuk penanganan dokumen berskala masif, paket templat portabel, dan interoperabilitas penuh:

### 6.1. Ekspor/Impor Berkas Paket Templat Mandiri (.bakutpl)
- Kemampuan mengekspor templat buatan pengguna ke dalam satu berkas paket portabel `.bakutpl`.
- Kemampuan mengimpor berkas `.bakutpl` dari komputer lain langsung ke dalam Galeri Templat lokal.

### 6.2. Koleksi Templat Standar Tambahan Spesifik
- **Templat Publikasi & Jurnal Ilmiah**:
  - Jurnal Ilmiah Format SINTA (tata letak dua kolom presisi, abstrak dwibahasa, struktur IMRAD).
  - Paper Prosiding Standar IEEE (margin baku, font Times New Roman 10pt/8pt, penataan grafik dua kolom).
- **Templat Administrasi Kampus & Hibah Penelitian**:
  - Proposal Program Kreativitas Mahasiswa (PKM Kemendikbudristek).
  - Laporan Praktik Kerja Lapangan (PKL) / Magang Industri.
  - Proposal Tesis & Disertasi Pascasarjana.
- **Templat Administrasi Pemerintahan & Lembaga Resmi**:
  - Nota Dinas & Surat Perintah Tugas (SPT).
  - Surat Keputusan (SK) Resmi (konsiderans Menimbang, Mengingat, Menetapkan).
  - Berita Acara Serah Terima (BAST).

### 6.3. Virtualisasi Lembar Kertas (Infinite Virtual DOM Page Rendering)
- Render hanya lembar kertas yang sedang berada dalam area pandang (*viewport*) layar pengguna ditambah buffer 1-2 halaman sebelum dan sesudah.
- Memungkinkan pembukaan dokumen berbobot lebih dari 500 halaman (seperti buku ajar dan draf disertasi utuh) tanpa lonjakan konsumsi memori RAM.
- Waktu respons pengetikan (*input latency*) tetap berada di bawah 8 milidetik terlepas dari ketebalan naskah.

### 6.4. Mesin Pengekspor PDF Native Rust Murni
- Transisi modul ekspor PDF utama ke pustaka Rust native (`printpdf` dan `lopdf`) untuk melengkapi mekanisme cetak WebView.
- Hasil ekspor menghasilkan teks berbasis vektor murni yang dapat disalin (*searchable and selectable text*) dengan ukuran berkas keluaran hingga 60% lebih ringkas.
- Penanaman font (*Font Subsetting*) otomatis: hanya glif font yang digunakan yang disematkan ke dalam berkas PDF.

### 6.5. Mode Gelap & Terang Adaptif Penuh (Adaptive Dark/Light Themes)
- Tema Gelap Khusus (*True Dark Theme*) yang dirancang dengan rasio kontras tinggi sesuai standar WCAG AAA.
- Pilihan representasi lembar kertas di Mode Gelap: *Kertas Terang di Lingkungan Gelap* atau *Kertas Terbalik Gelap*.
- Sinkronisasi otomatis dengan preferensi tema sistem operasi (*Follow System Theme*).

### 6.6. Mode Penulisan Bebas Gangguan (Zen Mode) & Tata Letak Dua Halaman Berdampingan
- **Mode Bebas Gangguan (Zen / Distraction-Free Mode)**: Menyembunyikan pita alat dan bilah samping (`F11` / `Cmd+Shift+F`), hanya menyisakan lembar kertas terpusat.
- **Tampilan Berdampingan (*Two-Page Spread View*)**: Menampilkan dua halaman lembar kertas berdampingan secara horizontal pada monitor layar lebar.
- **Opsi Skala Lanjutan**: Opsi *Fit to Width* (Sesuaikan Lebar) dan *Fit to Page* (Sesuaikan Halaman Penuh).

### 6.7. Impor & Konversi Berkas Word (.docx) Luring serta Ekspor Format Naskah Standar
- Parser berkas `.docx` lokal murni berbasis Rust untuk membaca naskah Word dengan integritas pemformatan dasar.
- Ekspor ke berkas `.docx` (Microsoft Word) untuk kebutuhan peninjauan oleh dosen pembimbing atau instansi yang mewajibkan format Word.
- Ekspor ke berkas teks polos (`.txt`) dan Markdown ilmiah (`.md`).

### 6.8. Penyempurnaan Format Berkas .baku (Spesifikasi v2.0)
- Menambahkan penampung lampiran berkas biner di dalam struktur JSON `.baku` (misalnya gambar beresolusi tinggi yang terkompresi secara lossless).
- Penyimpanan daftar pustaka internal dan status nomor halaman per seksi.
- Kompatibilitas mundur penuh (*backward-compatible*): berkas `.baku` versi 1.0.0 tetap dapat dibuka sempurna pada versi 1.5.

### 6.9. Sistem Simpan Otomatis & Pemulihan Pasca Gangguan (Crash Auto-Recovery)
- Penyimpanan berkas berkala (*Auto-Save*) setiap 60 detik ke direktori penyimpanan lokal terisolasi.
- Dialog pemulihan otomatis saat aplikasi dibuka kembali jika terjadi listrik mati atau penutupan paksa.
- Riwayat snapshot versi lokal (*Local Revision History*) berdurasi 15, 30, dan 60 menit.

---

## 7. Matriks Prioritas Teknis & Rangkuman Tahapan Rilis (v1.1.0 – v1.5.0)

Untuk menghadirkan fitur-fitur baru secara cepat, teruji, dan stabil tanpa menunggu seluruh modul selesai sekaligus, pembaruan Baku PDF dibagi ke dalam lima gelombang rilis bertahap:

### 7.1. Rencana Gelombang Rilis Bertahap

| Versi Rilis | Fokus Utama Rilis | Modul Fitur yang Disertakan | Target Rilis |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Tab Dokumen & Efisiensi Kerja | Bilah Tab Multi-Dokumen (Sub-bab 2.1) dan Kompresor Ukuran Berkas PDF Luring (Sub-bab 2.2). | Rilis Terdekat |
| **v1.2.0** | Standar Akademik & Tipografi Ilmiah | Aturan Nomor Halaman Skripsi Ganda (Sub-bab 3.1), Notasi KaTeX Luring (Sub-bab 3.2), Tabel Ilmiah Booktabs (Sub-bab 3.3), Penggaris Vertikal (Sub-bab 3.4), PUEBI (Sub-bab 3.5), dan Struktur Dokumen Otomatis (Sub-bab 3.6). | Tahap 2 |
| **v1.3.0** | Distribusi Multi-Platform Penuh | Installer Windows NSIS (`.exe`) & Portable (Sub-bab 4.1), Paket Universal Linux AppImage & Debian `.deb` (Sub-bab 4.2), Distribusi macOS (Sub-bab 4.3), dan Bilah Samping Navigasi (Sub-bab 4.4). | Tahap 3 |
| **v1.4.0** | Utilitas PDF Luring & Keamanan | Tanda Tangan & Paraf Digital Luring (Sub-bab 5.1), Pembersih Metadata Dokumen (Sub-bab 5.2), Penyusun Halaman Visual (Sub-bab 5.3), Cap Watermark Luring (Sub-bab 5.4), Enkripsi Sandi PDF (Sub-bab 5.5), dan Bates Numbering (Sub-bab 5.6). | Tahap 4 |
| **v1.5.0** | Puncak Milestone Ekosistem | Paket Templat Mandiri `.bakutpl` (Sub-bab 6.1), Koleksi Templat Tambahan (Sub-bab 6.2), Virtualisasi DOM 500+ Halaman (Sub-bab 6.3), Mesin PDF Rust (Sub-bab 6.4), Mode Gelap (Sub-bab 6.5), Zen Mode (Sub-bab 6.6), Impor Word `.docx` (Sub-bab 6.7), Spesifikasi `.baku` v2.0 (Sub-bab 6.8), dan Pemulihan Crash (Sub-bab 6.9). | Puncak Milestone |

### 7.2. Matriks Prioritas Teknis Pengembangan

| Modul Fitur | Target Komponen | Target Versi | Prioritas | Estimasi Kompleksitas |
| :--- | :--- | :--- | :--- | :--- |
| Bilah Tab Multi-Dokumen (Multi-Document Tabs) | Frontend Editor & State Engine | v1.1.0 | Sangat Tinggi | Menengah |
| Kompresor Ukuran Berkas PDF | Rust Backend (`lopdf` / `image`) | v1.1.0 | Sangat Tinggi | Menengah |
| Aturan Posisi Nomor Halaman Bab Baku | Frontend Sheet Engine | v1.2.0 | Tinggi | Menengah |
| Notasi Matematika KaTeX Luring | Frontend Parser Engine | v1.2.0 | Tinggi | Rendah |
| Penggaris Vertikal & Indentasi Paragraf | Frontend Ruler Engine | v1.2.0 | Sedang | Menengah |
| Pemformatan Tabel Ilmiah (Booktabs) | Frontend Sheet Engine | v1.2.0 | Sedang | Menengah |
| Installer Windows (.exe) & Linux (AppImage) | Tauri Bundler & CI Workflow | v1.3.0 | Sangat Tinggi | Menengah |
| Panel Navigasi Outline & Thumbnail | Frontend UI & DOM Virtualizer | v1.3.0 | Tinggi | Menengah |
| Tanda Tangan & Paraf Digital Luring | Rust Backend & Canvas Overlay | v1.4.0 | Sedang | Menengah |
| Pembersih Jejak Metadata Dokumen | Rust Backend & PDF Pipeline | v1.4.0 | Sedang | Rendah |
| Penyusun & Pemilah Halaman Visual | Frontend UI & Rust Backend | v1.4.0 | Sedang | Menengah |
| Mode Gelap Adaptif (Dark Mode) | CSS Theme Engine | v1.5.0 | Sedang | Rendah |
| Ekspor/Impor Paket Templat (.bakutpl) | Frontend Data Store & JSON | v1.5.0 | Sedang | Rendah |
| Virtualisasi DOM Halaman (500+ Halaman) | Frontend DOM Virtualizer | v1.5.0 | Tinggi | Tinggi |
| Impor Dokumen Word (.docx) Luring | Rust DOCX Parser | v1.5.0 / Lanjutan | Masa Depan | Tinggi |

---

## 8. Kontribusi & Diskusi Fitur

Rencana pembaruan ini bersifat terbuka untuk masukan dari komunitas pengguna dan pengembang:
- Ajukan usulan melalui [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md).
- Laporkan masalah melalui [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md).
- Baca panduan lengkap kontribusi di [CONTRIBUTING.md](../CONTRIBUTING.md).
- Periksa arsitektur teknis Baku PDF di [ARCHITECTURE.md](../ARCHITECTURE.md).
