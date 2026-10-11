# Peraturan Penulisan Kode (Baku PDF Editor)

Dokumen ini berisi panduan dan aturan ketat yang **wajib** dipatuhi selama pengembangan dan modifikasi basis kode (codebase) pada proyek ini.

## 1. Aturan Pengeditan File & Penggunaan Alat (Tools)
*   **DILARANG KERAS** mengedit file menggunakan perintah Terminal/PowerShell seperti `sed`, `echo`, pencarian *regex* dari command line, atau skrip node in-line yang rumit untuk memanipulasi teks. Hal ini dapat merusak struktur indentasi (layout) dan menyebabkan bug sintaksis.
*   **SELALU** gunakan alat bawaan AI yang dirancang khusus untuk ini (seperti `replace_file_content` untuk mengedit blok kode spesifik secara presisi, atau `write_to_file` untuk membuat file baru).
*   Gunakan `view_file` atau pencarian teks ringan hanya untuk membaca, BUKAN untuk mengubah (replace).
*   Sebelum mengedit, **WAJIB** membaca isi file (atau bagian yang relevan) secara mendetail. Jangan berasumsi letak suatu baris tanpa memastikannya terlebih dahulu.

## 2. Dukungan Bahasa (Internasionalisasi / i18n)
*   Aplikasi ini menargetkan pengguna global sekaligus lokal. **Setiap fitur baru** yang menampilkan antarmuka teks kepada pengguna (UI) **wajib** mendukung setidaknya dua bahasa: **Bahasa Indonesia** dan **Bahasa Inggris**.
*   **Jangan gunakan *hardcoded string* untuk UI.** Selalu bungkus teks dengan pemanggil lokalisasi yang sudah tersedia di proyek ini, misalnya `window.t('Teks Anda')` atau `data-i18n="Teks Anda"`.
*   Setiap kali menambahkan frasa baru, pastikan untuk mendaftarkannya ke dalam kamus di file `i18n.js`.

## 3. Clean Code & Arsitektur
*   **Fokus pada Keterbacaan:** Tulis kode untuk dibaca manusia, bukan hanya mesin. Gunakan nama variabel dan fungsi yang deskriptif (menjelaskan tujuannya). Jangan gunakan singkatan yang ambigu.
*   **Satu Fungsi, Satu Tugas (Single Responsibility):** Jangan membuat fungsi "raksasa" yang menangani UI, logika perhitungan, dan penyimpanan sekaligus. Pecah menjadi beberapa fungsi kecil bila memungkinkan.
*   **Komentar yang Bermanfaat:** Jangan menjelaskan *apa* yang dilakukan kode (karena kode itu sendiri sudah menjelaskannya), tapi jelaskan *mengapa* hal itu dilakukan (terutama jika ada perhitungan matematis, trik CSS, atau tata letak absolut).
*   **Cegah *Memory Leak*:** Pastikan setiap event listener tidak menumpuk berulang kali jika fungsi dipanggil ulang, atau gunakan delegasi event.

## 4. Gaya UI & Pengalaman Pengguna (UX)
*   **Aksesibilitas Fitur (Toolbar/Ribbon):** Jika membuat fitur baru yang bisa diaktifkan/diakses oleh pengguna, **wajib** menambahkan tombol pintasan (*shortcut button*) yang sesuai ke dalam *Toolbar* (Ribbon) utama di atas. Jangan menyembunyikan fitur hanya di klik tersembunyi tanpa indikasi antarmuka.
*   Aplikasi ini diposisikan sebagai editor PDF langsung (WYSIWYG) yang modern dan bersih. UI harus selaras, tidak bertabrakan, dan memiliki ukuran margin/padding yang cukup agar tidak terkesan sempit.
*   Jika menambahkan *toolbar* atau menu mengambang (seperti Header/Footer editor), pastikan interaksinya alami, bisa ditutup, dan tidak memblokir pandangan ke teks utama.

## 5. Kualitas dan Pengujian
*   Setelah menambahkan fitur atau mengedit, selalu pikirkan interaksinya dengan fitur lain. (Misal: Apakah "Different First Page" mengacaukan nomor halaman? Apakah fitur X akan rusak jika margin diset 0?).
*   Lakukan pengecekan sintaksis (misalnya dengan mengeksekusi `node -c main.js`) setiap selesai membuat perubahan besar, sebelum melaporkannya kepada *User*.
