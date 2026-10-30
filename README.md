# Alkitab Digital Indonesia & Holy Bible (PWA) 📖

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[🇮🇩 Baca dalam Bahasa Indonesia](#-bahasa-indonesia) • [🇬🇧 Read in English](#-english)

---

## 🇮🇩 Bahasa Indonesia

Aplikasi Alkitab digital modern multibahasa lengkap 66 Kitab (Perjanjian Lama & Perjanjian Baru), dirancang dengan fokus pada kenyamanan membaca, kecepatan tinggi, minim distraksi, dan kemampuan **100% Offline-First**.

### ✨ Fitur Utama

- **📚 Multi-Versi Alkitab**:
  - **TB (Terjemahan Baru)**: Standar Lembaga Alkitab Indonesia (LAI), lengkap dengan perikop.
  - **AYT (Alkitab Yang Terbuka)**: Bahasa Indonesia modern dan dinamis dari Yayasan Lembaga SABDA.
  - **KJV (King James Version)**: Authorized Version klasik bahasa Inggris (1611/PCE).
  - **WEB (World English Bible)**: Bahasa Inggris kontemporer yang jernih dan bebas royalti (Public Domain).
  - **HEB (Alkitab Ibrani / Tanakh)**: Teks asli Ibrani bervokal (*nikkud*) untuk Perjanjian Lama (Westminster Leningrad Codex / WLC) dan Ibrani modern untuk Perjanjian Baru, lengkap dengan orientasi teks kanan-ke-kiri (*Right-to-Left / RTL*) otomatis.
- **🔄 Sinkronisasi Cerdas Bahasa & Versi**:
  - Memilih bahasa di toggle header (**ID**, **EN**, **HE**) secara default otomatis menyinkronkan versi Alkitab yang relevan (TB, WEB, HEB), namun pengguna tetap bebas mengganti versi kapan saja.
- **🌐 Antarmuka Multibahasa Penuh (3 Bahasa)**:
  - Dukungan antarmuka penuh untuk **Bahasa Indonesia (ID)**, **English (EN)**, dan **עִבְרִית / Ibrani (HE)**.
  - Nama kitab, kategori perikop, menu, pencarian, dan dialog secara dinamis beradaptasi dengan bahasa yang aktif.
  - Ikon bendera SVG native beresolusi tinggi (bebas bug teks fallback di Windows).
- **🌍 Terjemahan Ayat Dinamis (15 Bahasa)**:
  - Ketuk ayat mana pun dan pilih **Terjemahkan** untuk menerjemahkan ayat ke dalam 15 bahasa dunia (Indonesia, Inggris, Ibrani, Spanyol, Prancis, Jerman, Mandarin, Arab, Jepang, Korea, Portugis, Rusia, Yunani, Latin, Italia). Dilengkapi cache offline lokal instan.
- **🔊 Suara Bacaan Ayat (Audio Text-to-Speech)**:
  - Dengarkan lantunan Firman Tuhan langsung di peramban menggunakan Web Speech API native tanpa unduhan file audio besar. Mendukung pembacaan ayat tunggal, multi-ayat, teks terjemahan, maupun perbandingan antarversi.
- **⚖️ Bandingkan Terjemahan (Verse Comparison)**:
  - Bandingkan satu ayat di berbagai versi sekaligus (TB, AYT, KJV, WEB, HE) berdampingan dalam satu layar dialog interaktif.
- **⚡ 100% Offline-First (Progressive Web App)**:
  - Dapat diinstal langsung ke Home Screen HP (Android/iOS) atau Desktop (Windows/macOS/Linux) tanpa perlu toko aplikasi.
  - Berjalan lancar tanpa koneksi internet sama sekali berkat Service Worker Cache (`alkitab-v5`).
  - Opsi unduh offline penuh untuk seluruh 66 kitab (~5 MB).
- **🎨 3 Tema Visual Nyaman (Eye-Comfort)**:
  - **Sepia (Parchment)**: Nuansa kertas buku hangat yang sangat menenangkan mata untuk pembacaan durasi panjang.
  - **Terang (Daylight)**: Tampilan putih bersih dengan kontras seimbang.
  - **Gelap (Dark Slate OLED)**: Tampilan gelap beraksen emas hangat yang nyaman untuk saat teduh di malam hari.
- **🔠 Tipografi & Tata Letak Fleksibel**:
  - Pengatur ukuran huruf (15px s.d. 26px).
  - Pilihan gaya huruf: *Serif (Literata)* ala buku cetak atau *Sans-serif modern (Plus Jakarta Sans)*.
  - Pilihan spasi baris: Rapat (1.6), Nyaman (1.85), dan Longgar (2.1).
  - Pilihan tata letak baca: *Per Baris* atau *Paragraf*.
- **🔔 Pengingat Ayat Harian & Integrasi Cloudflare Worker**:
  - Pengingat ayat harian dengan jadwal yang dapat disesuaikan.
  - Dilengkapi modul serverless Cloudflare Worker gratis di `serverless/cloudflare-worker/` untuk Web Push Notification background.
- **📝 Catatan Pribadi & Refleksi**:
  - Tambahkan catatan pribadi, doa, atau refleksi renungan pada ayat mana pun, lengkap dengan tab filter catatan khusus di menu Tersimpan.
- **💾 Cadangkan & Pulihkan Data (JSON)**:
  - Ekspor seluruh tanda bookmark, sorotan warna, dan catatan renungan pribadi ke file `.json`, atau pulihkan kembali kapan saja tanpa perlu login/server eksternal.
- **🖼️ Pembuat Gambar Kutipan Ayat (Card Maker)**:
  - Buat kartu gambar kutipan ayat yang indah dengan berbagai tema warna (*Amber, Midnight, Parchment, Emerald*) dan unduh langsung sebagai gambar PNG untuk dibagikan ke media sosial.

### 🛠️ Teknologi & Arsitektur

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: Pure CSS3 dengan Design Tokens Variables (Zero bloated CSS framework)
- **Offline / PWA**: Service Worker Cache API (`public/sw.js`) + Web App Manifest
- **Serverless Push**: Cloudflare Workers + Web Push API (`serverless/cloudflare-worker/`)
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)

