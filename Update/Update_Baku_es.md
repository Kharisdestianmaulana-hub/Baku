<div align="center">
  <p>
    <strong>Idiomas del Mapa de Ruta / Roadmap Languages:</strong><br />
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

# Plan de Desarrollo de Baku PDF (Hoja de Ruta v1.1.0 – v1.5.0)

Este documento detalla la línea base de funcionalidades en el lanzamiento de **Baku PDF v1.0.0**, así como las nuevas características planificadas, mejoras de rendimiento y expansión de módulos organizadas en un plan de entregas escalonadas desde **Baku PDF v1.1.0 hasta v1.5.0**. Este plan escalonado se enfoca en perfeccionar la redacción académica avanzada, incorporar herramientas adicionales de manipulación de PDF fuera de línea, soporte multiplataforma completo (Windows, macOS, Linux) y optimización de renderizado para documentos extensos.

Principios rectores de desarrollo:
- **100% Fuera de Línea (Offline-First)**: Todo el procesamiento se realiza localmente sin servidores en la nube.
- **Privacidad Absoluta**: Sin analítica, sin rastreadores y sin transmisión de datos al exterior.
- **Bajo Consumo de Recursos**: Inicio rápido y uso mínimo de memoria RAM (~50–80 MB).
- **Diseño Plano 2D Minimalista**: Interfaz limpia, funcional y libre de distracciones.
- **Estándares de Formato Rigurosos**: Cumplimiento de normas académicas y administrativas formales.

---

## Tabla de Contenidos

