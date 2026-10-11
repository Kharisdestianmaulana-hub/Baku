#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use printpdf::*;
use std::fs::File;
use std::io::BufWriter;
use std::fs;

#[tauri::command]
async fn save_baku_file(path: String, content: String) -> Result<String, String> {
    fs::write(&path, content).map_err(|e| e.to_string())?;
    Ok("Saved".to_string())
}

#[tauri::command]
async fn read_baku_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![export_pdf, save_baku_file, read_baku_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
