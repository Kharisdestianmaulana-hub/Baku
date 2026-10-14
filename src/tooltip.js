const TOOLTIP_DB = {
    // === FORMATTING & TYPOGRAPHY ===
    "Tebal": { desc: "Menebalkan teks yang dipilih.", shortcut: "Ctrl+B" },
    "Miring": { desc: "Memiringkan teks yang dipilih.", shortcut: "Ctrl+I" },
    "Garis Bawah": { desc: "Memberi garis bawah pada teks.", shortcut: "Ctrl+U" },
    "Coret": { desc: "Memberi coretan pada teks.", shortcut: "Ctrl+Shift+X" },
    "Subskrip": { desc: "Menulis huruf kecil di bawah garis teks (misal: H₂O).", shortcut: "Ctrl+=" },
    "Superskrip": { desc: "Menulis huruf kecil di atas garis teks (misal: X²).", shortcut: "Ctrl+Shift++" },
    "Kuas Format": { desc: "Menyalin gaya sebuah teks dan menerapkannya ke teks lain.", shortcut: "Ctrl+Shift+C" },
    "HURUF BESAR": { desc: "Mengubah seluruh teks yang dipilih menjadi huruf kapital.", shortcut: "Shift+F3" },
    "huruf kecil": { desc: "Mengubah seluruh teks yang dipilih menjadi huruf kecil.", shortcut: "Shift+F3" },
    "Warna Teks": { desc: "Mengubah warna huruf teks yang dipilih.", shortcut: "" },
    "Warna Latar": { desc: "Memberi warna penanda (highlight) pada teks.", shortcut: "" },
    "Ganti Font": { desc: "Pilih jenis aksara baru untuk teks dokumen Anda.", shortcut: "Ctrl+Shift+F" },
    "Ukuran Font": { desc: "Ubah besaran teks yang dipilih (misal: 11pt, 12pt).", shortcut: "" },
    "Perbesar Ukuran": { desc: "Buat ukuran teks sedikit lebih besar.", shortcut: "Ctrl+Shift+>" },
    "Perkecil Ukuran": { desc: "Buat ukuran teks sedikit lebih kecil.", shortcut: "Ctrl+Shift+<" },
    "Bersihkan Format": { desc: "Menghapus seluruh gaya format pada teks yang dipilih.", shortcut: "Ctrl+\\" },

    // === ALIGNMENT & LISTS ===
    "Rata Kiri": { desc: "Meratakan teks ke batas kiri dokumen.", shortcut: "Ctrl+L" },
    "Rata Tengah": { desc: "Menengahkan teks di lembar dokumen.", shortcut: "Ctrl+E" },
    "Rata Kanan": { desc: "Meratakan teks ke batas kanan dokumen.", shortcut: "Ctrl+R" },
    "Rata Kiri Kanan": { desc: "Meratakan teks di kedua sisi lembar dokumen secara penuh.", shortcut: "Ctrl+J" },
    "Daftar Berpoin": { desc: "Membuat daftar butir dengan simbol poin.", shortcut: "Ctrl+Shift+L" },
    "Daftar Bernomor": { desc: "Membuat daftar terurut dengan penomoran berurutan.", shortcut: "Ctrl+Shift+7" },
    "Kurangi Indentasi": { desc: "Menggeser paragraf lebih ke sisi kiri.", shortcut: "Ctrl+[" },
    "Tambah Indentasi": { desc: "Menggeser paragraf lebih ke sisi kanan.", shortcut: "Ctrl+]" },
    "Spasi Baris": { desc: "Atur jarak renggang antar baris dalam paragraf.", shortcut: "Ctrl+1 / 5 / 2" },
    "Spasi 1.0": { desc: "Atur jarak spasi baris tunggal (1.0).", shortcut: "Ctrl+1" },
    "Spasi 1.15": { desc: "Atur jarak spasi baris standar dokumen (1.15).", shortcut: "" },
    "Spasi 1.5": { desc: "Atur jarak spasi baris satu setengah (1.5).", shortcut: "Ctrl+5" },
    "Spasi 2.0": { desc: "Atur jarak spasi baris ganda (2.0).", shortcut: "Ctrl+2" },

    // === HEADINGS & STYLES ===
    "Gaya Teks": { desc: "Terapkan tingkatan judul dokumen atau format teks normal.", shortcut: "Ctrl+Alt+1/2/3/0" },

    // === INSERT (SISIPKAN) ===
    "Sisipkan Gambar Secara Luring (Offline)": { desc: "Tambahkan gambar dari komputer Anda ke dalam dokumen.", shortcut: "Ctrl+Shift+I" },
    "Sisipkan Tautan (Link)": { desc: "Tambahkan tautan web agar teks dapat diklik.", shortcut: "Ctrl+K" },
    "Kutipan Blok": { desc: "Format teks menjorok sebagai kutipan panjang.", shortcut: "" },
    "Tabel": { desc: "Sisipkan tabel baris dan kolom ke dalam lembar dokumen.", shortcut: "Ctrl+Shift+T" },
    "Halaman (Page)": { desc: "Sisipkan pemisah halaman, pemisah bagian, atau kelola nomor halaman.", shortcut: "Ctrl+Enter" },
    "Halaman Baru": { desc: "Memulai halaman baru dari posisi kursor saat ini.", shortcut: "Ctrl+Enter" },
    "Pemisah Bagian": { desc: "Menambahkan bagian dokumen baru dengan penomoran independen.", shortcut: "Ctrl+Shift+Enter" },
    "Pengaturan Nomor Halaman": { desc: "Atur format penomoran, letak posisi, dan halaman awal.", shortcut: "" },
    "Karakter Spesial": { desc: "Sisipkan simbol matematika, mata uang, dan karakter khusus.", shortcut: "" },
    "Tanggal Hari Ini": { desc: "Sisipkan tanggal hari ini secara otomatis sesuai bahasa aktif.", shortcut: "Alt+Shift+D" },

    // === LAYOUT & TOOLS ===
    "Pengaturan Halaman": { desc: "Atur ukuran kertas (A4, F4, Letter), orientasi, dan margin dokumen.", shortcut: "Ctrl+Shift+P" },
    "Pengaturan Halaman...": { desc: "Atur ukuran kertas (A4, F4, Letter), orientasi, dan margin dokumen.", shortcut: "Ctrl+Shift+P" },
    "Cari Kata": { desc: "Temukan teks spesifik atau ganti kata di dalam dokumen.", shortcut: "Ctrl+F" },
    "Statistik Dokumen": { desc: "Lihat rincian jumlah kata, karakter, paragraf, dan waktu baca.", shortcut: "" },

    // === MENU BAR & LIFECYCLE ===
    "Beranda": { desc: "Kembali ke layar utama untuk melihat daftar dokumen terakhir.", shortcut: "Esc" },
    "Baru...": { desc: "Mulai membuat lembar dokumen baru.", shortcut: "Ctrl+N" },
    "Buka...": { desc: "Buka berkas dokumen (.baku) dari penyimpanan komputer.", shortcut: "Ctrl+O" },
    "Simpan": { desc: "Simpan isi dokumen saat ini ke berkas .baku.", shortcut: "Ctrl+S" },
    "Simpan Sebagai...": { desc: "Simpan dokumen dengan nama berkas atau lokasi baru.", shortcut: "Ctrl+Shift+S" },
    "Cetak...": { desc: "Cetak dokumen secara langsung ke printer fisik Anda.", shortcut: "Ctrl+P" },
    "Ekspor ke PDF...": { desc: "Ekspor dokumen ke format PDF sesuai tampilan layar (WYSIWYG).", shortcut: "Ctrl+Shift+E" },
    "Keluar": { desc: "Tutup aplikasi Baku PDF Editor.", shortcut: "Alt+F4" },
    "Urungkan": { desc: "Batalkan perubahan terakhir yang dilakukan pada dokumen.", shortcut: "Ctrl+Z" },
    "Ulangi": { desc: "Terapkan kembali perubahan yang sebelumnya dibatalkan.", shortcut: "Ctrl+Y" },
    "Potong": { desc: "Potong teks atau elemen yang dipilih ke papan klip.", shortcut: "Ctrl+X" },
    "Salin": { desc: "Salin teks atau elemen yang dipilih ke papan klip.", shortcut: "Ctrl+C" },
    "Tempel": { desc: "Tempelkan teks atau elemen dari papan klip ke dokumen.", shortcut: "Ctrl+V" },
    "Tentang Baku PDF": { desc: "Tampilkan informasi versi dan pengembang Baku PDF.", shortcut: "F1" },

    // === SIDEBAR ===
    "Baku PDF": { desc: "Klik untuk menyembunyikan atau menampilkan panel menu samping.", shortcut: "" },
    "Templat": { desc: "Gunakan desain siap pakai untuk skripsi, laporan, dan surat. (Segera Hadir)", shortcut: "" },
    "Alat Ekstra": { desc: "Kumpulan alat manipulasi dan konversi PDF mandiri. (Segera Hadir)", shortcut: "" },
    "Pengaturan": { desc: "Atur direktori kerja, bahasa antarmuka, dan perilaku sistem.", shortcut: "" },

    // === STATUS BAR ===
    "Pergi ke halaman...": { desc: "Lompat langsung ke halaman dokumen yang diinginkan.", shortcut: "" },
    "Statistik Kata": { desc: "Lihat statistik jumlah kata, karakter, dan halaman dokumen.", shortcut: "" },
    "Bahasa Antarmuka": { desc: "Ganti bahasa antarmuka antara Bahasa Indonesia dan English.", shortcut: "" },
    "Perkecil": { desc: "Perkecil tampilan lembar kerja dokumen.", shortcut: "Ctrl+-" },
    "Tingkat Pembesaran": { desc: "Atur ulang skala pembesaran tampilan lembar kerja ke 100%.", shortcut: "Ctrl+0" },
    "Perbesar": { desc: "Perbesar tampilan lembar kerja dokumen.", shortcut: "Ctrl++" },

    // === HEADER & FOOTER ===
    "Rata Kiri Header/Footer": { desc: "Ratakan teks header atau footer ke sisi kiri margin.", shortcut: "" },
    "Rata Tengah Header/Footer": { desc: "Tempatkan teks header atau footer di tengah margin.", shortcut: "" },
    "Rata Kanan Header/Footer": { desc: "Ratakan teks header atau footer ke sisi kanan margin.", shortcut: "" },
    "Tutup Header/Footer": { desc: "Keluar dari mode penyuntingan header dan footer.", shortcut: "Esc" },
    "Berbeda di Halaman Pertama": { desc: "Kosongkan atau buat teks header/footer berbeda di halaman awal.", shortcut: "" },

    // === TABLE CONTEXT MENU ===
    "Alat Tabel": { desc: "Buka menu kelola baris, kolom, dan struktur tabel.", shortcut: "" },
    "Tambah Baris Atas": { desc: "Sisipkan baris baru di atas baris yang aktif.", shortcut: "" },
    "Tambah Baris Bawah": { desc: "Sisipkan baris baru di bawah baris yang aktif.", shortcut: "" },
    "Tambah Kolom Kiri": { desc: "Sisipkan kolom baru di sebelah kiri kolom yang aktif.", shortcut: "" },
    "Tambah Kolom Kanan": { desc: "Sisipkan kolom baru di sebelah kanan kolom yang aktif.", shortcut: "" },
    "Hapus Baris": { desc: "Hapus baris tabel yang saat ini dipilih.", shortcut: "" },
    "Hapus Kolom": { desc: "Hapus kolom tabel yang saat ini dipilih.", shortcut: "" },

    // === IMAGE RESIZER & CONTEXT MENU ===
    "Alat Gambar": { desc: "Buka menu tata letak, perataan, dan posisi gambar.", shortcut: "" },
    "Sejalan Teks (Inline)": { desc: "Gambar mengalir di dalam baris teks layaknya huruf besar.", shortcut: "" },
    "Rata Tengah Gambar": { desc: "Tempatkan gambar persis di tengah halaman.", shortcut: "" },
    "Teks Mengelilingi Kiri": { desc: "Gambar berada di kiri dan teks mengalir di sebelah kanannya.", shortcut: "" },
    "Teks Mengelilingi Kanan": { desc: "Gambar berada di kanan dan teks mengalir di sebelah kirinya.", shortcut: "" },
    "Melayang Bebas": { desc: "Gambar mengambang bebas di atas dokumen dan dapat digeser ke mana saja.", shortcut: "" },
    "Hapus Gambar": { desc: "Hapus gambar terpilih dari dokumen.", shortcut: "Del" },

    // === TAMBAHAN RIBBON BARU ===
    "Ganti Kata": { desc: "Temukan teks dan ganti dengan kata baru di dalam dokumen.", shortcut: "Ctrl+H" },
    "Orientasi": { desc: "Ubah orientasi kertas antara Potret dan Lanskap.", shortcut: "" },
    "Blok Kode": { desc: "Format teks dalam kotak blok kode pemrograman.", shortcut: "" },
    "Simbol": { desc: "Sisipkan simbol matematika, mata uang, dan karakter khusus.", shortcut: "" },
    "Tanggal": { desc: "Sisipkan tanggal hari ini secara otomatis sesuai bahasa aktif.", shortcut: "Alt+Shift+D" },
    "Halaman": { desc: "Sisipkan pemisah halaman, pemisah bagian, atau kelola nomor halaman.", shortcut: "Ctrl+Enter" },
    "Gambar": { desc: "Tambahkan gambar dari komputer Anda ke dalam dokumen.", shortcut: "Ctrl+Shift+I" },
    "Kutipan": { desc: "Format teks menjorok sebagai kutipan panjang.", shortcut: "" },
    "Kode": { desc: "Format teks dalam kotak blok kode pemrograman.", shortcut: "" },
    "Indens": { desc: "Atur jarak indentasi paragraf ke kiri atau kanan.", shortcut: "" },
    "Ubah Kapitalisasi": { desc: "Ubah kapitalisasi teks yang dipilih (huruf besar di awal, huruf kecil, HURUF BESAR).", shortcut: "Shift+F3" },
    "Tampilkan Tanda Paragraf": { desc: "Tampilkan atau sembunyikan tanda paragraf dan simbol format tersembunyi lainnya.", shortcut: "Ctrl+Shift+8" },
    "Kembalikan Zoom 100%": { desc: "Atur ulang skala pembesaran tampilan lembar kerja ke 100%.", shortcut: "Ctrl+0" },
    "Gambar...": { desc: "Tambahkan gambar dari komputer Anda ke dalam dokumen.", shortcut: "Ctrl+Shift+I" },
    "Tabel...": { desc: "Sisipkan tabel baris dan kolom ke dalam lembar dokumen.", shortcut: "Ctrl+Shift+T" },
    "Tautan...": { desc: "Tambahkan tautan web agar teks dapat diklik.", shortcut: "Ctrl+K" }
};