1. [Estado de Funcionalidades Disponibles (Línea Base v1.0.0)](#1-estado-de-funcionalidades-disponibles-línea-base-v100)
2. [Editor de Documentos y Tipografía Científica Avanzada](#2-editor-de-documentos-y-tipografía-científica-avanzada)
3. [Estructuración Automatizada de Documentos Académicos](#3-estructuración-automatizada-de-documentos-académicos)
4. [Expansión de Herramientas Extra PDF Fuera de Línea](#4-expansión-de-herramientas-extra-pdf-fuera-de-línea)
5. [Colección Ampliada de Plantillas Estándar](#5-colección-ampliada-de-plantillas-estándar)
6. [Soporte Multiplataforma y Distribución de Binarios](#6-soporte-multiplataforma-y-distribución-de-binarios)
7. [Arquitectura del Núcleo, Rendimiento y Documentos Extensos](#7-arquitectura-del-núcleo-rendimiento-y-documentos-extensos)
8. [Interfaz de Usuario, Navegación y Accesibilidad](#8-interfaz-de-usuario-navegación-y-accesibilidad)
9. [Interoperabilidad de Formatos y Compatibilidad de Archivos](#9-interoperabilidad-de-formatos-y-compatibilidad-de-archivos)
10. [Seguridad del Documento y Limpieza de Metadatos](#10-seguridad-del-documento-y-limpieza-de-metadatos)
11. [Fases de Lanzamiento Escalonado y Matriz de Prioridades (v1.1.0 – v1.5.0)](#11-fases-de-lanzamiento-escalonado-y-matriz-de-prioridades-v110--v150)

---

## 1. Estado de Funcionalidades Disponibles (Línea Base v1.0.0)

Tras una auditoría exhaustiva del código fuente, los siguientes módulos **están completamente implementados en la versión 1.0.0**:

| Módulo de Función | Estado v1.0.0 | Detalle de Implementación |
| :--- | :--- | :--- |
| **Regla Horizontal Interactiva** | Implementado | Regla superior en centímetros con controles deslizantes de márgenes (`ruler-marker-left`, `ruler-marker-right`), guías de ajuste y botón de alternancia en cinta y menú Ver. |
| **8 Plantillas Estándar Integradas** | Implementado | Tesis de grado de 5 páginas, Artículo Científico, Informe de Laboratorio, Oficio Administrativo, **Carta de Presentación Laboral**, Acta de Reunión, **CV ATS Profesional** y Memorando Interno. |
| **Sistema de Creación de Plantillas Personalizadas** | Implementado | Guardar como Plantilla (`#action-save-as-template`), Crear Nueva Plantilla (`#btn-create-new-template`), banner de modo autor y filtro Mis Plantillas en Galería. |
| **Numeración de Páginas y Saltos de Sección** | Implementado | Modal de configuración (`#modal-page-number`) con formatos arábigos (`1, 2, 3`), romanos minúsculos (`i, ii, iii`), romanos mayúsculos (`I, II, III`) e inserción de saltos de sección. |
| **Encabezado y Pie Diferentes en Primera Página** | Implementado | Opción Primera Página Diferente (`diffFirst`) para ocultar o diferenciar la numeración en la portada. |
| **Modal de Enlaces Independiente** | Implementado | Modal plano 2D (`#modal-link-overlay`) con texto visible, campo de URL, eliminar enlace, atajo `Ctrl+K` / `Cmd+K` y apertura con `Ctrl/Cmd + Clic`. |
| **Controles de Zoom y Escala** | Implementado | Acercar, alejar, restablecer 100%, barra deslizante en estado inferior y ajuste de escala en Preferencias. |
| **4 Herramientas Extra PDF Fuera de Línea** | Implementado | Unir PDF, Dividir PDF, Rotar PDF e Imágenes a PDF mediante bibliotecas de Rust `lopdf` e `image`. |
| **Instalador Universal DMG para macOS** | Implementado | Paquete binario universal oficial (`x86_64` Intel + `arm64` Apple Silicon M1-M4) (`Baku_1.0.0_Universal_Installer.dmg`) con fondo de arrastrar y soltar y protección contra ejecución temporal (`check_running_from_dmg`). |

---

## 2. Editor de Documentos y Tipografía Científica Avanzada

### 2.1. Notación Matemática KaTeX Fuera de Línea
- Integración de analizador de fórmulas KaTeX 100% empaquetado de manera local.
- Inserción interactiva de expresiones matemáticas en línea y en bloque centrado.
- Numeración automática de ecuaciones al margen derecho según el capítulo: `(1.1)`, `(1.2)`.
- Compatibilidad con matrices, cálculo diferencial/integral y símbolos de física y química.

### 2.2. Expansión de Regla Interactiva: Sangrías y Regla Vertical
- Nuevos marcadores en la regla horizontal:
  - **Sangría de Primera Línea**: Define el inicio de párrafo con sangría (ej. 1 cm o 1.27 cm).
  - **Sangría Francesa**: Define el sangrado de las líneas siguientes (estándar APA, IEEE y Chicago en bibliografía).
- **Regla Vertical** en el margen izquierdo:
  - Medición precisa de la altura de página en centímetros.
  - Marcadores interactivos para ajustar márgenes superior e inferior en vivo sobre el lienzo.

### 2.3. Tablas Científicas Avanzadas
- Fusión de celdas horizontal y vertical.
- Estilo de bordes de publicación científica (Estilo Booktabs): sin líneas verticales divisorias (borde superior grueso, separador de encabezado fino y cierre inferior grueso).
- Alineación decimal para columnas numéricas.
- Repetición automática de la fila de encabezado en saltos de página.
- Numeración automática de títulos de tabla: `Tabla 1.1: Descripción`.

### 2.4. Corrector Ortográfico y Separación Silábica Fuera de Línea
- Diccionario local integrado para detección de erratas tipográficas.
- Subrayado rojo sutil para términos no reconocidos.
- Sugerencias contextuales mediante clic derecho.
- Separación silábica automatizada para párrafos justificados, evitando espaciados irregulares.

---

## 3. Estructuración Automatizada de Documentos Académicos

### 3.1. Reglas de Numeración de Tesis Académicas de Doble Posición
- Automatización de normas de numeración:
  - Primera página de cada capítulo nuevo (con título) muestra el número en la **parte inferior central**.
  - Páginas de desarrollo subsiguientes del capítulo colocan el número en la **esquina superior derecha**.
- Numeración de secciones independiente sin alterar las secciones previas.

### 3.2. Tabla de Contenidos Automática y Dinámica
- Generación instantánea de índice según la jerarquía de títulos (Título 1, Título 2, Título 3).
- Líneas de puntos guía automáticas que conectan el título con el número de página.
- Botón de actualización en un clic ante cambios de texto o paginación.

### 3.3. Lista de Tablas y Figuras Dinámica
- Seguimiento continuo de pies de figuras y leyendas de tablas.
- Generación automática de índices de figuras y tablas sincronizados en tiempo real.

### 3.4. Gestor de Citas y Bibliografía Fuera de Línea
- Entrada manual de referencias o importación de archivos BibTeX (`.bib`) y RIS.
- Formato de citas automatizado: APA 7ma Edición, IEEE, Harvard y Vancouver.
- Generación de lista bibliográfica final ordenada alfabéticamente con sangría francesa estándar.

---

## 4. Expansión de Herramientas Extra PDF Fuera de Línea

Junto a las 4 herramientas iniciales (Unir, Dividir, Rotar, Imágenes a PDF), la v1.5 introduce 6 utilidades complementarias:

### 4.1. Compresor de Archivos PDF Fuera de Línea
- Reducción local del tamaño de archivos PDF optimizada con Rust sin perder nitidez de texto.
- Valores predeterminados rápidos: menor a 500 KB, menor a 1 MB, menor a 2 MB y selección manual de DPI (150, 96, 72 DPI).
- Comparación visual del tamaño antes y después del procesamiento.

### 4.2. Firma Digital y Rúbrica Fuera de Línea
- Trazo directo de firma con cursor/lápiz óptico o importación de imagen transparente PNG.
- Ubicación de firma interactiva con vista previa sobre cualquier página.
- Firma masiva por coordenadas para documentos multipágina.
- Estampado de fecha y rúbricas fuera de línea.

### 4.3. Protección con Contraseña y Cifrado AES-256
- Contraseña de apertura de documento con cifrado estándar AES-256 local.
- Contraseña de permisos para restringir impresión, copiado de texto y edición de notas.
- Desbloqueo y eliminación de contraseñas para propietarios autorizados.

### 4.4. Organizador Visual de Páginas
- Cuadrícula de miniaturas para cada página del documento.
- Reordenación arrastrando y soltando páginas.
- Eliminación de páginas individuales o rangos específicos.
- Inserción de páginas en blanco o páginas de otros archivos PDF.

### 4.5. Foliado Bates y Numerador de PDF Externos
- Numeración de documentos PDF de terceros sin paginación previa.
- Posición configurable: superior derecha, inferior derecha o inferior central.
- Prefijo personalizable (ej. `Anexo Página 1 de 10`, `Folio 1`).

### 4.6. Herramienta de Marca de Agua Fuera de Línea
- Aplicación de marca de agua diagonal (45 grados) u horizontal.
- Textos rápidos: `BORRADOR`, `COPIA OFICIAL`, `CONFIDENCIAL`, `MUESTRA`.
- Control de opacidad, tamaño, color y rango de páginas.

---

## 5. Colección Ampliada de Plantillas Estándar

### 5.1. Publicaciones Científicas y Revistas
- **Artículo de Revista Académica (Formato a Doble Columna)**: Cabecera completa, resumen bilingüe y estructura formal IMRAD.
- **Artículo de Actas de Congresos IEEE**: Tipografía y márgenes oficiales con figuras a doble columna.

### 5.2. Gestión Universitaria y Subvenciones
- **Propuesta de Proyecto de Investigación Estudiantil**: Hoja de aprobación, desglose presupuestario y cronograma de trabajo.
- **Informe de Prácticas Profesionales**: Bitácora semanal, reseña institucional y evaluación.
- **Propuesta de Tesis de Maestría y Doctorado**: Marco metodológico riguroso e hipótesis.

### 5.3. Administración Pública e Institucional
- **Nota de Servicio y Orden de Comisión**: Formato institucional formal y consideraciones normativas.
- **Resolución Administrativa Oficial**: Estructura de Vistos, Considerando y Resuelve.
- **Acta de Entrega-Recepción**: Documento oficial con cláusulas testimoniales.

### 5.4. Exportación e Importación de Paquetes de Plantillas (.bakutpl)
- Empaquetado de plantillas personalizadas en archivos portátiles `.bakutpl`.
- Importación directa en galerías de otros equipos locales.

---

## 6. Soporte Multiplataforma y Distribución de Binarios

### 6.1. Distribución en Windows
- **Instalador Guiado NSIS (`.exe`)**: Paquetes de 64 bits (`x64`) y ARM64 para Windows 10 y 11 con asociación de archivos `.baku`.
- **Edición Portátil Independiente (`Baku_Portable.exe`)**: Ejecutable directo sin requerir permisos de administrador.
- **Gestor de Paquetes de Windows (`winget`)**: Manifiesto oficial en `winget-pkgs`.

### 6.2. Distribución en Linux
- **Paquete Universal `AppImage`**: Archivo único ejecutable compatible con las principales distribuciones.
- **Paquete Debian / Ubuntu (`.deb`)**: Binario nativo con dependencias integradas.
- **Flathub y Arch User Repository (AUR)**: Manifiesto Flatpak y paquete comunitario `baku-bin` en AUR.

### 6.3. Distribución Avanzada en macOS
- **Homebrew Cask**: Instalación vía consola (`brew install --cask baku-pdf`).
- **Firma de Código y Notarización de Apple**: Integración de Apple Developer ID para apertura directa sin advertencias de Gatekeeper.

---

## 7. Arquitectura del Núcleo, Rendimiento y Documentos Extensos

### 7.1. Renderizado Virtual de Páginas en el DOM
- Renderizado exclusivo de las páginas presentes en el área visible de pantalla más un búfer de 1 a 2 páginas.
- Soporte para manuscritos de más de 500 páginas sin elevación de memoria RAM.
- Latencia de respuesta de tecleo inferior a 8 milisegundos.

### 7.2. Motor de Exportación a PDF Vectorial Nativo en Rust
- Exportación basada en bibliotecas Rust (`printpdf` y `lopdf`) en conjunto con el motor WebView.
- Generación de texto vectorial seleccionable con reducción de tamaño de archivo de hasta un 60%.
- Subconjunto de fuentes (*Font Subsetting*) automático para empaquetar únicamente los glifos utilizados.

### 7.3. Autoguardado cada 60 Segundos y Recuperación ante Fallos
- Respaldo de seguridad periódico cada 60 segundos en almacenamiento local aislado.
- Ventana de restauración inmediata tras un cierre inesperado del equipo.
- Historial de instantáneas de revisión local para volver a estados de 15, 30 o 60 minutos atrás.

---

## 8. Interfaz de Usuario, Navegación y Accesibilidad

### 8.1. Panel Lateral de Navegación y Esquema
- Barra lateral izquierda plegable con árbol de títulos, miniaturas de página y resultados de búsqueda contextual.

### 8.2. Modo Oscuro y Claro Adaptativo
- Tema oscuro real con contraste conforme a la norma WCAG AAA.
- Modos de representación: hoja blanca física sobre lienzo oscuro o inversión nocturna de lectura.
- Sincronización automática con la apariencia del sistema operativo.

### 8.3. Modo Zen de Concentración Plena
- Ocultación total de menús y barras con atajo `F11` o `Cmd+Shift+F`.

### 8.4. Vista a Doble Página y Ajustes de Escala
- Modo de lectura y edición de dos páginas enfrentadas en pantallas panorámicas.

### 8.5. Barra de Pestañas Multidocumento (Multi-Document Tab Bar)
- **Propósito y Flujo de Trabajo**:
  - Elimina el cambio de ventanas del sistema operativo (Alt+Tab / Cmd+`) al trabajar con múltiples manuscritos de referencia en paralelo.
  - Apertura y edición simultánea de múltiples documentos `.baku` en una única ventana de aplicación.
- **Ubicación Ergonómica**:
  - Situada estratégicamente **debajo de la cinta de herramientas (Ribbon) y justo encima de la regla y el lienzo de edición**.
  - Respeta el flujo natural de trabajo de arriba hacia abajo: seleccionar herramientas en la cinta -> seleccionar archivo en la barra de pestañas -> editar contenido en el lienzo.
  - Aprovecha todo el ancho de la ventana sin saturar la barra de estado inferior.
- **Diseño Plano 2D y Estética Visual**:
  - Barra delgada y compacta (30 a 32 px de altura).
  - **Pestaña Activa**: Fondo blanco sólido (`#FFFFFF`) continuo con la regla, acento superior azul distintivo (`#2563EB`), título en negrita, botón de cierre `x` e indicador de cambios pendientes.
  - **Pestaña Inactiva**: Tono gris neutro (`#F3F2F1`) con separadores suaves.
  - Truncamiento con elipsis para nombres extensos y botón `+` para abrir nuevos documentos.
- **Desplazamiento Horizontal y Navegación**:
  - Proporcional para 1 a 5 pestañas abiertas.
  - Desplazamiento horizontal fluido al superar 5 documentos, con botones guía `<` y `>` en los extremos.
- **Persistencia de Sesión y Aislamiento de Estado**:
  - Modelo Delta JSON independiente para cada pestaña, preservando posición de cursor y desplazamiento exacto.
  - Pilas de Deshacer (`Ctrl/Cmd+Z`) y Rehacer (`Ctrl+Y` / `Cmd+Shift+Z`) aisladas por pestaña.
  - Punto azul o asterisco para advertir sobre documentos no guardados y confirmación de seguridad antes del cierre.
- **Optimización de Memoria RAM**:
  - Pestañas inactivas conservadas como estructuras de datos ligeras en RAM sin elementos pesados del DOM.

---

## 9. Interoperabilidad de Formatos y Compatibilidad de Archivos

### 9.1. Importación y Conversión de Archivos Word (.docx) Fuera de Línea
- Analizador nativo en Rust para importar documentos de Microsoft Word manteniendo estilos básicos.

### 9.2. Exportación a Formatos Estándar
- Exportación a `.docx`, texto plano (`.txt`) y Markdown académico (`.md`).

### 9.3. Especificación del Formato Nativo .baku v2.0
- Contenedor de adjuntos binarios comprimidos sin pérdida para imágenes de alta resolución.
- Compatibilidad retroactiva total con archivos `.baku` de la versión 1.0.0.

---

## 10. Seguridad del Documento y Limpieza de Metadatos

### 10.1. Limpiador de Metadatos
- Eliminación de nombres de autor, datos del sistema operativo y marcas de tiempo ocultas para revisión ciega (*Blind Review*).

### 10.2. Modo de Bloqueo Solo Lectura
- Protección de documentos finalizados contra modificaciones accidentales.

---

## 11. Fases de Lanzamiento Escalonado y Matriz de Prioridades (v1.1.0 – v1.5.0)

Para ofrecer nuevas funciones de manera rápida, confiable y probada sin esperar a que todos los módulos estén listos al mismo tiempo, el desarrollo se organiza en cinco fases de entrega:

### 11.1. Plan de Lanzamientos Escalonados

| Versión | Enfoque Principal | Módulos Incluidos | Plazo Objetivo |
| :--- | :--- | :--- | :--- |
| **v1.1.0** | Pestañas de Documentos y Flujo de Trabajo | Barra de Pestañas Multidocumento (Sección 8.5) y Compresor de PDF Fuera de Línea (Sección 4.1). | Próximo Lanzamiento |
| **v1.2.0** | Estándares Académicos y Tipografía Científica | Reglas de Numeración de Tesis de Doble Posición (Sección 3.1), Fórmulas KaTeX (Sección 2.1), Tablas Booktabs (Sección 2.3) y Regla Vertical (Sección 2.2). | Fase 2 |
| **v1.3.0** | Distribución Multiplataforma Completa | Instalador NSIS para Windows (`.exe`) y Edición Portátil (Sección 6.1), Paquete Universal Linux AppImage y Debian `.deb` (Sección 6.2). | Fase 3 |
| **v1.4.0** | Utilidades PDF y Seguridad Documental | Firma Digital y Rúbrica (Sección 4.2), Limpiador de Metadatos (Sección 10.1), Organizador Visual de Páginas (Sección 4.4) y Marca de Agua (Sección 4.6). | Fase 4 |
| **v1.5.0** | Hito del Ecosistema y Alto Rendimiento | Paquetes de Plantillas Portátiles `.bakutpl` (Sección 5.4), Renderizado Virtual DOM para 500+ Páginas (Sección 7.1), Modo Oscuro Completo (Sección 8.2) e Importación Word `.docx` (Sección 9.1). | Cúspide del Hito |

### 11.2. Matriz Técnica de Prioridades de Desarrollo

| Módulo de Función | Componente Objetivo | Versión Objetivo | Prioridad | Estimación de Complejidad |
| :--- | :--- | :--- | :--- | :--- |
| Barra de Pestañas Multidocumento | Frontend Editor y Motor de Estado | v1.1.0 | Muy Alta | Media |
| Compresor de Archivos PDF Fuera de Línea | Backend Rust (`lopdf` / `image`) | v1.1.0 | Muy Alta | Media |
| Reglas de Numeración de Tesis de Doble Posición | Motor de Páginas Frontend | v1.2.0 | Alta | Media |
| Notación Matemática KaTeX Fuera de Línea | Analizador Frontend | v1.2.0 | Alta | Baja |
| Regla Vertical y Sangrías de Párrafo | Motor de Regla Frontend | v1.2.0 | Media | Media |
| Tablas Científicas Avanzadas (Booktabs) | Motor de Páginas Frontend | v1.2.0 | Media | Media |
| Instaladores Windows (.exe) y Linux (AppImage) | Empaquetador Tauri y Flujo CI | v1.3.0 | Muy Alta | Media |
| Panel Lateral de Navegación y Miniaturas | UI Frontend y Virtualizador DOM | v1.3.0 | Alta | Media |
| Firma Digital y Rúbrica Fuera de Línea | Backend Rust y Superposición Canvas | v1.4.0 | Media | Media |
| Limpiador de Metadatos (Revisión Ciega) | Backend Rust y Flujo PDF | v1.4.0 | Media | Baja |
| Organizador Visual de Páginas | Frontend UI y Backend Rust | v1.4.0 | Media | Media |
| Modo Oscuro Adaptativo | Motor de Temas CSS | v1.5.0 | Media | Baja |
| Paquetes de Plantillas Portátiles (.bakutpl) | Almacén de Datos Frontend y JSON | v1.5.0 | Media | Baja |
| Renderizado Virtual de Páginas (500+ Páginas) | Virtualizador DOM Frontend | v1.5.0 | Alta | Alta |
| Importación de Word (.docx) Fuera de Línea | Analizador Rust DOCX | v1.5.0 / Futuro | Futuro | Alta |

---

## Discusión Comunitaria y Contribuciones

- Propuestas de funciones: [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)
- Reporte de errores: [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)
- Guía de contribución: [CONTRIBUTING.md](../CONTRIBUTING.md)
- Arquitectura del sistema: [ARCHITECTURE.md](../ARCHITECTURE.md)\n