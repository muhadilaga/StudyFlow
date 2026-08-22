-- StudyFlow MVP schema for Supabase Postgres
-- Safe starter schema: auth handled by Supabase Auth, user data isolated by RLS

create extension if not exists pgcrypto;

-- Optional updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- Profiles: one-to-one with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name varchar(80) not null,
  university varchar(120),
  major varchar(120),
  semester integer check (semester is null or semester between 1 and 14),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_name varchar(100) not null,
  lecturer_name varchar(100),
  class_day varchar(15) check (
    class_day is null or class_day in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')
  ),
  start_time time,
  end_time time,
  color varchar(20) not null default 'blue',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint courses_time_check check (
    start_time is null or end_time is null or start_time < end_time
  )
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  title varchar(120) not null,
  description varchar(1000),
  due_date timestamptz not null,
  priority varchar(10) not null default 'medium' check (priority in ('low','medium','high')),
  status varchar(15) not null default 'todo' check (status in ('todo','in_progress','done')),
  estimated_minutes integer check (estimated_minutes is null or estimated_minutes between 1 and 1440),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.study_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title varchar(120) not null,
  target_value integer not null check (target_value > 0 and target_value <= 1000),
  current_value integer not null default 0 check (current_value >= 0 and current_value <= target_value),
  week_start date not null,
  status varchar(15) not null default 'active' check (status in ('active','completed','archived')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Helpful indexes
create index if not exists idx_courses_user_id on public.courses(user_id);
create index if not exists idx_courses_class_day on public.courses(user_id, class_day);

create index if not exists idx_assignments_user_id on public.assignments(user_id);
create index if not exists idx_assignments_due_date on public.assignments(user_id, due_date);
create index if not exists idx_assignments_status on public.assignments(user_id, status);
create index if not exists idx_assignments_priority on public.assignments(user_id, priority);
create index if not exists idx_assignments_course_id on public.assignments(course_id);

create index if not exists idx_study_goals_user_id on public.study_goals(user_id);
create index if not exists idx_study_goals_week_start on public.study_goals(user_id, week_start);
create unique index if not exists idx_study_goals_unique_active_week
  on public.study_goals(user_id, week_start, title);

-- updated_at triggers
create or replace trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace trigger trg_courses_updated_at
before update on public.courses
for each row execute function public.set_updated_at();

create or replace trigger trg_assignments_updated_at
before update on public.assignments
for each row execute function public.set_updated_at();

create or replace trigger trg_study_goals_updated_at
before update on public.study_goals
for each row execute function public.set_updated_at();

-- Optional convenience: auto-create blank profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'User Baru')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
