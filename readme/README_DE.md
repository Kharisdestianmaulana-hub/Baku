<div align="center">
  <p>
    <strong>Sprachen / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <a href="README_ES.md">Español</a> |
    <a href="README_FR.md">Français</a> |
    <strong>Deutsch</strong> |
    <a href="README_JA.md">日本語</a> |
    <a href="README_ZH.md">简体中文</a> |
    <a href="README_PT.md">Português</a> |
    <a href="README_RU.md">Русский</a> |
    <a href="README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="../src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Leichtgewichtige, Lokale Textverarbeitung mit Standardformaten für Wissenschaft und Behörden</strong></p>

  <p>
    <a href="https://tauri.app"><img src="https://img.shields.io/badge/Tauri-v1.6-24C8D8?style=flat&logo=tauri&logoColor=white" alt="Tauri" /></a>
    <a href="https://www.rust-lang.org"><img src="https://img.shields.io/badge/Rust-2021%20Edition-DEA584?style=flat&logo=rust&logoColor=white" alt="Rust" /></a>
    <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-F7DF1E?style=flat" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-4F83CC?style=flat" alt="Cross Platform" />
    <img src="https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Local--First-10B981?style=flat" alt="Local First" />
    <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat" alt="License" /></a>
  </p>
</div>

---

