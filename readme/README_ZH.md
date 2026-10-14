<div align="center">
  <p>
    <strong>语言 / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <a href="README_ES.md">Español</a> |
    <a href="README_FR.md">Français</a> |
    <a href="README_DE.md">Deutsch</a> |
    <a href="README_JA.md">日本語</a> |
    <strong>简体中文</strong> |
    <a href="README_PT.md">Português</a> |
    <a href="README_RU.md">Русский</a> |
    <a href="README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="../src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>标准版式・超轻量・完全离线私密的学术与公文桌面文字处理软件</strong></p>

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

## 目录
- [关于 Baku PDF](#关于-baku-pdf)
- [核心功能](#核心功能)
- [离线 PDF 扩展工具 (100% 离线)](#离线-pdf-扩展工具-100-离线)
- [内置标准模板](#内置标准模板)
- [未来版本发布路线图 (v1.5 及后续)](#未来版本发布路线图-v15-及后续)
- [系统架构与技术栈](#系统架构与技术栈)
- [环境要求与安装运行](#环境要求与安装运行)
- [完整文档](#完整文档)
- [开源许可证](#开源许可证)

---

## 关于 Baku PDF

Baku PDF 是一款专为学术论文、学位毕业论文、科研报告及正式公文编排设计的现代桌面文字处理工具。遵循 **Local-First (本地优先)** 的设计理念，所有文档编辑、页面排版与 PDF 转换均完全在您的本地计算机上离线完成，无需外部服务器，不包含任何遥测分析，亦无云端订阅绑定。

基于 **Tauri** 和 **Rust** 以及纯原生前端技术构建，Baku PDF 极为轻巧（内存占用仅约 50–80 MB），具备秒级启动速度，彻底告别了传统基于 Electron 架构所带来的界面卡顿与庞大体积。

---

## 核心功能

1. **Word 风格快捷主页启动器**:
   - 快速新建空白文档。
   - 原生直接打开 `.baku` 自定义文档文件。
   - 包含微缩排版线条与标准徽章的 Word 风格纸张模板卡片。
   - 快速浏览最近打开的文档记录并直达模板库。

2. **标准模板库与自定义模板制作**:
   - 内置学术学位论文、期刊报告、正式公文、实验总结及 ATS 友好简历等标准范本。
   - 分类筛选与关键词即时检索。
   - 严格标准格式锁定 (*Strict Standard Lock*)，有效防止误调页边距与纸张大小。
   - 支持导出及导入独立的 `.baku` 模板文件。

3. **智能多页与多分节排版系统**:
   - 流畅 60 FPS 的即时分页符功能 (Ctrl/Cmd + Enter)，杜绝输入延迟。
   - 分节符功能 (Ctrl/Cmd + Shift + Enter)，支持章节之间独立重启页码或设置不同页眉页脚。
   - 多样化页码编码：阿拉伯数字、小写/大写罗马数字以及英文字母。
   - 首页不同选项，可在正式封面和标题页隐藏页码。

4. **交互式可视化标尺**:
   - 支持毫米、厘米及英寸单位刻度的水平标尺。
   - 三组可拖拽交互滑块：首行缩进、左侧缩进及右侧边距。
   - 与光标所在段落实时保持精准双向同步。

5. **精密文字排版与样式库**:
   - 预设层级样式：正文、主标题、副标题、标题 1 至 3、引用块及等宽代码。
   - 字号微调（8pt 至 72pt）、行距切换（1.0、1.15、1.5、2.0）与调色板支持。
   - 标准学术页边距（4-4-3-3 厘米、4-3-4-3 厘米、3-3-3-3 厘米、2.54 厘米等）与多规格纸张（A4、Folio/F4、Letter、Legal）。

6. **集成文档实用工具**:
   - **大小写转换**: 句首字母大写、全部小写、全部大写、词首字母大写及大小写反转。
   - **实时统计**: 即时统计字数、字符数（计空格/不计空格）、段落数及预估阅读时间。
   - **表格编辑**: 可视化行列创建网格，浮动工具栏支持快速增删行列及对齐微调。
   - **图像处理**: 本地插入图片、对齐方式调整、等比例缩放与安全移除。
   - **特殊符号**: 快速选择数学公式符号、排版标记及正式字符。

7. **所见即所得 (WYSIWYG) PDF 导出与原生打印**:
   - 像素级还原屏幕排版的 PDF 导出机制。
   - 深度集成操作系统本地打印服务与份数管理。

---

## 离线 PDF 扩展工具 (100% 离线)

无需网络即可在本地快速处理 PDF 文件：
- **合并 PDF (Merge PDF)**: 将多个 PDF 文件合并为一个完整文档并自由调整先后顺序。
- **拆分 PDF (Split PDF)**: 提取特定页面或页面区间（例如：1-3, 5, 8-10）。
- **旋转 PDF (Rotate PDF)**: 修正旋转方向，支持 90度、180度或 270度角度调整。
- **图片转 PDF (Images to PDF)**: 将多张 JPG/PNG 扫描件及图片整齐合成为标准的打印 PDF。

---

## 未来版本发布路线图 (v1.5 及后续)

我们维护一份透明公开的开发路线图，详细说明 v1.5 及未来版本的规划功能、性能调优和跨平台分发进展：

- **多文档标签栏 (Multi-Document Tabs)**：在单个应用窗口内并行打开、编辑和切换多份 `.baku` 文档，状态完全物理隔离，支持顺滑横向滚动。
- **离线 PDF 文件压缩器**：内置常用预设（<500 KB, <1 MB, <2 MB）与图片 DPI 自定义压缩，全程无需上传云端。
- **跨平台原生安装包**：Windows NSIS 安装程序 (`.exe`)、免安装绿色便携版以及 Linux `AppImage` 与 Debian `.deb`。
- **毕业论文双位置页码规则**：章首页页码自动居于底部正中，后续各页自动转至页眉右上角。
- **高级学术离线排版工具**：离线 KaTeX 数学公式、规范三线表（Booktabs）、页面可视化重排整理与电子签名。

查阅完整路线图规范文档：
- [简体中文路线图 (../Update/Update_Baku_zh.md)](../Update/Update_Baku_zh.md)
- [English Roadmap (../Update/Update_Baku_en.md)](../Update/Update_Baku_en.md)
- [多语言路线图目录 (../Update/)](../Update/)
- [历史基线规划文档 (../Update_v1.5_baku.md)](../Update_v1.5_baku.md)

---

## 系统架构与技术栈

- **后端**: Rust 2021 + Tauri Framework v1.6
- **PDF 处理与 I/O**: `lopdf` v0.31 进行底层对象操控，`printpdf` v0.7 负责矢量页面绘制
- **前端**: 原生 HTML5、CSS3 及 Vanilla JavaScript ES6+（无额外运行时框架负担）
- **编辑器核心**: Quill.js 2.0（针对分页符和分节符进行的深度定制版本）
- **数据存储**: 具备原子写入机制 (*atomic write*) 的 `.baku` JSON 文件规范
- **图形加速**: 采用 GPU 独立缓存的平铺图层设计

---

## 环境要求与安装运行

### 前置依赖
- Node.js (16 或更高版本)
- Rust 与 Cargo (最新稳定版编译链)
- 对应操作系统（macOS、Windows 或 Linux）的 Tauri 基础构建环境

### 本地编译
1. 克隆代码仓库：
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. 安装前端依赖包：
   ```bash
   npm install
   ```

3. 启动开发模式：
   ```bash
   npm run tauri dev
   ```

4. 构建安装包及可执行文件：
   ```bash
   npm run tauri build
   ```

---

## 完整文档

为保障开源协作透明度，我们提供如下技术与社区文档：

| 文档 | 说明 |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | 贡献指南、Git 工作流与代码规范。 |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | 架构白皮书、Tauri IPC 通信规范与 `.baku` 规范。 |
| [CHANGELOG.md](../CHANGELOG.md) | 版本演进历史与发布日志。 |
| [SECURITY.md](../SECURITY.md) | 安全策略与漏洞负责任披露通道。 |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | 社区行为准则与交流规范。 |
| [版本路线图 (v1.5+)](../Update/Update_Baku_zh.md) | 多语言路线图及未来版本规划功能规范。 |

---

## 开源许可证

本项目基于 MIT 许可证开源。详情请查阅 [LICENSE](../LICENSE) 文件。
