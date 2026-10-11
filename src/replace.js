const fs = require('fs');
let text = fs.readFileSync('C:/Users/riray/Baku/src/main.js', 'utf8');

const search = /if\s*\(inputFolderPath && inputFolderPath\.value\)\s*\{\s*const separator = inputFolderPath\.value\.includes\('\\\\'\) \? '\\\\' : '\/';\s*currentFilePath = inputFolderPath\.value \+ separator \+ docName \+ '\.baku';/;

const replaceStr = `if (typeof bakuWorkspacePath !== 'undefined' && bakuWorkspacePath) {
        const separator = bakuWorkspacePath.includes('\\\\') ? '\\\\' : '/';
        currentFilePath = bakuWorkspacePath + separator + docName + '.baku';
    } else if (inputFolderPath && inputFolderPath.value) {
        const separator = inputFolderPath.value.includes('\\\\') ? '\\\\' : '/';
        currentFilePath = inputFolderPath.value + separator + docName + '.baku';`;

text = text.replace(search, replaceStr);
fs.writeFileSync('C:/Users/riray/Baku/src/main.js', text, 'utf8');
