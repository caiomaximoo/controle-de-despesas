-- ==============================================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS — CONTROLE DE DESPESAS PESSOAIS
-- ==============================================================================
-- Execute este script no SQL Editor do painel do seu projeto Supabase.
-- Ele cria as tabelas, índices, triggers e todas as políticas de RLS necessárias.

-- 1. Criação da tabela de Perfis de Usuário
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now() not null
);

-- 2. Criação da tabela de Despesas
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  category text not null,
  date date not null,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. Criação de índices para consultas eficientes
create index if not exists idx_expenses_user_date on public.expenses (user_id, date desc);
create index if not exists idx_expenses_user_category on public.expenses (user_id, category);

-- 4. Função e trigger para criação automática de perfil ao cadastrar usuário no Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Usuário'))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Recria o trigger de forma idempotente
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Habilitação de Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.expenses enable row level security;

-- Limpeza de políticas pré-existentes (idempotência)
drop policy if exists "Usuários podem consultar seu próprio perfil" on public.profiles;
drop policy if exists "Usuários podem atualizar seu próprio perfil" on public.profiles;
drop policy if exists "Usuários podem inserir seu próprio perfil" on public.profiles;

drop policy if exists "Usuários podem consultar apenas suas despesas" on public.expenses;
drop policy if exists "Usuários podem cadastrar apenas despesas vinculadas a si" on public.expenses;
drop policy if exists "Usuários podem atualizar apenas suas despesas" on public.expenses;
drop policy if exists "Usuários podem excluir apenas suas despesas" on public.expenses;

-- 6. Políticas de RLS para 'profiles'
create policy "Usuários podem consultar seu próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuários podem inserir seu próprio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Usuários podem atualizar seu próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- 7. Políticas de RLS para 'expenses' (Isolamento total entre contas)
create policy "Usuários podem consultar apenas suas despesas"
  on public.expenses for select
  using (auth.uid() = user_id);

create policy "Usuários podem cadastrar apenas despesas vinculadas a si"
  on public.expenses for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar apenas suas despesas"
  on public.expenses for update
  using (auth.uid() = user_id);

create policy "Usuários podem excluir apenas suas despesas"
  on public.expenses for delete
  using (auth.uid() = user_id);
