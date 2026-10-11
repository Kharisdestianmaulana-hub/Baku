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

function setDirty(state) {
    if (isDirty === state) return;
    isDirty = state;
    if (window.__TAURI__) {
        const title = "Baku PDF Editor - " + currentDocName + (isDirty ? "*" : "");
        window.__TAURI__.window.appWindow.setTitle(title).catch(e => console.error(e));
    }
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

// --- DAFTAR FONT LINTAS PLATFORM (WINDOWS & MAC) ---
const fontList = [
    'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Candara', 
    'Comic Sans MS', 'Consolas', 'Courier New', 'Franklin Gothic Medium',
    'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Lucida Sans Unicode',
    'Palatino Linotype', 'San Francisco', 'Segoe UI', 'Sylfaen', 'Tahoma',
    'Times New Roman', 'Trebuchet MS', 'Verdana'
];

// Mendaftarkan Format Font (Inline Style) agar bisa menerima semua font di atas
const FontStyle = Quill.import('attributors/style/font');
FontStyle.whitelist = fontList;
Quill.register(FontStyle, true);

// Populasikan HTML Dropdown Font sebelum Quill diinisialisasi
const fontSelect = document.querySelector('.ql-font');
if (fontSelect) {
    fontSelect.innerHTML = `<option selected>${window.t('Default')}</option>`;
    fontList.forEach(font => {
        const opt = document.createElement('option');
        opt.value = font;
        opt.textContent = font;
        fontSelect.appendChild(opt);
    });
}

// --- CUSTOM BLOT UNTUK PAGE BREAK ---
const BlockEmbed = Quill.import('blots/block/embed');
class PageBreakBlot extends BlockEmbed {
    static create(value) {
        const node = super.create();
        node.setAttribute('contenteditable', 'false');
        node.style.height = value.height + 'px';
        node.style.width = '100%';
        node.style.display = 'block';
        node.style.background = 'transparent';
        node.style.userSelect = 'none';
        node.classList.add('page-break-element');
        return node;
    }

    static value(node) {
        return { height: parseFloat(node.style.height) || 0 };
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
        node.classList.add('page-break-element', 'section-break-element'); // kita simpan dua-duanya agar CSS margin dsb tetap kena
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

// Mendaftarkan Format Ukuran Teks (Angka/Points)
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', '24pt', '28pt', '36pt', '48pt', '72pt'];
Quill.register(SizeStyle, true);

// Init Quill dengan Toolbar Kustom dan Keyboard Shortcuts
const quill = new Quill('#quill-container', {
    theme: 'snow',
    modules: {
        table: true,
        toolbar: '#custom-toolbar',
        history: {
            delay: 1000,
            maxStack: 100,
            userOnly: true
        },
        keyboard: {
                        bindings: {
                backspaceAlign: {
                    key: 8, // Backspace
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
                pageBreak: { 
                    key: 'Enter',
                    shortKey: true, // Tombol Ctrl
                    handler: function(range, context) {
                        insertPageBreak(this.quill, range);
                    }
                }
            }
        }
    }
});

function insertPageBreak(q, range, isSectionBreak = false, auto = false) {
    if (!range) range = q.getSelection(true);
    if (!range) return;
    
    let [block, offset] = q.getLine(range.index);
    let isEmpty = block && block.length() === 1;
    let insertIndex = range.index;
    
    // Jika ini auto-paginate, kita lemparkan SELURUH baris (paragraf) ke halaman berikutnya!
    if (auto && block) {
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
    
    // Batas bawah kertas putih pada halaman saat ini
    const endOfCurrentPaperPx = (currentPageIndex * totalPageHeightPx) + pageHeightPx;
    
    // Berapa jarak yang harus dilompati
    let gapDistance = (endOfCurrentPaperPx - bounds.top) + gapPx + (paperConfig.marginTop * mmToPx);
    
    // Jika gapDistance negatif (karena kursor sudah di halaman berikutnya), kita tidak usah break
    if (auto && gapDistance < 0) return;
    
    if (gapDistance < 10) gapDistance += totalPageHeightPx;
    
    let targetIndex;

    if (isEmpty && !auto) {
        // Jika baris kosong dan manual, tambahkan enter dulu agar baris kosongnya tidak tertimpa
        q.insertText(insertIndex, '\n', Quill.sources.USER);
        q.insertEmbed(insertIndex + 1, blotType, { height: gapDistance }, Quill.sources.USER);
        targetIndex = insertIndex + 2;
        q.setSelection(targetIndex, 0, Quill.sources.SILENT);
    } else {
        // Jika auto, atau jika baris tidak kosong, sisipkan di insertIndex
        q.insertEmbed(insertIndex, blotType, { height: gapDistance }, Quill.sources.USER);
        
        if (auto) {
            // Kembalikan kursor ke tempat aslinya + 1 (karena kita menambahkan 1 embed di depannya)
            targetIndex = range.index + 1;
            q.setSelection(targetIndex, 0, Quill.sources.SILENT);
        } else {
            targetIndex = (offset === 0) ? (insertIndex + 1) : (insertIndex + 2);
            q.setSelection(targetIndex, 0, Quill.sources.SILENT);
        }
    }
    
    // Gulir layar secara mulus ke halaman baru
    setTimeout(() => {
        const newBounds = q.getBounds(targetIndex);
        const canvasArea = document.getElementById('canvas-area');
        
        // Hitung posisi: kursor berada 50px dari tepi atas layar (dikalikan level zoom saat ini)
        const targetScrollTop = (newBounds.top * (typeof currentZoom !== 'undefined' ? currentZoom : 1.0)) - 50;
        
        canvasArea.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
    }, 50);
}

// Fitur A+ (Perbesar) dan A- (Perkecil)
const sizeListArray = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', '24pt', '28pt', '36pt', '48pt', '72pt'];

document.getElementById('custom-btn-size-up').addEventListener('click', () => {
    let currentSize = quill.getFormat().size || '11pt'; // 11pt adalah default kita
    let currentIndex = sizeListArray.indexOf(currentSize);
    if (currentIndex < sizeListArray.length - 1) {
        quill.format('size', sizeListArray[currentIndex + 1]);
    }
});

document.getElementById('custom-btn-size-down').addEventListener('click', () => {
    let currentSize = quill.getFormat().size || '11pt';
    let currentIndex = sizeListArray.indexOf(currentSize);
    if (currentIndex > 0) {
        quill.format('size', sizeListArray[currentIndex - 1]);
    }
});



// Elemen Menu Bar
const actionHome = document.getElementById('action-home');
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
        setDirty(true); // Langsung tandai kotor
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

    // Beri jeda sejenak untuk membiarkan Webview2 menggambar layar
    setTimeout(() => {
        quill.setContents([{ insert: '\n' }]);
        quill.focus();
        // Langsung tandai kotor agar pengguna tahu dia harus Save!
        setDirty(true);
        // Hapus jejak log crash
        localStorage.removeItem('DEBUG_CRASH');
    }, 150);
});

actionHome.addEventListener('click', () => {
    sidebar.style.display = 'flex';
    viewEditor.classList.remove('active');
    viewHome.classList.add('active');
    renderRecentDocs();
    
    // Kembalikan judul semula
    if (window.__TAURI__) {
        window.__TAURI__.window.appWindow.setTitle("Baku PDF Editor")
            .catch(e => console.error(e));
    }
});

actionExit.addEventListener('click', () => {
    if (window.__TAURI__) {
        window.__TAURI__.window.appWindow.close();
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
    
    document.getElementById('pn-config-id').value = configId;
    document.getElementById('pn-show').checked = conf.show;
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
        
        // Render ulang
        const editor = document.querySelector('.ql-editor');
        const pagesNeeded = parseInt(editor.dataset.pagesNeeded || '1');
        updatePageNumbers(pagesNeeded);
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

function updatePageNumbers(totalPages) {
    const overlay = document.getElementById('page-numbers-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    
    // Cari semua section break di dokumen
    const sectionBreaks = Array.from(document.querySelectorAll('.ql-editor .section-break-element'));
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
            numDiv.textContent = finalStr;
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
            
            numDiv.style.pointerEvents = "auto";
            numDiv.style.cursor = "pointer";
            numDiv.style.fontFamily = "Times New Roman, serif";
            numDiv.style.fontSize = "11pt";
            numDiv.style.color = "#000000";
            
            // Jarak teks ke garis margin bawah sedikit
            numDiv.style.transform = "translateY(-100%)";
            
            // Klik 2x untuk edit
            numDiv.addEventListener('dblclick', () => {
                if (typeof openPageNumberSettings === 'function') openPageNumberSettings(currentConfigId);
            });
            
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
            hDiv.style.pointerEvents = "auto";
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
            fDiv.style.pointerEvents = "auto";
            fDiv.style.fontFamily = "Times New Roman, serif";
            fDiv.style.fontSize = "11pt";
            fDiv.style.color = "#000000";
            fDiv.style.opacity = "0.7";
            fDiv.style.transform = "translateY(-50%)";
            overlay.appendChild(fDiv);
        }
        // --- END RENDER HEADER / FOOTER ---
        } catch(e) { console.error('HF Render Error:', e); alert('HF Render Error: ' + e.message); }
        
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

    // EFEK PAGINASI (KERTAS TERPISAH SEPERTI MS WORD)
    const gapHeight = 15; // 15mm celah antar kertas
    const totalHeight = paperConfig.height + gapHeight; // 297 + 15 = 312mm
    const paperHeight = paperConfig.height; // Kertas aslinya 297mm
    
    // SVG menggambar kertas putih polos dengan garis pembatas (Sesuai panduan Flat UI, tanpa drop shadow)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${paperConfig.width}mm" height="${totalHeight}mm" viewBox="0 0 ${paperConfig.width} ${totalHeight}">
        <rect x="0" y="0" width="${paperConfig.width}" height="${paperHeight}" fill="#ffffff" stroke="#D1D5DB" stroke-width="1"/>
    </svg>`;
    
    const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    
    editor.style.backgroundImage = `url("${svgDataUrl}")`;
    editor.style.backgroundSize = `${paperConfig.width}mm ${totalHeight}mm`;
    editor.style.backgroundRepeat = 'repeat-y';

    updateCanvasHeight();
}

function updateCanvasHeight() {
    const editor = document.querySelector('.ql-editor');
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
    // Tambahkan gap 15mm per lembar (kecuali lembar pertama jika ingin lebih presisi, tapi kita ratakan totalHeight)
    const totalHeightMm = (pagesNeeded * paperConfig.height) + ((pagesNeeded - 1) * 15);
    editor.style.minHeight = `${totalHeightMm}mm`;
    
    editor.dataset.pagesNeeded = pagesNeeded;
    updatePageNumbers(pagesNeeded);
}

// Terapkan saat pertama kali jalan
applyPageSetup();

// Pantau setiap kali pengguna mengetik, perbarui tinggi kertasnya
quill.on('text-change', (delta, oldDelta, source) => {
    updateCanvasHeight();
    if (source === 'user') {
        setDirty(true);
        
        // --- AUTO PAGINASI CERDAS (FULL SWEEP) ---
        // Cegah auto-paginate saat pengguna melakukan Backspace / Delete / Undo
        const isInsertion = delta.ops.some(op => op.insert);
        if (!isInsertion) return;

        if (quill._isAutoPaginating) return;

        const editor = document.querySelector('.ql-editor');
        if (!editor) return;
        
        const mmToPx = 96 / 25.4;
        const gapPx = 15 * mmToPx;
        const pageHeightPx = paperConfig.height * mmToPx;
        const totalPageHeightPx = pageHeightPx + gapPx;
        const marginBottomPx = paperConfig.marginBottom * mmToPx;
        const maxTextHeight = pageHeightPx - ((paperConfig.marginTop + paperConfig.marginBottom) * mmToPx);
        
        const blocks = Array.from(editor.children);
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (block.classList.contains('page-break-element') || block.classList.contains('section-break-element')) continue;
            
            const top = block.offsetTop;
            const bottom = top + block.offsetHeight;
            
            let currentPageIndex = Math.floor(top / totalPageHeightPx);
            const endOfCurrentPaperPx = (currentPageIndex * totalPageHeightPx) + pageHeightPx;
            const limit = endOfCurrentPaperPx - marginBottomPx;
            
            // Jika blok ini menabrak atau melampaui margin bawah
            if (bottom > limit && top < limit) {
                // Jangan paksa blok raksasa yang memang tidak akan pernah muat di 1 halaman
                if (block.offsetHeight > maxTextHeight) continue;
                
                let qBlot = Quill.find(block);
                if (!qBlot) continue;
                let blockIndex = quill.getIndex(qBlot);
                
                quill._isAutoPaginating = true;
                setTimeout(() => {
                    insertPageBreak(quill, {index: blockIndex, length: 0}, false, true);
                    setTimeout(() => quill._isAutoPaginating = false, 50);
                }, 10);
                return; // Selesaikan satu per satu (akan dipanggil lagi secara rekursif oleh event text-change)
            }
        }
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
        
        // Hapus sementara trik visual garis abu-abu agar tidak ikut tercetak di PDF
        const originalBg = editorElement.style.backgroundImage;
        const originalMinHeight = editorElement.style.minHeight;
        editorElement.style.backgroundImage = 'none';
        editorElement.style.backgroundColor = '#ffffff'; // Set murni putih
        editorElement.style.minHeight = '0'; // KUNCI BUG FIX: biarkan tinggi mengikuti konten asli agar tidak terpotong 2 halaman

        const opt = {
            margin:       0, 
            filename:     docName,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: paperConfig.format, orientation: 'portrait' }
        };

        // 3. Konversi ke PDF dan dapatkan ArrayBuffer
        const worker = html2pdf().set(opt).from(element);
        const pdfString = await worker.output('datauristring'); // pakai data URI string karena lebih stabil
        
        // Kembalikan ilusi multi-kertas ke layar
        editorElement.style.backgroundImage = originalBg;
        editorElement.style.backgroundColor = 'transparent';
        editorElement.style.minHeight = originalMinHeight;

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

// --- MENU EDIT ---
document.getElementById('action-undo').addEventListener('click', () => quill.history.undo());
document.getElementById('action-redo').addEventListener('click', () => quill.history.redo());
document.getElementById('action-cut').addEventListener('click', () => {
    document.execCommand('cut');
    quill.focus();
});
document.getElementById('action-copy').addEventListener('click', () => {
    document.execCommand('copy');
    quill.focus();
});
document.getElementById('action-paste').addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        const range = quill.getSelection(true);
        quill.insertText(range.index, text);
    } catch (err) {
        alert(window.t("Gagal menempelkan teks. Pastikan Anda memberi izin clipboard."));
    }
});

// --- MENU TAMPILAN (ZOOM KANVAS) ---
let currentZoom = 1.0;
const canvasArea = document.getElementById('canvas-area');
const quillContainer = document.getElementById('quill-container');

function applyZoom() {
    // Menggunakan CSS zoom agar tata letak (layout) dan scrollbar ikut membesar secara fisik
    quillContainer.style.zoom = currentZoom;
    if (typeof updateStatusBar === 'function') updateStatusBar();
}

document.getElementById('action-zoom-in').addEventListener('click', () => {
    currentZoom += 0.1;
    applyZoom();
});
document.getElementById('action-zoom-out').addEventListener('click', () => {
    if (currentZoom > 0.3) {
        currentZoom -= 0.1;
        applyZoom();
    }
});
document.getElementById('action-zoom-reset').addEventListener('click', () => {
    currentZoom = 1.0;
    applyZoom();
});

// --- KEYBOARD SHORTCUTS ---
window.addEventListener('keydown', (e) => {
    // Ctrl + Z, Ctrl + Y, Ctrl + C, dll sudah ditangani otomatis oleh OS & Quill
    if (e.ctrlKey) {
        if (e.key === '=' || e.key === '+') { // Ctrl + (+)
            e.preventDefault();
            document.getElementById('action-zoom-in').click();
        } else if (e.key === '-') { // Ctrl + (-)
            e.preventDefault();
            document.getElementById('action-zoom-out').click();
        } else if (e.key === '0') { // Ctrl + 0
            e.preventDefault();
            document.getElementById('action-zoom-reset').click();
        }
    }
});

// --- MOUSE WHEEL SHORTCUTS (ZOOM TO POINTER & HORIZONTAL SCROLL) ---
canvasArea.addEventListener('wheel', (e) => {
    // Ctrl + Scroll = Zoom In/Out ke Titik Kursor Mouse
    if (e.ctrlKey) {
        e.preventDefault(); 
        
        const oldZoom = currentZoom;
        if (e.deltaY < 0) {
            currentZoom += 0.1;
        } else if (e.deltaY > 0) {
            currentZoom -= 0.1;
            if (currentZoom < 0.3) currentZoom = 0.3;
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

    } 
    // Shift + Scroll = Scroll Horizontal
    else if (e.shiftKey) {
        e.preventDefault();
        canvasArea.scrollLeft += (e.deltaY > 0 ? 80 : -80);
    }
}, { passive: false });

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

// Shortcut Ctrl+F dan Ctrl+H
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'h')) {
        e.preventDefault();
        setFindMode(e.key.toLowerCase() === 'h');
        
        setFindMode(false);
        modalFind.style.display = 'flex'; document.body.classList.add('search-active');
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
fontList.forEach(font => {
    // Karena spasi di value Quill diubah jadi string persis, kita target CSS-nya
    cssText += `.ql-picker.ql-font .ql-picker-label[data-value="${font}"]::before,
.ql-picker.ql-font .ql-picker-item[data-value="${font}"]::before {
    font-family: "${font}", sans-serif !important;
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

// Mencegah shortcut bawaan browser dan mengarahkannya ke fitur aplikasi
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        if (e.key.toLowerCase() === 's') {
            e.preventDefault();
            actionSave();
        } else if (e.key.toLowerCase() === 'p') {
            e.preventDefault();
            document.getElementById('action-export').click();
        } else if (e.key.toLowerCase() === 'o') {
            e.preventDefault();
            actionOpen();
        } else if (e.key.toLowerCase() === 'n') {
            e.preventDefault();
            actionNew();
        }
    }
});





// --- FITUR SIMPAN & BUKA DOKUMEN (.BAKU) ---

async function actionSave() {
    if (!window.__TAURI__) return;
    try {
        let filePathToSave = currentFilePath;
        
        // Jika belum ada file path, minta user pilih tempat save
        if (!filePathToSave) {
            const docName = currentDocName.endsWith('.baku') ? currentDocName : currentDocName + '.baku';
            const chosenPath = await window.__TAURI__.dialog.save({
                title: window.t('Simpan Dokumen Baku'),
                defaultPath: docName,
                filters: [{ name: window.t('Baku Document'), extensions: ['baku'] }]
            });
            if (!chosenPath) return;
            filePathToSave = chosenPath;
            currentFilePath = chosenPath;
            
            const newName = filePathToSave.split('\\').pop().split('/').pop();
            currentDocName = newName.replace('.baku', '');
            
        }

        const fileData = {
            version: 1,
            docName: currentDocName,
            paperConfig: paperConfig,
            numberingConfig: numberingConfig,
            headerFooterConfig: headerFooterConfig,
            content: quill.getContents()
        };

        // 1. Tampilkan animasi "Menyimpan..."
        const saveState = document.getElementById('status-save-state');
        const saveIcon = document.getElementById('status-save-icon');
        const saveText = document.getElementById('status-save-text');
        
        if (saveState) {
            saveState.style.display = 'flex';
            saveText.textContent = window.t('Menyimpan...');
            saveIcon.innerHTML = `<svg class="sb-spinner" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
        }

        // Sengaja diberi jeda estetik 600ms agar animasi loading sempat terlihat oleh mata pengguna
        await new Promise(r => setTimeout(r, 600));

        // 2. Eksekusi penyimpanan ke Disk
        const jsonString = JSON.stringify(fileData);
        await window.__TAURI__.tauri.invoke('save_baku_file', { path: filePathToSave, content: jsonString });
        updateRecentDocs(filePathToSave, currentDocName);
        
        // 3. Ubah menjadi "Tersimpan" dengan ikon centang
        if (saveState) {
            saveText.textContent = window.t('Tersimpan');
            saveIcon.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#107C41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => { saveState.style.display = 'none'; }, 3000);
        }

        setDirty(false); // Reset dirty state
        if (closeAfterSave && window.__TAURI__) {
            window.__TAURI__.window.appWindow.close();
        }

    } catch (e) {
        console.error(e);
        alert(window.t('Gagal menyimpan dokumen: ') + e);
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
            filters: [{ name: window.t('Baku Document'), extensions: ['baku'] }]
        });

        if (!filePath) return;

        const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });
        const fileData = JSON.parse(jsonString);

        if (fileData.content && fileData.paperConfig) {
            currentFilePath = filePath;
            currentDocName = fileData.docName || 'Dokumen_Baru';
            
            
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
            
            setTimeout(() => {
                quill.setContents(fileData.content);
                quill.focus();
                setDirty(false);
                updateRecentDocs(filePath, currentDocName);
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
document.getElementById('action-open').addEventListener('click', actionOpen);
document.getElementById('action-new').addEventListener('click', actionNew);


// Tambahkan pemicu aksi buka dokumen di tombol kotak besar Home Screen
const btnOpenDoc = document.getElementById('btn-open-doc');
if (btnOpenDoc) {
    btnOpenDoc.addEventListener('click', actionOpen);
}

// --- FITUR DOKUMEN TERAKHIR (RECENT DOCS) ---
const RECENT_DOCS_KEY = 'baku_recent_docs';

function getRecentDocs() {
    const data = localStorage.getItem(RECENT_DOCS_KEY);
    return data ? JSON.parse(data) : [];
}

function updateRecentDocs(path, docName) {
    if (!path) return;
    let docs = getRecentDocs();
    
    // Hapus jika path sudah ada (agar bisa dipindah ke atas)
    docs = docs.filter(d => d.path !== path);
    
    // Tambahkan ke paling atas
    docs.unshift({
        path: path,
        docName: docName,
        lastOpened: new Date().toISOString()
    });
    
    // Batasi maksimal 10 riwayat
    if (docs.length > 10) docs = docs.slice(0, 10);
    
    localStorage.setItem(RECENT_DOCS_KEY, JSON.stringify(docs));
    renderRecentDocs();
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    if (diffDays === 0 && now.getDate() === date.getDate()) return window.t('Hari ini, ') + time;
    if (diffDays === 1 || (diffDays === 0 && now.getDate() !== date.getDate())) return window.t('Kemarin, ') + time;
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${time}`;
}

function renderRecentDocs() {
    const crashLog = localStorage.getItem("DEBUG_CRASH");
    if (crashLog) {
        const el = document.getElementById("crash-report");
        if (el) {
            el.style.display = "block";
            el.textContent = "CRASH TERAKHIR TERJADI SETELAH: " + crashLog;
            if (crashLog.includes("AMAN") || crashLog.includes("SELESAI")) el.style.display = "none";
        }
    }

    const container = document.getElementById('recent-docs-list');
    if (!container) return;
    
    const docs = getRecentDocs();
    container.innerHTML = '';
    
    if (docs.length === 0) {
        container.innerHTML = `<div style="padding: 32px; text-align: center; color: #8C92A4; font-size: 10pt;">${window.t('Belum ada riwayat dokumen.')}</div>`;
        return;
    }
    
    docs.forEach(doc => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.style.cursor = 'pointer';
        const colTitle = document.createElement('div');
        colTitle.className = 'col-4 title';
        colTitle.textContent = doc.docName;
        
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
}

async function openSpecificFile(filePath) {
    if (!window.__TAURI__) return;
    try {
        const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });
        const fileData = JSON.parse(jsonString);

        if (fileData.content && fileData.paperConfig) {
            currentFilePath = filePath;
            currentDocName = fileData.docName || 'Dokumen_Baru';
            
            
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
            
            setTimeout(() => {
                quill.setContents(fileData.content);
                setDirty(false);
                updateRecentDocs(filePath, currentDocName);
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

// --- CEGAT PENUTUPAN JENDELA (INTERCEPT CLOSE) ---
const modalUnsaved = document.getElementById('modal-unsaved');

if (window.__TAURI__) {
    // Tauri v1 API untuk mencegat penutupan
    window.__TAURI__.window.appWindow.onCloseRequested(async (event) => {
        if (isDirty) {
            event.preventDefault(); // Blokir penutupan paksa
            modalUnsaved.style.display = 'flex';
            modalUnsaved.classList.remove('hidden');
        }
    });
}

// Tombol di dalam Modal Keluar
document.getElementById('btn-unsaved-cancel').addEventListener('click', () => {
    modalUnsaved.classList.add('hidden');
    modalUnsaved.style.display = 'none';
});

document.getElementById('btn-unsaved-discard').addEventListener('click', () => {
    // Matikan alarm kotor agar tidak dicegat lagi, lalu tutup
    isDirty = false;
    if (window.__TAURI__) {
        window.__TAURI__.window.appWindow.close();
    }
});

document.getElementById('btn-unsaved-save').addEventListener('click', () => {
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

// Pindahkan pencarian ke Tab Alat
const btnFindRibbon = document.getElementById('ribbon-btn-find');
if (btnFindRibbon) {
    btnFindRibbon.addEventListener('click', () => {
        setFindMode(false);
        modalFind.style.display = 'flex'; document.body.classList.add('search-active');
        inputFind.focus();
    });
}

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
        currentSelectedImage = e.target;
        imageOverlay.classList.remove('hidden');
        updateOverlayPosition();
    } else {
        currentSelectedImage = null;
        imageOverlay.classList.add('hidden');
        imageContextMenu.style.display = 'none';
    }
});

// Update posisi saat window di-resize atau scroll (jika diperlukan)
quill.root.addEventListener('scroll', updateOverlayPosition);
window.addEventListener('resize', updateOverlayPosition);

// Modifikasi tombol perataan agar MENGHAPUS absolute positioning jika diaktifkan ulang
const removeAbsolute = (blot, align) => {
    let currentStyle = currentSelectedImage.getAttribute('style') || '';
    currentStyle = currentStyle.replace(/position:\s*absolute;?/g, '')
                               .replace(/left:\s*[^;]+;?/g, '')
                               .replace(/top:\s*[^;]+;?/g, '')
                               .replace(/z-index:\s*[^;]+;?/g, '');
    blot.format('data-align', align);
    blot.format('style', currentStyle);
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
        blot.format('data-align', 'free');
        blot.format('style', newStyle);
    }
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
const viewHomeNew = document.getElementById('view-home');
const viewSettings = document.getElementById('view-settings');
const viewEditorNew = document.getElementById('view-editor');

if (menuHome && menuSettings) {
    menuHome.addEventListener('click', () => {
        menuHome.classList.add('active');
        menuSettings.classList.remove('active');
        viewHomeNew.classList.add('active');
        viewSettings.classList.remove('active');
        viewEditorNew.classList.remove('active');
        renderRecentDocs();
    });

    menuSettings.addEventListener('click', () => {
        menuSettings.classList.add('active');
        menuHome.classList.remove('active');
        viewSettings.classList.add('active');
        viewHomeNew.classList.remove('active');
        viewEditorNew.classList.remove('active');
    });
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

// --- FITUR BARU: HURUF BESAR & KECIL ---
const btnUppercase = document.getElementById('btn-uppercase');
const btnLowercase = document.getElementById('btn-lowercase');

function changeCaseLogic(toUpper) {
    const range = quill.getSelection();
    if (!range || range.length === 0) return;

    const text = quill.getText(range.index, range.length);
    const format = quill.getFormat(range.index, range.length); 
    const newText = toUpper ? text.toUpperCase() : text.toLowerCase();

    const Delta = Quill.import('delta');
    quill.updateContents(
        new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert(newText, format),
        'user'
    );
    quill.setSelection(range.index, range.length);
}

if (btnUppercase) btnUppercase.addEventListener('click', () => changeCaseLogic(true));
if (btnLowercase) btnLowercase.addEventListener('click', () => changeCaseLogic(false));

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
    });
}

if (btnExportOpen) {
    btnExportOpen.addEventListener('click', async () => {
        if (!window.__TAURI__) return;
        const filePath = modalExportSuccess.dataset.filepath;
        if (filePath) {
            try {
                await window.__TAURI__.shell.open(filePath);
            } catch (e) {
                console.error("Gagal membuka PDF:", e);
                alert("Gagal membuka file PDF: " + e);
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
                // Untuk membuka folder di Windows dan highlight file-nya, bisa menggunakan shell open ke direktori induk
                // Karena shell.open mungkin membuka direktori jika diberi path direktori.
                // Tauri shell.open hanya membuka path di default app.
                // Mengambil nama direktori (membuang nama file dari path)
                const folderPath = filePath.substring(0, filePath.lastIndexOf('\\')) || filePath.substring(0, filePath.lastIndexOf('/'));
                await window.__TAURI__.shell.open(folderPath);
            } catch (e) {
                console.error("Gagal membuka folder:", e);
                alert("Gagal membuka folder: " + e);
            }
        }
    });
}

// --- LOGIKA BILAH STATUS (STATUS BAR) ---
let totalPages = 1;
let currentPage = 1;

function updateStatusBar() {
    // 1. Hitung total halaman
    const mmToPx = 96 / 25.4;
    const pageHeightPx = paperConfig.height * mmToPx;
    const editor = document.querySelector('.ql-editor');
    const lastChild = editor ? editor.lastElementChild : null;
    let contentHeight = 0;
    if (lastChild) {
        contentHeight = lastChild.offsetTop + lastChild.offsetHeight + 48;
    }
    totalPages = Math.max(1, Math.ceil(contentHeight / pageHeightPx));
    
    // 2. Hitung halaman saat ini berdasarkan scroll layar
    // Mengambil titik tengah layar yang terlihat sebagai representasi halaman yang sedang dibaca
    const viewportMiddle = canvasArea.scrollTop + (canvasArea.clientHeight / 2);
    // Karena zoom membesarkan pixel fisik, kita perlu menyesuaikan tinggi halaman aslinya
    const zoomedPageHeightPx = pageHeightPx * currentZoom;
    
    currentPage = Math.floor(viewportMiddle / zoomedPageHeightPx) + 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    // 3. Update teks Halaman
    const statusPage = document.getElementById('status-page');
    if (statusPage) {
        // Karena ada dua angka variabel (1 dan 2), agak sulit pakai TreeWalker t() sederhana.
        // Kita pakai window.t() yang memecah string.
        statusPage.textContent = window.t('Halaman') + ` ${currentPage} ` + window.t('dari') + ` ${totalPages}`;
    }

    // 4. Hitung Kata
    const text = quill.getText().trim();
    // Hitung kata (pisahkan berdasarkan spasi)
    const wordCount = text.length > 0 ? text.split(/\s+/).length : 0;
    const statusWords = document.getElementById('status-word-count');
    if (statusWords) statusWords.textContent = `${wordCount} ` + window.t('Kata');

    // 5. Update persentase zoom
    const zoomVal = document.getElementById('status-zoom-val');
    if (zoomVal) zoomVal.textContent = `${Math.round(currentZoom * 100)}%`;

    // 6. Tampilkan bahasa aplikasi yang sedang aktif
    const statusLangText = document.getElementById('status-lang-text');
    if (statusLangText) {
        const currentLang = localStorage.getItem('baku_lang') || 'id';
        statusLangText.textContent = currentLang === 'en' ? 'English (US)' : 'Bahasa Indonesia';
    }
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
    });
}

// Pantau jika pengguna mengetik, menghapus, mem-paste teks (Total halaman dan Jumlah kata berubah)
quill.on('text-change', updateStatusBar);

// Pantau jika pengguna menscroll mouse (Halaman saat ini berubah)
canvasArea.addEventListener('scroll', updateStatusBar);

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
                const tableModule = quill.getModule('table');
                if (tableModule) {
                    tableModule.insertTable(r, c);
                }
                dropdownTable.style.display = 'none';
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
        
        const tableModule = quill.getModule('table');
        if (tableModule) {
            tableModule.insertTable(rows, cols);
        } else {
            alert("Modul tabel gagal dimuat.");
        }
        modalTable.style.display = 'none';
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
