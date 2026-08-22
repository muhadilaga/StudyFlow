-- StudyFlow MVP RLS policies for Supabase
-- Run after schema creation

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.assignments enable row level security;
alter table public.study_goals enable row level security;

-- Optional hardening: force RLS
alter table public.profiles force row level security;
alter table public.courses force row level security;
alter table public.assignments force row level security;
alter table public.study_goals force row level security;

-- PROFILES
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_delete_own"
on public.profiles
for delete
using (auth.uid() = id);

-- COURSES
create policy "courses_select_own"
on public.courses
for select
using (auth.uid() = user_id);

create policy "courses_insert_own"
on public.courses
for insert
with check (auth.uid() = user_id);

create policy "courses_update_own"
on public.courses
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "courses_delete_own"
on public.courses
for delete
using (auth.uid() = user_id);

-- ASSIGNMENTS
create policy "assignments_select_own"
on public.assignments
for select
using (auth.uid() = user_id);

create policy "assignments_insert_own"
on public.assignments
for insert
with check (
  auth.uid() = user_id
  and (
    course_id is null
    or exists (
      select 1
      from public.courses c
      where c.id = course_id
        and c.user_id = auth.uid()
    )
  )
);

create policy "assignments_update_own"
on public.assignments
for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    course_id is null
    or exists (
      select 1
      from public.courses c
      where c.id = course_id
        and c.user_id = auth.uid()
    )
  )
);

create policy "assignments_delete_own"
on public.assignments
for delete
using (auth.uid() = user_id);

-- STUDY GOALS
create policy "study_goals_select_own"
on public.study_goals
for select
using (auth.uid() = user_id);

create policy "study_goals_insert_own"
on public.study_goals
for insert
with check (auth.uid() = user_id);

create policy "study_goals_update_own"
on public.study_goals
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "study_goals_delete_own"
on public.study_goals
for delete
using (auth.uid() = user_id);

-- Recommended grants for authenticated users if needed in SQL editor context
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.courses to authenticated;
grant select, insert, update, delete on public.assignments to authenticated;
grant select, insert, update, delete on public.study_goals to authenticated;
