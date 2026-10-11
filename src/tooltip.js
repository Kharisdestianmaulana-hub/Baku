const TOOLTIP_DB = {
    // Toolbar Formatting
    "Tebal": { desc: "Menebalkan teks yang dipilih.", shortcut: "Ctrl+B" },
    "Miring": { desc: "Memiringkan teks yang dipilih.", shortcut: "Ctrl+I" },
    "Garis Bawah": { desc: "Memberi garis bawah pada teks.", shortcut: "Ctrl+U" },
    "Coret": { desc: "Memberi coretan pada teks.", shortcut: "Ctrl+Shift+X" },
    "Subskrip": { desc: "Menulis huruf kecil di bawah garis teks (misal: H₂O).", shortcut: "Ctrl+=" },
    "Superskrip": { desc: "Menulis huruf kecil di atas garis teks (misal: X²).", shortcut: "Ctrl+Shift++" },
    "Kuas Format": { desc: "Menyalin gaya sebuah teks dan menerapkannya ke teks lain.", shortcut: "" },
    "HURUF BESAR": { desc: "Mengubah seluruh teks yang dipilih menjadi huruf kapital.", shortcut: "" },
    "huruf kecil": { desc: "Mengubah seluruh teks yang dipilih menjadi huruf kecil.", shortcut: "" },
    "Warna Teks": { desc: "Mengubah warna huruf.", shortcut: "" },
    "Warna Latar": { desc: "Memberi warna penanda (highlight) pada teks.", shortcut: "" },
    
    // Toolbar Alignment
    "Rata Kiri": { desc: "Meratakan teks ke sisi kiri dokumen.", shortcut: "Ctrl+L" },
    "Rata Tengah": { desc: "Menengahkan teks di dokumen.", shortcut: "Ctrl+E" },
    "Rata Kanan": { desc: "Meratakan teks ke sisi kanan dokumen.", shortcut: "Ctrl+R" },
    "Rata Kiri Kanan": { desc: "Meratakan teks di kedua sisi secara penuh.", shortcut: "Ctrl+J" },
    
    // Toolbar Lists & Indents
    "Daftar Berpoin": { desc: "Membuat daftar dengan simbol poin.", shortcut: "Ctrl+Shift+8" },
    "Daftar Bernomor": { desc: "Membuat daftar dengan penomoran berurutan.", shortcut: "Ctrl+Shift+7" },
    "Kurangi Indentasi": { desc: "Menggeser paragraf lebih ke kiri.", shortcut: "Ctrl+[" },
    "Tambah Indentasi": { desc: "Menggeser paragraf lebih ke kanan.", shortcut: "Ctrl+]" },
    "Bersihkan Format": { desc: "Menghapus seluruh gaya format pada teks yang dipilih.", shortcut: "Ctrl+\\" },
    
    // Ribbon custom buttons
    "Ganti Font": { desc: "Pilih jenis aksara baru untuk teks Anda.", shortcut: "Ctrl+Shift+F" },
    "Ukuran Font": { desc: "Ubah besaran teks yang dipilih.", shortcut: "Ctrl+Shift+P" },
    "Perbesar Ukuran": { desc: "Buat teks sedikit lebih besar.", shortcut: "Ctrl+]" },
    "Perkecil Ukuran": { desc: "Buat teks sedikit lebih kecil.", shortcut: "Ctrl+[" },
    "Sisipkan Gambar Secara Luring (Offline)": { desc: "Tambahkan gambar dari komputer Anda ke dalam dokumen.", shortcut: "" },
    "Sisipkan Tautan (Link)": { desc: "Tambahkan tautan web agar teks bisa diklik.", shortcut: "Ctrl+K" },
    "Kutipan Blok": { desc: "Buat teks menonjol sebagai kutipan panjang.", shortcut: "" },
    "Spasi Baris": { desc: "Atur jarak antar baris dalam paragraf.", shortcut: "" },
    
    // Ribbon large buttons
    "Pengaturan\nHalaman": { desc: "Atur ukuran kertas dan margin.", shortcut: "" },
    "Cari\nKata": { desc: "Temukan teks spesifik dalam dokumen.", shortcut: "Ctrl+F" },
    
    // Sidebar
    "Beranda": { desc: "Kembali ke layar utama untuk melihat daftar dokumen terakhir.", shortcut: "Esc" },
    "Templat": { desc: "Gunakan desain siap pakai. (Segera Hadir)", shortcut: "" },
    "Alat Ekstra": { desc: "Kumpulan alat manipulasi PDF. (Segera Hadir)", shortcut: "" },
    "Pengaturan": { desc: "Atur sistem, gaya bahasa, dan perilaku aplikasi.", shortcut: "" },

    // Image Resizer
    "Sejalan Teks": { desc: "Gambar sejajar dengan alur teks layaknya sebuah huruf besar.", shortcut: "" },
    "Rata Tengah": { desc: "Menempatkan gambar persis di tengah baris teks.", shortcut: "" },
    "Teks Mengelilingi Kiri": { desc: "Gambar diletakkan di kiri, teks mengalir di sebelah kanannya.", shortcut: "" },
    "Teks Mengelilingi Kanan": { desc: "Gambar diletakkan di kanan, teks mengalir di sebelah kirinya.", shortcut: "" },
    "Melayang Bebas (Bisa Di-Drag)": { desc: "Gambar mengambang di atas teks dan bisa digeser ke mana saja.", shortcut: "" }
};

