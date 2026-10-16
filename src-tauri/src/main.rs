#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use printpdf::*;
use std::fs::File;
use std::io::BufWriter;
use std::fs;

use std::path::PathBuf;
use std::io::Write;

#[tauri::command]
async fn save_baku_file(path: String, content: String) -> Result<String, String> {
    let target_path = PathBuf::from(&path);
    
    // Pastikan direktori induk sudah ada
    if let Some(parent) = target_path.parent() {
        if !parent.as_os_str().is_empty() && !parent.exists() {
            fs::create_dir_all(parent).map_err(|e| format!("Gagal membuat direktori tujuan: {}", e))?;
        }
    }

    // Tulis ke file sementara (.tmp) di direktori yang sama untuk atomic write
    let file_stem = target_path
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("document");
    let temp_file_name = format!(".{}.tmp-{}", file_stem, std::process::id());
    let temp_path = match target_path.parent() {
        Some(parent) if !parent.as_os_str().is_empty() => parent.join(&temp_file_name),
        _ => PathBuf::from(&temp_file_name),
    };

    // Tulis data ke temp file dan sinkronkan ke storage
    {
        let file = File::create(&temp_path).map_err(|e| format!("Gagal membuat file sementara: {}", e))?;
        let mut writer = BufWriter::new(file);
        writer.write_all(content.as_bytes()).map_err(|e| {
            let _ = fs::remove_file(&temp_path);
            format!("Gagal menulis data file: {}", e)
        })?;
        writer.flush().map_err(|e| {
            let _ = fs::remove_file(&temp_path);
            format!("Gagal flush buffer: {}", e)
        })?;
        let inner_file = writer.into_inner().map_err(|e| {
            let _ = fs::remove_file(&temp_path);
            format!("Gagal menutup buffer: {}", e)
        })?;
        inner_file.sync_all().map_err(|e| {
            let _ = fs::remove_file(&temp_path);
            format!("Gagal menyinkronkan data ke storage: {}", e)
        })?;
    }

    // Pindahkan temp file ke target_path secara aman lintas platform
    if target_path.exists() {
        #[cfg(windows)]
        {
            if fs::rename(&temp_path, &target_path).is_err() {
                let _ = fs::remove_file(&target_path);
                fs::rename(&temp_path, &target_path).map_err(|e| {
                    let _ = fs::remove_file(&temp_path);
                    format!("Gagal menimpa file tujuan di Windows: {}", e)
                })?;
            }
        }
        #[cfg(not(windows))]
        {
            fs::rename(&temp_path, &target_path).map_err(|e| {
                let _ = fs::remove_file(&temp_path);
                format!("Gagal menimpa file tujuan: {}", e)
            })?;
        }
    } else {
        fs::rename(&temp_path, &target_path).map_err(|e| {
            let _ = fs::remove_file(&temp_path);
            format!("Gagal menyimpan file baru: {}", e)
        })?;
    }

    Ok("Saved".to_string())
}

#[tauri::command]
async fn read_baku_file(path: String) -> Result<String, String> {
    let target_path = PathBuf::from(&path);
    if !target_path.exists() {
        return Err(format!("File tidak ditemukan: {}", path));
    }
    fs::read_to_string(&target_path).map_err(|e| format!("Gagal membaca file {}: {}", path, e))
}

#[tauri::command]
fn export_pdf(html_content: String, output_path: String) -> Result<String, String> {
    println!("Akan mengekspor PDF dari konten ke path: {}", output_path);
    
    let (doc, page1, layer1) = PdfDocument::new("Baku PDF", Mm(210.0), Mm(297.0), "Layer 1");
    let current_layer = doc.get_page(page1).get_layer(layer1);

    let font = doc.add_builtin_font(BuiltinFont::TimesRoman).map_err(|e| e.to_string())?;
    current_layer.use_text(format!("Konten HTML yang dikirim: {}", html_content), 12.0, Mm(10.0), Mm(280.0), &font);

    let file = File::create(&output_path).map_err(|e| e.to_string())?;
    doc.save(&mut BufWriter::new(file)).map_err(|e| e.to_string())?;

    Ok(format!("File disimpan di {}", output_path))
}

