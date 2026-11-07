# ReTech — Website Toko Elektronik Bekas

Website katalog produk elektronik bekas yang siap dipublikasikan menggunakan GitHub Pages.

## Isi folder
- `index.html` — struktur halaman website
- `style.css` — desain responsif untuk desktop dan HP
- `script.js` — data produk, pencarian, filter kategori, dan tautan WhatsApp

## 1. Atur nomor WhatsApp
Buka `script.js`, lalu ubah baris:

```js
const WHATSAPP_NUMBER = "6281234567890";
```

Ganti dengan nomor WhatsApp tokomu menggunakan format internasional. Contoh nomor `081234567890` ditulis menjadi `6281234567890` (tanpa `+`, spasi, atau angka `0` pertama).

## 2. Ganti produk contoh
Di file `script.js`, cari bagian `const products = [...]`.
Ubah nama, kategori, deskripsi, dan harga sesuai produk yang benar-benar tersedia. Kategori yang didukung: `Laptop`, `Smartphone`, dan `Tablet`.

Harga ditulis sebagai angka tanpa titik. Contoh: `3250000`.

## 3. Ubah identitas toko
Cari teks `ReTech` dan `retech` di `index.html`, lalu ganti dengan nama tokomu. Kamu juga bisa mengubah deskripsi, informasi, dan warna di `style.css`.

## 4. Publikasikan ke GitHub Pages
1. Login ke https://github.com
2. Buat repository baru, misalnya `toko-elektronik-bekas`.
3. Upload ketiga file website (`index.html`, `style.css`, `script.js`) ke halaman utama repository. `README.md` boleh ikut diunggah.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
7. Tunggu proses publikasi selesai. Alamat website biasanya berbentuk `https://USERNAME.github.io/NAMA-REPOSITORY/`.

## Catatan
- GitHub Pages meng-host website statis. Website ini tidak memiliki database atau panel admin; untuk memperbarui stok, edit data di `script.js` lalu upload perubahan ke GitHub.
- Pastikan nomor WhatsApp sudah diganti dan tautannya diuji sebelum website dibagikan.
- Produk, spesifikasi, harga, dan kondisi di dalam website adalah data contoh. Ganti dengan informasi produk yang akurat.
