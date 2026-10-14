<div align="center">
  <p>
    <strong>Idiomas / Languages:</strong><br />
    <a href="../README.md">English</a> |
    <a href="../README_ID.md">Bahasa Indonesia</a> |
    <strong>Español</strong> |
    <a href="README_FR.md">Français</a> |
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
  <p><strong>Procesador de Textos de Escritorio Ligero, Estandarizado y 100% Privado</strong></p>

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

## Tabla de Contenidos
- [Acerca de Baku PDF](#acerca-de-baku-pdf)
- [Características Principales](#características-principales)
- [Herramientas Extra PDF (100% Fuera de Línea)](#herramientas-extra-pdf-100-fuera-de-línea)
- [Hoja de Ruta de Próximas Versiones (v1.5 y Superior)](#hoja-de-ruta-de-próximas-versiones-v15-y-superior)
- [Arquitectura y Pila Tecnológica](#arquitectura-y-pila-tecnológica)
- [Requisitos del Sistema e Instalación](#requisitos-del-sistema-e-instalación)
- [Documentación Completa](#documentación-completa)
- [Licencia](#licencia)

---

## Acerca de Baku PDF

Baku PDF es un procesador de textos moderno para escritorio diseñado para la redacción de trabajos académicos, tesis de grado y correspondencia oficial con márgenes y formatos estrictos. Desarrollado bajo la filosofía **local-first**, todo el procesamiento de texto, renderizado de páginas y manipulación de archivos PDF se ejecuta al 100% de manera local y fuera de línea en su equipo, sin servidores externos, sin análisis de telemetría y sin suscripciones en la nube.

Construido sobre **Tauri** y **Rust** con una interfaz web pura en vanilla JavaScript, Baku PDF es ultraligero (consumo de memoria RAM de ~50–80 MB), inicia de forma instantánea y elimina la lentitud típica de los editores basados en Electron.

---

## Características Principales

1. **Pantalla de Inicio Rápida al Estilo Word**:
   - Inicio directo con documento en blanco.
   - Apertura nativa de archivos `.baku`.
   - Tarjetas miniatura de plantillas con vista previa de diseño y etiquetas de formato.
   - Historial de documentos recientes y acceso a la galería completa de plantillas.

2. **Galería de Plantillas y Creador Personalizado**:
   - Plantillas predeterminadas para tesis, artículos de investigación, cartas oficiales, informes de laboratorio y currículums ATS.
   - Filtro por categorías y buscador instantáneo.
   - Vista previa con diagrama de hoja en modo vertical u horizontal.
   - Bloqueo estricto de estándares (*Strict Standard Lock*) para proteger márgenes y dimensiones de página.
   - Exportación e importación de archivos de plantilla `.baku`.

3. **Motor Multi-Página y Multi-Sección Inteligente**:
   - Salto de Página (*Page Break*, Ctrl/Cmd + Enter) a 60 FPS sin retrasos de renderizado.
   - Salto de Sección (*Section Break*, Ctrl/Cmd + Shift + Enter) para reiniciar numeraciones o cambiar encabezados entre capítulos.
   - Diversos formatos de numeración: números arábigos, números romanos (minúsculas y mayúsculas) y letras.
   - Posicionamiento flexible en encabezado o pie de página.
   - Opción de primera página diferente para portadas oficiales.

4. **Regla Visual Interactiva**:
   - Escala horizontal milimétrica, centimétrica y en pulgadas.
   - Marcadores arrastrables: sangría de primera línea, sangría izquierda y margen derecho.
   - Sincronización en tiempo real con el párrafo activo.

5. **Galería de Estilos Tipográficos y Formato Preciso**:
   - Estilos rápidos: Normal, Título, Subtítulo, Encabezados 1, 2 y 3, Cita en bloque y Código monoespaciado.
   - Selector de tamaño de fuente (8pt a 72pt), interlineado (1.0, 1.15, 1.5, 2.0) y paletas de colores.
   - Preajustes de márgenes académicos (4-4-3-3 cm, 4-3-4-3 cm, 3-3-3-3 cm, 2.54 cm normal) y tamaños de papel (A4, Folio/F4, Carta, Legal).

6. **Utilidades Integradas del Documento**:
   - **Cambiar Mayúsculas y Minúsculas**: Tipo oración, minúsculas, MAYÚSCULAS, Tipo Título e Invertir.
   - **Estadísticas en Tiempo Real**: Contador de palabras, caracteres con/sin espacios, párrafos y tiempo estimado de lectura.
   - **Editor de Tablas Personalizadas**: Cuadrícula interactiva con barra flotante para agregar/eliminar filas y columnas.
   - **Manejo de Imágenes**: Inserción local, alineación, redimensionamiento proporcional y eliminación segura.
   - **Selector de Símbolos Especiales**: Diálogo de caracteres tipográficos, matemáticos y oficiales.

7. **Exportación WYSIWYG e Impresión Nativa**:
   - Generación de PDF con precisión píxel por píxel idéntica al lienzo de pantalla.
   - Diálogo de impresión integrado directamente con impresoras locales del sistema operativo.

---

## Herramientas Extra PDF (100% Fuera de Línea)

Baku PDF incluye utilidades independientes para trabajar con documentos PDF sin depender de internet:
- **Combinar PDF (Merge PDF)**: Une múltiples archivos PDF en un único documento con orden personalizable.
- **Dividir PDF (Split PDF)**: Extrae páginas específicas o rangos de páginas (por ejemplo: 1-3, 5, 8-10).
- **Rotar PDF (Rotate PDF)**: Corrige la orientación de páginas girándolas 90, 180 o 270 grados.
- **Imágenes a PDF (Images to PDF)**: Convierte colecciones de imágenes JPG/PNG en un documento PDF listo para imprimir.

---

## Hoja de Ruta de Próximas Versiones (v1.5 y Superior)

Mantenemos una hoja de ruta de desarrollo abierta y transparente que detalla las nuevas funciones planificadas, mejoras de rendimiento y versiones para diversas plataformas:

- **Barra de Pestañas Multidocumento**: Abra, edite y alterne entre múltiples documentos `.baku` en una sola ventana con estado aislado y desplazamiento horizontal fluido.
- **Compresor de Archivos PDF Fuera de Línea**: Metas predefinidas (<500 KB, <1 MB, <2 MB) y ajuste manual de DPI sin subir archivos a servidores externos.
- **Instaladores Multiplataforma**: Instalador NSIS para Windows (`.exe`), versión portátil independiente y paquetes Linux `AppImage` y Debian `.deb`.
- **Reglas de Numeración de Tesis de Doble Posición**: Numeración automática en el centro inferior para hojas iniciales de capítulo y en la esquina superior derecha para páginas de desarrollo.
- **Herramientas Científicas Fuera de Línea**: Fórmulas KaTeX fuera de línea, tablas estilo booktabs, organizador visual de páginas y firmas digitales.

Consulte la documentación completa de la hoja de ruta:
- [Hoja de Ruta en Español (../Update/Update_Baku_es.md)](../Update/Update_Baku_es.md)
- [English Roadmap (../Update/Update_Baku_en.md)](../Update/Update_Baku_en.md)
- [Directorio Completo de Hojas de Ruta (../Update/)](../Update/)

---

## Arquitectura y Pila Tecnológica

- **Backend**: Rust 2021 con Tauri Framework v1.6.
- **Motor PDF e I/O**: `lopdf` v0.31 para manipulación de bajo nivel de PDF y `printpdf` v0.7 para compilación de lienzo.
- **Frontend**: HTML5, CSS3 puro y JavaScript Vanilla ES6+ (cero frameworks adicionales).
- **Núcleo del Editor**: Quill.js 2.0 (compilación personalizada con extensiones de salto de página y sección).
- **Almacenamiento**: Formato estructurado JSON `.baku` con escritura atómica (*atomic write*).
- **Aceleración Gráfica**: Hojas de papel renderizadas como capas compuestas cacheadas en la GPU.

---

## Requisitos del Sistema e Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- Rust y Cargo (canal estable actualizado)
- Dependencias de compilación para Tauri según su plataforma (macOS, Windows o Linux)

### Ejecución del Proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Kharisdestianmaulana-hub/Baku.git
   cd Baku
   ```

2. Instalar dependencias de frontend:
   ```bash
   npm install
   ```

3. Iniciar en modo de desarrollo:
   ```bash
   npm run tauri dev
   ```

4. Compilar instaladores y binarios de distribución:
   ```bash
   npm run tauri build
   ```

---

## Documentación Completa

Ofrecemos documentación técnica y guías comunitarias para respaldar el desarrollo de código abierto:

| Documento | Descripción |
| :--- | :--- |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Guía de contribución, flujo de trabajo de Git y estándares de código. |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Especificaciones técnicas, flujo IPC de Tauri y formato `.baku`. |
| [CHANGELOG.md](../CHANGELOG.md) | Historial de versiones y notas de lanzamiento. |
| [SECURITY.md](../SECURITY.md) | Política de seguridad y reporte responsable de vulnerabilidades. |
| [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) | Normas de convivencia comunitaria y código de conducta. |
| [Hoja de Ruta (v1.5+)](../Update/Update_Baku_es.md) | Hoja de ruta multilingüe y especificaciones de funciones para futuras versiones. |

---

## Licencia

Este proyecto está distribuido bajo la Licencia MIT. Para más detalles, consulte el archivo [LICENSE](../LICENSE).