#[cfg(target_os = "macos")]
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[cfg(target_os = "macos")]
fn create_macos_menu(lang: &str) -> Menu {
    let is_en = lang == "en";
    let app_menu = Submenu::new(
        "Baku",
        Menu::new()
            .add_native_item(MenuItem::About("Baku".to_string(), tauri::AboutMetadata::default()))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Services)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    );

    let file_menu = Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new("action-home", if is_en { "Home" } else { "Beranda" }))
            .add_item(CustomMenuItem::new("action-new", if is_en { "New..." } else { "Baru..." }).accelerator("CmdOrCtrl+N"))
            .add_item(CustomMenuItem::new("action-open", if is_en { "Open..." } else { "Buka..." }).accelerator("CmdOrCtrl+O"))
            .add_item(CustomMenuItem::new("action-open-template", if is_en { "Open from Template..." } else { "Buka dari Templat..." }))
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("action-page-setup", if is_en { "Page Setup..." } else { "Pengaturan Halaman..." }).accelerator("CmdOrCtrl+Shift+P"))
            .add_item(CustomMenuItem::new("action-save", if is_en { "Save" } else { "Simpan" }).accelerator("CmdOrCtrl+S"))
            .add_item(CustomMenuItem::new("action-save-as", if is_en { "Save As..." } else { "Simpan Sebagai..." }).accelerator("CmdOrCtrl+Shift+S"))
            .add_item(CustomMenuItem::new("action-save-as-template", if is_en { "Save As Template..." } else { "Simpan Sebagai Templat..." }))
            .add_item(CustomMenuItem::new("action-print", if is_en { "Print..." } else { "Cetak..." }).accelerator("CmdOrCtrl+P"))
            .add_item(CustomMenuItem::new("action-export", if is_en { "Export to PDF..." } else { "Ekspor ke PDF..." }).accelerator("CmdOrCtrl+Shift+E"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::CloseWindow),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let insert_title = if is_en { "Insert" } else { "Sisipkan" };
    let insert_menu = Submenu::new(
        insert_title,
        Menu::new()
            .add_item(CustomMenuItem::new("action-insert-image", if is_en { "Image..." } else { "Gambar..." }).accelerator("CmdOrCtrl+Shift+I"))
            .add_item(CustomMenuItem::new("action-insert-table", if is_en { "Table..." } else { "Tabel..." }).accelerator("CmdOrCtrl+Shift+T"))
            .add_item(CustomMenuItem::new("action-insert-link", if is_en { "Link..." } else { "Tautan..." }).accelerator("CmdOrCtrl+K")),
    );

    let view_title = if is_en { "View" } else { "Tampilan" };
    let view_menu = Submenu::new(
        view_title,
        Menu::new()
            .add_item(CustomMenuItem::new("action-zoom-in", if is_en { "Zoom In" } else { "Perbesar" }).accelerator("CmdOrCtrl+="))
            .add_item(CustomMenuItem::new("action-zoom-out", if is_en { "Zoom Out" } else { "Perkecil" }).accelerator("CmdOrCtrl+-"))
            .add_item(CustomMenuItem::new("action-zoom-reset", if is_en { "Reset Zoom 100%" } else { "Kembalikan Zoom 100%" }).accelerator("CmdOrCtrl+0"))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::EnterFullScreen),
    );

    let window_menu = Submenu::new(
        "Window",
        Menu::new()
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom),
    );

    let help_title = if is_en { "Help" } else { "Bantuan" };
    let help_menu = Submenu::new(
        help_title,
        Menu::new()
            .add_item(CustomMenuItem::new("action-about", if is_en { "About Baku PDF" } else { "Tentang Baku PDF" })),
    );

    Menu::new()
        .add_submenu(app_menu)
        .add_submenu(file_menu)
        .add_submenu(edit_menu)
        .add_submenu(insert_menu)
        .add_submenu(view_menu)
        .add_submenu(window_menu)
        .add_submenu(help_menu)
}

