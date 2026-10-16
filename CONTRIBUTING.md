# Panduan Kontribusi / Contributing to Baku PDF

Terima kasih atas minat Anda untuk berkontribusi pada **Baku PDF**! Proyek ini bersifat sumber terbuka (*open source*) di bawah naungan **Lisensi MIT**. Kami menyambut segala bentuk kontribusi, baik berupa pelaporan bug, perbaikan dokumentasi, penambahan templat standar baru, maupun kontribusi kode.

[English Version](#english-version) | [Versi Bahasa Indonesia](#versi-bahasa-indonesia)

---

## Versi Bahasa Indonesia

### 1. Cara Berkontribusi

Anda dapat berkontribusi melalui berbagai cara:
- **Melaporkan Bug**: Jika menemukan perilaku aneh, eror, atau masalah tata letak, buat tiket baru di tab [Issues](https://github.com/Kharisdestianmaulana-hub/Baku/issues) dengan langkah reproduksi yang jelas.
- **Mengusulkan Fitur / Templat Baru**: Punya ide fitur atau format standar dokumen resmi (kampus, kedinasan, atau kantor) yang belum ada? Buka diskusi atau Issue usulan fitur.
- **Menyempurnakan Dokumentasi & Terjemahan**: Memperbaiki panduan, menambah terjemahan di `src/i18n.js`, atau memperbaiki ejaan bahasa.
- **Mengirimkan Perbaikan Kode (Pull Request)**: Menyelesaikan isu yang ada atau mengoptimalkan performa aplikasi.

---

### 2. Menyiapkan Lingkungan Pengembangan Lokal

#### Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
1. **Node.js**: Versi 16 atau lebih baru.
2. **Rust & Cargo**: Versi stabil terbaru ([rustup.rs](https://rustup.rs)).
3. **Dependensi Platform Tauri**:
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`).
   - **Windows**: Microsoft C++ Build Tools & WebView2 Runtime.
   - **Linux (Ubuntu/Debian)**: `sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev`.

#### Langkah Instalasi
1. Lakukan *Fork* repositori ini ke akun GitHub Anda.
2. Klon repositori lokal dari hasil fork Anda:
   ```bash
   git clone https://github.com/<username-anda>/Baku.git
   cd Baku
   ```
3. Pasang dependensi frontend:
   ```bash
   npm install
   ```
4. Jalankan aplikasi dalam mode pengembangan (*hot-reload* aktif):
   ```bash
   npm run tauri dev
   ```
5. Untuk membangun paket biner produksi:
   ```bash
   npm run tauri build
   ```

---

### 3. Struktur Direktori Proyek

- **`src/`**: Antarmuka pengguna dan logika web:
  - `index.html`: Struktur DOM aplikasi, menu bar, ribbon, kanvas editor, dan modal dialog.
  - `styles.css`: Gaya visual antarmuka bertema *flat design* 2D.
  - `main.js`: Logika interaksi editor Quill, penggaris visual, penomoran halaman, manajemen berkas, dan dialog.
  - `i18n.js`: Kamus dwibahasa (Bahasa Indonesia & English) dan sistem terjemahan instan.
  - `workspace.js`: Inisialisasi folder kerja lokal dan definisi data 8 templat bawaan (`BUILTIN_TEMPLATES_DATA`).
  - `tooltip.js`: Sistem tooltip kustom.
- **`src-tauri/`**: Backend Rust dan integrasi desktop:
  - `src/main.rs`: Handler perintah Tauri, manipulasi berkas `.baku` atomik, menu bar native, deteksi printer, dan utilitas PDF (`lopdf`, `printpdf`).
  - `tauri.conf.json`: Konfigurasi bundler desktop, allowlist hak akses, dan paket installer platform.
- **`.github/workflows/`**: Konfigurasi otomatisasi CI/CD dan rilis paket biner multi-platform.

---

### 4. Pedoman Standar Kode & Aturan Khusus

Agar konsistensi dan kualitas proyek tetap terjaga, harap patuhi pedoman berikut:

1. **Aturan Bebas Emoji**:
   - Seluruh kode sumber, nama variabel, komentar, teks antarmuka (UI), dokumentasi, dan pesan commit **tidak boleh menggunakan karakter emoji**.
   - Gunakan tipografi teks formal atau ikon SVG yang bersih.

2. **Prinsip Local-First & 100% Luring**:
   - Baku PDF adalah aplikasi yang memprioritaskan privasi pengguna.
   - **Dilarang** menyisipkan dependensi yang mengirim data pengguna ke server eksternal, analitik pelacak (telemetri), atau mewajibkan koneksi internet untuk fungsi inti.

3. **Dukungan Dwibahasa Penuh (i18n)**:
   - Setiap elemen teks baru pada antarmuka wajib dilengkapi atribut `data-i18n="Teks Indonesia"`.
   - Daftarkan padanan terjemahan bahasa Inggris pada objek `DICT_EN` di dalam berkas `src/i18n.js`.

4. **Desain Antarmuka Flat 2D**:
   - Pertahankan estetika visual *flat design* 2D minimalis yang bersih, fungsional, dan bebas dari ornamen 3D yang berlebihan.

---

### 5. Alur Pengiriman Kode (Pull Request)

1. Buat cabang (*branch*) baru dari `main` dengan nama yang deskriptif:
   ```bash
   git checkout -b feat/nama-fitur-baru
   # atau
   git checkout -b fix/nama-perbaikan-bug
   ```
2. Lakukan perubahan kode dan pastikan sintaks bebas galat:
   ```bash
   node -c src/main.js src/i18n.js src/workspace.js
   cargo check --manifest-path src-tauri/Cargo.toml
   ```
3. Gunakan format pesan commit yang jelas (*Conventional Commits*):
   - `feat: tambah opsi ekspor halaman tertentu`
   - `fix: perbaiki indentasi penggaris pada mode lanskap`
   - `docs: perbarui panduan kontribusi`
4. Lakukan *push* ke repositori fork Anda dan buka **Pull Request** ke cabang `main` repositori utama.
5. Jelaskan perubahan yang dibuat, masalah yang diselesaikan, dan sertakan tangkapan layar jika ada perubahan visual antarmuka.

---

### 6. Kebijakan Penomoran Versi (Semantic Versioning)

Baku PDF menerapkan standar penomoran versi 3 angka **Semantic Versioning** (`v[MAJOR].[MINOR].[PATCH]`):
- **MAJOR (Angka Pertama)**: Rilis versi utama atau perombakan arsitektural besar (contoh: transisi `v1.0.0` ke `v2.0.0`).
- **MINOR (Angka Kedua)**: Penambahan fitur baru yang signifikan dan banyak tanpa merusak alur kerja sebelumnya (contoh: `v1.0.0` ke `v1.1.0`).
- **PATCH (Angka Ketiga)**: Perbaikan kutu (*bug fixes*), penambalan keamanan, pembaruan dependensi, atau koreksi tampilan kecil (contoh: `v1.0.0` ke `v1.0.1`).

Saat menaikkan versi, seluruh berkas konfigurasi berikut wajib disinkronkan secara konsisten:
1. `package.json` (`"version": "X.Y.Z"`)
2. `package-lock.json` (`"version": "X.Y.Z"`)
3. `src-tauri/tauri.conf.json` (`"version": "X.Y.Z"` pada blok `"package"`)
4. `src-tauri/Cargo.toml` (`version = "X.Y.Z"` pada blok `[package]`)
5. `src/index.html` dan `src/i18n.js` (dialog Informasi Tentang Baku PDF)
6. `CHANGELOG.md` (pencatatan catatan rilis resmi)

---

## English Version

### 1. How to Contribute

You can contribute in multiple ways:
- **Bug Reports**: Encounter an issue or formatting bug? Open a new report under the [Issues](https://github.com/Kharisdestianmaulana-hub/Baku/issues) tab with clear reproduction steps.
- **Feature & Template Requests**: Suggest new features or standardized document templates for academic or official use cases.
- **Documentation & Localization**: Enhance guides, refine translation strings in `src/i18n.js`, or fix typos.
- **Code Contributions (Pull Requests)**: Submit fixes, performance optimizations, or new capabilities.

---

### 2. Local Development Environment

#### Prerequisites
Ensure your machine has the following tools installed:
1. **Node.js**: Version 16 or newer.
2. **Rust & Cargo**: Latest stable toolchain ([rustup.rs](https://rustup.rs)).
3. **Tauri System Dependencies**:
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`).
   - **Windows**: Microsoft C++ Build Tools & WebView2 Runtime.
   - **Linux (Ubuntu/Debian)**: `sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev`.

#### Getting Started
1. Fork this repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Baku.git
   cd Baku
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Start the application in development mode:
   ```bash
   npm run tauri dev
   ```
5. Compile a production release bundle:
   ```bash
   npm run tauri build
   ```

---

### 3. Core Architecture & Constraints

To maintain software integrity and clean architecture:

1. **Strict Zero-Emoji Rule**:
   - Do not include emojis in source code, variable names, comments, UI strings, documentation, or commit messages.
   - Rely strictly on formal typography and clean SVG iconography.

2. **Local-First & Offline Privacy**:
   - All document processing, rendering, and file operations must occur 100% locally on the user's machine.
   - Do not introduce telemetry, remote network calls, or cloud dependencies.

3. **Bilingual Localization (i18n)**:
   - All UI text nodes must include a `data-i18n="Indonesian String"` attribute.
   - Provide the corresponding English translation in `DICT_EN` within `src/i18n.js`.

4. **Flat 2D Aesthetic**:
   - Follow Baku's minimalist two-dimensional visual design guidelines (clean borders, neutral backgrounds, no skeuomorphic 3D effects).

---

### 4. Submitting a Pull Request

1. Create a descriptive branch from `main`:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Verify code syntax and compilation:
   ```bash
   node -c src/main.js src/i18n.js src/workspace.js
   cargo check --manifest-path src-tauri/Cargo.toml
   ```
3. Follow Conventional Commit conventions:
   - `feat: add support for custom header margin presets`
   - `fix: resolve page break cursor positioning on click`
   - `docs: update contributing guide`
4. Push your branch and open a **Pull Request** against `main`. Provide a concise explanation of changes and include screenshots for UI updates.

---

### 6. Semantic Versioning Policy

Baku PDF strictly adheres to 3-digit **Semantic Versioning** (`v[MAJOR].[MINOR].[PATCH]`):
- **MAJOR (First Digit)**: Major milestone releases or large architectural overhauls (e.g., transition from `v1.0.0` to `v2.0.0`).
- **MINOR (Middle Digit)**: Feature releases introducing significant new capabilities while maintaining backwards compatibility (e.g., `v1.0.0` to `v1.1.0`).
- **PATCH (Third Digit)**: Bug fixes, security patches, dependency updates, or small polish adjustments (e.g., `v1.0.0` to `v1.0.1`).

When bumping the application version, all corresponding configuration files must be synchronized consistently:
1. `package.json` (`"version": "X.Y.Z"`)
2. `package-lock.json` (`"version": "X.Y.Z"`)
3. `src-tauri/tauri.conf.json` (`"version": "X.Y.Z"` under `"package"`)
4. `src-tauri/Cargo.toml` (`version = "X.Y.Z"` under `[package]`)
5. `src/index.html` and `src/i18n.js` (About Baku PDF dialog)
6. `CHANGELOG.md` (official release log entries)

---

### License Notice
By contributing to Baku PDF, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