// Dictionary untuk Tooltip saat mode English
const TOOLTIP_EN = {
    // Formatting & Typography
    "Menebalkan teks yang dipilih.": "Make the selected text bold.",
    "Memiringkan teks yang dipilih.": "Italicize the selected text.",
    "Memberi garis bawah pada teks.": "Underline the selected text.",
    "Memberi coretan pada teks.": "Strike through the selected text.",
    "Menulis huruf kecil di bawah garis teks (misal: H₂O).": "Type small letters below the line of text (e.g. H₂O).",
    "Menulis huruf kecil di atas garis teks (misal: X²).": "Type small letters above the line of text (e.g. X²).",
    "Menyalin gaya sebuah teks dan menerapkannya ke teks lain.": "Copy formatting from text and apply it elsewhere.",
    "Mengubah seluruh teks yang dipilih menjadi huruf kapital.": "Change all selected text to uppercase letters.",
    "Mengubah seluruh teks yang dipilih menjadi huruf kecil.": "Change all selected text to lowercase letters.",
    "Mengubah warna huruf teks yang dipilih.": "Change font color of the selected text.",
    "Memberi warna penanda (highlight) pada teks.": "Highlight the selected text.",
    "Pilih jenis aksara baru untuk teks dokumen Anda.": "Choose a new font for your document text.",
    "Ubah besaran teks yang dipilih (misal: 11pt, 12pt).": "Change the size of the selected text (e.g. 11pt, 12pt).",
    "Buat ukuran teks sedikit lebih besar.": "Make text slightly bigger.",
    "Buat ukuran teks sedikit lebih kecil.": "Make text slightly smaller.",
    "Menghapus seluruh gaya format pada teks yang dipilih.": "Clear all formatting from the selected text.",

    // Alignment & Lists
    "Meratakan teks ke batas kiri dokumen.": "Align text to the left margin.",
    "Menengahkan teks di lembar dokumen.": "Center text on the document page.",
    "Meratakan teks ke batas kanan dokumen.": "Align text to the right margin.",
    "Meratakan teks di kedua sisi lembar dokumen secara penuh.": "Justify text evenly between the margins.",
    "Membuat daftar butir dengan simbol poin.": "Create a bulleted list.",
    "Membuat daftar terurut dengan penomoran berurutan.": "Create a numbered list.",
    "Menggeser paragraf lebih ke sisi kiri.": "Decrease paragraph indent.",
    "Menggeser paragraf lebih ke sisi kanan.": "Increase paragraph indent.",
    "Atur jarak renggang antar baris dalam paragraf.": "Adjust line spacing in the paragraph.",
    "Atur jarak spasi baris tunggal (1.0).": "Set single line spacing (1.0).",
    "Atur jarak spasi baris standar dokumen (1.15).": "Set standard document line spacing (1.15).",
    "Atur jarak spasi baris satu setengah (1.5).": "Set 1.5 line spacing.",
    "Atur jarak spasi baris ganda (2.0).": "Set double line spacing (2.0).",

    // Headings & Styles
    "Terapkan tingkatan judul dokumen atau format teks normal.": "Apply document heading level or normal body text.",

    // Insert
    "Tambahkan gambar dari komputer Anda ke dalam dokumen.": "Insert an image from your computer into the document.",
    "Tambahkan tautan web agar teks dapat diklik.": "Add a web link to make text clickable.",
    "Format teks menjorok sebagai kutipan panjang.": "Format text as an indented block quote.",
    "Sisipkan tabel baris dan kolom ke dalam lembar dokumen.": "Insert a table with rows and columns into the page.",
    "Sisipkan pemisah halaman, pemisah bagian, atau kelola nomor halaman.": "Insert page breaks, section breaks, or manage page numbers.",
    "Memulai halaman baru dari posisi kursor saat ini.": "Start a new page from the current cursor position.",
    "Menambahkan bagian dokumen baru dengan penomoran independen.": "Add a new document section with independent numbering.",
    "Atur format penomoran, letak posisi, dan halaman awal.": "Configure page numbering format, alignment, and starting number.",
    "Sisipkan simbol matematika, mata uang, dan karakter khusus.": "Insert mathematical symbols, currencies, and special characters.",
    "Sisipkan tanggal hari ini secara otomatis sesuai bahasa aktif.": "Insert today's date automatically in the active language.",

    // Layout & Tools
    "Atur ukuran kertas (A4, F4, Letter), orientasi, dan margin dokumen.": "Set paper size (A4, F4, Letter), orientation, and margins.",
    "Temukan teks spesifik atau ganti kata di dalam dokumen.": "Find specific text or replace words in the document.",

    // Menu Bar & Lifecycle
    "Kembali ke layar utama untuk melihat daftar dokumen terakhir.": "Return to the home screen to view recent documents.",
    "Mulai membuat lembar dokumen baru.": "Start drafting a new document.",
    "Buka berkas dokumen (.baku) dari penyimpanan komputer.": "Open a Baku document file (.baku) from computer storage.",
    "Simpan isi dokumen saat ini ke berkas .baku.": "Save current document contents to a .baku file.",
    "Cetak dokumen secara langsung ke printer fisik Anda.": "Print document directly to your physical printer.",
    "Lihat rincian jumlah kata, karakter, paragraf, dan waktu baca.": "View details of words, characters, paragraphs, and reading time.",
    "Ekspor dokumen ke format PDF sesuai tampilan layar (WYSIWYG).": "Export document to PDF matching screen layout (WYSIWYG).",
    "Tutup aplikasi Baku PDF Editor.": "Close Baku PDF Editor application.",
    "Batalkan perubahan terakhir yang dilakukan pada dokumen.": "Undo the most recent change in the document.",
    "Terapkan kembali perubahan yang sebelumnya dibatalkan.": "Redo the previously undone change.",
    "Potong teks atau elemen yang dipilih ke papan klip.": "Cut selected text or element to clipboard.",
    "Salin teks atau elemen yang dipilih ke papan klip.": "Copy selected text or element to clipboard.",
    "Tempelkan teks atau elemen dari papan klip ke dokumen.": "Paste text or element from clipboard into document.",
    "Tampilkan informasi versi dan pengembang Baku PDF.": "View version information and Baku PDF developers.",

    // Sidebar
    "Klik untuk menyembunyikan atau menampilkan panel menu samping.": "Click to toggle sidebar navigation panel.",
    "Gunakan desain siap pakai untuk skripsi, laporan, dan surat. (Segera Hadir)": "Use ready-made designs for theses, reports, and letters. (Coming Soon)",
    "Kumpulan alat manipulasi dan konversi PDF mandiri. (Segera Hadir)": "Collection of standalone PDF tools and utilities. (Coming Soon)",
    "Atur direktori kerja, bahasa antarmuka, dan perilaku sistem.": "Configure workspace folder, language, and system behavior.",

    // Status Bar
    "Lompat langsung ke halaman dokumen yang diinginkan.": "Jump directly to the desired document page.",
    "Lihat statistik jumlah kata, karakter, dan halaman dokumen.": "View statistics for words, characters, and pages in the document.",
    "Ganti bahasa antarmuka antara Bahasa Indonesia dan English.": "Switch interface language between Indonesian and English.",
    "Perkecil tampilan lembar kerja dokumen.": "Zoom out the document canvas.",
    "Atur ulang skala pembesaran tampilan lembar kerja ke 100%.": "Reset document canvas zoom scale to 100%.",
    "Perbesar tampilan lembar kerja dokumen.": "Zoom in the document canvas.",

    // Header & Footer
    "Ratakan teks header atau footer ke sisi kiri margin.": "Align header or footer text to the left margin.",
    "Tempatkan teks header atau footer di tengah margin.": "Center header or footer text between the margins.",
    "Ratakan teks header atau footer ke sisi kanan margin.": "Align header or footer text to the right margin.",
    "Keluar dari mode penyuntingan header dan footer.": "Exit header and footer editing mode.",
    "Kosongkan atau buat teks header/footer berbeda di halaman awal.": "Leave blank or set distinct header/footer on the first page.",

    // Table Context Menu
    "Buka menu kelola baris, kolom, dan struktur tabel.": "Open menu to manage rows, columns, and table layout.",
    "Sisipkan baris baru di atas baris yang aktif.": "Insert a new row above the active row.",
    "Sisipkan baris baru di bawah baris yang aktif.": "Insert a new row below the active row.",
    "Sisipkan kolom baru di sebelah kiri kolom yang aktif.": "Insert a new column to the left of the active column.",
    "Sisipkan kolom baru di sebelah kanan kolom yang aktif.": "Insert a new column to the right of the active column.",
    "Hapus baris tabel yang saat ini dipilih.": "Delete the currently selected table row.",
    "Hapus kolom tabel yang saat ini dipilih.": "Delete the currently selected table column.",

    // Image Resizer & Context Menu
    "Buka menu tata letak, perataan, dan posisi gambar.": "Open menu for image layout, alignment, and position.",
    "Gambar mengalir di dalam baris teks layaknya huruf besar.": "Image flows inline with text like a character.",
    "Tempatkan gambar persis di tengah halaman.": "Center the image horizontally on the page.",
    "Gambar berada di kiri dan teks mengalir di sebelah kanannya.": "Place image on the left with text flowing to its right.",
    "Gambar berada di kanan dan teks mengalir di sebelah kirinya.": "Place image on the right with text flowing to its left.",
    "Gambar mengambang bebas di atas dokumen dan dapat digeser ke mana saja.": "Image floats freely and can be dragged to any coordinate.",
    "Hapus gambar terpilih dari dokumen.": "Delete the selected image from the document.",
    "Temukan teks dan ganti dengan kata baru di dalam dokumen.": "Find text and replace with new words in the document.",
    "Ubah orientasi kertas antara Potret dan Lanskap.": "Change paper orientation between Portrait and Landscape.",
    "Format teks dalam kotak blok kode pemrograman.": "Format text in a programming code block.",
    "Atur jarak indentasi paragraf ke kiri atau kanan.": "Adjust paragraph indent to the left or right.",
    "Simpan dokumen dengan nama berkas atau lokasi baru.": "Save the document with a new file name or location.",
    "Ubah kapitalisasi teks yang dipilih (huruf besar di awal, huruf kecil, HURUF BESAR).": "Change capitalization of selected text (sentence case, lowercase, UPPERCASE).",
    "Tampilkan atau sembunyikan tanda paragraf dan simbol format tersembunyi lainnya.": "Show or hide paragraph marks and other hidden formatting symbols."
};

