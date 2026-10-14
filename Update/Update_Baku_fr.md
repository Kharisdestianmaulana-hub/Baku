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

# Feuille de Route Baku PDF Version 1.5 (Plan de Développement et Fonctionnalités)

Ce document dresse le bilan des fonctionnalités initiales de **Baku PDF v1.0.0** et présente l'ensemble des nouvelles fonctionnalités planifiées, des optimisations de performances et des extensions de modules pour la version **Baku PDF v1.5**. Cette mise à jour est axée sur la rédaction académique avancée, l'ajout d'outils de manipulation de PDF hors ligne, le support multiplateforme complet (Windows, macOS, Linux) et le rendu ultra-rapide des documents volumineux.

Principes fondamentaux préservés :
- **100% Hors Ligne (Offline-First)** : Tous les traitements sont exécutés localement sur la machine de l'utilisateur sans aucun serveur distant.
- **Confidentialité Totale** : Aucune télémétrie, aucun traceur ni transmission de données externe.
- **Faible Consommation de Ressources** : Lancement instantané et empreinte mémoire minimale (~50–80 Mo de RAM).
- **Design Épuré Flat 2D** : Interface claire, fonctionnelle et sans distraction.
- **Standardisation Rigoureuse** : Conformité aux normes de mise en page académiques et administratives.

---

## Table des Matières

