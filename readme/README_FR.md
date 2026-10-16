<div align="center">
  <p>
    <strong>Langues / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <a href="README_ES.md">Español</a> |
    <strong>Français</strong> |
    <a href="README_DE.md">Deutsch</a> |
    <a href="README_JA.md">日本語</a> |
    <a href="README_ZH.md">简体中文</a> |
    <a href="README_PT.md">Português</a> |
    <a href="README_RU.md">Русский</a> |
    <a href="README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="../src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Traitement de Texte Léger, Normalisé et 100% Hors Ligne pour Documents Officiels et Académiques</strong></p>

  <p>
    <a href="https://github.com/Kharisdestianmaulana-hub/Baku/releases/tag/v1.1.0"><img src="https://img.shields.io/badge/Release-v1.1.0-blue?style=flat" alt="Release v1.1.0" /></a>
    <a href="https://tauri.app"><img src="https://img.shields.io/badge/Tauri-v1.6-24C8D8?style=flat&logo=tauri&logoColor=white" alt="Tauri" /></a>
    <a href="https://www.rust-lang.org"><img src="https://img.shields.io/badge/Rust-2021%20Edition-DEA584?style=flat&logo=rust&logoColor=white" alt="Rust" /></a>
    <img src="https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-F7DF1E?style=flat" alt="Vanilla JS" />
    <img src="https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-4F83CC?style=flat" alt="Cross Platform" />
    <img src="https://img.shields.io/badge/Privacy-100%25%20Offline%20%26%20Local--First-10B981?style=flat" alt="Local First" />
    <a href="../LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat" alt="License" /></a>
  </p>
</div>

---

