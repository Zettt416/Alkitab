# Alkitab Digital Indonesia (PWA) 📖

Aplikasi Alkitab bahasa Indonesia lengkap 66 Kitab (Perjanjian Lama & Perjanjian Baru), dirancang dengan fokus pada kenyamanan membaca, kecepatan tinggi, minim distraksi, dan kemampuan **100% Offline-First**.

![Alkitab PWA Banner](/public/icon.svg)

---

## ✨ Fitur Utama

- **📖 66 Kitab Lengkap (31.102 Ayat)**: Seluruh Perjanjian Lama (39 Kitab) dan Perjanjian Baru (27 Kitab) versi AYT (Alkitab Yang Terbuka) lengkap dengan judul perikop.
- **⚡ 100% Offline-First (PWA)**: Dapat dipasang langsung ke Home Screen HP / Desktop tanpa butuh Play Store / App Store, dan bisa digunakan tanpa koneksi internet sama sekali.
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
  - Floating action pill untuk navigasi pasal sebelumnya dan berikutnya.
- **✨ Interaksi Ayat**:
  - Ketuk ayat untuk memunculkan aksi cepat: **Salin Ayat** (lengkap dengan format kutipan), **Tandai / Bookmark**, dan **Bagikan**.
- **🔍 Pencarian Ayat Cepat**: Temukan ayat berdasarkan kata kunci dengan penanda (*highlight*) instan.
- **💾 Pengunduhan Cache Lengkap**: Tombol satu-klik untuk memastikan seluruh data 66 Kitab terunduh ke perangkat lokal.

---

## 🛠️ Teknologi & Arsitektur

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: Pure Vanilla CSS + CSS Design Tokens (Zero bloated UI framework)
- **Tipografi**: Google Fonts (*Literata* & *Plus Jakarta Sans*)
- **PWA**: Web App Manifest + Service Worker Cache Storage API
- **Data**: JSON terstruktur per kitab (~5 MB total untuk seluruh Alkitab)

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

- Data teks Alkitab bersumber dari **Yayasan Lembaga SABDA (YLSA)** melalui repositori terbuka [sabdacode/ayt](https://github.com/sabdacode/ayt).
- Dibuat dengan cinta untuk mempermudah siapa saja membaca Firman Tuhan di mana pun dan kapan pun.