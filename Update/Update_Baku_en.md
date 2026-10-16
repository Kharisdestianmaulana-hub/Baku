<div align="center">
  <p>
    <strong>Roadmap Languages / Bahasa Peta Jalan:</strong><br />
    <strong>English</strong> |
    <a href="Update_Baku_id.md">Bahasa Indonesia</a> |
    <a href="Update_Baku_es.md">Español</a> |
    <a href="Update_Baku_fr.md">Français</a> |
    <a href="Update_Baku_de.md">Deutsch</a> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <a href="Update_Baku_pt.md">Português</a> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../README.md">Back to Main README</a></p>
  <hr />
</div>

# Baku PDF Update Roadmap (Versions v1.1.0 – v1.5.0)

This document provides a comprehensive audit of the baseline features available in **Baku PDF v1.0.0**, followed by the structured technical roadmap of planned enhancements, performance optimizations, and architectural expansions organized by version from **v1.1.0 through v1.5.0**. Each staged release is engineered to be measurable, incrementally tested, and strictly adherent to Baku's founding principles:

Core architectural principles:
- **100% Offline (Local-First)**: Strictly local on-device computation without cloud servers.
- **Absolute Privacy**: Zero telemetry, tracking analytics, or external network transmission.
- **Minimal Resource Footprint**: Instant startup and low memory footprint (~50-80 MB RAM).
- **Minimalist Flat 2D Design**: Distraction-free, purpose-driven desktop user experience.
- **Strict Formatting Compliance**: Adherence to standard academic and formal administrative guidelines.

---

## Table of Contents

