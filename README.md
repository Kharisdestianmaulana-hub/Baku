<div align="center">
  <p>
    <strong>Languages / Bahasa:</strong><br />
    <strong>English</strong> |
    <a href="README_ID.md">Bahasa Indonesia</a> |
    <a href="readme/README_ES.md">Español</a> |
    <a href="readme/README_FR.md">Français</a> |
    <a href="readme/README_DE.md">Deutsch</a> |
    <a href="readme/README_JA.md">日本語</a> |
    <a href="readme/README_ZH.md">简体中文</a> |
    <a href="readme/README_PT.md">Português</a> |
    <a href="readme/README_RU.md">Русский</a> |
    <a href="readme/README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Lightweight, Local-First Standardized Desktop Word Processor for Academic, Official, and Formal Documents</strong></p>

  <p>
    <a href="https://tauri.app"><img src="https://img.shields.io/badge/Tauri-v1.6-24C8D8?style=flat&logo=tauri&logoColor=white" alt="Tauri" /></a>
    <a href="https://www.rust-lang.org"><img src="https://img.shields.io/badge/Rust-2021%20Edition-DEA584?style=flat&logo=rust&logoColor=white" alt="Rust" /></a>
    <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-F7DF1E?style=flat" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-4F83CC?style=flat" alt="Cross Platform" />
    <img src="https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Local--First-10B981?style=flat" alt="Local First" />
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat" alt="License" /></a>
  </p>
</div>

---

