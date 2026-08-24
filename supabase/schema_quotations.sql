-- Quotation engine: admin builds a line-itemed proposal (optionally from an
-- enquiry), previews/edits it, and emails it as a branded PDF.
-- Run after schema.sql and schema_admin.sql.

create extension if not exists "pgcrypto";

create table if not exists quotations (
  id uuid primary key default gen_random_uuid(),
  quotation_number text not null unique,
  lead_id uuid references leads(id) on delete set null,

  customer_name text,
  bride_name text,
  groom_name text,
  mobile text,
  email text,

  event_date date,
  event_location text,
  wedding_type text,
  number_of_events integer,
  number_of_guests integer,

  cover_image_url text,
  intro_note text,
  terms text,

  discount_type text not null default 'fixed' check (discount_type in ('percent', 'fixed')),
  discount_value numeric not null default 0,
  additional_charges numeric not null default 0,
  tax_percent numeric not null default 0,

  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'booking_confirmed')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sent_at timestamptz
);

create table if not exists quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references quotations(id) on delete cascade,
  service_name text not null,
  description text,
  quantity integer not null default 1,
  unit_price numeric not null default 0,
  display_order integer not null default 0
);

alter table quotations enable row level security;
alter table quotation_items enable row level security;

-- Admin-only content — no anon access. The admin UI's server actions use
-- the service-role key (bypasses RLS); these `authenticated` policies are
-- defense-in-depth for any cookie-scoped admin session queries.
create policy "Authenticated admin can manage quotations" on quotations
  for all to authenticated using (true) with check (true);

create policy "Authenticated admin can manage quotation items" on quotation_items
  for all to authenticated using (true) with check (true);

create index if not exists quotation_items_quotation_id_idx on quotation_items (quotation_id);
create index if not exists quotations_lead_id_idx on quotations (lead_id);
