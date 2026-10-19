# JROC Repair + Authorized Unlock Vite Pack

A mobile-responsive React + TypeScript + Vite feature pack.

## Modules
- Repair Operations: phones, tablets, laptops, desktops
- Authorized Unlock & Recovery: carrier eligibility, owner verification, official account recovery, enterprise recovery, OS restore/reinstall, migration, data transfer
- Supabase audit log storage with per-user RLS and append-only client permissions
- MDM provider adapter contract for Android Management API, Microsoft Intune, and generic EMM backends

## Run
1. Copy `.env.example` to `.env.local` and enter the Supabase project URL and publishable key.
2. Run the SQL migration in Supabase.
3. Run `npm install`.
4. Run `npm run dev`.

MDM provider calls require a trusted server implementing the documented HTTP contract. No privileged provider credentials belong in the Vite application.