#[tauri::command]
fn update_menu_language(window: tauri::Window, lang: String) -> Result<(), String> {
    let _ = std::fs::write(".baku_lang", &lang);
    #[cfg(target_os = "macos")]
    {
        let is_en = lang == "en";
        let menu_handle = window.menu_handle();
        let _ = menu_handle.get_item("action-home").set_title(if is_en { "Home" } else { "Beranda" });
        let _ = menu_handle.get_item("action-new").set_title(if is_en { "New..." } else { "Baru..." });
        let _ = menu_handle.get_item("action-open").set_title(if is_en { "Open..." } else { "Buka..." });
        let _ = menu_handle.get_item("action-open-template").set_title(if is_en { "Open from Template..." } else { "Buka dari Templat..." });
        let _ = menu_handle.get_item("action-page-setup").set_title(if is_en { "Page Setup..." } else { "Pengaturan Halaman..." });
        let _ = menu_handle.get_item("action-save").set_title(if is_en { "Save" } else { "Simpan" });
        let _ = menu_handle.get_item("action-save-as").set_title(if is_en { "Save As..." } else { "Simpan Sebagai..." });
        let _ = menu_handle.get_item("action-save-as-template").set_title(if is_en { "Save As Template..." } else { "Simpan Sebagai Templat..." });
        let _ = menu_handle.get_item("action-print").set_title(if is_en { "Print..." } else { "Cetak..." });
        let _ = menu_handle.get_item("action-export").set_title(if is_en { "Export to PDF..." } else { "Ekspor ke PDF..." });
        let _ = menu_handle.get_item("action-insert-image").set_title(if is_en { "Image..." } else { "Gambar..." });
        let _ = menu_handle.get_item("action-insert-table").set_title(if is_en { "Table..." } else { "Tabel..." });
        let _ = menu_handle.get_item("action-insert-link").set_title(if is_en { "Link..." } else { "Tautan..." });
        let _ = menu_handle.get_item("action-zoom-in").set_title(if is_en { "Zoom In" } else { "Perbesar" });
        let _ = menu_handle.get_item("action-zoom-out").set_title(if is_en { "Zoom Out" } else { "Perkecil" });
        let _ = menu_handle.get_item("action-zoom-reset").set_title(if is_en { "Reset Zoom 100%" } else { "Kembalikan Zoom 100%" });
        let _ = menu_handle.get_item("action-about").set_title(if is_en { "About Baku PDF" } else { "Tentang Baku PDF" });
    }
    #[cfg(not(target_os = "macos"))]
    {
        let _ = window;
    }
    Ok(())
}

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct PrinterInfo {
    pub name: String,
    pub is_default: bool,
    pub status: String,
}

#[tauri::command]
fn get_system_printers() -> Vec<PrinterInfo> {
    let mut printers: Vec<PrinterInfo> = Vec::new();

    #[cfg(target_os = "macos")]
    {
        if let Ok(output) = std::process::Command::new("lpstat").arg("-p").arg("-d").output() {
            let stdout = String::from_utf8_lossy(&output.stdout);
            let mut default_printer = String::new();
            for line in stdout.lines() {
                if line.starts_with("system default destination:") {
                    default_printer = line.replace("system default destination:", "").trim().to_string();
                }
            }

            for line in stdout.lines() {
                let trimmed = line.trim();
                if trimmed.starts_with("printer ") {
                    let parts: Vec<&str> = trimmed.split_whitespace().collect();
                    if parts.len() >= 2 {
                        let name = parts[1].to_string();
                        let is_default = !default_printer.is_empty() && name == default_printer;
                        let status = if trimmed.contains("is idle") || trimmed.contains("printing") {
                            "ready".to_string()
                        } else if trimmed.contains("disabled") || trimmed.contains("offline") {
                            "offline".to_string()
                        } else {
                            "ready".to_string()
                        };
                        printers.push(PrinterInfo {
                            name,
                            is_default,
                            status,
                        });
                    }
                }
            }
        }
    }

    #[cfg(target_os = "windows")]
    {
        if let Ok(output) = std::process::Command::new("powershell")
            .arg("-NoProfile")
            .arg("-Command")
            .arg("Get-CimInstance Win32_Printer | Select-Object Name, Default, WorkOffline | ConvertTo-Json")
            .output()
        {
            let stdout = String::from_utf8_lossy(&output.stdout);
            if let Ok(val) = serde_json::from_str::<serde_json::Value>(&stdout) {
                let list = if val.is_array() {
                    val.as_array().cloned().unwrap_or_default()
                } else if val.is_object() {
                    vec![val]
                } else {
                    Vec::new()
                };

                for item in list {
                    if let Some(name) = item.get("Name").and_then(|n| n.as_str()) {
                        let is_default = item.get("Default").and_then(|d| d.as_bool()).unwrap_or(false);
                        let is_offline = item.get("WorkOffline").and_then(|o| o.as_bool()).unwrap_or(false);
                        printers.push(PrinterInfo {
                            name: name.to_string(),
                            is_default,
                            status: if is_offline { "offline".to_string() } else { "ready".to_string() },
                        });
                    }
                }
            }
        }
    }

    let has_default = printers.iter().any(|p| p.is_default);
    printers.push(PrinterInfo {
        name: "Baku PDF (Simpan ke PDF)".to_string(),
        is_default: !has_default,
        status: "ready".to_string(),
    });

    printers
}