// Dictionary untuk Tooltip saat mode English
const TOOLTIP_EN = {
    "Menebalkan teks yang dipilih.": "Make the selected text bold.",
    "Memiringkan teks yang dipilih.": "Italicize the selected text.",
    "Memberi garis bawah pada teks.": "Underline the selected text.",
    "Memberi coretan pada teks.": "Strike through the selected text.",
    "Menulis huruf kecil di bawah garis teks (misal: H₂O).": "Type very small letters just below the line of text (e.g. H₂O).",
    "Menulis huruf kecil di atas garis teks (misal: X²).": "Type very small letters just above the line of text (e.g. X²).",
    "Menyalin gaya sebuah teks dan menerapkannya ke teks lain.": "Copy the formatting of a text and apply it elsewhere.",
    "Mengubah seluruh teks yang dipilih menjadi huruf kapital.": "Change all selected text to uppercase letters.",
    "Mengubah seluruh teks yang dipilih menjadi huruf kecil.": "Change all selected text to lowercase letters.",
    "Mengubah warna huruf.": "Change text color.",
    "Memberi warna penanda (highlight) pada teks.": "Highlight text.",
    "Meratakan teks ke sisi kiri dokumen.": "Align text to the left.",
    "Menengahkan teks di dokumen.": "Center text.",
    "Meratakan teks ke sisi kanan dokumen.": "Align text to the right.",
    "Meratakan teks di kedua sisi secara penuh.": "Justify text.",
    "Membuat daftar dengan simbol poin.": "Create a bulleted list.",
    "Membuat daftar dengan penomoran berurutan.": "Create a numbered list.",
    "Menggeser paragraf lebih ke kiri.": "Decrease paragraph indent.",
    "Menggeser paragraf lebih ke kanan.": "Increase paragraph indent.",
    "Menghapus seluruh gaya format pada teks yang dipilih.": "Remove all formatting from the selected text.",
    "Pilih jenis aksara baru untuk teks Anda.": "Choose a new font for your text.",
    "Ubah besaran teks yang dipilih.": "Change the size of selected text.",
    "Buat teks sedikit lebih besar.": "Make text slightly bigger.",
    "Buat teks sedikit lebih kecil.": "Make text slightly smaller.",
    "Tambahkan gambar dari komputer Anda ke dalam dokumen.": "Insert an image from your computer into the document.",
    "Tambahkan tautan web agar teks bisa diklik.": "Add a web link to make text clickable.",
    "Buat teks menonjol sebagai kutipan panjang.": "Make text stand out as a block quote.",
    "Atur jarak antar baris dalam paragraf.": "Adjust line spacing in the paragraph.",
    "Atur ukuran kertas dan margin.": "Set paper size and margins.",
    "Temukan teks spesifik dalam dokumen.": "Find specific text in the document.",
    "Kembali ke layar utama untuk melihat daftar dokumen terakhir.": "Return to home screen to view recent documents.",
    "Gunakan desain siap pakai. (Segera Hadir)": "Use ready-made designs. (Coming Soon)",
    "Kumpulan alat manipulasi PDF. (Segera Hadir)": "Collection of PDF manipulation tools. (Coming Soon)",
    "Atur sistem, gaya bahasa, dan perilaku aplikasi.": "Configure system, language, and application behavior.",
    "Gambar sejajar dengan alur teks layaknya sebuah huruf besar.": "Image aligns with the text flow like a large letter.",
    "Menempatkan gambar persis di tengah baris teks.": "Place the image exactly in the center of the text line.",
    "Gambar diletakkan di kiri, teks mengalir di sebelah kanannya.": "Image is placed on the left, text flows to its right.",
    "Gambar diletakkan di kanan, teks mengalir di sebelah kirinya.": "Image is placed on the right, text flows to its left.",
    "Gambar mengambang di atas teks dan bisa digeser ke mana saja.": "Image floats above the text and can be dragged anywhere."
};