## Table of Contents
- [About Baku PDF](#about-baku-pdf)
- [Key Features](#key-features)
- [Offline PDF Extra Tools (100% Local)](#offline-pdf-extra-tools-100-local)
- [Built-In Standard Templates](#built-in-standard-templates)
- [Upcoming Release Roadmap (v1.5 & Beyond)](#upcoming-release-roadmap-v15--beyond)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [System Requirements & Installation](#system-requirements--installation)
- [Complete Documentation](#complete-documentation)
- [License](#license)

---

## About Baku PDF

Baku PDF is a modern desktop word processor engineered specifically for drafting structured academic papers, undergraduate theses, and official correspondences adhering to strict formatting standards. Rooted in a **local-first** philosophy, all text processing, document rendering, and PDF manipulation take place 100% offline on your device, free from external servers, tracking analytics, and cloud subscriptions.

Powered by **Tauri** and **Rust** with a pure vanilla web frontend, Baku PDF is exceptionally lightweight (low memory footprint of ~50-80 MB RAM), launches instantaneously, and eliminates the layout sluggishness commonly found in Electron-based editors.

---

## Key Features

1. **Word-Style Home Screen Quick Launcher**:
   - Start with a clean Blank Document.
   - Open existing native `.baku` documents directly.
   - Microsoft Word-style miniature paper template cards (Thesis, Official Letter, Academic Paper) featuring layout lines and standard badges.
   - Direct shortcut to the full template gallery and recently opened document history.

2. **Standard Templates Gallery & Custom Template Creator**:
   - Ready-to-use strict standard templates for theses, research papers, official letters, lab reports, meeting minutes, and ATS resumes.
   - Category filtering (Academic, Letters & Official, Business & Office, My Templates) and real-time search.
   - Split-view preview dialog showcasing paper thumbnail dimensions in portrait or landscape.
   - Build new templates from scratch (*Create New Template*) or save the active editor document as a reusable template (*Save As Template*).
   - Strict standard format lock (*Strict Standard Lock*) to prevent accidental margin and paper size modifications.
   - Export and import standalone `.baku` template files.

3. **Smart Multi-Page & Multi-Section Engine**:
   - Instant 60 FPS Page Breaks (Ctrl/Cmd + Enter) engineered without layout thrashing bottlenecks.
   - High-performance Section Breaks (Ctrl/Cmd + Shift + Enter) allowing independent numbering restarts and varying formatting between chapters.
   - Comprehensive numbering formats: Arabic numerals (1, 2, 3), Lowercase Roman (i, ii, iii), Uppercase Roman (I, II, III), and Alphabetical (A, B, C / a, b, c).
   - Flexible page number positioning: Header or Footer, aligned left, center, or right.
   - Different First Page toggle to suppress numbers on formal title and cover pages.

4. **Interactive Visual Ruler**:
   - Millimeter, centimeter, and inch horizontal ruler with dynamic margin overlays.
   - Three draggable visual markers: First Line Indent, Left Indent, and Right Margin.
   - Synchronized in real time with the active cursor and paragraph.

5. **Typography Styles Gallery & Precision Layout**:
   - Standard style presets: Normal, Document Title, Subtitle, Chapter / Heading 1, Sub-heading / Heading 2, Sub-sub-heading / Heading 3, Blockquote, and Monospace / Code.
   - Font size combobox (8pt to 72pt), line height dropdown (1.0, 1.15, 1.5, 2.0, custom), and color pickers.
   - Academic margin standards (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal, custom) and paper presets (A4, F4/Folio 215x330mm, Letter, Legal).

6. **Integrated Document Utilities**:
   - **Change Case**: Sentence case, lowercase, UPPERCASE, Capitalize Each Word, and tOGGLE cASE.
   - **Real-Time Document Statistics**: Live count of words, characters (with and without spaces), paragraphs, and estimated reading time.
   - **Custom Table Editor**: Interactive table grid creator with a floating toolbar for adding/removing rows and columns and cell alignment.
   - **Image Handling**: Local image insertion, alignment (left, center, right), proportional resizing, and deletion dialog.
   - **Special Characters & Typographic Symbols**: Integrated symbol picker modal.

7. **WYSIWYG PDF Export & Native Printing**:
   - Pixel-perfect PDF generation matching on-screen canvas margins and page boundaries.
   - Direct system print dialog integrated with local printers and copy quantity controls.

---

## Offline PDF Extra Tools (100% Local)

Baku PDF includes standalone PDF utility tools running entirely on your machine without cloud dependencies:
- **Merge PDF**: Combine two or more PDF files into a single unified document with custom sequencing.
- **Split PDF**: Extract specific page ranges (e.g., 1-3, 5, 8-10) or separate every page into individual files.
- **Rotate PDF**: Correct skewed or inverted pages (rotate 90, 180, or 270 degrees clockwise).
- **Images to PDF**: Convert scanned documents and image collections (JPG, PNG) into a clean PDF document.

---

## Built-In Standard Templates

| Template Name | Category | Standard Margins | Standard Typography | Description |
|---|---|---|---|---|
| Undergraduate Thesis | Academic | 4-4-3-3 cm | Times New Roman, 12pt, 1.5 Line Spacing | Official university thesis structure (Cover, Approval Sheet, Bilingual Abstract, Chapter I, References). |
| Academic Paper | Academic | 4-3-4-3 cm | Times New Roman, 12pt, 1.5 Line Spacing | Standard research paper format for seminars and journals. |
| Lab Report | Academic | 4-3-3-3 cm | Calibri, 11pt, 1.15 Line Spacing | Laboratory experiment framework with objectives, materials, and data tables. |
| Official Letter | Letter & Official | 3-2.5-3-2.5 cm | Arial / Calibri, 11pt, 1.15 Line Spacing | Standard administrative letter format (Header, letter number, subject, signature block). |
| Job Application Letter | Letter & Official | 2.5 cm equal | Calibri, 11pt, 1.15 Line Spacing | Formal HR application letter layout. |
| Meeting Minutes | Business & Office | 2.5 cm equal | Segoe UI / Arial, 11pt, 1.15 Line Spacing | Professional minutes format with agenda, attendance list, and follow-up matrix. |
| ATS Standard Resume | Business & Office | 2 cm equal | Calibri / Arial, 10.5pt, 1.15 Line Spacing | Single-column curriculum vitae structure optimized for automated ATS parsers. |
| Internal Memo | Business & Office | 2.5 cm equal | Arial, 11pt, 1.15 Line Spacing | Compact internal company memorandum format. |

---

## Upcoming Release Roadmap (v1.5 & Beyond)

We maintain a transparent, community-driven development roadmap detailing upcoming features, technical expansions, and platform releases for version 1.5 and future milestones:

- **Multi-Document Tab Bar**: Open, edit, and switch between multiple `.baku` documents in one window with isolated state and smooth horizontal scrolling.
- **Offline PDF Compressor**: Preset targets (<500 KB, <1 MB, <2 MB) and customizable image DPI downsampling without server uploads.
- **Cross-Platform Installers**: Windows NSIS installer (`.exe`), standalone portable edition, and Linux universal `AppImage` / Debian `.deb`.
- **Dual-Positioning Academic Page Numbers**: Automatic chapter opening page numbers at bottom-center and continuing pages at top-right.
- **Offline Scientific Tools**: KaTeX offline formulas, advanced booktabs tables, visual page organizer, and digital signatures.

### Future Release Documentation by Language

All upcoming feature plans, technical roadmaps, and version updates are maintained across dedicated language files in the [`Update/`](Update/) directory:

| Language | Document Link | Description / Scope |
| :--- | :--- | :--- |
| **English** | [Update_Baku_en.md](Update/Update_Baku_en.md) | Official English release roadmap and feature specifications. |
| **Bahasa Indonesia** | [Update_Baku_id.md](Update/Update_Baku_id.md) | Rencana pembaruan resmi dan spesifikasi fitur Bahasa Indonesia. |
| **Español** | [Update_Baku_es.md](Update/Update_Baku_es.md) | Hoja de ruta oficial y especificaciones de funciones en español. |
| **Français** | [Update_Baku_fr.md](Update/Update_Baku_fr.md) | Feuille de route officielle et spécifications des fonctionnalités en français. |
| **Deutsch** | [Update_Baku_de.md](Update/Update_Baku_de.md) | Offizielle Roadmap und Funktionsspezifikationen auf Deutsch. |
| **日本語** | [Update_Baku_ja.md](Update/Update_Baku_ja.md) | 日本語公式リリースロードマップおよび機能仕様書。 |
| **简体中文** | [Update_Baku_zh.md](Update/Update_Baku_zh.md) | 官方简体中文版本路线图及规划功能规范。 |
| **Português** | [Update_Baku_pt.md](Update/Update_Baku_pt.md) | Roteiro oficial de lançamentos e especificações em português. |
| **Русский** | [Update_Baku_ru.md](Update/Update_Baku_ru.md) | Официальный план развития и спецификации функций на русском языке. |
| **العربية** | [Update_Baku_ar.md](Update/Update_Baku_ar.md) | خارطة طريق الإصدارات الرسمية والمواصفات باللغة العربية. |

---

## Architecture & Tech Stack

- **Backend**: Rust 2021 with Tauri Framework v1.6.
- **I/O & PDF Pipeline**: `lopdf` v0.31 for low-level PDF manipulation (merge, split, rotate) and `printpdf` v0.7 for standalone canvas compilation.
- **Frontend**: HTML5, pure CSS3, and Vanilla JavaScript ES6+ (zero runtime UI frameworks).
- **Editor Engine**: Quill.js 2.0 (Custom Build with multi-page & multi-section blot extensions).
- **Storage Architecture**: Encapsulated `.baku` JSON format with atomic write operations to prevent corruption.
- **Graphics Acceleration**: Composite `#page-sheets-layer` rendered as independent GPU-cached tiles.

---

## System Requirements & Installation

### Prerequisites
- Node.js (version 16 or newer)
- Rust & Cargo (latest stable toolchain)
- Platform-specific Tauri build tools (macOS, Windows, or Linux)

### Running the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run tauri dev
   ```

4. Build release binary:
   ```bash
   npm run tauri build
   ```

---

## Complete Documentation

We provide comprehensive technical documentation and community guidelines to support open-source collaboration and transparency:

| Document | Description |
| :--- | :--- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines, Git workflow, and code standards. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical specifications, Tauri IPC flow, and `.baku` format. |
| [CHANGELOG.md](CHANGELOG.md) | Version release notes and update history. |
| [SECURITY.md](SECURITY.md) | Security policy and vulnerability reporting. |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community standards and contributor code of conduct. |
| [Update Roadmap (v1.5+)](Update/Update_Baku_en.md) | Multi-language roadmap and planned feature specifications for future versions. |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
