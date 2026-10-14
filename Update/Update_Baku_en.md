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

# Baku PDF Version 1.5 Roadmap & Upcoming Features

This document outlines the current feature baseline of **Baku PDF v1.0.0** alongside planned features, performance enhancements, and module expansions scheduled for the **Baku PDF v1.5** release. This update focuses on enhancing advanced academic writing workflows, introducing advanced offline PDF manipulation utilities, delivering full multi-platform distribution (Windows, macOS, Linux), and optimizing rendering throughput for large documents.

Core development principles of Baku PDF remain strictly preserved:
- **100% Offline (Offline-First)**: All processing executes locally on the user machine without cloud servers.
- **Absolute Privacy**: Zero telemetry, tracking analytics, or outbound network transmissions.
- **Minimal Resource Footprint**: Rapid launch and conservative RAM footprint (~50-80 MB).
- **Minimalist 2D Flat Design**: Clean, functional, and distraction-free interface.
- **Standardized Formatting**: Adherence to strict scientific and formal administrative styling guidelines.

---

## Table of Contents

1. [Baseline Available Features (v1.0.0 Status)](#1-baseline-available-features-v100-status)
2. [Advanced Scientific Typography & Document Editor](#2-advanced-scientific-typography--document-editor)
3. [Automated Academic Document Structure](#3-automated-academic-document-structure)
4. [Expanded Offline PDF Extra Tools](#4-expanded-offline-pdf-extra-tools)
5. [Extended Standard Templates Collection](#5-extended-standard-templates-collection)
6. [Multi-Platform Support & Binary Packaging](#6-multi-platform-support--binary-packaging)
7. [Core Architecture, Performance & Heavy Document Handling](#7-core-architecture-performance--heavy-document-handling)
8. [User Interface, Navigation & Accessibility](#8-user-interface-navigation--accessibility)
9. [Format Interoperability & File Compatibility](#9-format-interoperability--file-compatibility)
10. [Document Security & Metadata Sanitization](#10-document-security--metadata-sanitization)
11. [Version 1.5 Development Priority Matrix](#11-version-15-development-priority-matrix)

---

## 1. Baseline Available Features (v1.0.0 Status)

Following a comprehensive audit of the Baku PDF codebase, the following modules **have been fully implemented in version 1.0.0**:

| Feature Module | v1.0.0 Status | Implementation Details |
| :--- | :--- | :--- |
| **Interactive Horizontal Ruler** | Implemented | Top visual centimeter ruler with margin sliders (`ruler-marker-left`, `ruler-marker-right`), dashed snap guidelines, and toggle controls in both ribbon and View menu. |
| **8 Built-In Standard Templates** | Implemented | Full 5-page Thesis/Final Project, Academic Paper, Lab Report, Official Service Letter, **Job Application Letter**, Meeting Minutes, **ATS Resume / CV**, and Internal Memo. |
| **Custom Template Authoring System** | Implemented | Save as Template (`#action-save-as-template`), Create New Template (`#btn-create-new-template`), editor authoring mode banner, and My Custom Templates filter in Gallery. |
| **Page Numbering & Section Breaks** | Implemented | Page number configuration modal (`#modal-page-number`) supporting Arabic (`1, 2, 3`), lowercase Roman (`i, ii, iii`), uppercase Roman (`I, II, III`), prefix/suffix options, and Section Break insertion. |
| **Different First Page Header/Footer** | Implemented | Different First Page toggle (`diffFirst`) in Header/Footer editor to isolate or omit running heads on title pages. |
| **Standalone Hyperlink Modal** | Implemented | 2D Flat modal (`#modal-link-overlay`) with Display Text, URL field, Remove Link action, `Ctrl+K` / `Cmd+K` shortcut, and `Ctrl/Cmd + Click` external link opening. |
| **Zoom & Scaling Controls** | Implemented | Zoom In, Zoom Out, Reset 100%, bottom status bar percentage slider, and application UI scale settings in Preferences. |
| **4 Offline PDF Extra Tools** | Implemented | Merge PDF, Split PDF, Rotate PDF, and Images to PDF powered by Rust libraries `lopdf` and `image`. |
| **macOS Universal DMG Installer** | Implemented | Official Universal Binary DMG (`x86_64` Intel + `arm64` Apple Silicon M1-M4) package (`Baku_1.0.0_Universal_Installer.dmg` / `Baku_1.0.0_Installer.dmg`) featuring drag-and-drop installer background and temporary DMG volume execution guard (`check_running_from_dmg`). |

These modules serve as the stable foundation of version 1.0.0 and provide the integration baseline for the upcoming version 1.5 enhancements below.

---

## 2. Advanced Scientific Typography & Document Editor

### 2.1. Offline KaTeX Mathematical Notation & Equations
- Integrated KaTeX formula parser bundled 100% offline within the application package.
- Interactive mathematical equation insertion for both inline math and centered block equations.
- Automatic equation numbering aligned to the right page margin indexed by chapter: `(1.1)`, `(1.2)`, etc.
- Support for calculus notation, matrices, linear algebra symbols, and standard physics/chemistry expressions.

### 2.2. Interactive Ruler Expansion: Indentations & Vertical Ruler
- Enhanced horizontal ruler markers:
  - **First Line Indent Marker**: Configures paragraph indentation (e.g., 1 cm or 1.27 cm / 0.5 in).
  - **Hanging Indent Marker**: Configures subsequent line indentation (standard for APA, IEEE, and Chicago bibliography formats).
- **Vertical Ruler** on the left canvas boundary:
  - Measures real page height in centimeters.
  - Visual draggable markers to adjust top and bottom margins directly on the interactive canvas.

### 2.3. Advanced Scientific Tables
- Horizontal cell merging (Merge Columns) and vertical cell merging (Merge Rows).
- Scientific publication border styling (Booktabs Style): clean tables without vertical gridlines (thick top line, thin header separator, thick bottom closing line).
- Decimal alignment for numeric data columns.
- Automatic table header repetition across multi-page breaks (Repeat Header Row across Pages).
- Automatic table caption numbering: `Table 1.1: Caption Text`.

### 2.4. Offline Spell Checker & Indonesian PUEBI/KBBI Hyphenation
- Integrated offline dictionary for typographic error detection.
- Subtle red underline marker for unrecognized terms.
- Contextual right-click correction suggestions (e.g., *analisa* -> *analisis*, *praktek* -> *praktik*).
- Automatic Indonesian phonological hyphenation for justified text, preventing irregular word spacing.

---

## 3. Automated Academic Document Structure

### 3.1. Dual-Positioning Academic Thesis Page Numbering Rules
- Automation of standard Indonesian and international thesis page numbering rules:
  - First page of every new chapter (containing the chapter title) automatically displays the page number at the **bottom-center**.
  - Subsequent continuation pages within that chapter automatically place the page number at the **top-right**.
- Isolated per-section numbering (Restart Numbering per Section) without affecting preceding sections.

### 3.2. Dynamic Auto Table of Contents
- Instant Table of Contents generation based on document heading hierarchy (Heading 1 = Chapter, Heading 2 = Section, Heading 3 = Subsection).
- Automatic dot leaders connecting headings to right-aligned page numbers.
- One-click update button (Update Entire Table) upon page shifts or heading revisions.

### 3.3. Dynamic List of Figures & List of Tables
- Automatic tracking of all table and figure captions across the document.
- Instant generation of List of Figures and List of Tables pages synchronized with real-time page numbers.

### 3.4. Offline Citation & Bibliography Manager
- Manual reference entry or direct import from BibTeX (`.bib`) and RIS files.
- Automated in-text citation formatting:
  - APA 7th Edition: `(Maulana, 2026)`
  - IEEE Style: `[1]`
  - Harvard Style: `(Maulana 2026, p. 45)`
  - Vancouver Style
- Automatic bibliography generation at the document end, alphabetically or numerically sorted with standard hanging indents.

---

## 4. Expanded Offline PDF Extra Tools

Complementing the existing 4 tools (Merge, Split, Rotate, Images to PDF), version 1.5 introduces 6 new offline PDF manipulation utilities:

### 4.1. Offline PDF Compressor
- Local PDF file size reduction utilizing optimized Rust routines without compromising text clarity.
- Instant preset reduction targets:
  - **Under 500 KB**: Standard for civil service (CPNS), state-owned enterprise (BUMN), and scholarship portals.
  - **Under 1 MB**: Standard for academic portals and university thesis repositories.
  - **Under 2 MB**: Standard for general publication submissions.
  - **Custom Target**: Manual image DPI downsampling selection (150 DPI, 96 DPI, 72 DPI).
- Visual file size comparison before and after compression prior to saving.

### 4.2. Offline Digital Signature & Stamp
- Direct signature drawing via mouse cursor/stylus or transparent PNG signature image import.
- Drag-and-drop signature placement with real-time preview on any page.
- Batch coordinate signing across multi-page documents.
- Offline date stamp and initial/paraph stamping.

### 4.3. PDF Password Protection & Encryption
- Document open password protection (User Password) using industry-standard offline AES-256 encryption.
- Permissions password configuration (Owner Password):
  - Restrict document printing.
  - Restrict text copying and content extraction.
  - Restrict annotation modifications.
- Offline password decryption utility for legitimate file owners.

### 4.4. Visual Page Organizer & Reorder
- Visual thumbnail grid interface representing each page of the PDF document.
- Drag-and-drop page reordering.
- One-click deletion of single pages or selected page ranges.
- Blank page insertion and external PDF page splicing at target positions.

### 4.5. External PDF Bates Numbering & Page Stamper
- Page numbering for external third-party PDF files lacking pagination.
- Configurable placement: top-right, bottom-right, or bottom-center.
- Configurable prefix text (e.g., `Appendix Page 1 of 10`, `Page 1`, or legal Bates stamps).

### 4.6. Offline Watermark Tool
- Diagonal (45-degree angle) or horizontal watermark text application.
- Text presets: `DRAFT`, `OFFICIAL COPY`, `CONFIDENTIAL`, `SAMPLE`, `RESTRICTED`.
- Opacity, font size, color, and target page range selection.

---

## 5. Extended Standard Templates Collection

Expanding upon the 8 templates available in v1.0.0, v1.5 introduces specialized document presets:

### 5.1. Scientific Publications & Journals
- **SINTA Standard Academic Journal (Two-Column Layout)**:
  - Precise two-column body layout with a full-width title header block.
  - Bilingual abstract section (Bahasa Indonesia & English) with keywords.
  - Standard IMRAD structure: Introduction, Methods, Results and Discussion, Conclusion.
- **IEEE Conference Proceedings Paper**:
  - Exact margin dimensions, Times New Roman 10pt/8pt typography, and two-column figure alignment.

### 5.2. Academic Grants & Student Administration
- **PKM Student Creativity Grant Proposal (Kemendikbudristek)**:
  - Structured strictly according to the latest national guidelines: endorsement sheet, standard budget allocation table, and project timeline schedule.
- **Field Internship / Industrial Apprenticeship Report (PKL)**:
  - Weekly activity logbook, host institution profile, and evaluation reporting structure.
- **Postgraduate Master Thesis & Doctoral Dissertation Proposal**:
  - Rigorous scientific methodology framework, conceptual theoretical foundation, and research hypothesis sections.

### 5.3. Government & Corporate Administration
- **Official Memo & Assignment Letter (SPT)**:
  - Standard government header format, legal foundation premises, and assignment mandates.
- **Official Decree (SK)**:
  - Formal decree structure: Considering, Bearing in Mind, Observing, and Deciding clauses.
- **Official Handover Report (BAST)**:
  - Standardized physical deliverable and document transfer template with witness attestation clauses.

### 5.4. Portable Template Package Export/Import (.bakutpl)
- Enhances custom template authoring by packaging custom templates into portable `.bakutpl` files.
- Direct import of `.bakutpl` packages from colleagues into the local template gallery.

---

## 6. Multi-Platform Support & Binary Packaging

### 6.1. Windows OS Distribution
- **Guided NSIS Installer (`.exe`)**:
  - 64-bit (`x64`) and ARM64 packages for Windows 10 and Windows 11.
  - Start Menu shortcuts, Desktop icons, and native `.baku` file association.
  - Clean uninstaller removing all registry hooks.
- **Standalone Portable Edition (`Baku_Portable.exe`)**:
  - Direct execution requiring zero administrator privileges, ideal for lab or restricted workstations.
- **Microsoft Package Manager (`winget`) Support**:
  - Official manifest submission to `winget-pkgs`:
    ```cmd
    winget install Baku.BakuPDF
    ```

### 6.2. Linux OS Distribution
- **Universal `AppImage` Package**:
  - Single standalone portable binary compatible across distributions (Ubuntu, Fedora, Arch Linux, Debian, openSUSE).
- **Debian / Ubuntu Package (`.deb`)**:
  - Native binary with resolved `webkit2gtk-4.1` dependencies.
- **Flathub & Arch User Repository (AUR) Support**:
  - Flatpak sandbox manifest.
  - Community `baku-bin` package on Arch Linux AUR.

### 6.3. Advanced macOS Distribution
- **Homebrew Cask Distribution**:
  - Convenient terminal installation for macOS developers:
    ```bash
    brew install --cask baku-pdf
    ```
- **Apple Code Signing & Notarization**:
  - Apple Developer ID certificate integration and automated notarization to guarantee seamless launch without Gatekeeper intervention.

---

## 7. Core Architecture, Performance & Heavy Document Handling

### 7.1. Infinite Virtual DOM Page Rendering
- Render only the paper pages currently positioned within the user viewport plus a 1-2 page pre-fetch buffer.
- Enables smooth navigation and editing of 500+ page manuscripts (such as full doctoral dissertations or textbooks) with flat memory usage.
- Typing input latency remains sub-8ms regardless of document length.

### 7.2. Pure Rust Native PDF Vector Export Engine
- Core PDF export engine transitioning to native Rust libraries (`printpdf` and `lopdf`) alongside WebView printing.
- Output produces pure searchable, selectable vector text with file sizes up to 60% more compact.
- Automated font subsetting: only glyphs actually present in the text are embedded into the PDF.

### 7.3. 60-Second Auto-Save & Crash Auto-Recovery
- Periodic automatic background snapshotting every 60 seconds into an isolated local storage cache.
- Sudden system shutdowns or application terminations trigger an instant recovery prompt on next launch.
- Local revision snapshot history enabling rollback to 15, 30, or 60-minute historical states.

---

## 8. User Interface, Navigation & Accessibility

### 8.1. Document Outline & Navigator Sidebar
- Collapsible left navigation panel on the editor canvas:
  - **Headings Outline Tab**: Tree view of Chapters and Subsections; clicking any heading jumps instantly to that page.
  - **Page Thumbnails Tab**: Vertical miniature preview cards for every document page.
  - **Search Results Tab**: Contextual snippets matched during Find & Replace operations.

### 8.2. Adaptive Dark & Light Modes
- True dark theme engineered with high-contrast ratios conforming to WCAG AAA standards.
- Dark mode paper sheet representation options:
  - *Physical White Page on Dark Canvas* (exact print preview representation).
  - *Inverted Dark Page* (night-time reading comfort mode minimizing eye fatigue).
- Automatic synchronization with host operating system appearance.

### 8.3. Zen Distraction-Free Writing Mode
- Hide menu bar, ribbon toolbar, and sidebar panels with a single shortcut (`F11` or `Cmd+Shift+F`).
- Centered page sheet surrounded by a subdued background for deep writing focus.

### 8.4. Two-Page Spread View & Advanced Zoom Presets
- **Two-Page Spread View**: Side-by-side horizontal dual page rendering on widescreen monitors.
- **Advanced Zoom Presets**: One-click Fit to Width and Fit to Page presets complementing the percentage zoom slider.

### 8.5. Multi-Document Tab Bar
- **Purpose & Workflow Benefits**:
  - Eliminates operating system window swapping (Alt+Tab / Cmd+`) when working across multiple reference manuscripts simultaneously (e.g., Chapter I draft, supervisor review notes, and formatting guide).
  - Open and edit multiple `.baku` documents in a single integrated application window.
- **Ergonomic Positioning**:
  - Strategically positioned **directly beneath the Ribbon Toolbar and directly above the Ruler and Editor Canvas**.
  - Respects natural top-to-bottom user workflow: select formatting tools in Ribbon -> select file context in Tab Bar -> edit page on Canvas.
  - Leverages the full horizontal width of the application window without overcrowding the bottom status bar (which already houses page count, word count, language indicator, and zoom slider).
- **2D Flat Visual Design & Aesthetics**:
  - Compact slim tab bar (height: 30-32 px) preserving vertical canvas space.
  - **Active Tab**: Clean solid white background (`#FFFFFF`) blending seamlessly into the ruler and paper canvas, marked with a distinctive blue top accent line (`#2563EB`), bold title text, close `x` button, and unsaved state dot.
  - **Inactive Tab**: Neutral muted gray (`#F3F2F1`) with subtle divider borders and smooth hover feedback.
  - Tab width capped with ellipsis truncation (`text-overflow: ellipsis`) keeping long file names neat and legible.
  - Quick action `+` button on the far right of the tab bar to create or open additional documents.
- **Navigation & Horizontal Scroll Mechanism**:
  - **Proportional Display**: When 1 to 5 documents are open, tabs display proportionally across the available width.
  - **Adaptive Horizontal Scroll (> 5 Documents)**: When more than 5 tabs are open, the bar scrolls horizontally with smooth trackpad or mouse wheel gestures.
  - **Navigation Guide Controls**: Left `<` and right `>` arrow scroll buttons appear automatically at the edges when tab contents overflow for convenient mouse navigation.
- **State Management & Session Persistence**:
  - **Isolated Per-Document State**: Each tab maintains its independent Delta JSON document model, cursor coordinate, and exact scroll position. Users will never be bounced back to page 1 when switching tabs.
  - **Isolated Undo/Redo Stacks**: Independent undo (`Ctrl/Cmd+Z`) and redo (`Ctrl+Y` / `Cmd+Shift+Z`) histories per tab, preventing accidental edits across different files.
  - **Unsaved Document Indicator**: Blue accent dot or asterisk `*` automatically signifies uncommitted modifications.
  - **Safe Close Confirmation**: Clicking `x` on a dirty tab triggers a confirmation prompt to save changes before closing.
- **Local-First RAM Optimization**:
  - Tab virtualization: Inactive tabs are held as lightweight JSON/Delta models in RAM without instantiating DOM sheet elements.
  - Only the currently active document is mounted to the Quill canvas, maintaining Baku PDF's lightweight footprint (~50-80 MB) and eliminating UI stutter.
- **Keyboard Shortcuts**:
  - `Ctrl+Tab` / `Cmd+Option+Right`: Switch to next document tab.
  - `Ctrl+Shift+Tab` / `Cmd+Option+Left`: Switch to previous document tab.
  - `Ctrl+W` / `Cmd+W`: Close active document tab with save prompt.

---

## 9. Format Interoperability & File Compatibility

### 9.1. Offline Word (.docx) Import & Conversion
- Pure native Rust `.docx` parser to inspect and import existing Word manuscripts offline.
- Preserves fundamental formatting: bold, italic, underline, tables, paragraph spacing, and lists.
- Automatically converts document margins and paper dimensions to Baku PDF standards.

### 9.2. Export to Standard Formats
- Export to Microsoft Word (`.docx`) for academic supervisors or agencies requiring Word formats.
- Export to plain text (`.txt`) and academic Markdown (`.md`).

### 9.3. Native .baku Specification v2.0
- Lossless compressed binary attachment container within `.baku` JSON structures for embedded high-resolution graphics.
- Internal storage for bibliography registries and per-section pagination schemas.
- Full backward compatibility: version 1.0.0 `.baku` documents open flawlessly in version 1.5.

---

## 10. Document Security & Metadata Sanitization

### 10.1. Metadata Sanitizer
- Automatic stripping of hidden metadata prior to exporting public PDFs:
  - Removes author names, machine hostnames, and local file paths.
  - Clears hidden modification timestamps.
- Critical for double-blind academic journal peer reviews and sensitive institutional documents.

### 10.2. Read-Only Document Locking Mode
- Lock `.baku` files to Read-Only mode to prevent accidental modifications to approved or finalized manuscripts.

---

## 11. Version 1.5 Development Priority Matrix

| Feature Module | Target Component | Priority | Complexity Estimate |
| :--- | :--- | :--- | :--- |
| Multi-Document Tab Bar | Frontend Editor & State Engine | Very High | Medium |
| Offline PDF Compressor | Rust Backend (`lopdf` / `image`) | Very High | Medium |
| Windows (.exe) & Linux (AppImage) Installers | Tauri Bundler & CI Workflow | Very High | Medium |
| Dual-Positioning Academic Page Numbering | Frontend Sheet Engine | High | Medium |
| Document Outline & Thumbnails Sidebar | Frontend UI & DOM Virtualizer | High | Medium |
| Offline KaTeX Mathematical Notation | Frontend Parser Engine | High | Low |
| Vertical Ruler & Paragraph Indentation | Frontend Ruler Engine | Medium | Medium |
| Citation & Bibliography Manager | Frontend Library & Data Store | Medium | Medium |
| Offline Digital Signature & Stamp | Rust Backend & Canvas Overlay | Medium | Medium |
| Adaptive Dark Mode | CSS Theme Engine | Medium | Low |
| Offline Word (.docx) Import | Rust DOCX Parser | Future | High |

---

## Contributing & Feature Discussion

This roadmap is open to feedback and suggestions from the community:
- Submit feature suggestions via [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md).
- Report bugs via [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md).
- Review our full contribution guide in [CONTRIBUTING.md](../CONTRIBUTING.md).
- Explore the technical architecture in [ARCHITECTURE.md](../ARCHITECTURE.md).
