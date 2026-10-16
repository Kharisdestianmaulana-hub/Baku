<div align="center">
  <p>
    <strong>Langues de la Feuille de Route / Roadmap Languages:</strong><br />
    <a href="Update_Baku_en.md">English</a> |
    <a href="Update_Baku_id.md">Bahasa Indonesia</a> |
    <a href="Update_Baku_es.md">Español</a> |
    <strong>Français</strong> |
    <a href="Update_Baku_de.md">Deutsch</a> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <a href="Update_Baku_pt.md">Português</a> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../readme/README_FR.md">Retour au README Principal</a></p>
  <hr />
</div>

# Feuille de Route Baku PDF (Cycle de Versions v1.1.0 – v1.5.0)

Ce document dresse le bilan des fonctionnalités disponibles dans **Baku PDF v1.0.0**, suivi de la feuille de route technique organisée par numéro de version de **v1.1.0 à v1.5.0**. Chaque étape de déploiement est structurée de manière mesurable, testée progressivement et respecte strictement les principes fondateurs de l'application :

Principes fondamentaux de conception :
- **100% Hors Ligne (Local-First)** : Traitement strictement local sur votre appareil, sans recours au cloud.
- **Confidentialité Absolue** : Aucune télémétrie, suivi analytique ou transmission externe de données.
- **Faible Empreinte Système** : Démarrage instantané et consommation de mémoire RAM minime (~50-80 Mo).
- **Design Épuré Flat 2D** : Interface ergonomique, moderne et exempte de distractions.
- **Conformité Typographique** : Respect rigoureux des normes de rédaction académique et administrative.

---

## Sommaire du Document

