<div align="center">
  <p>
    <strong>言語 / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <a href="README_ES.md">Español</a> |
    <a href="README_FR.md">Français</a> |
    <a href="README_DE.md">Deutsch</a> |
    <strong>日本語</strong> |
    <a href="README_ZH.md">简体中文</a> |
    <a href="README_PT.md">Português</a> |
    <a href="README_RU.md">Русский</a> |
    <a href="README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="../src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>標準規格準拠・超軽量・完全ローカル動作の学術・公用デスクトップ文書作成ツール</strong></p>

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

## 目次
- [Baku PDF について](#baku-pdf-について)
- [主な機能](#主な機能)
- [オフライン PDF 追加ツール (完全オフライン)](#オフライン-pdf-追加ツール-完全オフライン)
- [今後のリリースロードマップ (v1.2.0 – v1.5.0)](#今後のリリースロードマップ-v120--v150)
- [公式リリーススケジュール (v1.1.0 – v1.5.0)](#公式リリーススケジュール-v110--v150)
- [アーキテクチャと技術構成](#アーキテクチャと技術構成)
- [動作要件とインストール方法](#動作要件とインストール方法)
- [各種ドキュメント](#各種ドキュメント)
- [ライセンス](#ライセンス)

---

## Baku PDF について

Baku PDF は、学術論文、卒業論文、修士論文、公的公文書の厳格な書式規定に準拠して執筆するために設計された最新のデスクトップ用ワードプロセッサです。**ローカルファースト (Local-First)** の理念に基づき、文書作成、ページレンダリング、PDF操作のすべてが外部サーバーを介さずにお手元のコンピュータ上で100%オフライン処理されます。データ収集やクラウド契約は一切不要です。

**Tauri** と **Rust**、および純粋な Vanilla JavaScript フロントエンドで構築されており、メモリ消費量はわずか約 50～80 MB と超軽量で、起動も一瞬です。Electron 製エディタ特有の動作遅延やもたつきがありません。

---

## 主な機能

1. **Word スタイルのクイック起動ホーム画面**:
   - 空白文書からの即時執筆開始。
   - 独自ファイル形式 `.baku` の直接読み込み。
   - レイアウトプレビュー線と公式バッジが付いた Microsoft Word 風の用紙ミニチュアカード。
   - 最近使用した文書の履歴とテンプレートギャラリーへの即時アクセス。

2. **標準テンプレートギャラリーと独自テンプレート作成**:
   - 論文、学術報告書、公用文、実験レポート、ATS対応履歴書の標準書式を収録。
   - カテゴリ検索とキーワード検索機能。
   - 余白や用紙サイズの意図しない変更を防ぐ厳格標準ロック (*Strict Standard Lock*)。
   - 独自 `.baku` テンプレートファイルのインポート・エクスポート対応。

3. **複数文書タブバー (v1.1.0 新機能)**:
   - 1つのウィンドウ内で複数の `.baku` 文書を同時並行で開き、編集・切り替えが可能。
   - 各タブごとに独立した Undo/Redo 履歴とメモリ内文書状態を保持。
   - 未保存変更ドット表示、新規タブ追加ボタン (+)、閉じるボタン (x)、水平オーバースクロール対応。
   - 充実したキーボードショートカット (`Option/Alt + [1-9]`, `Ctrl + Tab`, `Cmd/Ctrl + W`)。

4. **高度なマルチページ・マルチセクション管理**:
   - 入力遅延のない 60 FPS の改ページ機能 (Ctrl/Cmd + Enter)。
   - 章ごとにページ番号の再設定や書式変更が可能なセクション区切り機能 (Ctrl/Cmd + Shift + Enter)。
   - 算用数字、ローマ数字 (小文字・大文字)、英字など多彩なページ番号形式。
   - 表紙・標題紙で番号を非表示にする先頭ページ別指定オプション。

5. **インタラクティブなビジュアルルーラー (定規)**:
   - ミリ、センチ、インチ表示に対応した水平定規。
   - 3つのドラッグ可能なマーカー：1行目インデント、左インデント、右余白。
   - 現在選択されている段落とリアルタイムに同期。

6. **精密なタイポグラフィと書式設定**:
   - スタイルパレット：標準、文書タイトル、副題、見出し 1～3、引用、等幅コード。
   - 文字サイズ (8pt～72pt)、行間設定 (1.0、1.15、1.5、2.0)、文字色・背景色指定。
   - 標準余白プリセット (4-4-3-3 cm、4-3-4-3 cm、3-3-3-3 cm、標準 2.54 cm) および用紙選択 (A4、Folio/F4、レター、リーガル)。

7. **充実した文書作成支援ツール**:
   - **大文字・小文字変換**: 先頭のみ大文字、すべて小文字、すべて大文字、単語先頭大文字、大文字小文字反転。
   - **リアルタイム文書統計**: 単語数、文字数 (空白あり・なし)、段落数、推定読了時間を自動算出。
   - **表作成エディタ**: 行・列の追加・削除やセル内文字配置ができるフローティングバー付き。
   - **画像管理**: ローカル画像の挿入、配置、縦横比を保持した伸縮、安全な削除。
   - **記号挿入ダイアログ**: 特殊記号や数学記号の素早い入力。

8. **WYSIWYG PDF 出力とネイティブ印刷**:
   - 画面上の用紙余白と寸分違わぬ高精度なピクセル完全 PDF 生成。
   - OS ローカルのプリンタ管理機構と直結したネイティブ印刷ダイアログ。

9. **滑らかなキャンバススクロールと柔軟なサイドバーUI (v1.1.0 新機能)**:
   - カクつきのない滑らかなキャンバススクロール補間。
   - 折りたたみサイドバーの垂直スタック配置（上部アイコン・下部ラベル）および設定ボタンの左下配置。
   - サイドバーの開閉状態を永続保持。

---

## オフライン PDF 追加ツール (完全オフライン)

クラウドに頼らず、手元で完結する独立型 PDF ツールを搭載しています：
- **PDF 圧縮 (Compress PDF) [v1.1.0 新機能]**: 3つのプリセット（標準、最大、軽量）でサーバー通信なしにPDF容量を軽量化。
- **PDF の結合 (Merge PDF)**: 複数の PDF ファイルを任意の順序で1つのファイルに統合。
- **PDF の分割 (Split PDF)**: 指定ページまたはページ範囲を抽出して個別ファイルに保存。
- **PDF の回転 (Rotate PDF)**: ページの向きを 90度、180度、270度単位で修正。
- **画像の PDF 化 (Images to PDF)**: JPG/PNG 画像をまとめて高品質な印刷用 PDF に変換。

---

## 今後のリリースロードマップ (v1.2.0 – v1.5.0)

**Baku PDF v1.1.0**（複数文書タブバーおよびオフラインPDF圧縮ツール）の正式リリースに伴い、今後のロードマップは v1.2.0 から v1.5.0 の段階に移行します：

- **マルチプラットフォームインストーラー**: Windows NSISインストーラー（`.exe`）、ポータブル版、Linux `AppImage` および Debian `.deb`。
- **論文用2ポジションページ番号規則**: 各章の第1ページは下部中央、継続ページは右上隅へ自動切替配置。
- **高度なオフライン学術ツール**: KaTeX数式入力、Booktabs形式の学術テーブル、視覚的ページ並べ替え、電子署名。

詳細なロードマップ仕様書：
- [日本語ロードマップ (../Update/Update_Baku_ja.md)](../Update/Update_Baku_ja.md)
- [English Roadmap (../Update/Update_Baku_en.md)](../Update/Update_Baku_en.md)
- [多言語ロードマップディレクトリ (../Update/)](../Update/)

---

## 公式リリーススケジュール (v1.1.0 – v1.5.0)

ソフトウェアの動作安定性と綿密な品質検証を両立するため、Baku PDF は月次（各マイナーバージョン約4週間）の計画的なリリースサイクルを採用しています：

| リリースバージョン | 開発重点項目 | 目標リリース日 | ステータス |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | 複数文書タブバーおよびオフラインPDF圧縮ツール | **2026年10月16日** | 実装完了・リリース済み |
| **v1.2.0** | 論文ページ番号規則、KaTeX数式入力、学術テーブル | **2026年11月14日 – 16日** | 開発中 |
| **v1.3.0** | Windows (.exe)、Linux (.deb/AppImage)、文書アウトライン | **2026年12月14日 – 16日** | 計画中 |
| **v1.4.0** | 電子署名、PDFパスワード保護、ページ整理ユーティリティ | **2027年1月20日 – 25日** | 計画中 |
| **v1.5.0** | 500+ページDOM仮想化、ダークモード、Word (.docx) 変換 | **2027年3月1日 – 5日** | 主要マイルストーン |

---

## アーキテクチャと技術構成

- **バックエンド**: Rust 2021 + Tauri Framework v1.6
- **PDF 処理エンジン**: `lopdf` v0.31 (内部オブジェクト操作) + `printpdf` v0.7 (描画)
- **フロントエンド**: HTML5、CSS3、Vanilla JavaScript ES6+ (外部UIフレームワーク不使用)
- **エディタコア**: Quill.js 2.0 (改ページ・セクション区切り用の独自拡張ビルド)
- **ファイル保存形式**: 整合性を担保するアトミック書き込み (*atomic write*) を備えた `.baku` JSON 形式
- **描画高速化**: GPU キャッシュを利用した独立コンポジット用紙レイヤー

---

## 動作要件とインストール方法

### 必要環境
- Node.js (バージョン 16 以上)
- Rust および Cargo (最新の安定版ツールチェーン)
- 各 OS 用の Tauri ビルド依存パッケージ (macOS、Windows、または Linux)

### 開発・実行手順
1. リポジトリをクローン：
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. 依存パッケージをインストール：
   ```bash
   npm install
   ```

3. 開発モードで起動：
   ```bash
   npm run tauri dev
   ```

4. 配布用バイナリおよびインストーラをビルド：
   ```bash
   npm run tauri build
   ```

---

## 各種ドキュメント

開発への参加と運用の透明性を高めるため、以下のドキュメントを整備しています：

| ドキュメント | 概要 |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | コントリビューション指針、Git 開発フロー、コーディング基準。 |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | 技術仕様、Tauri IPC 通信構造、`.baku` ファイル構造。 |
| [CHANGELOG.md](../CHANGELOG.md) | 更新履歴およびリリースノート。 |
| [SECURITY.md](../SECURITY.md) | セキュリティポリシーと脆弱性の責任ある報告窓口。 |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | コミュニティ行動規範と健全な運営基準。 |
| [ロードマップ (v1.1.0 – v1.5.0)](../Update/Update_Baku_ja.md) | 多言語ロードマップおよび将来バージョンの予定機能仕様書。 |

---

## ライセンス

本プロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](../LICENSE) をご確認ください。
