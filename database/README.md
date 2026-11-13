# VPS PostgreSQL

The site uses PostgreSQL for enquiries, content, availability, quotations and admin sessions. PostgREST translates the existing query calls to SQL; it listens only on `127.0.0.1:9191` and requires a server-held JWT. No hosted Supabase project or Supabase authentication service is used. The legacy `lib/supabase` filenames are compatibility entry points.

Application tables come from the three files in `supabase/`, omitting Supabase role policies and the storage bucket declaration. On the VPS these tables are owned by `uniquecreations_app`. Run `npm run db:migrate` as that owner to apply the numbered files in `database/` in order, including the private authentication tables. Each file is safe to re-run; add new schema changes as the next numbered file. The private schema must not be exposed through PostgREST.

Configure `DATABASE_URL`, `DATABASE_API_URL`, `DATABASE_API_TOKEN`, `APP_ORIGIN` and `MEDIA_ROOT` as shown in `.env.local.example`. Do not prefix database credentials with `NEXT_PUBLIC_`.

Admin passwords use Node's scrypt with a random hex salt and 64-byte output, stored as `salt:hex`. Accounts are provisioned directly by the operator in `private.admin_users`; there is no public registration. Session cookies contain random opaque tokens whose SHA-256 hashes are stored in PostgreSQL, expire after eight hours, and are deleted on logout. Admin writes independently verify the session. Login attempts are limited per IP.

Nginx serves `/media/` from the persistent media directory with `X-Content-Type-Options: nosniff`. Uploads permit JPEG, PNG, WebP and GIF up to 4 MB. Keep this directory and `.env.local` across deployments.

Enquiry notifications and quotation emails use the SMTP settings in `.env.local.example`.