1. [Inventaire des Fonctionnalités Initiales (Statut de Version v1.0.0)](#1-inventaire-des-fonctionnalités-initiales-statut-de-version-v100)
2. [Fonctionnalités de la Version 1.1.0 (Statut : Déployé et Publié)](#2-fonctionnalités-de-la-version-110-statut--déployé-et-publié)
3. [Plan de Version 1.2.0 (Normes Académiques et Typographie Scientifique)](#3-plan-de-version-120-normes-académiques-et-typographie-scientifique)
4. [Plan de Version 1.3.0 (Déploiement Multiplateforme Complet et Navigation)](#4-plan-de-version-130-déploiement-multiplateforme-complet-et-navigation)
5. [Plan de Version 1.4.0 (Outils PDF Hors Ligne et Sécurité des Documents)](#5-plan-de-version-140-outils-pdf-hors-ligne-et-sécurité-des-documents)
6. [Plan de Version 1.5.0 (Sommet de l'Écosystème et Hautes Performances)](#6-plan-de-version-150-sommet-de-lécosystème-et-hautes-performances)
7. [Matrice des Priorités Techniques et Résumé des Jalons (v1.1.0 – v1.5.0)](#7-matrice-des-priorités-techniques-et-résumé-des-jalons-v110--v150)
8. [Contributions Communautaires et Discussions des Fonctionnalités](#8-contributions-communautaires-et-discussions-des-fonctionnalités)

---

## 1. Inventaire des Fonctionnalités Initiales (Statut de Version v1.0.0)

L'audit complet du code source confirme que les modules suivants sont **intégralement implémentés dans la version 1.0.0** :

| Module Fonctionnel | Statut v1.0.0 | Description Technique |
| :--- | :--- | :--- |
| **Règle Horizontale Interactive** | Implémenté | Règle métrique en centimètres, curseurs de marges gauche/droite (`ruler-marker-left`, `ruler-marker-right`), repères d'alignement et boutons de bascule. |
| **8 Modèles Standards Intégrés** | Implémenté | Thèse universitaire complète de 5 pages, Article Scientifique, Rapport de Laboratoire, Lettre Administrative, **Lettre de Motivation**, Compte-rendu de Réunion, **CV Standard ATS** et Mémo Interne. |
| **Système de Création de Modèles** | Implémenté | Action "Enregistrer comme modèle..." (`#action-save-as-template`), "Créer un modèle" (`#btn-create-new-template`) et filtre des modèles personnels. |
| **Numérotation et Sauts de Section** | Implémenté | Boîte de dialogue (`#modal-page-number`) avec formats arabes (`1, 2, 3`), romains minuscules (`i, ii, iii`), romains majuscules (`I, II, III`) et sauts de section. |
| **Première Page d'En-tête Différente** | Implémenté | Option *Première page différente* (`diffFirst`) pour isoler les pages de titre. |
| **Modal d'Insertion de Liens Dédié** | Implémenté | Dialogue Flat 2D (`#modal-link-overlay`) avec texte d'affichage, URL cible, suppression du lien, raccourci `Ctrl+K` / `Cmd+K` et ouverture avec `Ctrl/Cmd + Clic`. |
| **Contrôles Précis du Zoom** | Implémenté | Zoom avant/arrière, réinitialisation à 100%, curseur dans la barre d'état et échelle d'interface. |
| **4 Outils PDF Hors Ligne** | Implémenté | Fusionner PDF (*Merge*), Fractionner PDF (*Split*), Pivoter les Pages (*Rotate*) et Images vers PDF (*Images to PDF*) propulsés par Rust `lopdf` et `image`. |
| **Paquet DMG macOS Binaire Universel** | Implémenté | DMG Universal Binary (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) officiel avec fond de glisser-déposer et sécurité de volume (`check_running_from_dmg`). |

---

## 2. Fonctionnalités de la Version 1.1.0 (Statut : Déployé et Publié)

> [!NOTE]
> Toutes les fonctionnalités de la Version 1.1.0 ont été intégralement implémentées et publiées officiellement le 16 octobre 2026.

Le jalon **v1.1.0** est axé sur la rédaction multitâche fluide et la compression locale de fichiers PDF :

### 2.1. Barre d'Onglets Multi-Documents (Multi-Document Tab Bar)
- **Objectif et Bénéfices** : Évite les allers-retours avec `Alt+Tab` entre les fenêtres de l'OS en permettant d'ouvrir, modifier et naviguer entre plusieurs documents `.baku` simultanément au sein d'une seule fenêtre.
- **Positionnement Ergonomique** : Située sous la barre d'outils Ribbon et au-dessus de la règle et de la feuille de travail.
- **Conception Flat 2D** : Onglets compacts (hauteur 30-32 px) ; onglet actif à fond blanc pur (`#FFFFFF`) avec liseré bleu supérieur (`#2563EB`) ; onglets inactifs en gris neutre (`#F3F2F1`) avec troncature élégante.
- **Défilement Horizontal Adaptatif** : Disposition proportionnelle jusqu'à 5 onglets ; défilement horizontal fluide au trackpad ou à la molette au-delà de 5 documents avec boutons chevrons `<` et `>`.
- **Isolation des Données et Sécurité** : Historiques d'annulation (`Ctrl+Z` / `Ctrl+Y`) indépendants par onglet, indicateur visuel de modifications non enregistrées (point bleu) et confirmation avant fermeture.
- **Virtualisation Mémoire RAM** : Les onglets d'arrière-plan restent de simples structures Delta JSON en mémoire sans monter d'éléments DOM, garantissant une utilisation réduite de RAM (~50-80 Mo).
- **Raccourcis Clavier** : `Ctrl+Tab` pour l'onglet suivant, `Ctrl+Shift+Tab` pour l'onglet précédent et `Ctrl+W` pour fermer l'onglet.

### 2.2. Compresseur de Fichiers PDF Hors Ligne (Offline PDF Compressor)
- Réduction de taille opérée localement en Rust sans dégrader la lisibilité du texte vectoriel.
- Préréglages immédiats : moins de 500 Ko (candidatures et bourses), moins de 1 Mo (dépôts académiques), moins de 2 Mo et réglage manuel du DPI (150, 96, 72 DPI).
- Estimation comparative de la taille avant et après enregistrement.

---

## 3. Plan de Version 1.2.0 (Normes Académiques et Typographie Scientifique)

Le jalon **v1.2.0** instaure les règles formelles de thèse universitaire et la typographie mathématique :

### 3.1. Double Numérotation des Pages de Thèse Automatique
- Première page de chaque chapitre centrée en bas ; pages suivantes positionnées dans le coin supérieur droit.
- Réinitialisation isolée de la numérotation par section sans altérer les séquences précédentes.

### 3.2. Formules Mathématiques KaTeX Hors Ligne
- Moteur KaTeX embarqué 100% hors ligne.
- Insertion d'équations en ligne (`Inline Math`) et en bloc (`Block Equation`).
- Numérotation séquentielle des formules dans la marge droite : `(1.1)`, `(1.2)`.

### 3.3. Tableaux Scientifiques Avancés (Style Booktabs)
- Fusion de cellules horizontale et verticale.
- Lignes de démarcation épurées sans séparateurs verticaux (ligne supérieure épaisse, ligne d'en-tête fine, ligne inférieure épaisse).
- Alignement décimal des données numériques et répétition automatique des en-têtes sur plusieurs pages.

### 3.4. Règle Verticale et Retraits de Paragraphe
- Curseurs sur la règle horizontale pour Retrait de Première Ligne et Retrait Suspendu (normes APA/IEEE).
- Règle verticale à gauche pour mesurer la hauteur exacte et ajuster visuellement les marges haute et basse.

### 3.5. Correcteur Orthographique et Guide Rédactionnel Hors Ligne
- Dictionnaire local intégré avec alertes visuelles, suggestions au clic droit et césure automatique des mots pour les textes justifiés.

### 3.6. Automatisation de la Structure du Document
- Table des matières dynamique avec points de conduite (*dot leaders*) et mise à jour rapide.
- Listes synchronisées des figures et des tableaux avec numéros de pages en temps réel.
- Gestionnaire de citations hors ligne avec import BibTeX (`.bib`) et formats APA 7, IEEE, Harvard et Vancouver.

---

## 4. Plan de Version 1.3.0 (Déploiement Multiplateforme Complet et Navigation)

Le jalon **v1.3.0** étend la compatibilité native à Windows et Linux et ajoute une navigation latérale :

### 4.1. Distribution pour Microsoft Windows
- Installateur NSIS guidé (`.exe`) 64 bits et ARM64 pour Windows 10 et 11 avec association de fichiers `.baku`.
- Édition portable autonome (`Baku_Portable.exe`) pour ordinateurs d'université et postes restreints.
- Publication sur le gestionnaire de paquets officiel (`winget install Baku.BakuPDF`).

### 4.2. Distribution pour GNU/Linux
- Paquet universel autonome `AppImage` pour Ubuntu, Fedora, Arch Linux, Debian et openSUSE.
- Paquet natif Debian/Ubuntu (`.deb`) avec dépendances `webkit2gtk-4.1`.
- Prise en charge de Flatpak (Flathub) et paquet AUR (`baku-bin`).

### 4.3. Distribution Avancée macOS
- Installation simplifiée via Homebrew Cask (`brew install --cask baku-pdf`).
- Signature officielle Apple Developer ID et notarisation complète pour un lancement sans blocage Gatekeeper.

### 4.4. Barre Latérale de Navigation du Document
- Volet repliable à gauche avec onglets pour la hiérarchie des titres (Chapitres et Sections), les miniatures de pages et la recherche textuelle.

---

## 5. Plan de Version 1.4.0 (Outils PDF Hors Ligne et Sécurité des Documents)

Le jalon **v1.4.0** introduit des outils autonomes pour les fichiers PDF et le respect de la vie privée :

### 5.1. Signature Numérique et Paraphe Hors Ligne
- Dessin au stylet/curseur ou import de signatures PNG transparentes avec glisser-déposer.
- Signature par lot à coordonnées fixes sur documents volumineux et horodatage local.

### 5.2. Nettoyeur de Métadonnées Confidentielles
- Suppression des noms d'auteurs, identifiants de machine et historiques de modification pour l'évaluation en double aveugle (*Blind Review*).

### 5.3. Organiseur Visuel de Pages PDF
- Grille de vignettes pour réorganiser les pages, suppression de plages de pages et insertion de nouvelles pages ou d'autres PDF.

### 5.4. Filigrane Textuel Hors Ligne
- Application de filigranes diagonaux ou horizontaux avec modèles (`BROUILLON`, `CONFIDENTIEL`, `COPIE OFFICIELLE`) et réglage d'opacité.

### 5.5. Chiffrement et Mot de Passe PDF
- Chiffrement standard AES-256 local avec mot de passe d'ouverture et mot de passe de permissions (restriction d'impression et de copie).

### 5.6. Folio et Numérotation Externe (Bates Numbering)
- Estampillage de numéros de pages sur des documents PDF tiers avec préfixes personnalisés.

---

## 6. Plan de Version 1.5.0 (Sommet de l'Écosystème et Hautes Performances)

Le jalon **v1.5.0** marque l'apogée fonctionnelle de l'écosystème Baku PDF :

### 6.1. Paquets de Modèles Portables (.bakutpl)
- Exportation et importation de modèles personnalisés sous la forme de fichiers empaquetés `.bakutpl`.

### 6.2. Collection Élargie de Modèles Spécifiques
- Formats d'articles de revues scientifiques (colonnes doubles) et actes de colloques IEEE.
- Projets de recherche étudiante, rapports de stage en entreprise et thèses de doctorat.
- Formats administratifs officiels (notes de service, arrêtés et procès-verbaux).

### 6.3. Rendu Virtuel Infini des Feuilles DOM (500+ Pages)
- Affichage exclusif des pages dans le champ visuel (*viewport*) avec une latence de frappe inférieure à 8 ms sur des manuscrits denses.

### 6.4. Moteur d'Exportation PDF Natif en Rust
- Génération vectorielle pure avec bibliothèques Rust (`printpdf`/`lopdf`) et incorporation partielle des polices, réduisant le fichier de 60%.

### 6.5. Mode Sombre et Clair Adaptatif Complet
- Thème sombre à contraste élevé conforme aux directives d'accessibilité WCAG AAA, avec page claire ou inversée et synchronisation avec l'OS.

### 6.6. Mode Sans Distraction (Zen) et Affichage Double Page
- Masquage total de l'interface (`F11` / `Cmd+Shift+F`) et disposition de deux pages côte à côte sur écrans larges.

### 6.7. Importateur Word (.docx) et Exportations Standards
- Analyseur natif Rust de fichiers Word `.docx` avec préservation de mise en page et conversion vers `.docx`, texte brut (`.txt`) et Markdown (`.md`).

### 6.8. Spécification Enrichie du Format .baku v2.0
- Conteneur de pièces jointes binaires compressées sans perte pour les images haute résolution avec rétrocompatibilité totale v1.0.0.

### 6.9. Enregistrement Automatique et Récupération après Incident
- Sauvegarde en arrière-plan toutes les 60 secondes avec invite de restauration en cas d'arrêt imprévu et historique des versions.

---

## 7. Matrice des Priorités Techniques et Résumé des Jalons (v1.1.0 – v1.5.0)

### 7.1. Calendrier des Jalons Progressifs

| Version | Axe Prioritaire | Modules Intégrés | Échéance |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Onglets et Efficacité | Barre d'Onglets Multi-Documents (Section 2.1) et Compresseur PDF (Section 2.2). | Déployé et Publié (16 oct. 2026) |
| **v1.2.0** | Normes Académiques et Typographie | Double Numérotation (Section 3.1), Formules KaTeX (Section 3.2), Tableaux Booktabs (Section 3.3), Règle Verticale (Section 3.4), Orthographe (Section 3.5) et Structure (Section 3.6). | Prochaine Version (Étape 2) |
| **v1.3.0** | Distribution Multiplateforme | Installateurs Windows (`.exe`/portable) (Section 4.1), Linux AppImage/Debian (Section 4.2), macOS (Section 4.3) et Barre Latérale (Section 4.4). | Étape 3 |
| **v1.4.0** | Outils PDF et Sécurité | Signature Numérique (Section 5.1), Nettoyeur Métadonnées (Section 5.2), Organiseur Pages (Section 5.3), Filigrane (Section 5.4), Chiffrement (Section 5.5) et Numérotation Externe (Section 5.6). | Étape 4 |
| **v1.5.0** | Sommet de l'Écosystème | Paquets `.bakutpl` (Section 6.1), Modèles Supplémentaires (Section 6.2), DOM Virtuel 500+ Pages (Section 6.3), Moteur PDF Rust (Section 6.4), Mode Sombre (Section 6.5), Mode Zen (Section 6.6), Import Word (Section 6.7), `.baku` v2.0 (Section 6.8) et Auto-Sauvegarde (Section 6.9). | Sommet du Jalon |

### 7.2. Matrice Technique des Priorités de Développement

| Module Fonctionnel | Composant Cible | Version Cible | Priorité | Complexité Estimée |
| :--- | :--- | :--- | :--- | :--- |
| Barre d'Onglets Multi-Documents | Frontend Editor et Moteur d'État | v1.1.0 | Publié | Moyenne |
| Compresseur de Fichiers PDF Hors Ligne | Backend Rust (`lopdf` / `image`) | v1.1.0 | Publié | Moyenne |
| Double Numérotation des Pages de Thèse | Moteur de Feuilles Frontend | v1.2.0 | Haute | Moyenne |
| Notation Mathématique KaTeX Hors Ligne | Parseur Frontend | v1.2.0 | Haute | Faible |
| Règle Verticale et Retraits de Paragraphe | Moteur de Règle Frontend | v1.2.0 | Moyenne | Moyenne |
| Tableaux Scientifiques Avancés (Booktabs) | Moteur de Feuilles Frontend | v1.2.0 | Moyenne | Moyenne |
| Installateurs Windows (.exe) et Linux (AppImage) | Tauri Bundler et CI | v1.3.0 | Très Haute | Moyenne |
| Barre Latérale de Navigation et Miniatures | UI Frontend et DOM Virtuel | v1.3.0 | Haute | Moyenne |
| Signature Numérique et Paraphe Hors Ligne | Backend Rust et Canvas Overlay | v1.4.0 | Moyenne | Moyenne |
| Nettoyeur de Métadonnées (Double Aveugle) | Backend Rust et Pipeline PDF | v1.4.0 | Moyenne | Faible |
| Organiseur Visuel de Pages | Frontend UI et Backend Rust | v1.4.0 | Moyenne | Moyenne |
| Mode Sombre Adaptatif | Moteur de Thèmes CSS | v1.5.0 | Moyenne | Faible |
| Paquets de Modèles Portables (.bakutpl) | Stockage Frontend et JSON | v1.5.0 | Moyenne | Faible |
| Virtualisation DOM des Feuilles (500+ Pages) | Virtualiseur DOM Frontend | v1.5.0 | Haute | Haute |
| Importateur Word (.docx) Hors Ligne | Parseur Rust DOCX | v1.5.0 / Futur | Futur | Haute |

---

## 8. Contributions Communautaires et Discussions des Fonctionnalités

- Suggestions d'améliorations : [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Signalement d'anomalies : [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guide de collaboration : [CONTRIBUTING.md](../CONTRIBUTING.md)
- Architecture technique : [ARCHITECTURE.md](../ARCHITECTURE.md)
