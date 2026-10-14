// State & Elements
const viewHome = document.getElementById('view-home');
const viewEditor = document.getElementById('view-editor');
const sidebar = document.getElementById('sidebar');
const modal = document.getElementById('modal-overlay');

const btnNewDoc = document.getElementById('btn-new-doc');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnCreateModal = document.getElementById('btn-create-modal');
const inputDocName = document.getElementById('input-doc-name');

let currentDocName = 'Dokumen_Baru';
let currentFilePath = null;
let isDirty = false;
let closeAfterSave = false;
let isClosing = false;
let pendingHomeNav = false;
let homeAfterSave = false;
let currentZoom = 1.0;
const RECENT_DOCS_KEY = 'baku_recent_docs';

// Deteksi platform macOS untuk styling & penyesuaian native menu bar
const isMac = (typeof window.isMacPlatform !== 'undefined' ? window.isMacPlatform : (typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent)));
if (isMac) {
    if (document.body) {
        document.body.classList.add('is-mac');
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('is-mac'));
    }
}

// Inisialisasi Skala Tampilan Aplikasi (App Zoom Level)
function applyAppZoom(zoomVal) {
    const zoom = parseFloat(zoomVal) || 1.0;
    if (document.body) {
        document.body.style.zoom = zoom;
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.zoom = zoom;
        });
    }
    localStorage.setItem('baku_app_zoom', zoom.toString());
}
const savedAppZoom = localStorage.getItem('baku_app_zoom') || '1.0';
applyAppZoom(savedAppZoom);

function updateWindowTitle() {
    if (window.__TAURI__) {
        let title = "Baku PDF Editor";
        if (viewEditor && viewEditor.classList.contains('active')) {
            const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
            let doc;
            if (currentFilePath) {
                doc = currentDocName || extractDocNameFromPath(currentFilePath);
            } else {
                doc = isEn ? "Untitled" : "Dokumen Baru";
            }
            title += " - " + doc + (isDirty ? " *" : "");
        }
        window.__TAURI__.window.appWindow.setTitle(title).catch(e => console.error(e));
    }
}

function setDirty(state) {
    isDirty = state;
    updateWindowTitle();
}


// Mendaftarkan Format Spasi Paragraf (Line Height)
try {
    const Parchment = Quill.import('parchment');
    const AlignStyle = Quill.import('attributors/style/align');
    const StyleClass = Parchment.StyleAttributor || (AlignStyle ? AlignStyle.constructor : null) || (Parchment.Attributor && Parchment.Attributor.Style);
    if (StyleClass) {
        const LineHeightStyle = new StyleClass('lineheight', 'line-height', {
            scope: Parchment.Scope.BLOCK,
            whitelist: ['1', '1.15', '1.5', '2']
        });
        Quill.register(LineHeightStyle, true);
    }
} catch (err) {
    console.warn("Gagal mendaftarkan Line Height:", err);
}

// Mendaftarkan Format Preset Gaya Blok (Title, Subtitle, Intense Quote)
let TextStylePreset;
try {
    const Parchment = Quill.import('parchment');
    const AlignClass = Quill.import('attributors/class/align');
    const ClassConstructor = Parchment.ClassAttributor || (AlignClass ? AlignClass.constructor : null) || (Parchment.Attributor && Parchment.Attributor.Class);
    if (ClassConstructor) {
        TextStylePreset = new ClassConstructor('stylepreset', 'ql-style', {
            scope: Parchment.Scope.BLOCK,
            whitelist: ['title', 'subtitle', 'intense-quote']
        });
        Quill.register(TextStylePreset, true);
    }
} catch (err) {
    console.warn("Gagal mendaftarkan Style Preset:", err);
}

// --- DAFTAR FONT LINTAS PLATFORM (WINDOWS & MAC) ---
const fontList = [
    'Times New Roman',
    'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Candara', 
    'Comic Sans MS', 'Consolas', 'Courier New', 'Franklin Gothic Medium',
    'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
    'Palatino Linotype', 'San Francisco', 'Segoe UI', 'Sylfaen', 'Tahoma',
    'Trebuchet MS', 'Verdana'
];

// Mendaftarkan Format Font (Inline Style) agar bisa menerima semua font di atas
const FontStyle = Quill.import('attributors/style/font');
FontStyle.whitelist = fontList;
Quill.register(FontStyle, true);

// Populasikan HTML Dropdown Font sebelum Quill diinisialisasi
const fontSelect = document.querySelector('.ql-font');
if (fontSelect) {
    fontSelect.innerHTML = '';
    fontList.forEach((font, idx) => {
        const opt = document.createElement('option');
        opt.value = font;
        opt.textContent = font;
        if (idx === 0) {
            opt.selected = true;
        }
        fontSelect.appendChild(opt);
    });
}

// --- CUSTOM BLOT UNTUK PAGE BREAK ---
const BlockEmbed = Quill.import('blots/block/embed');
class PageBreakBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('contenteditable', 'false');
        const h = typeof value === 'object' ? value.height : value;
        node.style.height = h + 'px';
        node.style.width = '100%';
        node.style.display = 'block';
        node.style.background = 'transparent';
        node.style.userSelect = 'none';
        node.style.cursor = 'text';
        node.classList.add('page-break-element');
        if (typeof value === 'object' && value.auto) {
            node.setAttribute('data-auto', 'true');
        }
        node.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof quill !== 'undefined' && quill) {
                const blot = Quill.find(node);
                if (blot) {
                    const idx = quill.getIndex(blot);
                    quill.setSelection(Math.max(0, idx), 0, Quill.sources.USER);
                    quill.focus();
                }
            }
        });
        return node;
    }

    static value(node) {
        return {
            height: parseFloat(node.style.height) || 0,
            auto: node.getAttribute('data-auto') === 'true'
        };
    }
}
PageBreakBlot.blotName = 'pageBreak';
PageBreakBlot.tagName = 'div';
Quill.register(PageBreakBlot);

// --- CUSTOM BLOT UNTUK SECTION BREAK ---
class SectionBreakBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('contenteditable', 'false');
        node.style.height = value.height + 'px';
        node.style.width = '100%';
        node.style.display = 'block';
        node.style.background = 'transparent';
        node.style.userSelect = 'none';
        node.style.cursor = 'text';
        node.classList.add('page-break-element', 'section-break-element'); // kita simpan dua-duanya agar CSS margin dsb tetap kena
        node.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof quill !== 'undefined' && quill) {
                const blot = Quill.find(node);
                if (blot) {
                    const idx = quill.getIndex(blot);
                    quill.setSelection(Math.max(0, idx), 0, Quill.sources.USER);
                    quill.focus();
                }
            }
        });
        return node;
    }

    static value(node) {
        return { height: parseFloat(node.style.height) || 0 };
    }
}
SectionBreakBlot.blotName = 'sectionBreak';
SectionBreakBlot.tagName = 'div';
Quill.register(SectionBreakBlot);


// --- CUSTOM BLOT UNTUK GAMBAR CERDAS (RESIZE & WRAP) ---
const BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = ['width', 'height', 'style', 'data-align'];

class CustomImage extends BaseImageFormat {
    static formats(domNode) {
        return ImageFormatAttributesList.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }
    format(name, value) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(CustomImage, true);

// Mendaftarkan Format Ukuran Teks (Angka/Points) - mendukung ukuran bebas yang diketik
const SizeStyle = Quill.import('attributors/style/size');
delete SizeStyle.whitelist;
Quill.register(SizeStyle, true);

// Mendaftarkan Ikon Daftar Centang (Checklist) ke Quill
try {
    const icons = Quill.import('ui/icons');
    if (icons && icons.list) {
        icons.list['check'] = `<svg viewBox="0 0 18 18">
            <polyline class="ql-stroke" stroke="currentColor" stroke-width="1.5" fill="none" points="4 9 7 12 14 5"></polyline>
            <rect class="ql-stroke" stroke="currentColor" stroke-width="1.2" fill="none" x="2" y="2" width="14" height="14" rx="2"></rect>
        </svg>`;
    }
} catch (e) {
    console.warn("Gagal mendaftarkan ikon checklist:", e);
}

// Init Quill dengan Toolbar Kustom dan Keyboard Shortcuts
const quill = new Quill('#quill-container', {
    theme: 'snow',
    modules: {
        table: true,
        toolbar: '#tab-home',
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
        },
        keyboard: {
            bindings: {
                backspaceAlign: {
                    key: 'Backspace', // Backspace
                    collapsed: true,
                    format: ['align'],
                    offset: 0,
                    handler: function(range, context) {
                        this.quill.format('align', false, Quill.sources.USER);
                        return false;
                    }
                },
                alignLeft: { key: 'L', shortKey: true, handler: function() { this.quill.format('align', false); } },
                alignCenter: { key: 'E', shortKey: true, handler: function() { this.quill.format('align', 'center'); } },
                alignRight: { key: 'R', shortKey: true, handler: function() { this.quill.format('align', 'right'); } },
                alignJustify: { key: 'J', shortKey: true, handler: function() { this.quill.format('align', 'justify'); } },
                header1: { key: '1', shortKey: true, altKey: true, handler: function() { this.quill.format('header', 1); } },
                header2: { key: '2', shortKey: true, altKey: true, handler: function() { this.quill.format('header', 2); } },
                header0: { key: '0', shortKey: true, altKey: true, handler: function() { this.quill.format('header', false); } },
                listBullet: { key: 'L', shortKey: true, shiftKey: true, handler: function() { this.quill.format('list', 'bullet'); } },
                listNumber: { key: 'N', shortKey: true, shiftKey: true, handler: function() { this.quill.format('list', 'ordered'); } },
                listCheck: { key: 'C', shortKey: true, shiftKey: true, handler: function() { this.quill.format('list', 'check'); } }
            }
        }
    }
});

// Pelacakan posisi seleksi kursor terakhir agar tidak hilang saat membuka modal/ribbon
let lastSelection = { index: 0, length: 0 };
let lastFontColor = '#D32F2F';
let lastHighlightColor = '#FFF176';

// Sistem pelacakan riwayat undo/redo untuk format kursor (misal font size pada seleksi kolaps)
const cursorFormatHistory = {
    undoStack: [],
    redoStack: []
};

function getEffectiveEditorFormat(range) {
    if (!range) {
        range = quill.getSelection() || lastSelection;
    }
    let format = {};
    try {
        if (range) {
            format = Object.assign({}, quill.getFormat(range));
        } else {
            format = Object.assign({}, quill.getFormat());
        }
    } catch (e) {
        format = {};
    }

    // Jika seleksi kolaps (kursor), periksa apakah ada styling kursor aktif pada DOM
    if (!range || range.length === 0) {
        try {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                let node = sel.getRangeAt(0).startContainer;
                if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
                while (node && node !== quill.root && !node.classList?.contains('ql-editor')) {
                    if (node.style?.fontSize && !format.size) {
                        format.size = node.style.fontSize;
                    }
                    if (node.style?.color && !format.color) {
                        format.color = node.style.color;
                    }
                    if (node.style?.backgroundColor && !format.background) {
                        format.background = node.style.backgroundColor;
                    }
                    node = node.parentElement;
                }
            }
        } catch (e) {}
    }
    return format;
}

function recordCursorFormatChange(formatName, oldValue, newValue) {
    const range = quill.getSelection() || lastSelection;
    if (range && range.length === 0) {
        cursorFormatHistory.undoStack.push({
            format: formatName,
            oldValue: oldValue,
            newValue: newValue,
            range: { index: range.index, length: 0 },
            time: Date.now()
        });
        cursorFormatHistory.redoStack = [];
    }
}

function syncFontSizeUI(sz) {
    const input = document.getElementById('input-font-size');
    if (input && document.activeElement !== input) {
        const num = parseFloat(sz) || 11;
        input.value = num;
        if (typeof updateFontSizePopoverSelection === 'function') {
            updateFontSizePopoverSelection(num);
        }
    }
}

// Handler Undo & Redo Terpadu
const originalQuillUndo = quill.history.undo.bind(quill.history);
const originalQuillRedo = quill.history.redo.bind(quill.history);

quill.history.undo = function() {
    if (cursorFormatHistory.undoStack.length > 0) {
        const item = cursorFormatHistory.undoStack.pop();
        cursorFormatHistory.redoStack.push(item);

        if (item.format === 'size') {
            const revertSize = item.oldValue;
            if (revertSize && parseFloat(revertSize) !== 11) {
                quill.format('size', revertSize + 'pt');
                syncFontSizeUI(revertSize);
            } else {
                quill.format('size', false);
                syncFontSizeUI(11);
            }
        } else {
            quill.format(item.format, item.oldValue || false);
        }
        return;
    }

    originalQuillUndo();

    setTimeout(() => {
        const range = quill.getSelection() || lastSelection;
        if (range) {
            const fmt = quill.getFormat(range);
            if (fmt && fmt.size) {
                const sz = parseFloat(fmt.size) || 11;
                syncFontSizeUI(sz);
                if (range.length === 0) quill.format('size', sz + 'pt');
            } else {
                syncFontSizeUI(11);
                if (range.length === 0) quill.format('size', false);
            }
        }
    }, 10);
};

quill.history.redo = function() {
    if (cursorFormatHistory.redoStack.length > 0) {
        const item = cursorFormatHistory.redoStack.pop();
        cursorFormatHistory.undoStack.push(item);

        if (item.format === 'size') {
            const redoSize = item.newValue;
            quill.format('size', redoSize + 'pt');
            syncFontSizeUI(redoSize);
        } else {
            quill.format(item.format, item.newValue);
        }
        return;
    }

    originalQuillRedo();

    setTimeout(() => {
        const range = quill.getSelection() || lastSelection;
        if (range) {
            const fmt = quill.getFormat(range);
            if (fmt && fmt.size) {
                const sz = parseFloat(fmt.size) || 11;
                syncFontSizeUI(sz);
                if (range.length === 0) quill.format('size', sz + 'pt');
            } else {
                syncFontSizeUI(11);
                if (range.length === 0) quill.format('size', false);
            }
        }
    }, 10);
};

let updateStyleCardRafId = null;
function scheduleUpdateActiveStyleCard() {
    if (!updateStyleCardRafId) {
        updateStyleCardRafId = requestAnimationFrame(() => {
            if (typeof updateActiveStyleCard === 'function') {
                updateActiveStyleCard();
            }
            updateStyleCardRafId = null;
        });
    }
}

quill.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
        cursorFormatHistory.redoStack = [];
    }
    scheduleUpdateActiveStyleCard();
});

quill.on('selection-change', (range) => {
    if (range) {
        lastSelection = range;
        try {
            const format = getEffectiveEditorFormat(range);
            if (format && format.color) {
                lastFontColor = format.color;
                const bar = document.getElementById('font-color-bar');
                if (bar) bar.style.backgroundColor = format.color;
            }
            if (format && format.background) {
                lastHighlightColor = format.background;
                const bar = document.getElementById('highlight-color-bar');
                if (bar) bar.style.backgroundColor = format.background;
            }
            if (format && format.lineheight) {
                const lh = format.lineheight;
                const items = document.querySelectorAll('#popover-home-lineheight .lineheight-item');
                items.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.value === lh);
                });
                const ribbonLh = document.getElementById('ribbon-quick-lineheight');
                if (ribbonLh && ribbonLh.value !== lh) ribbonLh.value = lh;
            }
            if (format && format.size) {
                const input = document.getElementById('input-font-size');
                if (input && document.activeElement !== input) {
                    const sz = parseFloat(format.size) || 11;
                    input.value = sz;
                    if (typeof updateFontSizePopoverSelection === 'function') {
                        updateFontSizePopoverSelection(sz);
                    }
                }
            } else if (!format || !format.size) {
                const input = document.getElementById('input-font-size');
                if (input && document.activeElement !== input) {
                    input.value = '11';
                    if (typeof updateFontSizePopoverSelection === 'function') {
                        updateFontSizePopoverSelection(11);
                    }
                }
            }
            if (typeof updateActiveStyleCard === 'function') {
                updateActiveStyleCard();
            }
        } catch (e) {
            // Abaikan kesalahan pembacaan format jika rentang di luar teks
        }
    }
});

// --- PROTEKSI STRUKTUR EDITOR & PENGAMAN TOMBOL BACKSPACE / DELETE ---
function ensureEditorHasBlock() {
    if (!quill.root.firstElementChild || quill.getLength() <= 0) {
        quill.setContents([{ insert: '\n' }], Quill.sources.SILENT);
        quill.setSelection(0, 0, Quill.sources.SILENT);
        return;
    }
    const firstBlot = (quill.scroll && quill.scroll.children) ? quill.scroll.children.head : null;
    if (firstBlot && (firstBlot.statics.blotName === 'pageBreak' || firstBlot.statics.blotName === 'sectionBreak')) {
        quill.insertText(0, '\n', Quill.sources.SILENT);
    }
}

// Cegah penghapusan blok utama pada posisi awal dokumen (index 0) yang menyebabkan hilangnya kursor ketik,
// serta kelola pemisahan halaman otomatis saat Enter ditekan di batas bawah kertas
quill.root.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        const sel = quill.getSelection(true) || lastSelection;
        if (sel) {
            const bounds = quill.getBounds(sel.index);
            if (bounds) {
                const mmToPx = 96 / 25.4;
                const gapPx = 15 * mmToPx;
                const pageHeightPx = paperConfig.height * mmToPx;
                const totalPageHeightPx = pageHeightPx + gapPx;
                const marginBottomPx = paperConfig.marginBottom * mmToPx;
                const pageIdx = Math.floor(bounds.top / totalPageHeightPx);
                const maxAllowedBottom = (pageIdx * totalPageHeightPx) + pageHeightPx - marginBottomPx;

                // Jika posisi baris kursor saat ini sudah berada di batas bawah margin kertas
                // (sehingga baris baru berikutnya akan jatuh ke dalam margin bawah atau celah antar-halaman)
                if (bounds.bottom + 18 >= maxAllowedBottom) {
                    e.preventDefault();
                    e.stopPropagation();
                    insertPageBreak(quill, sel, false, true);
                    return;
                }
            }
        }
    } else if (e.key === 'Backspace') {
        const sel = quill.getSelection() || lastSelection;
        const isCollapsed = !sel || sel.length === 0;
        const isAtStart = !sel || sel.index === 0;
        const isDocEmpty = quill.getLength() <= 1;

        if (isCollapsed && (isAtStart || isDocEmpty)) {
            // Jika ada format align yang aktif, kembalikan ke default kiri
            const currentFormats = quill.getFormat(0, 0);
            if (currentFormats && currentFormats.align) {
                quill.format('align', false, Quill.sources.USER);
            }
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // Jika menekan Backspace tepat setelah pemisah halaman (di awal halaman baru),
        // hapus pemisah halaman dan kembalikan kursor ke akhir halaman sebelumnya
        if (isCollapsed && sel.index > 0) {
            const [leaf] = quill.getLeaf(sel.index - 1);
            if (leaf && (leaf.statics.blotName === 'pageBreak' || leaf.statics.blotName === 'sectionBreak')) {
                e.preventDefault();
                e.stopPropagation();
                const breakIdx = quill.getIndex(leaf);
                quill.deleteText(breakIdx, 1, Quill.sources.USER);
                quill.setSelection(Math.max(0, breakIdx), 0, Quill.sources.USER);
                quill.focus();
                scheduleUpdateCanvasHeight();
                return;
            }
        }
    } else if (e.key === 'Delete') {
        const sel = quill.getSelection() || lastSelection;
        const isCollapsed = !sel || sel.length === 0;
        const isDocEmpty = quill.getLength() <= 1;
        const isAtEnd = sel && sel.index >= quill.getLength() - 1;

        if (isCollapsed && (isDocEmpty || isAtEnd)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
    }
}, true);

// Cegah juga melalui browser beforeinput event (deleteContentBackward pada indeks 0)
quill.root.addEventListener('beforeinput', (e) => {
    if (e.inputType === 'deleteContentBackward') {
        const sel = quill.getSelection() || lastSelection;
        const isCollapsed = !sel || sel.length === 0;
        const isAtStart = !sel || sel.index === 0;
        const isDocEmpty = quill.getLength() <= 1;

        if (isCollapsed && (isAtStart || isDocEmpty)) {
            e.preventDefault();
            e.stopPropagation();
        }
    } else if (e.inputType === 'deleteContentForward') {
        const sel = quill.getSelection() || lastSelection;
        const isCollapsed = !sel || sel.length === 0;
        const isDocEmpty = quill.getLength() <= 1;
        const isAtEnd = sel && sel.index >= quill.getLength() - 1;

        if (isCollapsed && (isDocEmpty || isAtEnd)) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}, true);

let lastBreakTimestamp = 0;

function insertPageBreak(q, range, isSectionBreak = false, auto = false) {
    if (!range) range = q.getSelection(true);
    if (!range) return;
    
    // Cegah eksekusi ganda jika dipanggil berulang dalam tempo singkat (< 150ms)
    const now = Date.now();
    if (!auto && (now - lastBreakTimestamp < 150)) {
        return;
    }
    if (!auto) {
        lastBreakTimestamp = now;
    }

    let [block, offset] = q.getLine(range.index);
    let isEmpty = block && block.length() === 1;
    let insertIndex = range.index;
    
    // Jika ini auto-paginate saat scanning overflow, lemparkan seluruh blok
    if (auto && block && offset === 0) {
        let blockIndex = q.getIndex(block);
        insertIndex = blockIndex;
    }
    
    const blotType = isSectionBreak ? 'sectionBreak' : 'pageBreak';
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    // Hitung posisi dari index tempat kita akan memasukkan break (awal baris jika auto)
    let bounds = q.getBounds(insertIndex);
    if (!bounds) return;
    
    let currentPageIndex = Math.floor(bounds.top / totalPageHeightPx);
    
    // Target posisi teratas area cetak halaman berikutnya
    const targetNextPageTop = ((currentPageIndex + 1) * totalPageHeightPx) + (paperConfig.marginTop * mmToPx);
    let gapDistance = Math.max(10, Math.round(targetNextPageTop - bounds.top));
    
    let targetIndex;

    // Pasang guard agar text-change tidak memicu auto-paginasi berulang/rekursif
    q._isInsertingBreak = true;

    try {
        if (!auto && insertIndex === 0) {
            // Pastikan ada baris paragraf sebelum pemisah halaman agar halaman pertama dapat diketik
            q.insertText(0, '\n', Quill.sources.USER);
            insertIndex = 1;
        }

        const embedVal = { height: gapDistance, auto: !!auto };

        if (isEmpty && !auto) {
            // Jika baris kosong dan manual, sisipkan blot di posisi kursor
            q.insertEmbed(insertIndex, blotType, embedVal, Quill.sources.USER);
            targetIndex = insertIndex + 1;
            if (targetIndex >= q.getLength()) {
                q.insertText(targetIndex, '\n', Quill.sources.USER);
            }
            q.setSelection(targetIndex, 0, Quill.sources.USER);
            q.focus();
        } else {
            // Sisipkan embed di insertIndex
            q.insertEmbed(insertIndex, blotType, embedVal, Quill.sources.USER);
            targetIndex = insertIndex + 1;
            // Pastikan ada baris paragraf baru setelah pemisah jika berada di akhir dokumen
            if (targetIndex >= q.getLength()) {
                q.insertText(targetIndex, '\n', Quill.sources.USER);
            }
            q.setSelection(targetIndex, 0, Quill.sources.USER);
            q.focus();
        }
    } finally {
        setTimeout(() => {
            q._isInsertingBreak = false;
        }, 80);
    }
    
    // Perbarui tinggi kanvas secara langsung
    if (typeof updateCanvasHeight === 'function') {
        updateCanvasHeight();
    }

    // Gulir layar ke halaman baru secara instan
    requestAnimationFrame(() => {
        const newBounds = q.getBounds(targetIndex);
        const canvasArea = document.getElementById('canvas-area');
        if (newBounds && canvasArea) {
            const zoom = (typeof currentZoom !== 'undefined' && currentZoom > 0) ? currentZoom : 1.0;
            const targetScrollTop = (newBounds.top * zoom) - 50;
            canvasArea.scrollTop = Math.max(0, targetScrollTop);
        }
    });
}

// Fitur Font Size Terpadu, A+ (Perbesar) dan A- (Perkecil)
const standardFontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 36, 48, 72];

function applyFontSize(val) {
    let num = parseFloat(val);
    if (isNaN(num) || num <= 0) num = 11;
    if (num > 500) num = 500;
    num = Math.round(num * 10) / 10;

    const currentFmt = getEffectiveEditorFormat();
    const currentSize = currentFmt.size ? (parseFloat(currentFmt.size) || 11) : 11;

    if (currentSize === num) return;

    recordCursorFormatChange('size', currentSize, num);

    const inputFontSize = document.getElementById('input-font-size');
    if (inputFontSize) inputFontSize.value = num;

    quill.format('size', num + 'pt');
    if (typeof updateFontSizePopoverSelection === 'function') {
        updateFontSizePopoverSelection(num);
    }
}

document.getElementById('custom-btn-size-up')?.addEventListener('click', () => {
    let currentFmt = getEffectiveEditorFormat();
    let currentVal = currentFmt.size ? (parseFloat(currentFmt.size) || 11) : 11;
    let nextSize = standardFontSizes.find(s => s > currentVal);
    if (!nextSize) nextSize = Math.min(500, currentVal + (currentVal >= 28 ? 4 : 2));

    applyFontSize(nextSize);
    quill.focus();
});

document.getElementById('custom-btn-size-down')?.addEventListener('click', () => {
    let currentFmt = getEffectiveEditorFormat();
    let currentVal = currentFmt.size ? (parseFloat(currentFmt.size) || 11) : 11;
    let prevSizes = standardFontSizes.filter(s => s < currentVal);
    let prevSize = prevSizes.length > 0 ? prevSizes[prevSizes.length - 1] : Math.max(1, currentVal - 1);

    applyFontSize(prevSize);
    quill.focus();
});



// Elemen Menu Bar
const actionHome = document.getElementById('action-home');
const btnActionPrint = document.getElementById('action-print');
const actionExport = document.getElementById('action-export');
const actionExit = document.getElementById('action-exit');

