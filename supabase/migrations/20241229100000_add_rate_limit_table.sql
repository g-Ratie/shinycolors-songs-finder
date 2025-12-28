create table rate_limit_attempts (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  attempted_at timestamptz not null default now()
);

create index rate_limit_attempts_key_time_idx on rate_limit_attempts (key, attempted_at);

alter table rate_limit_attempts enable row level security;
