# Admin Panel Setup Guide

The admin panel (`/admin`) is fully built, but it needs a free Supabase project connected
before you can sign in. This takes about 10 minutes.

## Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free — no credit card required).
2. Click **New Project**.
3. Choose an organization, give the project a name (e.g. "royal-school"), set a database
   password (save it somewhere safe), pick a region close to you, and click **Create new project**.
4. Wait 1–2 minutes for the project to finish setting up.

## Step 2 — Run the Database Schema

1. In your Supabase project, open the **SQL Editor** (left sidebar).
2. Click **New Query**.
3. Open `supabase/schema.sql` from this project, copy its entire contents, and paste it into
   the SQL Editor.
4. Click **Run**. You should see "Success. No rows returned." This creates all the tables
   (leads, news, events, gallery, faculty, fee_structure) and seeds them with the current
   placeholder content.

## Step 3 — Get Your API Keys

1. In Supabase, go to **Settings → API**.
2. Copy the **Project URL** and the **anon public** key.
3. In this project, copy `.env.local.example` to a new file named `.env.local`:
   ```
   cp .env.local.example .env.local
   ```
4. Paste your values in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart your dev server (`npm run dev`) so it picks up the new environment variables.

## Step 4 — Create Your Admin Login

The admin panel uses Supabase's built-in authentication. Create your first (and only) admin user:

1. In Supabase, go to **Authentication → Users**.
2. Click **Add user → Create new user**.
3. Enter your email and a password. Check **Auto Confirm User** so you don't need to verify
   by email.
4. Click **Create user**.

That's it — this email and password are your admin login.

## Step 5 — Sign In

1. Go to `http://localhost:3000/admin/login` (or your live site + `/admin/login`).
2. Sign in with the email and password you just created.
3. You'll land on the admin dashboard, where you can manage:
   - **Leads** — admission enquiries and contact form submissions
   - **News** — the "Latest News" section on the homepage
   - **Events** — the "Upcoming Events" section on the homepage
   - **Gallery** — photos shown on the public Gallery page
   - **Faculty** — staff shown on the Academics page (and the Principal's Message on the homepage)
   - **Fee Structure** — the fee table on the Admissions page

Changes you make in the admin panel appear on the live site the next time each page loads
(no extra deploy needed).

## Adding More Admin Users

Repeat Step 4 in Supabase for each additional staff member who needs access. There's currently
no in-app "invite user" flow — that would be a good next feature to add if you have several
admins.

## Deploying to Production

When you deploy (e.g. to Vercel), add the same two environment variables
(`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your hosting provider's
project settings, using the same Supabase project. You don't need a second Supabase project
for production unless you want separate staging/live data.

## Troubleshooting

- **"Backend not connected yet" still showing after adding `.env.local`** — make sure you
  restarted `npm run dev` (env vars are only read on server start).
- **Sign-in fails with "Invalid login credentials"** — double check the user was created with
  *Auto Confirm User* checked, and that email/password match exactly.
- **Admin pages show empty tables** — confirm you ran the full `supabase/schema.sql` script,
  including the `insert into ...` seed statements at the bottom.