// Navigasi
btnNewDoc.addEventListener('click', () => {
    // LANGSUNG BUKA EDITOR, LEWATI MODAL!
    
    // Reset Data Dokumen
    currentDocName = 'Dokumen_Baru';
    currentFilePath = null;
    closeAfterSave = false;
    
    // Reset Kertas ke A4 Default
    paperConfig = { width: 210, height: 297, marginTop: 25.4, marginBottom: 25.4, marginLeft: 25.4, marginRight: 25.4 };
    numberingConfig = { "doc": { show: false, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" } };
    headerFooterConfig = { "doc": { header: { text: "", align: "center", diffFirst: false, firstText: "" }, footer: { text: "", align: "center", diffFirst: false, firstText: "" } } };
    
    // Update tampilan form ukuran kertas di Settings
    document.getElementById('input-paper-size').value = 'A4';
    document.getElementById('margin-top').value = 25.4;
    document.getElementById('margin-bottom').value = 25.4;
    document.getElementById('margin-left').value = 25.4;
    document.getElementById('margin-right').value = 25.4;
    
    applyPageSetup();

    // Pindah ke editor
    sidebar.style.display = 'none';
    viewHome.classList.remove('active');
    viewEditor.classList.add('active');

    // Beri jeda sejenak untuk membiarkan Webview2 menggambar layar
    setTimeout(() => {
        quill.setContents([{ insert: '\n' }]);
        quill.focus();
        setDirty(false); // Dokumen baru kosong belum memiliki perubahan
    }, 150);
});

btnCancelModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

const btnBrowseFolder = document.getElementById('btn-browse-folder');
const inputFolderPath = document.getElementById('input-folder-path');

if (btnBrowseFolder) {
    btnBrowseFolder.addEventListener('click', async () => {
        if (!window.__TAURI__) return;
        try {
            const selectedFolder = await window.__TAURI__.dialog.open({ directory: true });
            if (selectedFolder) {
                inputFolderPath.value = selectedFolder;
            }
        } catch (e) {
            console.error(e);
        }
    });
}

btnCreateModal.addEventListener('click', async () => {
    closeAfterSave = false;
    let docName = inputDocName.value || "Dokumen_Baru";
    docName = docName.replace('.pdf', '').replace('.baku', '');
    currentDocName = docName;
    
    // Terapkan Ukuran Kertas yang dipilih
    const newPaperSize = document.getElementById('input-new-paper-size');
    if (newPaperSize) {
        document.getElementById('input-paper-size').value = newPaperSize.value;
        applyPageSetup(); // ini akan memanggil ulang perhitungan ukuran kertas di background
    }

    // Path selalu mengarah ke Workspace
    if (typeof bakuWorkspacePath !== 'undefined' && bakuWorkspacePath) {
        const separator = bakuWorkspacePath.includes('\\') ? '\\' : '/';
        currentFilePath = bakuWorkspacePath + separator + docName + '.baku';
    } else if (inputFolderPath && inputFolderPath.value) {
        const separator = inputFolderPath.value.includes('\\') ? '\\' : '/';
        currentFilePath = inputFolderPath.value + separator + docName + '.baku';
    } else {
        currentFilePath = null;
    }

    modal.classList.add('hidden');
    // Pindah ke editor (HANYA MENGUBAH DOM, TANPA MENYIMPAN FILE FISIK DULU!)
    sidebar.style.display = 'none';
    viewHome.classList.remove('active');
    viewEditor.classList.add('active');
    updateWindowTitle();

    // Beri jeda sejenak untuk membiarkan Webview2 menggambar layar
    setTimeout(() => {
        quill.setContents([{ insert: '\n' }]);
        quill.focus();
        setDirty(false);
        // Hapus jejak log crash
        localStorage.removeItem('DEBUG_CRASH');
    }, 150);
});

function goToHome() {
    pendingHomeNav = false;
    homeAfterSave = false;
    setDirty(false);
    currentFilePath = null;
    currentDocName = 'Dokumen_Baru';

    sidebar.style.display = 'flex';
    viewEditor.classList.remove('active');
    const vExtra = document.getElementById('view-extra-tools');
    if (vExtra) vExtra.classList.remove('active');
    const vTemplates = document.getElementById('view-templates');
    if (vTemplates) vTemplates.classList.remove('active');
    const vSettings = document.getElementById('view-settings');
    if (vSettings) vSettings.classList.remove('active');
    viewHome.classList.add('active');

    const mHome = document.getElementById('menu-home');
    if (mHome) mHome.classList.add('active');
    const mSettings = document.getElementById('menu-settings');
    if (mSettings) mSettings.classList.remove('active');
    const mTemplates = document.getElementById('menu-templates');
    if (mTemplates) mTemplates.classList.remove('active');
    const mExtra = document.getElementById('menu-extra-tools');
    if (mExtra) mExtra.classList.remove('active');

    renderRecentDocs();
    updateWindowTitle();
}

actionHome.addEventListener('click', () => {
    // Jika masih ada dokumen aktif di editor dengan perubahan yang belum disimpan
    if (viewEditor && viewEditor.classList.contains('active') && isDirty) {
        pendingHomeNav = true;
        const modalUnsaved = document.getElementById('modal-unsaved');
        if (modalUnsaved) {
            modalUnsaved.style.display = 'flex';
            modalUnsaved.classList.remove('hidden');
        }
    } else {
        goToHome();
    }
});

actionExit.addEventListener('click', () => {
    const modalUnsaved = document.getElementById('modal-unsaved');
    if (viewEditor && viewEditor.classList.contains('active') && isDirty && modalUnsaved) {
        modalUnsaved.style.display = 'flex';
        modalUnsaved.classList.remove('hidden');
    } else {
        isClosing = true;
        if (window.__TAURI__) {
            window.__TAURI__.window.appWindow.close().catch(e => console.error(e));
        }
    }
});

// Modal Tentang Baku PDF
const actionAbout = document.getElementById('action-about');
const modalAbout = document.getElementById('modal-about');
const btnAboutClose = document.getElementById('btn-about-close');

if (actionAbout && modalAbout && btnAboutClose) {
    actionAbout.addEventListener('click', () => {
        modalAbout.style.display = 'flex';
        modalAbout.classList.remove('hidden');
    });

    btnAboutClose.addEventListener('click', () => {
        modalAbout.style.display = 'none';
        modalAbout.classList.add('hidden');
    });
}

// --- MODAL PENGATURAN NOMOR HALAMAN ---
const modalPageNumber = document.getElementById('modal-page-number');
const btnPnCancel = document.getElementById('btn-pn-cancel');
const btnPnSave = document.getElementById('btn-pn-save');

window.openPageNumberSettings = function(configId) {
    if (!modalPageNumber) return;
    
    // Pastikan config ada
    if (!numberingConfig[configId]) {
        numberingConfig[configId] = { show: true, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" };
    }
    
    const conf = numberingConfig[configId];
    // Jika baru dibuka dan belum pernah diaktifkan, otomatis centang agar aktif setelah disimpan
    if (!conf.show && configId === 'doc') {
        conf.show = true;
    }
    
    document.getElementById('pn-config-id').value = configId;
    document.getElementById('pn-show').checked = conf.show !== false;
    document.getElementById('pn-format').value = conf.format || 'arabic';
    document.getElementById('pn-prefix').value = conf.prefix || '';
    document.getElementById('pn-suffix').value = conf.suffix || '';
    document.getElementById('pn-align').value = conf.align || 'center';
    document.getElementById('pn-start').value = conf.start || 1;
    
    modalPageNumber.style.display = 'flex';
    modalPageNumber.classList.remove('hidden');
};

if (btnPnCancel && btnPnSave) {
    btnPnCancel.addEventListener('click', () => {
        modalPageNumber.style.display = 'none';
        modalPageNumber.classList.add('hidden');
    });
    
    btnPnSave.addEventListener('click', () => {
        const configId = document.getElementById('pn-config-id').value;
        if (configId && numberingConfig[configId]) {
            numberingConfig[configId].show = document.getElementById('pn-show').checked;
            numberingConfig[configId].format = document.getElementById('pn-format').value;
            numberingConfig[configId].prefix = document.getElementById('pn-prefix').value;
            numberingConfig[configId].suffix = document.getElementById('pn-suffix').value;
            numberingConfig[configId].align = document.getElementById('pn-align').value;
            numberingConfig[configId].start = parseInt(document.getElementById('pn-start').value) || 1;
        }
        
        modalPageNumber.style.display = 'none';
        modalPageNumber.classList.add('hidden');
        
        setDirty(true);
        
        // Render ulang secara paksa (force = true) agar langsung tampil pada kanvas
        const editor = document.querySelector('.ql-editor');
        const pagesNeeded = parseInt(editor?.dataset.pagesNeeded || '1');
        updatePageNumbers(pagesNeeded, true);
    });
}

// --- PENGATURAN HALAMAN & PAGINATION ---
let paperConfig = {
    format: 'a4',
    width: 210, // mm
    height: 297, // mm
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 25,
    marginRight: 25
};

let numberingConfig = {
    "doc": { show: false, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" }
};
let headerFooterConfig = {
    "doc": { 
        header: { text: "", align: "center", diffFirst: false, firstText: "" },
        footer: { text: "", align: "center", diffFirst: false, firstText: "" }
    }
};

const modalPageSetup = document.getElementById('modal-page-setup');
const inputMarginPreset = document.getElementById('input-margin-preset');
const customMarginFields = document.getElementById('custom-margin-fields');

const marginTopInput = document.getElementById('margin-top');
const marginBottomInput = document.getElementById('margin-bottom');
const marginLeftInput = document.getElementById('margin-left');
const marginRightInput = document.getElementById('margin-right');

function updateMarginInputs(t, b, l, r) {
    marginTopInput.value = t;
    marginBottomInput.value = b;
    marginLeftInput.value = l;
    marginRightInput.value = r;
}

function handlePresetChange() {
    const val = inputMarginPreset.value;
    if (val === 'normal') updateMarginInputs(25, 25, 25, 25);
    else if (val === 'narrow') updateMarginInputs(12.7, 12.7, 12.7, 12.7);
    else if (val === 'academic') updateMarginInputs(40, 30, 30, 30);
    
    if (val === 'custom') {
        customMarginFields.style.opacity = '1';
        customMarginFields.style.pointerEvents = 'auto';
    } else {
        customMarginFields.style.opacity = '0.5';
        customMarginFields.style.pointerEvents = 'none';
    }
}

if (inputMarginPreset) {
    inputMarginPreset.addEventListener('change', handlePresetChange);
}

document.getElementById('action-page-setup').addEventListener('click', () => {
    // Set UI from current config
    marginTopInput.value = paperConfig.marginTop;
    marginBottomInput.value = paperConfig.marginBottom;
    marginLeftInput.value = paperConfig.marginLeft;
    marginRightInput.value = paperConfig.marginRight;
    
    // Determine preset
    let t = paperConfig.marginTop, b = paperConfig.marginBottom, l = paperConfig.marginLeft, r = paperConfig.marginRight;
    if (t == 25 && b == 25 && l == 25 && r == 25) inputMarginPreset.value = 'normal';
    else if (t == 12.7 && b == 12.7 && l == 12.7 && r == 12.7) inputMarginPreset.value = 'narrow';
    else if (t == 40 && b == 30 && l == 30 && r == 30) inputMarginPreset.value = 'academic';
    else inputMarginPreset.value = 'custom';
    
    handlePresetChange();
    modalPageSetup.style.display = 'flex';
});
document.getElementById('btn-cancel-page-setup').addEventListener('click', () => {
    modalPageSetup.style.display = 'none';
});
document.getElementById('btn-apply-page-setup').addEventListener('click', () => {
    const size = document.getElementById('input-paper-size').value;
    if (size === 'A4') { paperConfig.width = 210; paperConfig.height = 297; paperConfig.format = 'a4'; }
    if (size === 'Letter') { paperConfig.width = 215.9; paperConfig.height = 279.4; paperConfig.format = 'letter'; }
    if (size === 'Legal') { paperConfig.width = 215.9; paperConfig.height = 355.6; paperConfig.format = 'legal'; }
    if (size === 'F4') { paperConfig.width = 210; paperConfig.height = 330; paperConfig.format = [210, 330]; }

    let t = parseFloat(marginTopInput.value) || 25;
    let b = parseFloat(marginBottomInput.value) || 25;
    let l = parseFloat(marginLeftInput.value) || 25;
    let r = parseFloat(marginRightInput.value) || 25;

    // Validasi Ekstrem: margin tidak boleh negatif, atau < 5mm (batas aman print), maksimal 100mm
    t = Math.max(5, Math.min(t, 100));
    b = Math.max(5, Math.min(b, 100));
    l = Math.max(5, Math.min(l, 100));
    r = Math.max(5, Math.min(r, 100));

    paperConfig.marginTop = t;
    paperConfig.marginBottom = b;
    paperConfig.marginLeft = l;
    paperConfig.marginRight = r;

    applyPageSetup();
    modalPageSetup.style.display = 'none';
    setDirty(true);
});

function toRoman(num) {
    if (num < 1) return "";
    const lookup = {m:1000,cm:900,d:500,cd:400,c:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1};
    let roman = '';
    for (let i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
}

let lastRenderedOverlay = { pages: 0, sbHash: '' };

function updatePageNumbers(totalPages, force = false) {
    const overlay = document.getElementById('page-numbers-overlay');
    if (!overlay) return;
    
    // Cari semua section break di dokumen hanya jika ada
    const sectionBreaks = Array.from(document.querySelectorAll('.ql-editor .section-break-element'));
    const sbHash = sectionBreaks.length > 0
        ? sectionBreaks.map(sb => (sb.getAttribute('data-section-id') || '') + '_' + Math.round(sb.offsetTop)).join('|')
        : '';
    
    // Jika tidak ada perubahan halaman atau posisi section break, hindari merombak DOM
    if (!force && lastRenderedOverlay.pages === totalPages && lastRenderedOverlay.sbHash === sbHash) {
        return;
    }
    lastRenderedOverlay.pages = totalPages;
    lastRenderedOverlay.sbHash = sbHash;

    overlay.innerHTML = '';
    
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    // Peta halaman -> config id mana yang berlaku mulai halaman ini
    // Hal 0 selalu "doc"
    let pageRules = { 0: "doc" };
    
    sectionBreaks.forEach(sb => {
        let id = sb.getAttribute('data-section-id');
        if (!id) {
            id = "sec_" + Date.now() + Math.random().toString().slice(2, 6);
            sb.setAttribute('data-section-id', id);
        }
        if (!numberingConfig[id]) {
            // Berikan default copy dari doc jika belum ada
            numberingConfig[id] = { show: true, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" };
        }
        
        let top = sb.offsetTop;
        let pageIdx = Math.floor(top / totalPageHeightPx);
        // Section break memutus ke halaman BERIKUTNYA
        pageRules[pageIdx + 1] = id;
    });
    
    let currentConfigId = "doc";
    let currentNumber = 1;
    
    for (let p = 0; p < totalPages; p++) {
        if (pageRules[p]) {
            currentConfigId = pageRules[p];
            currentNumber = numberingConfig[currentConfigId].start;
        }
        
        let conf = numberingConfig[currentConfigId];
        
        if (conf && conf.show) {
            let displayStr = "";
            if (conf.format === "roman") displayStr = toRoman(currentNumber);
            else if (conf.format === "roman_upper") displayStr = toRoman(currentNumber).toUpperCase();
            else displayStr = currentNumber.toString();
            
            let finalStr = (conf.prefix || "") + displayStr + (conf.suffix || "");
            
            let numDiv = document.createElement('div');
            numDiv.style.position = 'absolute';
            numDiv.style.left = '0';
            numDiv.style.width = '100%';
            
            // Posisi: lebih dalam ke area margin bawah agar tidak menempel dengan teks batas bawah
            let bottomOffset = (p * totalPageHeightPx) + pageHeightPx - ((paperConfig.marginBottom * mmToPx) / 1.5);
            numDiv.style.top = (bottomOffset) + 'px';
            
            // Atur alignment manual pakai padding agar tidak nabrak margin
            if (conf.align === "left") { numDiv.style.textAlign = "left"; numDiv.style.paddingLeft = (paperConfig.marginLeft * mmToPx) + "px"; }
            else if (conf.align === "right") { numDiv.style.textAlign = "right"; numDiv.style.paddingRight = (paperConfig.marginRight * mmToPx) + "px"; }
            else { numDiv.style.textAlign = "center"; }
            
            numDiv.style.pointerEvents = "none";
            numDiv.style.fontFamily = "Times New Roman, serif";
            numDiv.style.fontSize = "11pt";
            numDiv.style.color = "#000000";
            numDiv.style.transform = "translateY(-100%)";
            
            let numSpan = document.createElement('span');
            numSpan.textContent = finalStr;
            numSpan.style.pointerEvents = "auto";
            numSpan.style.cursor = "pointer";
            numSpan.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                if (typeof openPageNumberSettings === 'function') openPageNumberSettings(currentConfigId);
            });
            
            numDiv.appendChild(numSpan);
            overlay.appendChild(numDiv);
        }

        try { // --- RENDER HEADER / FOOTER ---
        let hfConf = headerFooterConfig[currentConfigId];
        if (!hfConf) {
            // Fallback jika tidak ada (untuk file lama)
            hfConf = headerFooterConfig["doc"] || { header: { text: "", align: "center", diffFirst: false }, footer: { text: "", align: "center", diffFirst: false } };
            headerFooterConfig[currentConfigId] = hfConf;
        }

        // Apakah halaman ini adalah halaman pertama dari "Section" ini?
        // Asumsi: jika p == 0, atau pageRules[p] ada nilainya (berarti pindah section di halaman ini)
        let isFirstOfSection = (p === 0) || !!pageRules[p];
        
        let headerText = (isFirstOfSection && hfConf.header.diffFirst) ? (hfConf.header.firstText || "") : hfConf.header.text;
        if (headerText) {
            let hDiv = document.createElement('div');
            hDiv.textContent = headerText;
            hDiv.style.position = 'absolute';
            hDiv.style.left = '0';
            hDiv.style.width = '100%';
            let topOffset = (p * totalPageHeightPx) + ((paperConfig.marginTop * mmToPx) / 2);
            hDiv.style.top = topOffset + 'px';
            hDiv.style.textAlign = hfConf.header.align;
            if (hfConf.header.align === "left") hDiv.style.paddingLeft = (paperConfig.marginLeft * mmToPx) + "px";
            if (hfConf.header.align === "right") hDiv.style.paddingRight = (paperConfig.marginRight * mmToPx) + "px";
            hDiv.style.pointerEvents = "none";
            hDiv.style.fontFamily = "Times New Roman, serif";
            hDiv.style.fontSize = "11pt";
            hDiv.style.color = "#000000";
            hDiv.style.opacity = "0.7";
            hDiv.style.transform = "translateY(-50%)";
            overlay.appendChild(hDiv);
        }

        let footerText = (isFirstOfSection && hfConf.footer.diffFirst) ? (hfConf.footer.firstText || "") : hfConf.footer.text;
        if (footerText) {
            let fDiv = document.createElement('div');
            fDiv.textContent = footerText;
            fDiv.style.position = 'absolute';
            fDiv.style.left = '0';
            fDiv.style.width = '100%';
            let bottomOffset = (p * totalPageHeightPx) + pageHeightPx - ((paperConfig.marginBottom * mmToPx) / 2);
            fDiv.style.top = bottomOffset + 'px';
            fDiv.style.textAlign = hfConf.footer.align;
            if (hfConf.footer.align === "left") fDiv.style.paddingLeft = (paperConfig.marginLeft * mmToPx) + "px";
            if (hfConf.footer.align === "right") fDiv.style.paddingRight = (paperConfig.marginRight * mmToPx) + "px";
            fDiv.style.pointerEvents = "none";
            fDiv.style.fontFamily = "Times New Roman, serif";
            fDiv.style.fontSize = "11pt";
            fDiv.style.color = "#000000";
            fDiv.style.opacity = "0.7";
            fDiv.style.transform = "translateY(-50%)";
            overlay.appendChild(fDiv);
        }
        // --- END RENDER HEADER / FOOTER ---
        } catch(e) { console.error('HF Render Error:', e); }
        
        currentNumber++;
    }
}

function applyPageSetup() {
    const exportWrapper = document.getElementById('export-wrapper');
    const quillContainer = document.getElementById('quill-container');
    const editor = document.querySelector('.ql-editor');
    
    // Matikan border dan background bawaan yang membuat kertas terlihat tersambung
    quillContainer.style.border = 'none';
    quillContainer.style.background = 'transparent';
    
    // Terapkan dimensi fisik ke pembungkus luar
    if (exportWrapper) exportWrapper.style.width = `${paperConfig.width}mm`;
    if (quillContainer) quillContainer.style.width = '100%';
    
    // Terapkan margin halaman ke teks
    editor.style.padding = `${paperConfig.marginTop}mm ${paperConfig.marginRight}mm ${paperConfig.marginBottom}mm ${paperConfig.marginLeft}mm`;
    editor.style.minHeight = `${paperConfig.height}mm`;

    // Gunakan lapisan div lembar kertas terpisah (#page-sheets-layer) yang ringan dan diakselerasi GPU
    editor.style.backgroundImage = 'none';
    editor.style.backgroundColor = 'transparent';

    updateCanvasHeight(true);
    if (typeof renderVisualRuler === 'function') renderVisualRuler();
}

function renderPageSheets(count, force = false) {
    const layer = document.getElementById('page-sheets-layer');
    if (!layer) return;
    if (!force && layer.children.length === count) return;
    
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    layer.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const sheet = document.createElement('div');
        sheet.className = 'page-sheet';
        sheet.style.top = `${i * totalPageHeightPx}px`;
        sheet.style.height = `${pageHeightPx}px`;
        frag.appendChild(sheet);
    }
    layer.appendChild(frag);
}

function syncPageBreakHeights() {
    const editor = document.querySelector('.ql-editor');
    if (!editor) return;
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    const marginTopPx = paperConfig.marginTop * mmToPx;

    const breaks = Array.from(editor.querySelectorAll('.page-break-element'));
    for (const pb of breaks) {
        const bTop = pb.offsetTop;
        const pIdx = Math.floor(bTop / totalPageHeightPx);
        const targetNextTop = ((pIdx + 1) * totalPageHeightPx) + marginTopPx;
        const neededHeight = Math.max(10, Math.round(targetNextTop - bTop));
        const currentH = parseFloat(pb.style.height) || 0;
        if (Math.abs(currentH - neededHeight) > 1) {
            pb.style.height = neededHeight + 'px';
        }
    }
}

function checkAutoPagination() {
    if (quill._isInsertingBreak) return;
    const editor = document.querySelector('.ql-editor');
    if (!editor) return;

    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    const marginTopPx = paperConfig.marginTop * mmToPx;
    const marginBottomPx = paperConfig.marginBottom * mmToPx;

    syncPageBreakHeights();

    const children = Array.from(editor.children);
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.classList.contains('page-break-element')) {
            continue;
        }

        const childTop = child.offsetTop;
        const childHeight = child.offsetHeight || 24;
        const childBottom = childTop + childHeight;
        const pageIdx = Math.floor(childTop / totalPageHeightPx);
        const maxAllowedBottom = (pageIdx * totalPageHeightPx) + pageHeightPx - marginBottomPx;
        const pageTopPrintable = (pageIdx * totalPageHeightPx) + marginTopPx;

        // Jika ada blok paragraf yang meluap melewati batas bawah area cetak halaman
        if (childBottom > maxAllowedBottom + 4 && childTop > pageTopPrintable + 10) {
            const blot = Quill.find(child);
            if (blot) {
                const idx = quill.getIndex(blot);
                const curSel = quill.getSelection();
                insertPageBreak(quill, { index: idx, length: 0 }, false, true);
                if (curSel && curSel.index >= idx) {
                    quill.setSelection(curSel.index + 1, curSel.length, Quill.sources.SILENT);
                }
                return;
            }
        }
    }
}

function updateCanvasHeight(force = false) {
    if (typeof ensureEditorHasBlock === 'function') ensureEditorHasBlock();
    const editor = document.querySelector('.ql-editor');
    if (!editor) return;
    syncPageBreakHeights();
    // Cari elemen terakhir untuk mengukur tinggi asli teks tanpa harus men-Nol-kan minHeight (yang bikin kursor hilang)
    const lastChild = editor.lastElementChild;
    let contentHeight = 0;
    if (lastChild) {
        // offsetTop sudah memasukkan padding-top (48px), kita tambahkan padding-bottom (48px) agar akurat seperti scrollHeight
        contentHeight = lastChild.offsetTop + lastChild.offsetHeight + 48;
    }
    
    // Konversi tinggi halaman ke pixel
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    // Hitung butuh berapa lembar kertas (tambah gapPx agar saat masuk gap, langsung dihitung halaman baru)
    let pagesNeeded = Math.ceil((contentHeight + gapPx) / totalPageHeightPx);
    if (pagesNeeded < 1) pagesNeeded = 1;
    
    // Kunci tinggi minimum kanvas ke kelipatan tinggi kertas agar kertas terakhir selalu digambar penuh
    const totalHeightMm = (pagesNeeded * paperConfig.height) + ((pagesNeeded - 1) * 15);
    const newMinHeight = `${totalHeightMm}mm`;
    if (editor.style.minHeight !== newMinHeight) {
        editor.style.minHeight = newMinHeight;
    }
    
    const prevPages = parseInt(editor.dataset.pagesNeeded || '0', 10);
    editor.dataset.pagesNeeded = pagesNeeded;
    // Perbarui overlay nomor halaman dan lapisan lembar kertas jika jumlah halaman berubah
    if (force || prevPages !== pagesNeeded) {
        updatePageNumbers(pagesNeeded, force);
        renderPageSheets(pagesNeeded, force);
    }
}

// Terapkan saat pertama kali jalan
applyPageSetup();

let updateCanvasRafId = null;
function scheduleUpdateCanvasHeight() {
    if (!updateCanvasRafId) {
        updateCanvasRafId = requestAnimationFrame(() => {
            checkAutoPagination();
            updateCanvasHeight();
            updateCanvasRafId = null;
        });
    }
}

// Pantau setiap kali pengguna mengetik, perbarui tinggi kertasnya secara cepat dan mulus
quill.on('text-change', (delta, oldDelta, source) => {
    scheduleUpdateCanvasHeight();
    if (source === 'user') {
        setDirty(true);
    }
});

// Ekspor PDF ke Mesin Asli
actionExport.addEventListener('click', async () => {
    if (!window.__TAURI__) {
        alert(window.t("Tauri belum aktif."));
        return;
    }

    try {
        const docName = currentDocName.endsWith('.pdf') ? currentDocName : currentDocName + '.pdf';
        // 1. Panggil dialog "Save As" bawaan OS
        const filePath = await window.__TAURI__.dialog.save({
            title: window.t('Ekspor ke PDF'),
            defaultPath: (typeof bakuExportsPath !== 'undefined' && bakuExportsPath) ? (bakuExportsPath + (bakuExportsPath.includes('\\') ? '\\' : '/') + docName) : docName,
            filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }]
        });

        // Jika user klik "Batal"
        if (!filePath) return; 

        document.body.style.cursor = 'wait';
        
        // 2. Siapkan kanvas yang akan diprint
        const editorElement = document.querySelector('.ql-editor');
        const element = document.getElementById('export-wrapper') || editorElement;
        
        // Simpan level zoom asli dan reset sementara ke 1.0 agar hasil cetak PDF tidak terdistorsi pembesaran layar
        const originalZoom = element.style.zoom;
        element.style.zoom = '1';

        // Sembunyikan sementara lapisan lembar kertas latar belakang dan penggaris agar tidak ikut tercetak di PDF
        const pageSheetsEl = document.getElementById('page-sheets-layer');
        const originalSheetsDisplay = pageSheetsEl ? pageSheetsEl.style.display : '';
        if (pageSheetsEl) pageSheetsEl.style.display = 'none';

        const originalMinHeight = editorElement.style.minHeight;
        editorElement.style.backgroundImage = 'none';
        editorElement.style.backgroundColor = '#ffffff'; // Set murni putih
        editorElement.style.minHeight = '0'; // KUNCI BUG FIX: biarkan tinggi mengikuti konten asli agar tidak terpotong 2 halaman

        // Sembunyikan sementara tanda format paragraf (pilcrow) jika aktif
        const wasShowingPilcrow = editorElement.classList.contains('show-formatting-marks');
        if (wasShowingPilcrow) {
            editorElement.classList.remove('show-formatting-marks');
        }

        // Sembunyikan sementara penggaris dan garis panduan agar tidak ikut tercetak di PDF
        const visualRulerEl = document.getElementById('visual-ruler');
        const rulerGuidelineEl = document.getElementById('ruler-guideline');
        const originalRulerDisplay = visualRulerEl ? visualRulerEl.style.display : '';
        const originalGuideDisplay = rulerGuidelineEl ? rulerGuidelineEl.style.display : '';
        if (visualRulerEl) visualRulerEl.style.display = 'none';
        if (rulerGuidelineEl) rulerGuidelineEl.style.display = 'none';

        const opt = {
            margin:       0, 
            filename:     docName,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: paperConfig.format, orientation: 'portrait' }
        };

        let pdfString;
        try {
            // 3. Konversi ke PDF dan dapatkan ArrayBuffer
            const worker = html2pdf().set(opt).from(element);
            pdfString = await worker.output('datauristring'); // pakai data URI string karena lebih stabil
        } finally {
            // Kembalikan tampilan layar asli
            if (wasShowingPilcrow) {
                editorElement.classList.add('show-formatting-marks');
            }
            editorElement.style.backgroundImage = 'none';
            editorElement.style.backgroundColor = 'transparent';
            editorElement.style.minHeight = originalMinHeight;
            element.style.zoom = originalZoom;
            if (pageSheetsEl) pageSheetsEl.style.display = originalSheetsDisplay;
            if (visualRulerEl) visualRulerEl.style.display = originalRulerDisplay;
            if (rulerGuidelineEl) rulerGuidelineEl.style.display = originalGuideDisplay;
        }

        // 4. Ubah ke ArrayBuffer dan tulis ke Disk menggunakan mesin Tauri
        const base64Data = pdfString.split(',')[1];
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        await window.__TAURI__.fs.writeBinaryFile(filePath, bytes);

        document.body.style.cursor = 'default';
        
        // Tampilkan Modal Ekspor Kustom!
        const modalSuccess = document.getElementById('modal-export-success');
        const modalPathInfo = document.getElementById('modal-export-path');
        modalPathInfo.textContent = filePath;
        modalSuccess.dataset.filepath = filePath; // Simpan path untuk tombol aksi
        modalSuccess.style.display = 'flex';
        modalSuccess.classList.remove('hidden');

    } catch (e) {
        document.body.style.cursor = 'default';
        console.error(e);
        alert(window.t('Gagal mengekspor: ') + e);
    }
});

// === PUSAT CETAK KUSTOM (PRINT HUB ALA MICROSOFT WORD) ===
let printCurrentPage = 1;
let printTotalPages = 1;
let printZoom = 0.85;
let isPrintingJobActive = false;
let printCancelRequested = false;

function actionPrint() {
    openPrintView();
}

async function openPrintView() {
    const viewPrint = document.getElementById('view-print');
    const viewEditor = document.getElementById('view-editor');
    if (!viewPrint || !viewEditor) return;

    if (typeof updateCanvasHeight === 'function') updateCanvasHeight();

    const editorEl = document.querySelector('.ql-editor');
    printTotalPages = parseInt(editorEl?.dataset?.pagesNeeded || '1') || 1;
    printCurrentPage = 1;
    printZoom = 0.85;

    // Perbarui info kertas & orientasi
    const infoPaper = document.getElementById('print-info-paper');
    if (infoPaper) {
        infoPaper.textContent = document.getElementById('input-paper-size')?.value || 'A4';
    }
    const infoOrientation = document.getElementById('print-info-orientation');
    if (infoOrientation) {
        const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
        const isLandscape = paperConfig.width > paperConfig.height;
        infoOrientation.textContent = isLandscape ? (isEn ? 'Landscape' : 'Lanskap') : (isEn ? 'Portrait' : 'Potret');
    }

    // Reset nilai kontrol
    const inputCopies = document.getElementById('input-print-copies');
    if (inputCopies) inputCopies.value = '1';
    const selectRange = document.getElementById('select-print-range');
    if (selectRange) selectRange.value = 'all';
    const customRangeContainer = document.getElementById('print-custom-range-container');
    if (customRangeContainer) customRangeContainer.style.display = 'none';
    const inputCustomRange = document.getElementById('input-print-page-range');
    if (inputCustomRange) inputCustomRange.value = '';
    const selectColor = document.getElementById('select-print-color');
    if (selectColor) selectColor.value = 'color';
    const zoomSlider = document.getElementById('input-print-zoom');
    if (zoomSlider) zoomSlider.value = '85';
    const zoomVal = document.getElementById('print-zoom-val');
    if (zoomVal) zoomVal.textContent = '85%';

    // Sembunyikan status cetak jika ada
    const progressContainer = document.getElementById('print-progress-container');
    if (progressContainer) progressContainer.style.display = 'none';
    const simulationSlot = document.getElementById('printer-simulation-slot');
    if (simulationSlot) {
        simulationSlot.classList.remove('printer-slot-visible');
        simulationSlot.classList.add('printer-slot-hidden');
    }

    // Aktifkan tampilan cetak
    viewEditor.classList.remove('active');
    viewPrint.classList.add('active');

    // Muat daftar printer & render lembar pratinjau
    loadSystemPrinters();
    renderPrintPreviewPage(printCurrentPage);
    updatePrintNavigation();
}

function closePrintView() {
    if (isPrintingJobActive) {
        const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
        const msg = isEn ? 'A printing job is currently in progress. Cancel job and leave?' : 'Pencetakan sedang berlangsung. Batalkan dan keluar?';
        if (!confirm(msg)) return;
        printCancelRequested = true;
    }
    const viewPrint = document.getElementById('view-print');
    const viewEditor = document.getElementById('view-editor');
    if (viewPrint) viewPrint.classList.remove('active');
    if (viewEditor) viewEditor.classList.add('active');
    if (typeof quill !== 'undefined' && quill.focus) {
        quill.focus();
    }
}

async function loadSystemPrinters() {
    const select = document.getElementById('select-printer');
    if (!select) return;

    const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
    select.innerHTML = `<option value="">${isEn ? 'Scanning printers...' : 'Memindai printer...'}</option>`;

    let printers = [];
    if (window.__TAURI__ && window.__TAURI__.invoke) {
        try {
            printers = await window.__TAURI__.invoke('get_system_printers');
        } catch (err) {
            console.warn('Gagal membaca printer via Tauri:', err);
        }
    }

    if (!printers || printers.length === 0) {
        printers = [{
            name: 'Baku PDF (Simpan ke PDF)',
            is_default: true,
            status: 'ready'
        }];
    }

    select.innerHTML = '';
    let selectedIndex = 0;
    printers.forEach((p, idx) => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name + (p.is_default ? ` (${isEn ? 'Default' : 'Bawaan'})` : '');
        opt.dataset.status = p.status;
        select.appendChild(opt);
        if (p.is_default) selectedIndex = idx;
    });

    select.selectedIndex = selectedIndex;
    updatePrinterStatusDisplay();
}

function updatePrinterStatusDisplay() {
    const select = document.getElementById('select-printer');
    const statusText = document.getElementById('printer-status-text');
    const statusDot = document.getElementById('printer-status-dot');
    if (!select || !statusText || !statusDot) return;

    const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
    const selectedOption = select.options[select.selectedIndex];
    const status = selectedOption?.dataset?.status || 'ready';

    if (status === 'ready') {
        statusDot.className = 'printer-status-dot dot-ready';
        statusText.textContent = isEn ? 'Ready' : 'Siap';
    } else {
        statusDot.className = 'printer-status-dot dot-offline';
        statusText.textContent = isEn ? 'Offline' : 'Tidak Terhubung';
    }
}

function renderPrintPreviewPage(pageIndex) {
    const sheet = document.getElementById('print-preview-sheet');
    const sheetWrapper = document.getElementById('print-preview-sheet-wrapper');
    const editor = document.querySelector('.ql-editor');
    if (!sheet || !sheetWrapper || !editor) return;

    sheet.style.width = `${paperConfig.width}mm`;
    sheet.style.height = `${paperConfig.height}mm`;
    sheet.style.padding = `${paperConfig.marginTop}mm ${paperConfig.marginRight}mm ${paperConfig.marginBottom}mm ${paperConfig.marginLeft}mm`;
    sheetWrapper.style.transform = `scale(${printZoom})`;

    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    const pIdx = Math.max(0, pageIndex - 1);
    const topOffsetPx = -(pIdx * totalPageHeightPx);

    sheet.innerHTML = '';
    const contentClone = document.createElement('div');
    contentClone.className = 'ql-editor';
    contentClone.style.background = 'transparent';
    contentClone.style.border = 'none';
    contentClone.style.boxShadow = 'none';
    contentClone.style.padding = '0';
    contentClone.style.margin = '0';
    contentClone.style.position = 'relative';
    contentClone.style.top = `${topOffsetPx}px`;
    contentClone.style.pointerEvents = 'none';
    contentClone.innerHTML = editor.innerHTML;

    const overlaysToClean = contentClone.querySelectorAll('.resizer-handle, #search-highlight-box, #table-mini-btn, .image-floating-tools');
    overlaysToClean.forEach(el => el.remove());

    sheet.appendChild(contentClone);

    const selectColor = document.getElementById('select-print-color');
    if (selectColor && selectColor.value === 'grayscale') {
        sheet.classList.add('preview-grayscale');
    } else {
        sheet.classList.remove('preview-grayscale');
    }
}

function updatePrintNavigation() {
    const indicator = document.getElementById('print-page-indicator');
    const btnPrev = document.getElementById('btn-print-prev-page');
    const btnNext = document.getElementById('btn-print-next-page');
    if (indicator) {
        const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
        indicator.textContent = isEn 
            ? `Page ${printCurrentPage} of ${printTotalPages}`
            : `Halaman ${printCurrentPage} dari ${printTotalPages}`;
    }
    if (btnPrev) btnPrev.disabled = printCurrentPage <= 1;
    if (btnNext) btnNext.disabled = printCurrentPage >= printTotalPages;
}

function parsePageRangeString(str, maxPages) {
    const result = new Set();
    const parts = str.split(',');
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
            const [startStr, endStr] = trimmed.split('-');
            const start = parseInt(startStr);
            const end = parseInt(endStr);
            if (!isNaN(start) && !isNaN(end)) {
                for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
                    if (i >= 1 && i <= maxPages) result.add(i);
                }
            }
        } else {
            const num = parseInt(trimmed);
            if (!isNaN(num) && num >= 1 && num <= maxPages) {
                result.add(num);
            }
        }
    }
    return Array.from(result).sort((a, b) => a - b);
}

async function startPrintingProcess() {
    if (isPrintingJobActive) return;

    const selectPrinter = document.getElementById('select-printer');
    const printerName = selectPrinter ? selectPrinter.value : 'Baku PDF (Simpan ke PDF)';
    const inputCopies = document.getElementById('input-print-copies');
    const copies = Math.max(1, parseInt(inputCopies?.value || '1') || 1);

    const selectRange = document.getElementById('select-print-range')?.value || 'all';
    let pagesToPrint = [];
    if (selectRange === 'all') {
        for (let i = 1; i <= printTotalPages; i++) pagesToPrint.push(i);
    } else if (selectRange === 'current') {
        pagesToPrint = [printCurrentPage];
    } else if (selectRange === 'custom') {
        const customInput = document.getElementById('input-print-page-range')?.value || '';
        pagesToPrint = parsePageRangeString(customInput, printTotalPages);
        if (pagesToPrint.length === 0) {
            const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
            alert(isEn ? 'Invalid page range specified. Example: 1-3, 5' : 'Rentang halaman tidak valid. Contoh: 1-3, 5');
            return;
        }
    }

    isPrintingJobActive = true;
    printCancelRequested = false;

    const btnStart = document.getElementById('btn-start-print');
    const btnBack = document.getElementById('btn-back-from-print');
    if (btnStart) btnStart.disabled = true;
    if (btnBack) btnBack.disabled = true;

    const simulationSlot = document.getElementById('printer-simulation-slot');
    if (simulationSlot) {
        simulationSlot.classList.remove('printer-slot-hidden');
        simulationSlot.classList.add('printer-slot-visible');
    }

    const progressContainer = document.getElementById('print-progress-container');
    const progressText = document.getElementById('print-progress-text');
    const progressBar = document.getElementById('print-progress-bar');
    const btnCancel = document.getElementById('btn-cancel-print-job');
    if (progressContainer) progressContainer.style.display = 'flex';
    if (btnCancel) btnCancel.disabled = false;

    const sheet = document.getElementById('print-preview-sheet');
    const beam = document.getElementById('print-head-beam');
    const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';

    for (let i = 0; i < pagesToPrint.length; i++) {
        if (printCancelRequested) break;

        const p = pagesToPrint[i];
        printCurrentPage = p;
        renderPrintPreviewPage(p);
        updatePrintNavigation();

        if (progressText) {
            progressText.textContent = isEn 
                ? `Printing Page ${i + 1} of ${pagesToPrint.length}...`
                : `Mencetak Halaman ${i + 1} dari ${pagesToPrint.length}...`;
        }
        if (progressBar) {
            progressBar.style.width = Math.round(((i) / pagesToPrint.length) * 100) + '%';
        }

        if (sheet) {
            sheet.classList.remove('animating-paper-feed');
            void sheet.offsetWidth;
            sheet.classList.add('animating-paper-feed');
        }
        if (beam) {
            beam.classList.remove('print-beam-hidden');
            beam.classList.remove('print-beam-active');
            void beam.offsetWidth;
            beam.classList.add('print-beam-active');
        }

        await new Promise(r => setTimeout(r, 2400));

        if (progressBar) {
            progressBar.style.width = Math.round(((i + 1) / pagesToPrint.length) * 100) + '%';
        }
    }

    if (beam) {
        beam.classList.remove('print-beam-active');
        beam.classList.add('print-beam-hidden');
    }
    if (sheet) {
        sheet.classList.remove('animating-paper-feed');
    }
    if (simulationSlot) {
        simulationSlot.classList.remove('printer-slot-visible');
        simulationSlot.classList.add('printer-slot-hidden');
    }

    if (printCancelRequested) {
        if (progressText) {
            progressText.textContent = isEn ? 'Printing cancelled.' : 'Pencetakan dibatalkan.';
        }
    } else {
        if (window.__TAURI__ && window.__TAURI__.invoke) {
            try {
                await window.__TAURI__.invoke('send_to_printer', {
                    printerName: printerName,
                    copies: copies
                });
            } catch (err) {
                console.warn('Gagal memanggil send_to_printer:', err);
            }
        }
        if (progressText) {
            progressText.textContent = isEn 
                ? 'Document successfully sent to printer.'
                : 'Dokumen berhasil dikirim ke printer.';
        }
    }

    await new Promise(r => setTimeout(r, 1200));
    if (progressContainer) progressContainer.style.display = 'none';
    if (btnStart) btnStart.disabled = false;
    if (btnBack) btnBack.disabled = false;
    isPrintingJobActive = false;
    printCancelRequested = false;
}

// Event Listeners Pusat Cetak (Print Hub)
if (btnActionPrint) {
    btnActionPrint.addEventListener('click', actionPrint);
}

const btnBackFromPrint = document.getElementById('btn-back-from-print');
if (btnBackFromPrint) {
    btnBackFromPrint.addEventListener('click', closePrintView);
}

const btnStartPrint = document.getElementById('btn-start-print');
if (btnStartPrint) {
    btnStartPrint.addEventListener('click', startPrintingProcess);
}

const btnCancelPrintJob = document.getElementById('btn-cancel-print-job');
if (btnCancelPrintJob) {
    btnCancelPrintJob.addEventListener('click', () => {
        printCancelRequested = true;
        btnCancelPrintJob.disabled = true;
    });
}

const btnRefreshPrinters = document.getElementById('btn-refresh-printers');
if (btnRefreshPrinters) {
    btnRefreshPrinters.addEventListener('click', loadSystemPrinters);
}

const selectPrinter = document.getElementById('select-printer');
if (selectPrinter) {
    selectPrinter.addEventListener('change', updatePrinterStatusDisplay);
}

const btnCopiesDec = document.getElementById('btn-copies-dec');
const btnCopiesInc = document.getElementById('btn-copies-inc');
const inputPrintCopies = document.getElementById('input-print-copies');
if (btnCopiesDec && inputPrintCopies) {
    btnCopiesDec.addEventListener('click', () => {
        let val = parseInt(inputPrintCopies.value) || 1;
        if (val > 1) inputPrintCopies.value = (val - 1).toString();
    });
}
if (btnCopiesInc && inputPrintCopies) {
    btnCopiesInc.addEventListener('click', () => {
        let val = parseInt(inputPrintCopies.value) || 1;
        if (val < 99) inputPrintCopies.value = (val + 1).toString();
    });
}

const selectPrintRange = document.getElementById('select-print-range');
const printCustomRangeContainer = document.getElementById('print-custom-range-container');
if (selectPrintRange && printCustomRangeContainer) {
    selectPrintRange.addEventListener('change', (e) => {
        printCustomRangeContainer.style.display = e.target.value === 'custom' ? 'flex' : 'none';
    });
}

const selectPrintColor = document.getElementById('select-print-color');
if (selectPrintColor) {
    selectPrintColor.addEventListener('change', () => {
        renderPrintPreviewPage(printCurrentPage);
    });
}

const btnPrintPrevPage = document.getElementById('btn-print-prev-page');
const btnPrintNextPage = document.getElementById('btn-print-next-page');
if (btnPrintPrevPage) {
    btnPrintPrevPage.addEventListener('click', () => {
        if (printCurrentPage > 1) {
            printCurrentPage--;
            renderPrintPreviewPage(printCurrentPage);
            updatePrintNavigation();
        }
    });
}
if (btnPrintNextPage) {
    btnPrintNextPage.addEventListener('click', () => {
        if (printCurrentPage < printTotalPages) {
            printCurrentPage++;
            renderPrintPreviewPage(printCurrentPage);
            updatePrintNavigation();
        }
    });
}

const inputPrintZoom = document.getElementById('input-print-zoom');
const printZoomVal = document.getElementById('print-zoom-val');
const printPreviewSheetWrapper = document.getElementById('print-preview-sheet-wrapper');
if (inputPrintZoom) {
    inputPrintZoom.addEventListener('input', (e) => {
        const val = parseInt(e.target.value) || 85;
        printZoom = val / 100;
        if (printZoomVal) printZoomVal.textContent = `${val}%`;
        if (printPreviewSheetWrapper) {
            printPreviewSheetWrapper.style.transform = `scale(${printZoom})`;
        }
    });
}

// --- MENU EDIT & PAPAN KLIP (CLIPBOARD) ---
document.getElementById('action-undo')?.addEventListener('click', () => quill.history.undo());
document.getElementById('action-redo')?.addEventListener('click', () => quill.history.redo());

function executeCut() {
    quill.focus();
    const range = quill.getSelection() || lastSelection;
    if (range && range.length > 0) {
        const text = quill.getText(range.index, range.length);
        if (window.__TAURI__?.clipboard?.writeText) {
            try {
                window.__TAURI__.clipboard.writeText(text);
                quill.deleteText(range.index, range.length, 'user');
                return;
            } catch (e) {}
        }
    }
    try { document.execCommand('cut'); } catch (e) {}
}

function executeCopy() {
    quill.focus();
    const range = quill.getSelection() || lastSelection;
    if (range && range.length > 0) {
        const text = quill.getText(range.index, range.length);
        if (window.__TAURI__?.clipboard?.writeText) {
            try {
                window.__TAURI__.clipboard.writeText(text);
                return;
            } catch (e) {}
        }
    }
    try { document.execCommand('copy'); } catch (e) {}
}

async function executePaste(isPlainText = false) {
    quill.focus();
    const range = quill.getSelection(true) || lastSelection || { index: 0, length: 0 };

    if (isPlainText) {
        let text = null;
        if (window.__TAURI__?.clipboard?.readText) {
            try { text = await window.__TAURI__.clipboard.readText(); } catch (e) {}
        }
        if (!text && navigator.clipboard?.readText) {
            try { text = await navigator.clipboard.readText(); } catch (e) {}
        }
        if (text) {
            if (range.length > 0) {
                quill.deleteText(range.index, range.length);
            }
            quill.insertText(range.index, text, 'user');
            quill.setSelection(range.index + text.length, 0);
            return;
        }
        try { document.execCommand('paste'); } catch (e) {}
        return;
    }

    // Tempel format asli (HTML jika tersedia via browser clipboard)
    let htmlContent = null;
    if (navigator.clipboard?.read) {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types.includes('text/html')) {
                    const blob = await item.getType('text/html');
                    const html = await blob.text();
                    if (html) {
                        htmlContent = html;
                        break;
                    }
                }
            }
        } catch (e) {
            // WebKit membatasi izin pembacaan HTML di WKWebView, lanjut ke native clipboard
        }
    }

    if (htmlContent) {
        if (range.length > 0) {
            quill.deleteText(range.index, range.length);
        }
        quill.clipboard.dangerouslyPasteHTML(range.index, htmlContent, 'user');
        return;
    }

    // Ambil plain text dari Tauri native desktop clipboard API (tidak memicu dialog izin)
    let text = null;
    if (window.__TAURI__?.clipboard?.readText) {
        try { text = await window.__TAURI__.clipboard.readText(); } catch (e) {}
    }
    if (!text && navigator.clipboard?.readText) {
        try { text = await navigator.clipboard.readText(); } catch (e) {}
    }

    if (text) {
        if (range.length > 0) {
            quill.deleteText(range.index, range.length);
        }
        quill.insertText(range.index, text, 'user');
        quill.setSelection(range.index + text.length, 0);
        return;
    }

    try {
        document.execCommand('paste');
    } catch (e) {}
}

// Hubungkan tombol Menu Bar dan Ribbon Tab Beranda
document.getElementById('action-cut')?.addEventListener('click', executeCut);
document.getElementById('action-copy')?.addEventListener('click', executeCopy);
document.getElementById('action-paste')?.addEventListener('click', () => executePaste(false));

document.getElementById('btn-ribbon-cut')?.addEventListener('click', executeCut);
document.getElementById('btn-ribbon-copy')?.addEventListener('click', executeCopy);
document.getElementById('btn-ribbon-paste-main')?.addEventListener('click', () => executePaste(false));

const btnRibbonPasteArrow = document.getElementById('btn-ribbon-paste-arrow');
const popoverPasteOptions = document.getElementById('popover-paste-options');

if (btnRibbonPasteArrow && popoverPasteOptions) {
    btnRibbonPasteArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('dropdown-font-size-menu')?.classList.add('hidden');
        document.getElementById('popover-font-color')?.classList.add('hidden');
        document.getElementById('popover-highlight-color')?.classList.add('hidden');
        document.getElementById('popover-home-lineheight')?.classList.add('hidden');
        document.getElementById('popover-change-case')?.classList.add('hidden');
        document.getElementById('popover-styles-gallery')?.classList.add('hidden');
        popoverPasteOptions.classList.toggle('hidden');
    });
}

document.getElementById('btn-paste-normal')?.addEventListener('click', () => {
    executePaste(false);
    popoverPasteOptions?.classList.add('hidden');
});

document.getElementById('btn-paste-plain')?.addEventListener('click', () => {
    executePaste(true);
    popoverPasteOptions?.classList.add('hidden');
});