1. [État des Fonctionnalités Disponibles (Base v1.0.0)](#1-état-des-fonctionnalités-disponibles-base-v100)
2. [Éditeur de Documents et Typographie Scientifique Avancée](#2-éditeur-de-documents-et-typographie-scientifique-avancée)
3. [Structuration Automatisée des Documents Académiques](#3-structuration-automatisée-des-documents-académiques)
4. [Extension des Outils PDF Hors Ligne](#4-extension-des-outils-pdf-hors-ligne)
5. [Collection Élargie de Modèles Standards](#5-collection-élargie-de-modèles-standards)
6. [Support Multiplateforme et Distribution des Binaires](#6-support-multiplateforme-et-distribution-des-binaires)
7. [Architecture Interne, Performances et Documents Volumineux](#7-architecture-interne-performances-et-documents-volumineux)
8. [Interface Utilisateur, Navigation et Accessibilité](#8-interface-utilisateur-navigation-et-accessibilité)
9. [Interopérabilité des Formats et Compatibilité des Fichiers](#9-interopérabilité-des-formats-et-compatibilité-des-fichiers)
10. [Sécurité des Documents et Nettoyage des Métadonnées](#10-sécurité-des-documents-et-nettoyage-des-métadonnées)
11. [Matrice des Priorités de Développement v1.5](#11-matrice-des-priorités-de-développement-v15)

---

## 1. État des Fonctionnalités Disponibles (Base v1.0.0)

Après audit approfondi du code source, les modules suivants **sont intégralement implémentés dans la version 1.0.0** :

| Module de Fonction | Statut v1.0.0 | Détails d'Implémentation |
| :--- | :--- | :--- |
| **Règle Horizontale Interactive** | Implémenté | Règle supérieure en centimètres avec curseurs de marges (`ruler-marker-left`, `ruler-marker-right`), repères d'alignement et bouton d'affichage dans le ruban et le menu Affichage. |
| **8 Modèles Standards Intégrés** | Implémenté | Thèse complète de 5 pages, Article Scientifique, Rapport de Laboratoire, Lettre Administrative Officielle, **Lettre de Motivation**, Compte-Rendu de Réunion, **CV ATS Professionnel** et Note Interne. |
| **Système de Création de Modèles Personnalisés** | Implémenté | Enregistrer comme Modèle (`#action-save-as-template`), Créer un Nouveau Modèle (`#btn-create-new-template`) et filtre des modèles personnels dans la galerie. |
| **Numérotation des Pages et Sauts de Section** | Implémenté | Modal de numérotation (`#modal-page-number`) en chiffres arabes (`1, 2, 3`), romains minuscules (`i, ii, iii`), romains majuscules (`I, II, III`) et insertion de sauts de section. |
| **En-tête et Pied de Page Distincts en Première Page** | Implémenté | Option Première Page Distincte (`diffFirst`) pour isoler ou masquer l'en-tête de page de garde. |
| **Fenêtre Modale de Liens Hypertextes** | Implémenté | Modal plat 2D (`#modal-link-overlay`) avec texte d'affichage, champ URL, suppression de lien, raccourci `Ctrl+K` / `Cmd+K` et ouverture par `Ctrl/Cmd + Clic`. |
| **Commandes de Zoom et d'Échelle** | Implémenté | Zoom avant, zoom arrière, réinitialisation à 100%, curseur dans la barre d'état et échelle d'affichage dans les Préférences. |
| **4 Outils PDF Hors Ligne** | Implémenté | Fusionner PDF, Diviser PDF, Pivoter les Pages et Images vers PDF via les bibliothèques Rust `lopdf` et `image`. |
| **Installateur Universel DMG pour macOS** | Implémenté | Paquet binaire universel officiel (`x86_64` Intel + `arm64` Apple Silicon M1-M4) (`Baku_1.0.0_Universal_Installer.dmg`) avec protection d'exécution temporaire (`check_running_from_dmg`). |

---

## 2. Éditeur de Documents et Typographie Scientifique Avancée

### 2.1. Notation Mathématique KaTeX Hors Ligne
- Intégration du moteur KaTeX embarqué à 100% sans connexion réseau.
- Insertion interactive de formules en ligne et en blocs équations centrés.
- Numérotation automatique des équations alignée sur la marge droite selon le chapitre : `(1.1)`, `(1.2)`.
- Prise en charge des matrices, du calcul différentiel et des symboles de physique et chimie.

### 2.2. Extension de la Règle Interactive : Retraits et Règle Verticale
- Nouveaux repères sur la règle horizontale :
  - **Repère de Retrait de Première Ligne** : Définit l'alinéa du paragraphe (ex. 1 cm ou 1,27 cm).
  - **Repère de Retrait Suspendu (Hanging Indent)** : Standard pour les références bibliographiques (APA, IEEE, Chicago).
- **Règle Verticale** sur le bord gauche :
  - Mesure exacte de la hauteur de page en centimètres.
  - Ajustement direct des marges supérieure et inférieure par glisser-déposer sur le canevas.

### 2.3. Tableaux Scientifiques Avancés
- Fusion de cellules horizontale et verticale.
- Style de bordures pour publications scientifiques (Style Booktabs) : aucun trait vertical, bordures horizontales contrastées.
- Alignement sur la virgule décimale pour les données chiffrées.
- Répétition automatique de la ligne d'en-tête lors des sauts de page.
- Numérotation séquentielle des légendes : `Tableau 1.1 : Titre du tableau`.

### 2.4. Correcteur Orthographique et Césure Hors Ligne
- Dictionnaire local intégré pour repérer les fautes de frappe.
- Soulignement rouge discret pour les termes inconnus.
- Suggestions contextuelles via le menu clic droit.
- Césure automatique pour texte justifié garantissant un espacement homogène entre les mots.

---

## 3. Structuration Automatisée des Documents Académiques

### 3.1. Règles de Double Numérotation des Pages de Thèse
- Automatisation des normes universitaires :
  - Première page de chaque chapitre (comportant le titre) numérotée en **bas au centre**.
  - Pages suivantes du même chapitre numérotées en **haut à droite**.
- Numérotation de section indépendante sans modifier les sections antérieures.

### 3.2. Table des Matières Automatique et Dynamique
- Génération instantanée selon la hiérarchie des titres (Titre 1, Titre 2, Titre 3).
- Points de suite automatiques reliant les intitulés aux numéros de page.
- Bouton de mise à jour globale en un clic lors des révisions textuelles.

### 3.3. Liste Dynamique des Tableaux et Figures
- Détection continue des légendes d'illustrations et de tableaux.
- Production automatisée de listes de figures et tableaux synchronisées en temps réel.

### 3.4. Gestionnaire de Citations et Bibliographie Hors Ligne
- Saisie manuelle de références ou importation de fichiers BibTeX (`.bib`) et RIS.
- Formatage automatisé des citations selon les normes APA 7e édition, IEEE, Harvard et Vancouver.
- Génération de la bibliographie finale ordonnée avec retrait suspendu standard.

---

## 4. Extension des Outils PDF Hors Ligne

En complément des 4 outils existants, la version 1.5 ajoute 6 utilitaires hors ligne supplémentaires :

### 4.1. Compresseur de Fichiers PDF Hors Ligne
- Réduction locale de la taille des PDF optimisée en Rust sans compromettre la netteté du texte.
- Préréglages immédiats : moins de 500 Ko, moins de 1 Mo, moins de 2 Mo et réglage manuel de la résolution DPI.
- Comparaison visuelle de taille avant enregistrement.

### 4.2. Signature Numérique et Paraphe Hors Ligne
- Tracé direct de signature avec curseur/stylet ou importation d'image PNG transparente.
- Positionnement avec aperçu dynamique sur n'importe quelle page.
- Signature par coordonnées par lot sur documents multi-pages.
- Horodatage et paraphes hors ligne.

### 4.3. Protection par Mot de Passe et Chiffrement AES-256
- Mot de passe d'ouverture avec chiffrement standard local AES-256.
- Mot de passe d'autorisations pour restreindre l'impression, la copie de texte et l'annotation.
- Déverrouillage et suppression de mot de passe pour les propriétaires légitimes.

### 4.4. Gestionnaire Visuel de Pages
- Grille de vignettes miniatures pour chaque page du document.
- Réorganisation des pages par glisser-déposer.
- Suppression de pages uniques ou de plages sélectionnées.
- Insertion de pages vierges et intégration de pages issues d'autres PDF.

### 4.5. Numérotation Bates et Tamponneur de PDF Externes
- Ajout de pagination sur des PDF externes non numérotés.
- Emplacement configurable : haut droit, bas droit ou bas centre.
- Préfixe personnalisable (ex. : `Annexe Page 1 sur 10`, `Pièce 1`).

### 4.6. Outil de Filigrane Hors Ligne
- Filigrane diagonal (45 degrés) ou horizontal.
- Textes rapides : `BROUILLON`, `CONFIDENTIEL`, `COPIE OFFICIELLE`, `SPÉCIMEN`.
- Réglage de l'opacité, de la police, de la couleur et de la plage de pages.

---

## 5. Collection Élargie de Modèles Standards

### 5.1. Publications Scientifiques et Revues
- **Article de Revue Académique (Mise en Page Double Colonne)** : En-tête pleine largeur, résumé bilingue et structure IMRAD formelle.
- **Article de Conférence IEEE** : Marges et typographie normalisées avec figures en double colonne.

### 5.2. Gestion Universitaire et Projets de Recherche
- **Dossier de Candidature à une Bourse Étudiante** : Fiche de validation, budget prévisionnel et calendrier de réalisation.
- **Rapport de Stage Professionnel** : Journal hebdomadaire d'activités et bilan d'évaluation.
- **Projet de Thèse de Master et Doctorat** : Cadre méthodologique détaillé et hypothèses de recherche.

### 5.3. Administration Publique et Entreprise
- **Note de Service et Ordre de Mission** : Format administratif institutionnel avec références légales.
- **Arrêté Officiel et Décision Administrative** : Structure formelle Vu, Considérant et Décide.
- **Procès-Verbal de Livraison et Réception** : Modèle contractuel avec clauses de certification.

### 5.4. Exportation et Importation de Paquets de Modèles (.bakutpl)
- Partage de modèles personnalisés sous forme de fichiers portables `.bakutpl`.
- Importation directe dans la galerie de modèles locale d'autres postes de travail.

---

## 6. Support Multiplateforme et Distribution des Binaires

### 6.1. Distribution Windows
- **Installateur Guidé NSIS (`.exe`)** : Paquets 64 bits (`x64`) et ARM64 pour Windows 10 et 11 avec association de fichiers `.baku`.
- **Édition Portable Autonome (`Baku_Portable.exe`)** : Exécution directe sans droits d'administrateur.
- **Gestionnaire de Paquets Microsoft (`winget`)** : Publication dans le catalogue officiel `winget-pkgs`.

### 6.2. Distribution Linux
- **Paquet Universel `AppImage`** : Exécutable unique sans dépendances externes complexes.
- **Paquet Debian / Ubuntu (`.deb`)** : Binaire natif avec dépendances intégrées.
- **Flathub et Arch User Repository (AUR)** : Manifeste Flatpak et paquet communautaire `baku-bin` dans l'AUR.

### 6.3. Distribution Avancée macOS
- **Homebrew Cask** : Installation en ligne de commande (`brew install --cask baku-pdf`).
- **Signature de Code et Notarisation Apple** : Certificat Apple Developer ID pour ouverture directe sans blocage de Gatekeeper.

---

## 7. Architecture Interne, Performances et Documents Volumineux

### 7.1. Rendu Virtuel des Pages dans le DOM
- Affichage restreint aux seules pages présentes dans le champ visuel de l'écran plus un tampon de 1 à 2 pages.
- Navigation fluide sur des manuscrits de plus de 500 pages tout en conservant une consommation de mémoire stable.
- Latence de frappe inférieure à 8 millisecondes.

### 7.2. Moteur d'Exportation PDF Vectoriel Natif en Rust
- Exportation basée sur des bibliothèques Rust (`printpdf` et `lopdf`) associées au composant WebView.
- Génération de texte vectoriel sélectionnable avec réduction de taille jusqu'à 60%.
- Sous-ensemble de polices (*Font Subsetting*) automatique n'embarquant que les glyphes utilisés.

### 7.3. Sauvegarde Automatique Toutes les 60 Secondes et Récupération d'Urgence
- Sauvegardes locales régulières dans un stockage temporaire dédié.
- Fenêtre de restauration immédiate lors de la réouverture consécutive à une coupure imprévue.
- Historique des instantanés locaux pour revenir aux versions de 15, 30 ou 60 minutes antérieures.

---

## 8. Interface Utilisateur, Navigation et Accessibilité

### 8.1. Volet Latéral de Navigation et Plan
- Panneau escamotable à gauche affichant l'arborescence des chapitres, les vignettes de pages et les résultats de recherche contextuelle.

### 8.2. Thèmes Sombre et Clair Adaptatifs
- Vrai thème sombre haute lisibilité conforme aux normes d'accessibilité WCAG AAA.
- Option feuille physique blanche sur fond sombre ou inversion nocturne de lecture.
- Bascule automatique selon le thème du système d'exploitation.

### 8.3. Mode Zen Sans Distraction
- Masquage instantané de tous les bandeaux et menus via le raccourci `F11` ou `Cmd+Shift+F`.

### 8.4. Affichage en Double Page
- Visualisation de deux pages côte à côte sur les écrans larges.

### 8.5. Barre d'Onglets Multi-Documents (Multi-Document Tab Bar)
- **Objectif et Confort de Travail** :
  - Supprime les allers-retours entre fenêtres du système (Alt+Tab / Cmd+`) lors de la rédaction nécessitant plusieurs documents de travail simultanés.
  - Ouverture et modification de plusieurs fichiers `.baku` au sein d'une seule fenêtre d'application.
- **Positionnement Ergonomique** :
  - Située stratégiquement **sous le ruban d'outils et directement au-dessus de la règle et du canevas**.
  - Respecte le sens naturel de travail : choisir les outils dans le ruban -> sélectionner le document dans les onglets -> rédiger sur la feuille.
  - Exploite toute la largeur de l'écran sans encombrer la barre d'état inférieure.
- **Design Visuel Flat 2D** :
  - Profil compact et épuré (hauteur de 30 à 32 px).
  - **Onglet Actif** : Fond blanc (`#FFFFFF`) uni avec le document, liseré supérieur bleu distinctif (`#2563EB`), texte en gras, bouton de fermeture `x` et indicateur de modifications en attente.
  - **Onglet Inactif** : Gris neutre (`#F3F2F1`) avec délimitations soignées.
  - Raccourcissement par points de suspension pour les titres longs et bouton `+` pour ouvrir de nouveaux documents.
- **Défilement Horizontal et Navigation** :
  - Affichage proportionnel pour 1 à 5 documents ouverts.
  - Défilement horizontal fluide au-delà de 5 onglets avec boutons fléchés `<` et `>` sur les bords.
- **Isolation d'État et Sécurité des Données** :
  - Modèle Delta JSON distinct par onglet conservant la position du curseur et le niveau de défilement exact.
  - Historiques d'Annulation (`Ctrl/Cmd+Z`) et Rétablissement (`Ctrl+Y` / `Cmd+Shift+Z`) étanches d'un document à l'autre.
  - Indicateur visuel de modifications non enregistrées et confirmation avant fermeture.
- **Optimisation de la RAM** :
  - Les documents en arrière-plan sont maintenus sous forme de structures JSON légères sans surcharger l'arbre DOM.

---

## 9. Interopérabilité des Formats et Compatibilité des Fichiers

### 9.1. Importation et Conversion de Fichiers Word (.docx) Hors Ligne
- Analyseur natif en Rust pour charger les fichiers Word en préservant le formatage de base.

### 9.2. Exportation vers Formats Courants
- Export vers `.docx`, texte brut (`.txt`) et Markdown académique (`.md`).

### 9.3. Spécification du Format Natif .baku v2.0
- Conteneur de pièces jointes binaires compressées pour illustrations haute définition.
- Rétrocompatibilité totale avec les fichiers créés en version 1.0.0.

---

## 10. Sécurité des Documents et Nettoyage des Métadonnées

### 10.1. Nettoyeur de Métadonnées
- Suppression des noms d'auteurs, des chemins de dossiers et des horodatages internes pour évaluation en double aveugle (*Blind Review*).

### 10.2. Verrouillage en Lecture Seule
- Protection des documents approuvés contre les modifications accidentelles.

---

## 11. Matrice des Priorités de Développement v1.5

| Module de Fonction | Composant Cible | Priorité | Complexité Estimée |
| :--- | :--- | :--- | :--- |
| Barre d'Onglets Multi-Documents | Frontend Éditeur et Moteur d'État | Très Haute | Moyenne |
| Compresseur de Fichiers PDF Hors Ligne | Backend Rust (`lopdf` / `image`) | Très Haute | Moyenne |
| Installateurs Windows (.exe) et Linux (AppImage) | Tauri Bundler et Flux CI | Très Haute | Moyenne |
| Double Numérotation des Pages de Thèse | Moteur de Pages Frontend | Haute | Moyenne |
| Volet Latéral de Navigation et Vignettes | UI Frontend et Virtualiseur DOM | Haute | Moyenne |
| Notation Mathématique KaTeX Hors Ligne | Moteur d'Analyse Frontend | Haute | Faible |
| Règle Verticale et Retraits de Paragraphes | Moteur de Règle Frontend | Moyenne | Moyenne |
| Gestionnaire de Citations et Bibliographie | Bibliothèque de Données Frontend | Moyenne | Moyenne |
| Signature Numérique et Paraphe Hors Ligne | Backend Rust et Calque Canevas | Moyenne | Moyenne |
| Thèmes Adaptatifs Sombre et Clair | Moteur de Thèmes CSS | Moyenne | Faible |
| Importation Word (.docx) Hors Ligne | Analyseur Rust DOCX | Future | Élevée |

---

## Échanges Communautaires et Contributions

- Suggestions de fonctionnalités : [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Signalement de bugs : [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guide de contribution : [CONTRIBUTING.md](../CONTRIBUTING.md)
- Architecture technique : [ARCHITECTURE.md](../ARCHITECTURE.md)\n