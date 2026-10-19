create extension if not exists pgcrypto;
create table if not exists public.repair_jobs(
 id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 ticket_number text not null, customer_name text not null, device_kind text not null check(device_kind in('Cell Phone','Tablet','Laptop','Desktop')),
 manufacturer text not null, model text not null, issue text not null, status text not null default 'Received', authorized boolean not null default false,
 priority text not null default 'Normal', assigned_to text, version integer not null default 1, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.unlock_cases(
 id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 ticket_number text not null, service text not null, device text not null, carrier text, ownership_verified boolean not null default false,
 authorization_recorded boolean not null default false, status text not null default 'Intake', notes text not null default '',
 risk_level text not null default 'standard', approval_state text not null default 'pending', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.approval_events(
 id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 entity_type text not null, entity_id text not null, decision text not null, reason text, created_at timestamptz not null default now()
);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$begin new.updated_at=now();new.version=old.version+1;return new;end$$;
drop trigger if exists repair_jobs_updated on public.repair_jobs;create trigger repair_jobs_updated before update on public.repair_jobs for each row execute function public.set_updated_at();
-- unlock_cases has no version column, so a separate timestamp trigger is used.
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$begin new.updated_at=now();return new;end$$;
drop trigger if exists unlock_cases_updated on public.unlock_cases;create trigger unlock_cases_updated before update on public.unlock_cases for each row execute function public.touch_updated_at();
alter table public.repair_jobs enable row level security;alter table public.unlock_cases enable row level security;alter table public.approval_events enable row level security;
create policy "repair_jobs_own_all" on public.repair_jobs for all to authenticated using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "unlock_cases_own_all" on public.unlock_cases for all to authenticated using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "approval_events_own_select" on public.approval_events for select to authenticated using(auth.uid()=owner_id);
create policy "approval_events_own_insert" on public.approval_events for insert to authenticated with check(auth.uid()=owner_id);
revoke update,delete on public.approval_events from authenticated;
alter publication supabase_realtime add table public.repair_jobs;
alter publication supabase_realtime add table public.unlock_cases;
