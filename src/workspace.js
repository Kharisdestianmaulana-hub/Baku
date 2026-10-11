// workspace.js
// Menangani pembuatan folder Baku Workspace dan Exports secara otomatis

let bakuWorkspacePath = "";
let bakuExportsPath = "";

async function initWorkspace() {
    if (!window.__TAURI__) return;
    
    try {
        const { homeDir, join } = window.__TAURI__.path;
        const { createDir, exists } = window.__TAURI__.fs;
        
        const docDir = await homeDir();
        
        bakuWorkspacePath = await join(docDir, "Baku PDF Workspace");
        bakuExportsPath = await join(docDir, "Baku PDF Exports");
        
        // Buat folder jika belum ada
        if (!(await exists(bakuWorkspacePath))) {
            await createDir(bakuWorkspacePath, { recursive: true });
        }
        if (!(await exists(bakuExportsPath))) {
            await createDir(bakuExportsPath, { recursive: true });
        }
        
        // Update UI di Modal New Doc
        const inputFolderPath = document.getElementById('input-folder-path');
        if (inputFolderPath) {
            inputFolderPath.value = bakuWorkspacePath;
        }
        
        // Update UI di Settings
        const inputDefaultStorage = document.getElementById('input-default-storage');
        if (inputDefaultStorage) {
            inputDefaultStorage.value = bakuWorkspacePath;
        }
        
    } catch (e) {
        console.error("Gagal inisialisasi workspace:", e);
        alert("WORKSPACE ERROR: " + e);
    }
}

// Buka folder lewat Settings
function runWorkspaceInit() {
    initWorkspace();
    
    const btnOpenWorkspace = document.getElementById('btn-open-workspace');
    if (btnOpenWorkspace) {
        btnOpenWorkspace.addEventListener('click', async () => {
            if (!window.__TAURI__) return;
            try {
                // Di Tauri v1, kita bisa menggunakan open untuk membuka folder
                const { open } = window.__TAURI__.shell;
                if (bakuWorkspacePath) {
                    await open(bakuWorkspacePath);
                }
            } catch (e) {
                console.error("Gagal membuka folder:", e);
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWorkspaceInit);
} else {
    runWorkspaceInit();
}
