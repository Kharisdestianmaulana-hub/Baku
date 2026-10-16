<div align="center">
  <p>
    <strong>Idiomas de la Hoja de Ruta / Roadmap Languages:</strong><br />
    <a href="Update_Baku_en.md">English</a> |
    <a href="Update_Baku_id.md">Bahasa Indonesia</a> |
    <strong>Español</strong> |
    <a href="Update_Baku_fr.md">Français</a> |
    <a href="Update_Baku_de.md">Deutsch</a> |
    <a href="Update_Baku_ja.md">日本語</a> |
    <a href="Update_Baku_zh.md">简体中文</a> |
    <a href="Update_Baku_pt.md">Português</a> |
    <a href="Update_Baku_ru.md">Русский</a> |
    <a href="Update_Baku_ar.md">العربية</a>
  </p>
  <p><a href="../readme/README_ES.md">Volver al README Principal</a></p>
  <hr />
</div>

# Hoja de Ruta de Actualización de Baku PDF (Versiones v1.1.0 – v1.5.0)

Este documento detalla el inventario de funciones disponibles en **Baku PDF v1.0.0**, seguido por la hoja de ruta técnica organizada cronológicamente por número de versión desde **v1.1.0 hasta v1.5.0**. Cada etapa de lanzamiento está estructurada de manera medible, probada progresivamente y manteniendo los principios fundacionales de la aplicación:

Principios arquitectónicos esenciales:
- **100% Fuera de Línea (Local-First)**: Procesamiento estrictamente local sin dependencia de servidores en la nube.
- **Privacidad Absoluta**: Sin analíticas de rastreo, telemetría ni transmisión de datos fuera del dispositivo.
- **Bajo Consumo de Recursos**: Inicio instantáneo y huella de memoria RAM reducida (~50-80 MB).
- **Diseño Minimalista Flat 2D**: Interfaz limpia, eficiente y libre de distracciones.
- **Cumplimiento Estricto de Formato**: Apego riguroso a estándares de redacción académica y administrativa.

---

## Índice del Documento

