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
  <p><a href="../readme/README_DE.md">Zurück zum Haupt-README</a></p>
  <hr />
</div>

# Baku PDF Roadmap (Release-Pipeline v1.1.0 – v1.5.0)

Dieses Dokument fasst den aktuellen Funktionsstand von **Baku PDF v1.0.0** zusammen und stellt die geplanten neuen Funktionen vor, die in gestaffelten Veröffentlichungen von **Baku PDF v1.1.0 bis v1.5.0** bereitgestellt werden. Diese schrittweise Release-Pipeline konzentriert sich auf anspruchsvolle akademische Schreibprozesse, zusätzliche Offline-PDF-Werkzeuge, vollständige plattformübergreifende Distribution (Windows, macOS, Linux) sowie hocheffizientes Rendering umfangreicher Manuskripte.

Kernprinzipien der Baku PDF-Entwicklung bleiben gewahrt:
- **100% Offline (Offline-First)**: Sämtliche Berechnungen laufen lokal auf dem Rechner des Anwenders ohne externe Cloud-Server.
- **Absolute Privatsphäre**: Keine Telemetrie, keine Analyse-Tracker und kein externer Datenversand.
- **Minimaler Ressourcenverbrauch**: Blitzschneller Start und geringer Arbeitsspeicherbedarf (~50–80 MB RAM).
- **Minimalistisches 2D-Flat-Design**: Übersichtliche, funktionale und ablenkungsfreie Benutzeroberfläche.
- **Strenge Standardisierung**: Exakte Einhaltung wissenschaftlicher und behördlicher Formatierungsrichtlinien.

---

## Inhaltsverzeichnis

