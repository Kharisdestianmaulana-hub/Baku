const fs = require('fs');
let code = fs.readFileSync('C:/Users/riray/Baku/src/main.js', 'utf8');

// Di btnCreateModal (baris disabled)
const rxWrite1 = /\/\/ awit disabled for test/g;
code = code.replace(rxWrite1, `await window.__TAURI__.tauri.invoke('save_baku_file', { path: currentFilePath, content: JSON.stringify(fileData) });`);

// Di actionSave (baris 1339)
const rxWrite2 = /await window\.__TAURI__\.fs\.writeTextFile\(filePathToSave,\s*jsonString\);/g;
code = code.replace(rxWrite2, `await window.__TAURI__.tauri.invoke('save_baku_file', { path: filePathToSave, content: jsonString });`);

// Di actionOpen (baris 1531)
const rxRead1 = /const jsonString = await window\.__TAURI__\.fs\.readTextFile\(filePath\);/g;
code = code.replace(rxRead1, `const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });`);

// Di openSpecificFile (baris 1674)
const rxRead2 = /const jsonString = await window\.__TAURI__\.fs\.readTextFile\(filePath\);/g;
code = code.replace(rxRead2, `const jsonString = await window.__TAURI__.tauri.invoke('read_baku_file', { path: filePath });`);

fs.writeFileSync('C:/Users/riray/Baku/src/main.js', code, 'utf8');
console.log("MIGRATED TO RUST INVOKE");
