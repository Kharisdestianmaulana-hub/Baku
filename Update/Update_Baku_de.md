<div align="center">
  <p>
    <strong>Roadmap-Sprachen / Roadmap Languages:</strong><br />
    <a href="Update_Baku_en.md">English</a> |
    <a href="Update_Baku_id.md">Bahasa Indonesia</a> |
    <a href="Update_Baku_es.md">Español</a> |
    <a href="Update_Baku_fr.md">Français</a> |
    <strong>Deutsch</strong> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <a href="Update_Baku_pt.md">Português</a> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../readme/README_DE.md">Zurück zur Haupt-README</a></p>
  <hr />
</div>

# Baku PDF Update-Roadmap (Versionen v1.1.0 – v1.5.0)

Dieses Dokument bietet eine vollständige Bestandsaufnahme der in **Baku PDF v1.0.0** verfügbaren Basisfunktionen sowie die strukturierte technische Roadmap aller geplanten Erweiterungen geordnet nach Versionsnummern von **v1.1.0 bis v1.5.0**. Jede Stufe ist messbar geplant, schrittweise überprüfbar und hält strikt an den Grundprinzipien der Anwendung fest:

Wesentliche Architekturprinzipien:
- **100% Offline (Local-First)**: Ausschließlich lokale Datenverarbeitung auf Ihrem Rechner ohne Cloud-Server.
- **Absolute Privatsphäre**: Keine Telemetriedaten, Analysedienste oder Netzwerkübertragungen nach außen.
- **Geringer Ressourcenverbrauch**: Schneller Programmstart und schlanker RAM-Verbrauch (~50-80 MB).
- **Minimalistisches Flat-2D-Design**: Funktionale, aufgeräumte und ablenkungsfreie Arbeitsumgebung.
- **Strikte Formatierungsstandards**: Konsequente Einhaltung akademischer Richtlinien und offizieller Verwaltungsvorgaben.

---

## Inhaltsverzeichnis des Dokuments

