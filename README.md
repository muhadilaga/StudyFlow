# StudyFlow

StudyFlow adalah **academic planner sederhana untuk mahasiswa Indonesia** yang dibuat sebagai **MVP SaaS portfolio**. Aplikasi ini membantu mahasiswa mengelola jadwal kuliah, tugas, deadline, dan goal belajar mingguan dari satu dashboard yang ringan dan mobile-friendly.

## Live demo

- **Public test URL:** https://studyflow-id.duckdns.org

## Preview

Fokus utama StudyFlow:
- autentikasi aman dengan Supabase Auth
- dashboard ringkas untuk deadline dan progres
- CRUD mata kuliah, tugas, dan goal
- kalender deadline
- navigasi mobile untuk penggunaan dari HP

> Catatan: saat ini project masih berada pada tahap MVP portfolio dan sedang dipoles menuju production-ready deployment.

## Fitur utama

### 1. Autentikasi
- Register akun
- Login
- Logout
- Verifikasi email dengan Supabase Auth

### 2. Dashboard akademik
- Ringkasan tugas aktif
- Statistik progres belajar
- Deadline terdekat
- Tugas terlambat + quick action
- Goal aktif mingguan
- Jadwal kuliah hari ini

### 3. Manajemen mata kuliah
- Tambah mata kuliah
- Lihat daftar mata kuliah
- Edit mata kuliah
- Hapus mata kuliah

### 4. Manajemen tugas
- Tambah tugas
- Lihat daftar tugas
- Edit tugas
- Hapus tugas
- Update status cepat
- Filter tugas
- Kalender deadline

### 5. Goal belajar
- Tambah goal mingguan
- Lihat goal aktif
- Edit goal
- Hapus goal
- Pantau progres

### 6. UX & testing
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
- **Playwright**
- **Nginx reverse proxy** untuk testing publik di VPS

## Struktur project

```text
app/                # routing App Router
components/         # komponen UI, dashboard, form, layout
lib/                # helper, query, validator, Supabase utils
supabase/           # schema SQL dan RLS policies
tests/              # smoke tests Playwright
types/              # shared types
public/             # static assets
```

## Local setup

### 1. Install dependency
```bash
npm install
```

### 2. Copy env file
```bash
cp .env.example .env.local
```

### 3. Isi environment variable
Minimal isi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

> Gunakan **publishable / anon key**, bukan service role key.

### 4. Jalankan development server
```bash
npm run dev
```

App akan tersedia di:
```text
http://localhost:3000
```

## Setup Supabase

Jalankan file berikut di **Supabase SQL Editor**:

1. `supabase/schema.sql`
2. `supabase/policies.sql`

Urutan wajib:
- schema dulu
- policies setelahnya

## Validation commands

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

## Security notes

- Password tidak disimpan manual di aplikasi; autentikasi ditangani oleh Supabase Auth.
- Akses data dibatasi dengan **Row Level Security (RLS)**.
- `.env.local` dan file env lain tidak boleh di-commit.
- Jangan pernah memasukkan secret key atau service role key ke repository.

## Current status

StudyFlow saat ini sudah berfungsi sebagai MVP end-to-end untuk:
- auth
- CRUD mata kuliah
- CRUD tugas
- CRUD goal
- dashboard real data
- calendar real data
- mobile navigation
- landing page mobile-friendly

## Known next improvements

- statistik belajar yang lebih detail
- reminder / notification system
- improved calendar UX
- production deployment final
- screenshot assets untuk README portfolio

## Purpose

Project ini dibuat untuk:
- portfolio fullstack project
- showcase MVP SaaS berbasis Next.js + Supabase
- dasar pengembangan produk untuk mahasiswa Indonesia
- bahan presentasi GitHub / LinkedIn / portfolio pribadi
