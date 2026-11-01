# BantuWarga — Portal Transparansi Bantuan Sosial

![BantuWarga](https://drive.google.com/uc?export=view&id=1i1wwhNVKx5FvakQ5pouBh9CCYH90rB_a)

**BantuWarga** merupakan platform digital yang dirancang untuk mendukung transparansi, akuntabilitas, dan partisipasi masyarakat dalam penyaluran bantuan sosial. Platform ini memfasilitasi masyarakat untuk mengajukan usulan, menyampaikan sanggahan, serta memantau perkembangan layanan bantuan sosial melalui satu portal yang mudah diakses.

BantuWarga juga menyediakan informasi publik dan visualisasi data bantuan sosial sebagai bentuk dukungan terhadap keterbukaan informasi kepada masyarakat.

## ✨ Fitur Utama

### 1. Beranda
- Menampilkan informasi umum dan pengenalan platform BantuWarga.
- Menyediakan ringkasan statistik bantuan sosial.
- Menampilkan informasi transparansi dan persebaran data penerima bantuan.
- Menyajikan penjelasan mengenai alur layanan BantuWarga.
- Menyediakan akses langsung ke layanan masyarakat dan informasi lainnya.

### 2. Layanan Masyarakat

**Usul Warga**
- Memfasilitasi pengajuan usulan warga yang dinilai layak mendapatkan bantuan sosial.
- Menyediakan formulir pengajuan data warga.
- Menggunakan autentikasi pengguna untuk mengakses layanan.

**Sanggah Warga**
- Memfasilitasi penyampaian sanggahan atau laporan apabila ditemukan ketidaksesuaian informasi bantuan sosial.
- Menyediakan sarana bagi masyarakat untuk menyampaikan informasi yang perlu ditindaklanjuti.

### 3. Lacak Tiket
- Memfasilitasi pemantauan perkembangan pengajuan dan sanggahan.
- Menggunakan nomor tiket sebagai identitas pelacakan layanan.
- Menampilkan informasi status dan perkembangan penanganan layanan.

### 4. Dashboard Transparansi
- Menampilkan ringkasan informasi anggaran dan penerima bantuan sosial.
- Menyajikan visualisasi data dalam bentuk grafik.
- Menampilkan informasi persebaran bantuan berdasarkan wilayah.
- Menyediakan informasi perkembangan program bantuan sosial.

### 5. Panduan & Informasi
- Menyediakan informasi mengenai penggunaan layanan BantuWarga.
- Menjelaskan alur pengajuan, sanggahan, dan pelacakan tiket.
- Menyediakan informasi umum dan panduan bagi masyarakat.

### 6. Tentang BantuWarga
- Menjelaskan latar belakang dan tujuan pengembangan platform.
- Menyampaikan fungsi serta ruang lingkup layanan BantuWarga.
- Menjelaskan peran BantuWarga dalam mendukung transparansi bantuan sosial.

## 🔐 Autentikasi Pengguna

- Registrasi akun pengguna.
- Login menggunakan nomor HP.
- Verifikasi OTP sebagai bagian dari alur autentikasi prototipe.
- Pengelolaan profil pengguna.
- Logout akun.

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| React | Library pengembangan antarmuka pengguna |
| TypeScript | Bahasa pemrograman dengan static typing |
| Vite | Development server dan build tool |
| Tailwind CSS v4 | Styling dan pengembangan antarmuka |
| React Router DOM | Routing dan navigasi halaman |
| Lucide React | Ikon antarmuka |
| Recharts | Visualisasi data dan grafik |
| React Leaflet | Visualisasi persebaran data pada peta |
| Git & GitHub | Version control dan kolaborasi pengembangan |

## 📂 Struktur Project

```text
web-BantuWarga/
├── public/
│   ├── icons/
│   ├── images/
│   └── logo/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── feedback/
│   │   ├── forms/
│   │   └── layout/
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── layouts/
│   │   └── PublicLayout.tsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── beneficiaries/
│   │   ├── dashboard/
│   │   ├── dispute/
│   │   ├── home/
│   │   │   └── components/
│   │   ├── proposal/
│   │   └── tracking/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── index.html
└── vite.config.ts
```

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone <URL_REPOSITORY>
```

### 2. Masuk ke Direktori Project

```bash
cd web-BantuWarga
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Jalankan Development Server

```bash
npm run dev
```

### 5. Buka di Browser

Akses alamat lokal yang ditampilkan oleh Vite. Secara default:

```text
http://localhost:5173
```

## 📌 Ruang Lingkup dan Status Pengembangan

BantuWarga dikembangkan sebagai platform yang mendukung keterbukaan informasi dan partisipasi masyarakat dalam layanan bantuan sosial.

Beberapa hal yang perlu diperhatikan dalam ruang lingkup platform:

- BantuWarga memfasilitasi pengajuan usulan, penyampaian sanggahan, dan pelacakan layanan.
- BantuWarga bukan lembaga yang menetapkan kelayakan atau keputusan penerima bantuan sosial. Penetapan tersebut tetap menjadi kewenangan instansi pemerintah yang berwenang.
- Informasi dan visualisasi pada prototipe dapat menggunakan data simulasi untuk keperluan pengembangan antarmuka.
- Integrasi backend, database, verifikasi OTP sebenarnya, dan pengelolaan data secara langsung masih memerlukan pengembangan lebih lanjut.
- Pengelolaan informasi harus memperhatikan keamanan dan perlindungan data pribadi masyarakat.

## 👥 Kontribusi dan Pengembangan

Pengembangan BantuWarga dilakukan secara bertahap dengan memanfaatkan Git dan GitHub sebagai version control. Setiap pengembangan fitur dapat dikerjakan melalui branch tersendiri sebelum digabungkan ke branch utama.

---

**BantuWarga** — Mendukung transparansi dan partisipasi masyarakat dalam penyaluran bantuan sosial.