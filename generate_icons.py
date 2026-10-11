import os
from PIL import Image

def generate_icons(source_path):
    img = Image.open(source_path)
    
    # Generate Windows ICO
    # Windows typically uses 16, 32, 48, 64, 128, 256
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    img.save("Baku.ico", format="ICO", sizes=icon_sizes)
    print("Generated Baku.ico for Windows.")

    # Generate macOS iconset
    iconset_dir = "Baku.iconset"
    if not os.path.exists(iconset_dir):
        os.makedirs(iconset_dir)
        
    # Standard macOS icon sizes
    mac_sizes = {
        "icon_16x16.png": 16,
        "icon_16x16@2x.png": 32,
        "icon_32x32.png": 32,
        "icon_32x32@2x.png": 64,
        "icon_128x128.png": 128,
        "icon_128x128@2x.png": 256,
        "icon_256x256.png": 256,
        "icon_256x256@2x.png": 512,
        "icon_512x512.png": 512,
        "icon_512x512@2x.png": 1024,
    }
    
    for filename, size in mac_sizes.items():
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(os.path.join(iconset_dir, filename))
        
    print("Generated macOS iconset in Baku.iconset directory.")

if __name__ == "__main__":
    generate_icons("LogoBaku.png")
