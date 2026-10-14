<div align="center">
  <p>
    <strong>Idiomas / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <a href="README_ES.md">Español</a> |
    <a href="README_FR.md">Français</a> |
    <a href="README_DE.md">Deutsch</a> |
    <a href="README_JA.md">日本語</a> |
    <a href="README_ZH.md">简体中文</a> |
    <strong>Português</strong> |
    <a href="README_RU.md">Русский</a> |
    <a href="README_AR.md">العربية</a>
  </p>
  <hr />
  <img src="../src/logo.png" alt="Baku PDF Logo" width="128" height="128" />
  <h1>Baku PDF</h1>
  <p><strong>Processador de Texto Padronizado, Ultraleve e 100% Local para Documentos Acadêmicos e Oficiais</strong></p>

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

## Índice
- [Sobre o Baku PDF](#sobre-o-baku-pdf)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Ferramentas Extras de PDF (100% Offline)](#ferramentas-extras-de-pdf-100-offline)
- [Modelos Padronizados Integrados](#modelos-padronizados-integrados)
- [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
- [Requisitos e Instalação](#requisitos-e-instalação)
- [Documentação Completa](#documentação-completa)
- [Licença](#licença)

---

## Sobre o Baku PDF

O Baku PDF é um processador de texto moderno para desktop, criado especificamente para a elaboração de trabalhos acadêmicos, teses e correspondências formais que exigem rígidos padrões de formatação. Alicerçado na filosofia **local-first**, todo o processamento de texto, renderização de páginas e manipulação de arquivos PDF acontecem de forma 100% offline em sua máquina, sem servidores externos, rastreamento ou assinaturas em nuvem.

Desenvolvido com **Tauri** e **Rust** e contando com uma interface em JavaScript Vanilla, o Baku PDF é extremamente leve (utiliza entre 50 e 80 MB de memória RAM), inicia quase que instantaneamente e elimina a lentidão comum em editores baseados em Electron.

---

## Principais Funcionalidades

1. **Tela Inicial Rápida no Estilo Word**:
   - Início ágil com documento em branco.
   - Abertura nativa de arquivos `.baku`.
   - Miniaturas de modelos com visualização prévia de margens e selos oficiais.
   - Histórico de documentos recentes e acesso direto à galeria completa de modelos.

2. **Galeria de Modelos e Criador Personalizado**:
   - Modelos prontos para teses, artigos científicos, ofícios, relatórios práticos e currículos compatíveis com ATS.
   - Filtro por categorias e busca rápida por palavras-chave.
   - Bloqueio de padrão estrito (*Strict Standard Lock*) para evitar modificações acidentais de margens e tamanhos de folha.
   - Exportação e importação de modelos no formato `.baku`.

3. **Mecanismo Inteligente de Múltiplas Páginas e Seções**:
   - Quebra de Página (*Page Break*, Ctrl/Cmd + Enter) suave a 60 FPS.
   - Quebra de Seção (*Section Break*, Ctrl/Cmd + Shift + Enter) para reiniciar a numeração de páginas ou alterar cabeçalhos entre capítulos.
   - Vários formatos de numeração: arábicos, romanos (minúsculos/maiúsculos) e letras.
   - Opção de primeira página diferente para capas e páginas de rosto.

4. **Régua Visual Interativa**:
   - Régua horizontal com unidades em milímetros, centímetros e polegadas.
   - Três marcadores interativos: recuo da primeira linha, recuo esquerdo e margem direita.
   - Sincronização em tempo real com o parágrafo selecionado.

5. **Tipografia Rigorosa e Estilos Predefinidos**:
   - Estilos rápidos: Normal, Título do Documento, Subtítulo, Títulos 1 a 3, Citação e Código monoespaçado.
   - Seletor de tamanho de fonte (8pt a 72pt), entrelinhas (1.0, 1.15, 1.5, 2.0) e cores.
   - Predefinições de margens acadêmicas (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal) e papéis (A4, Folio/F4, Carta, Ofício).

6. **Utilitários Integrados**:
   - **Alternar Maiúsculas/Minúsculas**: Primeira letra da frase, minúsculas, MAIÚSCULAS, Primeira Letra Maiúscula e Inverter.
   - **Estatísticas em Tempo Real**: Contagem de palavras, caracteres (com/sem espaços), parágrafos e tempo estimado de leitura.
   - **Editor de Tabelas**: Criação visual de tabelas com barra flutuante para adicionar/remover linhas e colunas.
   - **Inserção de Imagens**: Alinhamento, redimensionamento proporcional e exclusão segura.
   - **Seletor de Símbolos**: Símbolos tipográficos, matemáticos e caracteres especiais.

7. **Exportação WYSIWYG e Impressão Nativa**:
   - Geração de PDF com fidelidade idêntica ao que é exibido em tela.
   - Diálogo de impressão conectado aos drivers de impressão locais do sistema.

---

## Ferramentas Extras de PDF (100% Offline)

O Baku PDF inclui ferramentas complementares para manipular arquivos PDF localmente:
- **Juntar PDF (Merge PDF)**: Reúna múltiplos arquivos PDF em um único documento organizado.
- **Dividir PDF (Split PDF)**: Extraia páginas ou intervalos específicos (ex: 1-3, 5, 8-10).
- **Girar PDF (Rotate PDF)**: Corrija a rotação das páginas em 90, 180 ou 270 graus.
- **Imagens para PDF (Images to PDF)**: Converta arquivos JPG/PNG em um documento PDF unificado.

---

## Arquitetura e Tecnologias

- **Backend**: Rust 2021 com o framework Tauri v1.6.
- **Manipulação de PDF e E/S**: `lopdf` v0.31 para estruturas internas e `printpdf` v0.7 para desenho vetorial.
- **Frontend**: HTML5, CSS3 puro e JavaScript Vanilla ES6+ (sem frameworks pesados).
- **Núcleo do Editor**: Quill.js 2.0 (compilação customizada com suporte a quebras de página e seção).
- **Formato de Arquivo**: Formato JSON encapsulado `.baku` com escrita atômica (*atomic write*).
- **Aceleração Gráfica**: Folhas de papel processadas como camadas compostas na GPU.

---

## Requisitos e Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Rust e Cargo (canal estável atualizado)
- Dependências de compilação do Tauri para seu sistema operacional (macOS, Windows ou Linux)

### Execução Local
1. Clone o repositório:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o modo de desenvolvimento:
   ```bash
   npm run tauri dev
   ```

4. Compile o pacote final de instalação:
   ```bash
   npm run tauri build
   ```

---

## Documentação Completa

Disponibilizamos documentação técnica e diretrizes comunitárias para apoiar o desenvolvimento aberto:

| Documento | Descrição |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Guia de contribuição, fluxo de trabalho Git e boas práticas. |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Especificações de arquitetura, fluxo IPC e formato `.baku`. |
| [CHANGELOG.md](../CHANGELOG.md) | Histórico de versões e notas de lançamento. |
| [SECURITY.md](../SECURITY.md) | Política de segurança e canal de divulgação responsável de falhas. |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | Código de conduta e diretrizes da comunidade. |

---

## Licença

Este projeto é distribuído sob a Licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](../LICENSE).