## Inhaltsverzeichnis
- [Über Baku PDF](#über-baku-pdf)
- [Hauptfunktionen](#hauptfunktionen)
- [PDF-Zusatzwerkzeuge (100% Offline)](#pdf-zusatzwerkzeuge-100-offline)
- [Roadmap Zukünftiger Veröffentlichungen (v1.5 & Zukünftige)](#roadmap-zukünftiger-veröffentlichungen-v15--zukünftige)
- [Architektur und Technologie-Stack](#architektur-und-technologie-stack)
- [Systemvoraussetzungen und Installation](#systemvoraussetzungen-und-installation)
- [Vollständige Dokumentation](#vollständige-dokumentation)
- [Lizenz](#lizenz)

---

## Über Baku PDF

Baku PDF ist eine moderne Desktop-Textverarbeitung, die speziell für das Verfassen von wissenschaftlichen Arbeiten, universitären Abschlussarbeiten und behördlichen Dokumenten nach festen Layout-Vorgaben entwickelt wurde. Gemäß der **Local-First**-Philosophie laufen Textverarbeitung, Seitendarstellung und PDF-Verarbeitung vollständig lokal auf Ihrem Rechner ab – ohne Fremdserver, ohne Telemetrie-Tracking und ohne Cloud-Abonnements.

Entwickelt mit **Tauri** und **Rust** sowie einem schlanken Vanilla-Web-Frontend, ist Baku PDF extrem ressourcenschonend (~50–80 MB Arbeitsspeicher), startet ohne Verzögerung und vermeidet die typischen Trägheiten von Electron-basierten Editoren.

---

## Hauptfunktionen

1. **Schnellstart-Startbildschirm im Word-Stil**:
   - Direktstart mit leerem Dokument.
   - Nativer Zugriff auf `.baku`-Dokumentdateien.
   - Vorschauminiaturen von Dokumentvorlagen mit visuellen Hilfslinien und Standard-Kennzeichnungen.
   - Liste zuletzt geöffneter Dateien und direkter Zugang zur Vorlagengalerie.

2. **Vorlagengalerie und Eigener Vorlageneditor**:
   - Standardvorlagen für Abschlussarbeiten, Seminarberichte, Laborprotokolle, offizielle Briefe und ATS-optimierte Lebensläufe.
   - Kategorienfilterung und Sofortsuche nach Stichwörtern.
   - Strenge Standardsperre (*Strict Standard Lock*) zum Schutz vor unbeabsichtigten Änderungen an Seitenrändern und Blattformaten.
   - Import und Export eigenständiger Vorlagendateien im `.baku`-Format.

3. **Intelligente Seiten- und Abschnittsverwaltung**:
   - Seitenumbrüche (*Page Break*, Strg/Cmd + Eingabe) mit flüssigen 60 FPS ohne Rendering-Verzögerungen.
   - Abschnittsumbrüche (*Section Break*, Strg/Cmd + Umschalt + Eingabe) für unabhängige Nummerierungen und getrennte Kapitelkopfzeilen.
   - Vielfältige Seitennummerierungsformate: arabische Zahlen, römische Zahlen (Klein-/Großbuchstaben) und Buchstaben.
   - Erste Seite anders definieren, um Titelseiten ohne Nummerierung zu halten.

4. **Interaktives Visuelles Lineal**:
   - Horizontales Lineal mit Millimeter-, Zentimeter- und Zollskalierung.
   - Drei interaktive Markierungen: Erstzeileneinzug, Linker Einzug und Rechter Rand.
   - Echtzeit-Synchronisation mit dem Absatz unter dem Textcursor.

5. **Präzise Typografie und Formatvorlagen**:
   - Schnellstile: Standard, Dokumenttitel, Untertitel, Überschriften 1 bis 3, Zitatblock und Festbreitenschrift.
   - Schriftgrößenauswahl (8pt bis 72pt), Zeilenabstand (1.0, 1.15, 1.5, 2.0) und Farbpaletten.
   - Standardränder (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal) und Papierformate (A4, Folio/F4, Letter, Legal).

6. **Integrierte Dokumentwerkzeuge**:
   - **Groß-/Kleinschreibung ändern**: Satzanfang groß, kleinbuchstaben, GROSSBUCHSTABEN, Ersten Buchstaben Groß und Umkehren.
   - **Echtzeit-Statistiken**: Zähler für Wörter, Zeichen, Absätze und geschätzte Lesezeit.
   - **Tabelleneditor**: Interaktives Raster mit schwebender Werkzeugleiste zum Hinzufügen/Löschen von Zeilen und Spalten.
   - **Bildverwaltung**: Lokales Einfügen, Ausrichtung, proportionale Größenänderung und sicheres Löschen.
   - **Sonderzeichendialog**: Schnellauswahl typografischer und wissenschaftlicher Symbole.

7. **WYSIWYG-PDF-Export und Nativer Druck**:
   - Pixelgenaue PDF-Ausgabe exakt wie auf der Bearbeitungsfläche dargestellt.
   - Direkte Integration in das lokale Drucksystem des Betriebssystems.

---

## PDF-Zusatzwerkzeuge (100% Offline)

Baku PDF beinhaltet autarke Werkzeuge zur PDF-Bearbeitung ohne Internetverbindung:
- **PDF zusammenführen (Merge PDF)**: Kombinieren Sie mehrere PDF-Dateien in ein geordnetes Gesamtdokument.
- **PDF teilen (Split PDF)**: Extrahieren Sie Seitenbereiche (z. B. 1–3, 5, 8–10) oder trennen Sie Einzelseiten auf.
- **PDF drehen (Rotate PDF)**: Korrigieren Sie die Seitenausrichtung um 90, 180 oder 270 Grad.
- **Bilder zu PDF (Images to PDF)**: Wandeln Sie Fotos und Scans (JPG, PNG) in ein sauberes Druck-PDF um.

---

## Roadmap Zukünftiger Veröffentlichungen (v1.5 & Zukünftige)

Wir pflegen eine transparente, öffentlich einsehbare Entwicklungs-Roadmap mit allen geplanten Funktionen, Leistungsoptimierungen und Plattformversionen:

- **Multi-Dokument-Tab-Leiste**: Gleichzeitiges Öffnen, Bearbeiten und Umschalten mehrerer `.baku`-Dokumente in einem Anwendungsfenster mit getrenntem Status und horizontalem Scrollen.
- **Offline-PDF-Kompressor**: Voreinstellungen (<500 KB, <1 MB, <2 MB) und anpassbare DPI-Werte ohne Serververbindung.
- **Plattformübergreifende Installer**: Windows NSIS-Installer (`.exe`), eigenständige portable Version sowie Linux `AppImage` und Debian `.deb`.
- **Duale Seitennummerierung für Abschlussarbeiten**: Automatische Platzierung unten mittig für Kapiteleröffnungsseiten und oben rechts für Folgeseiten.
- **Erweiterte wissenschaftliche Offline-Tools**: KaTeX-Formeln, Tabellen im Booktabs-Stil, visuelle Seitensortierung und digitale Signaturen.

Detaillierte Roadmap-Spezifikationen einsehen:
- [Roadmap auf Deutsch (../Update/Update_Baku_de.md)](../Update/Update_Baku_de.md)
- [English Roadmap (../Update/Update_Baku_en.md)](../Update/Update_Baku_en.md)
- [Verzeichnis aller Roadmap-Sprachen (../Update/)](../Update/)

---

## Architektur und Technologie-Stack

- **Backend**: Rust 2021 mit Tauri Framework v1.6.
- **PDF-Engine und I/O**: `lopdf` v0.31 für low-level PDF-Operationen und `printpdf` v0.7 für die Vektorkompilierung.
- **Frontend**: HTML5, reines CSS3 und Vanilla JavaScript ES6+ ohne Framework-Overhead.
- **Editor-Kern**: Quill.js 2.0 mit maßgeschneiderten Modulen für Seiten- und Abschnittsumbrüche.
- **Dateiformat**: JSON-basiertes `.baku`-Format mit atomarem Schreibmechanismus (*atomic write*).
- **Grafikbeschleunigung**: GPU-gepufferte, voneinander isolierte Papierblattebenen.

---

## Systemvoraussetzungen und Installation

### Voraussetzungen
- Node.js (Version 16 oder neuer)
- Rust und Cargo (aktueller stabiler Release-Kanal)
- Tauri-Abhängigkeiten entsprechend Ihrem Betriebssystem (macOS, Windows oder Linux)

### Projekt ausführen
1. Repository klonen:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Frontend-Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Entwicklungsmodus starten:
   ```bash
   npm run tauri dev
   ```

4. Anwendungsinstaller und Binärdateien erstellen:
   ```bash
   npm run tauri build
   ```

---

## Vollständige Dokumentation

Zur Unterstützung offener Zusammenarbeit bieten wir eine ausführliche Dokumentation:

| Dokument | Beschreibung |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Richtlinien für Mitwirkende, Git-Workflow und Codestandards. |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Technische Spezifikationen, Tauri-IPC-Kommunikation und `.baku`-Dateiaufbau. |
| [CHANGELOG.md](../CHANGELOG.md) | Versionsverlauf und Veröffentlichungshinweise. |
| [SECURITY.md](../SECURITY.md) | Sicherheitsrichtlinie und vertrauliche Meldung von Sicherheitslücken. |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | Verhaltenskodex und Standards der Entwickler-Community. |
| [Roadmap (v1.5+)](../Update/Update_Baku_de.md) | Mehrsprachige Roadmap und geplante Funktionsspezifikationen zukünftiger Versionen. |

---

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Einzelheiten finden Sie in der Datei [LICENSE](../LICENSE).
