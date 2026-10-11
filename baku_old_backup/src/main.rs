slint::include_modules!();

use printpdf::*;
use std::fs::File;
use std::io::BufWriter;

fn main() -> Result<(), slint::PlatformError> {
    let ui = AppWindow::new()?;

    ui.on_create_new_document(|paper_size| {
        println!("Membuat dokumen baru dengan ukuran: {}", paper_size);
        // Nanti di sini kita bisa set state ukuran kanvas secara dinamis
    });

    ui.on_export_pdf(move || {
        println!("Memulai ekspor PDF...");

        // 1. Buat dokumen PDF berukuran A4 (210 x 297 mm)
        let (doc, page1, layer1) = PdfDocument::new("Baku Document", Mm(210.0), Mm(297.0), "Layer 1");
        
        let current_layer = doc.get_page(page1).get_layer(layer1);

        // 2. Tambahkan font default (built-in Helvetica)
        let font = doc.add_builtin_font(BuiltinFont::Helvetica).unwrap();

        // 3. Tulis teks sederhana ke dalam PDF
        current_layer.use_text("Hello dari Baku PDF Editor!", 24.0, Mm(50.0), Mm(250.0), &font);
        current_layer.use_text("Teks ini dibuat secara terprogram menggunakan Rust.", 12.0, Mm(50.0), Mm(240.0), &font);

        // 4. Simpan file PDF ke direktori saat ini
        let file_path = "Hasil_Ekspor_Baku.pdf";
        let file = File::create(file_path).unwrap();
        let mut writer = BufWriter::new(file);
        doc.save(&mut writer).unwrap();

        println!("PDF berhasil disimpan sebagai: {}", file_path);
    });

    ui.run()
}
