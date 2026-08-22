# StudyFlow

StudyFlow adalah **academic planner sederhana untuk mahasiswa Indonesia**. Project ini dibuat sebagai **MVP SaaS portfolio** dengan fokus pada pengelolaan jadwal kuliah, tugas, deadline, dan goal belajar mingguan dari satu dashboard.

## Demo

- Public test URL: `http://213.163.196.241`

## Fitur utama

### Autentikasi
- Register akun
- Login
- Verifikasi email dengan Supabase Auth
- Logout

### Dashboard
- Ringkasan tugas aktif
- Statistik progres belajar
- Deadline terdekat
- Tugas terlambat + quick action
- Goal aktif mingguan
- Jadwal kuliah hari ini

### Mata kuliah
- Tambah mata kuliah
- Lihat daftar mata kuliah
- Edit mata kuliah
- Hapus mata kuliah

### Tugas
- Tambah tugas
- Lihat daftar tugas
- Edit tugas
- Hapus tugas
- Update status cepat
- Filter tugas
- Kalender deadline

### Goals
- Tambah goal mingguan
- Lihat goal aktif
- Edit goal
- Hapus goal
- Pantau progres

### UX tambahan
- Landing page yang sudah dipoles untuk mobile
- Navigasi mobile bottom bar
- Dashboard dengan indikator overdue dan due soon
- Smoke test Playwright untuk halaman publik utama

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase Auth**
- **Supabase Postgres**
- **Playwright** untuk smoke test
- **Nginx reverse proxy** untuk testing publik di VPS

## Struktur project singkat

```text
app/                # routing App Router
components/         # komponen UI dan layout
lib/                # helper, query, validator, supabase utils
supabase/           # schema dan RLS policies
tests/              # smoke tests Playwright
types/              # shared types
```

## Menjalankan project secara lokal

### 1. Install dependency
```bash
npm install
```

### 2. Salin file env
```bash
cp .env.example .env.local
```

### 3. Isi environment
Minimal isi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

> Gunakan **publishable/anon key**, bukan service role key.

### 4. Jalankan development server
```bash
npm run dev
```

Aplikasi akan berjalan di:
```text
http://localhost:3000
```

## Menyiapkan database Supabase

Jalankan file berikut di **Supabase SQL Editor**:

1. `supabase/schema.sql`
2. `supabase/policies.sql`

Urutannya harus:
- schema dulu
- policies setelahnya

## Validasi project

### Lint
```bash
npm run lint
```

### Production build
```bash
npm run build
```

### Smoke test
```bash
npx playwright test tests/smoke.spec.ts --reporter=line
```

## Status project saat ini

StudyFlow saat ini sudah berfungsi sebagai MVP yang bisa diuji end-to-end untuk:
- auth
- CRUD mata kuliah
- CRUD tugas
- CRUD goal
- dashboard real data
- calendar real data
- mobile navigation
- landing page mobile-friendly

## Catatan keamanan

- Password **tidak disimpan manual** di aplikasi, tetapi ditangani oleh Supabase Auth.
- Data di database dibatasi dengan **Row Level Security (RLS)**.
- `.env.local` harus tetap berada di `.gitignore`.
- Jangan commit secret key atau service role key ke repository.

## Roadmap pengembangan berikutnya

Beberapa peningkatan yang masih bisa dikembangkan:
- statistik belajar yang lebih detail
- reminder/notifikasi
- improved calendar UX
- portfolio polish tambahan
- deployment domain production final

## Tujuan project

Project ini dibuat untuk:
- portfolio development
- showcase fullstack MVP
- dasar pengembangan SaaS untuk mahasiswa
- bahan presentasi/GitHub/LinkedIn
