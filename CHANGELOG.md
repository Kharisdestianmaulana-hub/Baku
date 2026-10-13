# Catatan Perubahan / Changelog

Seluruh perubahan penting pada proyek **Baku PDF** dicatat di dalam dokumen ini.

Format dokumen ini mengacu pada panduan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan mematuhi aturan penomoran [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-14

### Ditambahkan (Added)
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
  - Installer macOS DMG dengan tata letak seret ke folder Applications dan pencegat eksekusi langsung dari DMG (*DMG launch guard*).

### Keamanan (Security)
- Arsitektur *local-first* murni: seluruh pemrosesan berjalan 100% luring di perangkat pengguna tanpa transmisi jaringan atau telemetri.
- Penulisan berkas `.baku` atomik di sisi backend Rust untuk mencegah korupsi data saat sistem tertutup tiba-tiba.
