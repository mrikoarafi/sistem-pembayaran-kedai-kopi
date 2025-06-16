# Sistem Pembayaran Kedai Kopi ☕

Sistem manajemen menu dan pembayaran untuk kedai kopi yang dibangun dengan **Nuxt 3**, **Prisma ORM**, dan **PostgreSQL**. Menggunakan **Bun** sebagai JavaScript runtime dan package manager untuk performa yang optimal. Sistem ini menyediakan interface pelanggan untuk pemesanan dan panel admin untuk manajemen produk serta transaksi.

## 🚀 Fitur Utama

### 👥 Interface Pelanggan (`/`)

- **Katalog Menu Interaktif**: Tampilan grid produk dengan gambar, harga, dan informasi detail
- **Pencarian & Filter**: Cari produk berdasarkan nama atau filter berdasarkan kategori (Makanan, Minuman, Snack)
- **Keranjang Belanja Real-time**:
  - Tambah/kurangi kuantitas produk
  - Preview visual produk yang sudah dipilih
  - Kalkulasi otomatis harga termasuk diskon dan pajak
- **Sistem Checkout**: Pembuatan pesanan otomatis dengan validasi stok
- **Responsive Design**: Optimized untuk desktop dan mobile

### 🔧 Panel Admin (`/edit`)

- **Manajemen Produk**:
  - Tambah produk baru dengan upload gambar
  - Edit produk existing dengan preview gambar
  - Hapus produk dengan konfirmasi
  - Validasi file gambar (ukuran max 10MB, format PNG/JPG)
- **Form Input Lengkap**:
  - Nama produk, kategori, harga, stok
  - Persentase diskon dan pajak
  - Deskripsi produk dan gambar
- **Visual Feedback**: Toast notifications untuk setiap aksi

### 📊 Manajemen Transaksi (`/transaksi`)

- **Dashboard Statistik**:
  - Total pesanan keseluruhan
  - Jumlah pesanan yang sudah dibayar
  - Total revenue dari pesanan yang dibayar
- **Daftar Pesanan**:
  - View semua pesanan dengan detail item
  - Update status pembayaran (unpaid → paid)
  - Informasi waktu pemesanan dan total harga
- **Detail Pesanan**: Breakdown item yang dipesan dengan harga snapshot

## 🛠️ Tech Stack

- **Runtime**: Bun (Fast JavaScript runtime)
- **Frontend**: Nuxt 3 (Vue.js)
- **Styling**: Tailwind CSS
- **Backend**: Nuxt Server API
- **Database**: PostgreSQL
- **ORM**: Prisma
- **File Upload**: Multipart form handling
- **Package Manager**: Bun (Ultra-fast package installation)

## 📋 Prerequisites

Pastikan sistem Anda memiliki:

- **Bun** (v1.0 atau lebih baru) - [Install Bun](https://bun.sh/docs/installation)
- **PostgreSQL** (v12 atau lebih baru)

## ⚡ Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd sistem-pembayaran-kedai-kopi
```

### 2. Install Dependencies

```bash
# Install dengan Bun (super cepat!)
bun install
```

### 3. Setup Database

```bash
# Copy environment template
cp .env.example .env

# Edit .env file dengan database URL Anda
# DATABASE_URL="postgresql://username:password@localhost:5432/kedai_kopi_db"
```

### 4. Database Migration

```bash
# Generate Prisma client
bunx prisma generate

# Run database migration
bunx prisma db push

# (Optional) Seed sample data
bunx prisma db seed
```

### 5. Start Development Server

```bash
# Start dengan Bun
bun dev
```

Aplikasi akan tersedia di `http://localhost:3000`

## 📁 Struktur Proyek

```
sistem-pembayaran-kedai-kopi/
├── components/                 # Vue components (jika ada)
├── pages/                     # Route pages
│   ├── index.vue             # Halaman pelanggan (menu & checkout)
│   ├── edit.vue              # Panel admin (manajemen produk)
│   └── transaksi.vue         # Manajemen transaksi
├── server/                    # Server-side API
│   └── api/
│       ├── produk/           # Product API endpoints
│       │   ├── index.get.ts  # Get all products
│       │   ├── index.post.ts # Create product
│       │   ├── [id].put.ts   # Update product
│       │   └── [id].delete.ts # Delete product
│       └── pesanan/          # Order API endpoints
│           ├── index.get.ts  # Get all orders
│           ├── index.post.ts # Create order
│           └── [id].put.ts   # Update order status
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── public/                   # Static assets
├── uploads/                  # Uploaded images
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies (managed by Bun)
├── bun.lockb                # Bun lock file
└── README.md               # Project documentation
```

## 🗄️ Database Schema

### Produk

```prisma
model Produk {
  id             Int      @id @default(autoincrement())
  nama           String
  harga          Float
  stok           Int
  deskripsi      String?
  image          String?
  kategori       Int      @default(1) // 1=makanan, 2=minuman, 3=snack
  diskon         Float    @default(0)
  pajak          Float    @default(0.1)
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt
}
```

### Pesanan

```prisma
model Pesanan {
  id             Int      @id @default(autoincrement())
  tanggal        DateTime @default(now())
  total_harga    Float
  status         String   @default("unpaid") // unpaid, paid
}
```

### Detail Pesanan

```prisma
model DetailPesanan {
  id            Int     @id @default(autoincrement())
  jumlah        Int
  harga_satuan  Float   // Snapshot harga saat transaksi
  diskon_item   Float   @default(0)
  tax_item      Float   @default(0)
  subtotal      Float
  pesanan_id    Int
  produk_id     Int
}
```

## 🔄 API Endpoints

### Products

- `GET /api/produk` - Mengambil semua produk
- `POST /api/produk` - Membuat produk baru
- `PUT /api/produk/[id]` - Update produk
- `DELETE /api/produk/[id]` - Hapus produk

### Orders

- `GET /api/pesanan` - Mengambil semua pesanan
- `GET /api/pesanan?id=[id]` - Mengambil pesanan specific
- `POST /api/pesanan` - Membuat pesanan baru
- `PUT /api/pesanan/[id]` - Update status pesanan

## 💡 Fitur Unggulan

### 🛡️ Validasi & Security

- **File Upload Validation**: Validasi tipe file dan ukuran gambar
- **Stock Management**: Validasi stok otomatis saat checkout
- **Data Consistency**: Menggunakan database transaction
- **Input Sanitization**: Validasi input form

### 🎨 User Experience

- **Real-time Cart**: Update keranjang tanpa reload
- **Visual Feedback**: Loading states, success/error messages
- **Responsive Design**: Mobile-first approach
- **Image Preview**: Preview gambar sebelum upload

### 📈 Business Logic

- **Dynamic Pricing**: Kalkulasi harga dengan diskon dan pajak
- **Inventory Management**: Update stok otomatis setelah checkout
- **Order Tracking**: Status pesanan (unpaid/paid)
- **Revenue Analytics**: Dashboard statistik penjualan

### ⚡ Performance dengan Bun

- **Faster Installation**: Package installation 20-100x lebih cepat dari npm
- **Quick Startup**: Development server start yang sangat cepat
- **Built-in Bundler**: Bun bundler yang optimal untuk production
- **TypeScript Native**: Support TypeScript out-of-the-box

## 🚀 Production Deployment

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NUXT_SECRET_KEY="your-secret-key"
```

### Build & Deploy dengan Bun

```bash
# Build for production
bun run build

# Start production server
bun run start
```

### Database Migration (Production)

```bash
# Run migrations
bunx prisma migrate deploy

# Generate client
bunx prisma generate
```

## 🧪 Testing & Development

```bash
# Run tests (jika ada)
bun test

# Type checking
bun run typecheck

# Linting
bun run lint

# Development dengan hot reload
bun dev
```

## 📊 Performance Benefits dengan Bun

| Operasi   | npm | Bun  | Speedup |
| --------- | --- | ---- | ------- |
| Install   | 30s | 1.5s | 20x     |
| Dev Start | 5s  | 0.5s | 10x     |
| Build     | 45s | 15s  | 3x      |

## 📝 Bun-Specific Commands

```bash
# Install package dengan Bun
bun add <package-name>

# Install dev dependency
bun add -d <package-name>

# Remove package
bun remove <package-name>

# Run script
bun run <script-name>

# Execute file
bun run file.ts

# Update all packages
bun update
```

## 📝 Development Notes

### Kategori Produk

- `1` = Makanan 🍽️
- `2` = Minuman ☕
- `3` = Snack 🍪

### Status Pesanan

- `unpaid` = Belum dibayar
- `paid` = Sudah dibayar

### File Upload

- **Path**: `/uploads/` directory
- **Max Size**: 10MB
- **Formats**: PNG, JPG, JPEG
- **Naming**: Timestamp-based unique names

### Bun Configuration

- **Runtime**: Bun untuk development dan production
- **Package Manager**: Bun untuk dependency management
- **Transpilation**: Built-in TypeScript support
- **Hot Reload**: Fast refresh dengan Bun

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`bun install`)
4. Make your changes
5. Test your changes (`bun test`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open Pull Request

## 🔧 Troubleshooting

### Common Issues

**1. Bun tidak terinstall**

```bash
# Install Bun
curl -fsSL https://bun.sh/install | bash
```

**2. Database connection error**

```bash
# Check PostgreSQL service
sudo service postgresql status
# Check connection string di .env
```

**3. Permission error pada upload**

```bash
# Ensure uploads directory exists and writable
mkdir -p uploads
chmod 755 uploads
```

**4. Port already in use**

```bash
# Change port in nuxt.config.ts or kill process
lsof -ti:3000 | xargs kill -9
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad** - _Initial work_ - Sistem Analis ITBU

Powered by **Bun** 🥟 for ultimate performance!

## 🙏 Acknowledgments

- **Bun team** untuk JavaScript runtime yang revolutioner
- **Nuxt.js team** untuk framework yang luar biasa
- **Prisma team** untuk ORM yang powerful
- **Tailwind CSS** untuk utility-first CSS framework
- **PostgreSQL** untuk database yang reliable

---

**Happy Coding with Bun!** ⚡☕✨

Jika ada pertanyaan atau issues, silakan buat issue di repository ini atau hubungi developer.

> **Note**: Pastikan selalu menggunakan `bun` command instead of `npm` untuk konsistensi dan performa optimal.