1. [Aktuell verfügbare Funktionen (Baseline v1.0.0)](#1-aktuell-verfügbare-funktionen-baseline-v100)
2. [Dokumenteneditor & Fortgeschrittene Wissenschaftliche Typografie](#2-dokumenteneditor--fortgeschrittene-wissenschaftliche-typografie)
3. [Automatisierte Akademische Dokumentenstruktur](#3-automatisierte-akademische-dokumentenstruktur)
4. [Erweiterte Offline-PDF-Zusatzwerkzeuge](#4-erweiterte-offline-pdf-zusatzwerkzeuge)
5. [Erweiterte Sammlung von Standardvorlagen](#5-erweiterte-sammlung-von-standardvorlagen)
6. [Plattformübergreifender Support & Binärverteilung](#6-plattformübergreifender-support--binärverteilung)
7. [Kernarchitektur, Performance & Große Dokumente](#7-kernarchitektur-performance--große-dokumente)
8. [Benutzeroberfläche, Navigation & Barrierefreiheit](#8-benutzeroberfläche-navigation--barrierefreiheit)
9. [Formatinteroperabilität & Dateikompatibilität](#9-formatinteroperabilität--dateikompatibilität)
10. [Dokumentensicherheit & Metadatenbereinigung](#10-dokumentensicherheit--metadatenbereinigung)
11. [Gestaffelte Release-Phasen & Prioritätenmatrix (v1.1.0 – v1.5.0)](#11-gestaffelte-release-phasen--prioritätenmatrix-v110--v150)

---

## 1. Aktuell verfügbare Funktionen (Baseline v1.0.0)

Nach umfassender Quellcode-Prüfung sind die folgenden Module in **Version 1.0.0 vollständig implementiert**:

| Funktionsmodul | Status v1.0.0 | Implementierungsdetails |
| :--- | :--- | :--- |
| **Interaktives Horizontales Lineal** | Implementiert | Oberes Zentimeter-Lineal mit Randschiebereglern (`ruler-marker-left`, `ruler-marker-right`), Einrastlinien und Umschaltknopf im Menüband sowie im Ansichtsmenü. |
| **8 Integrierte Standardvorlagen** | Implementiert | 5-seitige Abschlussarbeit/Thesis, Wissenschaftlicher Artikel, Laborbericht, Behördlicher Dienstbrief, **Bewerbungsschreiben**, Sitzungsprotokoll, **ATS-Lebenslauf** und Internes Memo. |
| **System zur Erstellung Benutzerdefinierter Vorlagen** | Implementiert | Als Vorlage speichern (`#action-save-as-template`), Neue Vorlage erstellen (`#btn-create-new-template`) und Filter für eigene Vorlagen in der Galerie. |
| **Seitennummerierung & Abschnittsumbrüche** | Implementiert | Konfigurationsdialog (`#modal-page-number`) mit arabischen (`1, 2, 3`), kleinen römischen (`i, ii, iii`) und großen römischen Ziffern (`I, II, III`) sowie Abschnittsumbrüchen. |
| **Erste Seite Anders bei Kopf-/Fußzeilen** | Implementiert | Option Erste Seite Anders (`diffFirst`) im Kopf-/Fußzeilen-Editor zum Ausblenden auf der Titelseite. |
| **Eigenständiger Hyperlink-Dialog** | Implementiert | 2D-Flat-Modal (`#modal-link-overlay`) mit Anzeigetext, URL-Feld, Link-Entfernen-Funktion, Tastenkürzel `Ctrl+K` / `Cmd+K` und Öffnen per `Ctrl/Cmd + Klick`. |
| **Zoom- & Skalierungssteuerung** | Implementiert | Vergrößern, Verkleinern, 100%-Reset, Prozent-Schieberegler in der Statusleiste und UI-Skalierung in den Einstellungen. |
| **4 Offline-PDF-Zusatzwerkzeuge** | Implementiert | PDF zusammenführen, PDF teilen, PDF drehen und Bilder zu PDF auf Basis der Rust-Bibliotheken `lopdf` und `image`. |
| **Universeller macOS-DMG-Installer** | Implementiert | Offizielles Universal-Binary-Paket (`x86_64` Intel + `arm64` Apple Silicon M1-M4) (`Baku_1.0.0_Universal_Installer.dmg`) mit Drag-and-Drop-Hintergrund und Ausführungsschutz vor temporären Volumes (`check_running_from_dmg`). |

---

## 2. Dokumenteneditor & Fortgeschrittene Wissenschaftliche Typografie

### 2.1. Offline KaTeX Mathematische Notation & Formeln
- Vollständig offline integrierter KaTeX-Formelparser ohne Netzanbindung.
- Interaktives Einfügen mathematischer Gleichungen inline oder als zentrierter Block.
- Automatische Gleichungsnummerierung am rechten Seitenrand nach Kapiteln: `(1.1)`, `(1.2)`.
- Unterstützung für Matrizen, Integralrechnung und Symbole aus Physik und Chemie.

### 2.2. Erweiterung des Interaktiven Lineals: Einzüge & Vertikales Lineal
- Zusätzliche Markierungen auf dem horizontalen Lineal:
  - **Erstzeileneinzug**: Definiert den Absatzbeginn (z. B. 1 cm oder 1,27 cm).
  - **Hängender Einzug**: Standard für bibliografische Referenzlisten (APA, IEEE, Harvard).
- **Vertikales Lineal** am linken Seitenrand:
  - Exakte Höhenmessung der Seite in Zentimetern.
  - Direkte visuelle Anpassung von oberem und unterem Seitenrand per Mausbewegung.

### 2.3. Wissenschaftliche Tabellen mit erweitertem Layout
- Horizontale und vertikale Zellenzusammenführung.
- Randgestaltung für Fachpublikationen (Booktabs-Stil): Verzicht auf vertikale Linien, betonte horizontale Trennlinien.
- Dezimalausrichtung für Zahlenspalten.
- Automatische Wiederholung der Tabellenkopfzeile bei Seitenumbrüchen.
- Automatische Beschriftungsnummerierung: `Tabelle 1.1: Tabellentitel`.

### 2.4. Offline-Rechtschreibprüfung & Silbentrennung
- Lokales Wörterbuch zur Erkennung von Tippfehlern.
- Diskrete rote Unterstreichung für unbekannte Begriffe.
- Kontextuelle Vorschläge über das Rechtsklick-Menü.
- Automatische Silbentrennung im Blocksatz zur Vermeidung ungleichmäßiger Wortabstände.

---

## 3. Automatisierte Akademische Dokumentenstruktur

### 3.1. Duale Seitennummerierungsregeln für Abschlussarbeiten
- Automatisierung gängiger Hochschulrichtlinien:
  - Erste Seite jedes neuen Kapitels (mit Haupttitel) nummeriert **unten zentriert**.
  - Folgeseiten desselben Kapitels nummeriert **oben rechts**.
  - Unabhängige Abschnittsnummerierung ohne Beeinträchtigung vorhergehender Abschnitte.

### 3.2. Dynamisches Automatisches Inhaltsverzeichnis
- Sofortige Erzeugung anhand der Überschriftenhierarchie (Überschrift 1 bis 3).
- Automatische Füllpunkte zwischen Überschrift und Seitenzahl.
- Ein-Klick-Aktualisierung bei Seitenverschiebungen oder Textänderungen.

### 3.3. Dynamisches Abbildungs- und Tabellenverzeichnis
- Kontinuierliche Erfassung aller Bildunterschriften und Tabellenüberschriften.
- Automatisches Erstellen synchronisierter Verzeichnisse in Echtzeit.

### 3.4. Offline-Literatur- & Zitationsverwaltung
- Manuelle Eingabe oder Import aus BibTeX (`.bib`) und RIS-Dateien.
- Automatische Formatierung nach APA 7. Ausgabe, IEEE, Harvard und Vancouver.
- Erstellung eines alphabetisch sortierten Literaturverzeichnisses mit hängendem Einzug.

---

## 4. Erweiterte Offline-PDF-Zusatzwerkzeuge

Neben den 4 bestehenden Werkzeugen führt Version 1.5 weitere 6 Offline-PDF-Dienstprogramme ein:

### 4.1. Offline-PDF-Kompressor
- Lokale Reduzierung der PDF-Dateigröße via optimierter Rust-Routinen bei voller Textschärfe.
- Voreinstellungen: unter 500 KB, unter 1 MB, unter 2 MB sowie manuelle DPI-Wahl (150, 96, 72 DPI).
- Visueller Vorher-Nachher-Größenvergleich vor dem Speichern.

### 4.2. Digitale Signatur & Paraphe Offline
- Unterschrift per Maus/Stift oder Import transparenter PNG-Grafiken.
- Platzierung mit Vorschau auf beliebigen Dokumentseiten.
- Stapelsignatur nach Koordinaten über mehrere Seiten hinweg.
- Datumstempel und Prüfparaphen.

### 4.3. Passwortschutz & AES-256-Verschlüsselung
- Dokumentenöffnungspasswort mit lokaler AES-256-Verschlüsselung.
- Berechtigungspasswort zur Einschränkung von Druck, Textkopieren und Bearbeitung.
- Entschlüsselungsfunktion für autorisierte Dateieigentümer.

### 4.4. Visuelle Seitenorganisation & Neuanordnung
- Miniaturansicht aller Seiten im übersichtlichen Raster.
- Neuanordnung von Einzelseiten per Drag-and-Drop.
- Gezieltes Löschen einzelner Seiten oder Seitenbereiche.
- Einfügen von Leerseiten oder Seiten aus Fremd-PDFs.

### 4.5. Bates-Nummerierung für Externe PDF-Dokumente
- Nummerierung unpaginierter externer PDF-Dateien.
- Position frei wählbar: oben rechts, unten rechts oder unten mittig.
- Anpassbare Präfixe (z. B. `Anhang Seite 1 von 10`, `Blatt 1`).

### 4.6. Offline-Wasserzeichen-Werkzeug
- Diagonale (45 Grad) oder horizontale Wasserzeichen.
- Textvorlagen: `ENTWURF`, `VERTRAULICH`, `OFFIZIELLE KOPIE`, `MUSTER`.
- Einstellbare Deckkraft, Schriftgröße, Farbe und Seitenbereiche.

---

## 5. Erweiterte Sammlung von Standardvorlagen

### 5.1. Wissenschaftliche Publikationen & Fachzeitschriften
- **Wissenschaftlicher Zeitschriftenartikel (Zweispaltiges Layout)**: Einspaltiger Titelblock, zweisprachiges Abstract und IMRAD-Gliederung.
- **IEEE-Konferenzbeitrag**: Normgerechte Ränder und Typografie für Tagungsbände.

### 5.2. Hochschulverwaltung & Förderanträge
- **Forschungsförderungsantrag**: Deckblatt, standardisierte Budgetaufstellung und Zeitplan.
- **Praktikumsbericht**: Wöchentliches Logbuch und institutionelle Beurteilung.
- **Masterarbeits- & Promotionsantrag**: Methodischer Forschungsrahmen und Hypothesen.

### 5.3. Behörden & Unternehmenskorrespondenz
- **Dienstliche Dienstanweisung & Entsendungsbeschluss**: Behördliches Standardlayout mit Aktenzeichen.
- **Formelle Verfügung & Bescheid**: Klassische Erwägungs- und Beschlussklauseln.
- **Übergabeprotokoll**: Standardisiertes Nachweisdokument mit Zeugenunterschriften.

### 5.4. Export/Import Eigenständiger Vorlagenpakete (.bakutpl)
- Verpacken eigener Vorlagen in portable `.bakutpl`-Dateien.
- Direkter Import auf anderen Arbeitsplatzrechnern in die Vorlagengalerie.

---

## 6. Plattformübergreifender Support & Binärverteilung

### 6.1. Windows-Betriebssystem
- **Geführter NSIS-Installer (`.exe`)**: 64-Bit (`x64`) und ARM64 für Windows 10/11 mit `.baku`-Dateiverknüpfung.
- **Eigenständige Portable Edition (`Baku_Portable.exe`)**: Startfähig ohne Administratorrechte für Labore und Bibliotheken.
- **Microsoft-Paket-Manager (`winget`)**: Bereitstellung im offiziellen Katalog `winget-pkgs`.

### 6.2. Linux-Betriebssystem
- **Universelles `AppImage`-Paket**: Eigenständige Binärdatei für gängige Linux-Distributionen.
- **Debian / Ubuntu-Paket (`.deb`)**: Natives Paket mit aufgelösten Systemabhängigkeiten.
- **Flathub & Arch User Repository (AUR)**: Flatpak-Manifest und `baku-bin` im Arch AUR.

### 6.3. Erweiterte macOS-Distribution
- **Homebrew Cask**: Bequeme Installation im Terminal (`brew install --cask baku-pdf`).
- **Apple Code Signing & Notarisierung**: Offizielles Apple Developer ID-Zertifikat für störungsfreies Öffnen ohne Gatekeeper-Warnung.

---

## 7. Kernarchitektur, Performance & Große Dokumente

### 7.1. Virtuelles DOM-Seitenrendering
- Rendering beschränkt auf die aktuell sichtbaren Seiten im Darstellungsbereich zuzüglich 1–2 Pufferseiten.
- Reibungslose Bearbeitung von Manuskripten mit über 500 Seiten bei konstant niedrigem RAM-Verbrauch.
- Tastatureingabelatenz bleibt unter 8 Millisekunden.

### 7.2. Native Vektor-PDF-Export-Engine in Rust
- Direkter PDF-Export auf Basis von Rust-Bibliotheken (`printpdf` und `lopdf`) parallel zum WebView-Druck.
- Durchsuchbarer, verlustfreier Vektortext mit bis zu 60% kleinerer Dateigröße.
- Automatisches Font-Subsetting: Es werden nur die im Text verwendeten Glyphen eingebettet.

### 7.3. 60-Sekunden-Autosave & Sitzungswiederherstellung
- Kontinuierliche Sicherung alle 60 Sekunden in einem isolierten lokalen Zwischenspeicher.
- Sofortiger Wiederherstellungsdialog nach Systemabstürzen oder unvorhergesehenem Beenden.
- Lokale Versionshistorie zur Wiederherstellung von Zuständen vor 15, 30 oder 60 Minuten.

---

## 8. Benutzeroberfläche, Navigation & Barrierefreiheit

### 8.1. Dokumentenstruktur- & Navigationsseitenleiste
- Einklappbare linke Seitenleiste mit Gliederungsbaum, Miniaturansichten und Suchergebnissen.

### 8.2. Adaptiver Dunkel- und Hellmodus
- Kontrastreicher nativer Dunkelmodus gemäß WCAG AAA-Standards.
- Einstellbare Blattdarstellung: weißes Papier auf dunklem Hintergrund oder augenschonende Nachtumkehrung.
- Automatische Synchronisation mit dem Betriebssystem-Design.

### 8.3. Zen-Modus für Fokussiertes Schreiben
- Sofortiges Ausblenden aller Menüs und Leisten mit `F11` oder `Cmd+Shift+F`.

### 8.4. Doppelseitenansicht & Erweiterte Skalierung
- Horizontale Darstellung zweier Seiten nebeneinander für Breitbildmonitore.

### 8.5. Multi-Dokument-Tab-Leiste (Multi-Document Tab Bar)
- **Zweck & Arbeitsablauf**:
  - Macht das Umschalten zwischen Fenstern (Alt+Tab / Cmd+`) überflüssig, wenn mit mehreren Referenzdokumenten parallel gearbeitet wird.
  - Gleichzeitiges Öffnen und Bearbeiten mehrerer `.baku`-Dokumente in einem einzigen Anwendungsfenster.
- **Ergonomische Platzierung**:
  - Befindet sich strategisch **unterhalb der Menüband-Symbolleiste und direkt über dem Lineal und dem Dokumenteneditor**.
  - Folgt dem natürlichen Arbeitsablauf von oben nach unten: Werkzeuge im Menüband wählen -> Dokument im Reiter wählen -> auf der Seite schreiben.
  - Nutzt die gesamte Fensterbreite, ohne die untere Statusleiste zu überfrachten.
- **Visuelles 2D-Flat-Design**:
  - Schlanke Leiste (Höhe: 30 bis 32 px).
  - **Aktiver Tab**: Weißer Hintergrund (`#FFFFFF`) im Übergang zum Dokument, blaue Akzentlinie (`#2563EB`) an der Oberkante, Fettschrift, Schließen-Button `x` und Änderungspunkt.
  - **Inaktiver Tab**: Neutrales Hellgrau (`#F3F2F1`) mit subtiler Abgrenzung.
  - Breitenbegrenzung mit Auslassungspunkten für lange Dateinamen und Schnell-Button `+` zum Hinzufügen.
- **Horizontales Scrollen & Navigation**:
  - Gleichmäßige Darstellung bei 1 bis 5 Dokumenten.
  - Reibungsloses horizontales Scrollen bei mehr als 5 Dokumenten mit Hilfspfeilen `<` und `>` bei Überlauf.
- **Statusisolierung & Datensicherheit**:
  - Eigenständiges Delta-JSON-Modell je Tab mit separater Scrollposition und Cursor-Koordinate.
  - Getrennte Undo- (`Ctrl/Cmd+Z`) und Redo-Stapel (`Ctrl+Y` / `Cmd+Shift+Z`) je Dokument.
  - Blauer Statuspunkt bei ungespeicherten Änderungen und Sicherheitsabfrage vor dem Schließen.
- **Speicheroptimierung**:
  - Tabs im Hintergrund verbleiben als schlanke Datenstrukturen im RAM, ohne DOM-Elemente zu belasten.

---

## 9. Formatinteroperabilität & Dateikompatibilität

### 9.1. Offline-Word-Import (.docx)
- Rust-basierter Parser zum Einlesen bestehender Word-Dateien unter Beibehaltung wesentlicher Stile.

### 9.2. Export in Standardformate
- Export nach `.docx`, Reintext (`.txt`) und wissenschaftliches Markdown (`.md`).

### 9.3. Spezifikation des nativen .baku-Formats v2.0
- Binärer Anhangs-Container für verlustfrei komprimierte hochauflösende Grafiken.
- Vollständige Abwärtskompatibilität mit `.baku`-Dateien aus Version 1.0.0.

---

## 10. Dokumentensicherheit & Metadatenbereinigung

### 10.1. Metadaten-Bereinigungswerkzeug
- Entfernen von Autorennamen, Gerätekennungen und Dateipfaden für anonymisierte Begutachtungen (*Blind Review*).

### 10.2. Schreibgeschützter Modus (Read-Only)
- Schutz finalisierter Dokumente vor unbeabsichtigten Änderungen.

---

## 11. Gestaffelte Release-Phasen & Prioritätenmatrix (v1.1.0 – v1.5.0)

Um neue Kernfunktionen schnell, stabil und fundiert getestet bereitzustellen, ohne auf die zeitgleiche Fertigstellung aller Bausteine zu warten, gliedert sich die Entwicklung in fünf aufeinanderfolgende Phasen:

### 11.1. Gestaffelter Meilenstein-Plan

| Release | Hauptfokus | Enthaltene Funktionsmodule | Zeitplan |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Dokument-Tabs & Arbeitseffizienz | Multi-Dokument-Tab-Leiste (Abschnitt 8.5) und Offline-PDF-Kompressor (Abschnitt 4.1). | Nächstes Release |
| **v1.2.0** | Akademische Standards & Typografie | Duale Seitennummerierung (Abschnitt 3.1), KaTeX-Formeln (Abschnitt 2.1), Booktabs-Tabellen (Abschnitt 2.3) und Vertikales Lineal (Abschnitt 2.2). | Phase 2 |
| **v1.3.0** | Plattformübergreifende Distribution | Windows NSIS-Installer (`.exe`) & Portable Edition (Abschnitt 6.1), Linux AppImage & Debian `.deb` (Abschnitt 6.2). | Phase 3 |
| **v1.4.0** | PDF-Dienstprogramme & Sicherheit | Digitale Signatur & Paraphe (Abschnitt 4.2), Metadaten-Bereiniger (Abschnitt 10.1), Visuelle Seitenorganisation (Abschnitt 4.4) und Wasserzeichen (Abschnitt 4.6). | Phase 4 |
| **v1.5.0** | Ökosystem-Meilenstein & Skalierung | Portable Vorlagenpakete `.bakutpl` (Abschnitt 5.4), Virtuelles DOM-Rendering für 500+ Seiten (Abschnitt 7.1), Vollständiger Dunkelmodus (Abschnitt 8.2) und Word-Import `.docx` (Abschnitt 9.1). | Meilenstein-Gipfel |

### 11.2. Technische Entwicklungsprioritäten

| Funktionsmodul | Zielkomponente | Zielversion | Priorität | Geschätzte Komplexität |
| :--- | :--- | :--- | :--- | :--- |
| Multi-Dokument-Tab-Leiste | Frontend Editor & State Engine | v1.1.0 | Sehr Hoch | Mittel |
| Offline-PDF-Kompressor | Rust Backend (`lopdf` / `image`) | v1.1.0 | Sehr Hoch | Mittel |
| Duale Seitennummerierung für Abschlussarbeiten | Frontend Sheet Engine | v1.2.0 | Hoch | Mittel |
| Offline KaTeX Mathematische Notation | Frontend Parser Engine | v1.2.0 | Hoch | Gering |
| Vertikales Lineal & Absatzeinzüge | Frontend Ruler Engine | v1.2.0 | Mittel | Mittel |
| Wissenschaftliche Tabellen (Booktabs) | Frontend Sheet Engine | v1.2.0 | Mittel | Mittel |
| Windows- (.exe) & Linux- (AppImage) Installer | Tauri Bundler & CI-Workflow | v1.3.0 | Sehr Hoch | Mittel |
| Dokumentenstruktur & Miniaturbildleiste | Frontend UI & DOM-Virtualisierer | v1.3.0 | Hoch | Mittel |
| Digitale Signatur & Paraphe Offline | Rust Backend & Canvas Overlay | v1.4.0 | Mittel | Mittel |
| Metadaten-Bereinigung (Blind Review) | Rust Backend & PDF Pipeline | v1.4.0 | Mittel | Gering |
| Visuelle Seitenorganisation & Neuanordnung | Frontend UI & Rust Backend | v1.4.0 | Mittel | Mittel |
| Adaptiver Dunkelmodus | CSS Theme Engine | v1.5.0 | Mittel | Gering |
| Portable Vorlagenpakete (.bakutpl) | Frontend Datenbibliothek & JSON | v1.5.0 | Mittel | Gering |
| Virtuelles DOM-Seitenrendering (500+ Seiten) | Frontend DOM-Virtualisierer | v1.5.0 | Hoch | Hoch |
| Offline Word-Import (.docx) | Rust DOCX Parser | v1.5.0 / Zukunft | Zukunft | Hoch |

---

## Diskussion & Mitwirkung der Community

- Vorschläge für neue Funktionen: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Fehlerberichte einreichen: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Leitfaden für Mitwirkende: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Technische Architektur: [ARCHITECTURE.md](../ARCHITECTURE.md)\n