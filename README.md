# Sistem POS (Point of Sale)

Sistem POS sederhana berbasis web untuk manajemen pesanan restoran. Dibangun menggunakan HTML, CSS, dan JavaScript murni dengan pendekatan yang modern dan responsif.

## Fitur Utama

- 🏪 Antarmuka pengguna yang intuitif dan responsif
- 📱 Mendukung tampilan mobile dan desktop
- 🗂️ Manajemen kategori menu (Makanan, Minuman, Snack, Dessert)
- 🛒 Keranjang pesanan dengan perhitungan otomatis
- 💰 Perhitungan PPN 11% otomatis
- 📝 Fitur tambah catatan pada item pesanan
- 💾 Penyimpanan state pesanan di localStorage
- 🔄 Update quantity item pesanan
- 🏷️ Tipe pesanan (Makan di Tempat, Bawa Pulang, Pengantaran)

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- LocalStorage untuk penyimpanan data

## Struktur Proyek

```
├── index.html          # File utama HTML
├── css/
│   └── style.css      # File CSS kustom
└── js/
    ├── data.js        # Data menu dan kategori
    └── script.js      # Logika aplikasi
```

## Cara Penggunaan

1. Buka file `index.html` di browser
2. Pilih kategori menu yang diinginkan
3. Klik tombol "Tambah" pada item menu untuk menambahkan ke pesanan
4. Atur jumlah item menggunakan tombol + dan - di panel pesanan
5. Tambahkan catatan khusus pada item jika diperlukan
6. Pilih tipe pesanan (Makan di Tempat/Bawa Pulang/Pengantaran)
7. Klik "Proses Pembayaran" untuk menyelesaikan pesanan

## Fitur Detail

### Panel Kiri (Sidebar)
- Menu navigasi utama
- Tombol keluar aplikasi

### Panel Tengah
- Filter kategori menu
- Tampilan grid menu dengan gambar
- Informasi harga dan tombol tambah

### Panel Kanan
- Daftar item pesanan
- Kontrol jumlah item
- Fitur catatan per item
- Perhitungan subtotal, PPN, dan total
- Pemilihan tipe pesanan
- Nomor pesanan otomatis