// Fungsi bantuan untuk aksi Sisipkan (Insert)
function triggerImageUpload() {
    let imageFileInput = document.getElementById('baku-file-input-image');
    if (!imageFileInput) {
        imageFileInput = document.createElement('input');
        imageFileInput.id = 'baku-file-input-image';
        imageFileInput.type = 'file';
        imageFileInput.accept = 'image/*';
        imageFileInput.style.display = 'none';
        document.body.appendChild(imageFileInput);
        imageFileInput.addEventListener('change', () => {
            if (imageFileInput.files && imageFileInput.files[0]) {
                const file = imageFileInput.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    let curRange = quill.getSelection() || lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
                    quill.focus();
                    const insertIndex = curRange.index;
                    quill.insertEmbed(insertIndex, 'image', e.target.result, 'user');
                    // Tambahkan baris baru agar kursor ketik teks tidak menempel pada gambar
                    quill.insertText(insertIndex + 1, '\n', 'user');
                    quill.setSelection(insertIndex + 2, 0, 'user');
                    setDirty(true);
                    imageFileInput.value = '';

                    // Buka overlay seleksi pada gambar baru
                    setTimeout(() => {
                        const [leaf] = quill.getLeaf(insertIndex) || [];
                        if (leaf && leaf.domNode && leaf.domNode.tagName === 'IMG') {
                            currentSelectedImage = leaf.domNode;
                            imageOverlay.classList.remove('hidden');
                            updateOverlayPosition();
                        }
                    }, 60);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    imageFileInput.click();
}

let currentLinkRange = { index: 0, length: 0 };

function triggerInsertLink() {
    let range = quill.getSelection();
    if (!range) {
        range = lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
    }
    currentLinkRange = { index: range.index, length: range.length };

    const modalLink = document.getElementById('modal-link-overlay');
    const inputUrl = document.getElementById('input-link-url');
    const inputText = document.getElementById('input-link-text');
    const titleEl = document.getElementById('modal-link-title');
    const btnRemove = document.getElementById('btn-remove-link');

    if (!modalLink || !inputUrl || !inputText) return;

    // Ambil format link saat ini jika ada
    const formats = quill.getFormat(range);
    const existingLink = formats.link || '';
    
    // Ambil teks yang sedang diseleksi jika ada
    let selectedText = '';
    if (range.length > 0) {
        selectedText = quill.getText(range.index, range.length).replace(/\n/g, ' ').trim();
    } else if (existingLink) {
        // Jika kursor berada di dalam tautan tanpa seleksi, deteksi keseluruhan tautan
        try {
            const [leaf] = quill.getLeaf(range.index);
            if (leaf) {
                const leafIndex = quill.getIndex(leaf);
                const leafLength = leaf.length();
                currentLinkRange = { index: leafIndex, length: leafLength };
                selectedText = quill.getText(leafIndex, leafLength).replace(/\n/g, ' ').trim();
            }
        } catch (e) {
            console.warn("Gagal mendeteksi batas tautan:", e);
        }
    }

    if (existingLink) {
        if (titleEl) titleEl.textContent = window.t('Edit Tautan') || 'Edit Tautan';
        if (btnRemove) btnRemove.style.display = 'inline-block';
        inputUrl.value = existingLink;
        inputText.value = selectedText || existingLink;
    } else {
        if (titleEl) titleEl.textContent = window.t('Sisipkan Tautan') || 'Sisipkan Tautan';
        if (btnRemove) btnRemove.style.display = 'none';
        inputUrl.value = 'https://';
        inputText.value = selectedText;
    }

    modalLink.classList.remove('hidden');
    modalLink.style.display = 'flex';

    setTimeout(() => {
        if (selectedText) {
            inputUrl.focus();
            inputUrl.select();
        } else {
            inputText.focus();
            inputText.select();
        }
    }, 50);
}

function closeLinkModal() {
    const modalLink = document.getElementById('modal-link-overlay');
    if (modalLink) {
        modalLink.style.display = 'none';
        modalLink.classList.add('hidden');
    }
}

function applyLinkModal() {
    const inputUrl = document.getElementById('input-link-url');
    const inputText = document.getElementById('input-link-text');
    if (!inputUrl || !inputText) return;

    let rawUrl = (inputUrl.value || '').trim();
    const rawText = (inputText.value || '').trim();

    closeLinkModal();

    if (!rawUrl || rawUrl === 'https://' || rawUrl === 'http://') {
        if (currentLinkRange.length > 0) {
            quill.setSelection(currentLinkRange.index, currentLinkRange.length);
            quill.format('link', false, 'user');
            setDirty(true);
        }
        quill.focus();
        return;
    }

    // Normalisasi awalan skema URL
    if (!/^https?:\/\//i.test(rawUrl) && !/^mailto:/i.test(rawUrl) && !/^tel:/i.test(rawUrl) && !/^#/i.test(rawUrl)) {
        rawUrl = 'https://' + rawUrl;
    }

    quill.focus();

    if (currentLinkRange.length > 0) {
        const originalText = quill.getText(currentLinkRange.index, currentLinkRange.length);
        if (rawText && rawText !== originalText) {
            quill.deleteText(currentLinkRange.index, currentLinkRange.length, 'user');
            quill.insertText(currentLinkRange.index, rawText, 'link', rawUrl, 'user');
            quill.setSelection(currentLinkRange.index + rawText.length, 0);
        } else {
            quill.setSelection(currentLinkRange.index, currentLinkRange.length);
            quill.format('link', rawUrl, 'user');
        }
    } else {
        const textToInsert = rawText || rawUrl;
        quill.insertText(currentLinkRange.index, textToInsert, 'link', rawUrl, 'user');
        quill.setSelection(currentLinkRange.index + textToInsert.length, 0);
    }

    setDirty(true);
    quill.focus();
}

function removeLinkModal() {
    closeLinkModal();
    if (currentLinkRange.length > 0) {
        quill.setSelection(currentLinkRange.index, currentLinkRange.length);
        quill.format('link', false, 'user');
        setDirty(true);
    }
    quill.focus();
}

// Pasang event listener modal tautan
document.getElementById('btn-confirm-link')?.addEventListener('click', applyLinkModal);
document.getElementById('btn-cancel-link')?.addEventListener('click', closeLinkModal);
document.getElementById('btn-remove-link')?.addEventListener('click', removeLinkModal);

document.getElementById('input-link-url')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        applyLinkModal();
    }
});

document.getElementById('input-link-text')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        applyLinkModal();
    }
});

document.getElementById('modal-link-overlay')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-link-overlay')) {
        closeLinkModal();
    }
});

// Izinkan membuka tautan eksternal dengan menahan tombol Ctrl/Cmd saat mengeklik link di naskah
quill.root.addEventListener('click', (e) => {
    const linkEl = e.target.closest('a');
    if (linkEl && linkEl.href) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const href = linkEl.getAttribute('href');
            if (href) {
                if (window.__TAURI__?.shell?.open) {
                    window.__TAURI__.shell.open(href);
                } else {
                    window.open(href, '_blank');
                }
            }
        }
    }
});

function triggerToggleQuote() {
    let range = quill.getSelection();
    if (!range) {
        range = lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
        quill.setSelection(range.index, range.length);
    }
    quill.focus();
    const formats = quill.getFormat(range);
    quill.format('blockquote', !formats.blockquote, 'user');
    setDirty(true);
}

function triggerToggleCodeBlock() {
    let range = quill.getSelection();
    if (!range) {
        range = lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
        quill.setSelection(range.index, range.length);
    }
    quill.focus();
    const formats = quill.getFormat(range);
    quill.format('code-block', !formats['code-block'], 'user');
    setDirty(true);
}

// Menu Sisipkan (Native-like menu actions)
const actionInsertImage = document.getElementById('action-insert-image');
if (actionInsertImage) {
    actionInsertImage.addEventListener('click', () => {
        triggerImageUpload();
    });
}
const actionInsertTable = document.getElementById('action-insert-table');
if (actionInsertTable) {
    actionInsertTable.addEventListener('click', () => {
        document.getElementById('btn-insert-table')?.click();
    });
}
const actionInsertLink = document.getElementById('action-insert-link');
if (actionInsertLink) {
    actionInsertLink.addEventListener('click', () => {
        triggerInsertLink();
    });
}

// --- MENU TAMPILAN (ZOOM KANVAS) ---
// currentZoom telah dideklarasikan di awal file
const canvasArea = document.getElementById('canvas-area');
const quillContainer = document.getElementById('quill-container');
const exportWrapper = document.getElementById('export-wrapper');

function applyZoom() {
    // Menerapkan CSS zoom pada #export-wrapper agar seluruh kanvas kertas membesar secara fisik,
    // lebar kertas bertambah di layar, dan seluruh overlay (nomor halaman, header/footer) terskala proporsional.
    const wrapper = exportWrapper || document.getElementById('export-wrapper');
    if (wrapper) {
        wrapper.style.zoom = currentZoom;
    }
    if (quillContainer) {
        quillContainer.style.zoom = ''; // Bersihkan zoom anak agar tidak terjadi double-scaling
    }
    if (typeof updateStatusBar === 'function') updateStatusBar();
    if (typeof updateOverlayPosition === 'function' && typeof currentSelectedImage !== 'undefined' && currentSelectedImage) {
        updateOverlayPosition();
    }
    const tMini = document.getElementById('table-mini-btn');
    if (tMini) tMini.style.display = 'none';
    const tBar = document.getElementById('table-floating-toolbar');
    if (tBar) tBar.style.display = 'none';
    if (typeof syncRulerPosition === 'function') syncRulerPosition();
    if (typeof renderVisualRuler === 'function') renderVisualRuler();
}

document.getElementById('action-zoom-in').addEventListener('click', () => {
    currentZoom = Math.min(3.0, Math.round((currentZoom + 0.1) * 10) / 10);
    applyZoom();
});
document.getElementById('action-zoom-out').addEventListener('click', () => {
    if (currentZoom > 0.5) {
        currentZoom = Math.max(0.5, Math.round((currentZoom - 0.1) * 10) / 10);
        applyZoom();
    }
});
document.getElementById('action-zoom-reset').addEventListener('click', () => {
    currentZoom = 1.0;
    applyZoom();
});


// --- MOUSE WHEEL SHORTCUTS (ZOOM TO POINTER & HORIZONTAL SCROLL) ---
canvasArea.addEventListener('wheel', (e) => {
    // Ctrl / Cmd + Scroll (atau Trackpad pinch) = Zoom In/Out ke Titik Kursor Mouse
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); 
        
        const oldZoom = currentZoom;
        if (e.deltaY < 0) {
            currentZoom = Math.min(3.0, Math.round((currentZoom + 0.1) * 10) / 10);
        } else if (e.deltaY > 0) {
            currentZoom = Math.max(0.5, Math.round((currentZoom - 0.1) * 10) / 10);
        }

        // Hitung rasio perubahan
        const ratio = currentZoom / oldZoom;

        // Ambil koordinat mouse relatif terhadap layar scroll
        const rect = canvasArea.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Kalkulasi posisi titik yang sedang ditunjuk mouse di dalam kanvas
        const absX = canvasArea.scrollLeft + mouseX;
        const absY = canvasArea.scrollTop + mouseY;

        // Terapkan zoom fisik
        applyZoom();

        // Pindahkan scroll bar agar titik yang sama tetap menempel di bawah kursor mouse
        canvasArea.scrollLeft = (absX * ratio) - mouseX;
        canvasArea.scrollTop = (absY * ratio) - mouseY;
        if (typeof syncRulerPosition === 'function') syncRulerPosition();

    } 
    // Shift + Scroll = Scroll Horizontal (Mendukung macOS WebKit dan Windows)
    else if (e.shiftKey) {
        e.preventDefault();
        let delta = 0;
        if (Math.abs(e.deltaX) > 0) {
            delta = e.deltaX;
        } else if (Math.abs(e.deltaY) > 0) {
            delta = e.deltaY;
        }

        // Normalisasi untuk delta bernilai kecil (seperti putaran roda per baris)
        if (Math.abs(delta) > 0 && Math.abs(delta) < 20) {
            delta = (delta > 0 ? 1 : -1) * 60;
        }

        if (delta !== 0) {
            canvasArea.scrollLeft += delta;
            if (typeof syncRulerPosition === 'function') syncRulerPosition();
        }
    }
}, { passive: false });

// --- INTERAKSI KANVAS & FOKUS OTOMATIS KE DOKUMEN ---

// Helper: Menghitung nomor halaman (0-indexed) dari posisi Y relatif pada lembar dokumen
function getPageIndexFromY(clientOrRelativeY, isClient = true) {
    const exportWrapper = document.getElementById('export-wrapper');
    if (!exportWrapper) return 0;
    const wrapRect = exportWrapper.getBoundingClientRect();
    const zoom = (typeof currentZoom !== 'undefined' && currentZoom > 0) ? currentZoom : 1.0;
    const relativeY = isClient ? ((clientOrRelativeY - wrapRect.top) / zoom) : clientOrRelativeY;
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    return Math.max(0, Math.floor(relativeY / totalPageHeightPx));
}

// Helper: Mencari indeks posisi kursor terbaik pada halaman tertentu
function findBestSelectionForPage(targetPage, clickRelativeY) {
    ensureEditorHasBlock();
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    const pageTop = targetPage * totalPageHeightPx;
    const pageBottom = pageTop + pageHeightPx;

    const lines = quill.getLines();
    if (!lines || lines.length === 0) return 0;

    let bestIndex = null;
    let closestDist = Infinity;
    let lastLineOnPage = null;
    let firstLineOnPage = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const idx = quill.getIndex(line);
        const bounds = quill.getBounds(idx);
        if (!bounds) continue;

        if (bounds.top >= pageTop - 20 && bounds.top <= pageBottom + 20) {
            if (firstLineOnPage === null) firstLineOnPage = { line, idx, bounds };
            lastLineOnPage = { line, idx, bounds };

            const targetY = (clickRelativeY !== undefined) ? clickRelativeY : pageTop;
            const dist = Math.abs(bounds.top - targetY);
            if (dist < closestDist) {
                closestDist = dist;
                bestIndex = idx;
            }
        }
    }

    // Jika pengguna mengklik di bawah baris teks terakhir pada halaman tersebut,
    // tempatkan kursor di akhir baris terakhir halaman itu (sebelum break)
    if (lastLineOnPage && clickRelativeY !== undefined && clickRelativeY > (lastLineOnPage.bounds.top + lastLineOnPage.bounds.height / 2)) {
        const lineLen = lastLineOnPage.line.length ? lastLineOnPage.line.length() : 1;
        return Math.max(0, lastLineOnPage.idx + Math.max(0, lineLen - 1));
    }

    if (bestIndex !== null) {
        return bestIndex;
    }

    // Jika tidak ada baris teks di halaman tersebut, cari blot pemisah halaman (pageBreak/sectionBreak)
    const breaks = Array.from(document.querySelectorAll('.page-break-element'));
    for (const b of breaks) {
        if (b.offsetTop >= pageTop - 20 && b.offsetTop <= pageBottom + 20) {
            const blot = Quill.find(b);
            if (blot) {
                return Math.max(0, quill.getIndex(blot));
            }
        }
    }

    if (targetPage === 0) return 0;
    return Math.max(0, quill.getLength() - 1);
}

if (canvasArea) {
    canvasArea.addEventListener('mousedown', (e) => {
        // Abaikan klik pada kontrol UI, toolbar, modal, dropdown, header/footer input, resizer
        if (e.target.closest('#image-resizer-overlay, #table-mini-btn, #table-floating-toolbar, #hf-editor-container, .modal, .dropdown-menu, .resizer-handle, button, input, select, textarea')) {
            return;
        }

        // Abaikan jika klik pada gambar (karena dikelola oleh overlay gambar)
        if (e.target.tagName === 'IMG') {
            return;
        }

        ensureEditorHasBlock();

        // 1. Jika pengguna mengeklik elemen pemisah halaman (page-break atau section-break)
        const breakEl = e.target.closest('.page-break-element');
        if (breakEl) {
            e.preventDefault();
            const blot = Quill.find(breakEl);
            if (blot) {
                const breakIdx = quill.getIndex(blot);
                quill.setSelection(Math.max(0, breakIdx), 0, Quill.sources.USER);
                quill.focus();
            }
            return;
        }

        // 2. Jika pengguna mengeklik langsung teks dalam editor (p, span, td, dll)
        if (e.target.closest('.ql-editor') && e.target !== quill.root) {
            // Biarkan Quill dan browser menangani penempatan kursor teks secara alami
            return;
        }

        // 3. Jika pengguna mengeklik area kosong kertas, margin, atau kanvas di sekitar halaman
        e.preventDefault();
        const exportWrapper = document.getElementById('export-wrapper');
        const wrapRect = exportWrapper ? exportWrapper.getBoundingClientRect() : { top: 0, left: 0 };
        const zoom = (typeof currentZoom !== 'undefined' && currentZoom > 0) ? currentZoom : 1.0;
        const clickRelativeY = (e.clientY - wrapRect.top) / zoom;
        const clickedPage = getPageIndexFromY(clickRelativeY, false);
        const targetIndex = findBestSelectionForPage(clickedPage, clickRelativeY);

        quill.setSelection(targetIndex, 0, Quill.sources.USER);
        quill.focus();
    });
}

// Auto-fokus ke editor jika pengguna mulai mengetik teks saat di tampilan editor namun belum fokus
window.addEventListener('keydown', (e) => {
    if (!viewEditor || !viewEditor.classList.contains('active')) return;
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
    }
    const openModal = document.querySelector('.modal:not(.hidden), #modal-overlay:not(.hidden), #modal-find-replace[style*="flex"]');
    if (openModal && openModal.style.display !== 'none' && !openModal.classList.contains('hidden')) return;

    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        ensureEditorHasBlock();
        quill.focus();
    }
});

// --- MEMATIKAN MENU KLIK KANAN BROWSER ---
window.addEventListener('contextmenu', (e) => {
    // Matikan menu bawaan browser agar terasa seperti aplikasi asli
    e.preventDefault(); 
    
    // Jika yang diklik kanan adalah gambar, tampilkan menu konteks gambar
    if (e.target.tagName === 'IMG') {
        const imageContextMenu = document.getElementById('image-context-menu');
        if (imageContextMenu) {
            // Karena ini murni UI Overlay, kita set display saja, 
            // posisinya sudah terikat ke overlay secara otomatis
            imageContextMenu.style.display = 'flex';
        }
    }
});

// --- CEGAH SELEKSI & COPY TEKS PADA ELEMEN ANTARMUKA (DESKTOP APP UX) ---
document.addEventListener('selectstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.ql-editor, input, textarea, select, [contenteditable="true"]')) {
        return;
    }
    e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.closest && e.target.closest('.ql-editor, input, textarea, select')) {
        return;
    }
    e.preventDefault();
});

document.addEventListener('copy', (e) => {
    const activeEl = document.activeElement;
    const isEditing = activeEl && (
        activeEl.closest('.ql-editor') ||
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.isContentEditable
    );
    if (!isEditing) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;
            const containerEl = container.nodeType === Node.ELEMENT_NODE ? container : container.parentElement;
            if (!containerEl || !containerEl.closest('.ql-editor, input, textarea, [contenteditable="true"]')) {
                e.preventDefault();
                selection.removeAllRanges();
            }
        }
    }
});

// --- MESIN PENCARI KATA (FIND & REPLACE) ---
const modalFind = document.getElementById('modal-find-replace');
const btnCloseFind = document.getElementById('btn-close-find');
const inputFind = document.getElementById('input-find');
const inputReplace = document.getElementById('input-replace');
const btnFindNext = document.getElementById('btn-find-next');
const btnFindPrev = document.getElementById('btn-find-prev');
const btnReplace = document.getElementById('btn-replace');
const btnReplaceAll = document.getElementById('btn-replace-all');
const findStatus = document.getElementById('find-status');

let searchMatches = [];
let currentMatchIndex = -1;

function performSearch() {
    const textToFind = inputFind.value;
    searchMatches = [];
    currentMatchIndex = -1;
    if (!textToFind) {
        findStatus.textContent = '';
        quill.setSelection(quill.getSelection()?.index || 0, 0);
        return;
    }

    const fullText = quill.getText();
    let index = 0;
    while (true) {
        // Case-insensitive search
        index = fullText.toLowerCase().indexOf(textToFind.toLowerCase(), index);
        if (index === -1) break;
        searchMatches.push(index);
        index += textToFind.length;
    }

    if (searchMatches.length > 0) {
        currentMatchIndex = 0;
        highlightCurrentMatch();
    } else {
        findStatus.textContent = window.t('Tidak ditemukan'); const hlBox = document.getElementById('search-highlight-box'); if(hlBox) hlBox.style.display = 'none';
    }
}

function highlightCurrentMatch() {
    const highlightBox = document.getElementById('search-highlight-box');
    if (searchMatches.length === 0 || currentMatchIndex < 0) {
        if (highlightBox) highlightBox.style.display = 'none';
        return;
    }
    const matchIndex = searchMatches[currentMatchIndex];
    const textLength = inputFind.value.length;
    
    const activeElem = document.activeElement;
    quill.setSelection(matchIndex, textLength, 'api');
    findStatus.textContent = (currentMatchIndex + 1) + window.t(' dari ') + searchMatches.length;
    
    const bounds = quill.getBounds(matchIndex, textLength);
    const canvasArea = document.getElementById('canvas-area');
    const qlEditor = document.querySelector('.ql-editor');
    if (bounds && canvasArea && qlEditor && highlightBox) {
        // Karena highlightBox berada di canvasArea, kita butuh koordinat absolutnya terhadap canvas.
        // bounds relatif terhadap .ql-editor
        const editorRect = qlEditor.getBoundingClientRect();
        const canvasRect = canvasArea.getBoundingClientRect();
        
        highlightBox.style.top = (bounds.top + (editorRect.top - canvasRect.top) + canvasArea.scrollTop) + 'px';
        highlightBox.style.left = (bounds.left + (editorRect.left - canvasRect.left) + canvasArea.scrollLeft) + 'px';
        highlightBox.style.width = bounds.width + 'px';
        highlightBox.style.height = bounds.height + 'px';
        highlightBox.style.display = 'block';
        
        canvasArea.scrollTo({
            top: bounds.top + canvasArea.scrollTop - (canvasArea.clientHeight / 2),
            behavior: 'smooth'
        });
    }
    if (activeElem && (activeElem.id === 'input-find' || activeElem.id === 'input-replace')) {
        activeElem.focus();
    }
}

inputFind.addEventListener('input', performSearch);
inputFind.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnFindNext.click();
});

btnFindNext.addEventListener('click', () => {
    if (searchMatches.length > 0) {
        currentMatchIndex = (currentMatchIndex + 1) % searchMatches.length;
        highlightCurrentMatch();
    }
});

btnFindPrev.addEventListener('click', () => {
    if (searchMatches.length > 0) {
        currentMatchIndex = (currentMatchIndex - 1 + searchMatches.length) % searchMatches.length;
        highlightCurrentMatch();
    }
});

btnReplace.addEventListener('click', () => {
    if (searchMatches.length === 0 || currentMatchIndex < 0) return;
    
    const matchIndex = searchMatches[currentMatchIndex];
    const textLength = inputFind.value.length;
    const replaceText = inputReplace.value;

    quill.deleteText(matchIndex, textLength);
    quill.insertText(matchIndex, replaceText);
    
    // Ulangi pencarian karena indeks bergeser
    performSearch();
});

btnReplaceAll.addEventListener('click', () => {
    if (searchMatches.length === 0) return;
    const textToFind = inputFind.value;
    const replaceText = inputReplace.value;
    
    let count = 0;
    // Lakukan dari belakang agar indeks tidak kacau saat ukuran string berubah
    for (let i = searchMatches.length - 1; i >= 0; i--) {
        quill.deleteText(searchMatches[i], textToFind.length);
        quill.insertText(searchMatches[i], replaceText);
        count++;
    }
    inputFind.value = '';
    performSearch();
    findStatus.textContent = count + window.t(' diganti');
});

btnCloseFind.addEventListener('click', () => {
    modalFind.style.display = 'none'; document.body.classList.remove('search-active'); const hlBox = document.getElementById('search-highlight-box'); if(hlBox) hlBox.style.display = 'none';
    quill.focus();
});

// -- LOGIKA TAB CARI & GANTI --
const tabFindOnly = document.getElementById('tab-find-only');
const tabReplaceMode = document.getElementById('tab-replace-mode');
const replaceContainer = document.getElementById('replace-fields-container');

function setFindMode(isReplaceMode) {
    if (isReplaceMode) {
        if(tabReplaceMode) {
            tabReplaceMode.style.fontWeight = '600';
            tabReplaceMode.style.color = '#0078D4';
            tabReplaceMode.style.borderBottom = '2px solid #0078D4';
        }
        if(tabFindOnly) {
            tabFindOnly.style.fontWeight = 'normal';
            tabFindOnly.style.color = '#5A6072';
            tabFindOnly.style.borderBottom = 'none';
        }
        if(replaceContainer) replaceContainer.style.display = 'flex';
    } else {
        if(tabFindOnly) {
            tabFindOnly.style.fontWeight = '600';
            tabFindOnly.style.color = '#0078D4';
            tabFindOnly.style.borderBottom = '2px solid #0078D4';
        }
        if(tabReplaceMode) {
            tabReplaceMode.style.fontWeight = 'normal';
            tabReplaceMode.style.color = '#5A6072';
            tabReplaceMode.style.borderBottom = 'none';
        }
        if(replaceContainer) replaceContainer.style.display = 'none';
    }
}

if(tabFindOnly) tabFindOnly.addEventListener('click', () => setFindMode(false));
if(tabReplaceMode) tabReplaceMode.addEventListener('click', () => setFindMode(true));

// Shortcut Ctrl+F dan Ctrl+H (Cmd+F dan Cmd+H di macOS)
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'h')) {
        e.preventDefault();
        setFindMode(e.key.toLowerCase() === 'h');
        modalFind.style.display = 'flex'; 
        document.body.classList.add('search-active');
        inputFind.focus();
        if (quill.getSelection() && quill.getSelection().length > 0) {
            inputFind.value = quill.getText(quill.getSelection().index, quill.getSelection().length);
            performSearch();
        }
    }
});


// Suntikkan gaya CSS agar Dropdown Font memunculkan gaya aslinya!
const style = document.createElement('style');
let cssText = '';
// Aturan untuk font default (jika data-value kosong atau tidak diset)
cssText += `.ql-picker.ql-font .ql-picker-label:not([data-value])::before,
.ql-picker.ql-font .ql-picker-item:not([data-value])::before {
    content: "Times New Roman" !important;
    font-family: "Times New Roman", serif !important;
}\n`;

fontList.forEach(font => {
    const genericFallback = (font === 'Times New Roman' || font === 'Georgia' || font === 'Cambria' || font === 'Palatino Linotype') ? 'serif' : (font === 'Consolas' || font === 'Courier New' || font === 'Lucida Console') ? 'monospace' : 'sans-serif';
    // Karena spasi di value Quill diubah jadi string persis, kita target CSS-nya
    cssText += `.ql-picker.ql-font .ql-picker-label[data-value="${font}"]::before,
.ql-picker.ql-font .ql-picker-item[data-value="${font}"]::before {
    content: "${font}" !important;
    font-family: "${font}", ${genericFallback} !important;
}\n`;
});
style.innerHTML = cssText;
document.head.appendChild(style);

// Suntikkan gaya CSS untuk menampilkan angka Font Size di Dropdown Quill
const sizeList = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', '24pt', '28pt', '36pt', '48pt', '72pt'];
let sizeCssText = '';
sizeList.forEach(size => {
    const num = size.replace('pt', '');
    sizeCssText += `.ql-picker.ql-size .ql-picker-label[data-value="${size}"]::before,
.ql-picker.ql-size .ql-picker-item[data-value="${size}"]::before {
    content: "${num}" !important;
}\n`;
});
const sizeStyle = document.createElement('style');
sizeStyle.innerHTML = sizeCssText;
document.head.appendChild(sizeStyle);

// Atur tulisan default "11" jika ukuran tidak ada attr value-nya (normal)
const defaultSizeStyle = document.createElement('style');
defaultSizeStyle.innerHTML = `.ql-picker.ql-size .ql-picker-label:not([data-value])::before, .ql-picker.ql-size .ql-picker-item:not([data-value])::before { content: "11" !important; }`;
document.head.appendChild(defaultSizeStyle);

// Mencegah Webview menavigasi paksa (layar hitam) saat user melempar file dari OS ke dalam aplikasi
window.addEventListener("dragover", (e) => {
    e.preventDefault();
}, false);

window.addEventListener("drop", (e) => {
    e.preventDefault();
}, false);

// Mencegah shortcut bawaan browser dan mengarahkannya ke fitur aplikasi (Mendukung macOS & Windows/Linux)
window.addEventListener('keydown', (e) => {
    // 1. Shortcut kombinasi Ctrl (Win/Linux) atau Cmd (macOS)
    if (e.ctrlKey || e.metaKey) {
        const keyLower = e.key.toLowerCase();
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        const isInputFocused = (activeTag === 'INPUT' || activeTag === 'TEXTAREA');

        // Ctrl/Cmd + Alt Shortcuts (Gaya Teks / Headings & Zoom Alternatif)
        if (e.altKey) {
            if (keyLower === '1') {
                e.preventDefault();
                quill.format('header', 1);
            } else if (keyLower === '2') {
                e.preventDefault();
                quill.format('header', 2);
            } else if (keyLower === '3') {
                e.preventDefault();
                quill.format('header', 3);
            } else if (keyLower === '0') {
                e.preventDefault();
                quill.format('header', false);
            } else if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd') {
                e.preventDefault();
                document.getElementById('action-zoom-in')?.click();
            } else if (e.key === '-' || e.code === 'NumpadSubtract') {
                e.preventDefault();
                document.getElementById('action-zoom-out')?.click();
            }
            return;
        }

        // Ctrl/Cmd + Shift Shortcuts
        if (e.shiftKey) {
            if (keyLower === 'p') {
                e.preventDefault();
                document.getElementById('action-page-setup')?.click();
            } else if (keyLower === 'i') {
                e.preventDefault();
                document.querySelector('.ql-image')?.click();
            } else if (keyLower === 't') {
                e.preventDefault();
                document.getElementById('btn-insert-table')?.click();
            } else if (keyLower === 'c') { // Salin format kuas
                e.preventDefault();
                document.getElementById('btn-format-painter')?.click();
            } else if (keyLower === 'v') { // Tempel format kuas
                e.preventDefault();
                if (typeof copiedFormat !== 'undefined' && copiedFormat) {
                    const range = quill.getSelection();
                    if (range && range.length > 0) {
                        quill.removeFormat(range.index, range.length);
                        for (const [formatName, formatValue] of Object.entries(copiedFormat)) {
                            quill.formatText(range.index, range.length, formatName, formatValue);
                        }
                    }
                }
            } else if (keyLower === 'z') { // Redo (Cmd+Shift+Z di macOS / Ctrl+Shift+Z)
                e.preventDefault();
                quill.history.redo();
            } else if (keyLower === 's') { // Simpan Sebagai (Save As)
                e.preventDefault();
                actionSaveAs();
            } else if (keyLower === 'x') { // Coret (Strikethrough)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('strike', !format.strike);
            } else if (keyLower === 'f') { // Ganti Font
                e.preventDefault();
                document.querySelector('.ql-font .ql-picker-label')?.click();
            } else if (e.key === '>' || e.key === '.') {
                e.preventDefault();
                document.getElementById('custom-btn-size-up')?.click();
            } else if (e.key === '<' || e.key === ',') {
                e.preventDefault();
                document.getElementById('custom-btn-size-down')?.click();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                insertPageBreak(quill, quill.getSelection(true), true); // Pemisah Bagian (Section Break)
            } else if (e.key === '8' || e.key === '*') {
                e.preventDefault();
                toggleFormattingMarks();
            } else if (keyLower === 'l') { // Daftar Berpoin (Word: Ctrl+Shift+L)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('list', format.list === 'bullet' ? false : 'bullet');
            } else if (keyLower === 'n' || e.key === '7' || e.key === '&') { // Daftar Bernomor
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('list', format.list === 'ordered' ? false : 'ordered');
            } else if (keyLower === 'e') {
                e.preventDefault();
                document.getElementById('action-export')?.click();
            } else if (e.key === '+' || e.key === '=' || e.code === 'Equal' || e.code === 'NumpadAdd') { // Superskrip
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('script', format.script === 'super' ? false : 'super');
            }
        } else {
            // Ctrl/Cmd murni (tanpa Shift dan tanpa Alt)
            if (keyLower === 's') {
                e.preventDefault();
                actionSave();
            } else if (keyLower === 'p') {
                e.preventDefault();
                actionPrint();
            } else if (keyLower === 'o') {
                e.preventDefault();
                actionOpen();
            } else if (keyLower === 'n') {
                e.preventDefault();
                actionNew();
            } else if (keyLower === 'k') {
                e.preventDefault();
                triggerInsertLink();
            } else if (keyLower === 'y') { // Redo (Ctrl+Y di Windows / Cmd+Y)
                e.preventDefault();
                quill.history.redo();
            } else if (keyLower === 'z') { // Undo (Cmd+Z / Ctrl+Z)
                e.preventDefault();
                quill.history.undo();
            } else if (keyLower === 'b') { // Tebal (Bold)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('bold', !format.bold);
            } else if (keyLower === 'i') { // Miring (Italic)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('italic', !format.italic);
            } else if (keyLower === 'u') { // Garis Bawah (Underline)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('underline', !format.underline);
            } else if (keyLower === 'l' && !isInputFocused) { // Rata Kiri (Align Left)
                e.preventDefault();
                quill.format('align', false);
            } else if (keyLower === 'e' && !isInputFocused) { // Rata Tengah (Align Center)
                e.preventDefault();
                quill.format('align', 'center');
            } else if (keyLower === 'r' && !isInputFocused) { // Rata Kanan (Align Right) - cegah RELOAD di macOS!
                e.preventDefault();
                quill.format('align', 'right');
            } else if (keyLower === 'j' && !isInputFocused) { // Rata Kiri-Kanan (Align Justify)
                e.preventDefault();
                quill.format('align', 'justify');
            } else if (keyLower === 'q') { // Cmd+Q (macOS) / Ctrl+Q (Linux & Windows)
                e.preventDefault();
                actionExit?.click();
            } else if (keyLower === 'w') { // Cmd+W (macOS)
                if (e.metaKey) {
                    e.preventDefault();
                    actionExit?.click();
                }
            } else if (keyLower === '1') {
                e.preventDefault();
                quill.format('lineheight', '1');
            } else if (keyLower === '2') {
                e.preventDefault();
                quill.format('lineheight', '2');
            } else if (keyLower === '5') {
                e.preventDefault();
                quill.format('lineheight', '1.5');
            } else if (e.key === '=' || e.code === 'Equal') { // Subskrip (Ctrl/Cmd + =)
                e.preventDefault();
                const format = quill.getFormat();
                quill.format('script', format.script === 'sub' ? false : 'sub');
            } else if (e.code === 'NumpadAdd') { // Zoom In Numpad
                e.preventDefault();
                document.getElementById('action-zoom-in')?.click();
            } else if (e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract') { // Zoom Out
                e.preventDefault();
                document.getElementById('action-zoom-out')?.click();
            } else if (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0') { // Reset Zoom 100%
                e.preventDefault();
                document.getElementById('action-zoom-reset')?.click();
            } else if (e.key === '\\') { // Bersihkan format
                e.preventDefault();
                document.querySelector('.ql-clean')?.click();
            } else if (e.key === '[') { // Kurangi Indentasi
                e.preventDefault();
                quill.format('indent', '-1');
            } else if (e.key === ']') { // Tambah Indentasi
                e.preventDefault();
                quill.format('indent', '+1');
            } else if (e.key === 'Enter') { // Halaman Baru (Page Break)
                e.preventDefault();
                insertPageBreak(quill, quill.getSelection(true), false);
            }
        }
    } else if (e.altKey && e.shiftKey) {
        // Alt+Shift / Option+Shift Shortcuts
        if (e.key.toLowerCase() === 'd') {
            e.preventDefault();
            document.getElementById('btn-insert-date')?.click();
        }
    } else if (e.altKey && e.key === 'F4') {
        // Alt+F4 (Keluar di Windows / Linux)
        e.preventDefault();
        actionExit?.click();
    } else if (e.shiftKey && e.key === 'F3') {
        // Shift+F3: Putar kapitalisasi teks (Word-style rotation: lower -> UPPER -> Title)
        e.preventDefault();
        cycleShiftF3();
    } else if (e.key === 'F1') {
        e.preventDefault();
        document.getElementById('action-about')?.click();
    } else if (e.key === 'Escape') {
        const viewPrint = document.getElementById('view-print');
        if (viewPrint && viewPrint.classList.contains('active')) {
            closePrintView();
            return;
        }
        // Tutup modal, popup, atau dropdown aktif
        const openPopups = [
            document.getElementById('modal-overlay'),
            document.getElementById('modal-export-success'),
            document.getElementById('modal-pdf-tool'),
            document.getElementById('modal-table-overlay'),
            document.getElementById('modal-link-overlay'),
            document.getElementById('modal-symbol-overlay'),
            document.getElementById('modal-delete-image'),
            document.getElementById('modal-page-number'),
            document.getElementById('modal-about'),
            document.getElementById('modal-template-preview'),
            document.getElementById('modal-save-as-template'),
            document.getElementById('modal-create-template'),
            document.getElementById('dropdown-table'),
            document.getElementById('dropdown-page-menu'),
            document.getElementById('lang-context-menu'),
            document.getElementById('image-context-menu'),
            document.getElementById('table-floating-toolbar'),
            document.getElementById('popover-doc-stats'),
            document.getElementById('popover-change-case'),
            document.getElementById('popover-styles-gallery')
        ];
        let closedAny = false;
        for (const pop of openPopups) {
            if (pop && (pop.style.display === 'flex' || pop.style.display === 'block' || (!pop.classList.contains('hidden') && getComputedStyle(pop).display !== 'none'))) {
                pop.style.display = 'none';
                pop.classList.add('hidden');
                closedAny = true;
            }
        }
        const modalFind = document.getElementById('modal-find-replace');
        if (modalFind && (modalFind.style.display === 'flex' || modalFind.style.display === 'block')) {
            const btnCloseFind = document.getElementById('btn-close-find');
            if (btnCloseFind) btnCloseFind.click();
            closedAny = true;
        }
        const hfEditor = document.getElementById('hf-editor-container');
        if (hfEditor && hfEditor.style.display !== 'none') {
            hfEditor.style.display = 'none';
            closedAny = true;
        }
        // Jangan keluar ke Beranda secara otomatis hanya karena Escape ditekan saat mengedit
    }
});





// --- FITUR SIMPAN & BUKA DOKUMEN (.BAKU) ---

let isSaving = false;

function normalizeBakuPath(rawPath) {
    if (!rawPath) return "";
    let clean = rawPath.trim();
    if (!clean.toLowerCase().endsWith('.baku')) {
        clean += '.baku';
    }
    return clean;
}

function extractDocNameFromPath(filePath) {
    if (!filePath) return "Dokumen_Baru";
    const baseName = filePath.split('\\').pop().split('/').pop();
    return baseName.replace(/\.baku$/i, '');
}