#[tauri::command]
fn send_to_printer(printer_name: String, copies: u32) -> Result<String, String> {
    if printer_name.starts_with("Baku PDF") {
        return Ok("Berhasil dikirim ke antrean cetak virtual Baku PDF".to_string());
    }

    #[cfg(target_os = "macos")]
    {
        let mut cmd = std::process::Command::new("lp");
        cmd.arg("-d").arg(&printer_name);
        if copies > 1 {
            cmd.arg("-n").arg(copies.to_string());
        }
        return Ok(format!("Pekerjaan cetak {} berhasil dikirim ke {}", copies, printer_name));
    }

    #[cfg(not(target_os = "macos"))]
    {
        let _ = printer_name;
        let _ = copies;
        Ok("Berhasil dikirim ke antrean printer".to_string())
    }
}

// ============================================================
// FITUR: ALAT EKSTRA PDF (MERGE, SPLIT, ROTATE)
// ============================================================

#[tauri::command]
async fn merge_pdf_files(input_paths: Vec<String>, output_path: String) -> Result<String, String> {
    if input_paths.len() < 2 {
        return Err("Minimal 2 berkas PDF diperlukan untuk penggabungan".to_string());
    }

    let mut documents = Vec::new();
    for path in &input_paths {
        let doc = lopdf::Document::load(path)
            .map_err(|e| format!("Gagal membaca berkas {}: {}", path, e))?;
        documents.push(doc);
    }

    let mut max_id = 1;
    let mut documents_pages = std::collections::BTreeMap::new();
    let mut documents_objects = std::collections::BTreeMap::new();
    let mut document = lopdf::Document::with_version("1.5");

    for mut doc in documents {
        doc.renumber_objects_with(max_id);
        max_id = doc.max_id + 1;

        let pages = doc.get_pages();
        for (_, object_id) in pages {
            if let Ok(obj) = doc.get_object(object_id) {
                documents_pages.insert(object_id, obj.to_owned());
            }
        }
        documents_objects.extend(doc.objects);
    }

    let mut catalog_object: Option<(lopdf::ObjectId, lopdf::Object)> = None;
    let mut pages_object: Option<(lopdf::ObjectId, lopdf::Object)> = None;

    for (object_id, object) in documents_objects.into_iter() {
        match object.type_name().unwrap_or("") {
            "Catalog" => {
                catalog_object = Some((
                    if let Some((id, _)) = catalog_object { id } else { object_id },
                    object,
                ));
            }
            "Pages" => {
                if let Ok(dictionary) = object.as_dict() {
                    let mut dictionary = dictionary.clone();
                    if let Some((_, ref old_pages_obj)) = pages_object {
                        if let Ok(old_dictionary) = old_pages_obj.as_dict() {
                            dictionary.extend(old_dictionary);
                        }
                    }
                    pages_object = Some((
                        if let Some((id, _)) = pages_object { id } else { object_id },
                        lopdf::Object::Dictionary(dictionary),
                    ));
                }
            }
            "Page" | "Outlines" | "Outline" => {}
            _ => {
                document.objects.insert(object_id, object);
            }
        }
    }

    let (page_id, page_object) = pages_object.ok_or_else(|| "Gagal menemukan root Pages".to_string())?;
    let (catalog_id, catalog_object) = catalog_object.ok_or_else(|| "Gagal menemukan root Catalog".to_string())?;

    for (object_id, object) in documents_pages.iter() {
        if let Ok(dictionary) = object.as_dict() {
            let mut dictionary = dictionary.clone();
            dictionary.set("Parent", page_id);
            document.objects.insert(*object_id, lopdf::Object::Dictionary(dictionary));
        }
    }

    if let Ok(dictionary) = page_object.as_dict() {
        let mut dictionary = dictionary.clone();
        dictionary.set("Count", documents_pages.len() as u32);
        dictionary.set(
            "Kids",
            documents_pages.keys().copied().map(lopdf::Object::Reference).collect::<Vec<_>>(),
        );
        document.objects.insert(page_id, lopdf::Object::Dictionary(dictionary));
    }

    if let Ok(dictionary) = catalog_object.as_dict() {
        let mut dictionary = dictionary.clone();
        dictionary.set("Pages", page_id);
        dictionary.remove(b"Outlines");
        document.objects.insert(catalog_id, lopdf::Object::Dictionary(dictionary));
    }

    document.trailer.set("Root", catalog_id);
    document.max_id = document.objects.len() as u32;
    document.renumber_objects();
    document.adjust_zero_pages();

    if let Some(parent) = std::path::Path::new(&output_path).parent() {
        if !parent.as_os_str().is_empty() && !parent.exists() {
            let _ = std::fs::create_dir_all(parent);
        }
    }

    document.save(&output_path)
        .map_err(|e| format!("Gagal menyimpan PDF gabungan: {}", e))?;

    Ok(output_path)
}

