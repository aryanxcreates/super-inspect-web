-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'lifetime')),
  polar_customer_id text,
  polar_subscription_id text,
  license_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (limited fields)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Service role can do everything (for webhooks)
create policy "Service role full access"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- Usage analytics
create table if not exists public.usage_logs (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  feature text not null,
  action text not null,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

alter table public.usage_logs enable row level security;

create policy "Users can read own usage"
  on public.usage_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own usage"
  on public.usage_logs for insert
  with check (auth.uid() = user_id);

create policy "Service role full access on usage"
  on public.usage_logs for all
  using (auth.role() = 'service_role');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Index for fast license lookups
create index if not exists idx_profiles_license_key on public.profiles(license_key);

-- Index for usage analytics
create index if not exists idx_usage_logs_user_feature on public.usage_logs(user_id, feature, created_at);