async function performSaveToFile(filePathToSave) {
    const fileData = {
        version: 1,
        docName: currentDocName,
        paperConfig: paperConfig,
        numberingConfig: numberingConfig,
        headerFooterConfig: headerFooterConfig,
        content: quill.getContents()
    };

    // 1. Tampilkan status "Menyimpan..."
    const saveState = document.getElementById('status-save-state');
    const saveIcon = document.getElementById('status-save-icon');
    const saveText = document.getElementById('status-save-text');
    
    if (saveState) {
        saveState.style.display = 'flex';
        saveText.textContent = window.t('Menyimpan...');
        saveIcon.innerHTML = `<svg class="sb-spinner" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
    }

    // 2. Eksekusi penyimpanan ke Disk lewat command Rust atomic safe-write
    const jsonString = JSON.stringify(fileData);
    await window.__TAURI__.tauri.invoke('save_baku_file', { path: filePathToSave, content: jsonString });
    
    // Tandai dokumen bersih setelah berhasil disimpan
    setDirty(false);
    updateRecentDocs(filePathToSave, currentDocName);
    
    // 3. Ubah status menjadi "Tersimpan"
    if (saveState) {
        saveText.textContent = window.t('Tersimpan');
        saveIcon.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#107C41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => { if (saveState) saveState.style.display = 'none'; }, 2000);
    }
    
    // Pastikan tampilan editor tetap aktif dan update judul jendela
    sidebar.style.display = 'none';
    viewHome.classList.remove('active');
    viewEditor.classList.add('active');
    updateWindowTitle();

    if (homeAfterSave) {
        homeAfterSave = false;
        pendingHomeNav = false;
        goToHome();
        return;
    }

    if (closeAfterSave && window.__TAURI__) {
        closeAfterSave = false;
        isClosing = true;
        window.__TAURI__.window.appWindow.close().catch(e => console.error(e));
    }
}

async function promptSaveDialog(titleText) {
    const docName = currentDocName.toLowerCase().endsWith('.baku') ? currentDocName : currentDocName + '.baku';
    
    // Tentukan folder tujuan (Workspace Baku)
    let targetDir = (typeof bakuWorkspacePath !== 'undefined' && bakuWorkspacePath) ? bakuWorkspacePath : "";
    if (currentFilePath) {
        const lastSlash = Math.max(currentFilePath.lastIndexOf('/'), currentFilePath.lastIndexOf('\\'));
        if (lastSlash > 0) {
            targetDir = currentFilePath.substring(0, lastSlash);
        }
    }

    // Di macOS, jika defaultPath berisi nama file yang belum ada, backend rfd mencoba menyetelnya sebagai directoryURL
    // yang ditolak oleh macOS NSSavePanel sehingga Finder membuka folder sembarang/sebelumnya.
    // Dengan menyetel targetDir yang valid, Finder DIJAMIN langsung terbuka TEPAT di dalam folder Baku PDF Workspace!
    let defaultSavePath;
    if (window.isMacPlatform) {
        defaultSavePath = targetDir || docName;
    } else {
        const separator = targetDir.includes('\\') ? '\\' : '/';
        defaultSavePath = targetDir ? (targetDir + separator + docName) : docName;
    }

    const chosenPath = await window.__TAURI__.dialog.save({
        title: titleText || window.t('Simpan Dokumen Baku'),
        defaultPath: defaultSavePath,
        filters: [{ name: window.t('Baku Document'), extensions: ['baku'] }]
    });

    if (!chosenPath) return null;
    return normalizeBakuPath(chosenPath);
}

async function actionSave() {
    if (!window.__TAURI__ || isSaving) return;
    isSaving = true;
    try {
        let filePathToSave = currentFilePath;
        
        // Jika belum ada path, buka dialog penyimpanan
        if (!filePathToSave) {
            filePathToSave = await promptSaveDialog(window.t('Simpan Dokumen Baku'));
            if (!filePathToSave) {
                isSaving = false;
                closeAfterSave = false;
                homeAfterSave = false;
                pendingHomeNav = false;
                return; // User membatalkan dialog save
            }
            currentFilePath = filePathToSave;
            currentDocName = extractDocNameFromPath(filePathToSave);
        }

        await performSaveToFile(filePathToSave);
    } catch (e) {
        console.error("Gagal menyimpan dokumen:", e);
        const saveState = document.getElementById('status-save-state');
        if (saveState) saveState.style.display = 'none';
        alert(window.t('Gagal menyimpan dokumen: ') + (e.message || e));
    } finally {
        isSaving = false;
    }
}

async function actionSaveAs() {
    if (!window.__TAURI__ || isSaving) return;
    isSaving = true;
    try {
        const filePathToSave = await promptSaveDialog(window.t('Simpan Dokumen Baku Sebagai'));
        if (!filePathToSave) {
            isSaving = false;
            return; // User membatalkan dialog save
        }

        currentFilePath = filePathToSave;
        currentDocName = extractDocNameFromPath(filePathToSave);
        await performSaveToFile(filePathToSave);
    } catch (e) {
        console.error("Gagal menyimpan dokumen sebagai:", e);
        const saveState = document.getElementById('status-save-state');
        if (saveState) saveState.style.display = 'none';
        alert(window.t('Gagal menyimpan dokumen: ') + (e.message || e));
    } finally {
        isSaving = false;
    }
}

// === LOGIKA HEADER & FOOTER (KLIK GANDA DI MARGIN) ===
let hfEditMode = { active: false, sectionId: null, type: null, pageIndex: 0 };
const hfEditorContainer = document.getElementById('hf-editor-container');
const hfInput = document.getElementById('hf-input');
const hfLabel = document.getElementById('hf-label');
const hfDiffFirst = document.getElementById('hf-diff-first');
const btnCloseHf = document.getElementById('btn-close-hf');

document.getElementById('export-wrapper').addEventListener('dblclick', (e) => {
    if (hfEditMode.active) return; // Abaikan jika sedang edit
    
    const wrapperRect = document.getElementById('export-wrapper').getBoundingClientRect();
    const scale = wrapperRect.width / document.getElementById('export-wrapper').offsetWidth; // jika ada zoom
    const y = (e.clientY - wrapperRect.top) / scale;
    
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    const pageIndex = Math.floor(y / totalPageHeightPx);
    const yOnPage = y - (pageIndex * totalPageHeightPx);
    
    const marginTopPx = paperConfig.marginTop * mmToPx;
    const marginBottomPx = paperConfig.marginBottom * mmToPx;
    
    let isHeader = yOnPage <= marginTopPx;
    let isFooter = yOnPage >= (pageHeightPx - marginBottomPx);
    
    if (isHeader || isFooter) {
        openHFEditor(pageIndex, isHeader ? 'header' : 'footer');
    }
});

function openHFEditor(pageIndex, type) {
    // 1. Tentukan Section ID
    const editor = document.querySelector('.ql-editor');
    const totalPages = parseInt(editor.dataset.pagesNeeded || '1');
    const blocks = Array.from(editor.children);
    
    const mmToPx = 96 / 25.4;
    const totalPageHeightPx = (paperConfig.height * mmToPx) + (15 * mmToPx);
    
    let pageRules = {};
    blocks.forEach(block => {
        if (block.classList.contains('section-break-element')) {
            let id = block.getAttribute('data-section-id');
            if (id) {
                let top = block.offsetTop;
                let pageIdx = Math.floor(top / totalPageHeightPx);
                pageRules[pageIdx + 1] = id;
            }
        }
    });
    
    let currentConfigId = "doc";
    let isFirstOfSection = (pageIndex === 0);
    for (let p = 0; p <= pageIndex; p++) {
        if (pageRules[p]) {
            currentConfigId = pageRules[p];
            isFirstOfSection = (p === pageIndex); // Jika rules berubah di halaman ini, berarti ini awal section
        }
    }
    
    hfEditMode = { active: true, sectionId: currentConfigId, type: type, pageIndex: pageIndex, isFirst: isFirstOfSection };
    
    // 2. Siapkan Data
    let hfConf = headerFooterConfig[currentConfigId];
    if (!hfConf) {
        hfConf = headerFooterConfig["doc"] || { header: { text: "", align: "center", diffFirst: false }, footer: { text: "", align: "center", diffFirst: false } };
        headerFooterConfig[currentConfigId] = hfConf;
    }
    
    const conf = hfConf[type]; // .header atau .footer
    
    // 3. Atur UI
    hfLabel.textContent = (type === 'header' ? 'Header' : 'Footer') + (currentConfigId === 'doc' ? '' : ' - Bagian');
    hfDiffFirst.checked = conf.diffFirst;
    
    if (isFirstOfSection && conf.diffFirst) hfInput.value = conf.firstText || "";
    else hfInput.value = conf.text || "";
    
    hfInput.style.textAlign = conf.align;
    
    // 4. Posisi
    hfEditorContainer.style.display = 'block';
    
    let topPx = 0;
    if (type === 'header') topPx = (pageIndex * totalPageHeightPx) + ((paperConfig.marginTop * mmToPx) / 2);
    else topPx = (pageIndex * totalPageHeightPx) + (paperConfig.height * mmToPx) - ((paperConfig.marginBottom * mmToPx) / 2);
    
    hfEditorContainer.style.top = topPx + 'px';
    
    document.querySelector('.ql-editor').style.opacity = '0.5';
    document.querySelector('.ql-editor').style.pointerEvents = 'none';
    
    hfInput.focus();
}

function closeHFEditor() {
    hfEditMode.active = false;
    hfEditorContainer.style.display = 'none';
    document.querySelector('.ql-editor').style.opacity = '1';
    document.querySelector('.ql-editor').style.pointerEvents = 'auto';
}

btnCloseHf.addEventListener('click', closeHFEditor);

hfInput.addEventListener('input', () => {
    if (!hfEditMode.active) return;
    let conf = headerFooterConfig[hfEditMode.sectionId][hfEditMode.type];
    
    if (hfEditMode.isFirst && conf.diffFirst) {
        conf.firstText = hfInput.value;
    } else {
        conf.text = hfInput.value;
    }
    setDirty(true);
    
    const editor = document.querySelector('.ql-editor');
    updatePageNumbers(parseInt(editor.dataset.pagesNeeded || '1'));
});

hfDiffFirst.addEventListener('change', () => {
    if (!hfEditMode.active) return;
    let conf = headerFooterConfig[hfEditMode.sectionId][hfEditMode.type];
    conf.diffFirst = hfDiffFirst.checked;
    
    // Refresh value input jika centang diubah di halaman pertama
    if (hfEditMode.isFirst) {
        if (conf.diffFirst) hfInput.value = conf.firstText || "";
        else hfInput.value = conf.text || "";
    }
    
    setDirty(true);
    const editor = document.querySelector('.ql-editor');
    updatePageNumbers(parseInt(editor.dataset.pagesNeeded || '1'));
});

document.getElementById('hf-align-left').addEventListener('click', () => {
    if (!hfEditMode.active) return;
    headerFooterConfig[hfEditMode.sectionId][hfEditMode.type].align = 'left';
    hfInput.style.textAlign = 'left';
    const editor = document.querySelector('.ql-editor');
    updatePageNumbers(parseInt(editor.dataset.pagesNeeded || '1'));
});
document.getElementById('hf-align-center').addEventListener('click', () => {
    if (!hfEditMode.active) return;
    headerFooterConfig[hfEditMode.sectionId][hfEditMode.type].align = 'center';
    hfInput.style.textAlign = 'center';
    const editor = document.querySelector('.ql-editor');
    updatePageNumbers(parseInt(editor.dataset.pagesNeeded || '1'));
});
document.getElementById('hf-align-right').addEventListener('click', () => {
    if (!hfEditMode.active) return;
    headerFooterConfig[hfEditMode.sectionId][hfEditMode.type].align = 'right';
    hfInput.style.textAlign = 'right';
    const editor = document.querySelector('.ql-editor');
    updatePageNumbers(parseInt(editor.dataset.pagesNeeded || '1'));
});

async function actionOpen() {
    if (!window.__TAURI__) return;
    try {
        const filePath = await window.__TAURI__.dialog.open({
            title: window.t('Buka Dokumen Baku'),
            defaultPath: (typeof bakuWorkspacePath !== 'undefined' && bakuWorkspacePath) ? bakuWorkspacePath : undefined,
            filters: [{ name: window.t('Baku Document'), extensions: ['baku'] }]
        });

        if (!filePath) return;

        const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });
        const fileData = JSON.parse(jsonString);

        if (fileData.content && fileData.paperConfig) {
            currentFilePath = filePath;
            currentDocName = extractDocNameFromPath(filePath) || fileData.docName || 'Dokumen_Baru';
            
            
            paperConfig = fileData.paperConfig;
            numberingConfig = fileData.numberingConfig || { "doc": { show: false, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" } };
            headerFooterConfig = fileData.headerFooterConfig || { "doc": { header: { text: "", align: "center", diffFirst: false, firstText: "" }, footer: { text: "", align: "center", diffFirst: false, firstText: "" } } };
            
            // Restore form pengaturan kertas
            document.getElementById('input-paper-size').value = paperConfig.width === 210 && paperConfig.height === 297 ? 'A4' : 
                                                                paperConfig.width === 215.9 && paperConfig.height === 279.4 ? 'Letter' : 
                                                                paperConfig.width === 215.9 && paperConfig.height === 355.6 ? 'Legal' : 
                                                                paperConfig.width === 210 && paperConfig.height === 330 ? 'F4' : 'A4';
            document.getElementById('margin-top').value = paperConfig.marginTop;
            document.getElementById('margin-bottom').value = paperConfig.marginBottom;
            document.getElementById('margin-left').value = paperConfig.marginLeft;
            document.getElementById('margin-right').value = paperConfig.marginRight;
            applyPageSetup();

            // Pindah ke layar editor
            document.getElementById('sidebar').style.display = 'none';
            document.getElementById('view-home').classList.remove('active');
            document.getElementById('view-editor').classList.add('active');
            updateWindowTitle();
            
            setTimeout(() => {
                quill.setContents(fileData.content);
                quill.focus();
                setDirty(false);
                updateRecentDocs(filePath, currentDocName);
                if (typeof renderVisualRuler === 'function') renderVisualRuler();
            }, 150);
        } else {
            alert(window.t('File .baku tidak valid atau rusak.'));
        }
    } catch (e) {
        console.error(e);
        alert(window.t('Gagal membuka dokumen: ') + e);
    }
}

function actionNew() {
    document.getElementById('btn-new-doc').click(); // Buka pop-up dokumen baru
}

document.getElementById('action-save').addEventListener('click', actionSave);
const btnActionSaveAs = document.getElementById('action-save-as');
if (btnActionSaveAs) {
    btnActionSaveAs.addEventListener('click', actionSaveAs);
}
document.getElementById('action-open').addEventListener('click', actionOpen);
document.getElementById('action-new').addEventListener('click', actionNew);

// --- DENGARKAN AKSI MENU DARI NATIVE MENU BAR (MACOS) ---
if (window.__TAURI__ && window.__TAURI__.event) {
    window.__TAURI__.event.listen('menu-event', (event) => {
        const id = event.payload;
        if (id === 'action-home') {
            document.getElementById('action-home')?.click();
        } else if (id === 'action-new') {
            actionNew();
        } else if (id === 'action-open') {
            actionOpen();
        } else if (id === 'action-save') {
            actionSave();
        } else if (id === 'action-save-as') {
            actionSaveAs();
        } else if (id === 'action-save-as-template') {
            document.getElementById('action-save-as-template')?.click();
        } else if (id === 'action-open-template') {
            document.getElementById('action-open-template')?.click();
        } else if (id === 'action-page-setup') {
            document.getElementById('action-page-setup')?.click();
        } else if (id === 'action-print') {
            actionPrint();
        } else if (id === 'action-export') {
            document.getElementById('action-export')?.click();
        } else if (id === 'action-insert-image') {
            triggerImageUpload();
        } else if (id === 'action-insert-table') {
            document.getElementById('btn-insert-table')?.click();
        } else if (id === 'action-insert-link') {
            triggerInsertLink();
        } else if (id === 'action-zoom-in') {
            document.getElementById('action-zoom-in')?.click();
        } else if (id === 'action-zoom-out') {
            document.getElementById('action-zoom-out')?.click();
        } else if (id === 'action-zoom-reset') {
            document.getElementById('action-zoom-reset')?.click();
        } else if (id === 'action-about') {
            document.getElementById('action-about')?.click();
        }
    });
}


// Tambahkan pemicu aksi buka dokumen di tombol kotak besar Home Screen
const btnOpenDoc = document.getElementById('btn-open-doc');
if (btnOpenDoc) {
    btnOpenDoc.addEventListener('click', actionOpen);
}

// --- FITUR DOKUMEN TERAKHIR (RECENT DOCS) ---
// RECENT_DOCS_KEY telah dideklarasikan di awal file

function getRecentDocs() {
    try {
        const data = localStorage.getItem(RECENT_DOCS_KEY);
        if (!data) return [];
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(item => item && typeof item === 'object' && typeof item.path === 'string' && item.path.trim().length > 0);
    } catch (e) {
        console.warn("Gagal membaca recent docs dari localStorage:", e);
        try { localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify([])); } catch (_) {}
        return [];
    }
}

function updateRecentDocs(path, docName) {
    if (!path || typeof path !== 'string') return;
    try {
        let docs = getRecentDocs();
        const safeDocName = docName || extractDocNameFromPath(path) || 'Dokumen';
        
        // Hapus jika path sudah ada (agar bisa dipindah ke paling atas)
        docs = docs.filter(d => d && d.path !== path);
        
        // Tambahkan ke paling atas
        docs.unshift({
            path: path,
            docName: safeDocName,
            lastOpened: new Date().toISOString()
        });
        
        // Batasi maksimal 15 riwayat
        if (docs.length > 15) docs = docs.slice(0, 15);
        
        localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(docs));
    } catch (e) {
        console.error("Gagal memperbarui recent docs:", e);
    }
    renderRecentDocs();
}

function formatRelativeTime(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        if (diffDays === 0 && now.getDate() === date.getDate()) {
            return (window.t ? window.t('Hari ini, ') : 'Hari ini, ') + time;
        }
        if (diffDays === 1 || (diffDays === 0 && now.getDate() !== date.getDate())) {
            return (window.t ? window.t('Kemarin, ') : 'Kemarin, ') + time;
        }
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${time}`;
    } catch (_) {
        return '';
    }
}

async function syncWorkspaceFilesToRecent() {
    if (!window.__TAURI__ || !window.__TAURI__.fs || typeof window.__TAURI__.fs.readDir !== 'function') return;
    try {
        let workspaceDir = (typeof window !== 'undefined' && window.bakuWorkspacePath) 
            ? window.bakuWorkspacePath 
            : ((typeof bakuWorkspacePath !== 'undefined' && bakuWorkspacePath) ? bakuWorkspacePath : null);

        if (!workspaceDir && window.__TAURI__.path) {
            const { homeDir, documentDir, join } = window.__TAURI__.path;
            let docDir;
            if (typeof documentDir === 'function') {
                try {
                    docDir = await documentDir();
                } catch (_) {
                    docDir = await homeDir();
                }
            } else if (typeof homeDir === 'function') {
                docDir = await homeDir();
            }
            if (docDir && typeof join === 'function') {
                workspaceDir = await join(docDir, "Baku PDF Workspace");
            }
        }

        if (!workspaceDir) return;

        if (typeof window.__TAURI__.fs.exists === 'function') {
            const doesExist = await window.__TAURI__.fs.exists(workspaceDir);
            if (!doesExist) return;
        }

        const entries = await window.__TAURI__.fs.readDir(workspaceDir);
        if (!entries || !Array.isArray(entries)) return;

        let docs = getRecentDocs();
        let changed = false;

        for (const entry of entries) {
            if (entry && entry.name && entry.name.toLowerCase().endsWith('.baku')) {
                const filePath = entry.path;
                const docName = entry.name.replace(/\.baku$/i, '');
                const alreadyExists = docs.some(d => d && d.path === filePath);
                if (!alreadyExists) {
                    docs.push({
                        path: filePath,
                        docName: docName,
                        lastOpened: new Date().toISOString()
                    });
                    changed = true;
                }
            }
        }

        if (changed) {
            localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(docs));
            renderRecentDocs();
        }
    } catch (err) {
        console.warn("Gagal membaca folder workspace untuk recent docs:", err);
    }
}
window.syncWorkspaceFilesToRecent = syncWorkspaceFilesToRecent;

function renderRecentDocs() {
    const container = document.getElementById('recent-docs-list');
    if (!container) return;
    
    try {
        const docs = getRecentDocs();
        container.innerHTML = '';
        
        if (!docs || docs.length === 0) {
            const emptyText = window.t ? window.t('Belum ada riwayat dokumen.') : 'Belum ada riwayat dokumen.';
            container.innerHTML = `<div style="padding: 32px; text-align: center; color: #8C92A4; font-size: 10pt;" data-i18n="Belum ada riwayat dokumen.">${emptyText}</div>`;
            return;
        }
        
        docs.forEach(doc => {
            if (!doc || !doc.path) return;
            const row = document.createElement('div');
            row.className = 'table-row';
            row.style.cursor = 'pointer';
            
            const colTitle = document.createElement('div');
            colTitle.className = 'col-4 title';
            colTitle.textContent = doc.docName || extractDocNameFromPath(doc.path) || 'Dokumen';
            
            const colPath = document.createElement('div');
            colPath.className = 'col-4 path';
            colPath.style.cssText = 'color: #8C92A4; font-size: 9pt; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
            colPath.title = doc.path;
            colPath.textContent = doc.path;
            
            const colDate = document.createElement('div');
            colDate.className = 'col-2 date';
            colDate.style.cssText = 'color: #8C92A4; font-size: 9pt;';
            colDate.textContent = formatRelativeTime(doc.lastOpened);
            
            row.appendChild(colTitle);
            row.appendChild(colPath);
            row.appendChild(colDate);
            row.addEventListener('click', () => openSpecificFile(doc.path));
            container.appendChild(row);
        });
    } catch (err) {
        console.error("Gagal merender recent docs:", err);
        const emptyText = window.t ? window.t('Belum ada riwayat dokumen.') : 'Belum ada riwayat dokumen.';
        container.innerHTML = `<div style="padding: 32px; text-align: center; color: #8C92A4; font-size: 10pt;" data-i18n="Belum ada riwayat dokumen.">${emptyText}</div>`;
    }
}

async function openSpecificFile(filePath) {
    if (!window.__TAURI__) return;
    try {
        const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });
        const fileData = JSON.parse(jsonString);

        if (fileData.content && fileData.paperConfig) {
            currentFilePath = filePath;
            currentDocName = extractDocNameFromPath(filePath) || fileData.docName || 'Dokumen_Baru';
            
            
            paperConfig = fileData.paperConfig;
            numberingConfig = fileData.numberingConfig || { "doc": { show: false, format: "arabic", start: 1, align: "center", prefix: "", suffix: "" } };
            headerFooterConfig = fileData.headerFooterConfig || { "doc": { header: { text: "", align: "center", diffFirst: false, firstText: "" }, footer: { text: "", align: "center", diffFirst: false, firstText: "" } } };
            
            // Restore form pengaturan kertas
            document.getElementById('input-paper-size').value = paperConfig.width === 210 && paperConfig.height === 297 ? 'A4' : 
                                                                paperConfig.width === 215.9 && paperConfig.height === 279.4 ? 'Letter' : 
                                                                paperConfig.width === 215.9 && paperConfig.height === 355.6 ? 'Legal' : 
                                                                paperConfig.width === 210 && paperConfig.height === 330 ? 'F4' : 'A4';
            document.getElementById('margin-top').value = paperConfig.marginTop;
            document.getElementById('margin-bottom').value = paperConfig.marginBottom;
            document.getElementById('margin-left').value = paperConfig.marginLeft;
            document.getElementById('margin-right').value = paperConfig.marginRight;
            applyPageSetup();

            // Pindah ke layar editor
            document.getElementById('sidebar').style.display = 'none';
            document.getElementById('view-home').classList.remove('active');
            document.getElementById('view-editor').classList.add('active');
            updateWindowTitle();
            
            setTimeout(() => {
                quill.setContents(fileData.content);
                setDirty(false);
                updateRecentDocs(filePath, currentDocName);
                if (typeof renderVisualRuler === 'function') renderVisualRuler();
            }, 150);
        }
    } catch (e) {
        console.error(e);
        const errorMsg = typeof e === 'string' ? e : JSON.stringify(e);
        
        // Gunakan modal error kustom
        const modalError = document.getElementById('modal-error');
        const modalMessage = document.getElementById('modal-error-message');
        if (modalError && modalMessage) {
            modalMessage.innerHTML = window.t('Dokumen yang Anda cari tidak ditemukan. File mungkin telah dihapus atau dipindahkan ke lokasi lain.') + '<br><br><small style="color: #666;">' + window.t('Detail:') + ' ' + errorMsg + '</small>';
            modalError.style.display = 'flex';
            modalError.classList.remove('hidden');
        } else {
            alert(window.t('Gagal membuka dokumen: ') + errorMsg);
        }
        
        // Hapus dari history jika file tidak ditemukan
        let docs = getRecentDocs();
        docs = docs.filter(d => d.path !== filePath);
        localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(docs));
        renderRecentDocs();
    }
}

// Render saat aplikasi dibuka
renderRecentDocs();
setTimeout(() => {
    syncWorkspaceFilesToRecent();
}, 200);

// --- CEGAT PENUTUPAN JENDELA (INTERCEPT CLOSE) ---
const modalUnsaved = document.getElementById('modal-unsaved');

if (window.__TAURI__) {
    // Tauri v1 API untuk mencegat penutupan
    window.__TAURI__.window.appWindow.onCloseRequested(async (event) => {
        if (isClosing) {
            return;
        }
        // HANYA cegat penutupan jika pengguna sedang berada di dalam editor dan ada perubahan belum disimpan
        if (viewEditor && viewEditor.classList.contains('active') && isDirty) {
            event.preventDefault(); // Blokir penutupan paksa
            if (modalUnsaved) {
                modalUnsaved.style.display = 'flex';
                modalUnsaved.classList.remove('hidden');
            }
        } else {
            isClosing = true;
        }
    });
}

// Tombol di dalam Modal Keluar
document.getElementById('btn-unsaved-cancel').addEventListener('click', () => {
    if (modalUnsaved) {
        modalUnsaved.classList.add('hidden');
        modalUnsaved.style.display = 'none';
    }
    closeAfterSave = false;
    homeAfterSave = false;
    pendingHomeNav = false;
});

document.getElementById('btn-unsaved-discard').addEventListener('click', () => {
    if (modalUnsaved) {
        modalUnsaved.classList.add('hidden');
        modalUnsaved.style.display = 'none';
    }
    if (pendingHomeNav) {
        goToHome();
        return;
    }
    // Matikan alarm kotor agar tidak dicegat lagi, lalu tutup
    isDirty = false;
    isClosing = true;
    if (window.__TAURI__) {
        window.__TAURI__.window.appWindow.close().catch(e => console.error(e));
    }
});

document.getElementById('btn-unsaved-save').addEventListener('click', () => {
    if (modalUnsaved) {
        modalUnsaved.classList.add('hidden');
        modalUnsaved.style.display = 'none';
    }
    if (pendingHomeNav) {
        homeAfterSave = true;
        actionSave();
        return;
    }
    // Jalankan simpan, tandai agar tutup setelah selesai
    closeAfterSave = true;
    actionSave();
});

// --- LOGIKA RIBBON TABS ---
document.querySelectorAll('.ribbon-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Hapus class active dari semua tab
        document.querySelectorAll('.ribbon-tab').forEach(t => t.classList.remove('active'));
        // Hapus class active dari semua pane
        document.querySelectorAll('.ribbon-pane').forEach(p => p.classList.remove('active'));
        
        // Tambah class active ke tab yang diklik
        tab.classList.add('active');
        // Tampilkan pane yang sesuai
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Pindahkan tombol Pengaturan Halaman ke Tab Tata Letak
const btnPageSetupRibbon = document.getElementById('ribbon-btn-page-setup');
if (btnPageSetupRibbon) {
    btnPageSetupRibbon.addEventListener('click', () => {
        modalPageSetup.style.display = 'flex';
    });
}

// Pengaturan Cepat Ukuran & Orientasi di Tab Tata Letak
const ribbonQuickSize = document.getElementById('ribbon-quick-size');
if (ribbonQuickSize) {
    ribbonQuickSize.addEventListener('change', () => {
        const size = ribbonQuickSize.value;
        if (size === 'A4') { paperConfig.width = 210; paperConfig.height = 297; paperConfig.format = 'a4'; }
        else if (size === 'Letter') { paperConfig.width = 215.9; paperConfig.height = 279.4; paperConfig.format = 'letter'; }
        else if (size === 'Legal') { paperConfig.width = 215.9; paperConfig.height = 355.6; paperConfig.format = 'legal'; }
        else if (size === 'F4') { paperConfig.width = 210; paperConfig.height = 330; paperConfig.format = [210, 330]; }
        applyPageSetup();
    });
}

const ribbonBtnOrientation = document.getElementById('ribbon-btn-quick-orientation');
const ribbonOrientationLabel = document.getElementById('ribbon-orientation-label');
if (ribbonBtnOrientation) {
    ribbonBtnOrientation.addEventListener('click', () => {
        const temp = paperConfig.width;
        paperConfig.width = paperConfig.height;
        paperConfig.height = temp;
        const isLandscape = paperConfig.width > paperConfig.height;
        if (ribbonOrientationLabel) {
            ribbonOrientationLabel.textContent = isLandscape ? (window.t ? window.t('Lanskap') : 'Lanskap') : (window.t ? window.t('Potret') : 'Potret');
        }
        applyPageSetup();
    });
}

// Pencarian dan Penggantian di Tab Alat
const btnFindRibbon = document.getElementById('ribbon-btn-find');
if (btnFindRibbon) {
    btnFindRibbon.addEventListener('click', () => {
        setFindMode(false);
        modalFind.style.display = 'flex'; document.body.classList.add('search-active');
        inputFind.focus();
    });
}

const btnReplaceRibbon = document.getElementById('ribbon-btn-replace');
if (btnReplaceRibbon) {
    btnReplaceRibbon.addEventListener('click', () => {
        setFindMode(true);
        modalFind.style.display = 'flex'; document.body.classList.add('search-active');
        inputFind.focus();
    });
}

// Tombol Media & Teks di Tab Sisipkan
document.getElementById('ribbon-btn-img')?.addEventListener('click', triggerImageUpload);
document.getElementById('ribbon-btn-link')?.addEventListener('click', triggerInsertLink);
document.getElementById('ribbon-btn-quote')?.addEventListener('click', triggerToggleQuote);
document.getElementById('ribbon-btn-code')?.addEventListener('click', triggerToggleCodeBlock);

// Indentasi di Tab Tata Letak
document.getElementById('ribbon-btn-indent-dec')?.addEventListener('click', () => {
    quill.format('indent', '-1');
});
document.getElementById('ribbon-btn-indent-inc')?.addEventListener('click', () => {
    quill.format('indent', '+1');
});

// Tombol Zoom di Tab Alat
document.getElementById('ribbon-btn-zoom-in')?.addEventListener('click', () => document.getElementById('action-zoom-in')?.click());
document.getElementById('ribbon-btn-zoom-out')?.addEventListener('click', () => document.getElementById('action-zoom-out')?.click());
document.getElementById('ribbon-btn-zoom-reset')?.addEventListener('click', () => document.getElementById('action-zoom-reset')?.click());


// --- MESIN GAMBAR PINTAR (IMAGE RESIZER & WRAPPER) ---
let currentSelectedImage = null;
const imageOverlay = document.getElementById('image-resizer-overlay');
const quillEditor = document.querySelector('.ql-editor');
const imageMiniBtn = document.getElementById('image-mini-btn');
const imageContextMenu = document.getElementById('image-context-menu');

if (imageMiniBtn) {
    imageMiniBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (imageContextMenu.style.display === 'none' || imageContextMenu.style.display === '') {
            imageContextMenu.style.display = 'flex';
        } else {
            imageContextMenu.style.display = 'none';
        }
    });
}

function updateOverlayPosition() {
    if (!currentSelectedImage) return;
    const rect = currentSelectedImage.getBoundingClientRect();
    const canvasArea = document.getElementById('canvas-area');
    const canvasRect = canvasArea.getBoundingClientRect();
    
    // Hitung posisi absolut di dalam canvas-area yang memiliki overflow scroll
    const top = rect.top - canvasRect.top + canvasArea.scrollTop;
    const left = rect.left - canvasRect.left + canvasArea.scrollLeft;
    const width = rect.width;
    const height = rect.height;
    
    imageOverlay.style.top = top + 'px';
    imageOverlay.style.left = left + 'px';
    imageOverlay.style.width = width + 'px';
    imageOverlay.style.height = height + 'px';
}

quill.root.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault(); // Cegah browser menempelkan kursor ketik teks (caret) pada gambar
        currentSelectedImage = e.target;
        imageOverlay.classList.remove('hidden');
        updateOverlayPosition();

        // Hapus seleksi teks aktif saat gambar diklik agar kursor tidak berkedip di samping/atas gambar
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
        }
    } else {
        currentSelectedImage = null;
        imageOverlay.classList.add('hidden');
        if (imageContextMenu) imageContextMenu.style.display = 'none';
    }
});

// Update posisi saat window di-resize atau scroll (jika diperlukan)
quill.root.addEventListener('scroll', updateOverlayPosition);
window.addEventListener('resize', updateOverlayPosition);
const canvasAreaEl = document.getElementById('canvas-area');
if (canvasAreaEl) {
    canvasAreaEl.addEventListener('scroll', updateOverlayPosition);
}

// Modifikasi tombol perataan agar MENGHAPUS absolute positioning jika diaktifkan ulang
const removeAbsolute = (blot, align) => {
    let currentStyle = currentSelectedImage.getAttribute('style') || '';
    currentStyle = currentStyle.replace(/position:\s*absolute;?/g, '')
                               .replace(/left:\s*[^;]+;?/g, '')
                               .replace(/top:\s*[^;]+;?/g, '')
                               .replace(/z-index:\s*[^;]+;?/g, '');
    if (align) {
        currentSelectedImage.setAttribute('data-align', align);
    } else {
        currentSelectedImage.removeAttribute('data-align');
    }
    blot.format('data-align', align);
    blot.format('style', currentStyle);
    if (imageContextMenu) imageContextMenu.style.display = 'none';
    setTimeout(updateOverlayPosition, 50);
    setDirty(true);
};

// Logika Toolbar Gambar
document.getElementById('btn-img-inline').addEventListener('click', () => {
    if(!currentSelectedImage) return;
    const blot = Quill.find(currentSelectedImage);
    if(blot) removeAbsolute(blot, '');
});
document.getElementById('btn-img-center').addEventListener('click', () => {
    if(!currentSelectedImage) return;
    const blot = Quill.find(currentSelectedImage);
    if(blot) removeAbsolute(blot, 'center');
});
document.getElementById('btn-img-wrap-left').addEventListener('click', () => {
    if(!currentSelectedImage) return;
    const blot = Quill.find(currentSelectedImage);
    if(blot) removeAbsolute(blot, 'left');
});
document.getElementById('btn-img-wrap-right').addEventListener('click', () => {
    if(!currentSelectedImage) return;
    const blot = Quill.find(currentSelectedImage);
    if(blot) removeAbsolute(blot, 'right');
});

// Logika Tarik untuk Ubah Ukuran (Drag to Resize)
let isResizing = false;
let startX, startY, startWidth, startHeight;

document.querySelectorAll('.resizer-handle').forEach(handle => {
    handle.addEventListener('mousedown', (e) => {
        if (!currentSelectedImage) return;
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = currentSelectedImage.clientWidth;
        startHeight = currentSelectedImage.clientHeight;
        e.preventDefault(); // cegah blokir teks
    });
});

window.addEventListener('mousemove', (e) => {
    if (!isResizing || !currentSelectedImage) return;
    
    // Menghitung selisih yang disesuaikan dengan zoom
    const dx = (e.clientX - startX) / currentZoom;
    const dy = (e.clientY - startY) / currentZoom;
    
    // Rasio aspek gambar untuk menjaga proporsi
    const ratio = startWidth / startHeight;
    let newWidth = startWidth + dx;
    
    if (newWidth > 50) { // batas minimum 50px
        currentSelectedImage.style.width = newWidth + 'px';
        currentSelectedImage.style.height = 'auto'; // biarkan browser hitung tinggi proporsional
        updateOverlayPosition();
    }
});

window.addEventListener('mouseup', () => {
    if (isResizing && currentSelectedImage) {
        isResizing = false;
        // Simpan ukuran baru ke Quill Delta
        const blot = Quill.find(currentSelectedImage);
        if(blot) {
            blot.format('width', currentSelectedImage.style.width);
            setDirty(true);
        }
    }
});


// --- LOGIKA MELAYANG BEBAS & DRAG GAMBAR (ABSOLUTE DRAGGING) ---
document.getElementById('btn-img-free').addEventListener('click', () => {
    if(!currentSelectedImage) return;
    const blot = Quill.find(currentSelectedImage);
    if(blot) {
        // Terapkan posisi absolute
        // Pertahankan ukuran dan data-align, tapi timpa style position
        let currentStyle = currentSelectedImage.getAttribute('style') || '';
        // Bersihkan style position lama jika ada
        currentStyle = currentStyle.replace(/position:\s*absolute;?/g, '')
                                   .replace(/left:\s*[^;]+;?/g, '')
                                   .replace(/top:\s*[^;]+;?/g, '')
                                   .replace(/z-index:\s*[^;]+;?/g, '');
        
        // Ambil posisi saat ini agar tidak melompat (diubah ke absolut relatif thdp ql-editor)
        const editorRect = quill.root.getBoundingClientRect();
        const imgRect = currentSelectedImage.getBoundingClientRect();
        
        // Offset dikali 1/currentZoom untuk mendapatkan angka unzoomed css
        const leftOffset = (imgRect.left - editorRect.left) / currentZoom;
        const topOffset = (imgRect.top - editorRect.top) / currentZoom;
        
        const newStyle = currentStyle + ` position: absolute; left: ${leftOffset}px; top: ${topOffset}px; z-index: 10;`;
        currentSelectedImage.setAttribute('data-align', 'free');
        blot.format('data-align', 'free');
        blot.format('style', newStyle);
    }
    if (imageContextMenu) imageContextMenu.style.display = 'none';
    setTimeout(updateOverlayPosition, 50);
    setDirty(true);
});

// --- LOGIKA MELAYANG BEBAS & DRAG GAMBAR (ABSOLUTE DRAGGING) ---

// --- LOGIKA MENYERET (DRAG) GAMBAR MELAYANG ---
let isDraggingImg = false;
let dragStartX, dragStartY, imgStartLeft, imgStartTop;

quill.root.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'IMG' && e.target.style.position === 'absolute') {
        isDraggingImg = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        imgStartLeft = parseFloat(e.target.style.left) || 0;
        imgStartTop = parseFloat(e.target.style.top) || 0;
        e.preventDefault(); // Cegah drag bawaan teks/browser yang membayangi
    }
});

window.addEventListener('mousemove', (e) => {
    if (isDraggingImg && currentSelectedImage) {
        const dx = (e.clientX - dragStartX) / currentZoom;
        const dy = (e.clientY - dragStartY) / currentZoom;
        
        currentSelectedImage.style.left = (imgStartLeft + dx) + 'px';
        currentSelectedImage.style.top = (imgStartTop + dy) + 'px';
        
        updateOverlayPosition(); // Biarkan overlay menempel dan ikut terseret
    }
});

window.addEventListener('mouseup', () => {
    if (isDraggingImg && currentSelectedImage) {
        isDraggingImg = false;
        
        // Rekam posisi koordinat baru ke Delta agar bisa disimpan
        const blot = Quill.find(currentSelectedImage);
        if(blot) {
            blot.format('style', currentSelectedImage.getAttribute('style'));
            setDirty(true);
        }
    }
});


// Tombol Tutup di Modal Error Kustom
const btnErrorClose = document.getElementById('btn-error-close');
if (btnErrorClose) {
    btnErrorClose.addEventListener('click', () => {
        const modalError = document.getElementById('modal-error');
        if (modalError) {
            modalError.classList.add('hidden');
            modalError.style.display = 'none';
        }
    });
}

// --- LOGIKA SIDEBAR & HALAMAN PENGATURAN ---
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
}

const menuHome = document.getElementById('menu-home');
const menuSettings = document.getElementById('menu-settings');
const menuTemplates = document.getElementById('menu-templates');
const menuExtraTools = document.getElementById('menu-extra-tools');
const viewHomeNew = document.getElementById('view-home');
const viewSettings = document.getElementById('view-settings');
const viewTemplates = document.getElementById('view-templates');
const viewExtraTools = document.getElementById('view-extra-tools');
const viewEditorNew = document.getElementById('view-editor');

