create extension if not exists pgcrypto;
create table if not exists public.audit_logs(
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 action text not null,
 entity_type text not null,
 entity_id text not null,
 outcome text not null,
 details jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now()
);
alter table public.audit_logs enable row level security;
create policy "audit_select_own" on public.audit_logs for select to authenticated using ((select auth.uid())=owner_id);
create policy "audit_insert_own" on public.audit_logs for insert to authenticated with check ((select auth.uid())=owner_id);
revoke update,delete on public.audit_logs from authenticated;
create index if not exists audit_logs_owner_created_idx on public.audit_logs(owner_id,created_at desc);
