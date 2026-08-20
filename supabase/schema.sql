-- Phase 1 scope: just the enquiry/leads capture from the public site.
-- Full schema (customers, quotations, quotation_items, versions, bookings,
-- payments, portfolio, stories, films, packages, website_settings) is
-- designed alongside the quotation system and admin dashboard in Phase 2/3.

create extension if not exists "pgcrypto";

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile text not null,
  email text not null,
  event_type text not null,
  event_date date,
  location text,
  number_of_events integer,
  services_interested text[] default '{}',
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- Public site can insert enquiries but never read them back.
create policy "Anyone can submit an enquiry" on leads
  for insert
  to anon
  with check (true);