if (menuHome && menuSettings) {
    menuHome.addEventListener('click', () => {
        menuHome.classList.add('active');
        menuSettings.classList.remove('active');
        if (menuTemplates) menuTemplates.classList.remove('active');
        if (menuExtraTools) menuExtraTools.classList.remove('active');
        viewHomeNew.classList.add('active');
        viewSettings.classList.remove('active');
        if (viewTemplates) viewTemplates.classList.remove('active');
        if (viewExtraTools) viewExtraTools.classList.remove('active');
        viewEditorNew.classList.remove('active');
        renderRecentDocs();
    });

    menuSettings.addEventListener('click', () => {
        menuSettings.classList.add('active');
        menuHome.classList.remove('active');
        if (menuTemplates) menuTemplates.classList.remove('active');
        if (menuExtraTools) menuExtraTools.classList.remove('active');
        viewSettings.classList.add('active');
        viewHomeNew.classList.remove('active');
        if (viewTemplates) viewTemplates.classList.remove('active');
        if (viewExtraTools) viewExtraTools.classList.remove('active');
        viewEditorNew.classList.remove('active');
    });

    if (menuTemplates) {
        menuTemplates.addEventListener('click', () => {
            menuTemplates.classList.add('active');
            menuHome.classList.remove('active');
            menuSettings.classList.remove('active');
            if (menuExtraTools) menuExtraTools.classList.remove('active');
            if (viewTemplates) viewTemplates.classList.add('active');
            viewHomeNew.classList.remove('active');
            viewSettings.classList.remove('active');
            if (viewExtraTools) viewExtraTools.classList.remove('active');
            viewEditorNew.classList.remove('active');
            if (typeof window.reloadTemplatesGallery === 'function') {
                window.reloadTemplatesGallery();
            }
        });
    }

    if (menuExtraTools) {
        menuExtraTools.addEventListener('click', () => {
            menuExtraTools.classList.add('active');
            menuHome.classList.remove('active');
            menuSettings.classList.remove('active');
            if (menuTemplates) menuTemplates.classList.remove('active');
            if (viewExtraTools) viewExtraTools.classList.add('active');
            viewHomeNew.classList.remove('active');
            viewSettings.classList.remove('active');
            if (viewTemplates) viewTemplates.classList.remove('active');
            viewEditorNew.classList.remove('active');
        });
    }
}

// Logika Tombol Bersihkan Riwayat
const btnClearHistory = document.getElementById('btn-clear-history-2');
if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
        if(confirm(window.t('Apakah Anda yakin ingin menghapus semua riwayat Dokumen Terakhir? (File fisik tidak akan dihapus)'))) {
            localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify([]));
            alert(window.t('Riwayat berhasil dibersihkan!'));
            if(typeof renderRecentDocs === 'function') renderRecentDocs();
        }
    });
}

// Logika Navigasi Flat UI Pengaturan (Master-Detail Split Pane)
const tabSetGeneral = document.getElementById('tab-set-general');
const tabSetEditor = document.getElementById('tab-set-editor');
const tabSetExport = document.getElementById('tab-set-export');
const tabSetAdvanced = document.getElementById('tab-set-advanced');

const paneSetGeneral = document.getElementById('pane-set-general');
const paneSetEditor = document.getElementById('pane-set-editor');
const paneSetExport = document.getElementById('pane-set-export');
const paneSetAdvanced = document.getElementById('pane-set-advanced');

const allTabs = [tabSetGeneral, tabSetEditor, tabSetExport, tabSetAdvanced];
const allPanes = [paneSetGeneral, paneSetEditor, paneSetExport, paneSetAdvanced];

function switchSettingsPane(activeTab, activePane) {
    if(!activeTab || !activePane) return;
    // Matikan semua
    allTabs.forEach(t => t && t.classList.remove('active'));
    allPanes.forEach(p => p && (p.style.display = 'none'));
    // Nyalakan yang dipilih
    activeTab.classList.add('active');
    activePane.style.display = 'block';
}

if(tabSetGeneral) tabSetGeneral.addEventListener('click', () => switchSettingsPane(tabSetGeneral, paneSetGeneral));
if(tabSetEditor) tabSetEditor.addEventListener('click', () => switchSettingsPane(tabSetEditor, paneSetEditor));
if(tabSetExport) tabSetExport.addEventListener('click', () => switchSettingsPane(tabSetExport, paneSetExport));
if(tabSetAdvanced) tabSetAdvanced.addEventListener('click', () => switchSettingsPane(tabSetAdvanced, paneSetAdvanced));

// Pastikan saat masuk pengaturan, tab umum yang terpilih
if (menuSettings) {
    menuSettings.addEventListener('click', () => {
        switchSettingsPane(tabSetGeneral, paneSetGeneral);
    });
}

// Sinkronisasi kontrol Skala Tampilan Aplikasi
const settingAppZoom = document.getElementById('setting-app-zoom');
if (settingAppZoom) {
    settingAppZoom.value = savedAppZoom;
    settingAppZoom.addEventListener('change', (e) => {
        applyAppZoom(e.target.value);
    });
}

// --- FITUR BARU: UBAH KAPITALISASI (CHANGE CASE) & TANDA FORMAT PARAGRAF (PILCROW) ---
const btnChangeCase = document.getElementById('btn-change-case');
const popoverChangeCase = document.getElementById('popover-change-case');
const btnTogglePilcrow = document.getElementById('btn-toggle-pilcrow');

function applyCaseTransform(text, mode) {
    if (!text) return text;
    switch (mode) {
        case 'sentence':
            return text.toLowerCase().replace(/(^|[.!?\r\n]+[\s]*)([\p{L}])/gu, (m, p1, p2) => p1 + p2.toUpperCase());
        case 'lower':
            return text.toLowerCase();
        case 'upper':
            return text.toUpperCase();
        case 'title':
            return text.toLowerCase().replace(/(^|[\s\(\[\{<"“”«»]+)(\p{L})/gu, (m, p1, p2) => p1 + p2.toUpperCase());
        case 'toggle':
            return text.split('').map(ch => {
                if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
                    return ch.toLowerCase();
                } else if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) {
                    return ch.toUpperCase();
                }
                return ch;
            }).join('');
        default:
            return text;
    }
}

function executeChangeCase(mode) {
    let range = quill.getSelection();
    if (!range) return;

    if (range.length === 0) {
        const docLength = quill.getLength();
        const cursor = range.index;
        const fullDocText = quill.getText(0, docLength);
        let start = cursor;
        while (start > 0 && !/\s/.test(fullDocText[start - 1])) start--;
        let end = cursor;
        while (end < docLength - 1 && !/\s/.test(fullDocText[end])) end++;
        if (end > start) {
            range = { index: start, length: end - start };
        } else {
            return;
        }
    }

    const fullSelectedText = quill.getText(range.index, range.length);
    if (!fullSelectedText) return;

    const transformedFullText = applyCaseTransform(fullSelectedText, mode);
    const contents = quill.getContents(range.index, range.length);
    const Delta = Quill.import('delta');
    const updateDelta = new Delta().retain(range.index);

    let charPos = 0;
    contents.ops.forEach(op => {
        if (typeof op.insert === 'string') {
            const len = op.insert.length;
            const newSegment = transformedFullText.slice(charPos, charPos + len);
            charPos += len;
            updateDelta.delete(len);
            updateDelta.insert(newSegment, op.attributes);
        } else {
            updateDelta.retain(1);
        }
    });

    quill.updateContents(updateDelta, 'user');
    quill.setSelection(range.index, transformedFullText.length);
}

function cycleShiftF3() {
    let range = quill.getSelection();
    if (!range) return;

    if (range.length === 0) {
        const docLength = quill.getLength();
        const cursor = range.index;
        const fullDocText = quill.getText(0, docLength);
        let start = cursor;
        while (start > 0 && !/\s/.test(fullDocText[start - 1])) start--;
        let end = cursor;
        while (end < docLength - 1 && !/\s/.test(fullDocText[end])) end++;
        if (end > start) {
            range = { index: start, length: end - start };
            quill.setSelection(range.index, range.length);
        } else {
            return;
        }
    }

    const text = quill.getText(range.index, range.length);
    if (!text.trim()) return;

    const isAllUpper = text === text.toUpperCase() && text !== text.toLowerCase();
    const isAllLower = text === text.toLowerCase() && text !== text.toUpperCase();

    let nextMode = 'lower';
    if (isAllLower) {
        nextMode = 'upper';
    } else if (isAllUpper) {
        nextMode = text.includes(' ') ? 'title' : 'sentence';
    } else {
        nextMode = 'lower';
    }

    executeChangeCase(nextMode);
}

// Inisialisasi Tombol & Popover Ubah Kapitalisasi (Change Case)
if (btnChangeCase && popoverChangeCase) {
    btnChangeCase.addEventListener('mousedown', (e) => e.preventDefault());
    btnChangeCase.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('dropdown-font-size-menu')?.classList.add('hidden');
        document.getElementById('popover-font-color')?.classList.add('hidden');
        document.getElementById('popover-highlight-color')?.classList.add('hidden');
        document.getElementById('popover-paste-options')?.classList.add('hidden');
        document.getElementById('popover-home-lineheight')?.classList.add('hidden');
        document.getElementById('popover-styles-gallery')?.classList.add('hidden');
        popoverChangeCase.classList.toggle('hidden');
    });

    popoverChangeCase.addEventListener('click', (e) => e.stopPropagation());

    const caseItems = popoverChangeCase.querySelectorAll('.change-case-item');
    caseItems.forEach(item => {
        item.addEventListener('mousedown', (e) => e.preventDefault());
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const mode = item.dataset.mode;
            if (mode) executeChangeCase(mode);
            popoverChangeCase.classList.add('hidden');
            quill.focus();
        });
    });
}

// --- FITUR: TAMPILKAN / SEMBUNYIKAN TANDA FORMAT PARAGRAF (PILCROW) ---
let isFormattingMarksActive = false;

function toggleFormattingMarks(forceState) {
    const editor = document.querySelector('.ql-editor');
    if (!editor) return;

    if (typeof forceState === 'boolean') {
        isFormattingMarksActive = forceState;
    } else {
        isFormattingMarksActive = !isFormattingMarksActive;
    }

    if (isFormattingMarksActive) {
        editor.classList.add('show-formatting-marks');
        btnTogglePilcrow?.classList.add('active');
    } else {
        editor.classList.remove('show-formatting-marks');
        btnTogglePilcrow?.classList.remove('active');
    }

    try {
        localStorage.setItem('baku_show_pilcrow', isFormattingMarksActive ? 'true' : 'false');
    } catch (_) {}
}

if (btnTogglePilcrow) {
    btnTogglePilcrow.addEventListener('mousedown', (e) => e.preventDefault());
    btnTogglePilcrow.addEventListener('click', () => {
        toggleFormattingMarks();
        quill.focus();
    });
}

// Pulihkan preferensi Pilcrow dari sesi sebelumnya jika ada
try {
    if (localStorage.getItem('baku_show_pilcrow') === 'true') {
        toggleFormattingMarks(true);
    }
} catch (_) {}

// --- FITUR BARU: KUAS FORMAT (FORMAT PAINTER) ---
const btnFormatPainter = document.getElementById('btn-format-painter');
let copiedFormat = null;
let isFormatPainterActive = false;

if (btnFormatPainter) {
    btnFormatPainter.addEventListener('click', () => {
        const range = quill.getSelection();
        if (!isFormatPainterActive) {
            // Aktifkan mode kuas format
            if (!range) return;
            copiedFormat = quill.getFormat(range.index, range.length > 0 ? range.length : 1);
            isFormatPainterActive = true;
            btnFormatPainter.classList.add('ql-active');
            document.querySelector('.ql-editor').style.cursor = 'crosshair';
        } else {
            // Batalkan mode kuas
            deactivateFormatPainter();
        }
    });
}

function deactivateFormatPainter() {
    isFormatPainterActive = false;
    copiedFormat = null;
    if (btnFormatPainter) {
        btnFormatPainter.classList.remove('ql-active');
    }
    const editor = document.querySelector('.ql-editor');
    if (editor) editor.style.cursor = 'text';
}

// Dengarkan saat user selesai memblok teks baru untuk menempelkan format
quill.root.addEventListener('mouseup', () => {
    if (isFormatPainterActive && copiedFormat) {
        setTimeout(() => {
            const range = quill.getSelection();
            if (range && range.length > 0) {
                // Terapkan semua format yang disalin ke teks yang baru dipilih
                // Hapus format lama dulu
                quill.removeFormat(range.index, range.length);
                
                // Tempelkan properti format satu per satu
                for (const [formatName, formatValue] of Object.entries(copiedFormat)) {
                    quill.formatText(range.index, range.length, formatName, formatValue);
                }
                
                // Matikan mode kuas setelah dipakai satu kali
                deactivateFormatPainter();
            }
        }, 10);
    }
});

// --- LOGIKA TOMBOL MODAL EKSPOR SUKSES ---
const btnExportFolder = document.getElementById('btn-export-folder');
const btnExportOpen = document.getElementById('btn-export-open');
const btnExportClose = document.getElementById('btn-export-close');
const modalExportSuccess = document.getElementById('modal-export-success');

if (btnExportClose) {
    btnExportClose.addEventListener('click', () => {
        modalExportSuccess.classList.add('hidden');
        setTimeout(() => modalExportSuccess.style.display = 'none', 200);
        const modalTool = document.getElementById('modal-pdf-tool');
        if (modalTool) {
            modalTool.classList.add('hidden');
            modalTool.style.display = 'none';
        }
    });
}

if (modalExportSuccess) {
    modalExportSuccess.addEventListener('click', (e) => {
        if (e.target === modalExportSuccess) {
            modalExportSuccess.classList.add('hidden');
            setTimeout(() => modalExportSuccess.style.display = 'none', 200);
            const modalTool = document.getElementById('modal-pdf-tool');
            if (modalTool) {
                modalTool.classList.add('hidden');
                modalTool.style.display = 'none';
            }
        }
    });
}

if (btnExportOpen) {
    btnExportOpen.addEventListener('click', async () => {
        if (!window.__TAURI__) return;
        const filePath = modalExportSuccess.dataset.filepath;
        if (filePath) {
            try {
                if (window.__TAURI__.tauri && window.__TAURI__.tauri.invoke) {
                    await window.__TAURI__.tauri.invoke('open_file_path', { path: filePath });
                } else if (window.__TAURI__.invoke) {
                    await window.__TAURI__.invoke('open_file_path', { path: filePath });
                } else {
                    await window.__TAURI__.shell.open(filePath);
                }
            } catch (e) {
                console.warn("Gagal membuka PDF via invoke, mencoba shell.open:", e);
                try {
                    await window.__TAURI__.shell.open(filePath);
                } catch (err) {
                    console.error("Gagal membuka file PDF:", err);
                    alert((window.t ? window.t('Gagal membuka file PDF: ') : "Gagal membuka file PDF: ") + err);
                }
            }
        }
    });
}

if (btnExportFolder) {
    btnExportFolder.addEventListener('click', async () => {
        if (!window.__TAURI__) return;
        const filePath = modalExportSuccess.dataset.filepath;
        if (filePath) {
            try {
                if (window.__TAURI__.tauri && window.__TAURI__.tauri.invoke) {
                    await window.__TAURI__.tauri.invoke('show_in_folder', { path: filePath });
                } else if (window.__TAURI__.invoke) {
                    await window.__TAURI__.invoke('show_in_folder', { path: filePath });
                } else {
                    const folderPath = filePath.substring(0, filePath.lastIndexOf('\\')) || filePath.substring(0, filePath.lastIndexOf('/'));
                    await window.__TAURI__.shell.open(folderPath);
                }
            } catch (e) {
                console.warn("Gagal membuka folder via invoke, mencoba shell.open:", e);
                try {
                    const folderPath = filePath.substring(0, filePath.lastIndexOf('\\')) || filePath.substring(0, filePath.lastIndexOf('/'));
                    await window.__TAURI__.shell.open(folderPath);
                } catch (err) {
                    console.error("Gagal membuka folder:", err);
                    alert((window.t ? window.t('Gagal membuka folder: ') : "Gagal membuka folder: ") + err);
                }
            }
        }
    });
}

// --- LOGIKA BILAH STATUS (STATUS BAR) ---
let totalPages = 1;
let currentPage = 1;

function updatePageIndicator() {
    const editor = document.querySelector('.ql-editor');
    if (!editor || !canvasArea) return;
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    
    const viewportMiddle = canvasArea.scrollTop + (canvasArea.clientHeight / 2);
    const zoomedTotalPageHeightPx = totalPageHeightPx * (typeof currentZoom !== 'undefined' ? currentZoom : 1.0);
    
    let newCurrentPage = Math.floor(viewportMiddle / zoomedTotalPageHeightPx) + 1;
    if (newCurrentPage > totalPages) newCurrentPage = totalPages;
    if (newCurrentPage < 1) newCurrentPage = 1;
    
    if (newCurrentPage !== currentPage) {
        currentPage = newCurrentPage;
        const statusPage = document.getElementById('status-page');
        if (statusPage) {
            statusPage.textContent = window.t('Halaman') + ` ${currentPage} ` + window.t('dari') + ` ${totalPages}`;
        }
    }
}

function updateStatusBar() {
    // 1. Hitung total halaman
    const mmToPx = 96 / 25.4;
    const gapPx = 15 * mmToPx;
    const pageHeightPx = paperConfig.height * mmToPx;
    const totalPageHeightPx = pageHeightPx + gapPx;
    const editor = document.querySelector('.ql-editor');
    const lastChild = editor ? editor.lastElementChild : null;
    let contentHeight = 0;
    if (lastChild) {
        contentHeight = lastChild.offsetTop + lastChild.offsetHeight + 48;
    }
    totalPages = parseInt(editor?.dataset?.pagesNeeded || '0') || Math.max(1, Math.ceil((contentHeight + gapPx) / totalPageHeightPx));
    
    // 2. Update indikator nomor halaman
    updatePageIndicator();
    const statusPage = document.getElementById('status-page');
    if (statusPage) {
        statusPage.textContent = window.t('Halaman') + ` ${currentPage} ` + window.t('dari') + ` ${totalPages}`;
    }

    // 3. Hitung Kata & Statistik Dokumen
    const stats = getDocumentStats();
    const statusWords = document.getElementById('status-word-count');
    if (statusWords) {
        if (stats.hasSelection) {
            statusWords.textContent = `${stats.selWords}/${stats.totalWords} ` + window.t('Kata');
        } else {
            statusWords.textContent = `${stats.totalWords} ` + window.t('Kata');
        }
    }
    updateDocStatsPopover();

    // 4. Update persentase zoom
    const zoomVal = document.getElementById('status-zoom-val');
    if (zoomVal) zoomVal.textContent = `${Math.round(currentZoom * 100)}%`;

    // 5. Tampilkan bahasa aplikasi yang sedang aktif
    const statusLangText = document.getElementById('status-lang-text');
    if (statusLangText) {
        const currentLang = localStorage.getItem('baku_lang') || 'id';
        statusLangText.textContent = currentLang === 'en' ? 'English (US)' : 'Bahasa Indonesia';
    }
}

// Perhitungan Rinci Statistik Dokumen
function getDocumentStats() {
    const fullText = quill.getText();
    const cleanFullText = fullText.endsWith('\n') ? fullText.slice(0, -1) : fullText;
    
    const range = quill.getSelection();
    const hasSelection = range && range.length > 0;
    const selectedText = hasSelection ? quill.getText(range.index, range.length) : '';
    
    // Hitung total
    const totalWords = cleanFullText.trim().length > 0 ? cleanFullText.trim().split(/\s+/).length : 0;
    const totalCharsNoSpace = cleanFullText.replace(/\s/g, '').length;
    const totalCharsWithSpace = cleanFullText.length;
    const totalParagraphs = cleanFullText.trim().length > 0 ? cleanFullText.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    
    let selWords = 0, selCharsNoSpace = 0, selCharsWithSpace = 0;
    if (hasSelection) {
        selWords = selectedText.trim().length > 0 ? selectedText.trim().split(/\s+/).length : 0;
        selCharsNoSpace = selectedText.replace(/\s/g, '').length;
        selCharsWithSpace = selectedText.length;
    }
    
    const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
    const minUnit = isEn ? 'min' : 'mnt';
    const readingMinutes = Math.max(1, Math.ceil(totalWords / 200));
    const readingTimeStr = totalWords < 50 ? `< 1 ${minUnit}` : `~${readingMinutes} ${minUnit}`;
    
    const editor = document.querySelector('.ql-editor');
    const totalPages = parseInt(editor?.dataset?.pagesNeeded || '1') || 1;
    
    return {
        hasSelection,
        totalWords,
        selWords,
        totalCharsNoSpace,
        selCharsNoSpace,
        totalCharsWithSpace,
        selCharsWithSpace,
        totalParagraphs,
        totalPages,
        readingTimeStr
    };
}

function updateDocStatsPopover() {
    const popover = document.getElementById('popover-doc-stats');
    if (!popover || popover.style.display === 'none' || popover.style.display === '') return;
    
    const stats = getDocumentStats();
    const isEn = (localStorage.getItem('baku_lang') || 'id') === 'en';
    
    // Sinkronisasi judul & label berdasarkan bahasa aktif
    const lblTitle = document.getElementById('stat-lbl-title');
    if (lblTitle) lblTitle.textContent = isEn ? 'Document Statistics' : 'Statistik Dokumen';
    
    const badgeSelection = document.getElementById('stat-badge-selection');
    if (badgeSelection) {
        badgeSelection.textContent = isEn ? 'Selected Text' : 'Teks Terpilih';
        badgeSelection.style.display = stats.hasSelection ? 'inline-block' : 'none';
    }
    
    const lblPages = document.getElementById('stat-lbl-pages');
    if (lblPages) lblPages.textContent = isEn ? 'Pages:' : 'Halaman:';
    
    const lblWords = document.getElementById('stat-lbl-words');
    if (lblWords) lblWords.textContent = isEn ? 'Words:' : 'Kata:';
    
    const lblCharsNoSpace = document.getElementById('stat-lbl-chars-no-space');
    if (lblCharsNoSpace) lblCharsNoSpace.textContent = isEn ? 'Characters (no spaces):' : 'Karakter (tanpa spasi):';
    
    const lblCharsWithSpace = document.getElementById('stat-lbl-chars-with-space');
    if (lblCharsWithSpace) lblCharsWithSpace.textContent = isEn ? 'Characters (with spaces):' : 'Karakter (dengan spasi):';
    
    const lblParagraphs = document.getElementById('stat-lbl-paragraphs');
    if (lblParagraphs) lblParagraphs.textContent = isEn ? 'Paragraphs:' : 'Paragraf:';
    
    const lblReadingTime = document.getElementById('stat-lbl-reading-time');
    if (lblReadingTime) lblReadingTime.textContent = isEn ? 'Reading Time (est.):' : 'Waktu Baca (est.):';
    
    // Nilai-nilai statistik
    const elPages = document.getElementById('stat-pages');
    if (elPages) elPages.textContent = stats.totalPages;
    
    const elWords = document.getElementById('stat-words');
    if (elWords) {
        elWords.textContent = stats.hasSelection 
            ? (isEn ? `${stats.selWords} (${stats.selWords} of ${stats.totalWords} selected)` : `${stats.selWords} (${stats.selWords} dari ${stats.totalWords} terpilih)`)
            : `${stats.totalWords}`;
    }
    
    const elCharsNoSpace = document.getElementById('stat-chars-no-space');
    if (elCharsNoSpace) {
        elCharsNoSpace.textContent = stats.hasSelection 
            ? `${stats.selCharsNoSpace} / ${stats.totalCharsNoSpace}`
            : `${stats.totalCharsNoSpace}`;
    }
    
    const elCharsWithSpace = document.getElementById('stat-chars-with-space');
    if (elCharsWithSpace) {
        elCharsWithSpace.textContent = stats.hasSelection 
            ? `${stats.selCharsWithSpace} / ${stats.totalCharsWithSpace}`
            : `${stats.totalCharsWithSpace}`;
    }
    
    const elParagraphs = document.getElementById('stat-paragraphs');
    if (elParagraphs) elParagraphs.textContent = stats.totalParagraphs;
    
    const elReadingTime = document.getElementById('stat-reading-time');
    if (elReadingTime) elReadingTime.textContent = stats.readingTimeStr;
}

function toggleDocStatsPopover(show) {
    const popover = document.getElementById('popover-doc-stats');
    if (!popover) return;
    
    const isVisible = popover.style.display === 'flex';
    const shouldShow = typeof show === 'boolean' ? show : !isVisible;
    
    if (shouldShow) {
        popover.style.display = 'flex';
        updateDocStatsPopover();
    } else {
        popover.style.display = 'none';
    }
}

// Event Listeners Statistik Dokumen
const statusWordCount = document.getElementById('status-word-count');
const popoverDocStats = document.getElementById('popover-doc-stats');
const btnCloseStats = document.getElementById('btn-close-stats');
const ribbonBtnStats = document.getElementById('ribbon-btn-stats');

if (statusWordCount) {
    statusWordCount.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDocStatsPopover();
    });
}

if (ribbonBtnStats) {
    ribbonBtnStats.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDocStatsPopover(true);
    });
}

if (btnCloseStats) {
    btnCloseStats.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDocStatsPopover(false);
    });
}

if (popoverDocStats) {
    popoverDocStats.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 7. Logika Tombol Bahasa di Status Bar
const statusLangBtn = document.getElementById('status-lang');
const langContextMenu = document.getElementById('lang-context-menu');
if (statusLangBtn && langContextMenu) {
    statusLangBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (langContextMenu.style.display === 'none' || langContextMenu.style.display === '') {
            langContextMenu.style.display = 'flex';
        } else {
            langContextMenu.style.display = 'none';
        }
    });

    document.getElementById('btn-lang-id').addEventListener('click', () => {
        if (typeof applyLang === 'function') applyLang('id');
        updateStatusBar();
        langContextMenu.style.display = 'none';
    });

    document.getElementById('btn-lang-en').addEventListener('click', () => {
        if (typeof applyLang === 'function') applyLang('en');
        updateStatusBar();
        langContextMenu.style.display = 'none';
    });

    // Sembunyikan jika klik di luar
    window.addEventListener('click', () => {
        langContextMenu.style.display = 'none';
        if (popoverDocStats) popoverDocStats.style.display = 'none';
    });
}

// Pantau jika pengguna mengetik, menghapus, atau menyeleksi teks dengan debounce agar tidak memberatkan pengetikan
let statusBarDebounceTimer = null;
function scheduleUpdateStatusBar(delay = 150) {
    if (statusBarDebounceTimer) clearTimeout(statusBarDebounceTimer);
    statusBarDebounceTimer = setTimeout(() => {
        updateStatusBar();
        statusBarDebounceTimer = null;
    }, delay);
}

quill.on('text-change', () => scheduleUpdateStatusBar(150));
quill.on('selection-change', () => scheduleUpdateStatusBar(80));

// Pantau jika pengguna menscroll mouse (Hanya indikator halaman yang diupdate tanpa recount kata yang berat)
let scrollRafId = null;
canvasArea.addEventListener('scroll', () => {
    if (!scrollRafId) {
        scrollRafId = requestAnimationFrame(() => {
            updatePageIndicator();
            scrollRafId = null;
        });
    }
});

// Panggil sekali di awal untuk menginisialisasi
setTimeout(updateStatusBar, 500);

// Tombol di Status Bar untuk Zoom
const btnSbZoomIn = document.getElementById('btn-zoom-in');
const btnSbZoomOut = document.getElementById('btn-zoom-out');
const statusSbZoomVal = document.getElementById('status-zoom-val');

if (btnSbZoomIn) {
    btnSbZoomIn.addEventListener('click', () => document.getElementById('action-zoom-in').click());
}
if (btnSbZoomOut) {
    btnSbZoomOut.addEventListener('click', () => document.getElementById('action-zoom-out').click());
}
if (statusSbZoomVal) {
    statusSbZoomVal.addEventListener('click', () => document.getElementById('action-zoom-reset').click());
}

// --- FITUR SISIPKAN (INSERT) ---

// 1. Sisipkan Tanggal (Auto Date)
const btnInsertDate = document.getElementById('btn-insert-date');
if (btnInsertDate) {
    btnInsertDate.addEventListener('click', () => {
        const currentLang = localStorage.getItem('baku_lang') || 'id';
        const localeCode = currentLang === 'en' ? 'en-US' : 'id-ID';
        
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat(localeCode, dateOptions).format(new Date());
        
        const range = quill.getSelection(true);
        quill.insertText(range.index, formattedDate, 'user');
        quill.setSelection(range.index + formattedDate.length);
    });
}

// 1.b Sisipkan Page / Section Break
const btnInsertPage = document.getElementById('btn-insert-page');
const dropdownPageMenu = document.getElementById('dropdown-page-menu');
const btnInsertPagebreakMenu = document.getElementById('btn-insert-pagebreak-menu');
const btnInsertSectionbreakMenu = document.getElementById('btn-insert-sectionbreak-menu');

if (btnInsertPage && dropdownPageMenu) {
    btnInsertPage.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownPageMenu.style.display === 'none';
        dropdownPageMenu.style.display = isHidden ? 'flex' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!btnInsertPage.contains(e.target) && !dropdownPageMenu.contains(e.target)) {
            dropdownPageMenu.style.display = 'none';
        }
    });
}

if (btnInsertPagebreakMenu) {
    btnInsertPagebreakMenu.addEventListener('click', () => {
        dropdownPageMenu.style.display = 'none';
        quill.focus();
        let range = quill.getSelection(true);
        insertPageBreak(quill, range, false);
    });
}

if (btnInsertSectionbreakMenu) {
    btnInsertSectionbreakMenu.addEventListener('click', () => {
        dropdownPageMenu.style.display = 'none';
        quill.focus();
        let range = quill.getSelection(true);
        insertPageBreak(quill, range, true);
    });
}

const btnPageNumberSettingsMenu = document.getElementById('btn-page-number-settings-menu');
if (btnPageNumberSettingsMenu) {
    btnPageNumberSettingsMenu.addEventListener('click', () => {
        dropdownPageMenu.style.display = 'none';
        // Buka pengaturan dokumen (section 0)
        if (typeof openPageNumberSettings === 'function') openPageNumberSettings('doc');
    });
}

// 2. Sisipkan Simbol (Special Characters)
const btnInsertSymbol = document.getElementById('btn-insert-symbol');
const modalSymbol = document.getElementById('modal-symbol-overlay');
const btnCloseSymbol = document.getElementById('btn-close-symbol');
const symbolGrid = document.getElementById('symbol-grid');

const COMMON_SYMBOLS = [
    '©','®','™','°','µ','±','÷','×','½','¼','¾','✓','✗','∞','≈','≠','≤','≥',
    'α','β','γ','δ','ε','θ','λ','π','σ','φ','ω','Δ','Σ','Ω',
    '€','£','¥','¢','₹','₽','←','↑','→','↓','↔','↕','•','◦','▪','▫'
];

// Buat grid secara dinamis
if (symbolGrid) {
    COMMON_SYMBOLS.forEach(sym => {
        const btn = document.createElement('button');
        btn.textContent = sym;
        btn.style.width = '100%';
        btn.style.height = '40px';
        btn.style.fontSize = '14pt';
        btn.style.background = '#FFFFFF';
        btn.style.border = '1px solid #E1DFDD';
        btn.style.cursor = 'pointer';
        btn.style.color = '#2D3142';
        
        btn.addEventListener('mouseover', () => btn.style.background = '#F3F2F1');
        btn.addEventListener('mouseout', () => btn.style.background = '#FFFFFF');
        
        btn.addEventListener('click', () => {
            const range = quill.getSelection(true);
            quill.insertText(range.index, sym, 'user');
            quill.setSelection(range.index + 1);
            modalSymbol.style.display = 'none';
        });
        
        symbolGrid.appendChild(btn);
    });
}

if (btnInsertSymbol && modalSymbol && btnCloseSymbol) {
    btnInsertSymbol.addEventListener('click', () => {
        modalSymbol.style.display = 'flex';
        modalSymbol.classList.remove('hidden');
    });
    
    btnCloseSymbol.addEventListener('click', () => {
        modalSymbol.style.display = 'none';
    });
}

// 3. Sisipkan Tabel (Dropdown Grid + Modal Kustom)
const btnInsertTable = document.getElementById('btn-insert-table');
const dropdownTable = document.getElementById('dropdown-table');
const btnCustomTable = document.getElementById('btn-custom-table');

const modalTable = document.getElementById('modal-table-overlay');
const btnCancelTable = document.getElementById('btn-cancel-table');
const btnConfirmTable = document.getElementById('btn-confirm-table');

const gridSelector = document.getElementById('table-grid-selector');
const gridLabel = document.getElementById('table-grid-label');

let selectedRows = 3;
let selectedCols = 3;

if (gridSelector && dropdownTable) {
    // Buat 80 kotak (10 kolom x 8 baris)
    for (let r = 1; r <= 8; r++) {
        for (let c = 1; c <= 10; c++) {
            let box = document.createElement('div');
            box.style.border = '1px solid #C8C6C4';
            box.style.background = '#FFFFFF';
            box.dataset.row = r;
            box.dataset.col = c;
            
            // Saat di-hover, beri warna pada matriks
            box.addEventListener('mouseover', () => {
                selectedRows = r;
                selectedCols = c;
                gridLabel.textContent = `${c}x${r} ` + window.t('Tabel');
                
                // Mewarnai kotak
                Array.from(gridSelector.children).forEach(child => {
                    const childRow = parseInt(child.dataset.row);
                    const childCol = parseInt(child.dataset.col);
                    if (childRow <= r && childCol <= c) {
                        child.style.background = '#CCE8FF';
                        child.style.borderColor = '#0078D4';
                    } else {
                        child.style.background = '#FFFFFF';
                        child.style.borderColor = '#C8C6C4';
                    }
                });
            });

            // Saat diklik, cetak tabel ke dokumen!
            box.addEventListener('click', () => {
                let range = quill.getSelection();
                if (!range) {
                    range = lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
                    quill.setSelection(range.index, 0);
                }
                const tableModule = quill.getModule('table');
                if (tableModule) {
                    tableModule.insertTable(r, c);
                }
                dropdownTable.style.display = 'none';
                setDirty(true);
                quill.focus();
            });
            
            gridSelector.appendChild(box);
        }
    }
}

// Menampilkan Dropdown Menu di bawah tombol
if (btnInsertTable && dropdownTable) {
    btnInsertTable.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Posisikan dropdown tepat di bawah tombol
        const rect = btnInsertTable.getBoundingClientRect();
        dropdownTable.style.top = (rect.bottom + 4) + 'px';
        dropdownTable.style.left = rect.left + 'px';
        
        dropdownTable.style.display = 'flex';
        dropdownTable.classList.remove('hidden');
        
        // Reset tampilan awal 3x3
        const defaultBox = gridSelector?.children[22]; // (baris 3, kolom 3) index 22
        if (defaultBox) defaultBox.dispatchEvent(new Event('mouseover'));
    });
}

// Menutup dropdown jika user mengklik area luar
window.addEventListener('click', (e) => {
    if (dropdownTable && dropdownTable.style.display !== 'none') {
        if (!dropdownTable.contains(e.target) && e.target !== btnInsertTable) {
            dropdownTable.style.display = 'none';
        }
    }
});

// Aksi "Tabel Kustom..." -> Buka Modal
if (btnCustomTable && modalTable) {
    btnCustomTable.addEventListener('click', () => {
        dropdownTable.style.display = 'none'; // tutup dropdown
        
        modalTable.classList.remove('hidden');
        modalTable.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999999;';
    });
}

// Aksi Modal Tabel Kustom
if (btnCancelTable && modalTable) {
    btnCancelTable.addEventListener('click', () => {
        modalTable.style.display = 'none';
    });
}

if (btnConfirmTable && modalTable) {
    btnConfirmTable.addEventListener('click', () => {
        const rows = parseInt(document.getElementById('input-table-rows').value) || 3;
        const cols = parseInt(document.getElementById('input-table-cols').value) || 3;
        
        let range = quill.getSelection();
        if (!range) {
            range = lastSelection || { index: Math.max(0, quill.getLength() - 1), length: 0 };
            quill.setSelection(range.index, 0);
        }
        const tableModule = quill.getModule('table');
        if (tableModule) {
            tableModule.insertTable(rows, cols);
        } else {
            alert("Modul tabel gagal dimuat.");
        }
        modalTable.style.display = 'none';
        setDirty(true);
        quill.focus();
    });
}

// 4. Deteksi Kursor di Dalam Tabel & Floating Toolbar
const tableToolbar = document.getElementById('table-floating-toolbar');
const tableMiniBtn = document.getElementById('table-mini-btn');

quill.on('selection-change', (range) => {
    if (!range) return;
    const tableModule = quill.getModule('table');
    if (!tableModule) return;
    
    // Cek apakah kursor berada di dalam sel tabel (TD)
    const [cell, offset] = quill.getLeaf(range.index);
    if (cell && cell.parent && cell.parent.statics.blotName === 'table') {
        const domNode = cell.parent.domNode; // elemen TD
        const canvasArea = document.getElementById('canvas-area');
        
        if (domNode && canvasArea && tableMiniBtn) {
            const rect = domNode.getBoundingClientRect();
            const canvasRect = canvasArea.getBoundingClientRect();
            
            // Cari elemen pembungkus tabel seutuhnya
            const tableNode = domNode.closest('table') || domNode.closest('tbody') || domNode.parentElement.parentElement;
            const tableRect = tableNode.getBoundingClientRect();
            
            // Posisikan tombol mini dengan mengukur guliran scroll saat ini!
            const topPos = (tableRect.top - canvasRect.top) + canvasArea.scrollTop - 14;
            let leftPos;
            
            // Logika Spasial Kiri/Kanan dengan Margin Ekstra Jauh
            if (rect.left > tableRect.left + (tableRect.width / 2)) {
                // Kursor di paruh kanan tabel -> taruh di Kanan Atas dengan margin renggang
                leftPos = (tableRect.right - canvasRect.left) + canvasArea.scrollLeft + 14;
            } else {
                // Kursor di paruh kiri tabel -> taruh di Kiri Atas dengan margin renggang
                leftPos = (tableRect.left - canvasRect.left) + canvasArea.scrollLeft - 32;
            }
            
            tableMiniBtn.style.top = topPos + 'px';
            tableMiniBtn.style.left = leftPos + 'px';
            tableMiniBtn.style.display = 'flex';
        }
    } else {
        // Sembunyikan jika keluar dari tabel
        if (tableMiniBtn) tableMiniBtn.style.display = 'none';
        if (tableToolbar) tableToolbar.style.display = 'none';
    }
});

if (tableMiniBtn && tableToolbar) {
    tableMiniBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tableMiniBtn.style.display = 'none';
        
        // Posisikan toolbar besar tepat di posisi tombol mini
        tableToolbar.style.top = tableMiniBtn.style.top;
        tableToolbar.style.left = tableMiniBtn.style.left;
        tableToolbar.style.display = 'block';
    });
}

// Menutup toolbar tabel besar jika klik di luar
window.addEventListener('click', (e) => {
    if (tableToolbar && tableToolbar.style.display === 'block') {
        if (!tableToolbar.contains(e.target) && e.target !== tableMiniBtn) {
            tableToolbar.style.display = 'none';
            // Kembalikan ke mode mini jika masih di tabel
            const range = quill.getSelection();
            if (range) {
                const [cell] = quill.getLeaf(range.index);
                if (cell && cell.parent && cell.parent.statics.blotName === 'table') {
                    tableMiniBtn.style.display = 'flex';
                }
            }
        }
    }
});