// Deteksi sistem operasi (macOS, Linux, Windows)
function getOperatingSystem() {
    if (typeof window !== 'undefined' && window.__BAKU_FORCE_OS) {
        return window.__BAKU_FORCE_OS;
    }
    if (typeof navigator === 'undefined') return 'windows';

    // 1. Cek navigator.userAgentData (browser modern)
    if (navigator.userAgentData && navigator.userAgentData.platform) {
        const p = navigator.userAgentData.platform.toLowerCase();
        if (p.includes('mac')) return 'macos';
        if (p.includes('linux')) return 'linux';
        if (p.includes('win')) return 'windows';
    }

    // 2. Cek navigator.platform dan navigator.userAgent (WebKit / Tauri / browser standar)
    const platform = (navigator.platform || '').toLowerCase();
    const ua = (navigator.userAgent || '').toLowerCase();

    if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os x')) {
        return 'macos';
    }
    if (platform.includes('linux') || ua.includes('linux') || ua.includes('x11')) {
        return 'linux';
    }
    if (platform.includes('win') || ua.includes('windows')) {
        return 'windows';
    }

    return 'windows';
}

const isMacPlatform = (getOperatingSystem() === 'macos');

function formatShortcutForOS(shortcut) {
    if (!shortcut) return '';
    const os = getOperatingSystem();

    if (os === 'macos') {
        if (shortcut === 'Alt+F4') return '⌘Q';
        if (shortcut === 'Ctrl+Y') return '⌘⇧Z';

        return shortcut
            .replace(/Ctrl\+Shift\+/g, '⌘⇧')
            .replace(/Ctrl\+Alt\+/g, '⌘⌥')
            .replace(/Ctrl\+/g, '⌘')
            .replace(/Alt\+Shift\+/g, '⌥⇧')
            .replace(/Alt\+/g, '⌥')
            .replace(/Shift\+/g, '⇧');
    }

    if (os === 'linux') {
        if (shortcut === 'Alt+F4') return 'Ctrl+Q';
        return shortcut;
    }

    // Windows (default)
    return shortcut;
}

