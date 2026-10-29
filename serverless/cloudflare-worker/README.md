# 🕊️ Panduan Setup Cloudflare Worker untuk Notifikasi Alkitab

Sistem pengirim notifikasi ini dibuat dengan konsep **Ponytail & Serverless**: 
- **100% Gratis** (memanfaatkan paket gratis Cloudflare Workers: 100.000 request/hari).
- **Tanpa sewa VPS / server fisik** yang harus menyala terus-menerus.
- **Otomatis mengirim Ayat Harian** setiap jam yang ditentukan via Cron Trigger.

---

## 🚀 Langkah Deploy (Hanya Butuh ~3 Menit)

### 1. Pasang Wrangler CLI (Jika belum ada)
Buka terminal PowerShell di folder ini:
```powershell
npm install -g wrangler
```

### 2. Login ke Akun Cloudflare
```powershell
wrangler login
```
Browser akan terbuka untuk konfirmasi otorisasi akun gratis Cloudflare kamu.

### 3. Buat Database KV Gratis untuk Menyimpan Subscriber
Jalankan:
```powershell
wrangler kv:namespace create PUSH_SUBS
```
Kamu akan mendapatkan output seperti ini:
```toml
[[kv_namespaces]]
binding = "PUSH_SUBS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```
Salin baris `[[kv_namespaces]]` dan `id` tersebut, lalu tempelkan ke file `wrangler.toml`.

### 4. Deploy Worker ke Cloudflare
```powershell
wrangler deploy
```
Setelah selesai, Cloudflare akan memberikan URL publik Worker kamu, contohnya:
`https://alkitab-daily-push.<nama-kamu>.workers.dev`

---

## 📱 Menghubungkan ke Aplikasi Alkitab

1. Buka aplikasi Alkitab di browsermu.
2. Klik ikon **Pengaturan (Aa)** di pojok kanan atas.
3. Aktifkan **Pengingat & Notifikasi Ayat**.
4. Buka bagian **⚙️ Integrasi Cloudflare Worker (Latar Belakang)**.
5. Tempelkan URL Worker kamu (misal: `https://alkitab-daily-push.username.workers.dev`) lalu klik **Simpan URL**.
6. Selesai! Perangkatmu kini otomatis terdaftar untuk menerima notifikasi ayat harian setiap pagi.
