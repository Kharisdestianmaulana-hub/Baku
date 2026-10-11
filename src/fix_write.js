const fs = require('fs');
let code = fs.readFileSync('C:/Users/riray/Baku/src/main.js', 'utf8');

// Replace di actionSaveAs
const rxSaveAs = /await window\.__TAURI__\.tauri\.invoke\('save_baku_file',\s*\{\s*path:\s*filePathToSave,\s*content:\s*jsonString\s*\}\);/g;
code = code.replace(rxSaveAs, `const encoder = new TextEncoder();
            const uint8Array = encoder.encode(jsonString);
            await window.__TAURI__.fs.writeBinaryFile(filePathToSave, uint8Array);`);

// Replace di actionSave
const rxSave = /await window\.__TAURI__\.tauri\.invoke\('save_baku_file',\s*\{\s*path:\s*filePathToSave,\s*content:\s*jsonString\s*\}\);/g;
code = code.replace(rxSave, `const encoder = new TextEncoder();
        const uint8Array = encoder.encode(jsonString);
        await window.__TAURI__.fs.writeBinaryFile(filePathToSave, uint8Array);`);

// Just in case it was commented out in actionSave, let's also match the direct fs call
const rxSave2 = /await window\.__TAURI__\.fs\.writeTextFile\(filePathToSave,\s*jsonString\);/g;
code = code.replace(rxSave2, `const encoder = new TextEncoder();
        const uint8Array = encoder.encode(jsonString);
        await window.__TAURI__.fs.writeBinaryFile(filePathToSave, uint8Array);`);

fs.writeFileSync('C:/Users/riray/Baku/src/main.js', code, 'utf8');
console.log('Diganti ke writeBinaryFile');