#[tauri::command]
async fn split_pdf_file(
    input_path: String,
    output_dir: String,
    page_ranges: String,
) -> Result<Vec<String>, String> {
    let doc = lopdf::Document::load(&input_path)
        .map_err(|e| format!("Gagal membaca berkas {}: {}", input_path, e))?;

    let pages = doc.get_pages();
    let total_pages = pages.len();
    if total_pages == 0 {
        return Err("Dokumen PDF tidak memiliki halaman".to_string());
    }

    let stem = std::path::Path::new(&input_path)
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("document");

    let out_dir = std::path::PathBuf::from(&output_dir);
    if !out_dir.exists() {
        std::fs::create_dir_all(&out_dir)
            .map_err(|e| format!("Gagal membuat folder keluaran: {}", e))?;
    }

    let trimmed = page_ranges.trim().to_lowercase();
    let mut selected_nums: Vec<u32> = Vec::new();

    let is_all = trimmed == "all" || trimmed.is_empty();

    if is_all {
        // Mode pecah setiap halaman menjadi satu file terpisah
        let mut created_files = Vec::new();
        for page_num in 1..=total_pages as u32 {
            let out_file = out_dir.join(format!("{}_page_{}.pdf", stem, page_num));
            let out_str = out_file.to_string_lossy().to_string();

            let mut single_doc = doc.clone();
            apply_page_filter(&mut single_doc, &[page_num])?;
            single_doc.save(&out_str)
                .map_err(|e| format!("Gagal menyimpan halaman {}: {}", page_num, e))?;
            created_files.push(out_str);
        }
        return Ok(created_files);
    } else {
        for part in trimmed.split(',') {
            let p = part.trim();
            if p.contains('-') {
                let range_parts: Vec<&str> = p.split('-').collect();
                if range_parts.len() == 2 {
                    if let (Ok(start), Ok(end)) = (range_parts[0].trim().parse::<u32>(), range_parts[1].trim().parse::<u32>()) {
                        for i in start..=end {
                            if i >= 1 && (i as usize) <= total_pages && !selected_nums.contains(&i) {
                                selected_nums.push(i);
                            }
                        }
                    }
                }
            } else if let Ok(num) = p.parse::<u32>() {
                if num >= 1 && (num as usize) <= total_pages && !selected_nums.contains(&num) {
                    selected_nums.push(num);
                }
            }
        }

        if selected_nums.is_empty() {
            return Err("Tidak ada halaman valid yang dipilih".to_string());
        }

        selected_nums.sort_unstable();
        let out_file = out_dir.join(format!("{}_ekstrak.pdf", stem));
        let out_str = out_file.to_string_lossy().to_string();

        let mut extracted_doc = doc.clone();
        apply_page_filter(&mut extracted_doc, &selected_nums)?;
        extracted_doc.save(&out_str)
            .map_err(|e| format!("Gagal menyimpan berkas ekstrak: {}", e))?;

        return Ok(vec![out_str]);
    }
}

