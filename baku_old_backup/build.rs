fn main() {
    slint_build::compile("ui/appwindow.slint").unwrap();
    
    // Embed Windows Icon if compiling for Windows
    if std::env::var("CARGO_CFG_TARGET_OS").unwrap() == "windows" {
        let _ = embed_resource::compile("baku_manifest.rc", embed_resource::NONE);
    }
}
