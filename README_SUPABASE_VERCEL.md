# Supabase + Vercel + Android SIM SMS Setup

## Vercel environment variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANDROID_GATEWAY_TOKEN`
- `WORKSHOP_PHONE=+919834756711`

## Supabase setup
1. Open your Supabase project.
2. Go to SQL Editor.
3. Paste the contents of `supabase/schema.sql`.
4. Run the SQL to create `leads` and `sms_queue`.

## Deploy to Vercel
1. Import this project into Vercel.
2. Add all environment variables in Project Settings.
3. Deploy the project.
4. After deploy, your frontend runs on Vercel and the API routes are available under `/api/*`.

## Android phone setup
1. Insert the workshop SIM into an Android phone.
2. Install an SMS gateway app that can poll HTTPS endpoints on an interval.
3. Configure the poll URL: `https://<your-vercel-domain>/api/sms/pending`
4. Configure the update URL: `https://<your-vercel-domain>/api/sms/update`
5. Add header: `Authorization: Bearer <ANDROID_GATEWAY_TOKEN>`
6. Set polling interval to 15-30 seconds.
7. When a pending item is returned, send the SMS from the phone SIM and POST the result to `/api/sms/update`.

## Lead capture flow
1. Customer fills the booking form.
2. Vercel API stores the lead in Supabase.
3. Vercel API creates a pending SMS job in `sms_queue`.
4. Android phone polls `/api/sms/pending`.
5. Android phone sends the SMS from the SIM.
6. Android phone calls `/api/sms/update` with `sent` or `failed`.
