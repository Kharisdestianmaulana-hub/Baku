# Baku

Baku is a lightweight, standardized desktop word processor designed for academic papers, theses, formal letters, and official documents. Built with a local-first architecture to ensure performance, privacy, and pixel-perfect WYSIWYG document export.

---

## Bahasa Indonesia

### Deskripsi Proyek
Baku adalah aplikasi pengolah kata desktop yang dirancang khusus untuk mempermudah penyusunan dokumen dengan format baku, seperti skripsi, tesis, laporan teknis, dan surat dinas. Aplikasi ini berfokus pada kecepatan, kesederhanaan, serta keakuratan tata letak halaman tanpa ketergantungan pada server eksternal.

### Fitur Utama
- **Tata Letak Halaman Baku**: Pengaturan ukuran kertas standar (A4, F4/Folio, Letter) dengan margin akademis yang presisi (misalnya 4-4-3-3 cm untuk karya ilmiah).
- **Ribbon UI**: Antarmuka berbasis tab bergaya desktop modern yang memudahkan akses ke format teks, paragraf, dan penyisipan elemen.
- **Ekspor PDF Akurat (WYSIWYG)**: Menghasilkan berkas PDF dengan tata letak yang persis seperti yang terlihat di layar editor.
- **Format Berkas Mandiri (.baku)**: Penyimpanan dokumen berbasis struktur JSON terenkapsulasi untuk menjaga keutuhan format antarsesi.
- **Dukungan Multi-Bahasa**: Antarmuka dapat dialihkan antara Bahasa Indonesia dan Bahasa Inggris.
- **Penyunting Gambar Terintegrasi**: Mendukung penyisipan gambar dengan fungsi perataan, penyesuaian ukuran, serta menu kontekstual.
- **Navigasi Riwayat Dokumen**: Panel beranda yang menyajikan daftar berkas terbaru untuk akses cepat.

### Arsitektur dan Teknologi
- **Backend**: Rust dengan Tauri Framework.
- **Frontend**: HTML5, CSS3, dan Vanilla JavaScript (arsitektur tanpa dependensi framework berat).
- **Mesin Editor**: Quill.js 2.0 (Custom Build).
- **Pemrosesan PDF**: Integrasi rendering berbasis Webview dan Rust I/O.

### Persyaratan Sistem
- Node.js (versi 16 atau lebih baru)
- Rust dan Cargo (versi stabil terbaru)
- Paket dependensi sistem Tauri sesuai platform (Windows/macOS/Linux)

### Panduan Memulai

1. Klon repositori:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Instal dependensi frontend:
   ```bash
   npm install
   ```

3. Jalankan aplikasi dalam mode pengembangan:
   ```bash
   npm run tauri dev
   ```

4. Bangun paket aplikasi untuk produksi:
   ```bash
   npm run tauri build
   ```

---

## English

### Project Overview
Baku is a lightweight desktop word processor engineered specifically for drafting structured, formal, and academic documents such as theses, technical reports, and official correspondences. It emphasizes raw performance, distraction-free editing, and deterministic layout output without reliance on external cloud services.

### Key Features
- **Standardized Page Layouts**: Built-in presets for standard paper dimensions (A4, F4/Folio, Letter) with strict academic margin setups.
- **Ribbon UI Toolbar**: A modern desktop tabbed toolbar providing immediate access to typography controls, alignment options, and insertion tools.
- **Deterministic PDF Export (WYSIWYG)**: Outputs print-ready PDF files matching the on-screen editor layout with high fidelity.
- **Native Document Format (.baku)**: Structured document storage using encapsulated JSON to preserve layout consistency across editing sessions.
- **Bilingual Interface**: Seamless switching between English and Indonesian language dictionaries.
- **Integrated Image Handling**: Image embedding support with alignment controls, resizing capabilities, and contextual actions.
- **Recent Documents Management**: Home dashboard providing fast access to previously opened documents.

### Architecture and Technology Stack
- **Backend**: Rust via the Tauri Framework.
- **Frontend**: HTML5, CSS3, and Vanilla JavaScript (zero heavy UI framework overhead).
- **Editor Core**: Quill.js 2.0 (Custom Build).
- **PDF Pipeline**: Integrated Webview rendering paired with asynchronous Rust file I/O.

### System Requirements
- Node.js (v16 or higher)
- Rust and Cargo (latest stable toolchain)
- Platform-specific Tauri build dependencies (Windows, macOS, or Linux)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm run tauri dev
   ```

4. Build the standalone release binary:
   ```bash
   npm run tauri build
   ```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