function updateMenuBarShortcuts() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.menu-action .shortcut').forEach(el => {
        if (!el.hasAttribute('data-orig-shortcut')) {
            el.setAttribute('data-orig-shortcut', el.textContent.trim());
        }
        const orig = el.getAttribute('data-orig-shortcut');
        el.textContent = formatShortcutForOS(orig);
    });
}

window.getOperatingSystem = getOperatingSystem;
window.isMacPlatform = isMacPlatform;
window.formatShortcutForOS = formatShortcutForOS;
window.updateMenuBarShortcuts = updateMenuBarShortcuts;

document.addEventListener('DOMContentLoaded', () => {
    const tooltipBox = document.getElementById('rich-tooltip');
    if (!tooltipBox) return;

    const ttTitle = tooltipBox.querySelector('.tt-title');
    const ttShortcut = tooltipBox.querySelector('.tt-shortcut');
    const ttDesc = tooltipBox.querySelector('.tt-desc');

    let tooltipTimeout;

    // Pemetaan class bawaan Quill ke kunci judul di TOOLTIP_DB
    const QUILL_CLASS_MAP = {
        'ql-bold': 'Tebal',
        'ql-italic': 'Miring',
        'ql-underline': 'Garis Bawah',
        'ql-strike': 'Coret',
        'ql-script': 'Subskrip',
        'ql-color': 'Warna Teks',
        'ql-background': 'Warna Latar',
        'ql-align': 'Rata Kiri',
        'ql-list': 'Daftar Berpoin',
        'ql-indent': 'Tambah Indentasi',
        'ql-clean': 'Bersihkan Format',
        'ql-font': 'Ganti Font',
        'ql-size': 'Ukuran Font',
        'ql-header': 'Gaya Teks',
        'ql-lineheight': 'Spasi Baris',
        'ql-image': 'Sisipkan Gambar Secara Luring (Offline)',
        'ql-link': 'Sisipkan Tautan (Link)',
        'ql-blockquote': 'Kutipan Blok'
    };

    function showTooltip(el, textKey) {
        if (!textKey) return;
        const data = TOOLTIP_DB[textKey] || { desc: '', shortcut: '' };

        const lang = localStorage.getItem('baku_lang') || 'id';
        const displayTitle = (window.t ? window.t(textKey) : textKey) || textKey;

        let displayDesc = data.desc || '';
        if (lang === 'en' && displayDesc && TOOLTIP_EN[displayDesc]) {
            displayDesc = TOOLTIP_EN[displayDesc];
        }

        if (ttTitle) ttTitle.textContent = displayTitle;
        if (ttDesc) {
            ttDesc.textContent = displayDesc;
            ttDesc.style.display = displayDesc ? 'block' : 'none';
        }
        if (ttShortcut) {
            ttShortcut.textContent = data.shortcut ? `(${formatShortcutForOS(data.shortcut)})` : '';
            ttShortcut.style.display = data.shortcut ? 'inline' : 'none';
        }

        // Hitung posisi relatif terhadap viewport
        const rect = el.getBoundingClientRect();
        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - 130;

        // Cegah mentok tepi layar
        if (left < 10) left = 10;
        if (left + 260 > window.innerWidth) left = window.innerWidth - 270;
        if (top + 100 > window.innerHeight) top = rect.top - 100;

        tooltipBox.style.left = left + 'px';
        tooltipBox.style.top = top + 'px';
        tooltipBox.style.display = 'flex';
    }

    function hideTooltip() {
        if (tooltipBox) tooltipBox.style.display = 'none';
    }

    // Pasang Event Listener melalui event delegation pada body
    document.body.addEventListener('mouseover', (e) => {
        // Jangan munculkan tooltip jika berada di dalam input, textarea, atau dropdown menu yang sedang terbuka
        if (e.target.closest('input, textarea, select')) return;

        let target = e.target.closest('[title], [data-orig-title], button, .menu-item, .ql-picker, .ql-picker-label, .ribbon-btn, .ribbon-btn-compact');
        if (!target) return;

        // Jika mengenai ql-picker-label, naikkan target ke ql-picker induknya
        if (target.classList.contains('ql-picker-label') && target.parentElement && target.parentElement.classList.contains('ql-picker')) {
            target = target.parentElement;
        }

        let titleKey = target.getAttribute('data-orig-title') || target.getAttribute('title');

        // Hapus title bawaan browser agar tooltip ganda tidak muncul
        if (target.hasAttribute('title')) {
            if (!target.hasAttribute('data-orig-title')) {
                target.setAttribute('data-orig-title', target.getAttribute('title'));
            }
            target.removeAttribute('title');
        }

        // Jika titleKey belum ada, deteksi dari class Quill atau picker
        if (!titleKey) {
            for (let cls in QUILL_CLASS_MAP) {
                if (target.classList.contains(cls)) {
                    titleKey = QUILL_CLASS_MAP[cls];
                    // Penanganan khusus dropdown Align, List, Indent, Script
                    if (cls === 'ql-align' && target.value === 'center') titleKey = 'Rata Tengah';
                    else if (cls === 'ql-align' && target.value === 'right') titleKey = 'Rata Kanan';
                    else if (cls === 'ql-align' && target.value === 'justify') titleKey = 'Rata Kiri Kanan';

                    if (cls === 'ql-list' && target.value === 'ordered') titleKey = 'Daftar Bernomor';
                    if (cls === 'ql-indent' && target.value === '-1') titleKey = 'Kurangi Indentasi';
                    if (cls === 'ql-script' && target.value === 'super') titleKey = 'Superskrip';
                    break;
                }
            }
        }

        if (titleKey) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(() => {
                showTooltip(target, titleKey);
            }, 3000);
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        let target = e.target.closest('[data-orig-title], [title], button, .menu-item, .ql-picker, .ribbon-btn, .ribbon-btn-compact');
        if (target) {
            clearTimeout(tooltipTimeout);
            hideTooltip();
        }
    });

    // Perbarui teks shortcut pada Dropdown Menu Bar agar sesuai OS (⌘ pada macOS, Ctrl+Q pada Linux, Alt+F4 pada Windows)
    updateMenuBarShortcuts();
});
