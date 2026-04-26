# 📖 Panduan Lengkap: Clone & Commit ke Branch Masing-masing

Ikuti langkah-langkah ini **secara berurutan**. Jangan skip!

---

## 🖥️ BAGIAN 1: PERSIAPAN AWAL (Hanya Sekali Saja)

### Langkah 1 — Install Git
Pastikan Git sudah terinstall di laptop kamu.
Cek dengan membuka **CMD atau Terminal**, lalu ketik:
```
git --version
```
Kalau muncul tulisan seperti `git version 2.x.x` berarti sudah ada. Kalau error, download Git di: https://git-scm.com/downloads

### Langkah 2 — Install Node.js
Pastikan Node.js sudah ada. Cek dengan:
```
node --version
```
Kalau muncul `v18.x.x` atau lebih tinggi, berarti sudah ada.

### Langkah 3 — Install PostgreSQL
Pastikan sudah install PostgreSQL dan aplikasi pgAdmin 4.

---

## 📥 BAGIAN 2: CLONE PROJECT DARI GITHUB

### Langkah 4 — Buka Terminal / CMD
- Di Windows: tekan `Win + R`, ketik `cmd`, tekan Enter
- Atau buka VSCode, lalu klik menu **Terminal > New Terminal**

### Langkah 5 — Pergi ke Folder yang Diinginkan
Pilih lokasi di mana kamu mau simpan foldernya. Contoh kalau mau simpan di Drive C:
```bash
cd C:\
```
Atau kalau mau di folder Kuliah:
```bash
cd C:\Kuliah
```

### Langkah 6 — Clone Repository
```bash
git clone https://github.com/Shapiere/Nasi-Cumi-Hitam-Pak-Kris.git
```
Tunggu sampai selesai. Nanti akan muncul folder baru bernama `Nasi-Cumi-Hitam-Pak-Kris`.

### Langkah 7 — Masuk ke Folder Project
```bash
cd Nasi-Cumi-Hitam-Pak-Kris
```

### Langkah 8 — Pastikan Kamu di Branch Main dan Ambil Update Terbaru
```bash
git checkout main
git pull origin main
```
Ini wajib! Tujuannya agar kamu mendapatkan kode terbaru dari Shapiere.

---

## 🗄️ BAGIAN 3: SETUP DATABASE DI LAPTOP KAMU

### Langkah 9 — Buat Database di pgAdmin 4
1. Buka aplikasi **pgAdmin 4**
2. Login dengan password PostgreSQL kamu
3. Di panel kiri, klik kanan pada **Databases**
4. Klik **Create > Database...**
5. Isi nama database: `careconnect` (harus persis, huruf kecil semua!)
6. Klik **Save**

### Langkah 10 — Buat File `.env`
1. Buka folder project di **VSCode**: `File > Open Folder` > pilih folder `Nasi-Cumi-Hitam-Pak-Kris`
2. Masuk ke dalam folder `backend`
3. Klik kanan di area file explorer VSCode > **New File**
4. Beri nama file: `.env` (pakai titik di depan, tanpa ekstensi lain!)
5. Isi file `.env` dengan teks berikut:

```
DATABASE_URL="postgresql://postgres:PASSWORD_KAMU@localhost:5432/careconnect?schema=public"
PORT=3000
JWT_SECRET=careconnect_secret_key
```

> ⚠️ PENTING: Ganti `PASSWORD_KAMU` dengan password PostgreSQL di laptop kamu sendiri!
> Contoh kalau password kamu `admin123`:
> `DATABASE_URL="postgresql://postgres:admin123@localhost:5432/careconnect?schema=public"`

### Langkah 11 — Install Semua Package yang Dibutuhkan
Di terminal VSCode, pastikan kamu sudah berada di dalam folder `backend`:
```bash
cd backend
npm install
```
Tunggu sampai selesai (biasanya 30 detik - 1 menit).

### Langkah 12 — Buat Tabel di Database (Migrate)
Masih di folder `backend`, jalankan:
```bash
npx prisma migrate dev
```
Kalau ditanya `Enter a name for the new migration:`, ketik `init` lalu tekan Enter.

Kalau berhasil, akan muncul tulisan **"Your database is now in sync with your schema"**. 

### Langkah 13 — Test Server Nyala
```bash
npm run dev
```
Kalau muncul:
```
✅ Koneksi ke database PostgreSQL berhasil!
🚀 Server CareConnect nyala di http://localhost:3000
```
Berarti setup kamu **100% berhasil!** Tekan `Ctrl + C` untuk matikan servernya dulu.

---

## ✏️ BAGIAN 4: NGERJAIN TUGAS DI BRANCH SENDIRI

### Langkah 14 — Pindah ke Branch Milik Kamu
Sesuaikan dengan tugas masing-masing:

```bash
# Kalau kamu bagian Donation:
git checkout feat/donation

# Kalau kamu bagian Volunteer:
git checkout feat/volunteer

# Kalau kamu bagian Project:
git checkout feat/project
```

Kalau muncul error `branch not found`, berarti branch belum ada. Buat dulu:
```bash
# Contoh untuk donation:
git checkout -b feat/donation
```

### Langkah 15 — Sinkron Branch Kamu dengan Main yang Terbaru
```bash
git merge main
```
Ini penting agar kerjaan kamu tidak ketinggalan dari update terbaru!

### Langkah 16 — Kerjakan Tugasmu
Sekarang kamu bisa mulai edit file controller dan routes sesuai instruksi yang dikirim Shapiere (file `FIX_CODE_CONTROLLERS.md` dan `FIX_ROUTES.md`).

---

## 📤 BAGIAN 5: COMMIT & PUSH SETELAH SELESAI

### Langkah 17 — Cek File yang Sudah Diubah
```bash
git status
```
Akan muncul daftar file yang sudah kamu edit (warna merah).

### Langkah 18 — Tambahkan Semua Perubahan
```bash
git add .
```
(Titiknya jangan sampai ketinggalan, artinya "tambahkan semua file yang berubah")

### Langkah 19 — Buat Commit (Simpan Checkpoint)
```bash
# Sesuaikan pesannya dengan apa yang kamu kerjakan:
git commit -m "feat: implement donation controller with validation and error handling"

# Atau untuk volunteer:
git commit -m "feat: implement volunteer controller with duplicate check"
```

### Langkah 20 — Push ke Branch Kamu di GitHub
```bash
# Untuk donation:
git push origin feat/donation

# Untuk volunteer:
git push origin feat/volunteer
```

### Langkah 21 — Kabari Shapiere untuk di-Merge ke Main!
Setelah push, hubungi Shapiere dan minta di-merge dari branch kamu ke `main` ya!

---

## ❓ TROUBLESHOOTING (Kalau Ada Error)

| Error | Solusi |
|-------|--------|
| `git: command not found` | Install Git dari https://git-scm.com |
| `npm: command not found` | Install Node.js dari https://nodejs.org |
| `Authentication failed` di git push | Login ulang GitHub di terminal: `git config --global user.email "email@kamu.com"` |
| Error saat `prisma migrate` | Pastikan database `careconnect` sudah dibuat di pgAdmin dan password di `.env` sudah benar |
| `Cannot find module '../controllers/...'` | Pastikan sudah copy-paste fix controller dari file yang dikirim Shapiere |
