# Kebijakan Keamanan / Security Policy

## Versi yang Didukung / Supported Versions

Kami secara aktif memelihara dan merilis pembaruan keamanan untuk versi berikut:

| Versi / Version | Status Dukungan / Supported | Catatan / Notes |
|---|---|---|
| 1.0.x | Didukung / Supported | Rilis stabil aktif saat ini |
| < 1.0.0 | Tidak Didukung / Unsupported | Versi pengembangan awal |

---

## Jaminan Keamanan & Privasi Lokal (Local-First Guarantee)

Baku PDF dirancang dengan filosofi **100% Local-First & Offline**:
- **Tidak Ada Transmisi Jaringan**: Seluruh pemrosesan teks, penataan dokumen, kompilasi kanvas, dan utilitas manipulasi PDF (merge, split, rotate, image to PDF) berlangsung secara lokal di perangkat Anda.
- **Bebas Pelacak & Telemetri**: Baku PDF tidak mengumpulkan data pribadi, analitik perilaku pengetikan, maupun konten dokumen pengguna.
- **Penyimpanan Berkas Atomik**: Mekanisme penulisan berkas format `.baku` diimplementasikan di sisi backend Rust menggunakan buffer sementara yang disinkronkan ke media penyimpanan sebelum penggantian nama (*atomic write*), meminimalkan risiko korupsi data saat sistem mengalami pemadaman listrik tiba-tiba.

---

## Melaporkan Kerentanan Keamanan / Reporting a Vulnerability

Kami sangat menghargai kontribusi para peneliti keamanan dan komunitas sumber terbuka dalam menjaga integritas Baku PDF. Jika Anda menemukan kerentanan keamanan (seperti masalah pada parser berkas PDF, penanganan path file, atau izin IPC Tauri), harap ikuti langkah berikut:

### Bahasa Indonesia
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

### English
1. **Do Not Open a Public Issue**: To safeguard users, please avoid reporting security vulnerabilities publicly on the GitHub *Issues* tab.
2. **Submit via GitHub Security Advisories**:
   - Navigate to the [Security Advisories](https://github.com/Kharisdestianmaulana-hub/Baku/security/advisories) tab on this repository.
   - Click **New draft security advisory** to submit a private disclosure directly to the maintainers.
3. **Required Details**:
   - Summary of the vulnerability type and potential severity.
   - Step-by-step reproduction guide or safe proof-of-concept file.
   - Potential impact of the issue.
   - Suggested fix or remediation if available.
4. **Response Timeline**:
   - We strive to acknowledge and evaluate all reports within 48 hours.
   - We will coordinate with you during patch development until the security release is published.
