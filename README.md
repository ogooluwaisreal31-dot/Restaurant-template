# Restaurant website with cloud admin dashboard

Includes five public pages (Home, Menu, About, Gallery, Contact), plus an admin dashboard at `admin.html`. The dashboard uses Supabase Auth and a Supabase Postgres row to store restaurant configuration. Public pages load the saved configuration from the database. GitHub Pages remains the static host.

## Setup (one time)
1. Create a project at https://supabase.com/dashboard.
2. In Supabase SQL Editor, run the entire `supabase-setup.sql` script. It creates a single-site table with Row Level Security.
3. In Supabase Project Settings > API, copy the Project URL and the publishable key (or legacy anon key). Never use the `service_role` key in browser code.
4. Edit `supabase-config.js`, replacing the two placeholder values. This URL and publishable/anon key are intended for public browser use; access control comes from Auth and RLS.
5. Upload all files in this folder to the root of your GitHub Pages repository, replacing same-named files. Keep filenames and paths unchanged.
6. Open `https://YOUR-USERNAME.github.io/YOUR-REPO/admin.html`. Create the restaurant owner account, confirm the email if required, and sign in.
7. Review the sample details and click **Save and publish cloud changes**. The public pages should display the saved details after refresh.

## Security notes
- This is a starter template, not a fully audited multi-tenant SaaS. The SQL intentionally supports one restaurant per deployed site (`id=1`). Deploy a separate Supabase project or redesign the schema/policies before hosting multiple restaurants in one database.
- The public SELECT policy exposes the row's `config` JSON to anyone. Store only public website information there; never store passwords, customer data, private notes, or secrets.
- RLS limits inserts/updates to the authenticated owner. Do not add a service-role key to any client-side file.
- Use a strong owner password and configure Supabase Auth email confirmation. Review the Supabase project's redirect URL and site URL settings for your GitHub Pages address.
- Supabase Free is subject to quotas, inactivity pausing, and terms that can change. Check current limits before offering this as a paid production service. If a quota is exceeded, cloud features may stop until the quota resets or the plan changes.
- Sample food photos, menu prices, phone numbers and address are placeholders; replace with client-approved data and images you have permission to use.

## Local fallback
If Supabase is not configured or the database cannot be reached, public pages fall back to `config.js`. The cloud admin will not allow login until configured.