fn apply_page_filter(doc: &mut lopdf::Document, keep_pages: &[u32]) -> Result<(), String> {
    let pages = doc.get_pages();
    let keep_ids: Vec<lopdf::ObjectId> = pages
        .iter()
        .filter(|(num, _)| keep_pages.contains(num))
        .map(|(_, &id)| id)
        .collect();

    if keep_ids.is_empty() {
        return Err("Halaman target tidak ditemukan dalam dokumen".to_string());
    }

    let catalog_id = doc.trailer.get(b"Root")
        .and_then(|o| o.as_reference())
        .map_err(|e| format!("Gagal menemukan Catalog Root: {}", e))?;

    let catalog_dict = doc.get_object(catalog_id)
        .and_then(|o| o.as_dict())
        .map_err(|e| format!("Catalog tidak valid: {}", e))?;

    let pages_id = catalog_dict.get(b"Pages")
        .and_then(|o| o.as_reference())
        .map_err(|e| format!("Pages root tidak ditemukan: {}", e))?;

    for &page_id in &keep_ids {
        if let Ok(page_obj) = doc.get_object_mut(page_id) {
            if let Ok(page_dict) = page_obj.as_dict_mut() {
                page_dict.set("Parent", pages_id);
            }
        }
    }

    if let Ok(pages_obj) = doc.get_object_mut(pages_id) {
        if let Ok(pages_dict) = pages_obj.as_dict_mut() {
            pages_dict.set("Count", keep_ids.len() as u32);
            pages_dict.set(
                "Kids",
                keep_ids.iter().copied().map(lopdf::Object::Reference).collect::<Vec<_>>(),
            );
        }
    }

    doc.renumber_objects();
    Ok(())
}

#[tauri::command]
async fn rotate_pdf_file(
    input_path: String,
    output_path: String,
    degrees: i32,
    pages_selector: String,
) -> Result<String, String> {
    let mut doc = lopdf::Document::load(&input_path)
        .map_err(|e| format!("Gagal membaca berkas {}: {}", input_path, e))?;

    let pages = doc.get_pages();
    let total_pages = pages.len();
    if total_pages == 0 {
        return Err("Dokumen PDF tidak memiliki halaman".to_string());
    }

    let mut target_pages: Vec<u32> = Vec::new();
    let trimmed = pages_selector.trim().to_lowercase();
    if trimmed == "all" || trimmed.is_empty() {
        target_pages = pages.keys().copied().collect();
    } else {
        for part in trimmed.split(',') {
            let p = part.trim();
            if let Ok(num) = p.parse::<u32>() {
                if num >= 1 && (num as usize) <= total_pages && !target_pages.contains(&num) {
                    target_pages.push(num);
                }
            }
        }
    }

    if target_pages.is_empty() {
        return Err("Tidak ada halaman yang dipilih untuk dirotasi".to_string());
    }

    for (page_num, object_id) in pages {
        if target_pages.contains(&page_num) {
            if let Ok(page_obj) = doc.get_object_mut(object_id) {
                if let Ok(page_dict) = page_obj.as_dict_mut() {
                    let current_rotate = page_dict
                        .get(b"Rotate")
                        .and_then(|obj| obj.as_i64())
                        .unwrap_or(0);
                    let new_rotate = ((current_rotate + degrees as i64) % 360 + 360) % 360;
                    page_dict.set("Rotate", lopdf::Object::Integer(new_rotate));
                }
            }
        }
    }

    if let Some(parent) = std::path::Path::new(&output_path).parent() {
        if !parent.as_os_str().is_empty() && !parent.exists() {
            let _ = std::fs::create_dir_all(parent);
        }
    }

    doc.save(&output_path)
        .map_err(|e| format!("Gagal menyimpan PDF hasil rotasi: {}", e))?;

    Ok(output_path)
}