// Aksi Tombol Toolbar Tabel Melayang
document.getElementById('tbl-row-above')?.addEventListener('click', () => {
    quill.getModule('table').insertRowAbove();
    tableToolbar.style.display = 'none';
    tableMiniBtn.style.display = 'flex';
});
document.getElementById('tbl-row-below')?.addEventListener('click', () => {
    quill.getModule('table').insertRowBelow();
    tableToolbar.style.display = 'none';
    tableMiniBtn.style.display = 'flex';
});
document.getElementById('tbl-col-left')?.addEventListener('click', () => {
    quill.getModule('table').insertColumnLeft();
    tableToolbar.style.display = 'none';
    tableMiniBtn.style.display = 'flex';
});
document.getElementById('tbl-col-right')?.addEventListener('click', () => {
    quill.getModule('table').insertColumnRight();
    tableToolbar.style.display = 'none';
    tableMiniBtn.style.display = 'flex';
});
document.getElementById('tbl-del-row')?.addEventListener('click', () => {
    quill.getModule('table').deleteRow();
    tableToolbar.style.display = 'none';
});
document.getElementById('tbl-del-col')?.addEventListener('click', () => {
    quill.getModule('table').deleteColumn();
    tableToolbar.style.display = 'none';
});



// --- LOGIKA HAPUS GAMBAR ---
const modalDelImg = document.getElementById('modal-delete-image');
const btnConfirmDelImg = document.getElementById('btn-confirm-del-img');
const btnCancelDelImg = document.getElementById('btn-cancel-del-img');

window.addEventListener('keydown', (e) => {
    if ((e.key === 'Delete' || e.key === 'Backspace') && currentSelectedImage && !imageOverlay.classList.contains('hidden')) {
        e.preventDefault();
        modalDelImg.style.display = 'flex';
        btnConfirmDelImg.focus(); // Auto fokus ke tombol hapus
    }
});

btnCancelDelImg.addEventListener('click', () => {
    modalDelImg.style.display = 'none';
    quill.focus();
});

btnConfirmDelImg.addEventListener('click', () => {
    if (currentSelectedImage) {
        const blot = Quill.find(currentSelectedImage);
        if (blot) blot.deleteAt(0, 1);
        currentSelectedImage = null;
        imageOverlay.classList.add('hidden');
        if (imageContextMenu) imageContextMenu.style.display = 'none';
        setDirty(true);
    }
    modalDelImg.style.display = 'none';
    quill.focus();
});

// Pastikan teks shortcut pada Dropdown Menu Bar disesuaikan dengan OS
if (typeof window.updateMenuBarShortcuts === 'function') {
    window.updateMenuBarShortcuts();
}

// ============================================================
// KONTROL WARNA TEKS & WARNA SOROTAN (FONT & HIGHLIGHT COLOR)
// ============================================================

const FONT_COLORS = [
    '#000000', '#4B5563', '#DC2626', '#EA580C', '#D97706',
    '#16A34A', '#2563EB', '#4F46E5', '#9333EA', '#DB2777'
];

const HIGHLIGHT_COLORS = [
    '#FFF176', '#A5D6A7', '#81D4FA', '#F48FB1', '#FFB74D',
    '#CE93D8', '#CFD8DC', '#EF5350', '#80CBC4', '#FFF59D'
];

function applyTextColor(formatName, colorValue) {
    quill.focus();
    const sel = quill.getSelection() || lastSelection;
    if (sel && sel.length > 0) {
        quill.formatText(sel.index, sel.length, formatName, colorValue, Quill.sources.USER);
    } else {
        quill.format(formatName, colorValue, Quill.sources.USER);
    }
    setDirty(true);
}

function updateFontSizePopoverSelection(sz) {
    const items = document.querySelectorAll('#dropdown-font-size-menu .font-size-item');
    items.forEach(it => {
        it.classList.toggle('selected', parseFloat(it.dataset.size) === parseFloat(sz));
    });
}

function initFontSizeCombobox() {
    const inputFontSize = document.getElementById('input-font-size');
    const btnFontSizeArrow = document.getElementById('btn-font-size-arrow');
    const popoverFontSize = document.getElementById('dropdown-font-size-menu');
    const items = popoverFontSize?.querySelectorAll('.font-size-item');

    if (!inputFontSize) return;

    inputFontSize.addEventListener('focus', () => {
        inputFontSize.select();
    });

    inputFontSize.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            applyFontSize(inputFontSize.value);
            quill.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            let current = parseFloat(inputFontSize.value) || 11;
            applyFontSize(current + 1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            let current = parseFloat(inputFontSize.value) || 11;
            if (current > 1) applyFontSize(current - 1);
        } else if (e.key === 'Escape') {
            let currentFmt = getEffectiveEditorFormat();
            let currentSize = currentFmt.size ? (parseFloat(currentFmt.size) || 11) : 11;
            inputFontSize.value = currentSize;
            inputFontSize.blur();
            quill.focus();
        }
    });

    inputFontSize.addEventListener('blur', () => {
        applyFontSize(inputFontSize.value);
    });

    if (btnFontSizeArrow && popoverFontSize) {
        btnFontSizeArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('popover-home-lineheight')?.classList.add('hidden');
            document.getElementById('popover-font-color')?.classList.add('hidden');
            document.getElementById('popover-highlight-color')?.classList.add('hidden');
            document.getElementById('popover-paste-options')?.classList.add('hidden');
            document.getElementById('popover-change-case')?.classList.add('hidden');
            document.getElementById('popover-styles-gallery')?.classList.add('hidden');
            popoverFontSize.classList.toggle('hidden');
        });
    }

    items?.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const sz = item.dataset.size;
            applyFontSize(sz);
            popoverFontSize?.classList.add('hidden');
            quill.focus();
        });
    });
}

function initLineHeightControls() {
    const btnHomeLineHeight = document.getElementById('btn-home-lineheight');
    const popoverHomeLineHeight = document.getElementById('popover-home-lineheight');
    const items = popoverHomeLineHeight?.querySelectorAll('.lineheight-item');
    const ribbonQuickLineHeight = document.getElementById('ribbon-quick-lineheight');

    function applyLineHeight(val) {
        quill.format('lineheight', val);
        items?.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === val);
        });
        if (ribbonQuickLineHeight && ribbonQuickLineHeight.value !== val) {
            ribbonQuickLineHeight.value = val;
        }
    }

    if (btnHomeLineHeight && popoverHomeLineHeight) {
        btnHomeLineHeight.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('dropdown-font-size-menu')?.classList.add('hidden');
            document.getElementById('popover-font-color')?.classList.add('hidden');
            document.getElementById('popover-highlight-color')?.classList.add('hidden');
            document.getElementById('popover-paste-options')?.classList.add('hidden');
            document.getElementById('popover-change-case')?.classList.add('hidden');
            document.getElementById('popover-styles-gallery')?.classList.add('hidden');
            popoverHomeLineHeight.classList.toggle('hidden');
        });
    }

    items?.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            applyLineHeight(btn.dataset.value);
            popoverHomeLineHeight?.classList.add('hidden');
        });
    });

    if (ribbonQuickLineHeight) {
        ribbonQuickLineHeight.addEventListener('change', () => {
            applyLineHeight(ribbonQuickLineHeight.value);
        });
    }
}

// ============================================================
// FITUR: GALERI GAYA TEKS VISUAL (QUICK STYLES GALLERY)
// ============================================================
function applyTextStyle(styleName) {
    quill.focus();
    function resetBlockStyles() {
        quill.format('header', false, 'user');
        quill.format('blockquote', false, 'user');
        quill.format('code-block', false, 'user');
        if (TextStylePreset) {
            quill.format('stylepreset', false, 'user');
        }
    }

    switch (styleName) {
        case 'normal':
            resetBlockStyles();
            quill.format('lineheight', '1.15', 'user');
            break;
        case 'no-spacing':
            resetBlockStyles();
            quill.format('lineheight', '1', 'user');
            break;
        case 'title':
            resetBlockStyles();
            if (TextStylePreset) {
                quill.format('stylepreset', 'title', 'user');
            } else {
                quill.format('header', 1, 'user');
            }
            break;
        case 'subtitle':
            resetBlockStyles();
            if (TextStylePreset) {
                quill.format('stylepreset', 'subtitle', 'user');
            } else {
                quill.format('header', 3, 'user');
            }
            break;
        case 'h1':
            resetBlockStyles();
            quill.format('header', 1, 'user');
            break;
        case 'h2':
            resetBlockStyles();
            quill.format('header', 2, 'user');
            break;
        case 'h3':
            resetBlockStyles();
            quill.format('header', 3, 'user');
            break;
        case 'h4':
            resetBlockStyles();
            quill.format('header', 4, 'user');
            break;
        case 'quote':
            resetBlockStyles();
            quill.format('blockquote', true, 'user');
            break;
        case 'intense-quote':
            resetBlockStyles();
            if (TextStylePreset) {
                quill.format('stylepreset', 'intense-quote', 'user');
            } else {
                quill.format('blockquote', true, 'user');
            }
            break;
        case 'code':
            resetBlockStyles();
            quill.format('code-block', true, 'user');
            break;
    }
    updateActiveStyleCard();
}

function updateActiveStyleCard() {
    const range = quill.getSelection();
    let currentStyle = 'normal';
    if (range) {
        try {
            const format = quill.getFormat(range.index, range.length > 0 ? range.length : 1);
            if (format['code-block']) {
                currentStyle = 'code';
            } else if (format.stylepreset === 'intense-quote') {
                currentStyle = 'intense-quote';
            } else if (format.stylepreset === 'title') {
                currentStyle = 'title';
            } else if (format.stylepreset === 'subtitle') {
                currentStyle = 'subtitle';
            } else if (format.blockquote) {
                currentStyle = 'quote';
            } else if (format.header === 1 || format.header === '1') {
                currentStyle = 'h1';
            } else if (format.header === 2 || format.header === '2') {
                currentStyle = 'h2';
            } else if (format.header === 3 || format.header === '3') {
                currentStyle = 'h3';
            } else if (format.header === 4 || format.header === '4') {
                currentStyle = 'h4';
            } else if (format.lineheight === '1' || format.lineheight === 1) {
                currentStyle = 'no-spacing';
            } else {
                currentStyle = 'normal';
            }
        } catch (_) {}
    }
    const allCards = document.querySelectorAll('.style-card, .style-more-card');
    allCards.forEach(card => {
        card.classList.toggle('active', card.dataset.style === currentStyle);
    });
}

function initStylesGallery() {
    const scrollContainer = document.getElementById('styles-gallery-scroll');
    const btnScrollLeft = document.getElementById('btn-styles-scroll-left');
    const btnScrollRight = document.getElementById('btn-styles-scroll-right');
    const btnMore = document.getElementById('btn-styles-more');
    const popoverMore = document.getElementById('popover-styles-gallery');
    const btnClearFormat = document.getElementById('btn-styles-clear-format');

    // Handler klik pada kartu gaya di galeri utama & popover
    const cards = document.querySelectorAll('.style-card, .style-more-card');
    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => e.preventDefault());
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const styleName = card.dataset.style;
            if (styleName) applyTextStyle(styleName);
            if (popoverMore) popoverMore.classList.add('hidden');
        });
    });

    // Navigasi gulir horizontal galeri kartu
    if (btnScrollLeft && scrollContainer) {
        btnScrollLeft.addEventListener('mousedown', (e) => e.preventDefault());
        btnScrollLeft.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollContainer.scrollBy({ left: -140, behavior: 'smooth' });
        });
    }

    if (btnScrollRight && scrollContainer) {
        btnScrollRight.addEventListener('mousedown', (e) => e.preventDefault());
        btnScrollRight.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollContainer.scrollBy({ left: 140, behavior: 'smooth' });
        });
    }

    // Tombol Popover "Semua Gaya" (More)
    if (btnMore && popoverMore) {
        btnMore.addEventListener('mousedown', (e) => e.preventDefault());
        btnMore.addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('dropdown-font-size-menu')?.classList.add('hidden');
            document.getElementById('popover-font-color')?.classList.add('hidden');
            document.getElementById('popover-highlight-color')?.classList.add('hidden');
            document.getElementById('popover-paste-options')?.classList.add('hidden');
            document.getElementById('popover-home-lineheight')?.classList.add('hidden');
            document.getElementById('popover-change-case')?.classList.add('hidden');
            popoverMore.classList.toggle('hidden');
        });

        popoverMore.addEventListener('click', (e) => e.stopPropagation());
    }

    // Tombol Bersihkan Format di popover galeri
    if (btnClearFormat) {
        btnClearFormat.addEventListener('mousedown', (e) => e.preventDefault());
        btnClearFormat.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.ql-clean')?.click();
            if (TextStylePreset) {
                quill.format('stylepreset', false, 'user');
            }
            quill.format('header', false, 'user');
            quill.format('blockquote', false, 'user');
            quill.format('code-block', false, 'user');
            quill.format('lineheight', false, 'user');
            popoverMore?.classList.add('hidden');
            updateActiveStyleCard();
        });
    }
}

function initColorControls() {
    const btnFontColorMain = document.getElementById('btn-font-color-main');
    const btnFontColorArrow = document.getElementById('btn-font-color-arrow');
    const popoverFontColor = document.getElementById('popover-font-color');
    const fontColorBar = document.getElementById('font-color-bar');
    const gridFont = document.getElementById('grid-font-colors');
    const btnFontAuto = document.getElementById('btn-font-color-auto');
    const btnCustomFontTrigger = document.getElementById('btn-custom-font-color-trigger');
    const inputCustomFont = document.getElementById('input-custom-font-color');

    const btnHighlightMain = document.getElementById('btn-highlight-main');
    const btnHighlightArrow = document.getElementById('btn-highlight-arrow');
    const popoverHighlightColor = document.getElementById('popover-highlight-color');
    const highlightColorBar = document.getElementById('highlight-color-bar');
    const gridHighlight = document.getElementById('grid-highlight-colors');
    const btnHighlightNoColor = document.getElementById('btn-highlight-no-color');

    // 1. Inisialisasi Swatches Warna Teks
    if (gridFont) {
        gridFont.innerHTML = '';
        FONT_COLORS.forEach(c => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = c;
            swatch.dataset.color = c;
            swatch.title = c;
            swatch.addEventListener('mousedown', (e) => e.preventDefault());
            swatch.addEventListener('click', (e) => {
                e.stopPropagation();
                lastFontColor = c;
                if (fontColorBar) fontColorBar.style.backgroundColor = c;
                applyTextColor('color', c);
                if (popoverFontColor) popoverFontColor.classList.add('hidden');
            });
            gridFont.appendChild(swatch);
        });
    }

    // Tombol Utama Font Color
    if (btnFontColorMain) {
        btnFontColorMain.addEventListener('mousedown', (e) => e.preventDefault());
        btnFontColorMain.addEventListener('click', () => {
            applyTextColor('color', lastFontColor);
        });
    }

    // Tombol Panah Font Color (Buka/Tutup Palet)
    if (btnFontColorArrow) {
        btnFontColorArrow.addEventListener('mousedown', (e) => e.preventDefault());
        btnFontColorArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (popoverHighlightColor) popoverHighlightColor.classList.add('hidden');
            document.getElementById('popover-change-case')?.classList.add('hidden');
            document.getElementById('popover-styles-gallery')?.classList.add('hidden');
            if (popoverFontColor) popoverFontColor.classList.toggle('hidden');
        });
    }

    // Tombol Font Color Otomatis (Hitam Baku)
    if (btnFontAuto) {
        btnFontAuto.addEventListener('mousedown', (e) => e.preventDefault());
        btnFontAuto.addEventListener('click', () => {
            lastFontColor = '#000000';
            if (fontColorBar) fontColorBar.style.backgroundColor = '#000000';
            applyTextColor('color', false);
            if (popoverFontColor) popoverFontColor.classList.add('hidden');
        });
    }

    // Tombol Custom Font Color (Warna Lainnya...)
    if (btnCustomFontTrigger) {
        btnCustomFontTrigger.addEventListener('click', () => {
            if (inputCustomFont) inputCustomFont.click();
        });
    }

    if (inputCustomFont) {
        inputCustomFont.addEventListener('input', (e) => {
            const val = e.target.value;
            lastFontColor = val;
            if (fontColorBar) fontColorBar.style.backgroundColor = val;
            applyTextColor('color', val);
            if (popoverFontColor) popoverFontColor.classList.add('hidden');
        });
    }

    // 2. Inisialisasi Swatches Warna Sorotan Teks (Stabilo)
    if (gridHighlight) {
        gridHighlight.innerHTML = '';
        HIGHLIGHT_COLORS.forEach(c => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = c;
            swatch.dataset.color = c;
            swatch.title = c;
            swatch.addEventListener('mousedown', (e) => e.preventDefault());
            swatch.addEventListener('click', (e) => {
                e.stopPropagation();
                lastHighlightColor = c;
                if (highlightColorBar) highlightColorBar.style.backgroundColor = c;
                applyTextColor('background', c);
                if (popoverHighlightColor) popoverHighlightColor.classList.add('hidden');
            });
            gridHighlight.appendChild(swatch);
        });
    }

    // Tombol Utama Highlight Color
    if (btnHighlightMain) {
        btnHighlightMain.addEventListener('mousedown', (e) => e.preventDefault());
        btnHighlightMain.addEventListener('click', () => {
            applyTextColor('background', lastHighlightColor);
        });
    }

    // Tombol Panah Highlight Color (Buka/Tutup Palet)
    if (btnHighlightArrow) {
        btnHighlightArrow.addEventListener('mousedown', (e) => e.preventDefault());
        btnHighlightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (popoverFontColor) popoverFontColor.classList.add('hidden');
            document.getElementById('popover-change-case')?.classList.add('hidden');
            document.getElementById('popover-styles-gallery')?.classList.add('hidden');
            if (popoverHighlightColor) popoverHighlightColor.classList.toggle('hidden');
        });
    }

    // Tombol Tanpa Warna (Hapus Stabilo)
    if (btnHighlightNoColor) {
        btnHighlightNoColor.addEventListener('mousedown', (e) => e.preventDefault());
        btnHighlightNoColor.addEventListener('click', () => {
            applyTextColor('background', false);
            if (popoverHighlightColor) popoverHighlightColor.classList.add('hidden');
        });
    }

    // Cegah penutupan saat klik di dalam area popover
    popoverFontColor?.addEventListener('click', (e) => e.stopPropagation());
    popoverHighlightColor?.addEventListener('click', (e) => e.stopPropagation());
    const popoverPaste = document.getElementById('popover-paste-options');
    popoverPaste?.addEventListener('click', (e) => e.stopPropagation());
    const popoverFontSize = document.getElementById('dropdown-font-size-menu');
    popoverFontSize?.addEventListener('click', (e) => e.stopPropagation());
    const popoverHomeLineHeight = document.getElementById('popover-home-lineheight');
    popoverHomeLineHeight?.addEventListener('click', (e) => e.stopPropagation());
    const popoverCase = document.getElementById('popover-change-case');
    popoverCase?.addEventListener('click', (e) => e.stopPropagation());
    const popoverStyles = document.getElementById('popover-styles-gallery');
    popoverStyles?.addEventListener('click', (e) => e.stopPropagation());

    // Tutup popover saat klik di luar area tombol/palet
    window.addEventListener('click', (e) => {
        const contFont = document.getElementById('container-font-color');
        const contHighlight = document.getElementById('container-highlight-color');
        const contPaste = document.getElementById('container-paste-options');
        const contFontSize = document.getElementById('container-font-size');
        const contLineHeight = document.getElementById('container-lineheight');
        const contChangeCase = document.getElementById('container-change-case');
        const contStyles = document.getElementById('container-styles-gallery');

        if (contFont && !contFont.contains(e.target)) {
            popoverFontColor?.classList.add('hidden');
        }
        if (contHighlight && !contHighlight.contains(e.target)) {
            popoverHighlightColor?.classList.add('hidden');
        }
        if (contPaste && !contPaste.contains(e.target)) {
            popoverPaste?.classList.add('hidden');
        }
        if (contFontSize && !contFontSize.contains(e.target)) {
            popoverFontSize?.classList.add('hidden');
        }
        if (contLineHeight && !contLineHeight.contains(e.target)) {
            popoverHomeLineHeight?.classList.add('hidden');
        }
        if (contChangeCase && !contChangeCase.contains(e.target)) {
            popoverCase?.classList.add('hidden');
        }
        if (contStyles && !contStyles.contains(e.target)) {
            popoverStyles?.classList.add('hidden');
        }
    });
}

// ============================================================
// LOGIKA PENGGARIS HORISONTAL VISUAL (VISUAL RULER)
// ============================================================

let isDraggingLeftMarker = false;
let isDraggingRightMarker = false;
let currentTempLeft = null;
let currentTempRight = null;

function syncRulerPosition() {
    const rulerContainer = document.getElementById('ruler-bar-container');
    const visualRuler = document.getElementById('visual-ruler');
    const canvasArea = document.getElementById('canvas-area');
    if (!rulerContainer || !visualRuler || !canvasArea) return;

    // Kalkulasi dimensi fisik kertas yang ter-zoom
    const mmToPx = 96 / 25.4;
    const zoom = (typeof currentZoom !== 'undefined' && currentZoom) ? currentZoom : 1.0;
    const physicalPaperWidth = paperConfig.width * mmToPx * zoom;

    const rulerRect = rulerContainer.getBoundingClientRect();
    const canvasRect = canvasArea.getBoundingClientRect();
    const deltaX = canvasRect.left - rulerRect.left;

    // Ruang kanvas yang tersedia untuk perataan tengah (padding kiri dan kanan masing-masing 40px)
    const availableWidth = canvasArea.clientWidth - 80;

    const wrapper = document.getElementById('export-wrapper');
    if (wrapper) {
        const targetMarginLeft = (physicalPaperWidth <= availableWidth) ? 'auto' : '0';
        const targetMarginRight = (physicalPaperWidth <= availableWidth) ? 'auto' : '40px';
        if (wrapper.style.marginLeft !== targetMarginLeft) {
            wrapper.style.marginLeft = targetMarginLeft;
        }
        if (wrapper.style.marginRight !== targetMarginRight) {
            wrapper.style.marginRight = targetMarginRight;
        }
    }

    let rulerLeft;
    if (physicalPaperWidth <= availableWidth) {
        // Dokumen berada persis di tengah kanvas (margin: 0 auto)
        rulerLeft = deltaX + (canvasArea.clientWidth - physicalPaperWidth) / 2;
    } else {
        // Dokumen lebih lebar dari kanvas, merapat ke padding kiri (40px) dan tergeser scroll horizontal
        rulerLeft = deltaX + 40 - canvasArea.scrollLeft;
    }

    visualRuler.style.left = `${rulerLeft}px`;
    visualRuler.style.width = `${physicalPaperWidth}px`;
}

function renderVisualRuler() {
    const rulerContainer = document.getElementById('ruler-bar-container');
    const visualRuler = document.getElementById('visual-ruler');
    if (!rulerContainer || !visualRuler) return;

    const rulerPref = localStorage.getItem('baku_ruler_visible');
    const isVisible = rulerPref !== 'false';
    rulerContainer.style.display = isVisible ? 'block' : 'none';

    const checkEl = document.getElementById('menu-ruler-check');
    if (checkEl) checkEl.style.display = isVisible ? 'inline-flex' : 'none';
    const ribbonBtn = document.getElementById('ribbon-btn-toggle-ruler');
    if (ribbonBtn) {
        if (isVisible) ribbonBtn.classList.add('active');
        else ribbonBtn.classList.remove('active');
    }

    if (!isVisible) return;

    syncRulerPosition();

    const leftBg = document.getElementById('ruler-left-margin-bg');
    const bodyBg = document.getElementById('ruler-body-bg');
    const rightBg = document.getElementById('ruler-right-margin-bg');
    const markerLeft = document.getElementById('ruler-marker-left');
    const markerRight = document.getElementById('ruler-marker-right');
    const svgTicks = document.getElementById('ruler-ticks-svg');

    const totalWidthMm = paperConfig.width;
    const leftMarginMm = paperConfig.marginLeft;
    const rightMarginMm = paperConfig.marginRight;

    const leftPct = (leftMarginMm / totalWidthMm) * 100;
    const rightPct = (rightMarginMm / totalWidthMm) * 100;

    if (leftBg) leftBg.style.width = `${leftPct}%`;
    if (bodyBg) {
        bodyBg.style.left = `${leftPct}%`;
        bodyBg.style.right = `${rightPct}%`;
    }
    if (rightBg) rightBg.style.width = `${rightPct}%`;

    if (markerLeft) {
        markerLeft.style.left = `${leftPct}%`;
    }
    if (markerRight) {
        markerRight.style.left = `calc(100% - ${rightPct}%)`;
    }

    if (!svgTicks) return;

    const zoom = (typeof currentZoom !== 'undefined' && currentZoom) ? currentZoom : 1.0;
    let cmStep = 1;
    let showMm = true;
    if (zoom < 0.55) {
        cmStep = 5;
        showMm = false;
    } else if (zoom < 0.8) {
        cmStep = 2;
        showMm = false;
    }

    let svgContent = '';
    for (let m = 0; m <= totalWidthMm; m += 1) {
        const pct = (m / totalWidthMm) * 100;
        const isCm = (m % 10 === 0);
        const isHalfCm = (m % 5 === 0);
        const cmVal = m / 10;

        if (isCm) {
            svgContent += `<line x1="${pct}%" y1="16" x2="${pct}%" y2="26" stroke="#9E9E9E" stroke-width="1"/>`;
            if (cmVal > 0 && m < totalWidthMm && (cmVal % cmStep === 0)) {
                svgContent += `<text x="${pct}%" y="12" font-size="8.5" fill="#616161" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${cmVal}</text>`;
            }
        } else if (isHalfCm) {
            svgContent += `<line x1="${pct}%" y1="19" x2="${pct}%" y2="26" stroke="#BDBDBD" stroke-width="1"/>`;
        } else if (showMm) {
            svgContent += `<line x1="${pct}%" y1="22" x2="${pct}%" y2="26" stroke="#D1D5DB" stroke-width="0.75"/>`;
        }
    }

    svgTicks.innerHTML = svgContent;
}

function showRulerGuideline(valMm, isLeft) {
    const guideline = document.getElementById('ruler-guideline');
    const tooltip = document.getElementById('ruler-guideline-tooltip');
    const canvasArea = document.getElementById('canvas-area');
    const visualRuler = document.getElementById('visual-ruler');
    if (!guideline || !canvasArea || !visualRuler) return;

    const canvasRect = canvasArea.getBoundingClientRect();
    const rulerRect = visualRuler.getBoundingClientRect();

    guideline.style.display = 'block';
    guideline.style.top = '0';
    guideline.style.height = Math.max(canvasArea.scrollHeight, canvasArea.clientHeight) + 'px';

    if (tooltip) {
        tooltip.style.top = (canvasArea.scrollTop + 8) + 'px';
    }

    if (isLeft) {
        const valPct = valMm / paperConfig.width;
        const x = (rulerRect.left - canvasRect.left + canvasArea.scrollLeft) + (valPct * rulerRect.width);
        guideline.style.left = `${x}px`;
        if (tooltip) {
            const prefix = window.t ? window.t('Margin Kiri:') : 'Margin Kiri:';
            tooltip.textContent = `${prefix} ${valMm.toFixed(1)} mm`;
            tooltip.style.left = '6px';
            tooltip.style.right = 'auto';
        }
    } else {
        const valPct = (paperConfig.width - valMm) / paperConfig.width;
        const x = (rulerRect.left - canvasRect.left + canvasArea.scrollLeft) + (valPct * rulerRect.width);
        guideline.style.left = `${x}px`;
        if (tooltip) {
            const prefix = window.t ? window.t('Margin Kanan:') : 'Margin Kanan:';
            tooltip.textContent = `${prefix} ${valMm.toFixed(1)} mm`;
            tooltip.style.left = 'auto';
            tooltip.style.right = '6px';
        }
    }
}

function hideRulerGuideline() {
    const guideline = document.getElementById('ruler-guideline');
    if (guideline) guideline.style.display = 'none';
}

function toggleRulerVisibility() {
    const rulerPref = localStorage.getItem('baku_ruler_visible');
    const currentVis = rulerPref !== 'false';
    const newVis = !currentVis;
    localStorage.setItem('baku_ruler_visible', newVis ? 'true' : 'false');
    renderVisualRuler();
}

function initVisualRulerEvents() {
    const markerLeft = document.getElementById('ruler-marker-left');
    const markerRight = document.getElementById('ruler-marker-right');
    const ribbonBtnToggle = document.getElementById('ribbon-btn-toggle-ruler');
    const actionToggle = document.getElementById('action-toggle-ruler');
    const canvasArea = document.getElementById('canvas-area');

    if (ribbonBtnToggle) ribbonBtnToggle.addEventListener('click', toggleRulerVisibility);
    if (actionToggle) actionToggle.addEventListener('click', toggleRulerVisibility);

    let lastRulerScrollLeft = -1;
    let rulerScrollRafId = null;

    window.addEventListener('resize', syncRulerPosition);
    if (canvasArea) {
        canvasArea.addEventListener('scroll', () => {
            // Hanya sinkronkan penggaris horizontal jika scrollLeft benar-benar berubah!
            // Pengguliran vertikal (scrollTop) sama sekali tidak mempengaruhi posisi horizontal penggaris.
            if (canvasArea.scrollLeft !== lastRulerScrollLeft) {
                lastRulerScrollLeft = canvasArea.scrollLeft;
                if (!rulerScrollRafId) {
                    rulerScrollRafId = requestAnimationFrame(() => {
                        syncRulerPosition();
                        rulerScrollRafId = null;
                    });
                }
            }

            if (isDraggingLeftMarker && typeof currentTempLeft === 'number') {
                showRulerGuideline(currentTempLeft, true);
            } else if (isDraggingRightMarker && typeof currentTempRight === 'number') {
                showRulerGuideline(currentTempRight, false);
            }
        }, { passive: true });
    }

    if (markerLeft) {
        markerLeft.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDraggingLeftMarker = true;
            markerLeft.classList.add('dragging');
            currentTempLeft = paperConfig.marginLeft;
            showRulerGuideline(paperConfig.marginLeft, true);
        });
    }

    if (markerRight) {
        markerRight.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isDraggingRightMarker = true;
            markerRight.classList.add('dragging');
            currentTempRight = paperConfig.marginRight;
            showRulerGuideline(paperConfig.marginRight, false);
        });
    }

    window.addEventListener('mousemove', (e) => {
        if (!isDraggingLeftMarker && !isDraggingRightMarker) return;

        const visualRuler = document.getElementById('visual-ruler');
        if (!visualRuler) return;
        const rulerRect = visualRuler.getBoundingClientRect();

        // Posisi kursor relatif terhadap lebar penggaris (0.0 sampai 1.0)
        const cursorRatio = Math.max(0, Math.min(1, (e.clientX - rulerRect.left) / rulerRect.width));
        const cursorMm = cursorRatio * paperConfig.width;

        if (isDraggingLeftMarker) {
            const maxLeft = Math.max(5, paperConfig.width - paperConfig.marginRight - 20);
            let valMm = Math.max(5, Math.min(maxLeft, Math.round(cursorMm * 2) / 2));
            currentTempLeft = valMm;

            showRulerGuideline(valMm, true);

            const leftBg = document.getElementById('ruler-left-margin-bg');
            const bodyBg = document.getElementById('ruler-body-bg');
            const mLeft = document.getElementById('ruler-marker-left');
            const pct = (valMm / paperConfig.width) * 100;
            if (leftBg) leftBg.style.width = `${pct}%`;
            if (bodyBg) bodyBg.style.left = `${pct}%`;
            if (mLeft) mLeft.style.left = `${pct}%`;
        } else if (isDraggingRightMarker) {
            const distFromRightMm = paperConfig.width - cursorMm;
            const maxRight = Math.max(5, paperConfig.width - paperConfig.marginLeft - 20);
            let valMm = Math.max(5, Math.min(maxRight, Math.round(distFromRightMm * 2) / 2));
            currentTempRight = valMm;

            showRulerGuideline(valMm, false);

            const rightBg = document.getElementById('ruler-right-margin-bg');
            const bodyBg = document.getElementById('ruler-body-bg');
            const mRight = document.getElementById('ruler-marker-right');
            const pct = (valMm / paperConfig.width) * 100;
            if (rightBg) rightBg.style.width = `${pct}%`;
            if (bodyBg) bodyBg.style.right = `${pct}%`;
            if (mRight) mRight.style.left = `calc(100% - ${pct}%)`;
        }
    });

    window.addEventListener('mouseup', () => {
        if (isDraggingLeftMarker) {
            isDraggingLeftMarker = false;
            document.getElementById('ruler-marker-left')?.classList.remove('dragging');
            hideRulerGuideline();
            if (typeof currentTempLeft === 'number' && currentTempLeft !== paperConfig.marginLeft) {
                paperConfig.marginLeft = currentTempLeft;
                const inputL = document.getElementById('margin-left');
                if (inputL) inputL.value = paperConfig.marginLeft;
                applyPageSetup();
                setDirty(true);
            }
            currentTempLeft = null;
        }

        if (isDraggingRightMarker) {
            isDraggingRightMarker = false;
            document.getElementById('ruler-marker-right')?.classList.remove('dragging');
            hideRulerGuideline();
            if (typeof currentTempRight === 'number' && currentTempRight !== paperConfig.marginRight) {
                paperConfig.marginRight = currentTempRight;
                const inputR = document.getElementById('margin-right');
                if (inputR) inputR.value = paperConfig.marginRight;
                applyPageSetup();
                setDirty(true);
            }
            currentTempRight = null;
        }
    });
}

