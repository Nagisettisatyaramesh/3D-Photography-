-- Phase B: admin-managed content + availability.
-- Run this in the Supabase SQL editor after supabase/schema.sql.
-- Admin writes go through the service-role key (bypasses RLS entirely);
-- these policies only govern what the public anon key can read.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Portfolio
-- ---------------------------------------------------------------------
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text,
  event_type text,
  event_date date,
  description text,
  cover_image_url text not null,
  gallery_image_urls text[] not null default '{}',
  orientation text not null default 'landscape' check (orientation in ('portrait', 'landscape')),
  featured boolean not null default false,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table portfolio_items enable row level security;

create policy "Public can view published portfolio items" on portfolio_items
  for select to anon
  using (published = true);

-- ---------------------------------------------------------------------
-- Films
-- ---------------------------------------------------------------------
create table if not exists films (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  film_type text,
  description text,
  thumbnail_url text not null,
  video_url text not null,
  featured boolean not null default false,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table films enable row level security;

create policy "Public can view published films" on films
  for select to anon
  using (published = true);

-- ---------------------------------------------------------------------
-- Services (pricing lives here — "Starting from" only, never a fixed total)
-- ---------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  deliverables text[] not null default '{}',
  starting_price numeric,
  price_visible boolean not null default true,
  pricing_note text,
  image_url text,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table services enable row level security;

create policy "Public can view published services" on services
  for select to anon
  using (published = true);

-- ---------------------------------------------------------------------
-- Testimonials
-- ---------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  names text not null,
  location text,
  quote text not null,
  image_url text,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public can view published testimonials" on testimonials
  for select to anon
  using (published = true);

-- ---------------------------------------------------------------------
-- Website settings — singleton row (id always 1)
-- ---------------------------------------------------------------------
create table if not exists website_settings (
  id integer primary key default 1,
  studio_name text not null default 'Unique Creations',
  tagline text,
  phone text,
  whatsapp text,
  email text,
  address text,
  instagram text,
  youtube text,
  hero_image_url text,
  updated_at timestamptz not null default now(),
  constraint website_settings_singleton check (id = 1)
);

-- Adds the youtube column to a website_settings table created before this
-- field existed (safe to re-run; no-op once the column is present).
alter table website_settings add column if not exists youtube text;

alter table website_settings enable row level security;

create policy "Public can view website settings" on website_settings
  for select to anon
  using (true);

insert into website_settings (id, studio_name, tagline, phone, whatsapp, email, address, instagram)
values (1, 'Unique Creations', 'Tells your story with heart', '+91 98765 43210', '919876543210', 'hello@uniquecreations.in', 'Andhra Pradesh', 'https://instagram.com/uniquecreations')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- Availability calendar
-- ---------------------------------------------------------------------
create table if not exists availability (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  status text not null default 'available' check (status in ('available', 'enquiry', 'quotation', 'booked')),
  customer_name text,
  note text,
  updated_at timestamptz not null default now()
);

alter table availability enable row level security;
-- No anon policy on the base table (customer_name/note are private).
-- Public checks go through the view below, which exposes date + status only.

create or replace view public_availability as
  select date, status from availability;

grant select on public_availability to anon;

-- ---------------------------------------------------------------------
-- Leads: allow admin (authenticated) reads/updates via RLS too, since the
-- admin UI uses the signed-in user's session for reads, not just the
-- service-role key.
-- ---------------------------------------------------------------------
create policy "Authenticated admin can view leads" on leads
  for select to authenticated
  using (true);

create policy "Authenticated admin can update leads" on leads
  for update to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- Storage bucket for admin-uploaded media
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
