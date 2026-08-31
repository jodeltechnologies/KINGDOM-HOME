-- =====================================================================
-- Kingdom Home, Supabase schema
-- Run this once in the Supabase SQL editor: New query, paste, Run.
--
-- Security model, stated plainly so you know what you are getting:
-- the household code is the key. Anyone who has the code can read and
-- write your family's notes. The tables themselves are closed to the
-- public anon key, and the only way in is through the two functions
-- below, which demand the code. There is no way to list codes or
-- enumerate households. Treat the code like a house key: long, random,
-- shared only between your phone and your wife's.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- One row per household. `data` is the whole app state as JSON.
-- ---------------------------------------------------------------------
create table if not exists public.kh_household (
  code        text primary key
              check (char_length(code) between 12 and 128),
  data        jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Row level security on, with no policies at all. That means the anon
-- key can do nothing directly. Only the security definer functions can.
alter table public.kh_household enable row level security;

revoke all on table public.kh_household from anon, authenticated;

-- ---------------------------------------------------------------------
-- Write. Creates the household on first call, replaces it after that.
-- ---------------------------------------------------------------------
create or replace function public.kh_push(p_code text, p_data jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_code is null or char_length(p_code) < 12 then
    raise exception 'Household code must be at least 12 characters.';
  end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then
    raise exception 'Payload must be a JSON object.';
  end if;
  if pg_column_size(p_data) > 1000000 then
    raise exception 'Payload too large.';
  end if;

  insert into public.kh_household (code, data)
  values (p_code, p_data)
  on conflict (code) do update
    set data = excluded.data,
        updated_at = now();

  return jsonb_build_object('ok', true, 'updated_at', now());
end;
$$;

-- ---------------------------------------------------------------------
-- Read. Returns an empty object if that code has nothing stored yet,
-- so a wrong code and an unused code look exactly the same.
-- ---------------------------------------------------------------------
create or replace function public.kh_pull(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v jsonb;
begin
  if p_code is null or char_length(p_code) < 12 then
    raise exception 'Household code must be at least 12 characters.';
  end if;

  select data into v from public.kh_household where code = p_code;
  return coalesce(v, '{}'::jsonb);
end;
$$;

-- ---------------------------------------------------------------------
-- Grants: the two functions, nothing else.
-- ---------------------------------------------------------------------
revoke all on function public.kh_push(text, jsonb) from public;
revoke all on function public.kh_pull(text)        from public;

grant execute on function public.kh_push(text, jsonb) to anon, authenticated;
grant execute on function public.kh_pull(text)        to anon, authenticated;

-- ---------------------------------------------------------------------
-- Check it worked. Both should succeed and the second should echo back.
-- ---------------------------------------------------------------------
-- select public.kh_push('testcode123456', '{"hello":"world"}'::jsonb);
-- select public.kh_pull('testcode123456');
-- delete from public.kh_household where code = 'testcode123456';
