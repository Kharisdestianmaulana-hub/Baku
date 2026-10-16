<div align="center">
  <p>
    <strong>Idiomas do Roteiro / Roadmap Languages:</strong><br />
    <a href="Update_Baku_en.md">English</a> |
    <a href="Update_Baku_id.md">Bahasa Indonesia</a> |
    <a href="Update_Baku_es.md">Español</a> |
    <a href="Update_Baku_fr.md">Français</a> |
    <a href="Update_Baku_de.md">Deutsch</a> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <strong>Português</strong> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../readme/README_PT.md">Voltar ao README Principal</a></p>
  <hr />
</div>

# Roteiro de Atualização do Baku PDF (Versões v1.1.0 – v1.5.0)

Este documento estabelece o panorama de recursos da versão **Baku PDF v1.0.0**, bem como a lista de novos recursos planejados em lançamentos graduais de **Baku PDF v1.1.0 a v1.5.0**. Cada etapa de lançamento é estruturada de forma mensurável, testada progressivamente e alinhada com os princípios fundacionais do aplicativo:

Diretrizes essenciais de desenvolvimento:
- **100% Offline (Offline-First)**: Processamento estritamente local, sem dependência de servidores em nuvem.
- **Privacidade Absoluta**: Sem telemetria, rastreamento ou transmissão externa de dados.
- **Consumo Mínimo de Recursos**: Inicialização imediata e baixo consumo de memória RAM (~50–80 MB).
- **Design Minimalista Flat 2D**: Interface direta, elegante e focada na produtividade.
- **Padronização Rigorosa**: Aderência estrita às normas de formatação acadêmica e governamental.

---

## Índice do Documento