1. [Inventario de Funciones de Línea Base (Estado de Versión v1.0.0)](#1-inventario-de-funciones-de-línea-base-estado-de-versión-v100)
2. [Plan de Versión 1.1.0 (Pestañas Multidocumento y Eficiencia Operativa)](#2-plan-de-versión-110-pestañas-multidocumento-y-eficiencia-operativa)
3. [Plan de Versión 1.2.0 (Normas Académicas y Tipografía Científica)](#3-plan-de-versión-120-normas-académicas-y-tipografía-científica)
4. [Plan de Versión 1.3.0 (Distribución Multiplataforma Completa y Navegación)](#4-plan-de-versión-130-distribución-multiplataforma-completa-y-navegación)
5. [Plan de Versión 1.4.0 (Utilidades PDF Fuera de Línea y Seguridad)](#5-plan-de-versión-140-utilidades-pdf-fuera-de-línea-y-seguridad)
6. [Plan de Versión 1.5.0 (Hito Cumbre del Ecosistema y Rendimiento Masivo)](#6-plan-de-versión-150-hito-cumbre-del-ecosistema-y-rendimiento-masivo)
7. [Matriz de Prioridades Técnicas y Resumen de Etapas de Lanzamiento (v1.1.0 – v1.5.0)](#7-matriz-de-prioridades-técnicas-y-resumen-de-etapas-de-lanzamiento-v110--v150)
8. [Contribuciones Comunitarias y Discusión de Funciones](#8-contribuciones-comunitarias-y-discusión-de-funciones)

---

## 1. Inventario de Funciones de Línea Base (Estado de Versión v1.0.0)

A partir de la auditoría del código fuente, los siguientes módulos están **completamente implementados en la versión 1.0.0**:

| Módulo de Función | Estado v1.0.0 | Detalles de Implementación |
| :--- | :--- | :--- |
| **Regla Horizontal Interactiva** | Implementado | Regla métrica superior en centímetros, marcadores deslizables de márgenes (`ruler-marker-left`, `ruler-marker-right`), guías de alineación discontinua y controles en barra de herramientas y menú Ver. |
| **8 Plantillas Estándar Nativas** | Implementado | Incluye Tesis de Grado completa de 5 páginas, Artículo Científico, Informe de Laboratorio, Oficio Administrativo, **Carta de Presentación**, Acta de Reunión, **Currículum ATS** y Memorando Interno. |
| **Sistema de Creación de Plantillas Personalizadas** | Implementado | Acción "Guardar como plantilla..." (`#action-save-as-template`), "Crear nueva plantilla" (`#btn-create-new-template`), aviso de modo autor en editor y filtro de plantillas propias en Galería. |
| **Numeración de Páginas y Saltos de Sección** | Implementado | Ventana de numeración (`#modal-page-number`) compatible con números arábigos (`1, 2, 3`), romanos minúsculos (`i, ii, iii`), romanos mayúsculos (`I, II, III`), prefijo/sufijo y saltos de sección. |
| **Primera Página con Encabezado y Pie Diferente** | Implementado | Opción *Primera Página Diferente* (`diffFirst`) para aislar la portada de encabezados repetitivos. |
| **Modal Dedicado de Inserción de Enlaces** | Implementado | Ventana Flat 2D (`#modal-link-overlay`) con texto visible, URL de destino, botón para desenlazar, atajo `Ctrl+K` / `Cmd+K` y apertura con `Ctrl/Cmd + Clic`. |
| **Controles de Zoom y Escala** | Implementado | Acercar, alejar, restablecer 100%, deslizador en barra de estado y ajuste de escala de interfaz en Configuración. |
| **4 Herramientas PDF Fuera de Línea** | Implementado | Combinar PDF (*Merge*), Dividir PDF (*Split*), Rotar Páginas (*Rotate*) e Imágenes a PDF (*Images to PDF*) mediante librerías Rust `lopdf` e `image`. |
| **Instalador Universal DMG para macOS** | Implementado | Paquete DMG Universal Binary (`x86_64` Intel + `arm64` Apple Silicon M1/M2/M3/M4) oficial con fondo visual de arrastrar y soltar y protección de volumen (`check_running_from_dmg`). |

---

## 2. Plan de Versión 1.1.0 (Pestañas Multidocumento y Eficiencia Operativa)

La etapa **v1.1.0** se enfoca en la productividad de redacción simultánea y la compresión local de documentos PDF:

### 2.1. Barra de Pestañas Multidocumento (Multi-Document Tab Bar)
- **Propósito y Flujo de Trabajo**: Permite abrir, editar y alternar entre múltiples documentos `.baku` en una sola ventana sin necesidad de usar `Alt+Tab` entre ventanas del sistema.
- **Ubicación Ergonómica**: Situada directamente **debajo de la cinta de herramientas y justo encima de la regla y el lienzo de edición**, optimizando el ancho total de la pantalla.
- **Diseño Visual Flat 2D**: Pestañas delgadas (30–32 px de altura); pestaña activa con fondo blanco puro (`#FFFFFF`) y acento azul superior (`#2563EB`); pestañas inactivas en gris claro (`#F3F2F1`) con truncamiento elíptico.
- **Desplazamiento Horizontal Fluido**: Vista proporcional para 1 a 5 pestañas; desplazamiento horizontal suave con trackpad/rueda y botones de flechas `<` y `>` al exceder 5 documentos.
- **Aislamiento de Estado y Seguridad**: Historial de Deshacer/Rehacer (`Ctrl+Z` / `Ctrl+Y`) aislado por pestaña, indicador de cambios no guardados (punto azul/asterisco) y modal de confirmación antes de cerrar.
- **Virtualización de Pestañas en Memoria**: Las pestañas en segundo plano residen como datos Delta JSON ligeros en RAM sin renderizar nodos DOM, garantizando un uso contenido de memoria (~50-80 MB).
- **Atajos de Teclado**: `Ctrl+Tab` para siguiente documento, `Ctrl+Shift+Tab` para anterior y `Ctrl+W` para cerrar.

### 2.2. Compresor de Archivos PDF Fuera de Línea (Offline PDF Compressor)
- Reducción de peso de archivos PDF de forma estrictamente local mediante Rust sin perder nitidez de texto vectorial.
- Metas predefinidas: menos de 500 KB (portales de empleo y becas), menos de 1 MB (repositorios universitarios), menos de 2 MB y selección manual de DPI (150, 96, 72 DPI).
- Estimación de peso antes y después de la compresión.

---

## 3. Plan de Versión 1.2.0 (Normas Académicas y Tipografía Científica)

La etapa **v1.2.0** incorpora estándares rigurosos de tesis y tipografía matemática:

### 3.1. Numeración de Tesis de Doble Posición Automática
- Regla académica automatizada: primera página de cada capítulo en el **centro inferior**; páginas de continuación en la **esquina superior derecha**.
- Reinicio independiente de numeración por sección sin alterar secciones previas.

### 3.2. Notación Matemática KaTeX Fuera de Línea
- Motor KaTeX empaquetado 100% localmente.
- Inserción de fórmulas interactivas en línea (`Inline Math`) y en bloque (`Block Equation`).
- Numeración automática de ecuaciones en el margen derecho: `(1.1)`, `(1.2)`.

### 3.3. Tablas Científicas Avanzadas (Estilo Booktabs)
- Combinación de celdas horizontal y verticalmente.
- Bordes limpios sin líneas verticales: línea superior gruesa, línea de encabezado fina y línea de cierre inferior gruesa.
- Alineación decimal en columnas numéricas y repetición automática de encabezados en saltos de página.

### 3.4. Regla Vertical y Sangrías Avanzadas
- Deslizadores en regla horizontal para Sangría de Primera Línea y Sangría Francesa (normas APA/IEEE).
- Regla vertical a la izquierda para medición precisa de altura y ajuste visual de márgenes superior e inferior.

### 3.5. Corrector Ortográfico y Guía de Redacción Fuera de Línea
- Diccionario local integrado con sugerencias ortográficas contextuales en clic derecho y separación silábica automática (*hyphenation*) para párrafos justificados.

### 3.6. Estructura Automatizada de Documentos Académicos
- Tabla de Contenidos dinámica con líneas guía de puntos (*dot leaders*) y actualización con un clic.
- Listas automáticas de tablas y figuras con números de página sincronizados en tiempo real.
- Gestor de citas bibliográficas fuera de línea con importación BibTeX (`.bib`) y formatos APA 7, IEEE, Harvard y Vancouver.

---

## 4. Plan de Versión 1.3.0 (Distribución Multiplataforma Completa y Navegación)

La etapa **v1.3.0** amplía la disponibilidad en Windows y Linux e introduce navegación lateral:

### 4.1. Distribución en Microsoft Windows
- Instalador NSIS guiado (`.exe`) para arquitecturas x64 y ARM64 en Windows 10 y 11 con asociación de archivos `.baku`.
- Edición portátil sin instalación (`Baku_Portable.exe`) para laboratorios y entornos restringidos.
- Publicación oficial en el gestor de paquetes de Windows (`winget install Baku.BakuPDF`).

### 4.2. Distribución en GNU/Linux
- Paquete universal autocontenido `AppImage` para Ubuntu, Fedora, Arch Linux, Debian y openSUSE.
- Paquete nativo Debian/Ubuntu (`.deb`) con dependencias `webkit2gtk-4.1`.
- Soporte para Flatpak (Flathub) y paquete en Arch User Repository (AUR: `baku-bin`).

### 4.3. Distribución Avanzada en macOS
- Instalación mediante Homebrew Cask (`brew install --cask baku-pdf`).
- Firma de código oficial de Apple Developer ID y notarización para apertura inmediata sin advertencias de Gatekeeper.

### 4.4. Panel Lateral de Navegação de Documento
- Panel plegable a la izquierda con pestañas para esquema jerárquico de títulos (Capítulos y Subsecciones), miniaturas verticales de páginas y panel de resultados de búsqueda.

---

## 5. Plan de Versión 1.4.0 (Utilidades PDF Fuera de Línea y Seguridad)

La etapa **v1.4.0** añade herramientas avanzadas de manipulación PDF y saneamiento de privacidad:

### 5.1. Firma Digital y Rúbrica Fuera de Línea
- Trazado de firmas con cursor/lápiz óptico o importación de imágenes PNG transparentes con colocación mediante arrastrar y soltar.
- Firma por lotes en coordenadas fijas para documentos extensos y estampa de fecha.

### 5.2. Higienizador de Metadatos de Documentos
- Limpieza de nombres de autor, identificadores de máquina y marcas de tiempo ocultas para procesos de evaluación anónima (*Blind Review*).

### 5.3. Organizador Visual de Páginas PDF
- Cuadrícula de miniaturas para reordenar páginas arrastrando y soltando, eliminación rápida e inserción de páginas en blanco o de otros archivos PDF.

### 5.4. Marca de Agua Textual Fuera de Línea
- Estampado diagonal (45 grados) u horizontal con ajustes predefinidos (`BORRADOR`, `CONFIDENCIAL`, `COPIA OFICIAL`) y control de opacidad.

### 5.5. Protección y Cifrado de Contraseña PDF
- Cifrado estándar AES-256 local con contraseña de apertura y contraseña de permisos (restringir impresión y copia de texto).

### 5.6. Foliado y Numeración Externa (Bates Numbering)
- Estampado de números de página en documentos PDF externos con prefijos personalizables.

---

## 6. Plan de Versión 1.5.0 (Hito Cumbre del Ecosistema y Rendimiento Masivo)

La etapa **v1.5.0** representa el punto culminante del desarrollo de Baku PDF:

### 6.1. Paquetes de Plantillas Portátiles (.bakutpl)
- Exportación e importación de plantillas de usuario en archivos empaquetados `.bakutpl`.

### 6.2. Colección Expandida de Plantillas Estándar
- Artículos para revistas SINTA (doble columna) y conferencias IEEE.
- Propuestas de investigación estudiantil (PKM), informes de prácticas profesionales y proyectos de posgrado.
- Documentos oficiales de administración pública (Oficios, Decretos, Actas de entrega).

### 6.3. Renderizado Virtual de Hojas DOM (500+ Páginas)
- Montaje exclusivo de páginas dentro de la ventana de visualización (*viewport*) con latencia de tipeo inferior a 8 ms para manuscritos extensos.

### 6.4. Motor de Exportación PDF Nativo en Rust
- Generación de PDF vectorial puro con librerías Rust (`printpdf`/`lopdf`) y subconjunto de fuentes embebidas, reduciendo el peso de salida hasta un 60%.

### 6.5. Modo Oscuro y Claro Adaptativo Completo
- Tema oscuro de alto contraste conforme a normas de accesibilidad WCAG AAA, con opciones de hoja iluminada u hoja invertida y sincronización con el sistema operativo.

### 6.6. Modo Libre de Distracciones (Zen) y Vista Doble Página
- Ocultación total de herramientas (`F11` / `Cmd+Shift+F`) y visualización de dos páginas lado a lado en pantallas panorámicas.

### 6.7. Importador de Word (.docx) y Exportación Estándar
- Lector nativo Rust de archivos Word `.docx` con preservación de formato básico y exportación a `.docx`, texto plano (`.txt`) y Markdown (`.md`).

### 6.8. Especificación del Formato .baku v2.0
- Contenedor de adjuntos binarios comprimidos sin pérdida para imágenes de alta resolución y retrocompatibilidad total con la versión 1.0.0.

### 6.9. Autoguardado Periódico y Recuperación ante Fallos
- Guardado en segundo plano cada 60 segundos con panel de restauración tras cortes de energía e historial de revisiones a 15, 30 y 60 minutos.

---

## 7. Matriz de Prioridades Técnicas y Resumen de Etapas de Lanzamiento (v1.1.0 – v1.5.0)

### 7.1. Resumen de Etapas de Lanzamiento

| Versión | Enfoque Central | Módulos Integrados | Previsión |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Pestañas de Documentos y Eficiencia | Barra de Pestañas Multidocumento (Sección 2.1) y Compresor de PDF (Sección 2.2). | Próximo Lanzamiento |
| **v1.2.0** | Normas Académicas y Tipografía | Numeración Doble de Tesis (Sección 3.1), Fórmulas KaTeX (Sección 3.2), Tablas Booktabs (Sección 3.3), Regla Vertical (Sección 3.4), Corrector (Sección 3.5) y Estructura (Sección 3.6). | Fase 2 |
| **v1.3.0** | Distribución Multiplataforma | Instaladores Windows (`.exe`/portátil) (Sección 4.1), Linux AppImage/Debian (Sección 4.2), macOS (Sección 4.3) y Panel Lateral (Sección 4.4). | Fase 3 |
| **v1.4.0** | Utilidades PDF y Seguridad | Firma Digital (Sección 5.1), Higienizador de Metadados (Sección 5.2), Organizador de Páginas (Sección 5.3), Marca de Agua (Sección 5.4), Cifrado (Sección 5.5) y Foliado (Sección 5.6). | Fase 4 |
| **v1.5.0** | Hito Cumbre del Ecosistema | Paquetes `.bakutpl` (Sección 6.1), Plantillas Extras (Sección 6.2), DOM Virtual 500+ Páginas (Sección 6.3), Motor PDF Rust (Sección 6.4), Modo Oscuro (Sección 6.5), Modo Zen (Sección 6.6), Importador Word (Sección 6.7), `.baku` v2.0 (Sección 6.8) y Autoguardado (Sección 6.9). | Hito Cumbre |

### 7.2. Matriz de Prioridades de Desarrollo

| Módulo de Función | Componente Objetivo | Versión Objetivo | Prioridad | Complejidad Estimada |
| :--- | :--- | :--- | :--- | :--- |
| Barra de Pestañas Multidocumento | Frontend Editor y Motor de Estado | v1.1.0 | Muy Alta | Media |
| Compresor de Archivos PDF Fuera de Línea | Backend Rust (`lopdf` / `image`) | v1.1.0 | Muy Alta | Media |
| Reglas de Numeración de Tesis de Doble Posición | Motor de Hojas Frontend | v1.2.0 | Alta | Media |
| Notación Matemática KaTeX Fuera de Línea | Parser Frontend | v1.2.0 | Alta | Baja |
| Regla Vertical y Sangrías de Párrafo | Motor de Regla Frontend | v1.2.0 | Media | Media |
| Tablas Científicas Avanzadas (Booktabs) | Motor de Hojas Frontend | v1.2.0 | Media | Media |
| Instaladores Windows (.exe) y Linux (AppImage) | Tauri Bundler y CI | v1.3.0 | Muy Alta | Media |
| Panel Lateral de Navegación y Miniaturas | UI Frontend y DOM Virtual | v1.3.0 | Alta | Media |
| Firma Digital y Rúbrica Fuera de Línea | Backend Rust y Canvas Overlay | v1.4.0 | Media | Media |
| Higienizador de Metadados (Revisión Ciega) | Backend Rust y Pipeline PDF | v1.4.0 | Media | Baja |
| Organizador Visual de Páginas | UI Frontend y Backend Rust | v1.4.0 | Media | Media |
| Modo Oscuro Adaptativo | Motor de Temas CSS | v1.5.0 | Media | Baja |
| Paquetes de Plantillas Portátiles (.bakutpl) | Almacenamiento Frontend y JSON | v1.5.0 | Media | Baja |
| Virtualización DOM de Hojas (500+ Páginas) | Virtualizador DOM Frontend | v1.5.0 | Alta | Alta |
| Importador Word (.docx) Fuera de Línea | Parser Rust DOCX | v1.5.0 / Futuro | Futuro | Alta |

---

## 8. Contribuciones Comunitarias y Discusión de Funciones

- Propuestas de funciones: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Reporte de fallos: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guía de contribución: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Arquitectura técnica: [ARCHITECTURE.md](../ARCHITECTURE.md)
