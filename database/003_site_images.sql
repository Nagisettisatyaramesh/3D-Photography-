-- Photos the admin has swapped in from /admin/site-images. A slot with no
-- row here shows the site's built-in photo. Safe to re-run.
BEGIN;
CREATE TABLE IF NOT EXISTS public.site_images (
  slot text PRIMARY KEY,
  image_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
-- Tells PostgREST to pick up the new table once this commits.
NOTIFY pgrst, 'reload schema';
COMMIT;
