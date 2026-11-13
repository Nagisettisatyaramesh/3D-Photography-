BEGIN;
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
CREATE TABLE IF NOT EXISTS private.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  enabled boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS private.admin_sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES private.admin_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS admin_sessions_expiry_idx ON private.admin_sessions(expires_at);
CREATE TABLE IF NOT EXISTS private.login_limits (
  key text PRIMARY KEY,
  attempts integer NOT NULL,
  reset_at timestamptz NOT NULL
);
COMMIT;
