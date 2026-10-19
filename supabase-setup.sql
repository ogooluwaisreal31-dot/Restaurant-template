-- Run this whole script in Supabase Dashboard > SQL Editor.
create table if not exists public.restaurant_site (
  id integer primary key default 1 check (id = 1),
  owner_id uuid not null references auth.users(id) on delete cascade,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.restaurant_site enable row level security;
drop policy if exists "Public can read published restaurant config" on public.restaurant_site;
drop policy if exists "Owner can insert own restaurant config" on public.restaurant_site;
drop policy if exists "Owner can update own restaurant config" on public.restaurant_site;
create policy "Public can read published restaurant config" on public.restaurant_site for select using (true);
create policy "Owner can insert own restaurant config" on public.restaurant_site for insert to authenticated with check (auth.uid() = owner_id);
create policy "Owner can update own restaurant config" on public.restaurant_site for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
