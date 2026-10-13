## Ringkasan Perubahan (Summary of Changes)
Jelaskan secara singkat apa yang diubah, ditambahkan, atau diperbaiki dalam Pull Request ini.

## Nomor Isu Terkait (Related Issue)
Tautkan tiket issue yang diselesaikan oleh PR ini (misal: `Fixes #12` atau `Closes #34`).

## Jenis Perubahan (Type of Change)
- [ ] Perbaikan Bug (Bug fix)
- [ ] Fitur Baru (New feature)
- [ ] Templat Dokumen Baru (New standard template)
- [ ] Dokumentasi / Terjemahan (Documentation or i18n update)
- [ ] Refaktor Kode / Optimasi Kinerja (Refactoring / Performance)

## Daftar Periksa Kontributor (Contributor Checklist)
Harap periksa dan pastikan seluruh poin di bawah telah dipenuhi:
- [ ] Kode telah diuji secara lokal dan berfungsi dengan baik.
- [ ] Sintaks JavaScript valid dan lulus uji: `node -c src/main.js src/i18n.js src/workspace.js`.
- [ ] Kompilasi Rust backend sukses: `cargo check --manifest-path src-tauri/Cargo.toml`.
- [ ] **Bebas Emoji**: Tidak ada karakter emoji yang disisipkan pada kode, komentar, antarmuka, maupun pesan commit.
- [ ] **Dukungan Dwibahasa**: Seluruh teks antarmuka baru menggunakan atribut `data-i18n` dan terdaftar di `src/i18n.js`.
- [ ] **Local-First**: Tidak ada panggilan jaringan ke server eksternal atau telemetri yang ditambahkan.

## Tangkapan Layar (Screenshots / UI Preview)
*Sertakan perbandingan sebelum dan sesudah jika ada perubahan antarmuka.*