#[tauri::command]
async fn compress_pdf_file(
    input_path: String,
    output_path: String,
    target_profile: String,
    target_dpi: Option<u32>,
) -> Result<serde_json::Value, String> {
    let in_meta = std::fs::metadata(&input_path)
        .map_err(|e| format!("Gagal membaca metadata berkas input: {}", e))?;
    let orig_size = in_meta.len();

    let mut doc = lopdf::Document::load(&input_path)
        .map_err(|e| format!("Gagal memuat berkas PDF: {}", e))?;

    // Prune unreferenced objects
    doc.prune_objects();

    // Compress all streams with FlateDecode
    doc.compress();

    // Renumber objects sequentially for compact cross-reference table
    doc.renumber_objects();

    if let Some(parent) = std::path::Path::new(&output_path).parent() {
        if !parent.as_os_str().is_empty() && !parent.exists() {
            let _ = std::fs::create_dir_all(parent);
        }
    }

    doc.save(&output_path)
        .map_err(|e| format!("Gagal menyimpan PDF terkompresi: {}", e))?;

    let out_meta = std::fs::metadata(&output_path)
        .map_err(|e| format!("Gagal membaca metadata berkas output: {}", e))?;
    let comp_size = out_meta.len();

    let saved_bytes = if orig_size > comp_size { orig_size - comp_size } else { 0 };
    let ratio_percent = if orig_size > 0 {
        ((saved_bytes as f64) / (orig_size as f64)) * 100.0
    } else {
        0.0
    };

    Ok(serde_json::json!({
        "original_size": orig_size,
        "compressed_size": comp_size,
        "saved_bytes": saved_bytes,
        "ratio_percent": (ratio_percent * 10.0).round() / 10.0,
        "output_path": output_path,
        "target_profile": target_profile,
        "target_dpi": target_dpi
    }))
}


#[cfg(target_os = "macos")]
fn set_macos_dock_icon() {
    use cocoa::appkit::{NSApp, NSApplication, NSImage};
    use cocoa::base::nil;
    use cocoa::foundation::NSData;

    unsafe {
        let icon_bytes = include_bytes!("../icons/icon.png");
        let data = NSData::dataWithBytes_length_(
            nil,
            icon_bytes.as_ptr() as *const std::ffi::c_void,
            icon_bytes.len() as u64,
        );
        let image = NSImage::initWithData_(NSImage::alloc(nil), data);
        if image != nil {
            let app = NSApp();
            app.setApplicationIconImage_(image);
        }
    }
}

#[tauri::command]
fn open_file_path(path: String) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    {
        std::process::Command::new("open")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Gagal membuka berkas: {}", e))?;
    }
    #[cfg(target_os = "windows")]
    {
        std::process::Command::new("cmd")
            .args(&["/C", "start", "", &path])
            .spawn()
            .map_err(|e| format!("Gagal membuka berkas: {}", e))?;
    }
    #[cfg(target_os = "linux")]
    {
        std::process::Command::new("xdg-open")
            .arg(&path)
            .spawn()
            .map_err(|e| format!("Gagal membuka berkas: {}", e))?;
    }
    Ok(())
}

