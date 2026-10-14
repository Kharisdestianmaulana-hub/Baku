# Kebijakan Keamanan / Security Policy

**Languages / Bahasa**: [Bahasa Indonesia](#bahasa-indonesia) | [English](#english)

---

## Bahasa Indonesia

### Versi yang Didukung

Kami secara aktif memelihara dan merilis pembaruan keamanan untuk versi berikut:

| Versi | Status Dukungan | Catatan |
|---|---|---|
| 1.0.x | Didukung | Rilis stabil aktif saat ini |
| < 1.0.0 | Tidak Didukung | Versi pengembangan awal |

### Jaminan Keamanan & Privasi Lokal (Local-First Guarantee)

Baku PDF dirancang dengan filosofi **100% Local-First & Offline**:
- **Tidak Ada Transmisi Jaringan**: Seluruh pemrosesan teks, penataan dokumen, kompilasi kanvas, dan utilitas manipulasi PDF (merge, split, rotate, image to PDF) berlangsung secara lokal di perangkat Anda.
- **Bebas Pelacak & Telemetri**: Baku PDF tidak mengumpulkan data pribadi, analitik perilaku pengetikan, maupun konten dokumen pengguna.
- **Penyimpanan Berkas Atomik**: Mekanisme penulisan berkas format `.baku` diimplementasikan di sisi backend Rust menggunakan buffer sementara yang disinkronkan ke media penyimpanan sebelum penggantian nama (*atomic write*), meminimalkan risiko korupsi data saat sistem mengalami pemadaman listrik tiba-tiba.

### Melaporkan Kerentanan Keamanan

Kami sangat menghargai kontribusi para peneliti keamanan dan komunitas sumber terbuka dalam menjaga integritas Baku PDF. Jika Anda menemukan kerentanan keamanan (seperti masalah pada parser berkas PDF, penanganan path file, atau izin IPC Tauri), harap ikuti langkah berikut:

1. **Jangan Membuka Issue Publik**: Demi melindungi pengguna lain, mohon untuk tidak memublikasikan detail kerentanan pada tab *Issues* publik GitHub sebelum perbaikan dirilis.
2. **Kirim Laporan Melalui GitHub Security Advisories**:
   - Buka tab [Security Advisories](https://github.com/Kharisdestianmaulana-hub/Baku/security/advisories) di repositori ini.
   - Klik **New draft security advisory** untuk mengirim laporan secara privat kepada pengelola proyek.
3. **Informasi yang Diperlukan**:
   - Deskripsi singkat mengenai jenis kerentanan.
   - Langkah reproduksi (langkah demi langkah atau contoh berkas uji yang aman).
   - Dampak potensial dari eksploitasi kerentanan tersebut.
   - Saran perbaikan jika Anda telah mengidentifikasinya.
4. **Waktu Tanggapan**:
   - Kami berkomitmen untuk meninjau dan merespons laporan dalam waktu 48 jam.
   - Kami akan berkoordinasi dengan Anda dalam proses pengujian perbaikan hingga rilis patch keamanan resmi diluncurkan.

---

## English

### Supported Versions

We actively maintain and provide security patches for the following versions:

| Version | Supported | Notes |
|---|---|---|
| 1.0.x | Yes | Current active stable release |
| < 1.0.0 | No | Pre-release development versions |

### Local-First & Privacy Guarantee

Baku PDF is built on a **100% Local-First & Offline** architecture:
- **Zero Network Transmission**: All text processing, document rendering, canvas rasterization, and PDF manipulations (merge, split, rotate, image to PDF) execute locally on your physical machine.
- **Zero Telemetry & Tracking**: Baku PDF never collects personal data, behavioral analytics, or user document content.
- **Atomic File Persistence**: The `.baku` document format utilizes atomic write operations in the Rust backend, syncing buffers to physical storage before replacing existing files to eliminate data corruption risks during sudden power loss.

### Reporting a Vulnerability

We deeply appreciate the efforts of security researchers and open source contributors in keeping Baku PDF secure. If you discover a vulnerability (such as PDF parser vulnerabilities, file path sanitization issues, or Tauri IPC permission oversights), please follow these guidelines:

1. **Do Not Open a Public Issue**: To safeguard user data, please refrain from filing security vulnerability details on public GitHub Issues before a fix is released.
2. **Submit via GitHub Security Advisories**:
   - Navigate to the [Security Advisories](https://github.com/Kharisdestianmaulana-hub/Baku/security/advisories) page of this repository.
   - Click **New draft security advisory** to submit a private disclosure report directly to the core maintainers.
3. **Information to Include**:
   - Summary of the vulnerability type and estimated severity.
   - Step-by-step reproduction instructions or a safe proof-of-concept file.
   - Potential impact of exploitation.
   - Proposed remediation or code patches if available.
4. **Response Timeline**:
   - We are committed to acknowledging and evaluating incoming disclosures within 48 hours.
   - We will collaborate with you through private channels until an official patch release is published.
