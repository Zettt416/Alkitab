# Alkitab Digital Indonesia & Holy Bible (PWA) 📖

Aplikasi Alkitab digital modern multibahasa lengkap 66 Kitab (Perjanjian Lama & Perjanjian Baru), dirancang dengan fokus pada kenyamanan membaca, kecepatan tinggi, minim distraksi, dan kemampuan **100% Offline-First**.

![Alkitab PWA Banner](/public/icon.svg)

---

## ✨ Fitur Utama

- **📚 Multi-Versi Alkitab**:
  - **TB (Terjemahan Baru)**: Standar Lembaga Alkitab Indonesia (LAI), terjemahan paling luas dipakai di gereja-gereja Indonesia. Lengkap dengan perikop.
  - **AYT (Alkitab Yang Terbuka)**: Terjemahan bahasa Indonesia modern & dinamis dari SABDA.
  - **KJV (King James Version)**: Authorized Version klasik bahasa Inggris (1611/PCE).
  - **WEB (World English Bible)**: Bahasa Inggris kontemporer yang jernih dan bebas royalti (Public Domain).
- **🌐 Antarmuka Multibahasa (Bilingual)**:
  - Dukungan penuh pergantian bahasa antarmuka instan antara **Bahasa Indonesia (ID)** dan **English (EN)**.
  - Nama kitab, kategori perikop, navigasi, dan dialog menyesuaikan bahasa yang dipilih.
- **⚖️ Bandingkan Terjemahan (Verse Comparison)**:
  - Ketuk ayat mana pun dan pilih **Bandingkan** untuk melihat teks ayat tersebut di seluruh terjemahan (TB, AYT, KJV, WEB) berdampingan dalam satu layar.
- **⚡ 100% Offline-First (PWA)**:
  - Dapat dipasang langsung ke Home Screen HP / Desktop tanpa butuh Play Store / App Store, dan bisa digunakan tanpa koneksi internet sama sekali.
  - Tombol unduh per-versi untuk menyimpan seluruh 66 Kitab ke memori perangkat lokal.
- **🎨 3 Tema Visual Nyaman**:
  - **Sepia (Parchment)**: Nuansa kertas buku hangat yang sangat nyaman di mata untuk pembacaan lama.
  - **Terang (Daylight)**: Tampilan putih bersih kontras tinggi.
  - **Gelap (Midnight OLED)**: Tampilan hitam pekat hemat baterai untuk saat teduh di malam hari.
- **🔠 Kontrol Tipografi Lengkap**:
  - Pengatur ukuran huruf (15px s.d. 26px).
  - Pilihan gaya huruf: *Serif (Literata)* untuk nuansa buku cetak atau *Sans-serif modern*.
  - Pilihan spasi baris: Rapat, Nyaman, dan Longgar.
- **🚀 Navigasi 3-Ketuk Cepat**:
  - Pemilih Kitab & Pasal instan dengan tab Perjanjian Lama / Baru dan filter kategori (Taurat, Sejarah, Puisi, Injil, Surat, dll).
  - Floating action dock untuk navigasi pasal sebelumnya dan berikutnya.
- **✨ Interaksi Ayat**:
  - Ketuk ayat untuk aksi cepat: **Sorot 4 Warna Pastel**, **Salin Ayat** (lengkap dengan nama kitab & versi), **Tandai / Bookmark**, **Bandingkan Versi**, dan **Buat Gambar Kutipan (Card Maker)**.
- **🔍 Pencarian Ayat Cepat**: Temukan ayat berdasarkan kata kunci dengan penanda (*highlight*) instan.

---

## 🛠️ Teknologi & Arsitektur

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Pure Vanilla CSS + CSS Design Tokens (Zero bloated UI framework)
- **Tipografi**: Google Fonts (*Literata* & *Plus Jakarta Sans*)
- **PWA**: Web App Manifest + Service Worker Cache Storage API (v2)
- **Data**: JSON terstruktur per kitab per versi (`/data/tb/`, `/data/ayt/`, `/data/kjv/`, `/data/web/`)

---

## 🚀 Menjalankan Secara Lokal

Pastikan [Node.js](https://nodejs.org/) (versi 18+) sudah terpasang di komputermu.

```bash
# 1. Masuk ke direktori proyek
cd Alkitab

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembang lokal
npm run dev
```

Buka browser kamu di `http://localhost:5173`.

### Build untuk Produksi
```bash
npm run build
```
Hasil build siap disajikan di folder `dist/` dan siap dideploy ke layanan hosting statis gratis mana pun seperti Vercel, Netlify, Cloudflare Pages, atau GitHub Pages.

---

## 📜 Sumber Data & Lisensi

- Data teks Alkitab TB bersumber dari repositori Alkitabiah [dennyhalim/alkitabiah](https://github.com/dennyhalim/alkitabiah).
- Data teks AYT bersumber dari **Yayasan Lembaga SABDA (YLSA)** melalui repositori terbuka [sabdacode/ayt](https://github.com/sabdacode/ayt).
- Data teks KJV bersumber dari Pure Cambridge Edition (PCE).
- Data teks WEB bersumber dari World English Bible Public Domain melalui [thiagobodruk/bible](https://github.com/thiagobodruk/bible).
- Dibuat dengan cinta untuk mempermudah siapa saja membaca dan mendalami Firman Tuhan di mana pun dan kapan pun.