document.addEventListener('DOMContentLoaded', () => {
    const tooltipBox = document.getElementById('rich-tooltip');
    const ttTitle = tooltipBox.querySelector('.tt-title');
    const ttShortcut = tooltipBox.querySelector('.tt-shortcut');
    const ttDesc = tooltipBox.querySelector('.tt-desc');

    let tooltipTimeout;

    // Saat Quill dimuat, dia menghasilkan tombol standar dengan atribut class `.ql-bold`, dll tanpa title yang bagus.
    // Untungnya, Quill biasanya menanamkan class, tapi karena UI bahasa Indonesia, kita harus map class Quill ke nama Indonesia.
    const QUILL_CLASS_MAP = {
        'ql-bold': 'Tebal',
        'ql-italic': 'Miring',
        'ql-underline': 'Garis Bawah',
        'ql-strike': 'Coret',
        'ql-script': 'Subskrip', // Default, later split
        'ql-color': 'Warna Teks',
        'ql-background': 'Warna Latar',
        'ql-align': 'Rata Kiri', // Default
        'ql-list': 'Daftar Berpoin',
        'ql-indent': 'Tambah Indentasi',
        'ql-clean': 'Bersihkan Format'
    };

    function showTooltip(el, textKey) {
        if (!textKey) return;
        const data = TOOLTIP_DB[textKey];
        if (!data) return;

        let lang = localStorage.getItem('baku_lang') || 'id';
        
        let displayTitle = window.t ? window.t(textKey) : textKey;
        
        let displayDesc = data.desc;
        if (lang === 'en' && TOOLTIP_EN[displayDesc]) {
            displayDesc = TOOLTIP_EN[displayDesc];
        }

        ttTitle.textContent = displayTitle;
        ttDesc.textContent = displayDesc;
        ttShortcut.textContent = data.shortcut ? `(${data.shortcut})` : '';

        // Hitung posisi
        const rect = el.getBoundingClientRect();
        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - 130; // 130 = max-width/2
        
        // Cek mentok tepi layar
        if (left < 10) left = 10;
        if (left + 260 > window.innerWidth) left = window.innerWidth - 270;
        if (top + 100 > window.innerHeight) top = rect.top - 100;

        tooltipBox.style.left = left + 'px';
        tooltipBox.style.top = top + 'px';
        tooltipBox.style.display = 'flex';
    }

    function hideTooltip() {
        tooltipBox.style.display = 'none';
    }

    // Pasang Event Listener pakai event delegation di body untuk menangkap elemen dinamis
    document.body.addEventListener('mouseover', (e) => {
        let target = e.target.closest('[title], [data-orig-title], button, .menu-item');
        if (!target) return;

        let titleKey = target.getAttribute('data-orig-title') || target.getAttribute('title');
        
        // Hapus title bawaan browser agar tidak muncul ganda
        if (target.hasAttribute('title')) {
            if (!target.hasAttribute('data-orig-title')) {
                target.setAttribute('data-orig-title', target.getAttribute('title'));
            }
            target.removeAttribute('title');
        }

        // Kalau titleKey kosong, coba deteksi dari class Quill
        if (!titleKey) {
            for (let cls in QUILL_CLASS_MAP) {
                if (target.classList.contains(cls)) {
                    titleKey = QUILL_CLASS_MAP[cls];
                    // Penanganan khusus dropdown Rata Kiri/Tengah/Kanan dan List
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
            }, 400); // Delay 400ms layaknya Office
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        let target = e.target.closest('[data-orig-title], button, .menu-item');
        if (target) {
            clearTimeout(tooltipTimeout);
            hideTooltip();
        }
    });
});
