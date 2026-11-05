-- Run this in the Supabase SQL editor once, after schema_admin.sql.
-- Stores the photos the admin has swapped in from /admin/site-images.
-- A slot with no row here shows the site's built-in photo. Safe to re-run.
create table if not exists site_images (
  slot text primary key,
  image_url text not null,
  updated_at timestamptz not null default now()
);

alter table site_images enable row level security;

drop policy if exists "Public can view site images" on site_images;
create policy "Public can view site images" on site_images
  for select to anon
  using (true);