1. [Inventário de Recursos da Linha de Base (Status da Versão v1.0.0)](#1-inventário-de-recursos-da-linha-de-base-status-da-versão-v100)
2. [Recursos da Versão 1.1.0 (Status: Concluído e Lançado)](#2-recursos-da-versão-110-status-concluído-e-lançado)
3. [Plano de Lançamento Versão 1.2.0 (Padrões Acadêmicos e Tipografia Científica)](#3-plano-de-lançamento-versão-120-padrões-acadêmicos-e-tipografia-científica)
4. [Plano de Lançamento Versão 1.3.0 (Distribuição Multiplataforma Completa e Navegação)](#4-plano-de-lançamento-versão-130-distribuição-multiplataforma-completa-e-navegação)
5. [Plano de Lançamento Versão 1.4.0 (Utilitários PDF Offline e Segurança de Documentos)](#5-plano-de-lançamento-versão-140-utilitários-pdf-offline-e-segurança-de-documentos)
6. [Plano de Lançamento Versão 1.5.0 (Ápice do Marco do Ecossistema e Alto Desempenho)](#6-plano-de-lançamento-versão-150-ápice-do-marco-do-ecossistema-e-alto-desempenho)
7. [Matriz de Prioridades Técnicas e Resumo de Lançamentos Graduais (v1.1.0 – v1.5.0)](#7-matriz-de-prioridades-técnicas-e-resumo-de-lançamentos-graduais-v110--v150)
8. [Contribuições da Comunidade e Discussões de Recursos](#8-contribuições-da-comunidade-e-discussões-de-recursos)

---

## 1. Inventário de Recursos da Linha de Base (Status da Versão v1.0.0)

Conforme auditoria do código-fonte, os seguintes módulos **estão 100% implementados na versão 1.0.0**:

| Módulo | Status v1.0.0 | Descrição da Implementação |
| :--- | :--- | :--- |
| **Régua Horizontal Interativa** | Implementado | Régua visual em centímetros com marcadores de margem (`ruler-marker-left`, `ruler-marker-right`), linhas guia e controle de exibição na barra de ferramentas. |
| **8 Modelos Padronizados Nativos** | Implementado | Tese de 5 páginas completa, Artigo Científico, Relatório de Laboratório, Ofício Formal, **Carta de Apresentação**, Ata de Reunião, **Currículo ATS** e Memorando Interno. |
| **Sistema de Criação de Modelos Personalizados** | Implementado | Salvar como Modelo (`#action-save-as-template`), Criar Novo Modelo (`#btn-create-new-template`) e filtro de Modelos Próprios na Galeria. |
| **Numeração de Páginas e Quebras de Seção** | Implementado | Janela de numeração (`#modal-page-number`) com algarismos arábicos (`1, 2, 3`), romanos minúsculos (`i, ii, iii`), romanos maiúsculos (`I, II, III`) e quebras de seção. |
| **Primeira Página com Cabeçalho e Rodapé Diferentes** | Implementado | Alternância Primeira Página Diferente (`diffFirst`) para ocultar ou isolar elementos na página de título. |
| **Janela Modal de Hiperlinks** | Implementado | Modal Flat 2D (`#modal-link-overlay`) com texto de exibição, campo de URL, remoção de link e atalho `Ctrl+K` / `Cmd+K`. |
| **Controles de Zoom e Escala** | Implementado | Ampliar, reduzir, redefinir 100%, controle deslizante na barra de status e ajuste de interface nas Configurações. |
| **4 Ferramentas PDF Offline** | Implementado | Mesclar PDF (*Merge*), Dividir PDF (*Split*), Girar Páginas (*Rotate*) e Imagens para PDF (*Images to PDF*) via Rust `lopdf` e `image`. |
| **Instalador Universal DMG para macOS** | Implementado | Pacote oficial Universal DMG (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) com interface de arrastar e soltar e verificação de volume (`check_running_from_dmg`). |

---

## 2. Recursos da Versão 1.1.0 (Status: Concluído e Lançado)

> [!NOTE]
> Todos os recursos da Versão 1.1.0 foram totalmente implementados e lançados oficialmente em 16 de outubro de 2026.

A etapa **v1.1.0** foca na produtividade com múltiplos documentos abertos e compressão local de arquivos PDF:

### 2.1. Barra de Abas Multidocumento (Multi-Document Tab Bar)
- **Objetivo e Benefícios**: Elimina a alternância frequente com `Alt+Tab` entre janelas do sistema operacional, permitindo abrir, editar e alternar entre vários arquivos `.baku` simultaneamente em uma única janela.
- **Posicionamento Ergonômico**: Posicionada estrategicamente **abaixo da Ribbon Toolbar e logo acima da Régua/Canvas do Editor**.
- **Design Visual Flat 2D**: Abas compactas (30–32 px de altura); aba ativa com fundo branco (`#FFFFFF`) e faixa azul superior (`#2563EB`); abas inativas em cinza neutro (`#F3F2F1`) com elipse para nomes longos.
- **Navegação com Rolagem Horizontal**: Exibição proporcional para 1 a 5 documentos; rolagem horizontal suave com trackpad/mouse e botões direcionais `<` e `>` ao ultrapassar 5 arquivos.
- **Isolamento de Estado e Segurança**: Pilha de Desfazer/Refazer (`Ctrl+Z` / `Ctrl+Y`) isolada por aba, indicador de documento não salvo (ponto azul) e confirmação antes do fechamento.
- **Virtualização de Memória RAM**: Abas em segundo plano permanecem como objetos JSON leves sem nós DOM montados, mantendo o consumo de memória baixo (~50-80 MB).
- **Atalhos Rápidos**: `Ctrl+Tab` para próxima aba, `Ctrl+Shift+Tab` para aba anterior e `Ctrl+W` para fechar aba.

### 2.2. Compressor de Arquivos PDF Offline (Offline PDF Compressor)
- Redução de tamanho de arquivos PDF no ambiente local em Rust sem degradar a legibilidade do texto vetorial.
- Metas pré-configuradas: abaixo de 500 KB (concursos e bolsas), abaixo de 1 MB (portais acadêmicos), abaixo de 2 MB e ajuste de DPI (150, 96, 72 DPI).
- Prévia comparativa de tamanho antes e após a compressão.

---

## 3. Plano de Lançamento Versão 1.2.0 (Padrões Acadêmicos e Tipografia Científica)

A etapa **v1.2.0** traz suporte integral às normas de teses acadêmicas e notação matemática:

### 3.1. Numeração Dupla de Páginas para Teses
- Regra acadêmica automatizada: primeira folha de cada capítulo com número no **centro inferior**; folhas de desenvolvimento no **canto superior direito**.
- Reinício isolado de numeração por seção.

### 3.2. Notação Matemática KaTeX Offline
- Motor KaTeX empacotado 100% offline.
- Inserção de equações em linha (`Inline Math`) e em bloco (`Block Equation`).
- Numeração sequencial no canto direito da folha: `(1.1)`, `(1.2)`.

### 3.3. Tabelas Científicas Avançadas (Estilo Booktabs)
- Mesclagem de células horizontal e vertical.
- Bordas padronizadas sem linhas verticais (linha superior grossa, linha de cabeçalho fina, linha de fechamento grossa).
- Alinhamento de vírgula decimal em colunas numéricas e repetição automática de cabeçalho nas quebras de folha.

### 3.4. Régua Vertical e Recuos de Parágrafo
- Marcadores na régua horizontal para Recuo de Primeira Linha e Recuo Francês (ABNT/APA/IEEE).
- Régua vertical à esquerda para medição da altura real e controle visual das margens superior e inferior.

### 3.5. Verificador Ortográfico e Guia de Escrita Offline
- Dicionário local integrado com detecção de desvios ortográficos, sugestões no menu de clique direito e hifenização automática para parágrafos justificados.

### 3.6. Estruturação Automatizada de Documentos Acadêmicos
- Sumário dinâmico com linhas pontilhadas guias e atualização rápida.
- Lista automática de tabelas e figuras sincronizadas com os números de página.
- Gerenciador de citações e referências offline com suporte a BibTeX (`.bib`), ABNT, APA 7, IEEE e Vancouver.

---

## 4. Plano de Lançamento Versão 1.3.0 (Distribuição Multiplataforma Completa e Navegação)

A etapa **v1.3.0** expande a compatibilidade nativa para Windows e Linux e adiciona navegação lateral:

### 4.1. Distribuição para Microsoft Windows
- Instalador guiado NSIS (`.exe`) para x64 e ARM64 no Windows 10 e 11 com associação de arquivos `.baku`.
- Edição portátil (`Baku_Portable.exe`) para execução sem privilégios de administrador.
- Publicação no gerenciador oficial de pacotes do Windows (`winget install Baku.BakuPDF`).

### 4.2. Distribuição para Linux
- Pacote universal `AppImage` para Ubuntu, Fedora, Arch Linux, Debian e openSUSE.
- Pacote nativo `.deb` para Debian/Ubuntu com dependências declaradas.
- Suporte para Flatpak (Flathub) e AUR (`baku-bin`).

### 4.3. Distribuição Avançada no macOS
- Instalação via Homebrew Cask (`brew install --cask baku-pdf`).
- Assinatura oficial Apple Developer ID e notarização para execução sem alertas do Gatekeeper.

### 4.4. Painel Lateral de Navegação
- Painel retrátil à esquerda com guias para estrutura de títulos (Capítulos e Subseções), miniaturas de páginas e painel de busca e substituição.

---

## 5. Plano de Lançamento Versão 1.4.0 (Utilitários PDF Offline e Segurança de Documentos)

A etapa **v1.4.0** introduz ferramentas avançadas para manuseio de PDF e proteção de privacidade:

### 5.1. Assinatura Digital e Rubrica Offline
- Desenho de assinatura via cursor/caneta ou importação de PNG transparente com posicionamento interativo.
- Assinatura em lote em coordenadas fixas e aposição de carimbo de data.

### 5.2. Higienizador de Metadados de Documentos
- Limpeza de nomes de autor, caminhos de diretório e carimbos de revisão para submissão anônima (*Blind Review*).

### 5.3. Organizador Visual de Páginas
- Grade de miniaturas para reordenar páginas arrastando e soltando, exclusão rápida e inserção de páginas em branco ou de outros PDFs.

### 5.4. Marca d'Água Textual Offline
- Aplicação de marca d'água diagonal ou horizontal com modelos predefinidos (`RASCUNHO`, `CONFIDENCIAL`, `CÓPIA OFICIAL`) e controle de opacidade.

### 5.5. Proteção e Criptografia com Senha em PDF
- Criptografia padrão AES-256 local com senha de abertura e senha de permissões (restringir impressão e cópia).

### 5.6. Numeração Externa de Páginas (Bates Numbering)
- Inserção de numeração em PDFs externos com prefixos personalizáveis.

---

## 6. Plano de Lançamento Versão 1.5.0 (Ápice do Marco do Ecossistema e Alto Desempenho)

A etapa **v1.5.0** representa o marco ápice de maturidade do Baku PDF:

### 6.1. Pacotes de Modelos Portáteis (.bakutpl)
- Exportação e importação de modelos personalizados em arquivos `.bakutpl`.

### 6.2. Coleção Expandida de Modelos Padronizados
- Artigos científicos de coluna dupla e publicações IEEE.
- Propostas de projetos estudantis, relatórios de estágio e projetos de pós-graduação.
- Modelos formais administrativos (Ofícios, Decretos e Portarias).

### 6.3. Renderização Virtual de Páginas DOM (500+ Páginas)
- Montagem exclusiva das folhas no campo de visão (*viewport*), permitindo redigir monografias de centenas de páginas com latência de digitação inferior a 8 ms.

### 6.4. Motor de Exportação PDF Nativo em Rust
- Geração vetorial pura com Rust (`printpdf`/`lopdf`) com subconjunto de fontes embutidas, reduzindo o arquivo final em até 60%.

### 6.5. Modo Escuro e Claro Adaptativo Completo
- Tema escuro de alto contraste atendendo às normas WCAG AAA, com folhas convencionais ou folhas invertidas e sincronização com o sistema operacional.

### 6.6. Modo Livre de Distrações (Zen) e Visualização em Página Dupla
- Ocultação de menus e barras (`F11` / `Cmd+Shift+F`) e visualização lado a lado de duas páginas em telas panorâmicas.

### 6.7. Importador de Word (.docx) e Exportação Padrão
- Leitor local em Rust de arquivos `.docx` preservando a estrutura de texto e exportação para `.docx`, texto simples (`.txt`) e Markdown (`.md`).

### 6.8. Especificação do Formato .baku v2.0
- Contêiner de anexos binários comprimidos para imagens de alta resolução e compatibilidade retroativa total com a versão 1.0.0.

### 6.9. Salvamento Automático Periódico e Recuperação de Sessão
- Gravação a cada 60 segundos com restauração automática em caso de desligamento inesperado e histórico de revisões.

---

## 7. Matriz de Prioridades Técnicas e Resumo de Lançamentos Graduais (v1.1.0 – v1.5.0)

### 7.1. Plano de Lançamentos Graduais

| Versão | Foco Principal | Módulos Integrados | Previsão |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Abas de Documentos e Eficiência | Barra de Abas Multidocumento (Seção 2.1) e Compressor de PDF (Seção 2.2). | Concluído e Lançado (16 Out 2026) |
| **v1.2.0** | Padrões Acadêmicos e Tipografia | Numeração Dupla de Páginas (Seção 3.1), Fórmulas KaTeX (Seção 3.2), Tabelas Booktabs (Seção 3.3), Régua Vertical (Seção 3.4), Ortografia (Seção 3.5) e Estrutura (Seção 3.6). | Próximo Lançamento (Fase 2) |
| **v1.3.0** | Distribuição Multiplataforma | Instaladores Windows (`.exe`/portátil) (Seção 4.1), Linux AppImage/Debian (Seção 4.2), macOS (Seção 4.3) e Painel Lateral (Seção 4.4). | Fase 3 |
| **v1.4.0** | Utilitários PDF e Segurança | Assinatura Digital (Seção 5.1), Higienizador de Metadados (Seção 5.2), Organizador de Páginas (Seção 5.3), Marca d'Água (Seção 5.4), Criptografia (Seção 5.5) e Numeração (Seção 5.6). | Fase 4 |
| **v1.5.0** | Marco do Ecossistema e Performance | Pacotes `.bakutpl` (Seção 6.1), Modelos Extras (Seção 6.2), DOM Virtual 500+ Páginas (Seção 6.3), Motor PDF Rust (Seção 6.4), Modo Escuro (Seção 6.5), Modo Zen (Seção 6.6), Importador Word (Seção 6.7), `.baku` v2.0 (Seção 6.8) e Salvamento Automático (Seção 6.9). | Ápice do Marco |

### 7.2. Matriz Técnica de Prioridades de Desenvolvimento

| Módulo | Componente Alvo | Versão Alvo | Prioridade | Complexidade Estimada |
| :--- | :--- | :--- | :--- | :--- |
| Barra de Abas Multidocumento | Frontend Editor e Motor de Estado | v1.1.0 | Lançado | Média |
| Compressor de Arquivos PDF Offline | Backend Rust (`lopdf` / `image`) | v1.1.0 | Lançado | Média |
| Numeração Dupla de Páginas para Teses | Motor de Folhas Frontend | v1.2.0 | Alta | Média |
| Notação Matemática KaTeX Offline | Analisador Frontend | v1.2.0 | Alta | Baixa |
| Régua Vertical e Recuos de Parágrafo | Motor de Régua Frontend | v1.2.0 | Média | Média |
| Tabelas Científicas Avançadas (Booktabs) | Motor de Folhas Frontend | v1.2.0 | Média | Média |
| Instaladores Windows (.exe) e Linux (AppImage) | Tauri Bundler e CI | v1.3.0 | Altíssima | Média |
| Painel Lateral de Navegação e Miniaturas | UI Frontend e DOM Virtual | v1.3.0 | Alta | Média |
| Assinatura Digital e Rubrica Offline | Backend Rust e Canvas Overlay | v1.4.0 | Média | Média |
| Higienizador de Metadados (Avaliação Cega) | Backend Rust e PDF Pipeline | v1.4.0 | Média | Baixa |
| Organizador Visual de Páginas | Frontend UI e Backend Rust | v1.4.0 | Média | Média |
| Modo Escuro Adaptativo | Motor de Temas CSS | v1.5.0 | Média | Baixa |
| Pacotes de Modelos Portáteis (.bakutpl) | Armazenamento Frontend e JSON | v1.5.0 | Média | Baixa |
| Virtualização DOM de Páginas (500+ Páginas) | Virtualizador DOM Frontend | v1.5.0 | Alta | Alta |
| Importador Word (.docx) Offline | Parser Rust DOCX | v1.5.0 / Futuro | Futuro | Alta |

---

## 8. Contribuições da Comunidade e Discussões de Recursos

- Sugestões de recursos: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Relatório de falhas: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guia de colaboração: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Arquitetura técnica: [ARCHITECTURE.md](../ARCHITECTURE.md)
