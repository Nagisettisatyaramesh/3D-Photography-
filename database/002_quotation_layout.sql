-- Fields for the quotation PDF layout. Safe to re-run; existing data is kept.
BEGIN;
ALTER TABLE public.quotation_items ADD COLUMN IF NOT EXISTS requirement text;
ALTER TABLE public.quotation_items ADD COLUMN IF NOT EXISTS event_date date;
ALTER TABLE public.quotation_items ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS payment_schedule text;
ALTER TABLE public.quotations ADD COLUMN IF NOT EXISTS outputs jsonb NOT NULL DEFAULT '[]'::jsonb;
-- Tells PostgREST to pick up the new columns once this commits.
NOTIFY pgrst, 'reload schema';
COMMIT;
