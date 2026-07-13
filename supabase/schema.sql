-- ============================================================
-- Royal English Medium School — Supabase Database Schema
-- Run this ONCE in your Supabase project's SQL Editor
-- (Project Dashboard → SQL Editor → New Query → paste → Run)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- LEADS  (admission enquiries + contact messages)
-- ------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('admission', 'contact')),
  name text not null,
  phone text,
  email text,
  student_name text,
  class_applying text,
  subject text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- Anyone (including anonymous website visitors) can submit a lead
create policy "Public can insert leads"
  on leads for insert
  to anon
  with check (true);

-- Only logged-in admins can view / update / delete leads
create policy "Admins can view leads"
  on leads for select
  to authenticated
  using (true);

create policy "Admins can update leads"
  on leads for update
  to authenticated
  using (true);

create policy "Admins can delete leads"
  on leads for delete
  to authenticated
  using (true);

-- ------------------------------------------------------------
-- NEWS  (news, notices, announcements)
-- ------------------------------------------------------------
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  category text not null default 'Announcement',
  date date not null default current_date,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table news enable row level security;

create policy "Public can view published news"
  on news for select
  to anon
  using (published = true);

create policy "Admins can manage news"
  on news for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- EVENTS
-- ------------------------------------------------------------
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table events enable row level security;

create policy "Public can view published events"
  on events for select
  to anon
  using (published = true);

create policy "Admins can manage events"
  on events for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- GALLERY
-- ------------------------------------------------------------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Campus',
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table gallery enable row level security;

create policy "Public can view published gallery items"
  on gallery for select
  to anon
  using (published = true);

create policy "Admins can manage gallery"
  on gallery for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- FACULTY
-- ------------------------------------------------------------
create table if not exists faculty (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  note text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table faculty enable row level security;

create policy "Public can view published faculty"
  on faculty for select
  to anon
  using (published = true);

create policy "Admins can manage faculty"
  on faculty for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- FEE STRUCTURE
-- ------------------------------------------------------------
create table if not exists fee_structure (
  id uuid primary key default gen_random_uuid(),
  stage text not null,
  admission_fee text not null,
  monthly_tuition text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table fee_structure enable row level security;

create policy "Public can view fee structure"
  on fee_structure for select
  to anon
  using (true);

create policy "Admins can manage fee structure"
  on fee_structure for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- Seed with the current placeholder content so the site keeps
-- working the moment you connect it (edit/delete later from /admin)
-- ------------------------------------------------------------
insert into news (title, excerpt, category, date) values
  ('Admissions Open for Academic Session 2026–27', 'Applications are now open for Nursery through Class X. Seats are limited — apply early to secure your child''s place.', 'Admissions', '2026-07-01'),
  ('Annual Sports Day Announced', 'Our Annual Sports Day will be held on the main campus ground, featuring track events, team sports and a prize distribution ceremony.', 'Events', '2026-06-20'),
  ('Outstanding Board Examination Results', 'Students of Class X achieved excellent results this year, with the majority scoring distinctions across subjects.', 'Achievement', '2026-05-15');

insert into events (title, description, event_date) values
  ('Admissions Open House', 'Meet our faculty, tour the campus and get all your admission questions answered.', '2026-07-20'),
  ('Annual Sports Day', 'A full day of athletics, team sports and celebration on the school ground.', '2026-08-15'),
  ('Independence Day Celebration', 'Flag hoisting, cultural performances and patriotic programs.', '2026-08-15'),
  ('Annual Function', 'Our flagship cultural evening featuring performances from every class.', '2026-12-18');

insert into faculty (name, role, note, sort_order) values
  ('Mrs. A. Sharma', 'Principal', '22 years in school leadership and curriculum design.', 1),
  ('Mr. R. Iqbal', 'Vice Principal / Mathematics', 'Specialist in foundational and board-level mathematics.', 2),
  ('Ms. P. Banerjee', 'Head of Science', 'Postgraduate in Physics; leads the school science lab.', 3),
  ('Mrs. S. Khatun', 'Head of English & Languages', 'Focused on communication skills and creative writing.', 4);

insert into fee_structure (stage, admission_fee, monthly_tuition, sort_order) values
  ('Nursery – UKG', '₹3,000', '₹800', 1),
  ('Class I – V', '₹3,500', '₹950', 2),
  ('Class VI – VIII', '₹4,000', '₹1,100', 3),
  ('Class IX – X', '₹4,500', '₹1,300', 4);

insert into gallery (title, category) values
  ('Main Building Facade', 'Campus'),
  ('Smart Classroom Session', 'Academics'),
  ('Annual Sports Day', 'Sports'),
  ('Science Exhibition', 'Academics'),
  ('Independence Day Celebration', 'Celebrations'),
  ('Library Reading Hour', 'Campus'),
  ('Inter-House Football', 'Sports'),
  ('Annual Function Performance', 'Events'),
  ('Prize Distribution Ceremony', 'Events'),
  ('Computer Lab Session', 'Academics'),
  ('Republic Day Flag Hoisting', 'Celebrations'),
  ('School Playground', 'Campus');