// ============================================================
// FITUR: ALAT EKSTRA PDF (OFFLINE PDF TOOLS)
// ============================================================
function initExtraPdfTools() {
    const toolConfigs = {
        merge: {
            title: 'Gabungkan PDF',
            desc: 'Pilih berkas PDF yang ingin digabungkan.',
            dropLabel: 'Seret & lepas berkas PDF ke sini',
            badgeClass: 'bg-red',
            badgeIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><polyline points="12 11 12 17"></polyline><polyline points="9 14 12 17 15 14"></polyline><path d="M4 6v12"></path><path d="M20 6v12"></path></svg>',
            filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }],
            multiple: true,
            allowReorder: true
        },
        split: {
            title: 'Pisahkan PDF',
            desc: 'Pilih berkas PDF yang ingin dipisahkan halamannya.',
            dropLabel: 'Seret & lepas berkas PDF ke sini',
            badgeClass: 'bg-blue',
            badgeIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>',
            filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }],
            multiple: false,
            allowReorder: false
        },
        rotate: {
            title: 'Putar Halaman',
            desc: 'Pilih berkas PDF yang ingin diputar orientasinya.',
            dropLabel: 'Seret & lepas berkas PDF ke sini',
            badgeClass: 'bg-purple',
            badgeIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"></path><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>',
            filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }],
            multiple: false,
            allowReorder: false
        },
        img2pdf: {
            title: 'Gambar ke PDF',
            desc: 'Pilih gambar (JPG, PNG) yang ingin diubah menjadi PDF.',
            dropLabel: 'Seret & lepas gambar ke sini',
            badgeClass: 'bg-green',
            badgeIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
            filters: [{ name: window.t('Gambar (JPG, PNG, WEBP)'), extensions: ['jpg', 'jpeg', 'png', 'webp'] }],
            multiple: true,
            allowReorder: true
        }
    };

    let currentToolId = null;
    let currentQueue = [];
    let isProcessing = false;

    const modalTool = document.getElementById('modal-pdf-tool');
    const modalIconBadge = document.getElementById('modal-tool-icon-badge');
    const modalTitle = document.getElementById('modal-tool-title');
    const modalDesc = document.getElementById('modal-tool-desc');
    const dropzone = document.getElementById('pdf-dropzone');
    const dropzoneLabel = document.getElementById('pdf-dropzone-label');
    const btnBrowse = document.getElementById('btn-browse-pdf');
    const queueSection = document.getElementById('pdf-queue-section');
    const queueTotal = document.getElementById('pdf-queue-total');
    const queueList = document.getElementById('pdf-queue-list');
    const btnAddMore = document.getElementById('btn-add-more-pdf');
    const optionsSection = document.getElementById('pdf-tool-options');
    const paneSplit = document.getElementById('options-split');
    const paneRotate = document.getElementById('options-rotate');
    const paneImg2Pdf = document.getElementById('options-img2pdf');
    const statusBanner = document.getElementById('pdf-status-banner');
    const statusMessage = document.getElementById('pdf-status-message');
    const btnCloseModal = document.getElementById('btn-close-pdf-modal');
    const btnCancelModal = document.getElementById('btn-cancel-pdf-modal');
    const btnExecute = document.getElementById('btn-execute-pdf-tool');
    const btnExecuteLabel = document.getElementById('btn-execute-label');

    function openPdfTool(toolId) {
        const cfg = toolConfigs[toolId];
        if (!cfg) return;

        currentToolId = toolId;
        currentQueue = [];
        isProcessing = false;

        if (modalIconBadge) {
            modalIconBadge.className = 'pdf-modal-badge ' + cfg.badgeClass;
            modalIconBadge.innerHTML = cfg.badgeIcon;
        }
        if (modalTitle) modalTitle.textContent = window.t(cfg.title);
        if (modalDesc) modalDesc.textContent = window.t(cfg.desc);
        if (dropzoneLabel) dropzoneLabel.textContent = window.t(cfg.dropLabel);
        if (btnBrowse) {
            btnBrowse.textContent = (toolId === 'img2pdf') ? window.t('Pilih Gambar...') : window.t('Pilih Berkas...');
        }
        if (btnAddMore) {
            btnAddMore.textContent = (toolId === 'img2pdf') ? window.t('+ Tambah Gambar') : window.t('+ Tambah Berkas');
        }

        if (paneSplit) paneSplit.classList.toggle('hidden', toolId !== 'split');
        if (paneRotate) paneRotate.classList.toggle('hidden', toolId !== 'rotate');
        if (paneImg2Pdf) paneImg2Pdf.classList.toggle('hidden', toolId !== 'img2pdf');
        if (optionsSection) optionsSection.classList.toggle('hidden', toolId === 'merge');

        if (statusBanner) {
            statusBanner.className = 'pdf-status-banner hidden';
            if (statusMessage) statusMessage.textContent = '';
        }

        if (btnExecute) {
            btnExecute.disabled = true;
            if (btnExecuteLabel) btnExecuteLabel.textContent = window.t('Proses Sekarang');
        }

        renderQueue();

        if (modalTool) {
            modalTool.classList.remove('hidden');
            modalTool.style.display = 'flex';
        }
    }

    function closePdfTool(force = false) {
        if (isProcessing && !force) return;
        isProcessing = false;
        if (modalTool) {
            modalTool.classList.add('hidden');
            modalTool.style.display = 'none';
        }
        currentToolId = null;
        currentQueue = [];
        if (statusBanner) {
            statusBanner.className = 'pdf-status-banner hidden';
            if (statusMessage) statusMessage.textContent = '';
        }
    }

    function renderQueue() {
        if (!currentToolId) return;
        const cfg = toolConfigs[currentToolId];

        if (queueTotal) queueTotal.textContent = currentQueue.length.toString();

        let canExecute = false;
        if (currentToolId === 'merge') canExecute = currentQueue.length >= 2;
        else if (currentToolId === 'split') canExecute = currentQueue.length === 1;
        else if (currentToolId === 'rotate') canExecute = currentQueue.length === 1;
        else if (currentToolId === 'img2pdf') canExecute = currentQueue.length >= 1;

        if (btnExecute) btnExecute.disabled = !canExecute;

        if (currentQueue.length === 0) {
            if (queueSection) queueSection.classList.add('hidden');
            if (dropzone) dropzone.classList.remove('hidden');
            if (btnAddMore) btnAddMore.classList.add('hidden');
        } else {
            if (queueSection) queueSection.classList.remove('hidden');
            if (cfg.multiple) {
                if (dropzone) dropzone.classList.add('hidden');
                if (btnAddMore) btnAddMore.classList.remove('hidden');
            } else {
                if (dropzone) dropzone.classList.add('hidden');
                if (btnAddMore) btnAddMore.classList.add('hidden');
            }
        }

        if (queueList) {
            queueList.innerHTML = '';
            currentQueue.forEach((fileItem, idx) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'pdf-queue-item';

                const infoEl = document.createElement('div');
                infoEl.className = 'pdf-queue-item-info';

                const indexBadge = document.createElement('span');
                indexBadge.className = 'pdf-queue-index';
                indexBadge.textContent = (idx + 1).toString();

                const iconWrap = document.createElement('div');
                iconWrap.innerHTML = (currentToolId === 'img2pdf')
                    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D7D46" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
                    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D83B01" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';

                const titleWrap = document.createElement('div');
                titleWrap.style.overflow = 'hidden';
                const nameEl = document.createElement('span');
                nameEl.className = 'pdf-queue-item-name';
                nameEl.textContent = fileItem.name;
                nameEl.title = fileItem.path;
                titleWrap.appendChild(nameEl);

                infoEl.appendChild(indexBadge);
                infoEl.appendChild(iconWrap);
                infoEl.appendChild(titleWrap);

                const actionsEl = document.createElement('div');
                actionsEl.className = 'pdf-queue-item-actions';

                if (cfg.allowReorder) {
                    const btnUp = document.createElement('button');
                    btnUp.type = 'button';
                    btnUp.className = 'queue-btn';
                    btnUp.title = 'Pindah ke atas';
                    btnUp.disabled = idx === 0;
                    btnUp.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
                    btnUp.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const temp = currentQueue[idx];
                        currentQueue[idx] = currentQueue[idx - 1];
                        currentQueue[idx - 1] = temp;
                        renderQueue();
                    });

                    const btnDown = document.createElement('button');
                    btnDown.type = 'button';
                    btnDown.className = 'queue-btn';
                    btnDown.title = 'Pindah ke bawah';
                    btnDown.disabled = idx === currentQueue.length - 1;
                    btnDown.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                    btnDown.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const temp = currentQueue[idx];
                        currentQueue[idx] = currentQueue[idx + 1];
                        currentQueue[idx + 1] = temp;
                        renderQueue();
                    });

                    actionsEl.appendChild(btnUp);
                    actionsEl.appendChild(btnDown);
                }

                const btnRemove = document.createElement('button');
                btnRemove.type = 'button';
                btnRemove.className = 'queue-btn btn-remove';
                btnRemove.title = 'Hapus';
                btnRemove.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                btnRemove.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentQueue.splice(idx, 1);
                    renderQueue();
                });
                actionsEl.appendChild(btnRemove);

                itemEl.appendChild(infoEl);
                itemEl.appendChild(actionsEl);
                queueList.appendChild(itemEl);
            });
        }
    }

    async function browseFiles() {
        if (!window.__TAURI__ || !currentToolId) return;
        const cfg = toolConfigs[currentToolId];
        try {
            const selected = await window.__TAURI__.dialog.open({
                multiple: cfg.multiple,
                filters: cfg.filters
            });
            if (!selected) return;

            const paths = Array.isArray(selected) ? selected : [selected];
            if (!cfg.multiple) {
                const p = paths[0];
                currentQueue = [{ path: p, name: p.split(/[\\/]/).pop() }];
            } else {
                paths.forEach(p => {
                    if (!currentQueue.some(item => item.path === p)) {
                        currentQueue.push({ path: p, name: p.split(/[\\/]/).pop() });
                    }
                });
            }
            renderQueue();
        } catch (err) {
            console.error('Gagal memilih berkas:', err);
            alert('Gagal memilih berkas: ' + err);
        }
    }

    function showSuccessModal(filePath, dirPath) {
        closePdfTool(true);
        const modalSuccess = document.getElementById('modal-export-success');
        const modalPathInfo = document.getElementById('modal-export-path');
        if (modalSuccess && modalPathInfo) {
            modalPathInfo.textContent = filePath;
            modalSuccess.dataset.filepath = filePath;
            if (dirPath) {
                modalSuccess.dataset.dirpath = dirPath;
            } else {
                delete modalSuccess.dataset.dirpath;
            }
            modalSuccess.style.display = 'flex';
            modalSuccess.classList.remove('hidden');
        }
    }

    async function executePdfTool() {
        if (isProcessing || !currentToolId || !window.__TAURI__) return;

        if (currentToolId === 'merge' && currentQueue.length < 2) {
            alert(window.t('Pilih minimal 2 berkas PDF untuk digabungkan.'));
            return;
        }
        if (currentToolId === 'split' && currentQueue.length !== 1) {
            alert(window.t('Pilih 1 berkas PDF untuk dipisahkan.'));
            return;
        }
        if (currentToolId === 'rotate' && currentQueue.length !== 1) {
            alert(window.t('Pilih 1 berkas PDF untuk diputar.'));
            return;
        }
        if (currentToolId === 'img2pdf' && currentQueue.length < 1) {
            alert(window.t('Pilih minimal 1 gambar untuk dikonversi.'));
            return;
        }

        isProcessing = true;
        if (btnExecute) btnExecute.disabled = true;
        if (btnExecuteLabel) btnExecuteLabel.textContent = window.t('Memproses...');
        if (statusBanner) {
            statusBanner.className = 'pdf-status-banner info';
            if (statusMessage) statusMessage.textContent = window.t('Sedang memproses dokumen...');
            statusBanner.classList.remove('hidden');
        }

        try {
            if (currentToolId === 'merge') {
                const outputPath = await window.__TAURI__.dialog.save({
                    title: window.t('Simpan PDF Hasil Gabungan'),
                    defaultPath: 'Gabungan.pdf',
                    filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }]
                });
                if (!outputPath) {
                    resetProcessingState();
                    return;
                }
                const inputPaths = currentQueue.map(f => f.path);
                await window.__TAURI__.tauri.invoke('merge_pdf_files', {
                    inputPaths: inputPaths,
                    outputPath: outputPath
                });
                closePdfTool(true);
                showSuccessModal(outputPath);

            } else if (currentToolId === 'split') {
                const splitModeRadio = document.querySelector('input[name="split-mode"]:checked');
                const isAll = splitModeRadio && splitModeRadio.value === 'all';
                let pageRanges = 'all';
                if (!isAll) {
                    const rangeInput = document.getElementById('input-split-ranges');
                    pageRanges = rangeInput ? rangeInput.value.trim() : '1';
                    if (!pageRanges) {
                        alert(window.t('Masukkan rentang halaman yang valid (contoh: 1-3, 5).'));
                        resetProcessingState();
                        return;
                    }
                }
                const chosenDir = await window.__TAURI__.dialog.open({
                    directory: true,
                    title: window.t('Pilih Folder Tujuan Penyimpanan')
                });
                if (!chosenDir) {
                    resetProcessingState();
                    return;
                }
                const createdFiles = await window.__TAURI__.tauri.invoke('split_pdf_file', {
                    inputPath: currentQueue[0].path,
                    outputDir: chosenDir,
                    pageRanges: pageRanges
                });
                closePdfTool(true);
                if (createdFiles && createdFiles.length > 0) {
                    showSuccessModal(createdFiles[0], chosenDir);
                } else {
                    showSuccessModal(chosenDir, chosenDir);
                }

            } else if (currentToolId === 'rotate') {
                const degreeSelect = document.getElementById('select-rotate-degree');
                const degrees = parseInt(degreeSelect ? degreeSelect.value : '90', 10) || 90;
                const rotModeRadio = document.querySelector('input[name="rotate-pages-mode"]:checked');
                const isRotAll = rotModeRadio && rotModeRadio.value === 'all';
                let pagesSelector = 'all';
                if (!isRotAll) {
                    const rotPagesInput = document.getElementById('input-rotate-pages');
                    pagesSelector = rotPagesInput ? rotPagesInput.value.trim() : '1';
                }
                const outputPath = await window.__TAURI__.dialog.save({
                    title: window.t('Simpan PDF Hasil Putar'),
                    defaultPath: 'Diputar.pdf',
                    filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }]
                });
                if (!outputPath) {
                    resetProcessingState();
                    return;
                }
                await window.__TAURI__.tauri.invoke('rotate_pdf_file', {
                    inputPath: currentQueue[0].path,
                    outputPath: outputPath,
                    degrees: degrees,
                    pagesSelector: pagesSelector
                });
                closePdfTool(true);
                showSuccessModal(outputPath);

            } else if (currentToolId === 'img2pdf') {
                const pageSizeSelect = document.getElementById('select-img-page-size');
                const orientationSelect = document.getElementById('select-img-orientation');
                const pageSize = pageSizeSelect ? pageSizeSelect.value : 'A4';
                const orientation = orientationSelect ? orientationSelect.value : 'portrait';

                const outputPath = await window.__TAURI__.dialog.save({
                    title: window.t('Simpan PDF Hasil Konversi'),
                    defaultPath: 'Dokumen_Gambar.pdf',
                    filters: [{ name: window.t('Dokumen PDF'), extensions: ['pdf'] }]
                });
                if (!outputPath) {
                    resetProcessingState();
                    return;
                }

                let formatVal = 'a4';
                let pageWidthMm = 210;
                let pageHeightMm = 297;
                if (pageSize === 'F4') {
                    formatVal = [215, 330];
                    pageWidthMm = 215;
                    pageHeightMm = 330;
                } else if (pageSize === 'Letter') {
                    formatVal = 'letter';
                    pageWidthMm = 215.9;
                    pageHeightMm = 279.4;
                }

                if (orientation === 'landscape') {
                    const tempDim = pageWidthMm;
                    pageWidthMm = pageHeightMm;
                    pageHeightMm = tempDim;
                }

                const JsPdfClass = window.jsPDF || (window.jspdf && window.jspdf.jsPDF);
                if (!JsPdfClass) {
                    throw new Error(window.t ? window.t('Modul jsPDF tidak tersedia untuk konversi gambar.') : 'Modul jsPDF tidak tersedia.');
                }

                const pdf = new JsPdfClass({
                    unit: 'mm',
                    format: formatVal,
                    orientation: orientation
                });

                const marginMm = 8;
                const printableWidth = pageWidthMm - (marginMm * 2);
                const printableHeight = pageHeightMm - (marginMm * 2);

                for (let i = 0; i < currentQueue.length; i++) {
                    const fileBytes = await window.__TAURI__.fs.readBinaryFile(currentQueue[i].path);
                    const ext = currentQueue[i].path.split('.').pop().toLowerCase();
                    const mime = (ext === 'png') ? 'image/png' : (ext === 'webp') ? 'image/webp' : 'image/jpeg';
                    const blob = new Blob([fileBytes], { type: mime });
                    const blobUrl = URL.createObjectURL(blob);

                    try {
                        const img = await new Promise((resolve, reject) => {
                            const image = new Image();
                            image.onload = () => resolve(image);
                            image.onerror = () => reject(new Error('Gagal memuat gambar: ' + (currentQueue[i].name || currentQueue[i].path)));
                            image.src = blobUrl;
                        });

                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth || img.width || 800;
                        canvas.height = img.naturalHeight || img.height || 600;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);

                        const scale = Math.min(printableWidth / canvas.width, printableHeight / canvas.height);
                        const renderW = canvas.width * scale;
                        const renderH = canvas.height * scale;
                        const posX = marginMm + (printableWidth - renderW) / 2;
                        const posY = marginMm + (printableHeight - renderH) / 2;

                        if (i > 0) {
                            pdf.addPage(formatVal, orientation);
                        }

                        pdf.addImage(jpegDataUrl, 'JPEG', posX, posY, renderW, renderH);
                    } finally {
                        URL.revokeObjectURL(blobUrl);
                    }
                }

                const outBuffer = pdf.output('arraybuffer');
                const outBytes = new Uint8Array(outBuffer);
                await window.__TAURI__.fs.writeBinaryFile(outputPath, outBytes);
                closePdfTool(true);
                showSuccessModal(outputPath);
            }
        } catch (err) {
            console.error('Gagal memproses alat PDF:', err);
            if (statusBanner) {
                statusBanner.className = 'pdf-status-banner error';
                if (statusMessage) statusMessage.textContent = 'Gagal memproses: ' + err;
                statusBanner.classList.remove('hidden');
            }
            alert(window.t('Gagal memproses dokumen: ') + err);
        } finally {
            resetProcessingState();
        }
    }

    function resetProcessingState() {
        isProcessing = false;
        if (btnExecuteLabel) btnExecuteLabel.textContent = window.t('Proses Sekarang');
        renderQueue();
    }

    // Wiring Event Listeners
    const cards = document.querySelectorAll('.pdf-tool-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            if (toolId) openPdfTool(toolId);
        });
    });

    if (btnBrowse) btnBrowse.addEventListener('click', browseFiles);
    if (btnAddMore) btnAddMore.addEventListener('click', browseFiles);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closePdfTool);
    if (btnCancelModal) btnCancelModal.addEventListener('click', closePdfTool);
    if (btnExecute) btnExecute.addEventListener('click', executePdfTool);

    if (modalTool) {
        modalTool.addEventListener('click', (e) => {
            if (e.target === modalTool) closePdfTool();
        });
    }

    // Split Mode Toggle Listener
    const splitRadios = document.querySelectorAll('input[name="split-mode"]');
    splitRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const rangeWrap = document.getElementById('split-range-input-wrap');
            if (rangeWrap) {
                rangeWrap.style.display = (radio.value === 'all') ? 'none' : 'block';
            }
        });
    });

    // Rotate Mode Toggle Listener
    const rotateRadios = document.querySelectorAll('input[name="rotate-pages-mode"]');
    rotateRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const customInput = document.getElementById('input-rotate-pages');
            if (customInput) {
                customInput.classList.toggle('hidden', radio.value !== 'custom');
            }
        });
    });

    // Drag and Drop Handling
    if (dropzone) {
        ['dragenter', 'dragover'].forEach(evt => {
            dropzone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(evt => {
            dropzone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropzone.classList.remove('drag-over');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            if (!e.dataTransfer || !e.dataTransfer.files || !currentToolId) return;
            const files = Array.from(e.dataTransfer.files);
            if (files.length === 0) return;

            const validPaths = files.map(f => f.path || f.name).filter(Boolean);
            if (validPaths.length > 0) {
                const cfg = toolConfigs[currentToolId];
                if (!cfg.multiple) {
                    const p = validPaths[0];
                    currentQueue = [{ path: p, name: p.split(/[\\/]/).pop() }];
                } else {
                    validPaths.forEach(p => {
                        if (!currentQueue.some(item => item.path === p)) {
                            currentQueue.push({ path: p, name: p.split(/[\\/]/).pop() });
                        }
                    });
                }
                renderQueue();
            }
        });
    }
}

// ============================================================
// FITUR: GALERI TEMPLAT DOKUMEN (TEMPLATES GALLERY)
// ============================================================
function initTemplatesFeature() {
    let allLoadedTemplates = [];
    let activeCategory = 'all';
    let activeSearchQuery = '';
    let activePreviewTemplate = null;

    const viewTemplates = document.getElementById('view-templates');
    const templatesGrid = document.getElementById('templates-grid');
    const templatesEmptyState = document.getElementById('templates-empty-state');
    const templatesEmptyTitle = document.getElementById('templates-empty-title');
    const templatesEmptyDesc = document.getElementById('templates-empty-desc');
    const btnEmptyImport = document.getElementById('btn-empty-import');
    const inputSearch = document.getElementById('input-search-templates');
    const btnClearSearch = document.getElementById('btn-clear-search-templates');
    const btnImport = document.getElementById('btn-import-template');
    const btnOpenFolder = document.getElementById('btn-open-template-folder');
    const filterPills = document.querySelectorAll('.template-pill');

    // Modal Preview Elements
    const modalPreview = document.getElementById('modal-template-preview');
    const miniPaperViewport = document.getElementById('mini-paper-viewport');
    const previewPaperSpecLabel = document.getElementById('preview-paper-spec-label');
    const previewTagCategory = document.getElementById('preview-tag-category');
    const previewTagStrictness = document.getElementById('preview-tag-strictness');
    const previewTemplateTitle = document.getElementById('preview-template-title');
    const previewTemplateDesc = document.getElementById('preview-template-desc');
    const selectPreviewPaperSize = document.getElementById('select-preview-paper-size');
    const selectPreviewOrientation = document.getElementById('select-preview-orientation');
    const previewStrictNotice = document.getElementById('preview-strict-notice');
    const previewMarginSummary = document.getElementById('preview-margin-summary');
    const previewFontSummary = document.getElementById('preview-font-summary');
    const inputTemplateDocName = document.getElementById('input-template-doc-name');
    const btnDeleteUserTemplate = document.getElementById('btn-delete-user-template');
    const btnClosePreview = document.getElementById('btn-close-template-preview');
    const btnUseTemplate = document.getElementById('btn-use-template');

    // Modal Save As Template Elements
    const actionOpenTemplate = document.getElementById('action-open-template');
    const actionSaveAsTemplate = document.getElementById('action-save-as-template');
    const modalSaveAsTemplate = document.getElementById('modal-save-as-template');
    const inputSaveTemplateName = document.getElementById('input-save-template-name');
    const selectSaveTemplateCategory = document.getElementById('select-save-template-category');
    const inputSaveTemplateDesc = document.getElementById('input-save-template-desc');
    const selectSaveTemplatePaper = document.getElementById('select-save-template-paper');
    const selectSaveTemplateOrientation = document.getElementById('select-save-template-orientation');
    const selectSaveTemplateMargins = document.getElementById('select-save-template-margins');
    const saveTemplateSpecPaper = document.getElementById('save-template-spec-paper');
    const saveTemplateSpecMargins = document.getElementById('save-template-spec-margins');
    const saveTemplateSpecFont = document.getElementById('save-template-spec-font');
    const checkSaveTemplateStrict = document.getElementById('check-save-template-strict');
    const btnCancelSaveTemplate = document.getElementById('btn-cancel-save-template');
    const btnConfirmSaveTemplate = document.getElementById('btn-confirm-save-template');

    // Modal Create New Template Elements (From Gallery)
    const btnCreateNewTemplate = document.getElementById('btn-create-new-template');
    const modalCreateTemplate = document.getElementById('modal-create-template');
    const inputCreateTemplateName = document.getElementById('input-create-template-name');
    const selectCreateTemplateCategory = document.getElementById('select-create-template-category');
    const inputCreateTemplateDesc = document.getElementById('input-create-template-desc');
    const selectCreateTemplatePaper = document.getElementById('select-create-template-paper');
    const selectCreateTemplateOrientation = document.getElementById('select-create-template-orientation');
    const selectCreateTemplateMargins = document.getElementById('select-create-template-margins');
    const checkCreateTemplateStrict = document.getElementById('check-create-template-strict');
    const btnCancelCreateTemplate = document.getElementById('btn-cancel-create-template');
    const btnConfirmCreateTemplate = document.getElementById('btn-confirm-create-template');

    // Banner Template Authoring Elements (In Editor)
    const bannerTemplateAuthoring = document.getElementById('banner-template-authoring');
    const bannerAuthoringTitle = document.getElementById('banner-authoring-title');
    const btnAuthoringSaveTemplate = document.getElementById('btn-authoring-save-template');
    const btnAuthoringCancelTemplate = document.getElementById('btn-authoring-cancel-template');

    let templateAuthoringSession = null;

    async function reloadTemplatesGallery() {
        const templatesList = [];

        // 1. Masukkan templat bawaan
        if (window.BUILTIN_TEMPLATES_DATA && Array.isArray(window.BUILTIN_TEMPLATES_DATA)) {
            window.BUILTIN_TEMPLATES_DATA.forEach(t => {
                templatesList.push({
                    ...t,
                    isUserTemplate: false
                });
            });
        }

        // 2. Baca templat buatan pengguna dari Baku PDF Workspace/Template/user
        if (window.__TAURI__ && window.__TAURI__.fs && typeof window.__TAURI__.fs.readDir === 'function') {
            try {
                let userDir = window.bakuUserTemplatesPath;
                if (!userDir && window.bakuWorkspacePath && window.__TAURI__.path) {
                    const { join } = window.__TAURI__.path;
                    userDir = await join(window.bakuWorkspacePath, "Template", "user");
                }

                if (userDir && (await window.__TAURI__.fs.exists(userDir))) {
                    const entries = await window.__TAURI__.fs.readDir(userDir);
                    if (entries && Array.isArray(entries)) {
                        for (const entry of entries) {
                            if (entry.name && entry.name.toLowerCase().endsWith('.baku')) {
                                try {
                                    const jsonStr = await window.__TAURI__.tauri.invoke('read_baku_file', { path: entry.path });
                                    const parsed = JSON.parse(jsonStr);
                                    if (parsed && parsed.content) {
                                        templatesList.push({
                                            fileName: entry.name,
                                            docName: parsed.docName || entry.name.replace(/\.baku$/i, ''),
                                            filePath: entry.path,
                                            isUserTemplate: true,
                                            templateMeta: parsed.templateMeta || {
                                                id: 'user_' + entry.name,
                                                title: parsed.docName || entry.name.replace(/\.baku$/i, ''),
                                                category: 'user',
                                                isStrictStandard: false,
                                                paperSize: (parsed.paperConfig && parsed.paperConfig.format) ? parsed.paperConfig.format : 'A4',
                                                orientation: (parsed.paperConfig && parsed.paperConfig.orientation) ? parsed.paperConfig.orientation : 'portrait',
                                                marginSummary: 'Kustom',
                                                fontSummary: 'Kustom',
                                                desc: 'Templat kustom buatan pengguna.'
                                            },
                                            paperConfig: parsed.paperConfig || { width: 210, height: 297, marginTop: 25.4, marginBottom: 25.4, marginLeft: 25.4, marginRight: 25.4, orientation: 'portrait', format: 'A4' },
                                            numberingConfig: parsed.numberingConfig || { doc: { show: false, format: 'arabic', start: 1, align: 'center', prefix: '', suffix: '' } },
                                            headerFooterConfig: parsed.headerFooterConfig || { doc: { header: { text: '', align: 'center', diffFirst: false, firstText: '' }, footer: { text: '', align: 'center', diffFirst: false, firstText: '' } } },
                                            content: parsed.content
                                        });
                                    }
                                } catch (err) {
                                    console.warn('Gagal membaca templat pengguna:', entry.name, err);
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Gagal membaca direktori templat pengguna:', err);
            }
        }

        allLoadedTemplates = templatesList;
        updateCategoryCounts();
        renderTemplates();
    }

    function updateCategoryCounts() {
        const counts = { all: allLoadedTemplates.length, academic: 0, letter: 0, office: 0, user: 0 };
        allLoadedTemplates.forEach(t => {
            if (t.isUserTemplate) {
                counts.user++;
            } else if (t.templateMeta && t.templateMeta.category) {
                const cat = t.templateMeta.category;
                if (counts[cat] !== undefined) counts[cat]++;
            }
        });

        const setBadge = (id, count) => {
            const el = document.getElementById(id);
            if (el) el.textContent = count.toString();
        };

        setBadge('count-all', counts.all);
        setBadge('count-academic', counts.academic);
        setBadge('count-letter', counts.letter);
        setBadge('count-office', counts.office);
        setBadge('count-user', counts.user);
    }

    function renderTemplates() {
        if (!templatesGrid) return;
        templatesGrid.innerHTML = '';

        // Filter berdasarkan kategori
        let filtered = allLoadedTemplates.filter(t => {
            if (activeCategory === 'user') return t.isUserTemplate;
            if (activeCategory === 'all') return true;
            return (t.templateMeta && t.templateMeta.category === activeCategory);
        });

        // Filter berdasarkan pencarian (Mendukung Dwibahasa Indonesia & Inggris, Multi-kata / Token)
        if (activeSearchQuery.trim()) {
            const rawTokens = activeSearchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
            filtered = filtered.filter(t => {
                const meta = t.templateMeta || {};

                // Korpus Bahasa Indonesia
                const rawTitle = (meta.title || '').toLowerCase();
                const rawDesc = (meta.desc || '').toLowerCase();
                const rawCat = (meta.category || '').toLowerCase();
                const docName = (t.docName || '').toLowerCase();
                const fileName = (t.fileName || '').toLowerCase();

                // Korpus Bahasa Inggris & I18n
                const transTitle = (typeof window.t === 'function' ? window.t(meta.title || '') : '').toLowerCase();
                const dictTitle = (typeof window.DICT_EN !== 'undefined' && window.DICT_EN[meta.title] ? window.DICT_EN[meta.title] : '').toLowerCase();

                const transDesc = (typeof window.t === 'function' ? window.t(meta.desc || '') : '').toLowerCase();
                const dictDesc = (typeof window.DICT_EN !== 'undefined' && window.DICT_EN[meta.desc] ? window.DICT_EN[meta.desc] : '').toLowerCase();

                const transDocName = (typeof window.t === 'function' ? window.t(t.docName || '') : '').toLowerCase();
                const dictDocName = (typeof window.DICT_EN !== 'undefined' && window.DICT_EN[t.docName] ? window.DICT_EN[t.docName] : '').toLowerCase();

                // Kategori dwibahasa
                let catEn = '';
                if (meta.category === 'academic') catEn = 'academic';
                else if (meta.category === 'letter') catEn = 'letter official';
                else if (meta.category === 'office') catEn = 'office workplace business';
                else if (t.isUserTemplate) catEn = 'custom user my templates';

                // Kata kunci dwibahasa
                const keywords = Array.isArray(meta.keywords) ? meta.keywords.join(' ').toLowerCase() : '';

                // Seluruh korpus pencarian
                const searchCorpus = `${rawTitle} ${transTitle} ${dictTitle} ${rawDesc} ${transDesc} ${dictDesc} ${docName} ${transDocName} ${dictDocName} ${fileName} ${rawCat} ${catEn} ${keywords}`;

                // Multi-word matching: Setiap token yang diketik pengguna harus cocok
                return rawTokens.every(token => searchCorpus.includes(token));
            });
        }

        // Periksa status kosong
        if (filtered.length === 0) {
            templatesGrid.classList.add('hidden');
            templatesGrid.style.display = 'none';
            if (templatesEmptyState) {
                templatesEmptyState.classList.remove('hidden');
                templatesEmptyState.style.display = 'flex';
                if (activeSearchQuery.trim()) {
                    if (templatesEmptyTitle) templatesEmptyTitle.textContent = window.t('Tidak Ditemukan');
                    if (templatesEmptyDesc) templatesEmptyDesc.textContent = window.t("Tidak ada templat yang cocok dengan kata kunci pencarian Anda.");
                    if (btnEmptyImport) {
                        btnEmptyImport.classList.add('hidden');
                        btnEmptyImport.style.display = 'none';
                    }
                } else if (activeCategory === 'user') {
                    if (templatesEmptyTitle) templatesEmptyTitle.textContent = window.t('Belum Ada Templat Saya');
                    if (templatesEmptyDesc) templatesEmptyDesc.textContent = window.t('Simpan dokumen aktif dari Editor melalui menu File -> Simpan Sebagai Templat, atau impor berkas .baku.');
                    if (btnEmptyImport) {
                        btnEmptyImport.classList.remove('hidden');
                        btnEmptyImport.style.display = 'flex';
                    }
                } else {
                    if (templatesEmptyTitle) templatesEmptyTitle.textContent = window.t('Tidak Ada Templat');
                    if (templatesEmptyDesc) templatesEmptyDesc.textContent = window.t('Tidak ada templat yang tersedia dalam kategori ini.');
                    if (btnEmptyImport) {
                        btnEmptyImport.classList.add('hidden');
                        btnEmptyImport.style.display = 'none';
                    }
                }
            }
            return;
        }

        if (templatesEmptyState) {
            templatesEmptyState.classList.add('hidden');
            templatesEmptyState.style.display = 'none';
        }
        templatesGrid.classList.remove('hidden');
        templatesGrid.style.display = 'grid';

        filtered.forEach(t => {
            const card = document.createElement('div');
            card.className = 'template-card';

            const meta = t.templateMeta || {};
            const isLandscape = t.paperConfig && t.paperConfig.orientation === 'landscape';

            let categoryTagClass = 'tag-academic';
            let categoryName = window.t('Akademik');
            if (t.isUserTemplate) {
                categoryTagClass = 'tag-user';
                categoryName = window.t('Templat Saya');
            } else if (meta.category === 'letter') {
                categoryTagClass = 'tag-letter';
                categoryName = window.t('Surat & Dinas');
            } else if (meta.category === 'office') {
                categoryTagClass = 'tag-office';
                categoryName = window.t('Bisnis & Kantor');
            }

            const strictBadge = meta.isStrictStandard 
                ? `<span class="card-tag-badge">${window.t('Standar Baku')}</span>`
                : `<span class="card-tag-badge">${window.t('Fleksibel')}</span>`;

            card.innerHTML = `
                <div class="template-card-preview-area">
                    <div class="card-mini-paper ${isLandscape ? 'landscape' : ''}">
                        <div class="mini-line line-title"></div>
                        <div class="mini-line line-subtitle"></div>
                        <div class="mini-line-spacer"></div>
                        <div class="mini-line line-para"></div>
                        <div class="mini-line line-para"></div>
                        <div class="mini-line line-para short"></div>
                        <div class="mini-line-spacer"></div>
                        <div class="mini-line line-h2"></div>
                        <div class="mini-line line-para"></div>
                        <div class="mini-line line-para short"></div>
                    </div>
                </div>
                <div class="template-card-body">
                    <div class="template-card-tags">
                        <span class="card-tag ${categoryTagClass}">${categoryName}</span>
                        ${strictBadge}
                    </div>
                    <h4 class="template-card-title">${window.t(meta.title || t.docName)}</h4>
                    <p class="template-card-desc">${window.t(meta.desc || '')}</p>
                    <div class="template-card-footer">
                        <span>${meta.paperSize || 'A4'} • ${window.t(meta.marginSummary || 'Standar')}</span>
                        <span style="color: #0078D4; font-weight: 600;">${window.t('Pratinjau')} &rarr;</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openTemplatePreview(t);
            });

            templatesGrid.appendChild(card);
        });
    }

    function openTemplatePreview(tpl) {
        activePreviewTemplate = JSON.parse(JSON.stringify(tpl));
        if (tpl.filePath) activePreviewTemplate.filePath = tpl.filePath;
        if (tpl.isUserTemplate) activePreviewTemplate.isUserTemplate = true;

        const meta = activePreviewTemplate.templateMeta || {};
        const isStrict = !!meta.isStrictStandard;

        if (previewTemplateTitle) previewTemplateTitle.textContent = window.t(meta.title || activePreviewTemplate.docName);
        if (previewTemplateDesc) previewTemplateDesc.textContent = window.t(meta.desc || '');

        // Category Tag
        if (previewTagCategory) {
            let catName = window.t('Akademik');
            previewTagCategory.className = 'tag-category tag-academic';
            if (activePreviewTemplate.isUserTemplate) {
                catName = window.t('Templat Saya');
                previewTagCategory.className = 'tag-category tag-user';
            } else if (meta.category === 'letter') {
                catName = window.t('Surat & Dinas');
                previewTagCategory.className = 'tag-category tag-letter';
            } else if (meta.category === 'office') {
                catName = window.t('Bisnis & Kantor');
                previewTagCategory.className = 'tag-category tag-office';
            }
            previewTagCategory.textContent = catName;
        }

        // Strictness Tag & Controls
        if (previewTagStrictness) {
            if (isStrict) {
                previewTagStrictness.textContent = window.t('Format Baku Terkunci');
                previewTagStrictness.className = 'tag-strictness locked';
            } else {
                previewTagStrictness.textContent = window.t('Format Fleksibel');
                previewTagStrictness.className = 'tag-strictness';
            }
        }

        if (selectPreviewPaperSize) {
            selectPreviewPaperSize.value = (activePreviewTemplate.paperConfig && activePreviewTemplate.paperConfig.format) ? activePreviewTemplate.paperConfig.format : 'A4';
            selectPreviewPaperSize.disabled = isStrict;
        }

        if (selectPreviewOrientation) {
            selectPreviewOrientation.value = (activePreviewTemplate.paperConfig && activePreviewTemplate.paperConfig.orientation) ? activePreviewTemplate.paperConfig.orientation : 'portrait';
            selectPreviewOrientation.disabled = isStrict;
        }

        if (previewStrictNotice) {
            previewStrictNotice.classList.toggle('hidden', !isStrict);
            previewStrictNotice.style.display = isStrict ? 'flex' : 'none';
        }

        if (previewMarginSummary) {
            previewMarginSummary.textContent = window.t(meta.marginSummary || 'Standar');
        }

        if (previewFontSummary) {
            previewFontSummary.textContent = window.t(meta.fontSummary || 'Standar');
        }

        if (inputTemplateDocName) {
            const rawTitle = meta.title || activePreviewTemplate.docName || 'Dokumen_Baru';
            const translatedTitle = window.t(rawTitle);
            const safeTitle = translatedTitle.replace(/[\/\\]/g, '_').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
            const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en') || (localStorage.getItem('baku_lang') === 'en');
            const suffix = isEn ? '_New' : '_Baru';
            inputTemplateDocName.value = `${safeTitle}${suffix}`;
        }

        if (btnDeleteUserTemplate) {
            btnDeleteUserTemplate.classList.toggle('hidden', !activePreviewTemplate.isUserTemplate);
            btnDeleteUserTemplate.style.display = activePreviewTemplate.isUserTemplate ? 'flex' : 'none';
        }

        updateMiniPaperViewport();

        if (modalPreview) {
            modalPreview.style.display = 'flex';
            modalPreview.classList.remove('hidden');
        }
    }

    function updateMiniPaperViewport() {
        if (!miniPaperViewport || !activePreviewTemplate) return;
        const orient = (activePreviewTemplate.paperConfig && activePreviewTemplate.paperConfig.orientation) ? activePreviewTemplate.paperConfig.orientation : 'portrait';
        const format = (activePreviewTemplate.paperConfig && activePreviewTemplate.paperConfig.format) ? activePreviewTemplate.paperConfig.format : 'A4';

        miniPaperViewport.className = 'mini-paper-sheet ' + orient;
        if (previewPaperSpecLabel) {
            const orientLabel = (orient === 'landscape') ? window.t('Lanskap') : window.t('Potret');
            previewPaperSpecLabel.textContent = `${format} | ${orientLabel}`;
        }
    }

    function useTemplate() {
        if (!activePreviewTemplate) return;
        const newDocName = (inputTemplateDocName && inputTemplateDocName.value.trim()) ? inputTemplateDocName.value.trim() : 'Dokumen_Baru';

        if (modalPreview) {
            modalPreview.style.display = 'none';
            modalPreview.classList.add('hidden');
        }

        currentDocName = newDocName;
        currentFilePath = null;
        closeAfterSave = false;

        paperConfig = JSON.parse(JSON.stringify(activePreviewTemplate.paperConfig || { width: 210, height: 297, marginTop: 25.4, marginBottom: 25.4, marginLeft: 25.4, marginRight: 25.4 }));
        numberingConfig = activePreviewTemplate.numberingConfig ? JSON.parse(JSON.stringify(activePreviewTemplate.numberingConfig)) : { doc: { show: false, format: 'arabic', start: 1, align: 'center', prefix: '', suffix: '' } };
        headerFooterConfig = activePreviewTemplate.headerFooterConfig ? JSON.parse(JSON.stringify(activePreviewTemplate.headerFooterConfig)) : { doc: { header: { text: '', align: 'center', diffFirst: false, firstText: '' }, footer: { text: '', align: 'center', diffFirst: false, firstText: '' } } };

        // Sinkronisasi form ukuran kertas di Settings
        const inputPaperSize = document.getElementById('input-paper-size');
        if (inputPaperSize) inputPaperSize.value = paperConfig.format || 'A4';
        const inputMarginT = document.getElementById('margin-top');
        if (inputMarginT) inputMarginT.value = paperConfig.marginTop;
        const inputMarginB = document.getElementById('margin-bottom');
        if (inputMarginB) inputMarginB.value = paperConfig.marginBottom;
        const inputMarginL = document.getElementById('margin-left');
        if (inputMarginL) inputMarginL.value = paperConfig.marginLeft;
        const inputMarginR = document.getElementById('margin-right');
        if (inputMarginR) inputMarginR.value = paperConfig.marginRight;

        applyPageSetup();

        // Pindah ke layar editor
        const sidebarEl = document.getElementById('sidebar');
        if (sidebarEl) sidebarEl.style.display = 'none';
        const viewHomeEl = document.getElementById('view-home');
        if (viewHomeEl) viewHomeEl.classList.remove('active');
        if (viewTemplates) viewTemplates.classList.remove('active');
        const viewEditorEl = document.getElementById('view-editor');
        if (viewEditorEl) viewEditorEl.classList.add('active');

        setTimeout(() => {
            if (quill && activePreviewTemplate.content) {
                quill.setContents(activePreviewTemplate.content);
                quill.focus();
                setDirty(false);
                setTimeout(() => {
                    if (typeof syncPageBreakHeights === 'function') syncPageBreakHeights();
                    if (typeof updateCanvasHeight === 'function') updateCanvasHeight(true);
                }, 50);
            }
            updateWindowTitle();
        }, 150);
    }

    async function importTemplate() {
        if (!window.__TAURI__ || !window.__TAURI__.dialog) return;
        try {
            const selected = await window.__TAURI__.dialog.open({
                title: window.t('Pilih Berkas Templat Baku'),
                filters: [{ name: window.t('Baku Document / Template'), extensions: ['baku'] }]
            });

            if (!selected) return;

            const selectedPath = Array.isArray(selected) ? selected[0] : selected;
            const jsonStr = await window.__TAURI__.tauri.invoke('read_baku_file', { path: selectedPath });
            const parsed = JSON.parse(jsonStr);

            if (!parsed || !parsed.content) {
                alert(window.t('File .baku tidak valid atau rusak.'));
                return;
            }

            let userDir = window.bakuUserTemplatesPath;
            if (!userDir && window.bakuWorkspacePath && window.__TAURI__.path) {
                const { join } = window.__TAURI__.path;
                userDir = await join(window.bakuWorkspacePath, "Template", "user");
            }

            if (!userDir) return;

            const baseName = selectedPath.split(/[\\/]/).pop();
            const { join } = window.__TAURI__.path;
            const targetPath = await join(userDir, baseName);

            await window.__TAURI__.tauri.invoke('save_baku_file', {
                path: targetPath,
                content: jsonStr
            });

            alert(window.t('Templat berhasil diimpor!'));
            activeCategory = 'user';
            filterPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'user'));
            await reloadTemplatesGallery();
        } catch (err) {
            console.error('Gagal mengimpor templat:', err);
            alert(window.t('Gagal mengimpor templat: ') + err);
        }
    }

    async function deleteUserTemplate() {
        if (!activePreviewTemplate || !activePreviewTemplate.filePath || !window.__TAURI__) return;
        if (!confirm(window.t('Apakah Anda yakin ingin menghapus templat ini? Berkas fisik akan dihapus dari komputer Anda.'))) return;

        try {
            await window.__TAURI__.fs.removeFile(activePreviewTemplate.filePath);
            if (modalPreview) {
                modalPreview.style.display = 'none';
                modalPreview.classList.add('hidden');
            }
            alert(window.t('Templat berhasil dihapus!'));
            await reloadTemplatesGallery();
        } catch (err) {
            console.error('Gagal menghapus templat:', err);
            alert(window.t('Gagal menghapus templat: ') + err);
        }
    }

    // Modal Preview Listeners
    if (selectPreviewPaperSize) {
        selectPreviewPaperSize.addEventListener('change', () => {
            if (!activePreviewTemplate || activePreviewTemplate.templateMeta?.isStrictStandard) return;
            const val = selectPreviewPaperSize.value;
            activePreviewTemplate.paperConfig.format = val;
            if (val === 'A4') {
                activePreviewTemplate.paperConfig.width = 210;
                activePreviewTemplate.paperConfig.height = 297;
            } else if (val === 'F4') {
                activePreviewTemplate.paperConfig.width = 215;
                activePreviewTemplate.paperConfig.height = 330;
            } else if (val === 'Letter') {
                activePreviewTemplate.paperConfig.width = 215.9;
                activePreviewTemplate.paperConfig.height = 279.4;
            }
            updateMiniPaperViewport();
        });
    }

    if (selectPreviewOrientation) {
        selectPreviewOrientation.addEventListener('change', () => {
            if (!activePreviewTemplate || activePreviewTemplate.templateMeta?.isStrictStandard) return;
            const val = selectPreviewOrientation.value;
            activePreviewTemplate.paperConfig.orientation = val;
            updateMiniPaperViewport();
        });
    }

    if (btnClosePreview) {
        btnClosePreview.addEventListener('click', () => {
            if (modalPreview) {
                modalPreview.style.display = 'none';
                modalPreview.classList.add('hidden');
            }
        });
    }

    if (modalPreview) {
        modalPreview.addEventListener('click', (e) => {
            if (e.target === modalPreview) {
                modalPreview.style.display = 'none';
                modalPreview.classList.add('hidden');
            }
        });
    }

    if (btnUseTemplate) btnUseTemplate.addEventListener('click', useTemplate);
    if (btnDeleteUserTemplate) btnDeleteUserTemplate.addEventListener('click', deleteUserTemplate);

    // Filter Pills Listener
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeCategory = pill.dataset.category || 'all';
            renderTemplates();
        });
    });

    // Search Box Listener
    if (inputSearch) {
        inputSearch.addEventListener('input', () => {
            activeSearchQuery = inputSearch.value;
            if (btnClearSearch) {
                btnClearSearch.classList.toggle('hidden', !activeSearchQuery.trim());
            }
            renderTemplates();
        });
    }

    if (btnClearSearch) {
        btnClearSearch.addEventListener('click', () => {
            if (inputSearch) inputSearch.value = '';
            activeSearchQuery = '';
            btnClearSearch.classList.add('hidden');
            renderTemplates();
        });
    }

    if (btnImport) btnImport.addEventListener('click', importTemplate);
    if (btnEmptyImport) btnEmptyImport.addEventListener('click', importTemplate);

    if (btnOpenFolder) {
        btnOpenFolder.addEventListener('click', async () => {
            if (!window.__TAURI__ || !window.bakuTemplatesPath) return;
            try {
                if (window.__TAURI__.tauri && window.__TAURI__.tauri.invoke) {
                    await window.__TAURI__.tauri.invoke('open_file_path', { path: window.bakuTemplatesPath });
                } else {
                    await window.__TAURI__.shell.open(window.bakuTemplatesPath);
                }
            } catch (err) {
                console.error('Gagal membuka folder templat:', err);
                try {
                    await window.__TAURI__.shell.open(window.bakuTemplatesPath);
                } catch (e) {
                    console.error('Gagal membuka folder templat via fallback:', e);
                }
            }
        });
    }

    // Menu File -> Buka dari Templat
    if (actionOpenTemplate) {
        actionOpenTemplate.addEventListener('click', () => {
            if (isDirty) {
                if (!confirm(window.t('Anda memiliki perubahan yang belum disimpan. Tetap buka galeri templat?'))) {
                    return;
                }
            }
            goToHome();
            const menuTpl = document.getElementById('menu-templates');
            if (menuTpl) menuTpl.click();
        });
    }

    // Fungsi Pembantu: Simpan Templat Pengguna ke Baku PDF Workspace/Template/user
    async function saveUserTemplateFromEditor(templateName, category, description, isStrict, marginSummaryCustom, customPaperConfig, customFontSummary) {
        if (!window.__TAURI__) return false;

        let userDir = window.bakuUserTemplatesPath;
        if (!userDir && window.bakuWorkspacePath && window.__TAURI__.path) {
            const { join } = window.__TAURI__.path;
            userDir = await join(window.bakuWorkspacePath, "Template", "user");
        }

        if (!userDir) {
            alert(window.t('Folder templat pengguna tidak ditemukan.'));
            return false;
        }

        const { join } = window.__TAURI__.path;
        const safeName = templateName.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim() || 'Templat_Kustom';
        const fileName = safeName.endsWith('.baku') ? safeName : (safeName + '.baku');
        const targetPath = await join(userDir, fileName);

        // Buat keywords otomatis dari (Nama Templat + Kategori + Deskripsi)
        const rawKw = `${templateName} ${category} ${description}`.toLowerCase().split(/\s+/).filter(Boolean);
        const uniqueKeywords = [...new Set(rawKw)];

        const targetPaperConfig = customPaperConfig || JSON.parse(JSON.stringify(paperConfig));

        // Ringkasan margin
        let marginSum = marginSummaryCustom;
        if (!marginSum) {
            const mTop = (targetPaperConfig.marginTop / 10).toFixed(1).replace(/\.0$/, '');
            const mBot = (targetPaperConfig.marginBottom / 10).toFixed(1).replace(/\.0$/, '');
            const mLeft = (targetPaperConfig.marginLeft / 10).toFixed(1).replace(/\.0$/, '');
            const mRight = (targetPaperConfig.marginRight / 10).toFixed(1).replace(/\.0$/, '');
            marginSum = (mTop === mBot && mTop === mLeft && mTop === mRight)
                ? `${mTop} cm ${window.t('rata')}`
                : `${mTop}-${mBot}-${mLeft}-${mRight} cm`;
        }

        let paperFormatLabel = targetPaperConfig.format || 'A4';
        if (typeof paperFormatLabel === 'string') {
            const fUpper = paperFormatLabel.toUpperCase();
            if (fUpper === 'A4') paperFormatLabel = 'A4';
            else if (fUpper === 'LETTER') paperFormatLabel = 'Letter';
            else if (fUpper === 'LEGAL') paperFormatLabel = 'Legal';
            else if (fUpper === 'F4') paperFormatLabel = 'F4';
        } else if (Array.isArray(paperFormatLabel)) {
            paperFormatLabel = 'F4';
        }

        const templateData = {
            fileName: fileName,
            docName: safeName.replace(/\.baku$/i, ''),
            templateMeta: {
                id: 'user_' + Date.now(),
                title: templateName,
                category: category,
                isStrictStandard: !!isStrict,
                paperSize: paperFormatLabel,
                orientation: targetPaperConfig.orientation || 'portrait',
                marginSummary: marginSum,
                fontSummary: customFontSummary || (window.t ? window.t('Kustom Pengguna') : 'Kustom Pengguna'),
                desc: description || (window.t ? window.t('Templat kustom buatan pengguna.') : 'Templat kustom buatan pengguna.'),
                keywords: uniqueKeywords
            },
            paperConfig: targetPaperConfig,
            numberingConfig: numberingConfig,
            headerFooterConfig: headerFooterConfig,
            content: quill ? quill.getContents().ops : [{ insert: '\n' }]
        };

        await window.__TAURI__.tauri.invoke('save_baku_file', {
            path: targetPath,
            content: JSON.stringify(templateData, null, 2)
        });

        await reloadTemplatesGallery();
        return true;
    }

    // === ALUR 1: BUAT TEMPLAT BARU DARI GALERI TEMPLAT ===
    if (btnCreateNewTemplate) {
        btnCreateNewTemplate.addEventListener('click', () => {
            if (inputCreateTemplateName) inputCreateTemplateName.value = '';
            if (selectCreateTemplateCategory) selectCreateTemplateCategory.value = 'office';
            if (inputCreateTemplateDesc) inputCreateTemplateDesc.value = '';
            if (selectCreateTemplatePaper) selectCreateTemplatePaper.value = 'A4';
            if (selectCreateTemplateOrientation) selectCreateTemplateOrientation.value = 'portrait';
            if (selectCreateTemplateMargins) selectCreateTemplateMargins.value = 'normal';
            if (checkCreateTemplateStrict) checkCreateTemplateStrict.checked = false;

            if (modalCreateTemplate) {
                modalCreateTemplate.style.display = 'flex';
                modalCreateTemplate.classList.remove('hidden');
                if (inputCreateTemplateName) inputCreateTemplateName.focus();
            }
        });
    }

    if (btnCancelCreateTemplate) {
        btnCancelCreateTemplate.addEventListener('click', () => {
            if (modalCreateTemplate) {
                modalCreateTemplate.classList.add('hidden');
                modalCreateTemplate.style.display = 'none';
            }
        });
    }

    if (modalCreateTemplate) {
        modalCreateTemplate.addEventListener('click', (e) => {
            if (e.target === modalCreateTemplate) {
                modalCreateTemplate.classList.add('hidden');
                modalCreateTemplate.style.display = 'none';
            }
        });
    }

    if (btnConfirmCreateTemplate) {
        btnConfirmCreateTemplate.addEventListener('click', () => {
            const name = (inputCreateTemplateName && inputCreateTemplateName.value.trim()) ? inputCreateTemplateName.value.trim() : '';
            if (!name) {
                alert(window.t('Nama templat tidak boleh kosong.'));
                if (inputCreateTemplateName) inputCreateTemplateName.focus();
                return;
            }

            const cat = selectCreateTemplateCategory ? selectCreateTemplateCategory.value : 'office';
            const desc = inputCreateTemplateDesc ? inputCreateTemplateDesc.value.trim() : '';
            const paperFmt = selectCreateTemplatePaper ? selectCreateTemplatePaper.value : 'A4';
            const orientation = selectCreateTemplateOrientation ? selectCreateTemplateOrientation.value : 'portrait';
            const marginPreset = selectCreateTemplateMargins ? selectCreateTemplateMargins.value : 'normal';
            const isStrict = checkCreateTemplateStrict ? checkCreateTemplateStrict.checked : false;

            // Hitung ukuran dimensi kertas (mm)
            const standardDimensions = {
                'A4': { width: 210, height: 297 },
                'Letter': { width: 215.9, height: 279.4 },
                'Legal': { width: 215.9, height: 355.6 },
                'F4': { width: 210, height: 330 }
            };
            const baseDim = standardDimensions[paperFmt] || { width: 210, height: 297 };
            const pWidth = (orientation === 'landscape') ? Math.max(baseDim.width, baseDim.height) : Math.min(baseDim.width, baseDim.height);
            const pHeight = (orientation === 'landscape') ? Math.min(baseDim.width, baseDim.height) : Math.max(baseDim.width, baseDim.height);

            // Hitung margin sesuai preset terpilih (mm)
            let mTop = 25.4, mBottom = 25.4, mLeft = 25.4, mRight = 25.4, marginSum = '2.5 cm rata';
            if (marginPreset === 'narrow') {
                mTop = 12.7; mBottom = 12.7; mLeft = 12.7; mRight = 12.7;
                marginSum = '1.27 cm rata';
            } else if (marginPreset === 'academic') {
                mTop = 40; mBottom = 30; mLeft = 40; mRight = 30;
                marginSum = '4-4-3-3 cm';
            } else if (marginPreset === 'formal') {
                mTop = 30; mBottom = 30; mLeft = 30; mRight = 30;
                marginSum = '3 cm rata';
            }

            templateAuthoringSession = {
                title: name,
                category: cat,
                desc: desc,
                isStrictStandard: isStrict,
                marginSummary: marginSum,
                paperConfig: {
                    width: pWidth,
                    height: pHeight,
                    marginTop: mTop,
                    marginBottom: mBottom,
                    marginLeft: mLeft,
                    marginRight: mRight,
                    orientation: orientation,
                    format: paperFmt
                }
            };

            // Tutup modal konfigurasi
            if (modalCreateTemplate) {
                modalCreateTemplate.classList.add('hidden');
                modalCreateTemplate.style.display = 'none';
            }

            // Terapkan ke editor aktif
            paperConfig = JSON.parse(JSON.stringify(templateAuthoringSession.paperConfig));
            applyPageSetup();

            currentDocName = name;
            currentFilePath = null;

            // Kosongkan kanvas editor
            if (quill) {
                quill.setContents([{ insert: '\n' }]);
                quill.focus();
                setDirty(false);
            }

            // Pindah ke tampilan editor
            const sidebarEl = document.getElementById('sidebar');
            if (sidebarEl) sidebarEl.style.display = 'none';
            const viewHomeEl = document.getElementById('view-home');
            if (viewHomeEl) viewHomeEl.classList.remove('active');
            if (viewTemplates) viewTemplates.classList.remove('active');
            const viewEditorEl = document.getElementById('view-editor');
            if (viewEditorEl) viewEditorEl.classList.add('active');

            // Tampilkan banner penyusunan templat di atas kanvas
            if (bannerTemplateAuthoring) {
                if (bannerAuthoringTitle) bannerAuthoringTitle.textContent = name;
                bannerTemplateAuthoring.classList.remove('hidden');
                bannerTemplateAuthoring.style.display = 'flex';
            }

            updateWindowTitle();
        });
    }

    if (btnAuthoringSaveTemplate) {
        btnAuthoringSaveTemplate.addEventListener('click', async () => {
            if (!templateAuthoringSession) return;
            try {
                const ok = await saveUserTemplateFromEditor(
                    templateAuthoringSession.title,
                    templateAuthoringSession.category,
                    templateAuthoringSession.desc,
                    templateAuthoringSession.isStrictStandard,
                    templateAuthoringSession.marginSummary
                );
                if (ok) {
                    if (bannerTemplateAuthoring) {
                        bannerTemplateAuthoring.classList.add('hidden');
                        bannerTemplateAuthoring.style.display = 'none';
                    }
                    templateAuthoringSession = null;
                    alert(window.t('Templat berhasil disimpan ke Galeri Templat!'));
                }
            } catch (err) {
                console.error('Gagal menyimpan templat dari banner:', err);
                alert(window.t('Gagal menyimpan templat: ') + err);
            }
        });
    }

    if (btnAuthoringCancelTemplate) {
        btnAuthoringCancelTemplate.addEventListener('click', () => {
            if (bannerTemplateAuthoring) {
                bannerTemplateAuthoring.classList.add('hidden');
                bannerTemplateAuthoring.style.display = 'none';
            }
            templateAuthoringSession = null;
        });
    }

    // === ALUR 2: SIMPAN DOKUMEN AKTIF SEBAGAI TEMPLAT DARI EDITOR ===
    function updateSaveTemplatePreview() {
        if (!saveTemplateSpecPaper || !selectSaveTemplatePaper || !selectSaveTemplateOrientation) return;
        const pVal = selectSaveTemplatePaper.value;
        const oVal = (selectSaveTemplateOrientation.value === 'landscape') ? window.t('Lanskap') : window.t('Potret');
        saveTemplateSpecPaper.textContent = `${pVal} • ${oVal}`;

        if (saveTemplateSpecMargins && selectSaveTemplateMargins) {
            const mVal = selectSaveTemplateMargins.value;
            if (mVal === 'normal') {
                saveTemplateSpecMargins.textContent = `2.5 cm ${window.t('rata')}`;
            } else if (mVal === 'narrow') {
                saveTemplateSpecMargins.textContent = `1.27 cm ${window.t('rata')}`;
            } else if (mVal === 'academic') {
                saveTemplateSpecMargins.textContent = `4-3-4-3 cm`;
            } else if (mVal === 'formal') {
                saveTemplateSpecMargins.textContent = `3 cm ${window.t('rata')}`;
            } else {
                const mTop = (paperConfig.marginTop / 10).toFixed(1).replace(/\.0$/, '');
                const mBot = (paperConfig.marginBottom / 10).toFixed(1).replace(/\.0$/, '');
                const mLeft = (paperConfig.marginLeft / 10).toFixed(1).replace(/\.0$/, '');
                const mRight = (paperConfig.marginRight / 10).toFixed(1).replace(/\.0$/, '');
                const isAllEqual = (mTop === mBot && mTop === mLeft && mTop === mRight);
                saveTemplateSpecMargins.textContent = isAllEqual
                    ? `${mTop} cm ${window.t('rata')}`
                    : `${mTop}-${mBot}-${mLeft}-${mRight} cm`;
            }
        }
    }

    if (selectSaveTemplatePaper) {
        selectSaveTemplatePaper.addEventListener('change', updateSaveTemplatePreview);
    }
    if (selectSaveTemplateOrientation) {
        selectSaveTemplateOrientation.addEventListener('change', updateSaveTemplatePreview);
    }
    if (selectSaveTemplateMargins) {
        selectSaveTemplateMargins.addEventListener('change', updateSaveTemplatePreview);
    }

    if (actionSaveAsTemplate) {
        actionSaveAsTemplate.addEventListener('click', () => {
            // 1. Deteksi format kertas aktif dokumen saat ini
            let curPaperFmt = 'A4';
            if (typeof paperConfig.format === 'string') {
                const fUpper = paperConfig.format.toUpperCase();
                if (fUpper === 'A4') curPaperFmt = 'A4';
                else if (fUpper === 'LETTER') curPaperFmt = 'Letter';
                else if (fUpper === 'LEGAL') curPaperFmt = 'Legal';
                else if (fUpper === 'F4') curPaperFmt = 'F4';
            } else if (Array.isArray(paperConfig.format) && paperConfig.format[0] === 210 && paperConfig.format[1] === 330) {
                curPaperFmt = 'F4';
            }
            if (selectSaveTemplatePaper) selectSaveTemplatePaper.value = curPaperFmt;

            // 2. Deteksi orientasi aktif
            const curOrient = (paperConfig.width > paperConfig.height || paperConfig.orientation === 'landscape') ? 'landscape' : 'portrait';
            if (selectSaveTemplateOrientation) selectSaveTemplateOrientation.value = curOrient;

            // 3. Deteksi preset margin aktif
            let curMarginPreset = 'current';
            const mT = Math.round(paperConfig.marginTop * 10) / 10;
            const mB = Math.round(paperConfig.marginBottom * 10) / 10;
            const mL = Math.round(paperConfig.marginLeft * 10) / 10;
            const mR = Math.round(paperConfig.marginRight * 10) / 10;
            if (mT === 25 && mB === 25 && mL === 25 && mR === 25) curMarginPreset = 'normal';
            else if (mT === 12.7 && mB === 12.7 && mL === 12.7 && mR === 12.7) curMarginPreset = 'narrow';
            else if (mT === 40 && mB === 30 && mL === 40 && mR === 30) curMarginPreset = 'academic';
            else if (mT === 30 && mB === 30 && mL === 30 && mR === 30) curMarginPreset = 'formal';
            else curMarginPreset = 'current';

            if (selectSaveTemplateMargins) selectSaveTemplateMargins.value = curMarginPreset;

            // 4. Deteksi font & ukuran teks aktif
            let detectedFont = 'Calibri';
            let detectedSize = '11pt';
            try {
                const fmt = (typeof quill !== 'undefined' && quill) ? quill.getFormat() : {};
                if (fmt.font) detectedFont = fmt.font;
                else {
                    const fontPickerLabel = document.querySelector('.ql-font .ql-picker-label');
                    if (fontPickerLabel && fontPickerLabel.textContent && fontPickerLabel.textContent.trim()) {
                        detectedFont = fontPickerLabel.textContent.trim();
                    }
                }
                if (fmt.size) detectedSize = fmt.size;
                else {
                    const sizeInput = document.getElementById('input-font-size');
                    if (sizeInput && sizeInput.value) detectedSize = `${sizeInput.value}pt`;
                }
            } catch (e) {}

            if (saveTemplateSpecFont) {
                saveTemplateSpecFont.textContent = `${detectedFont}, ${detectedSize}`;
            }

            // Update isi card preview
            updateSaveTemplatePreview();

            // 5. Inisialisasi input nama & placeholder
            if (inputSaveTemplateName) {
                inputSaveTemplateName.value = '';
                const fallbackPlaceholder = window.t('misal: Format Laporan Departemen');
                const isDefaultDoc = (!currentDocName || currentDocName === 'Baru' || currentDocName === 'Dokumen_Baru');
                inputSaveTemplateName.placeholder = isDefaultDoc ? fallbackPlaceholder : currentDocName;
            }
            if (inputSaveTemplateDesc) {
                inputSaveTemplateDesc.value = '';
            }
            if (selectSaveTemplateCategory) {
                selectSaveTemplateCategory.value = 'office';
            }
            if (checkSaveTemplateStrict) {
                checkSaveTemplateStrict.checked = false;
            }

            if (modalSaveAsTemplate) {
                modalSaveAsTemplate.style.display = 'flex';
                modalSaveAsTemplate.classList.remove('hidden');
                if (inputSaveTemplateName) inputSaveTemplateName.focus();
            }
        });
    }

    if (btnCancelSaveTemplate) {
        btnCancelSaveTemplate.addEventListener('click', () => {
            if (modalSaveAsTemplate) {
                modalSaveAsTemplate.classList.add('hidden');
                modalSaveAsTemplate.style.display = 'none';
            }
        });
    }

    if (modalSaveAsTemplate) {
        modalSaveAsTemplate.addEventListener('click', (e) => {
            if (e.target === modalSaveAsTemplate) {
                modalSaveAsTemplate.classList.add('hidden');
                modalSaveAsTemplate.style.display = 'none';
            }
        });
    }

    if (btnConfirmSaveTemplate) {
        btnConfirmSaveTemplate.addEventListener('click', async () => {
            if (!window.__TAURI__) return;
            const name = (inputSaveTemplateName && inputSaveTemplateName.value.trim()) ? inputSaveTemplateName.value.trim() : '';
            if (!name) {
                alert(window.t('Nama templat tidak boleh kosong.'));
                if (inputSaveTemplateName) inputSaveTemplateName.focus();
                return;
            }

            const cat = (selectSaveTemplateCategory) ? selectSaveTemplateCategory.value : 'office';
            const desc = (inputSaveTemplateDesc) ? inputSaveTemplateDesc.value.trim() : '';
            const isStrict = checkSaveTemplateStrict ? checkSaveTemplateStrict.checked : false;

            const paperFmt = selectSaveTemplatePaper ? selectSaveTemplatePaper.value : 'A4';
            const orientation = selectSaveTemplateOrientation ? selectSaveTemplateOrientation.value : 'portrait';
            const marginPreset = selectSaveTemplateMargins ? selectSaveTemplateMargins.value : 'current';

            let baseDim = { width: 210, height: 297, format: 'a4' };
            if (paperFmt === 'Letter') baseDim = { width: 215.9, height: 279.4, format: 'letter' };
            else if (paperFmt === 'Legal') baseDim = { width: 215.9, height: 355.6, format: 'legal' };
            else if (paperFmt === 'F4') baseDim = { width: 210, height: 330, format: [210, 330] };

            const pWidth = (orientation === 'landscape') ? Math.max(baseDim.width, baseDim.height) : Math.min(baseDim.width, baseDim.height);
            const pHeight = (orientation === 'landscape') ? Math.min(baseDim.width, baseDim.height) : Math.max(baseDim.width, baseDim.height);

            let mTop = paperConfig.marginTop;
            let mBottom = paperConfig.marginBottom;
            let mLeft = paperConfig.marginLeft;
            let mRight = paperConfig.marginRight;
            let marginSum = '';

            if (marginPreset === 'normal') {
                mTop = 25; mBottom = 25; mLeft = 25; mRight = 25;
                marginSum = `2.5 cm ${window.t('rata')}`;
            } else if (marginPreset === 'narrow') {
                mTop = 12.7; mBottom = 12.7; mLeft = 12.7; mRight = 12.7;
                marginSum = `1.27 cm ${window.t('rata')}`;
            } else if (marginPreset === 'academic') {
                mTop = 40; mBottom = 30; mLeft = 40; mRight = 30;
                marginSum = `4-3-4-3 cm`;
            } else if (marginPreset === 'formal') {
                mTop = 30; mBottom = 30; mLeft = 30; mRight = 30;
                marginSum = `3 cm ${window.t('rata')}`;
            } else {
                const mTcm = (mTop / 10).toFixed(1).replace(/\.0$/, '');
                const mBcm = (mBottom / 10).toFixed(1).replace(/\.0$/, '');
                const mLcm = (mLeft / 10).toFixed(1).replace(/\.0$/, '');
                const mRcm = (mRight / 10).toFixed(1).replace(/\.0$/, '');
                const isAllEqual = (mTcm === mBcm && mTcm === mLcm && mTcm === mRcm);
                marginSum = isAllEqual ? `${mTcm} cm ${window.t('rata')}` : `${mTcm}-${mBcm}-${mLcm}-${mRcm} cm`;
            }

            const targetPaperConfig = {
                width: pWidth,
                height: pHeight,
                marginTop: mTop,
                marginBottom: mBottom,
                marginLeft: mLeft,
                marginRight: mRight,
                orientation: orientation,
                format: baseDim.format
            };

            const fontSum = (saveTemplateSpecFont && saveTemplateSpecFont.textContent) ? saveTemplateSpecFont.textContent : 'Calibri, 11pt';

            try {
                const ok = await saveUserTemplateFromEditor(name, cat, desc, isStrict, marginSum, targetPaperConfig, fontSum);
                if (ok) {
                    if (modalSaveAsTemplate) {
                        modalSaveAsTemplate.classList.add('hidden');
                        modalSaveAsTemplate.style.display = 'none';
                    }
                    alert(window.t('Dokumen berhasil disimpan sebagai templat!'));
                }
            } catch (err) {
                console.error('Gagal menyimpan sebagai templat:', err);
                alert(window.t('Gagal menyimpan templat: ') + err);
            }
        });
    }

    // Setup listener kartu templat di halaman beranda
    const homeTemplateCards = document.querySelectorAll('.home-paper-template');
    homeTemplateCards.forEach(card => {
        card.addEventListener('click', () => {
            const templateId = card.getAttribute('data-template-id');
            if (!templateId) return;
            const allTpls = (window.BUILTIN_TEMPLATES_DATA || []);
            const found = allTpls.find(t => t.templateMeta && t.templateMeta.id === templateId);
            if (found) {
                openTemplatePreview(found);
            }
        });
    });

    const btnHomeMoreTemplates = document.getElementById('btn-home-more-templates');
    if (btnHomeMoreTemplates) {
        btnHomeMoreTemplates.addEventListener('click', () => {
            const menuTemplates = document.getElementById('menu-templates');
            if (menuTemplates) menuTemplates.click();
        });
    }

    window.openTemplatePreview = openTemplatePreview;
    window.reloadTemplatesGallery = reloadTemplatesGallery;
    reloadTemplatesGallery();
}

// Inisialisasi fitur saat awal pemuatan halaman
initColorControls();
initFontSizeCombobox();
initLineHeightControls();
initStylesGallery();
updateActiveStyleCard();
initVisualRulerEvents();
renderVisualRuler();
initExtraPdfTools();
initTemplatesFeature();
initOnboardingFeature();

function initOnboardingFeature() {
    const onboardingOverlay = document.getElementById('onboarding-overlay');
    if (!onboardingOverlay) return;

    const stepBadge = document.getElementById('onboarding-step-badge');
    const btnSkip = document.getElementById('btn-onboarding-skip');
    const btnBack = document.getElementById('btn-onboarding-back');
    const btnNext = document.getElementById('btn-onboarding-next');
    const checkDontShow = document.getElementById('check-ob-dont-show');
    const checkConsent = document.getElementById('check-ob-consent');
    const tabTos = document.getElementById('tab-ob-tos');
    const tabPrivacy = document.getElementById('tab-ob-privacy');
    const paneTos = document.getElementById('pane-ob-tos');
    const panePrivacy = document.getElementById('pane-ob-privacy');
    const dots = Array.from(document.querySelectorAll('.ob-dot'));
    const slides = Array.from(document.querySelectorAll('.onboarding-slide'));

    const btnLangId = document.getElementById('btn-ob-lang-id');
    const btnLangEn = document.getElementById('btn-ob-lang-en');
    const paperCards = Array.from(document.querySelectorAll('.onboarding-choice-card[data-paper]'));
    const marginCards = Array.from(document.querySelectorAll('.onboarding-choice-card[data-margin]'));

    const inputWorkspacePath = document.getElementById('ob-input-workspace-path');
    const btnChangeFolder = document.getElementById('btn-ob-change-folder');

    const btnActionHome = document.getElementById('btn-ob-action-home');
    const btnActionBlank = document.getElementById('btn-ob-action-blank');
    const btnActionTemplates = document.getElementById('btn-ob-action-templates');

    let currentStep = 1;
    const totalSteps = 6;

    function syncLangButtons() {
        const lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : 'id';
        if (btnLangId) btnLangId.classList.toggle('active', lang === 'id');
        if (btnLangEn) btnLangEn.classList.toggle('active', lang === 'en');
    }

    function syncWorkspacePathUI() {
        if (!inputWorkspacePath) return;
        const wsPath = window.bakuWorkspacePath || (typeof bakuWorkspacePath !== 'undefined' ? bakuWorkspacePath : '');
        if (wsPath) {
            inputWorkspacePath.value = wsPath;
        }
    }

    function updateStepUI() {
        slides.forEach((s, idx) => {
            const stepNum = idx + 1;
            s.classList.toggle('active', stepNum === currentStep);
        });

        dots.forEach((d, idx) => {
            const stepNum = idx + 1;
            d.classList.toggle('active', stepNum === currentStep);
        });

        if (stepBadge) {
            const stepText = (typeof window.t === 'function') 
                ? window.t(`Langkah ${currentStep} dari 6`) 
                : `Langkah ${currentStep} dari 6`;
            stepBadge.textContent = stepText;
        }

        if (btnBack) {
            if (currentStep === 1) {
                btnBack.classList.add('hidden');
                btnBack.style.display = 'none';
            } else {
                btnBack.classList.remove('hidden');
                btnBack.style.display = 'block';
            }
        }

        if (btnNext) {
            if (currentStep === totalSteps) {
                btnNext.textContent = (typeof window.t === 'function') ? window.t('Selesai') : 'Selesai';
                btnNext.disabled = false;
                btnNext.classList.remove('disabled');
            } else if (currentStep === 5) {
                btnNext.textContent = (typeof window.t === 'function') ? window.t('Lanjut') : 'Lanjut';
                const isConsented = checkConsent ? checkConsent.checked : false;
                btnNext.disabled = !isConsented;
                btnNext.classList.toggle('disabled', !isConsented);
            } else {
                btnNext.textContent = (typeof window.t === 'function') ? window.t('Lanjut') : 'Lanjut';
                btnNext.disabled = false;
                btnNext.classList.remove('disabled');
            }
        }

        syncLangButtons();
        syncWorkspacePathUI();
    }

    function showOnboarding(startStep = 1) {
        currentStep = Math.max(1, Math.min(totalSteps, startStep));
        syncWorkspacePathUI();
        syncLangButtons();
        updateStepUI();

        onboardingOverlay.style.display = 'flex';
        onboardingOverlay.classList.remove('hidden');
    }

    function completeOnboarding() {
        if (checkDontShow && checkDontShow.checked) {
            localStorage.setItem('baku_onboarding_completed', 'true');
        }
        onboardingOverlay.style.display = 'none';
        onboardingOverlay.classList.add('hidden');
    }

    // Navigasi tombol
    if (btnSkip) {
        btnSkip.addEventListener('click', () => {
            completeOnboarding();
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateStepUI();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (currentStep === 5 && checkConsent && !checkConsent.checked) {
                return;
            }
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepUI();
            } else {
                completeOnboarding();
            }
        });
    }

    dots.forEach(d => {
        d.addEventListener('click', () => {
            const targetStep = parseInt(d.getAttribute('data-step') || '1', 10);
            if (targetStep >= 1 && targetStep <= totalSteps) {
                if (targetStep === 6 && checkConsent && !checkConsent.checked) {
                    currentStep = 5;
                    updateStepUI();
                    return;
                }
                currentStep = targetStep;
                updateStepUI();
            }
        });
    });

    // Persetujuan di Langkah 5
    if (checkConsent) {
        checkConsent.addEventListener('change', () => {
            if (currentStep === 5) {
                updateStepUI();
            }
        });
    }

    // Tab Navigasi Dokumen Hukum di Langkah 5
    if (tabTos && tabPrivacy) {
        tabTos.addEventListener('click', () => {
            tabTos.classList.add('active');
            tabPrivacy.classList.remove('active');
            if (paneTos) paneTos.style.display = 'flex';
            if (panePrivacy) panePrivacy.style.display = 'none';
        });

        tabPrivacy.addEventListener('click', () => {
            tabPrivacy.classList.add('active');
            tabTos.classList.remove('active');
            if (paneTos) paneTos.style.display = 'none';
            if (panePrivacy) panePrivacy.style.display = 'flex';
        });
    }

    // Pilihan Bahasa di Langkah 2
    if (btnLangId) {
        btnLangId.addEventListener('click', () => {
            if (typeof applyLang === 'function') {
                applyLang('id');
                const langSelect = document.getElementById('setting-lang');
                if (langSelect) langSelect.value = 'id';
                syncLangButtons();
                updateStepUI();
            }
        });
    }

    if (btnLangEn) {
        btnLangEn.addEventListener('click', () => {
            if (typeof applyLang === 'function') {
                applyLang('en');
                const langSelect = document.getElementById('setting-lang');
                if (langSelect) langSelect.value = 'en';
                syncLangButtons();
                updateStepUI();
            }
        });
    }

    // Pilihan Format Kertas di Langkah 2
    paperCards.forEach(card => {
        card.addEventListener('click', () => {
            paperCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const fmt = card.getAttribute('data-paper');
            if (fmt === 'A4') {
                paperConfig.format = 'A4';
                paperConfig.width = 210;
                paperConfig.height = 297;
            } else if (fmt === 'F4') {
                paperConfig.format = 'F4';
                paperConfig.width = 210;
                paperConfig.height = 330;
            } else if (fmt === 'Letter') {
                paperConfig.format = 'Letter';
                paperConfig.width = 215.9;
                paperConfig.height = 279.4;
            }
            const inputPaperSize = document.getElementById('input-paper-size');
            if (inputPaperSize) inputPaperSize.value = fmt;
            if (typeof applyPageSetup === 'function') applyPageSetup();
        });
    });

    // Pilihan Margin di Langkah 2
    marginCards.forEach(card => {
        card.addEventListener('click', () => {
            marginCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const mg = card.getAttribute('data-margin');
            if (mg === 'academic') {
                paperConfig.marginTop = 40;
                paperConfig.marginLeft = 40;
                paperConfig.marginBottom = 30;
                paperConfig.marginRight = 30;
            } else {
                paperConfig.marginTop = 25.4;
                paperConfig.marginLeft = 25.4;
                paperConfig.marginBottom = 25.4;
                paperConfig.marginRight = 25.4;
            }
            const inputMarginT = document.getElementById('margin-top');
            if (inputMarginT) inputMarginT.value = paperConfig.marginTop;
            const inputMarginL = document.getElementById('margin-left');
            if (inputMarginL) inputMarginL.value = paperConfig.marginLeft;
            const inputMarginB = document.getElementById('margin-bottom');
            if (inputMarginB) inputMarginB.value = paperConfig.marginBottom;
            const inputMarginR = document.getElementById('margin-right');
            if (inputMarginR) inputMarginR.value = paperConfig.marginRight;
            if (typeof applyPageSetup === 'function') applyPageSetup();
        });
    });

    // Ubah Folder di Langkah 3
    if (btnChangeFolder) {
        btnChangeFolder.addEventListener('click', async () => {
            if (!window.__TAURI__ || !window.__TAURI__.dialog) return;
            try {
                const selected = await window.__TAURI__.dialog.open({
                    directory: true,
                    multiple: false,
                    title: (typeof window.t === 'function') ? window.t("Pilih Folder Ruang Kerja Baku") : "Pilih Folder Ruang Kerja Baku"
                });
                if (selected && typeof selected === 'string') {
                    window.bakuWorkspacePath = selected;
                    bakuWorkspacePath = selected;
                    if (inputWorkspacePath) inputWorkspacePath.value = selected;
                    const inputFolderPath = document.getElementById('input-folder-path');
                    if (inputFolderPath) inputFolderPath.value = selected;
                    const inputDefaultStorage = document.getElementById('input-default-storage');
                    if (inputDefaultStorage) inputDefaultStorage.value = selected;
                    if (typeof syncWorkspaceFilesToRecent === 'function') syncWorkspaceFilesToRecent();
                }
            } catch (err) {
                console.warn("Gagal memilih folder:", err);
            }
        });
    }

    // Aksi Cepat di Langkah 6
    if (btnActionHome) {
        btnActionHome.addEventListener('click', () => {
            completeOnboarding();
            const mHome = document.getElementById('menu-home');
            if (mHome) {
                mHome.click();
            } else if (typeof goToHome === 'function') {
                goToHome();
            }
        });
    }

    if (btnActionBlank) {
        btnActionBlank.addEventListener('click', () => {
            completeOnboarding();
            // Nonaktifkan seluruh view dan menu item yang sedang aktif
            const allViews = document.querySelectorAll('.view');
            allViews.forEach(v => v.classList.remove('active'));
            const allMenuItems = document.querySelectorAll('.menu-item');
            allMenuItems.forEach(m => m.classList.remove('active'));

            const sidebarEl = document.getElementById('sidebar');
            if (sidebarEl) sidebarEl.style.display = 'none';

            const viewEditorEl = document.getElementById('view-editor');
            if (viewEditorEl) viewEditorEl.classList.add('active');

            if (quill) {
                quill.setContents([{ insert: '\n' }]);
                quill.focus();
                setDirty(false);
            }
            currentDocName = 'Dokumen_Baru';
            currentFilePath = null;
            if (typeof applyPageSetup === 'function') applyPageSetup();
            updateWindowTitle();
        });
    }

    if (btnActionTemplates) {
        btnActionTemplates.addEventListener('click', () => {
            completeOnboarding();
            const mTpl = document.getElementById('menu-templates');
            if (mTpl) {
                mTpl.click();
            } else {
                const allViews = document.querySelectorAll('.view');
                allViews.forEach(v => v.classList.remove('active'));
                const allMenuItems = document.querySelectorAll('.menu-item');
                allMenuItems.forEach(m => m.classList.remove('active'));

                const sidebarEl = document.getElementById('sidebar');
                if (sidebarEl) sidebarEl.style.display = 'flex';

                const viewTemplatesEl = document.getElementById('view-templates');
                if (viewTemplatesEl) viewTemplatesEl.classList.add('active');

                const menuTemplatesEl = document.getElementById('menu-templates');
                if (menuTemplatesEl) menuTemplatesEl.classList.add('active');

                if (typeof window.reloadTemplatesGallery === 'function') {
                    window.reloadTemplatesGallery();
                }
            }
        });
    }

    // Tombol Buka Kembali di Settings & Menu Help
    const btnReopenOnboarding = document.getElementById('btn-reopen-onboarding');
    if (btnReopenOnboarding) {
        btnReopenOnboarding.addEventListener('click', () => {
            const modalSettings = document.getElementById('modal-settings');
            if (modalSettings) {
                modalSettings.classList.add('hidden');
                modalSettings.style.display = 'none';
            }
            showOnboarding(1);
        });
    }

    const actionOnboardingTour = document.getElementById('action-onboarding-tour');
    if (actionOnboardingTour) {
        actionOnboardingTour.addEventListener('click', () => {
            showOnboarding(1);
        });
    }

    window.openOnboardingTour = () => showOnboarding(1);

    // Periksa status saat aplikasi dibuka
    const isCompleted = localStorage.getItem('baku_onboarding_completed') === 'true';
    if (!isCompleted) {
        setTimeout(() => {
            showOnboarding(1);
        }, 150);
    }
}

