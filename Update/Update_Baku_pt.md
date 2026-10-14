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

# Roteiro de Atualização do Baku PDF Versão 1.5 (Recursos e Planejamento)

Este documento estabelece o panorama de recursos da versão **Baku PDF v1.0.0**, bem como a lista de novos recursos planejados, otimizações de desempenho e expansão de módulos para o lançamento do **Baku PDF v1.5**. Esta versão foca no aprimoramento da produção científica, ferramentas adicionais de manipulação de PDF totalmente offline, suporte multiplataforma nativo (Windows, macOS, Linux) e renderização veloz para documentos extensos.

Diretrizes essenciais de desenvolvimento:
- **100% Offline (Offline-First)**: Processamento estritamente local, sem dependência de servidores em nuvem.
- **Privacidade Absoluta**: Sem telemetria, rastreamento ou transmissão externa de dados.
- **Consumo Mínimo de Recursos**: Inicialização imediata e baixo consumo de memória RAM (~50–80 MB).
- **Design Minimalista Flat 2D**: Interface direta, elegante e focada na produtividade.
- **Padronização Rigorosa**: Aderência estrita às normas de formatação acadêmica e governamental.

---

## Índice

1. [Recursos Disponíveis na Linha de Base (Status v1.0.0)](#1-recursos-disponíveis-na-linha-de-base-status-v100)
2. [Editor de Documentos e Tipografia Científica Avançada](#2-editor-de-documentos-e-tipografia-científica-avançada)
3. [Estruturação Automatizada de Documentos Acadêmicos](#3-estruturação-automatizada-de-documentos-acadêmicos)
4. [Expansão de Ferramentas Extras de PDF Offline](#4-expansão-de-ferramentas-extras-de-pdf-offline)
5. [Coleção Expandida de Modelos Padronizados](#5-coleção-expandida-de-modelos-padronizados)
6. [Suporte Multiplataforma e Empacotamento de Binários](#6-suporte-multiplataforma-e-empacotamento-de-binários)
7. [Arquitetura Central, Desempenho e Documentos Densos](#7-arquitetura-central-desempenho-e-documentos-densos)
8. [Interface do Usuário, Navegação e Acessibilidade](#8-interface-do-usuário-navegação-e-acessibilidade)
9. [Interoperabilidade de Formatos e Compatibilidade de Arquivos](#9-interoperabilidade-de-formatos-e-compatibilidade-de-arquivos)
10. [Segurança de Documentos e Higienização de Metadados](#10-segurança-de-documentos-e-higienização-de-metadados)
11. [Matriz de Prioridades de Desenvolvimento v1.5](#11-matriz-de-prioridades-de-desenvolvimento-v15)

---

## 1. Recursos Disponíveis na Linha de Base (Status v1.0.0)

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
| **4 Ferramentas Extras de PDF Offline** | Implementado | Mesclar PDF, Dividir PDF, Girar Páginas e Imagens para PDF através das bibliotecas Rust `lopdf` e `image`. |
| **Instalador Universal DMG para macOS** | Implementado | Pacote binário universal oficial (`x86_64` Intel + `arm64` Apple Silicon M1-M4) (`Baku_1.0.0_Universal_Installer.dmg`) com proteção de execução em disco temporário (`check_running_from_dmg`). |

---

## 2. Editor de Documentos e Tipografia Científica Avançada

### 2.1. Notação Matemática e Equações KaTeX Offline
- Interpretador KaTeX 100% incorporado ao pacote da aplicação sem conexão de rede.
- Inserção de equações na linha de texto ou em blocos centralizados destacados.
- Numeração automática de equações alinhada à margem direita por capítulo: `(1.1)`, `(1.2)`.
- Compatibilidade com matrizes, cálculo diferencial e símbolos de física e química.

### 2.2. Expansão da Régua Interativa: Recuos e Régua Vertical
- Marcadores na régua horizontal:
  - **Recuo de Primeira Linha**: Determina o início do parágrafo recuado (ex.: 1,25 cm).
  - **Recuo Francês (Hanging Indent)**: Padrão para referências bibliográficas (ABNT, APA, IEEE).
- **Régua Vertical** à esquerda da folha:
  - Medição em centímetros da altura da página.
  - Ajuste direto de margens superior e inferior por marcadores deslizantes.

### 2.3. Tabelas Científicas Avançadas
- Mesclagem de células na horizontal e vertical.
- Estilo de bordas para publicações científicas (Estilo Booktabs): sem bordas verticais, com linhas horizontais destacadas.
- Alinhamento decimal para colunas numéricas.
- Repetição automática da linha de cabeçalho em quebras de página.
- Numeração sequencial de tabelas: `Tabela 1.1: Legenda`.

### 2.4. Corretor Ortográfico e Hifenização Offline
- Dicionário local integrado para detecção de erros de digitação.
- Sublinhado vermelho discreto para termos não reconhecidos.
- Sugestões contextuais via menu de clique com botão direito.
- Hifenização fonológica automática em alinhamento justificado para espaçamento uniforme.

---

## 3. Estruturação Automatizada de Documentos Acadêmicos

### 3.1. Numeração de Páginas de Tese em Posição Dupla
- Automação de regras de teses e dissertações:
  - Primeira página de cada capítulo (com título) posiciona o número no **centro inferior**.
  - Páginas subsequentes do mesmo capítulo posicionam o número no **canto superior direito**.
- Reinício de numeração isolado por seção sem alterar as seções anteriores.

### 3.2. Sumário Dinâmico Automatizado
- Criação instantânea de sumário com base nos níveis de título (Título 1, Título 2, Título 3).
- Linhas pontilhadas automáticas conectando o nome do capítulo ao número da página.
- Botão de atualização rápida para refletir revisões e alterações na paginação.

### 3.3. Lista Dinâmica de Tabelas e Ilustrações
- Rastreamento contínuo de legendas de imagens e tabelas.
- Geração instantânea de listas de ilustrações e tabelas sincronizadas em tempo real.

### 3.4. Gerenciador de Citações e Referências Bibliográficas Offline
- Cadastro manual ou importação de arquivos BibTeX (`.bib`) e RIS.
- Formatação de citações nos padrões ABNT, APA 7ª Edição, IEEE, Harvard e Vancouver.
- Construção da lista de referências final com recuo francês e ordenação alfabética automática.

---

## 4. Expansão de Ferramentas Extras de PDF Offline

Além das 4 ferramentas existentes, a versão 1.5 introduz 6 novos utilitários locais:

### 4.1. Compressor de Arquivos PDF Offline
- Otimização do peso de arquivos PDF em Rust sem prejudicar a leitura do texto.
- Metas de tamanho: abaixo de 500 KB, abaixo de 1 MB, abaixo de 2 MB e ajuste manual de resolução DPI.
- Comparativo de tamanho antes e depois do processamento.

### 4.2. Assinatura Digital e Rubrica Offline
- Assinatura direta via cursor/caneta digital ou importação de imagem PNG transparente.
- Posicionamento com visualização em tempo real em qualquer página.
- Aplicação em lote por coordenadas para documentos de múltiplas páginas.
- Carimbo de data e rubricas offline.

### 4.3. Proteção por Senha e Criptografia AES-256
- Senha de abertura com criptografia local padrão AES-256.
- Senha de permissões para restringir impressão, cópia de texto e alterações.
- Descriptografia offline para usuários autorizados.

### 4.4. Organizador Visual de Páginas
- Grade de miniaturas das páginas do documento.
- Reordenação por arrastar e soltar.
- Exclusão de páginas avulsas ou intervalos específicos.
- Inserção de páginas em branco e anexação de páginas de outros PDFs.

### 4.5. Numeração Bates e Carimbador de PDFs Externos
- Numeração de documentos PDF de terceiros.
- Posição personalizável: superior direito, inferior direito ou centro inferior.
- Prefixos configuráveis (ex.: `Anexo Página 1 de 10`, `Folha 1`).

### 4.6. Ferramenta de Marca d'Água Offline
- Aplicação diagonal (45 graus) ou horizontal.
- Textos rápidos: `RASCUNHO`, `CONFIDENCIAL`, `CÓPIA OFICIAL`, `AMOSTRA`.
- Controle de transparência, fonte, cor e intervalo de páginas.

---

## 5. Coleção Expandida de Modelos Padronizados

### 5.1. Publicações Científicas e Periódicos
- **Artigo em Formato de Duas Colunas**: Cabeçalho de página inteira, resumo bilíngue e formato IMRAD.
- **Artigo de Conferência IEEE**: Padrão tipográfico e diagramação visual rigorosa.

### 5.2. Vida Acadêmica e Bolsas de Pesquisa
- **Proposta de Iniciação Científica e Projetos**: Folha de aprovação, cronograma e tabela orçamentária.
- **Relatório de Estágio Supervisionado**: Registro semanal de atividades e avaliação institucional.
- **Projeto de Dissertação de Mestrado e Tese Doutoral**: Metodologia detalhada e hipóteses de pesquisa.

### 5.3. Administração Pública e Empresarial
- **Memorando e Ordem de Serviço**: Modelo padronizado com identificação de setor e justificativas.
- **Portaria Administrativa Oficial**: Estrutura normativa formal.
- **Termo de Recebimento e Entrega**: Modelo contratual com assinaturas de testemunhas.

### 5.4. Exportação e Importação de Pacotes de Modelos (.bakutpl)
- Compartilhamento de modelos personalizados através de arquivos portáteis `.bakutpl`.
- Importação direta na galeria de modelos de outros computadores.

---

## 6. Suporte Multiplataforma e Empacotamento de Binários

### 6.1. Distribuição para Windows
- **Instalador NSIS Guiado (`.exe`)**: Pacotes 64-bit (`x64`) e ARM64 para Windows 10 e 11 com associação de arquivos `.baku`.
- **Edição Portátil Independente (`Baku_Portable.exe`)**: Execução direta sem privilégios de administrador.
- **Gerenciador de Pacotes da Microsoft (`winget`)**: Publicação no repositório oficial `winget-pkgs`.

### 6.2. Distribuição para Linux
- **Pacote Universal `AppImage`**: Binário autossuficiente compatível com as principais distribuições.
- **Pacote Debian / Ubuntu (`.deb`)**: Pacote com dependências integradas.
- **Flathub e Arch User Repository (AUR)**: Manifesto Flatpak e pacote `baku-bin` no AUR.

### 6.3. Distribuição Avançada no macOS
- **Homebrew Cask**: Instalação por linha de comando (`brew install --cask baku-pdf`).
- **Assinatura de Código e Notarização Apple**: Validação oficial via Apple Developer ID para inicialização sem avisos de segurança.

---

## 7. Arquitetura Central, Desempenho e Documentos Densos

### 7.1. Virtualização de Páginas no DOM
- Renderização restrita às páginas atualmente visíveis na tela mais buffer preventivo de 1 a 2 páginas.
- Manuseio fluido de documentos com mais de 500 páginas mantendo consumo de memória estável.
- Latência de digitação inferior a 8 milissegundos.

### 7.2. Motor de Exportação Vetorial de PDF Nativo em Rust
- Geração de PDF via bibliotecas Rust (`printpdf` e `lopdf`) com texto vetorial selecionável.
- Redução de até 60% no tamanho dos arquivos gerados.
- Incorporação inteligente de fontes com subconjuntos (*Font Subsetting*).

### 7.3. Salvamento Automático a Cada 60 Segundos e Recuperação de Sessão
- Cópias de segurança periódicas em armazenamento local isolado.
- Diálogo de recuperação imediata ao reabrir o programa após interrupções inesperadas.
- Histórico de versões locais com retorno a estados de 15, 30 ou 60 minutos anteriores.

---

## 8. Interface do Usuário, Navegação e Acessibilidade

### 8.1. Painel Lateral de Navegação e Estrutura
- Barra lateral retrátil com visualização de tópicos, miniaturas das folhas e resultados de busca contextual.

### 8.2. Modo Escuro e Claro Adaptativo
- Tema escuro de alto contraste em conformidade com as normas WCAG AAA.
- Opção de folha branca sobre fundo escuro ou inversão completa para leitura noturna.
- Integração automática com o tema visual do sistema operacional.

### 8.3. Modo Foco Sem Distrações (Zen Mode)
- Ocultação imediata de menus e barras de ferramentas com o atalho `F11` ou `Cmd+Shift+F`.

### 8.4. Visualização de Páginas Lado a Lado
- Exibição de duas páginas simultâneas em monitores ultrawide.

### 8.5. Barra de Abas Multidocumento (Multi-Document Tab Bar)
- **Objetivo e Benefícios de Produtividade**:
  - Elimina a alternância constante de janelas no sistema operacional (Alt+Tab / Cmd+`) ao redigir trabalhos que exigem múltiplos documentos de consulta simultâneos.
  - Abertura e edição de vários arquivos `.baku` em uma mesma janela unificada.
- **Posicionamento Ergonômico**:
  - Localizada estrategicamente **abaixo da faixa de opções (Ribbon) e diretamente acima da régua e do editor**.
  - Segue a hierarquia visual natural de trabalho: selecionar comandos na faixa -> selecionar o documento na barra de abas -> editar na folha.
  - Aproveita toda a largura horizontal da tela sem sobrecarregar a barra de status inferior.
- **Design Visual Flat 2D**:
  - Barra de perfil fino (altura de 30 a 32 px).
  - **Aba Ativa**: Fundo branco (`#FFFFFF`) contínuo com a folha de trabalho, linha de destaque superior azul (`#2563EB`), título em negrito, botão de fechar `x` e sinalizador de alterações não salvas.
  - **Aba Inativa**: Cinza neutro (`#F3F2F1`) com transições suaves.
  - Encurtamento de nomes longos com reticências e botão `+` para criação/abertura rápida.
- **Rolagem Horizontal e Navegação**:
  - Exibição proporcional para 1 a 5 abas abertas.
  - Rolagem horizontal fluida quando houver mais de 5 documentos, auxiliada por setas `<` e `>` nos extremos.
- **Isolamento de Estado e Segurança dos Dados**:
  - Estado Delta JSON independente por aba, preservando o ponto de rolagem e a posição do cursor.
  - Histórico de Desfazer (`Ctrl/Cmd+Z`) e Refazer (`Ctrl+Y` / `Cmd+Shift+Z`) isolado por documento.
  - Ponto indicador de documento não salvo e aviso de confirmação antes do fechamento.
- **Economia de Memória RAM**:
  - Abas em segundo plano permanecem armazenadas como estruturas de dados leves na RAM sem sobrecarregar a árvore DOM.

---

## 9. Interoperabilidade de Formatos e Compatibilidade de Arquivos

### 9.1. Importação e Conversão de Documentos Word (.docx) Offline
- Interpretador local em Rust para carregar arquivos do Microsoft Word preservando os estilos essenciais.

### 9.2. Exportação para Formatos Convencionais
- Exportação para `.docx`, texto simples (`.txt`) e Markdown científico (`.md`).

### 9.3. Especificação do Formato .baku v2.0
- Contêiner de anexos binários compactados para ilustrações de alta resolução.
- Compatibilidade retroativa integral com arquivos da versão 1.0.0.

---

## 10. Segurança de Documentos e Higienização de Metadados

### 10.1. Higienizador de Metadados
- Limpeza de nomes de autores, dados da máquina e registros temporais para submissão anônima (*Blind Review*).

### 10.2. Modo de Bloqueio Somente Leitura
- Proteção contra modificações acidentais em documentos aprovados.

---

## 11. Matriz de Prioridades de Desenvolvimento v1.5

| Módulo | Componente Alvo | Prioridade | Complexidade Estimada |
| :--- | :--- | :--- | :--- |
| Barra de Abas Multidocumento | Frontend Editor e Motor de Estado | Altíssima | Média |
| Compressor de Arquivos PDF Offline | Backend Rust (`lopdf` / `image`) | Altíssima | Média |
| Instaladores Windows (.exe) e Linux (AppImage) | Tauri Bundler e CI | Altíssima | Média |
| Numeração Dupla de Páginas para Teses | Motor de Folhas Frontend | Alta | Média |
| Painel Lateral de Navegação e Miniaturas | UI Frontend e DOM Virtual | Alta | Média |
| Notação Matemática KaTeX Offline | Analisador Frontend | Alta | Baixa |
| Régua Vertical e Recuos de Parágrafo | Motor de Régua Frontend | Média | Média |
| Gerenciador de Citações e Bibliografia | Estrutura de Dados Frontend | Média | Média |
| Assinatura Digital e Rubrica Offline | Backend Rust e Canvas Overlay | Média | Média |
| Modo Escuro Adaptativo | Motor de Temas CSS | Média | Baixa |
| Importador Word (.docx) Offline | Parser Rust DOCX | Futuro | Alta |

---

## Discussões e Contribuições da Comunidade

- Sugestões de recursos: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Relatório de falhas: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guia de colaboração: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Arquitetura técnica: [ARCHITECTURE.md](../ARCHITECTURE.md)\n