## Table des Matières
- [À Propos de Baku PDF](#à-propos-de-baku-pdf)
- [Fonctionnalités Principales](#fonctionnalités-principales)
- [Outils PDF Additionnels (100% Hors Ligne)](#outils-pdf-additionnels-100-hors-ligne)
- [Feuille de Route des Prochaines Versions (v1.2.0 – v1.5.0)](#feuille-de-route-des-prochaines-versions-v120--v150)
- [Calendrier Officiel des Versions (v1.1.0 – v1.5.0)](#calendrier-officiel-des-versions-v110--v150)
- [Architecture et Pile Technologique](#architecture-et-pile-technologique)
- [Prérequis et Installation](#prérequis-et-installation)
- [Documentation Complète](#documentation-complète)
- [Licence](#licence)

---

## À Propos de Baku PDF

Baku PDF est un traitement de texte de bureau moderne conçu pour la rédaction rigoureuse de thèses universitaires, d'articles scientifiques et de correspondances administratives conformes à des normes strictes de mise en page. Fondé sur le principe **local-first**, l'intégralité du traitement de texte, du rendu de pages et de la manipulation PDF s'exécute localement sur votre ordinateur sans serveurs externes, sans télémétrie et sans abonnement infonuagique.

Développé avec **Tauri** et **Rust** et doté d'une interface web vanilla sans framework lourd, Baku PDF est extrêmement léger (~50 à 80 Mo de mémoire vive), démarre instantanément et évite les ralentissements des applications basées sur Electron.

---

## Fonctionnalités Principales

1. **Écran d'Accueil Rapide Style Microsoft Word**:
   - Création de document vierge en un clic.
   - Ouverture directe des fichiers natifs `.baku`.
   - Miniatures de modèles avec aperçu des marges et badges de conformité.
   - Historique des documents récents et accès à la galerie complète.

2. **Galerie de Modèles Normalisés et Éditeur Personnalisé**:
   - Modèles officiels pour thèses, mémoires, rapports de laboratoire, lettres administratives et CV compatibles ATS.
   - Filtrage thématique et recherche instantanée par mots-clés.
   - Verrouillage des normes strictes (*Strict Standard Lock*) protégeant les marges et formats de papier.
   - Export et import de fichiers de modèles `.baku`.

3. **Barre d'Onglets Multi-Documents (Nouveau dans v1.1.0)**:
   - Ouvrez, modifiez et basculez entre plusieurs documents `.baku` en parallèle dans une fenêtre unique.
   - Piles d'historique Annuler/Rétablir et états de document isolés en mémoire vive.
   - Indicateur de modifications non enregistrées, bouton nouvel onglet (+), bouton de fermeture (x) et défilement horizontal.
   - Raccourcis clavier complets (`Option/Alt + [1-9]`, `Ctrl + Tab`, `Cmd/Ctrl + W`).

4. **Gestion Avancée Multi-Pages et Multi-Sections**:
   - Sauts de page instantanés à 60 FPS (Ctrl/Cmd + Entrée) sans saccades.
   - Sauts de section (Ctrl/Cmd + Maj + Entrée) pour redémarrer la numérotation ou varier les en-têtes selon les chapitres.
   - Formats de numérotation variés : chiffres arabes, romains minuscules/majuscules et lettres.
   - Première page différente pour masquer les numéros sur les pages de garde officielles.

5. **Règle Visuelle Interactive**:
   - Règle horizontale avec repères millimétriques, centimétriques et en pouces.
   - Curseurs interactifs : retrait de première ligne, retrait gauche et marge droite.
   - Synchronisation en direct avec le paragraphe actif sous le curseur.

6. **Typographie Rigoureuse et Mise en Page Précise**:
   - Styles prédéfinis : Normal, Titre, Sous-titre, Titres 1, 2 et 3, Citation et Code.
   - Réglage de taille de police (8pt à 72pt), interligne (1.0, 1.15, 1.5, 2.0) et palettes de couleurs.
   - Marges académiques (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal) et formats de papier (A4, Folio/F4, Lettre, Légal).

7. **Outils et Utilitaires Documentaires**:
   - **Changement de Casse**: Casse de phrase, minuscules, MAJUSCULES, Première Lettre En Majuscule et Inverser.
   - **Statistiques en Temps Réel**: Décompte des mots, caractères, paragraphes et temps de lecture estimé.
   - **Éditeur de Tableaux**: Grille interactive avec barre flottante pour ajouter/supprimer des lignes et colonnes.
   - **Insertion d'Images**: Alignement, redimensionnement proportionnel et suppression sécurisée.
   - **Sélecteur de Symboles**: Caractères spéciaux, typographiques et scientifiques.

8. **Exportation WYSIWYG et Impression Native**:
   - Rendu PDF au pixel près identique à l'affichage à l'écran.
   - Boîte de dialogue d'impression directement interfacée avec le spouleur du système d'exploitation.

9. **Défilement Fluide du Canevas et Barre Latérale Flexible (Nouveau dans v1.1.0)**:
   - Défilement continu et fluide du canevas sans saccades.
   - Disposition verticale ergonomique de la barre latérale repliée et bouton de paramètres repositionné en bas à gauche.
   - Mémorisation de l'état de la barre latérale.

---

## Outils PDF Additionnels (100% Hors Ligne)

Baku PDF comprend des utilitaires autonomes pour traiter vos fichiers PDF sans recourir au cloud :
- **Compresser PDF (Compress PDF) [Nouveau dans v1.1.0]** : Réduisez la taille des fichiers PDF localement avec 3 préréglages (Standard, Maximum, Léger) sans connexion internet.
- **Fusionner PDF (Merge PDF)** : Réunissez plusieurs fichiers PDF en un seul document avec ordre personnalisé.
- **Diviser PDF (Split PDF)** : Extrayez des pages ou des plages de pages précises (par exemple : 1-3, 5, 8-10).
- **Faire Pivoter PDF (Rotate PDF)** : Corrigez l'orientation des pages à 90, 180 ou 270 degrés.
- **Images vers PDF (Images to PDF)** : Convertissez des photos et numérisations JPG/PNG en un fichier PDF ordonné.

---

## Feuille de Route des Prochaines Versions (v1.2.0 – v1.5.0)

Avec la sortie officielle de **Baku PDF v1.1.0** (introduisant la barre d'onglets multi-documents et le compresseur de PDF hors ligne), notre feuille de route se concentre sur les étapes ultérieures v1.2.0 à v1.5.0 :

- **Installateurs Multiplateformes** : Installateur NSIS pour Windows (`.exe`), version portable autonome, et paquets Linux `AppImage` et Debian `.deb`.
- **Double Numérotation des Pages de Thèse** : Numérotation automatique en bas au centre pour la première page d'un chapitre et en haut à droite pour les pages suivantes.
- **Outils Scientifiques Hors Ligne** : Formules KaTeX intégrées, tableaux académiques de style booktabs, réorganisation visuelle des pages et signatures numériques.

Consultez les spécifications complètes de la feuille de route :
- [Feuille de Route en Français (../Update/Update_Baku_fr.md)](../Update/Update_Baku_fr.md)
- [English Roadmap (../Update/Update_Baku_en.md)](../Update/Update_Baku_en.md)
- [Répertoire des Feuilles de Route Multilingues (../Update/)](../Update/)

---

## Calendrier Officiel des Versions (v1.1.0 – v1.5.0)

Afin d'assurer une stabilité logicielle optimale et de garantir des tests de qualité approfondis, Baku PDF adopte un cycle de publication mensuel régulier (~4 semaines par version mineure) :

| Version | Axe Principal de Développement | Date Cible de Publication | Statut |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Onglets Multi-Documents et Compresseur PDF Hors Ligne | **16 octobre 2026** | Déployé et Publié |
| **v1.2.0** | Numérotation de Thèse, KaTeX Hors Ligne et Tableaux Scientifiques | **14 – 16 novembre 2026** | En Développement |
| **v1.3.0** | Installateurs Windows (.exe), Linux (.deb/AppImage) et Plan de Document | **14 – 16 décembre 2026** | Planifié |
| **v1.4.0** | Signatures Numériques, Protection par Mot de Passe et Utilitaires PDF | **20 – 25 janvier 2027** | Planifié |
| **v1.5.0** | Virtualisation DOM 500+ Pages, Mode Sombre, Import Docx | **1 – 5 mars 2027** | Jalon Majeur |

---

## Architecture et Pile Technologique

- **Backend** : Rust 2021 avec le cadriciel Tauri v1.6.
- **Moteur PDF et E/S** : `lopdf` v0.31 pour la manipulation bas niveau et `printpdf` v0.7 pour la génération de canevas vectoriels.
- **Frontend** : HTML5, CSS3 pur et JavaScript Vanilla ES6+ sans framework applicatif.
- **Moteur de Rédaction** : Quill.js 2.0 (compilation personnalisée intégrant les modules de pagination).
- **Format de Sauvegarde** : Fichiers JSON encapsulés `.baku` avec écriture atomique (*atomic write*).
- **Performances Graphiques** : Feuilles de papier gérées comme des couches composites mises en cache GPU.

---

## Prérequis et Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- Rust et Cargo (chaîne de compilation stable récente)
- Outils de compilation Tauri adaptés à votre plateforme (macOS, Windows ou Linux)

### Démarrage
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Lancer en mode développement :
   ```bash
   npm run tauri dev
   ```

4. Compiler la version de distribution :
   ```bash
   npm run tauri build
   ```

---

## Documentation Complète

Nous mettons à disposition une suite documentaire complète pour accompagner la communauté open source :

| Document | Description |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Guide de contribution, flux de travail Git et conventions de code. |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Spécifications techniques, communication IPC Tauri et structure `.baku`. |
| [CHANGELOG.md](../CHANGELOG.md) | Historique des modifications et notes de version. |
| [SECURITY.md](../SECURITY.md) | Politique de sécurité et signalement des vulnérabilités. |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | Règles de vie communautaire et code de conduite. |
| [Feuille de Route (v1.1.0 – v1.5.0)](../Update/Update_Baku_fr.md) | Feuille de route multilingue et spécifications des futures fonctionnalités. |

---

## Licence

Ce projet est publié sous les termes de la Licence MIT. Consultez le fichier [LICENSE](../LICENSE) pour plus d'informations.