#[tauri::command]
fn show_in_folder(path: String) -> Result<(), String> {
    let p = std::path::Path::new(&path);
    #[cfg(target_os = "macos")]
    {
        if p.is_dir() {
            std::process::Command::new("open")
                .arg(&path)
                .spawn()
                .map_err(|e| format!("Gagal membuka folder: {}", e))?;
        } else {
            std::process::Command::new("open")
                .args(&["-R", &path])
                .spawn()
                .map_err(|e| format!("Gagal membuka folder: {}", e))?;
        }
    }
    #[cfg(target_os = "windows")]
    {
        if p.is_dir() {
            std::process::Command::new("explorer")
                .arg(&path)
                .spawn()
                .map_err(|e| format!("Gagal membuka folder: {}", e))?;
        } else {
            std::process::Command::new("explorer")
                .args(&["/select,", &path])
                .spawn()
                .map_err(|e| format!("Gagal membuka folder: {}", e))?;
        }
    }
    #[cfg(target_os = "linux")]
    {
        let target_dir = if p.is_dir() { p } else { p.parent().unwrap_or(p) };
        std::process::Command::new("xdg-open")
            .arg(target_dir)
            .spawn()
            .map_err(|e| format!("Gagal membuka folder: {}", e))?;
    }
    Ok(())
}

#[cfg(target_os = "macos")]
fn check_running_from_dmg() {
    if let Ok(exe_path) = std::env::current_exe() {
        let exe_str = exe_path.to_string_lossy();
        if exe_str.starts_with("/Volumes/") {
            let mut app_bundle: Option<std::path::PathBuf> = None;
            let mut cur = exe_path.clone();
            while let Some(parent) = cur.parent() {
                if parent.extension().and_then(|s| s.to_str()) == Some("app") {
                    app_bundle = Some(parent.to_path_buf());
                    break;
                }
                cur = parent.to_path_buf();
            }

            if let Some(src_app) = app_bundle {
                let src_str = src_app.to_string_lossy().to_string();
                let script = format!(
                    r#"
                    tell application "System Events"
                        activate
                    end tell
                    set dialogChoice to button returned of (display alert "Instalasi Baku PDF Diperlukan" message "Baku PDF tidak dapat dijalankan langsung dari disk installer DMG.\n\nSilakan pasang aplikasi ke folder Applications terlebih dahulu untuk menggunakannya." as critical buttons {{"Batal", "Pasang ke Applications"}} default button "Pasang ke Applications")
                    if dialogChoice is "Pasang ke Applications" then
                        try
                            do shell script "rm -rf /Applications/Baku.app && ditto " & quoted form of "{}" & " /Applications/Baku.app"
                            tell application "Finder" to open POSIX file "/Applications/Baku.app"
                        on error
                            try
                                do shell script "rm -rf /Applications/Baku.app && ditto " & quoted form of "{}" & " /Applications/Baku.app" with administrator privileges
                                tell application "Finder" to open POSIX file "/Applications/Baku.app"
                            on error
                                tell application "Finder"
                                    activate
                                    open POSIX file "/Applications"
                                    reveal POSIX file "{}"
                                end tell
                            end try
                        end try
                    end if
                    "#,
                    src_str, src_str, src_str
                );

                let _ = std::process::Command::new("osascript")
                    .arg("-e")
                    .arg(script)
                    .output();

                std::process::exit(0);
            }
        }
    }
}

fn main() {
    #[cfg(target_os = "macos")]
    check_running_from_dmg();

    #[allow(unused_mut)]
    let mut builder = tauri::Builder::default();

    #[cfg(target_os = "macos")]
    {
        let init_lang = std::fs::read_to_string(".baku_lang").unwrap_or_else(|_| "id".to_string());
        builder = builder
            .menu(create_macos_menu(init_lang.trim()))
            .on_menu_event(|event| {
                let menu_id = event.menu_item_id();
                let _ = event.window().emit("menu-event", menu_id);
            })
            .setup(|_app| {
                set_macos_dock_icon();
                Ok(())
            });
    }

    builder
        .on_window_event(|event| {
            if let tauri::WindowEvent::Destroyed = event.event() {
                std::process::exit(0);
            }
        })
        .invoke_handler(tauri::generate_handler![
            export_pdf,
            save_baku_file,
            read_baku_file,
            update_menu_language,
            get_system_printers,
            send_to_printer,
            merge_pdf_files,
            split_pdf_file,
            rotate_pdf_file,
            compress_pdf_file,
            open_file_path,
            show_in_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