### 🚀 Cara Menjalankan Secara Lokal

Pastikan [Node.js](https://nodejs.org/) (versi 18+) sudah terpasang di komputermu.

```powershell
# 1. Masuk ke direktori proyek
cd Alkitab

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembang lokal
npm run dev
```

Buka peramban kamu di `http://localhost:5173`.

### 📦 Build untuk Produksi

```powershell
npm run build
```

Hasil build siap saji berada di folder `dist/` dan siap dideploy ke layanan hosting statis mana pun (Cloudflare Pages, Vercel, Netlify, atau GitHub Pages).

---

## 🇬🇧 English

A modern, distraction-free, multilingual Digital Holy Bible progressive web app containing the complete 66 books of the Old and New Testaments. Designed with an unwavering focus on reading comfort, speed, and **100% Offline-First** capability.

### ✨ Key Features

- **📚 Multiple Bible Versions**:
  - **TB (Terjemahan Baru)**: The standard Indonesian Bible Translation by the Indonesian Bible Society (LAI), with pericope headers.
  - **AYT (Alkitab Yang Terbuka)**: Modern, dynamic Indonesian translation from the SABDA Foundation.
  - **KJV (King James Version)**: The timeless Classic Authorized King James Version (1611/PCE).
  - **WEB (World English Bible)**: Clear, modern, public-domain English translation.
  - **HEB (Hebrew Bible / Tanakh)**: Original vocalized Hebrew text (*nikkud*) for the Old Testament (Westminster Leningrad Codex / WLC) and Modern Hebrew for the New Testament, with automatic Right-to-Left (RTL) reading layout.
- **🔄 Intelligent Language & Version Synchronization**:
  - Switching the language toggle in the header (**ID**, **EN**, **HE**) automatically switches the reading version to the matching default translation, while retaining full freedom to switch versions independently anytime.
- **🌐 Full Multilingual User Interface (3 Languages)**:
  - Complete UI localization for **Indonesian (ID)**, **English (EN)**, and **Hebrew / עִבְרִית (HE)**.
  - Book titles, category filters, navigation menus, and search dynamically adapt to the active language.
  - Crisp, custom SVG flag badges (no ugly text fallback on Windows platforms).
- **🌍 Dynamic Verse Translation (15 Languages)**:
  - Tap any verse and select **Translate** to instantly translate it into 15 world languages (Indonesian, English, Hebrew, Spanish, French, German, Chinese, Arabic, Japanese, Korean, Portuguese, Russian, Greek, Latin, Italian) with local offline caching.
- **🔊 Verse Text-to-Speech (Audio Recitation)**:
  - Listen to scripture verses read aloud directly in your browser using the native Web Speech API—no heavy audio downloads required. Supports single verses, multiple selections, translations, and comparisons.
- **⚖️ Side-by-Side Verse Comparison**:
  - Compare any verse across all available translations (TB, AYT, KJV, WEB, HE) side-by-side in a single modal view.
- **⚡ 100% Offline-First (Progressive Web App)**:
  - Installable directly to your Home Screen (Android/iOS) or Desktop (Windows/macOS/Linux) without going through an app store.
  - Operates completely offline with zero latency via Service Worker Cache Storage (`alkitab-v5`).
  - Full offline download option to save all 66 books locally (~5 MB).
- **🎨 3 Visual Reading Themes**:
  - **Sepia (Parchment)**: Warm paper tones crafted for fatigue-free long reading sessions.
  - **Light (Daylight)**: Crisp, high-contrast clean white page.
  - **Dark (Midnight OLED)**: Sleek dark slate canvas with warm amber accents, battery-friendly for night devotionals.
- **🔠 Flexible Typography & Layout Controls**:
  - Font size adjustment slider (15px to 26px).
  - Font family switch: *Literata* (Editorial Serif) or *Plus Jakarta Sans* (Modern Clean).
  - Line height spacing: Tight (1.6), Comfortable (1.85), and Loose (2.1).
  - Reading layout modes: *Verse-by-Verse* or *Paragraph Story Flow*.
- **🔔 Daily Verse Reminder & Cloudflare Worker Support**:
  - Scheduled daily verse notifications with customizable delivery times.
  - Includes a zero-cost serverless Cloudflare Worker module in `serverless/cloudflare-worker/` for background Web Push delivery.
- **📝 Personal Verse Notes & Journaling**:
  - Attach private thoughts, reflections, or sermon notes to any verse, complete with a dedicated notes filter in the Saved items modal.
- **💾 Data Backup & Restore (JSON)**:
  - Export all bookmarks, color highlights, and personal reflections as a standard `.json` file, or restore them anytime with zero account or external server dependency.
- **🖼️ Verse Quote Card Generator**:
  - Create beautifully styled social quote cards (*Amber, Midnight, Parchment, Emerald*) and export them directly as high-resolution PNG images.

### 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: Pure CSS3 with CSS Design Tokens Variables (Zero bloated CSS framework)
- **Offline / PWA**: Service Worker Cache API (`public/sw.js`) + Web App Manifest
- **Serverless Push**: Cloudflare Workers + Web Push API (`serverless/cloudflare-worker/`)
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)

