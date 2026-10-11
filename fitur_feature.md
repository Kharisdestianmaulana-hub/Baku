# Daftar Fitur Mendatang (Backlog)

File ini berisi ide-ide fitur dan perencanaan pengembangan yang akan dikerjakan di masa depan (setelah fitur-fitur fundamental selesai).

## 1. Multi-Document / Tab System (via Status Bar)
*   **Konsep:** Pengguna dapat membuka lebih dari satu dokumen `.baku` secara bersamaan di dalam memori.
*   **UI/UX:** Terdapat indikator nama dokumen yang sedang aktif di *Status Bar* (sebelah kiri, setelah teks indikator *Page*). Jika indikator ini diklik, akan muncul menu *pop-up* (dropdown) yang menampilkan daftar dokumen yang sedang terbuka. Pengguna bisa berpindah-pindah antar dokumen tanpa perlu *Alt+Tab* atau membuka jendela baru.
*   **Technical Notes:** 
    *   Membutuhkan refaktor arsitektur dari *Single-State* menjadi *Array of Objects* (`openDocuments = [{ name, path, quillContent, paperConfig, headerFooterConfig, ... }]`).
    *   Fungsi "New" dan "Open" akan menambahkan objek baru ke dalam array, alih-alih menimpa data yang sedang aktif.
    *   Proses *switch* akan menyalin isi kanvas (Delta) ke *state* dokumen lama, lalu menyiram kanvas dengan data dokumen tujuan.

---
*(Tambahkan ide fitur lainnya di bawah sini...)*
