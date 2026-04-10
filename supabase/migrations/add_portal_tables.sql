create table if not exists patient_accounts (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now(),
  last_login timestamptz
);

create table if not exists portal_sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz default now(),
  expires_at timestamptz not null
);