1. [Baseline Feature Inventory (v1.0.0 Release Status)](#1-baseline-feature-inventory-v100-release-status)
2. [Release Plan Version 1.1.0 (Multi-Document Tabs & Workflow Efficiency)](#2-release-plan-version-110-multi-document-tabs--workflow-efficiency)
3. [Release Plan Version 1.2.0 (Academic Standards & Scientific Typography)](#3-release-plan-version-120-academic-standards--scientific-typography)
4. [Release Plan Version 1.3.0 (Full Cross-Platform Distribution & Navigation)](#4-release-plan-version-130-full-cross-platform-distribution--navigation)
5. [Release Plan Version 1.4.0 (Offline PDF Utilities & Document Security)](#5-release-plan-version-140-offline-pdf-utilities--document-security)
6. [Release Plan Version 1.5.0 (Milestone Peak & Large-Scale Performance)](#6-release-plan-version-150-milestone-peak--large-scale-performance)
7. [Technical Priority Matrix & Staged Milestone Summary (v1.1.0 – v1.5.0)](#7-technical-priority-matrix--staged-milestone-summary-v110--v150)
8. [Community Contributions & Feature Discussion](#8-community-contributions--feature-discussion)

---

## 1. Baseline Feature Inventory (v1.0.0 Release Status)

Based on a comprehensive codebase audit, the following modules are **fully implemented and production-ready in version 1.0.0**:

| Feature Module | v1.0.0 Status | Implementation Details |
| :--- | :--- | :--- |
| **Interactive Horizontal Ruler** | Production | Top visual metric ruler in centimeters, draggable left/right margin sliders (`ruler-marker-left`, `ruler-marker-right`), dashed snap guidelines, and toolbar/view menu toggles. |
| **8 Built-In Standard Templates** | Production | Includes comprehensive 5-page Thesis/Final Project, Academic Paper, Lab Report, Official Letter, **Job Application Letter**, Meeting Minutes, **ATS Standard Resume**, and Internal Memo. |
| **Custom Template Authoring System** | Production | "Save As Template..." action (`#action-save-as-template`), "Create New Template" (`#btn-create-new-template`), editor authoring mode banner, and "My Custom Templates" gallery filter. |
| **Page Numbering & Section Breaks** | Production | Numbering configuration modal (`#modal-page-number`) supporting Arabic (`1, 2, 3`), lowercase Roman (`i, ii, iii`), uppercase Roman (`I, II, III`), custom prefix/suffix, and section breaks. |
| **Different First Page Header & Footer** | Production | *Different First Page* toggle (`diffFirst`) in Header/Footer editor to isolate cover/title pages from running headers. |
| **Dedicated Link Insertion Modal** | Production | Dedicated Flat 2D modal (`#modal-link-overlay`) with Display Text, Target URL, Unlink button, `Ctrl+K` / `Cmd+K` shortcut, and `Ctrl/Cmd + Click` external browser launch. |
| **Precise Zoom & Scaling Controls** | Production | Zoom In, Zoom Out, Reset 100%, status bar slider, and application UI scale settings. |
| **4 Standalone Offline PDF Tools** | Production | Merge PDF, Split PDF, Rotate PDF, and Images to PDF powered by Rust `lopdf` and `image` crates. |
| **macOS Universal Binary DMG Bundle** | Production | Official Universal DMG (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) installer (`Baku_1.0.0_Universal_Installer.dmg` / `Baku_1.0.0_Installer.dmg`) with drag-and-drop backdrop and read-only volume protection (`check_running_from_dmg`). |

These baseline features form the stable core of version 1.0.0 and serve as the foundation for the staged milestone releases detailed below.

---

## 2. Release Plan Version 1.1.0 (Multi-Document Tabs & Workflow Efficiency)

The **v1.1.0** milestone is dedicated to parallel document editing and high-efficiency offline PDF file compression:

### 2.1. Multi-Document Tab Bar
- **Purpose & Workflow Benefits**:
  - Eliminates the need to switch between OS windows (Alt+Tab / Cmd+`) when cross-referencing multiple files (e.g., Chapter draft, advisor revision notes, formatting guidelines).
  - Enables opening, editing, and managing multiple `.baku` documents concurrently within a unified desktop window.
- **Ergonomic Positioning**:
  - Located directly **below the Ribbon Toolbar and immediately above the Editor Canvas and Ruler**.
  - Follows natural top-to-bottom user hierarchy: Formatting Tools -> Document Context Tabs -> Document Content Canvas.
  - Utilizes 100% horizontal application width without crowding the bottom status bar (which hosts page count, word count, language, and zoom controls).
- **Visual Design & Flat 2D Styling**:
  - Compact slim tab bar (30–32 px height) maximizing vertical writing space.
  - **Active Tab**: Clean white background (`#FFFFFF`) blending seamlessly with the ruler and sheet, accented with a 2px top blue stripe (`#2563EB`), bold text, close button `x`, and unsaved indicator.
  - **Inactive Tab**: Neutral light gray (`#F3F2F1`) with subtle borders and smooth hover transitions.
  - Fixed maximum tab width with ellipsis truncation (`text-overflow: ellipsis`) for long filenames.
  - Quick action plus button `+` to create a new blank document or open an existing file.
- **Horizontal Scroll Navigation**:
  - **Proportional Layout**: Up to 5 opened documents display side-by-side proportionally.
  - **Adaptive Smooth Scrolling (> 5 Documents)**: Overflowing tab lists can be scrolled horizontally via trackpad or mouse wheel.
  - **Navigation Chevrons**: Left `<` and right `>` navigation buttons automatically appear upon overflow for mouse-driven traversal.
- **State Isolation & Data Safety (Session Persistence)**:
  - **Per-Document Delta Isolation**: Each tab maintains independent Delta JSON structures, scroll positions, and cursor selections.
  - **Isolated Undo/Redo Stacks**: Independent undo history (`Ctrl/Cmd+Z`) and redo (`Ctrl+Y` / `Cmd+Shift+Z`) per document.
  - **Unsaved Indicator (*Unsaved Dot*)**: A blue accent dot or asterisk `*` indicates modified, unsaved content.
  - **Safe Close Confirmation**: Closing an unsaved tab triggers an immediate confirmation modal preventing data loss.
- **Memory Efficiency (Local-First RAM Optimization)**:
  - Background tab virtualization: Inactive tabs remain lightweight Delta objects in RAM without mounting DOM tree elements.
  - Only the active document attaches to the Quill editor canvas, maintaining ~50-80 MB RAM usage with zero input lag.
- **Keyboard Shortcuts**:
  - `Ctrl+Tab` / `Cmd+Option+Right`: Switch to next tab.
  - `Ctrl+Shift+Tab` / `Cmd+Option+Left`: Switch to previous tab.
  - `Ctrl+W` / `Cmd+W`: Close current tab with dirty state confirmation.

### 2.2. Offline PDF File Compressor
- Local PDF size reduction powered by Rust without compromising typography or vector sharpness.
- Instant target presets:
  - **Under 500 KB**: Civil service, corporate, and scholarship portal upload compliance.
  - **Under 1 MB**: University academic portals and repository requirements.
  - **Under 2 MB**: General publication standard.
  - **Custom Target**: Manual image DPI downsampling selection (150 DPI, 96 DPI, 72 DPI).
- Visual before-and-after size estimation before saving.

---

## 3. Release Plan Version 1.2.0 (Academic Standards & Scientific Typography)

The **v1.2.0** milestone focuses on strict academic formatting compliance, mathematical typography, and structured document elements:

### 3.1. Automated Dual-Positioning Academic Page Numbering Rules
- Automated page number positioning compliant with academic thesis guidelines:
  - First page of every new Chapter (carrying chapter title) automatically displays page numbers at **bottom-center**.
  - Subsequent continuation pages within that chapter automatically switch to **top-right**.
- Isolated section restarts (*Restart Numbering per Section*) without breaking preceding pagination sequences.

### 3.2. Offline Mathematical Formula Notation (KaTeX)
- Fully offline bundled KaTeX formula engine.
- Interactive mathematical block insertion (`Inline Math` and `Block Equation`).
- Chapter-based formula numbering at the right margin: `(1.1)`, `(1.2)`, etc.
- Support for calculus, linear algebra, matrices, and standard scientific symbols.

### 3.3. Advanced Scientific Tables (Booktabs Style)
- Horizontal (*Merge Columns*) and vertical (*Merge Rows*) cell merging.
- Publication-grade *Booktabs Style* borders: clean tables without vertical rules (thick top rule, thin header rule, thick bottom rule).
- Decimal alignment for numeric data columns.
- Automatic header repetition across page splits (*Repeat Header Row across Pages*).
- Automatic table caption numbering: `Table 1.1: Caption`.

### 3.4. Vertical Ruler & Advanced Paragraph Indentation
- Interactive horizontal ruler expansion:
  - **First Line Indent Slider**: Sets paragraph opening indentation (e.g., 1 cm or 1.27 cm).
  - **Hanging Indent Slider**: Sets continuation margins for reference bibliographies (APA/IEEE standard).
- **Vertical Ruler** on the left margin:
  - Visual measurement of actual page height (cm).
  - Draggable markers for top and bottom page margins.

### 3.5. Offline Spellcheck & Language Guide
- Integrated offline dictionary for typographical verification.
- Soft underline indicators for unrecognized words.
- Contextual right-click spelling suggestions for standardized vocabulary.
- Phonology-based automatic hyphenation for justified text to prevent uneven word spacing.

### 3.6. Automated Academic Document Structure
- **Dynamic Table of Contents (Auto TOC)**: Instant TOC generation from heading hierarchy with automatic dot leaders and single-click update.
- **Dynamic List of Tables & Figures**: Automated tracking of figure and table captions synchronized in real time with page numbers.
- **Offline Citation & Bibliography Manager**: Manual citation entry or BibTeX (`.bib`) / RIS import supporting APA 7th, IEEE, Harvard, and Vancouver formats.

---

## 4. Release Plan Version 1.3.0 (Full Cross-Platform Distribution & Navigation)

The **v1.3.0** milestone expands native installation packages to Windows and Linux ecosystems alongside document outline navigation:

### 4.1. Windows Operating System Distribution
- **Guided NSIS Installer (`.exe`)**:
  - 64-bit (`x64`) and ARM64 packages for Windows 10 and Windows 11.
  - Start Menu shortcuts, Desktop icons, and `.baku` file association registration.
  - Clean uninstaller without residual registry clutter.
- **Standalone Portable Edition (`Baku_Portable.exe`)**:
  - Zero-installation executable suitable for university computer labs and restricted environments.
- **Microsoft Package Manager (`winget`)**:
  - Official manifest submission:
    ```cmd
    winget install Baku.BakuPDF
    ```

### 4.2. Linux Operating System Distribution
- **Universal `AppImage` Package**:
  - Single standalone binary running across Ubuntu, Fedora, Arch Linux, Debian, and openSUSE.
- **Native Debian / Ubuntu Package (`.deb`)**:
  - Bundled with complete `webkit2gtk-4.1` dependency declarations.
- **Flathub & Arch User Repository (AUR)**:
  - Sandboxed Flatpak manifest and `baku-bin` package on AUR.

### 4.3. Advanced macOS Distribution
- **Homebrew Cask Support**:
  - Terminal-based installation:
    ```bash
    brew install --cask baku-pdf
    ```
- **Apple Developer ID Code Signing & Notarization**:
  - Official Apple notarization allowing frictionless launch without Gatekeeper warnings.

### 4.4. Document Navigation Sidebar
- Collapsible left-hand navigation panel:
  - **Headings Outline Tab**: Interactive heading tree (Chapters and Subsections) with instant scrolling.
  - **Page Thumbnails Tab**: Scaled vertical miniature previews of every page.
  - **Search Results Tab**: Real-time keyword occurrence list with jump-to-result capability.

---

## 5. Release Plan Version 1.4.0 (Offline PDF Utilities & Document Security)

The **v1.4.0** milestone introduces advanced standalone PDF tools and privacy sanitization:

### 5.1. Offline Digital Signature & Stamp
- Direct stylus/mouse signing or transparent PNG signature import.
- Drag-and-drop placement on any page with visual preview.
- Batch coordinate signing across multi-page documents.
- Offline date stamp and initial approval markers.

### 5.2. Document Metadata Sanitizer
- Cleans hidden metadata before publishing or submitting PDF documents:
  - Strips author names, computer hardware identifiers, and local directory paths.
  - Removes hidden revision timestamps.
- Essential for academic double-blind peer review (*Blind Review*) and confidential filings.

### 5.3. Visual Page Organizer & Reorder
- Visual thumbnail grid for all PDF pages.
- Drag-and-drop page reordering.
- Quick single-click page deletion or range removal.
- Blank page insertion and inter-PDF page merging.

### 5.4. Offline PDF Watermark Tool
- Diagonal (45-degree) or horizontal textual watermark stamping.
- Built-in presets: `DRAFT`, `CONFIDENTIAL`, `OFFICIAL COPY`, `RESTRICTED`, `SAMPLE`.
- Customizable opacity, font size, color, and target page ranges.

### 5.5. PDF Password Protection & Encryption
- Industry-standard offline AES-256 User Password encryption.
- Owner/Permissions Password to restrict printing, text extraction, and annotations.
- Decryption tool for authorized password holders.

### 5.6. External PDF Page Numbering (Bates Numbering)
- Stamping page numbers onto third-party PDF files.
- Configurable placement: top-right, bottom-right, or bottom-center.
- Custom prefix/suffix configuration (e.g., `Appendix Page 1 of 10`, `Case No. 1024-B`).

---

## 6. Release Plan Version 1.5.0 (Milestone Peak & Large-Scale Performance)

The **v1.5.0** milestone marks the peak evolution of the Baku PDF ecosystem, introducing massive document virtualization, template packages, and seamless interoperability:

### 6.1. Standalone Portable Template Packages (.bakutpl)
- Export custom templates into portable `.bakutpl` bundles.
- Import `.bakutpl` packages from external machines directly into the local template gallery.

### 6.2. Expanded Standard Document Templates Collection
- **Scholarly & Journal Publication Templates**:
  - Two-column SINTA academic journal format (bilingual abstract, IMRAD structure).
  - IEEE standard conference paper format.
- **Academic Grant & Administration Templates**:
  - Student creativity research proposals (PKM).
  - Industrial internship reporting framework.
  - Postgraduate thesis and dissertation proposals.
- **Governmental & Institutional Correspondence**:
  - Official assignment directives and service memos.
  - Official decrees and executive orders.
  - Handover certification records (BAST).

### 6.3. Infinite Virtual DOM Page Rendering (500+ Pages)
- Viewport-only page element mounting with 1-2 page pre-buffers.
- Effortlessly handles 500+ page manuscripts (textbooks, dissertations) without memory spikes.
- Typing latency maintained strictly under 8 milliseconds regardless of document length.

### 6.4. Pure Native Rust PDF Exporter Engine
- Transition to pure Rust native PDF generation (`printpdf` and `lopdf`) alongside WebView printing.
- Produces clean vector text (fully selectable and searchable) with up to 60% smaller file size.
- Automatic font subsetting embedding only glyphs in use.

### 6.5. Adaptive Dark and Light Themes
- True Dark Theme engineered with high contrast meeting WCAG AAA accessibility standards.
- Dark mode paper representation: *Light Sheet in Dark Room* or *Inverted Dark Sheet*.
- Seamless automatic synchronization with OS theme settings.

### 6.6. Distraction-Free Mode (Zen Mode) & Two-Page Spread Layout
- **Zen Mode**: Hides ribbons and sidebars (`F11` / `Cmd+Shift+F`), leaving only the centered page.
- **Two-Page Spread View**: Displays two consecutive pages side-by-side on widescreen displays.
- **Advanced Fit Options**: *Fit to Width* and *Fit to Page*.

### 6.7. Offline Word (.docx) Import, Conversion & Standard Document Export
- Local pure Rust `.docx` parser preserving text styles, tables, and lists.
- Export back to Microsoft Word (`.docx`), plain text (`.txt`), and scientific Markdown (`.md`).

### 6.8. Enhanced .baku File Specification (v2.0)
- Compressed binary attachments within `.baku` JSON structures for high-resolution graphics.
- Embedded bibliographies and per-section numbering data.
- Full backward compatibility with v1.0.0 documents.

### 6.9. Periodic Auto-Save & Crash Auto-Recovery
- Automatic background saving every 60 seconds to sandboxed storage.
- Auto-recovery prompt on startup following system interruption or unexpected power loss.
- Local revision snapshot history across 15, 30, and 60-minute intervals.

---

## 7. Technical Priority Matrix & Staged Milestone Summary (v1.1.0 – v1.5.0)

To deliver new features swiftly, predictably, and with uncompromised stability, development is structured across five sequential milestones:

### 7.1. Staged Milestone Roadmap

| Version | Core Focus | Included Feature Modules | Target Schedule |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Document Tabs & Workflow Efficiency | Multi-Document Tab Bar (Section 2.1) and Offline PDF Compressor (Section 2.2). | Immediate Next Release |
| **v1.2.0** | Academic Standards & Scientific Typography | Dual-Positioning Academic Page Numbers (Section 3.1), KaTeX Notation (Section 3.2), Booktabs Tables (Section 3.3), Vertical Ruler (Section 3.4), Spellcheck (Section 3.5), and Structure Tools (Section 3.6). | Milestone Phase 2 |
| **v1.3.0** | Full Cross-Platform Distribution | Windows NSIS (`.exe`) & Portable (Section 4.1), Linux AppImage & Debian `.deb` (Section 4.2), macOS Distribution (Section 4.3), and Navigation Sidebar (Section 4.4). | Milestone Phase 3 |
| **v1.4.0** | Offline PDF Utilities & Security | Digital Signatures (Section 5.1), Metadata Sanitizer (Section 5.2), Page Organizer (Section 5.3), Watermark Tool (Section 5.4), Password Encryption (Section 5.5), and Bates Numbering (Section 5.6). | Milestone Phase 4 |
| **v1.5.0** | Milestone Peak & Ecosystem Expansion | Portable Template Packages `.bakutpl` (Section 6.1), Additional Templates (Section 6.2), Virtual DOM 500+ Pages (Section 6.3), Rust PDF Engine (Section 6.4), Dark Mode (Section 6.5), Zen Mode (Section 6.6), Word `.docx` Import (Section 6.7), `.baku` v2.0 (Section 6.8), and Auto-Recovery (Section 6.9). | Milestone Peak |

### 7.2. Technical Development Priority Matrix

| Feature Module | Target Component | Target Version | Priority | Estimated Complexity |
| :--- | :--- | :--- | :--- | :--- |
| Multi-Document Tab Bar | Frontend Editor & State Engine | v1.1.0 | Highest | Medium |
| Offline PDF File Compressor | Rust Backend (`lopdf` / `image`) | v1.1.0 | Highest | Medium |
| Dual-Positioning Academic Page Numbers | Frontend Sheet Engine | v1.2.0 | High | Medium |
| Offline KaTeX Formula Notation | Frontend Parser Engine | v1.2.0 | High | Low |
| Vertical Ruler & Paragraph Indentation | Frontend Ruler Engine | v1.2.0 | Medium | Medium |
| Advanced Scientific Tables (Booktabs) | Frontend Sheet Engine | v1.2.0 | Medium | Medium |
| Windows (.exe) & Linux (AppImage) Installers | Tauri Bundler & CI Workflow | v1.3.0 | Highest | Medium |
| Document Outline & Thumbnails Sidebar | Frontend UI & DOM Virtualizer | v1.3.0 | High | Medium |
| Offline Digital Signatures & Stamps | Rust Backend & Canvas Overlay | v1.4.0 | Medium | Medium |
| Document Metadata Sanitizer (Blind Review) | Rust Backend & PDF Pipeline | v1.4.0 | Medium | Low |
| Visual Page Organizer & Reorder | Frontend UI & Rust Backend | v1.4.0 | Medium | Medium |
| Full Adaptive Dark / Light Mode | CSS Theme Engine | v1.5.0 | Medium | Low |
| Portable Template Packages (.bakutpl) | Frontend Data Store & JSON | v1.5.0 | Medium | Low |
| Infinite Virtual DOM Page Rendering (500+ Pages) | Frontend DOM Virtualizer | v1.5.0 | High | High |
| Offline Word (.docx) Import & Parser | Rust DOCX Parser | v1.5.0 / Later | Future | High |

---

## 8. Community Contributions & Feature Discussion

This roadmap is open to community collaboration and technical feedback:
- Propose feature enhancements: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Report technical issues: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Read contribution guidelines: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Inspect technical architecture: [ARCHITECTURE.md](../ARCHITECTURE.md)