### 🚀 Getting Started Locally

Ensure [Node.js](https://nodejs.org/) (version 18+) is installed on your system.

```powershell
# 1. Navigate to the repository
cd Alkitab

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### 📦 Production Build

```powershell
npm run build
```

Production-ready assets are emitted to the `dist/` folder, ready for deployment to any static hosting provider (Cloudflare Pages, Vercel, Netlify, or GitHub Pages).

---

## 📜 Data Sources & Acknowledgments

- **TB (Terjemahan Baru)** text courtesy of the Indonesian Bible repository [dennyhalim/alkitabiah](https://github.com/dennyhalim/alkitabiah).
- **AYT (Alkitab Yang Terbuka)** text courtesy of **Yayasan Lembaga SABDA (YLSA)** via [sabdacode/ayt](https://github.com/sabdacode/ayt).
- **KJV (King James Version)** text from the Pure Cambridge Edition (PCE).
- **WEB (World English Bible)** text from Public Domain scripture via [thiagobodruk/bible](https://github.com/thiagobodruk/bible).
- **Hebrew Tanakh (WLC)** text from the Westminster Leningrad Codex public domain project.

---

## 🇬🇧 English

A modern, distraction-free multilingual digital Holy Bible Progressive Web App covering all 66 canonical books (Old and New Testaments). Designed with a focus on serene reading ergonomics, snappy performance, and **100% Offline-First** capability.

### ✨ Key Features

- **📚 Multiple Bible Versions**:
  - **TB (Terjemahan Baru)**: The standard Indonesian Bible Translation by the Indonesian Bible Society (LAI), with pericope headers.
  - **AYT (Alkitab Yang Terbuka)**: Modern, dynamic Indonesian translation from the SABDA Foundation.
  - **KJV (King James Version)**: The timeless Classic Authorized King James Version (1611/PCE).
  - **WEB (World English Bible)**: Clear, modern, public-domain English translation.
  - **HEB (Hebrew Bible / Tanakh)**: Original vocalized Hebrew text (*nikkud*) for the Old Testament (Westminster Leningrad Codex / WLC) and Modern Hebrew for the New Testament, with automatic Right-to-Left (RTL) reading layout.
- **🔄 Intelligent Language & Version Synchronization**:
  - Switching the language toggle in the header (**ID**, **EN**, **HE**) automatically switches the reading version to the matching default translation, while retaining full freedom to switch versions independently anytime.
- **🌐 Full Multilingual User Interface (3 Languages)**:
  - Complete UI localization for **Indonesian (ID)**, **English (EN)**, and **Hebrew / עִבְרִית (HE)**.
  - Book titles, category filters, navigation menus, and search dynamically adapt to the active language.
  - Crisp, custom SVG flag badges (no ugly text fallback on Windows platforms).
- **🌍 Dynamic Verse Translation (15 Languages)**:
  - Tap any verse and select **Translate** to instantly translate it into 15 world languages (Indonesian, English, Hebrew, Spanish, French, German, Chinese, Arabic, Japanese, Korean, Portuguese, Russian, Greek, Latin, Italian) with local offline caching.
- **🔊 Verse Text-to-Speech (Audio Recitation)**:
  - Listen to scripture verses read aloud directly in your browser using the native Web Speech API—no heavy audio downloads required. Supports single verses, multiple selections, translations, and comparisons.
- **⚖️ Side-by-Side Verse Comparison**:
  - Compare any verse across all available translations (TB, AYT, KJV, WEB, HE) side-by-side in a single modal view.
- **⚡ 100% Offline-First (Progressive Web App)**:
  - Installable directly to your Home Screen (Android/iOS) or Desktop (Windows/macOS/Linux) without going through an app store.
  - Operates completely offline with zero latency via Service Worker Cache Storage (`alkitab-v5`).
  - Full offline download option to save all 66 books locally (~5 MB).
- **🎨 3 Visual Reading Themes**:
  - **Sepia (Parchment)**: Warm paper tones crafted for fatigue-free long reading sessions.
  - **Light (Daylight)**: Crisp, high-contrast clean white page.
  - **Dark (Midnight OLED)**: Sleek dark slate canvas with warm amber accents, battery-friendly for night devotionals.
- **🔠 Flexible Typography & Layout Controls**:
  - Font size adjustment slider (15px to 26px).
  - Font family switch: *Literata* (Editorial Serif) or *Plus Jakarta Sans* (Modern Clean).
  - Line height spacing: Tight (1.6), Comfortable (1.85), and Loose (2.1).
  - Reading layout modes: *Verse-by-Verse* or *Paragraph Story Flow*.
- **🔔 Daily Verse Reminder & Cloudflare Worker Support**:
  - Scheduled daily verse notifications with customizable delivery times.
  - Includes a zero-cost serverless Cloudflare Worker module in `serverless/cloudflare-worker/` for background Web Push delivery.
- **📝 Personal Verse Notes & Journaling**:
  - Attach private thoughts, reflections, or sermon notes to any verse, complete with a dedicated notes filter in the Saved items modal.
- **💾 Data Backup & Restore (JSON)**:
  - Export all bookmarks, color highlights, and personal reflections as a standard `.json` file, or restore them anytime with zero account or external server dependency.
- **🖼️ Verse Quote Card Generator**:
  - Create beautifully styled social quote cards (*Amber, Midnight, Parchment, Emerald*) and export them directly as high-resolution PNG images.

### 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: Pure CSS3 with CSS Design Tokens Variables (Zero bloated CSS framework)
- **Offline / PWA**: Service Worker Cache API (`public/sw.js`) + Web App Manifest
- **Serverless Push**: Cloudflare Workers + Web Push API (`serverless/cloudflare-worker/`)
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)

### 🚀 Getting Started Locally

Ensure [Node.js](https://nodejs.org/) (version 18+) is installed on your system.

```powershell
# 1. Navigate to the repository
cd Alkitab

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### 📦 Production Build

```powershell
npm run build
```

Production-ready assets are emitted to the `dist/` folder, ready for deployment to any static hosting provider (Cloudflare Pages, Vercel, Netlify, or GitHub Pages).

---

## 📜 Data Sources & Acknowledgments

- **TB (Terjemahan Baru)** text courtesy of the Indonesian Bible repository [dennyhalim/alkitabiah](https://github.com/dennyhalim/alkitabiah).
- **AYT (Alkitab Yang Terbuka)** text courtesy of **Yayasan Lembaga SABDA (YLSA)** via [sabdacode/ayt](https://github.com/sabdacode/ayt).
- **KJV (King James Version)** text from the Pure Cambridge Edition (PCE).
- **WEB (World English Bible)** text from Public Domain scripture via [thiagobodruk/bible](https://github.com/thiagobodruk/bible).
- **Hebrew Tanakh (WLC)** text from the Westminster Leningrad Codex public domain project.

---

## 📄 License

Distributed under the [MIT License](LICENSE). Made with care to empower anyone, anywhere, to study and reflect upon the Holy Word freely.