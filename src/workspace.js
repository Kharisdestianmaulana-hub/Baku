// workspace.js
// Menangani pembuatan folder Baku Workspace, Exports, dan Templates secara otomatis

let bakuWorkspacePath = "";
let bakuExportsPath = "";
let bakuTemplatesPath = "";
let bakuUserTemplatesPath = "";

// 8 Data Preset Templat Bawaan
const BUILTIN_TEMPLATES_DATA = [
    {
        "fileName": "Skripsi_Standar.baku",
        "docName": "Skripsi_Standar",
        "templateMeta": {
            "id": "skripsi",
            "title": "Skripsi / Tugas Akhir",
            "category": "academic",
            "isStrictStandard": true,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "4-4-3-3 cm",
            "fontSummary": "Times New Roman, 12pt, Spasi 1.5",
            "desc": "Format baku karya ilmiah perguruan tinggi (5 halaman) dengan margin 4-4-3-3 cm, sampul terpusat, lembar pengesahan, abstrak dwibahasa, Bab I Pendahuluan terjustifikasi, dan daftar pustaka.",
            "keywords": [
                "skripsi",
                "tugas akhir",
                "thesis",
                "tesis",
                "undergraduate",
                "undergraduate thesis",
                "akademik",
                "academic",
                "penelitian",
                "research",
                "sidang",
                "karya ilmiah"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 40,
            "marginBottom": 30,
            "marginLeft": 40,
            "marginRight": 30,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": true,
                "format": "arabic",
                "start": 1,
                "align": "right",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "",
                    "align": "center",
                    "diffFirst": true,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "RANCANG BANGUN SISTEM MANAJEMEN DOKUMEN DIGITAL BERBASIS STANDARISASI FORMAT BAKU NASIONAL",
                "attributes": {
                    "bold": true,
                    "size": "16pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Studi Kasus Implementasi Tata Letak Presisi dan Paginasi Naskah Akademik",
                "attributes": {
                    "italic": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "SKRIPSI",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Diajukan untuk Memenuhi Sebagian Persyaratan Mencapai Gelar Sarjana Komputer (S.Kom.)",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "[ LOGO / LAMBANG PERGURUAN TINGGI ]",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Disusun Oleh:",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NAMA LENGKAP MAHASISWA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NIM. 2026110045",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "PROGRAM STUDI TEKNIK INFORMATIKA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "FAKULTAS ILMU KOMPUTER",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "UNIVERSITAS BAKU INDONESIA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "JAKARTA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "2026",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "HALAMAN PENGESAHAN",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Judul Skripsi : Rancang Bangun Sistem Manajemen Dokumen Digital Berbasis Standarisasi Format Baku Nasional",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Nama Mahasiswa: Nama Lengkap Mahasiswa",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Nomor Induk   : 2026110045",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Program Studi : Teknik Informatika",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Fakultas      : Ilmu Komputer",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Skripsi ini telah dipertahankan di hadapan Dewan Penguji pada Sidang Sarjana tanggal 13 Oktober 2026 dan dinyatakan LULUS memenuhi syarat kelulusan gelar Sarjana Komputer.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Komisi Pembimbing:",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Dosen Pembimbing I,",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Dr. Ir. Budi Rahardjo, M.Sc.",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NIP. 19750315 200003 1 001",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Dosen Pembimbing II,",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Siti Nurhaliza, M.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NIP. 19820720 200812 2 003",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Mengetahui,",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Ketua Program Studi Teknik Informatika,",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Prof. Dr. Hendra Wijaya, M.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NIP. 19681105 199403 1 002",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "ABSTRAK",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Nama Lengkap Mahasiswa. 2026. Rancang Bangun Sistem Manajemen Dokumen Digital Berbasis Standarisasi Format Baku Nasional. Skripsi. Program Studi Teknik Informatika, Fakultas Ilmu Komputer, Universitas Baku Indonesia. Pembimbing: (I) Dr. Ir. Budi Rahardjo, M.Sc., (II) Siti Nurhaliza, M.Kom.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Perkembangan sistem komputasi modern menuntut efisiensi tinggi dalam penyusunan dan pengolahan dokumen ilmiah. Ketidakseragaman format tata letak kerap menjadi hambatan utama dalam standarisasi arsip perguruan tinggi. Penelitian ini bertujuan merancang dan mengimplementasikan aplikasi manajemen dokumen luring yang mematuhi pedoman penulisan baku perguruan tinggi di Indonesia. Sistem dibangun menggunakan arsitektur desktop mandiri dengan modul verifikasi margin, hierarki penomoran otomatis, dan ekspor presisi tinggi.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Hasil pengujian fungsional pada berbagai konfigurasi dokumen menunjukkan bahwa sistem mampu menghasilkan keselarasan tata letak hingga 100% tanpa distorsi margin antarmuka. Dengan demikian, platform ini dapat dijadikan solusi andal dalam standardisasi naskah karya ilmiah bagi civitas akademika.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Kata Kunci: Dokumen Digital, Standar Baku, Skripsi, Tata Letak, Format Presisi.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "ABSTRACT",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "The rapid advancement of computational systems requires high efficiency in academic document preparation and processing. Layout non-standardization is frequently a primary obstacle in institutional archiving. This study aims to design and implement an offline document management platform complying with Indonesian academic guidelines. The system is built on a standalone desktop architecture featuring automated margin compliance, hierarchical page breaks, and high-fidelity rendering.",
                "attributes": {
                    "italic": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Functional testing across multiple document configurations demonstrates 100% layout consistency with zero margin degradation across output engines, proving the feasibility of standalone environments for rigorous academic documentation.",
                "attributes": {
                    "italic": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Keywords: Digital Document, Academic Standard, Undergraduate Thesis, Document Layout, Precision Rendering.",
                "attributes": {
                    "bold": true,
                    "italic": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "BAB I",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "PENDAHULUAN",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "1.1 Latar Belakang Masalah",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Dokumen karya ilmiah merupakan media komunikasi formal yang mendokumentasikan temuan penelitian secara sistematis dan terukur. Dalam lingkungan akademik di Indonesia, penulisan karya ilmiah seperti skripsi, tesis, dan disertasi diatur oleh pedoman ketat yang mencakup aspek tipografi, batas margin (4 cm kiri, 4 cm atas, 3 cm bawah, dan 3 cm kanan), serta konsistensi spasi dan penomoran halaman.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Meskipun teknologi pengolah kata telah tersedia secara luas, pengguna sering kali menghadapi kendala teknis berupa pergeseran tata letak saat berpindah perangkat lunak atau platform cetak. Oleh karena itu, diperlukan sebuah lingkungan kerja terstandarisasi yang mengunci format dokumen agar senantiasa konsisten dan siap cetak tanpa ketergantungan server luar.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1.2 Rumusan Masalah",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Berdasarkan latar belakang di atas, rumusan masalah dalam penelitian ini adalah:",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "1. Bagaimana merancang arsitektur pengolah dokumen luring yang mematuhi standar batas margin dan tata letak perguruan tinggi?",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "2. Bagaimana mengimplementasikan mekanisme pembagian halaman (pagination) dan penomoran otomatis yang akurat pada berkas cetak digital?",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1.3 Tujuan Penelitian",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Tujuan utama yang hendak dicapai melalui penelitian ini mencakup penyusunan modul penulisan karya ilmiah yang terstandarisasi, pengujian efisiensi pemrosesan naskah, serta penyediaan sarana evaluasi mandiri bagi mahasiswa dalam menyusun naskah akademik yang rapi dan bebas galat format.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1.4 Manfaat Penelitian",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "Manfaat teoretis dari penelitian ini adalah memperkaya kajian arsitektur perangkat lunak pengolah dokumen mandiri. Secara praktis, penelitian ini memberikan kemudahan bagi mahasiswa dan dosen pembimbing dalam memverifikasi kerapian naskah tugas akhir secara langsung.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "DAFTAR PUSTAKA",
                "attributes": {
                    "bold": true,
                    "size": "14pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Al-Kautsar, M., & Pratama, R. (2024). Standarisasi Tata Kelola Dokumen Digital Akademik. Jurnal Rekayasa Teknologi Informasi, 12(2), 145–158.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Direktorat Jenderal Pendidikan Tinggi. (2023). Panduan Penulisan Skripsi dan Karya Ilmiah Standar Nasional. Jakarta: Kemendikbudristek RI.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Pressman, R. S., & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach (9th ed.). New York: McGraw-Hill Education.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Sommerville, I. (2021). Software Engineering (10th ed.). Boston: Pearson Education.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Wijaya, H., & Santoso, B. (2025). Optimasi Kinerja Editor Teks Berbasis Web pada Lingkungan Aplikasi Desktop Mandiri. Jurnal Komputasi Terapan, 8(1), 88–97.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.5"
                }
            }
        ]
    },
    {
        "fileName": "Makalah_Ilmiah.baku",
        "docName": "Makalah_Ilmiah",
        "templateMeta": {
            "id": "makalah",
            "title": "Makalah Ilmiah / Paper",
            "category": "academic",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "3 cm rata",
            "fontSummary": "Times New Roman, 12pt, Spasi 1.15",
            "desc": "Format makalah kuliah dan artikel ilmiah rapi (3 halaman) dengan margin 3 cm, halaman judul, abstrak dwibahasa, pendahuluan, metodologi, hasil pembahasan, kesimpulan, dan referensi.",
            "keywords": [
                "makalah",
                "paper",
                "makalah ilmiah",
                "scientific",
                "scientific paper",
                "artikel",
                "article",
                "kuliah",
                "college",
                "tugas",
                "assignment"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 30,
            "marginBottom": 30,
            "marginLeft": 30,
            "marginRight": 30,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": true,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "Makalah Ilmiah Mahasiswa",
                    "align": "right",
                    "diffFirst": true,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "PENERAPAN METODOLOGI DOKUMEN DIGITAL TERSTANDARISASI PADA KARYA ILMIAH MAHASISWA",
                "attributes": {
                    "bold": true,
                    "size": "16pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Tinjauan Komparatif Efektivitas Penyusunan Makalah Kuliah dan Format Publikasi",
                "attributes": {
                    "italic": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Ahmad Fauzan¹, Rizky Pratama², Dewi Lestari³",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "¹Program Studi Informatika, Universitas Baku Indonesia",
                "attributes": {
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "²Program Studi Sistem Informasi, Institut Teknologi Nusantara",
                "attributes": {
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Email korespondensi: ahmad.fauzan@baku.ac.id",
                "attributes": {
                    "italic": true,
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "ABSTRAK",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Makalah ini menganalisis efektivitas penerapan format baku dalam penulisan naskah akademik mahasiswa. Standarisasi struktur penulisan memegang peranan krusial dalam kejelasan penyampaian gagasan, kemudahan telaah rekan sejawat, dan efisiensi pengarsipan ilmiah. Studi dilakukan dengan menguji 50 naskah makalah menggunakan parameter kesesuaian margin, konsistensi hierarki judul, dan kepatuhan sitasi. Hasil evaluasi membuktikan bahwa penggunaan templat terstandarisasi meningkatkan tingkat kepatuhan format dari 64% menjadi 98%.",
                "attributes": {
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Kata Kunci: Makalah Ilmiah, Standardisasi Dokumen, Tipografi Akademik, Evaluasi Format.",
                "attributes": {
                    "bold": true,
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "ABSTRACT",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "This paper investigates the effectiveness of standard formatting in university students' scientific papers. Structured writing plays a vital role in conceptual clarity, peer-review efficiency, and digital archiving. Evaluation across 50 papers demonstrates that adopting standardized templates enhances formatting compliance from 64% to 98%.",
                "attributes": {
                    "italic": true,
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Keywords: Scientific Paper, Document Standardization, Academic Typography, Format Verification.",
                "attributes": {
                    "bold": true,
                    "italic": true,
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "1. PENDAHULUAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "Penulisan naskah ilmiah menuntut disiplin tinggi terhadap format tata letak, sitasi kepustakaan, dan organisasi bab. Di lingkungan perguruan tinggi, mahasiswa kerap menghasilkan karya yang substansinya berbobot namun terkendala dalam kerapian penyajian. Permasalahan ini timbul karena ketidakseragaman piranti lunak pengolah kata serta kurangnya templat yang telah terkalibrasi secara presisi.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Tujuan utama penulisan makalah ini adalah menyajikan kerangka kerja baku untuk makalah kuliah dan artikel ilmiah mahasiswa, sehingga fokus penulis dapat tercurah sepenuhnya pada kedalaman analisis teoretis dan metodologis tanpa terdistraksi oleh pengaturan teknis yang berulang.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. KAJIAN TEORI DAN METODOLOGI PENELITIAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "Kajian literatur menunjukkan bahwa tata kelola dokumen yang teratur berkorelasi positif dengan pemahaman pembaca terhadap alur argumentasi ilmiah. Metode yang digunakan dalam kajian ini meliputi studi kepustakaan, analisis komparatif pedoman penulisan naskah jurnal nasional terakreditasi, serta pengujian templat pada berbagai skenario penyusunan naskah.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Tahapan pelaksanaan dimulai dari identifikasi elemen struktural baku (sampul, abstrak, bab pendahuluan, metode, temuan, simpulan, dan daftar pustaka), penyesuaian ukuran font sesuai hierarki naskah, hingga validasi margin kertas A4 berstandar 3 cm di setiap sisi.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "3. HASIL DAN PEMBAHASAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "Hasil pengujian memperlihatkan bahwa penyusunan dokumen menggunakan kerangka baku memangkas waktu revisi format hingga 75%. Mahasiswa tidak perlu lagi menyesuaikan spasi dan posisi batas halaman secara manual berulang kali. Kerapian tipografi juga mempermudah dosen pengampu dalam memberikan telaah substansial terhadap isi makalah.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "4. KESIMPULAN DAN SARAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "Penerapan templat naskah makalah ilmiah baku memberikan manfaat nyata dalam meningkatkan kualitas penyajian akademik dan produktivitas mahasiswa. Disarankan agar institusi pendidikan menyediakan templat baku yang kompatibel dengan berbagai platform pengolah kata.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "DAFTAR PUSTAKA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Haryanto, A. (2024). Pedoman Penulisan Naskah dan Artikel Ilmiah Mahasiswa. Yogyakarta: Pustaka Pelajar.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Nugroho, E., & Wibowo, S. (2023). Analisis Pemanfaatan Pengolah Dokumen Modern dalam Dunia Akademik. Jurnal Pendidikan dan Pembelajaran Komputer, 15(1), 45-56.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Suryadi, T. (2025). Tipografi Dokumen Ilmiah dan Dampaknya pada Efisiensi Penilaian Naskah. Jurnal Informatika Akademika, 9(3), 112-123.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            }
        ]
    },
    {
        "fileName": "Laporan_Praktikum.baku",
        "docName": "Laporan_Praktikum",
        "templateMeta": {
            "id": "laporan_praktikum",
            "title": "Laporan Praktikum / PKL",
            "category": "academic",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "4-4-3-3 cm",
            "fontSummary": "Times New Roman, 12pt, Spasi 1.15",
            "desc": "Format laporan laboratorium atau praktik kerja lapangan (3 halaman) lengkap dengan sampul resmi, tujuan, landasan teori, metodologi, hasil analisis terjustifikasi, kesimpulan, dan lembar pengesahan asisten.",
            "keywords": [
                "laporan",
                "praktikum",
                "pkl",
                "magang",
                "report",
                "practicum",
                "practicum report",
                "internship",
                "lab",
                "laboratorium",
                "laboratory"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 40,
            "marginBottom": 30,
            "marginLeft": 40,
            "marginRight": 30,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": true,
                "format": "arabic",
                "start": 1,
                "align": "right",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "LAPORAN PRAKTIKUM",
                "attributes": {
                    "bold": true,
                    "size": "16pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "LABORATORIUM TEKNOLOGI INFORMASI DAN KOMPUTASI",
                "attributes": {
                    "bold": true,
                    "size": "13pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "MODUL I: PENGUJIAN PERANGKAT LUNAK DAN STANDAR VALIDASI TATA LETAK DOKUMEN",
                "attributes": {
                    "bold": true,
                    "size": "13pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center",
                    "lineheight": "1.5"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "[ LOGO INSTITUSI / LABORATORIUM ]",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Disusun Oleh:",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Nama Praktikan  : Ahmad Fauzi",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "NIM             : 202611001",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Kelas / Kelompok: IF-3A / Kelompok 4",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Tanggal Praktik : 13 Oktober 2026",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Dosen Pengampu  : Dr. Ir. Budi Santoso, M.Kom.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Asisten Lab     : Hendra Wijaya, S.Kom.",
                "attributes": {
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "PROGRAM STUDI TEKNIK INFORMATIKA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "FAKULTAS ILMU KOMPUTER",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "UNIVERSITAS BAKU INDONESIA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "2026",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "I. TUJUAN PRAKTIKUM",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Mahasiswa memahami prinsip dasar penulisan dan tata letak dokumen berstandar baku.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "2. Mahasiswa mampu memverifikasi hasil uji coba menggunakan modul evaluasi otomatis.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "3. Mahasiswa terampil dalam mendeteksi dan menyelesaikan permasalahan pergeseran tata letak halaman naskah.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "II. LANDASAN TEORI",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Pengujian perangkat lunak merupakan proses eksekusi program dengan niat menemukan galat atau memastikan kepatuhan fungsi terhadap spesifikasi yang telah ditetapkan. Dalam konteks pengolah dokumen, pengujian tata letak mencakup verifikasi batas margin fisik, perhitungan koordinat pembagian halaman (pagination boundary), serta integritas elemen grafis saat diekspor ke format PDF siap cetak.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "III. ALAT DAN BAHAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- 1 Unit Komputer / Laptop dengan Sistem Operasi Modern (macOS / Windows)",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Aplikasi Baku PDF Desktop Workspace Versi 1.0",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Berkas Naskah Uji Coba Terstandarisasi",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Lembar Panduan Kerja Laboratorium Komputer",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "IV. PROSEDUR PERCOBAAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Menjalankan aplikasi Baku PDF dan memilih templat Laporan Praktikum dari galeri templat resmi.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "2. Mengonfigurasi parameter margin sesuai ketentuan modul (Top: 4 cm, Left: 4 cm, Bottom: 3 cm, Right: 3 cm).",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "3. Mengisi identitas praktikum, tujuan, serta ringkasan landasan teori pendukung.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "4. Melakukan simulasi penambahan halaman dengan Page Break dan memeriksa keselarasan batas kertas.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "V. HASIL PENGAMATAN DAN ANALISIS",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Berdasarkan uji coba yang telah dilakukan, pemisahan halaman menggunakan Page Break bekerja secara presisi tanpa meninggalkan celah kosong tak terkendali pada kanvas cetak. Seluruh elemen judul, sub-bab, dan nomor urut tetap berada pada posisi yang konsisten di setiap lembar kertas.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Analisis terhadap berkas ekspor PDF membuktikan bahwa koordinat elemen teks dan tabel bersesuaian penuh dengan standar A4 portrait, dengan ketepatan margin mencapai toleransi di bawah 0.5 mm.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "VI. KESIMPULAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Penggunaan modul format baku memudahkan penyusunan naskah laporan laboratorium yang seragam dan rapi.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "2. Mekanisme pagination otomatis dan pemutus halaman manual memberikan fleksibilitas tanpa mengorbankan kepatuhan terhadap format standar.",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Jakarta, 13 Oktober 2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Mengetahui,",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Asisten Laboratorium,",
                "attributes": {
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Hendra Wijaya, S.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "ID Asisten: LAB-INF-2026-08",
                "attributes": {
                    "size": "10pt",
                    "font": "Times New Roman"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            }
        ]
    },
    {
        "fileName": "Surat_Resmi.baku",
        "docName": "Surat_Resmi",
        "templateMeta": {
            "id": "surat_resmi",
            "title": "Surat Resmi / Surat Dinas",
            "category": "letter",
            "isStrictStandard": true,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "2.54 cm rata",
            "fontSummary": "Arial, 11pt, Spasi 1.15",
            "desc": "Format baku surat dinas atau instansi pemerintah/swasta (2 halaman) memuat kop surat resmi, nomor berkas, perihal, badan surat terjustifikasi, blok tanda tangan pejabat, dan lampiran jadwal kegiatan.",
            "keywords": [
                "surat",
                "resmi",
                "dinas",
                "official",
                "official letter",
                "letter",
                "surat dinas",
                "surat resmi",
                "instansi",
                "formal",
                "kop surat",
                "undangan",
                "invitation"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 25.4,
            "marginBottom": 25.4,
            "marginLeft": 25.4,
            "marginRight": 25.4,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": false,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
                "attributes": {
                    "bold": true,
                    "size": "13pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Jalan Jenderal Sudirman, Senayan, Jakarta Pusat 10270 | Telepon: (021) 571-1144",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Laman: kemdikbud.go.id | Pos-el: persuratan@kemdikbud.go.id",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "13 Oktober 2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Nomor   : 0142/E.E1/PR.02/2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Sifat   : Penting / Segera",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Lampiran: 1 (Satu) Berkas",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Hal     : Undangan Rapat Koordinasi Nasional Standarisasi Format Dokumen Akademik",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Yth. Pimpinan Perguruan Tinggi Negeri dan Swasta",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "di Seluruh Indonesia",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Dengan hormat,",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Dalam rangka mewujudkan tata kelola pengarsipan naskah akademik yang tertib, modern, dan terstandarisasi secara nasional, Direktorat Jenderal Pendidikan Tinggi mengundang Bapak/Ibu atau perwakilan yang ditunjuk untuk menghadiri Rapat Koordinasi Nasional Standarisasi Format Dokumen Digital yang akan diselenggarakan pada:",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Hari, Tanggal : Senin s.d. Selasa, 19 - 20 Oktober 2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Waktu         : 08.30 WIB s.d. selesai",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Tempat        : Ruang Sidang Utama Graha Diktiristek, Gedung D Lt. 2, Jakarta Pusat",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Agenda        : Sosialisasi Pedoman Baku dan Integrasi Editor Dokumen Mandiri",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Mengingat pentingnya agenda tersebut, kami mengharapkan kehadiran Bapak/Ibu tepat pada waktu yang telah ditentukan. Konfirmasi kehadiran dapat disampaikan paling lambat hari Jumat, 16 Oktober 2026 melalui panitia pelaksana terlampir.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Demikian surat undangan ini kami sampaikan. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Sekretaris Direktorat Jenderal,",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Prof. Dr. Ir. Tjitjik Srie Tjahjandarie, M.Sc.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "NIP. 19680512 199303 2 001",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Tembusan:",
                "attributes": {
                    "size": "9.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Direktur Jenderal Pendidikan Tinggi (sebagai laporan)",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. Kepala Biro Perencanaan dan Hubungan Masyarakat",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "LAMPIRAN SURAT UNDANGAN DINAS",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Nomor : 0142/E.E1/PR.02/2026 | Tanggal: 13 Oktober 2026",
                "attributes": {
                    "size": "10pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "JADWAL DAN SUSUNAN ACARA",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "RAPAT KOORDINASI NASIONAL STANDARISASI FORMAT DOKUMEN DIGITAL",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "HARI PERTAMA: SENIN, 19 OKTOBER 2026",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "08.30 - 09.00 WIB : Registrasi Peserta dan Pengambilan Berkas Panduan",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "09.00 - 09.30 WIB : Pembukaan dan Lagu Kebangsaan Indonesia Raya",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "09.30 - 10.15 WIB : Sambutan Arahan Direktur Jenderal Pendidikan Tinggi",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "10.15 - 12.00 WIB : Paparan Kebijakan Standarisasi Format Naskah Akademik Nasional",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "12.00 - 13.00 WIB : Istirahat, Sholat, dan Makan Siang",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "13.00 - 15.30 WIB : Workshop Teknis Penggunaan Editor Dokumen Baku Luring",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "15.30 - 16.00 WIB : Diskusi Interaktif dan Tanya Jawab Sesi I",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "HARI KEDUA: SELASA, 20 OKTOBER 2026",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "09.00 - 11.30 WIB : Sidang Pleno Perumusan Rekomendasi Format Baku Digital",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "11.30 - 12.30 WIB : Penandatanganan Komitmen Bersama Pimpinan Institusi",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "12.30 - 13.30 WIB : Penutupan Resmi dan Penyerahan Sertifikat Kepesertaan",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Catatan Khusus Peserta:",
                "attributes": {
                    "bold": true,
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Peserta diwajibkan membawa komputer jinjing dengan peramban modern terpasang.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "2. Berkas materi dan panduan instalasi dapat diakses secara luring melalui modul USB panitia.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Ketua Panitia Pelaksana,",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Dr. H. Hendra Wijaya, M.Si.",
                "attributes": {
                    "bold": true,
                    "size": "10.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            }
        ]
    },
    {
        "fileName": "Surat_Lamaran_Kerja.baku",
        "docName": "Surat_Lamaran_Kerja",
        "templateMeta": {
            "id": "surat_lamaran",
            "title": "Surat Lamaran Kerja",
            "category": "letter",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "2.54 cm rata",
            "fontSummary": "Calibri, 11pt, Spasi 1.15",
            "desc": "Format profesional baku surat lamaran pekerjaan (2 halaman) memuat tanggal kanan, perihal, data identitas, kualifikasi terjustifikasi, tanda tangan, dan lampiran ringkasan curriculum vitae (CV).",
            "keywords": [
                "surat",
                "lamaran",
                "lamaran kerja",
                "kerja",
                "job",
                "job application",
                "application",
                "application letter",
                "letter",
                "cover letter",
                "resume",
                "pekerjaan",
                "hrd",
                "rekrutmen",
                "recruitment"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 25.4,
            "marginBottom": 25.4,
            "marginLeft": 25.4,
            "marginRight": 25.4,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": false,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "Jakarta, 13 Oktober 2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Perihal  : Lamaran Pekerjaan - Senior Software Engineer",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Lampiran : 1 (Satu) Berkas Riwayat Hidup dan Dokumen Pendukung",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Yth. Human Resources Department / Head of Talent Acquisition",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PT Teknologi Nusantara Maju",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Gedung Graha Equity Lantai 18, Jalan Jenderal Sudirman Kav. 52-53",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Jakarta Selatan 12190",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Dengan hormat,",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Berdasarkan informasi lowongan pekerjaan yang dipublikasikan pada portal karier resmi PT Teknologi Nusantara Maju, saya bermaksud untuk mengajukan diri guna bergabung dengan perusahaan yang Bapak/Ibu pimpin sebagai Senior Software Engineer.",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Berikut adalah ringkasan data diri saya:",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Nama Lengkap          : Muhammad Rizky Pratama, S.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Tempat, Tanggal Lahir : Bandung, 15 Mei 1999",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Pendidikan Terakhir   : Sarjana Komputer - Teknik Informatika, Universitas Indonesia",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Alamat Domisili       : Jl. Kebon Sirih No. 42, Menteng, Jakarta Pusat",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Nomor Kontak / WA     : 0812-3456-7890",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Alamat Pos-el (Email) : rizky.pratama@email.com",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Saya memiliki pengalaman lebih dari 4 tahun dalam rekayasa perangkat lunak berskala produksi, dengan spesialisasi pada arsitektur sistem berbasis desktop dan web modern, optimasi komputasi luring, serta penanganan berkas dokumen digital. Saya memiliki komitmen kerja yang tinggi, integritas kepemimpinan, serta terbiasa berkolaborasi dalam tim multidisiplin yang adaptif.",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Sebagai bahan pertimbangan Bapak/Ibu, bersama surat ini saya lampirkan kelengkapan berkas pendukung:",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "1. Curriculum Vitae (Daftar Riwayat Hidup) Terbaru",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. Salinan Ijazah Sarjana dan Transkrip Nilai Akademik Resmi",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "3. Salinan Sertifikat Kompetensi Profesi dan Keahlian Rekayasa Sistem",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "4. Portofolio Proyek Rekayasa Perangkat Lunak Terintegrasi",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Besar harapan saya untuk diberikan kesempatan menghadiri sesi wawancara langsung agar dapat memaparkan potensi dan kualifikasi saya secara lebih mendalam. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya sampaikan terima kasih.",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Hormat saya,",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Muhammad Rizky Pratama, S.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "CURRICULUM VITAE RINGKAS",
                "attributes": {
                    "bold": true,
                    "size": "15pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "MUHAMMAD RIZKY PRATAMA, S.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "13pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Jakarta, Indonesia | +62 812-3456-7890 | rizky.pratama@email.com | linkedin.com/in/rizky-pratama",
                "attributes": {
                    "size": "10pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "RINGKASAN PROFIL PROFESIONAL",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Software Engineer profesional dengan rekam jejak terbukti dalam membangun aplikasi berkinerja tinggi, responsif, dan stabil. Berpengalaman memimpin tim kecil pengembang perangkat lunak serta berkolaborasi erat dengan manajer produk dalam menghadirkan solusi teknologi mutakhir.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PENGALAMAN KERJA RELEVAN",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Senior Software Engineer | PT Inovasi Solusi Digital (2023 - Sekarang)",
                "attributes": {
                    "bold": true,
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Memimpin pengembangan modul pengolahan dokumen mandiri dengan performa 3x lebih cepat.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Mengurangi angka kegagalan ekspor naskah menjadi di bawah 0.1% melalui refaktorisasi arsitektur.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Full Stack Developer | PT Cipta Kreasi Mandiri (2021 - 2023)",
                "attributes": {
                    "bold": true,
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Mengembangkan sistem layanan dokumen elektronik yang melayani lebih dari 100.000 pengguna aktif.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Mengintegrasikan protokol keamanan data terenkripsi dan standardisasi format berkas.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "RIWAYAT PENDIDIKAN",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Sarjana Komputer (S.Kom.) - Teknik Informatika, Universitas Indonesia (2017 - 2021)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Indeks Prestasi Kumulatif (IPK): 3.84 / 4.00 (Predikat Cum Laude)",
                "attributes": {
                    "italic": true,
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "KEAHLIAN DAN KOMPETENSI",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Pemrograman: JavaScript/TypeScript, Rust, Python, Go, SQL",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Platform & Tools: Tauri, Node.js, Web Standards, Git, Docker, CI/CD",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Sertifikasi: AWS Certified Solutions Architect (2024), Professional Scrum Master (2023)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            }
        ]
    },
    {
        "fileName": "Notula_Rapat.baku",
        "docName": "Notula_Rapat",
        "templateMeta": {
            "id": "notula_rapat",
            "title": "Notula Rapat (Meeting Minutes)",
            "category": "office",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "2.54 cm rata",
            "fontSummary": "Segoe UI, 11pt, Spasi 1.15",
            "desc": "Format notula rapat resmi instansi/kantor (2 halaman) memuat judul tengah, identitas rapat, agenda, ringkasan pembahasan terjustifikasi, keputusan, tabel action items (PIC), dan pengesahan notulis serta pimpinan.",
            "keywords": [
                "notula",
                "notulen",
                "rapat",
                "minutes",
                "meeting",
                "meeting minutes",
                "pertemuan",
                "agenda",
                "pic",
                "tindak lanjut",
                "koordinasi",
                "action items"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 25.4,
            "marginBottom": 25.4,
            "marginLeft": 25.4,
            "marginRight": 25.4,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": true,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "NOTULA RAPAT KOORDINASI PROYEK",
                    "align": "left",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "NOTULA RAPAT KOORDINASI PROYEK",
                "attributes": {
                    "bold": true,
                    "size": "15pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Evaluasi Kinerja Triwulan III dan Rencana Strategis Triwulan IV Tahun 2026",
                "attributes": {
                    "italic": true,
                    "size": "11pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Hari / Tanggal  : Selasa, 13 Oktober 2026",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Waktu           : 09.30 - 12.30 WIB",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Tempat          : Ruang Rapat Utama Flamboyan Lt. 3 / Video Conference",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Pemimpin Rapat  : Denny Hermawan, S.T., M.M. (Direktur Operasional)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Notulis         : Anita Salsabila, S.I.Kom. (Sekretaris Divisi)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Peserta Hadir   : 14 Orang (Daftar absensi kehadiran terlampir)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. AGENDA PEMBAHASAN RAPAT",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "a. Laporan kemajuan pengembangan aplikasi Baku PDF versi desktop mandiri.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "b. Evaluasi performa sistem pembagian halaman (pagination engine) dan manajemen galeri templat.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "c. Alokasi sumber daya dan jadwal uji coba pengguna akhir (User Acceptance Test).",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "d. Rencana mitigasi risiko terkait batas tenggat rilis stabil versi 1.0.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. RINGKASAN PEMBAHASAN DAN DISKUSI",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Poin 1 - Kemajuan Rekayasa Sistem: Tim Teknis memaparkan bahwa seluruh fitur utama pengolahan dokumen, penggabungan PDF, dan penataan margin cetak telah rampung 100%. Uji performa membuktikan efisiensi memori yang stabil tanpa kebocoran memori pada pengoperasian jangka panjang.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Poin 2 - Penataan Templat Resmi: Ditemukan masukan pengguna mengenai perlunya struktur templat multi-halaman yang mencakup seluruh halaman pengesahan, abstrak dwibahasa, serta hierarki bab yang lengkap. Disepakati bahwa seluruh 8 templat bawaan diperbarui dengan standar akademis dan formal.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "3. KEPUTUSAN DAN KESEPAKATAN RAPAT",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "a. Menyetujui pembaruan menyeluruh pada galeri templat resmi Baku PDF agar berstruktur multi-halaman dan memiliki tata letak terstandarisasi.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "b. Menjadwalkan pelaksanaan User Acceptance Test (UAT) tahap kedua pada tanggal 20 Oktober 2026 dengan melibatkan perwakilan civitas akademika.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "c. Menetapkan tanggal peluncuran stabil publik pada hari Kamis, 29 Oktober 2026.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "4. RENCANA TINDAK LANJUT / ACTION ITEMS (PIC)",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "No | Uraian Tugas / Action Item                     | Penanggung Jawab | Tenggat Waktu",
                "attributes": {
                    "bold": true,
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. | Finalisasi 8 templat baku multi-halaman        | Tim Frontend     | 16 Okt 2026",
                "attributes": {
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. | Pengujian regresi fungsi ekspor PDF presisi     | Tim QA / Tester  | 19 Okt 2026",
                "attributes": {
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "3. | Penyusunan buku manual panduan operasional      | Tim Dokumentasi  | 22 Okt 2026",
                "attributes": {
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "4. | Persiapan infrastruktur pengunduhan rilis akhir | Tim DevOps       | 25 Okt 2026",
                "attributes": {
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Jakarta, 13 Oktober 2026",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Mengetahui,",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Pemimpin Rapat,                                                          Notulis Rapat,",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Denny Hermawan, S.T., M.M.                               Anita Salsabila, S.I.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "10.5pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Direktur Operasional                                                     Sekretaris Divisi",
                "attributes": {
                    "size": "10pt",
                    "font": "Segoe UI"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            }
        ]
    },
    {
        "fileName": "Curriculum_Vitae_ATS.baku",
        "docName": "Curriculum_Vitae_ATS",
        "templateMeta": {
            "id": "cv_ats",
            "title": "Curriculum Vitae (CV) ATS",
            "category": "office",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "2 cm rata",
            "fontSummary": "Calibri, 11pt, Spasi 1.15",
            "desc": "Format resume ATS-friendly 2 halaman dengan hierarki tipografi rapi, nama tengah 18pt bold, ringkasan profil terjustifikasi, pengalaman kerja profesional, pendidikan, keahlian teknis, dan sertifikasi.",
            "keywords": [
                "cv",
                "curriculum vitae",
                "resume",
                "ats",
                "riwayat hidup",
                "daftar riwayat hidup",
                "biodata",
                "portofolio",
                "job application",
                "pekerjaan"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 20,
            "marginBottom": 20,
            "marginLeft": 20,
            "marginRight": 20,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": false,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "DIMAS ARYA PRABOWO, S.Kom.",
                "attributes": {
                    "bold": true,
                    "size": "18pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Jakarta, Indonesia | +62 812-9876-5432 | dimas.arya@email.com | linkedin.com/in/dimas-arya",
                "attributes": {
                    "size": "10pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "bold": true,
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "RINGKASAN PROFESIONAL",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Senior System Analyst & Software Architect dengan lebih dari 6 tahun pengalaman dalam merancang dan mengembangkan platform pemrosesan dokumen digital berskala besar. Memiliki keahlian mendalam pada optimalisasi sistem luring (offline-first), arsitektur antarmuka WYSIWYG, dan efisiensi memori aplikasi desktop. Berhasil memimpin berbagai inisiatif transformasi teknologi dengan dampak efisiensi operasional hingga 40%.",
                "attributes": {
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PENGALAMAN KERJA PROFESIONAL",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Senior System Analyst | PT Sinergi Informatika Global, Jakarta",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Januari 2022 - Sekarang",
                "attributes": {
                    "italic": true,
                    "size": "10pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Mengarsiteki mesin pemroses dokumen desktop mandiri yang memangkas latensi ekspor PDF hingga 65%.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Memimpin tim rekayasa perangkat lunak beranggotakan 10 engineer lintas disiplin teknologi.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Merancang protokol standarisasi tata letak naskah resmi yang digunakan oleh 25+ instansi mitra.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Mengimplementasikan integrasi CI/CD otomatis yang meningkatkan stabilitas rilis produk menjadi 99.8%.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Lead Software Engineer | PT Digital Solusindo Pratama, Bandung",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Maret 2019 - Desember 2021",
                "attributes": {
                    "italic": true,
                    "size": "10pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Mengembangkan sistem manajemen dokumen korporat berbasis web dan desktop terintegrasi.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Menangani arsitektur rendering kanvas naskah multi-halaman dengan dukungan paginasi cerdas.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Mengurangi konsumsi memori peramban sebesar 35% melalui virtualisasi viewport dinamis.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "RIWAYAT PENDIDIKAN FORMAL",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Sarjana Komputer (S.Kom.) - Teknik Informatika",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Universitas Indonesia, Depok | Lulus: 2019 | IPK: 3.86 / 4.00 (Cum Laude)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Fokus Penelitian: Optimasi Algoritma Penataan Tata Letak Dokumen Berbasis Node Grafis.",
                "attributes": {
                    "italic": true,
                    "size": "10pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "KEAHLIAN DAN KOMPETENSI TEKNIS",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Bahasa Pemrograman: JavaScript/TypeScript, Rust, Python, Go, C++, SQL",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Frontend & Platform: Tauri Framework, React, Vue, Web Standards (Parchment, Canvas API)",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Perangkat & Infrastruktur: Git, Docker, Kubernetes, Linux/Unix, AWS Cloud Infrastructure",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "- Metodologi Kerja: Agile/Scrum, Test-Driven Development (TDD), Clean Architecture",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PROYEK TEKNOLOGI UNGGULAN",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Baku PDF Desktop Engine (2025 - 2026)",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Mengembangkan sistem editor PDF desktop luring mandiri dengan akurasi margin sub-milimeter.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Smart Pagination Layout Engine (2024)",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Membangun algoritma deteksi overflow halaman otomatis yang menyinkronkan jeda halaman secara presisi.",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "LISENSI DAN SERTIFIKASI PROFESIONAL",
                "attributes": {
                    "bold": true,
                    "size": "12pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Certified Information Systems Security Professional (CISSP) - 2024",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- AWS Certified Solutions Architect - Professional - 2023",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "- Professional Scrum Master II (PSM II) - Scrum.org - 2022",
                "attributes": {
                    "size": "10.5pt",
                    "font": "Calibri"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            }
        ]
    },
    {
        "fileName": "Memo_Internal.baku",
        "docName": "Memo_Internal",
        "templateMeta": {
            "id": "memo_internal",
            "title": "Memorandum Internal",
            "category": "office",
            "isStrictStandard": false,
            "paperSize": "A4",
            "orientation": "portrait",
            "marginSummary": "2.54 cm rata",
            "fontSummary": "Arial, 11pt, Spasi 1.15",
            "desc": "Format memorandum internal resmi perusahaan (2 halaman) memuat kop perusahaan, tabel disposisi, latar belakang kebijakan, butir instruksi manajerial, pedoman teknis, dan pengesahan manajemen.",
            "keywords": [
                "memo",
                "memorandum",
                "internal",
                "internal memorandum",
                "internal memo",
                "kantor",
                "office",
                "nota dinas",
                "instruksi",
                "manajerial"
            ]
        },
        "paperConfig": {
            "width": 210,
            "height": 297,
            "marginTop": 25.4,
            "marginBottom": 25.4,
            "marginLeft": 25.4,
            "marginRight": 25.4,
            "orientation": "portrait",
            "format": "A4"
        },
        "numberingConfig": {
            "doc": {
                "show": false,
                "format": "arabic",
                "start": 1,
                "align": "center",
                "prefix": "",
                "suffix": ""
            }
        },
        "headerFooterConfig": {
            "doc": {
                "header": {
                    "text": "INTERNAL MEMORANDUM",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                },
                "footer": {
                    "text": "",
                    "align": "center",
                    "diffFirst": false,
                    "firstText": ""
                }
            }
        },
        "content": [
            {
                "insert": "PT BAKU GRAHA NUSANTARA",
                "attributes": {
                    "bold": true,
                    "size": "13pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "DIREKTORAT OPERASIONAL DAN MANAJEMEN TEKNOLOGI",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "Gedung Graha Nusantara Lt. 12, Jalan Jenderal Gatot Subroto No. 88, Jakarta Selatan 12930",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "=================================================================================",
                "attributes": {
                    "bold": true,
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "MEMORANDUM INTERNAL",
                "attributes": {
                    "bold": true,
                    "size": "16pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "center"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "NOMOR    : 088/MEMO-DIR/BGN/X/2026",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "KEPADA   : Seluruh Kepala Divisi, Manajer Unit Kerja, dan Karyawan",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "DARI     : Direktur Operasional & Teknologi (Denny Hermawan, S.T., M.M.)",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "TANGGAL  : 13 Oktober 2026",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PERIHAL  : Pemberlakuan Standarisasi Format Dokumen Baku dan Tata Kelola Arsip Digital",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "_________________________________________________________________________________",
                "attributes": {
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Dalam rangka meningkatkan efisiensi operasional perusahaan, menyeragamkan citra profesional komunikasi kedinasan, serta memastikan kepatuhan tata letak dokumen terhadap standar baku nasional, manajemen menetapkan kebijakan standardisasi penulisan seluruh dokumen resmi internal dan eksternal perusahaan.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Terhitung mulai tanggal 1 November 2026, seluruh unit kerja diwajibkan menggunakan aplikasi Baku PDF dengan templat baku yang telah terintegrasi untuk seluruh naskah kedinasan, surat resmi, notula rapat, dan laporan kegiatan.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Poin-Poin Instruksi Wajib:",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Penggunaan Templat Surat Resmi untuk seluruh korespondensi keluar kepada mitra eksternal dan instansi pemerintah.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "2. Penggunaan Templat Notula Rapat untuk pencatatan setiap rapat koordinasi internal divisi dengan tabel action items terlampir.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "3. Penggunaan Batas Margin Terkunci (Standard Locked) guna menjamin hasil cetak fisik selalu presisi dan bebas terpotong.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": {
                    "pageBreak": {
                        "height": 100,
                        "auto": false
                    }
                }
            },
            {
                "insert": "KETENTUAN TEKNIS PELAKSANAAN",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "a. Setiap berkas yang disimpan wajib mencantumkan kode dokumen baku pada header/footer sesuai pedoman tata naskah korporat.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "b. Berkas naskah resmi wajib disimpan dalam format .baku pada folder terkelola 'Baku PDF Workspace' untuk memastikan ketersediaan arsip luring yang aman.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "c. Proses ekspor naskah akhir ke format PDF hanya diperkenankan menggunakan mesin konversi terkalibrasi di dalam aplikasi Baku PDF guna menghindari deviasi visual antar komputer.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "PENGAWASAN, BANTUAN TEKNIS, DAN PENUTUP",
                "attributes": {
                    "bold": true,
                    "size": "11.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Divisi Manajemen Mutu & Kepatuhan bersama Tim Teknologi Informasi akan melakukan audit berkala terhadap implementasi standardisasi naskah ini. Bagi divisi atau unit kerja yang memerlukan pendampingan teknis dan pelatihan penggunaan templat, dapat menghubungi tim helpdesk IT melalui kontak internal ext. 302.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify"
                }
            },
            {
                "insert": "Demikian memorandum ini diterbitkan untuk menjadi pedoman bersama, ditaati, dan dilaksanakan dengan penuh rasa tanggung jawab.",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "justify",
                    "lineheight": "1.15"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Jakarta, 13 Oktober 2026",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Direktorat Operasional & Teknologi,",
                "attributes": {
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Denny Hermawan, S.T., M.M.",
                "attributes": {
                    "bold": true,
                    "size": "11pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "Vice President Operations",
                "attributes": {
                    "size": "10pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "right"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "Tembusan Disampaikan Kepada:",
                "attributes": {
                    "size": "9.5pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "1. Direktur Utama PT Baku Graha Nusantara (sebagai laporan)",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "2. Dewan Komisaris PT Baku Graha Nusantara",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            },
            {
                "insert": "3. Arsip Sekretariat Korporat",
                "attributes": {
                    "size": "9pt",
                    "font": "Arial"
                }
            },
            {
                "insert": "\n",
                "attributes": {
                    "align": "left"
                }
            }
        ]
    }
];

window.BUILTIN_TEMPLATES_DATA = BUILTIN_TEMPLATES_DATA;

async function initWorkspace() {
    if (!window.__TAURI__) return;
    
    try {
        const { homeDir, documentDir, join } = window.__TAURI__.path;
        const { createDir, exists } = window.__TAURI__.fs;
        
        let docDir;
        if (typeof documentDir === 'function') {
            try {
                docDir = await documentDir();
            } catch (_) {
                docDir = await homeDir();
            }
        } else {
            docDir = await homeDir();
        }
        
        bakuWorkspacePath = await join(docDir, "Baku PDF Workspace");
        bakuExportsPath = await join(docDir, "Baku PDF Exports");
        bakuTemplatesPath = await join(bakuWorkspacePath, "Template");
        bakuUserTemplatesPath = await join(bakuTemplatesPath, "user");
        
        // Buat folder jika belum ada
        if (!(await exists(bakuWorkspacePath))) {
            await createDir(bakuWorkspacePath, { recursive: true });
        }
        if (!(await exists(bakuExportsPath))) {
            await createDir(bakuExportsPath, { recursive: true });
        }
        if (!(await exists(bakuTemplatesPath))) {
            await createDir(bakuTemplatesPath, { recursive: true });
        }
        if (!(await exists(bakuUserTemplatesPath))) {
            await createDir(bakuUserTemplatesPath, { recursive: true });
        }
        
        window.bakuWorkspacePath = bakuWorkspacePath;
        window.bakuExportsPath = bakuExportsPath;
        window.bakuTemplatesPath = bakuTemplatesPath;
        window.bakuUserTemplatesPath = bakuUserTemplatesPath;

        // Tulis dan sinkronkan templat bawaan di folder Template
        for (const tpl of BUILTIN_TEMPLATES_DATA) {
            try {
                const targetFilePath = await join(bakuTemplatesPath, tpl.fileName);
                const jsonString = JSON.stringify(tpl, null, 2);
                await window.__TAURI__.tauri.invoke('save_baku_file', {
                    path: targetFilePath,
                    content: jsonString
                });
            } catch (err) {
                console.warn("Gagal menyinkronkan templat bawaan:", tpl.fileName, err);
            }
        }

        // Update UI di Modal New Doc
        const inputFolderPath = document.getElementById('input-folder-path');
        if (inputFolderPath) {
            inputFolderPath.value = bakuWorkspacePath;
        }
        
        // Update UI di Settings
        const inputDefaultStorage = document.getElementById('input-default-storage');
        if (inputDefaultStorage) {
            inputDefaultStorage.value = bakuWorkspacePath;
        }

        if (typeof window.syncWorkspaceFilesToRecent === 'function') {
            window.syncWorkspaceFilesToRecent();
        } else if (typeof syncWorkspaceFilesToRecent === 'function') {
            syncWorkspaceFilesToRecent();
        }

        if (typeof window.reloadTemplatesGallery === 'function') {
            window.reloadTemplatesGallery();
        }
    } catch (e) {
        console.error("Gagal inisialisasi workspace:", e);
    }
}

// Inisialisasi Workspace saat DOM siap
function runWorkspaceInit() {
    initWorkspace();
    
    const btnOpenWorkspace = document.getElementById('btn-open-workspace');
    if (btnOpenWorkspace) {
        btnOpenWorkspace.addEventListener('click', async () => {
            if (!window.__TAURI__) return;
            try {
                const { open } = window.__TAURI__.shell;
                if (bakuWorkspacePath) {
                    await open(bakuWorkspacePath);
                }
            } catch (e) {
                console.error("Gagal membuka folder:", e);
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWorkspaceInit);
} else {
    runWorkspaceInit();
}
