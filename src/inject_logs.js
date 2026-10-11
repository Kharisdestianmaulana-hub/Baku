const fs = require('fs');
let code = fs.readFileSync('C:/Users/riray/Baku/src/main.js', 'utf8');

// Replace setTimeout content
const target = `    setTimeout(async () => {
        // Kosongkan editor
        quill.setContents([{ insert: '\\n' }]);
        quill.focus();
        setDirty(false);
        
        if (window.__TAURI__) {
            if (currentFilePath) {
                const fileData = { version: 1, docName: currentDocName, paperConfig: paperConfig, numberingConfig: numberingConfig, headerFooterConfig: headerFooterConfig, content: quill.getContents() };
                try {
                    await window.__TAURI__.tauri.invoke('save_baku_file', { path: currentFilePath, content: JSON.stringify(fileData) });
                } catch(e) { console.error(e); }
            }
        }
    }, 150);`;

const replacement = `    localStorage.setItem('DEBUG_CRASH', 'Langkah 1: Menunggu timeout 150ms');
    setTimeout(async () => {
        localStorage.setItem('DEBUG_CRASH', 'Langkah 2: Timeout jalan, kosongkan quill');
        quill.setContents([{ insert: '\\n' }]);
        
        localStorage.setItem('DEBUG_CRASH', 'Langkah 3: Fokus dan Dirty');
        quill.focus();
        setDirty(false);
        
        if (window.__TAURI__) {
            if (currentFilePath) {
                localStorage.setItem('DEBUG_CRASH', 'Langkah 4: Setup fileData');
                const fileData = { version: 1, docName: currentDocName, paperConfig: paperConfig, numberingConfig: numberingConfig, headerFooterConfig: headerFooterConfig, content: quill.getContents() };
                
                localStorage.setItem('DEBUG_CRASH', 'Langkah 5: Memanggil save_baku_file Rust');
                try {
                    await window.__TAURI__.tauri.invoke('save_baku_file', { path: currentFilePath, content: JSON.stringify(fileData) });
                    localStorage.setItem('DEBUG_CRASH', 'Langkah 6: AMAN (Selesai Tulis)');
                } catch(e) { 
                    localStorage.setItem('DEBUG_CRASH', 'ERROR RUST: ' + e);
                    console.error(e); 
                }
            }
        }
    }, 150);`;

// Normalize line endings to ensure match
code = code.replace(/\r\n/g, '\n');
code = code.replace(target.replace(/\r\n/g, '\n'), replacement);
fs.writeFileSync('C:/Users/riray/Baku/src/main.js', code, 'utf8');
console.log('Log Disisipkan V2');