1. [Bestandsaufnahme der Basisfunktionen (Status der Version v1.0.0)](#1-bestandsaufnahme-der-basisfunktionen-status-der-version-v100)
2. [Release-Plan Version 1.1.0 (Multi-Dokument-Tabs und Arbeitseffizienz)](#2-release-plan-version-110-multi-dokument-tabs-und-arbeitseffizienz)
3. [Release-Plan Version 1.2.0 (Akademische Standards und Wissenschaftliche Typografie)](#3-release-plan-version-120-akademische-standards-und-wissenschaftliche-typografie)
4. [Release-Plan Version 1.3.0 (Plattformübergreifende Distribution und Navigation)](#4-release-plan-version-130-plattformübergreifende-distribution-und-navigation)
5. [Release-Plan Version 1.4.0 (Offline-PDF-Werkzeuge und Dokumentensicherheit)](#5-release-plan-version-140-offline-pdf-werkzeuge-und-dokumentensicherheit)
6. [Release-Plan Version 1.5.0 (Meilenstein-Höhepunkt und Großdokumenten-Leistung)](#6-release-plan-version-150-meilenstein-höhepunkt-und-großdokumenten-leistung)
7. [Technische Prioritätenmatrix und Meilenstein-Übersicht (v1.1.0 – v1.5.0)](#7-technische-prioritätenmatrix-und-meilenstein-übersicht-v110--v150)
8. [Community-Beiträge und Funktionsdiskussionen](#8-community-beiträge-und-funktionsdiskussionen)

---

## 1. Bestandsaufnahme der Basisfunktionen (Status der Version v1.0.0)

Basierend auf einem detaillierten Code-Audit sind folgende Module in der **Version 1.0.0 vollständig implementiert**:

| Funktionsmodul | Status v1.0.0 | Technische Beschreibung |
| :--- | :--- | :--- |
| **Interaktives Horizontales Lineal** | Implementiert | Zentimeterlineal oben mit Schiebereglern für Rand links und rechts (`ruler-marker-left`, `ruler-marker-right`), Hilfslinien und Menüschalter. |
| **8 Integrierte Standardvorlagen** | Implementiert | Umfasst 5-seitige Abschlussarbeit/Thesis, Wissenschaftlicher Artikel, Laborbericht, Offizieller Amtsbrief, **Bewerbungsschreiben**, Sitzungsprotokoll, **ATS-Lebenslauf** und Internes Memorandum. |
| **System zur Erstellung Eigener Vorlagen** | Implementiert | Befehle "Als Vorlage speichern..." (`#action-save-as-template`), "Neue Vorlage erstellen" (`#btn-create-new-template`) und Filter für eigene Vorlagen. |
| **Seitennummerierung & Abschnittsumbrüche** | Implementiert | Konfigurationsdialog (`#modal-page-number`) mit arabischen Ziffern (`1, 2, 3`), kleinen römischen Ziffern (`i, ii, iii`), großen römischen Ziffern (`I, II, III`) und Umbrüchen. |
| **Erste Seite mit Abweichender Kopf-/Fußzeile** | Implementiert | Option *Erste Seite anders* (`diffFirst`) zur Isolierung von Deckblättern. |
| **Dedizierter Link-Einfügedialog** | Implementiert | Flat-2D-Modal (`#modal-link-overlay`) mit Anzeigetext, Ziel-URL, Link-Entfernen-Button, Tastenkürzel `Ctrl+K` / `Cmd+K` und Browser-Öffnen via `Ctrl/Cmd + Klick`. |
| **Präzise Zoom- und Skalierungsregler** | Implementiert | Vergrößern, Verkleinern, 100% Zurücksetzen, Schieberegler in der Statusleiste und UI-Skalierung. |
| **4 Autonome Offline-PDF-Werkzeuge** | Implementiert | PDF zusammenfügen (*Merge*), PDF teilen (*Split*), Seiten drehen (*Rotate*) und Bilder zu PDF (*Images to PDF*) betrieben mit Rust `lopdf` und `image`. |
| **macOS Universal Binary DMG-Installationspaket** | Implementiert | Offizielles Universal DMG (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) mit Drag-and-Drop-Hintergrund und Dateisystemschutz (`check_running_from_dmg`). |

---

## 2. Release-Plan Version 1.1.0 (Multi-Dokument-Tabs und Arbeitseffizienz)

Der Meilenstein **v1.1.0** konzentriert sich auf paralleles Verfassen von Dokumenten und lokale Dateigrößenreduktion:

### 2.1. Multi-Dokument-Tab-Leiste (Multi-Document Tab Bar)
- **Zweck und Nutzen**: Vermeidet das ständige Wechseln mit `Alt+Tab` zwischen Betriebssystemfenstern beim Abgleich mehrerer Referenzdateien.
- **Ergonomische Position**: Platziert direkt **unter der Ribbon-Menüleiste und unmittelbar über dem Lineal und Dokumentbereich**.
- **Flat-2D-Design**: Schlanke Tabs (30-32 px Höhe); aktiver Tab mit weißem Hintergrund (`#FFFFFF`) und blauem Akzentstreifen (`#2563EB`); inaktive Tabs in neutralem Grau (`#F3F2F1`) mit Textkürzung.
- **Horizontales Scrollen**: Proportionale Anzeige bis zu 5 Tabs; sanftes horizontales Scrollen via Trackpad/Mausrad und Navigationspfeilen `<` und `>` bei mehr als 5 Dokumenten.
- **Zustandsisolierung und Datensicherheit**: Getrennte Verläufe für Rückgängig/Wiederholen (`Ctrl+Z` / `Ctrl+Y`), visuelle Markierung ungespeicherter Änderungen (blauer Punkt) und Sicherheitsabfrage beim Schließen.
- **Speicheroptimierung (RAM)**: Hintergrund-Tabs werden als schlanke Delta-JSON-Objekte im RAM gehalten ohne DOM-Elemente zu rendern (~50-80 MB Gesamt-RAM).
- **Tastaturkürzel**: `Ctrl+Tab` für nächsten Tab, `Ctrl+Shift+Tab` für vorherigen Tab und `Ctrl+W` zum Schließen.

### 2.2. Offline-PDF-Dateikomprimierer (Offline PDF Compressor)
- Lokale Verkleinerung von PDF-Dokumenten in Rust ohne Schärfeverlust von Vektorschriften.
- Voreinstellungen: unter 500 KB (Bewerbungsportale), unter 1 MB (Universitätsrepositorien), unter 2 MB und manuelle DPI-Wahl (150, 96, 72 DPI).
- Anzeige des Vorher-Nachher-Größenvergleichs vor dem Speichern.

---

## 3. Release-Plan Version 1.2.0 (Akademische Standards und Wissenschaftliche Typografie)

Der Meilenstein **v1.2.0** integriert akademische Layout-Vorgaben und mathematische Formeln:

### 3.1. Automatische Dual-Position-Seitennummerierung für Abschlussarbeiten
- Erste Seite jedes Kapitels unten zentriert; Fortsetzungsseiten in der oberen rechten Ecke.
- Unabhängiger Neustart der Nummerierung pro Abschnitt.

### 3.2. Mathematische Formelnotation mit KaTeX (Offline)
- 100% lokal eingebundene KaTeX-Engine für Inline- und Blockgleichungen mit Formelnummerierung am rechten Rand: `(1.1)`, `(1.2)`.

### 3.3. Wissenschaftliche Tabellenformatierung (Booktabs-Stil)
- Horizontale und vertikale Zellenverschmelzung.
- Saubere Tabellenränder ohne vertikale Linien (dicke obere Linie, feine Kopfzeilenlinie, dicke untere Abschlusslinie).
- Dezimalpunktausrichtung in Zahlenkolonnen und automatische Kopfzeilenwiederholung bei Seitenumbrüchen.

### 3.4. Vertikales Lineal und Erweiterte Absatzeinzüge
- Schieberegler für Erstzeileneinzug und hängenden Einzug (Literaturverzeichnis nach APA/IEEE).
- Vertikales Lineal am linken Rand zur Messung der tatsächlichen Seitenhöhe und visuellen Anpassung des oberen und unteren Randes.

### 3.5. Integrierte Rechtschreibprüfung und Stilhilfe
- Lokales Wörterbuch mit optischer Hervorhebung, Vorschlägen per Rechtsklick und automatischer Silbentrennung für sauberen Blocksatz.

### 3.6. Automatisierte Dokumentenstruktur
- Dynamisches Inhaltsverzeichnis mit Füllpunkten und Aktualisierung per Klick.
- Automatische Abbildungs- und Tabellenverzeichnisse mit Seitenzahlabgleich in Echtzeit.
- Literaturverwaltung mit BibTeX-Import (`.bib`) und Zitierstilen APA 7, IEEE, Harvard und Vancouver.

---

## 4. Release-Plan Version 1.3.0 (Plattformübergreifende Distribution und Navigation)

Der Meilenstein **v1.3.0** stellt Installationspakete für Windows und Linux bereit und ergänzt eine Navigationsleiste:

### 4.1. Distribution für Microsoft Windows
- NSIS-Installationsprogramm (`.exe`) für 64-Bit und ARM64 für Windows 10 und 11 mit `.baku`-Dateiverknüpfung.
- Standalone-Portable-Version (`Baku_Portable.exe`) für Rechner ohne Administratorrechte.
- Veröffentlichung über den Windows Package Manager (`winget install Baku.BakuPDF`).

### 4.2. Distribution für Linux
- Universalpaket `AppImage` für Ubuntu, Fedora, Arch Linux, Debian und openSUSE.
- Natives Debian/Ubuntu-Paket (`.deb`) mit vollständigen Systembibliotheken.
- Flatpak-Unterstützung und AUR-Paket (`baku-bin`).

### 4.3. Erweiterte macOS-Bereitstellung
- Installation über Homebrew Cask (`brew install --cask baku-pdf`).
- Offizielle Apple Developer ID Signierung und Notarisierung für reibungslosen Start ohne Sicherheitswarnungen.

### 4.4. Dokumentnavigationsleiste
- Einklappbares Seitenpanel links mit Gliederung nach Überschriften (Kapitel und Unterabschnitte), Seitenvorschau-Miniaturen und Volltextsuchergebnissen.

---

## 5. Release-Plan Version 1.4.0 (Offline-PDF-Werkzeuge und Dokumentensicherheit)

Der Meilenstein **v1.4.0** bringt spezialisierte PDF-Dienstprogramme und Datenschutzfunktionen:

### 5.1. Digitale Signatur und Handzeichen (Offline)
- Zeichnen per Maus/Stylus oder Import transparenter PNG-Signaturen mit Drag-and-Drop.
- Stapelsignatur an festen Koordinaten für mehrseitige Dokumente und Datumsstempel.

### 5.2. Metadaten-Bereinigungswerkzeug
- Entfernen von Autorennamen, Gerätekennungen und Bearbeitungsverläufen für anonyme Begutachtungsverfahren (*Blind Review*).

### 5.3. Visueller Seitenorganisator
- Miniaturansicht zur Neuanordnung von Seiten per Drag-and-Drop, schnelles Löschen und Einfügen leerer oder externer PDF-Seiten.

### 5.4. Text-Wasserzeichen-Werkzeug
- Diagonale oder horizontale Wasserzeichen mit Vorlagen (`ENTWURF`, `VERTRAULICH`, `OFFIZIELLE KOPIE`) und Transparenzregler.

### 5.5. PDF-Passwortschutz und Verschlüsselung
- Lokale AES-256-Verschlüsselung mit Benutzerpasswort und Rechte-Passwort (Drucken und Kopieren einschränken).

### 5.6. Externe Seitennummerierung (Bates-Nummerierung)
- Aufstempeln von Seitenzahlen auf bestehende Drittanbieter-PDF-Dokumente mit benutzerdefinierten Präfixen.

---

## 6. Release-Plan Version 1.5.0 (Meilenstein-Höhepunkt und Großdokumenten-Leistung)

Der Meilenstein **v1.5.0** stellt den Höhepunkt des Baku PDF Ökosystems dar:

### 6.1. Portable Vorlagenpakete (.bakutpl)
- Export und Import von Vorlagen in transportablen `.bakutpl`-Paketdateien.

### 6.2. Erweiterte Sammlung Wissenschaftlicher Vorlagen
- Vorlagen für zweispaltige Fachzeitschriften und Konferenzbeiträge (IEEE).
- Forschungsanträge, Praktikumsberichte und Promotionsschriften.
- Offizielle Verwaltungsdokumente (Dienstanweisungen, Beschlüsse und Übergabeprotokolle).

### 6.3. Unendliches Virtuelles DOM-Seitenrendering (500+ Seiten)
- Montage nur der Seiten im sichtbaren Bildschirmbereich (*Viewport*) mit einer Tastaturlatenz unter 8 ms selbst bei umfangreichen Manuskripten.

### 6.4. Nativer PDF-Exportmotor in Rust
- Reine Vektorerzeugung mit Rust-Bibliotheken (`printpdf`/`lopdf`) und Schrifteinbettung, was die Ausgabegröße um bis zu 60% reduziert.

### 6.5. Vollständiger Adaptiver Dunkel- und Hellmodus
- Kontrastreiches Dark Theme nach WCAG-AAA-Standard mit weißer oder invertierter Blattanzeige und Systemthemen-Synchronisation.

### 6.6. Ablenkungsfreier Schreibmodus (Zen) und Doppelseitenansicht
- Vollständiges Ausblenden von Menüs (`F11` / `Cmd+Shift+F`) und Nebeneinanderanzeige von zwei Seiten auf Breitbildmonitoren.

### 6.7. Offline-Word-Import (.docx) und Standardformate
- Lokaler Rust-Parser für Word-Dateien mit Formattreue und Export nach `.docx`, `.txt` und Markdown (`.md`).

### 6.8. Erweiterte .baku-Dateispezifikation (v2.0)
- Verlustfrei komprimierte Binäranhänge für hochauflösende Grafiken mit vollständiger Abwärtskompatibilität zu Version 1.0.0.

### 6.9. Regelmäßiges Automatisches Speichern und Notfallwiederherstellung
- Hintergrundspeicherung alle 60 Sekunden mit Sitzungswiederherstellung nach Absturz oder Stromausfall sowie lokalen Revisionsständen.

---

## 7. Technische Prioritätenmatrix und Meilenstein-Übersicht (v1.1.0 – v1.5.0)

### 7.1. Meilenstein-Plan

| Version | Hauptfokus | Integrierte Module | Zeitplan |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Dokument-Tabs und Effizienz | Multi-Dokument-Tab-Leiste (Abschnitt 2.1) und PDF-Komprimierer (Abschnitt 2.2). | Nächste Version |
| **v1.2.0** | Standards und Typografie | Duale Seitennummerierung (Abschnitt 3.1), KaTeX (Abschnitt 3.2), Booktabs (Abschnitt 3.3), Vertikales Lineal (Abschnitt 3.4), Rechtschreibung (Abschnitt 3.5) und Struktur (Abschnitt 3.6). | Phase 2 |
| **v1.3.0** | Plattformübergreifend | Windows-Installationsprogramm (Abschnitt 4.1), Linux AppImage/Debian (Abschnitt 4.2), macOS (Abschnitt 4.3) und Navigationsleiste (Abschnitt 4.4). | Phase 3 |
| **v1.4.0** | PDF-Tools und Sicherheit | Digitale Signatur (Abschnitt 5.1), Metadaten-Sanitizer (Abschnitt 5.2), Seitenorganisator (Abschnitt 5.3), Wasserzeichen (Abschnitt 5.4), Verschlüsselung (Abschnitt 5.5) und Bates-Nummerierung (Abschnitt 5.6). | Phase 4 |
| **v1.5.0** | Ökosystem-Höhepunkt | `.bakutpl`-Pakete (Abschnitt 6.1), Zusatzvorlagen (Abschnitt 6.2), Virtuelles DOM 500+ Seiten (Abschnitt 6.3), Rust-PDF-Engine (Abschnitt 6.4), Dark Mode (Abschnitt 6.5), Zen-Modus (Abschnitt 6.6), Word-Import (Abschnitt 6.7), `.baku` v2.0 (Abschnitt 6.8) und Notfallwiederherstellung (Abschnitt 6.9). | Meilenstein-Höhepunkt |

### 7.2. Technische Prioritätenmatrix

| Funktionsmodul | Zielkomponente | Zielversion | Priorität | Geschätzte Komplexität |
| :--- | :--- | :--- | :--- | :--- |
| Multi-Dokument-Tab-Leiste | Frontend Editor und State Engine | v1.1.0 | Sehr Hoch | Mittel |
| Offline-PDF-Dateikomprimierer | Backend Rust (`lopdf` / `image`) | v1.1.0 | Sehr Hoch | Mittel |
| Duale Seitennummerierung für Abschlussarbeiten | Frontend Sheet Engine | v1.2.0 | Hoch | Mittel |
| Mathematische Formelnotation mit KaTeX | Frontend Parser | v1.2.0 | Hoch | Niedrig |
| Vertikales Lineal und Absatzeinzüge | Frontend Ruler Engine | v1.2.0 | Mittel | Mittel |
| Wissenschaftliche Tabellen (Booktabs) | Frontend Sheet Engine | v1.2.0 | Mittel | Mittel |
| Windows (.exe) und Linux (AppImage) Installer | Tauri Bundler und CI | v1.3.0 | Sehr Hoch | Mittel |
| Dokumentnavigationsleiste und Miniaturen | Frontend UI und Virtuelles DOM | v1.3.0 | Hoch | Mittel |
| Digitale Signatur und Handzeichen | Backend Rust und Canvas Overlay | v1.4.0 | Mittel | Mittel |
| Metadaten-Bereinigungswerkzeug | Backend Rust und PDF-Pipeline | v1.4.0 | Mittel | Niedrig |
| Visueller Seitenorganisator | Frontend UI und Backend Rust | v1.4.0 | Mittel | Mittel |
| Adaptiver Dunkelmodus | CSS Theme Engine | v1.5.0 | Mittel | Niedrig |
| Portable Vorlagenpakete (.bakutpl) | Frontend-Speicher und JSON | v1.5.0 | Mittel | Niedrig |
| Virtuelle DOM-Seitenansicht (500+ Seiten) | Frontend DOM Virtualizer | v1.5.0 | Hoch | Hoch |
| Offline-Word-Import (.docx) | Rust DOCX Parser | v1.5.0 / Später | Zukünftig | Hoch |

---

## 8. Community-Beiträge und Funktionsdiskussionen

- Verbesserungsvorschläge: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Fehlerberichte: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Richtlinien für Mitwirkende: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Technische Architektur: [ARCHITECTURE.md](../ARCHITECTURE.md)
