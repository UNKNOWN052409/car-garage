# Advanced Car Workshop Lead Queue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture customer phone numbers from the website, store them in Supabase, queue SMS follow-ups for the workshop number `+91 98347 56711`, and expose Vercel API routes that an Android phone can poll to send SMS through its SIM.

**Architecture:** Keep the React/Vite frontend on Vercel and add a small Vercel serverless API layer under `api/`. The booking form posts lead data to Supabase and inserts an SMS queue record. An Android SMS gateway app polls a protected queue endpoint, sends SMS from the SIM in the phone, then calls a second endpoint to mark each queue item as sent or failed.

**Tech Stack:** React 18, Vite 5, Vercel serverless functions, Supabase Postgres, `@supabase/supabase-js`, Android SMS gateway app polling HTTPS endpoints.

---

## File Structure

- Modify: `package.json` — add the Supabase client dependency if it is missing
- Modify: `src/components/Booking.jsx` — collect customer phone number, submit lead request, update CTA flow
- Modify: `src/components/Booking.module.css` — style the extra phone field and status messages
- Modify: `src/utils/constants.js` — centralize the workshop phone number usage
- Modify: `src/utils/supabase.js` — expose a safe browser Supabase client only when public env vars exist
- Create: `src/utils/api.js` — small frontend helper for posting booking leads
- Create: `api/leads/create.js` — Vercel route to validate request and insert lead + SMS queue rows
- Create: `api/sms/pending.js` — protected route for Android phone to fetch pending SMS queue items
- Create: `api/sms/update.js` — protected route for Android phone to mark a queue item sent or failed
- Create: `supabase/schema.sql` — SQL for `leads` and `sms_queue` tables plus indexes
- Create: `.env.example` — required Vite + Vercel env vars
- Create: `vercel.json` — optional runtime config only if needed for routing/runtime
- Create: `README_SUPABASE_VERCEL.md` — exact setup steps for Supabase, Vercel env vars, and Android phone polling
- Test: `npm run build`

### Task 1: Install and wire the Supabase dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the dependency entry**

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.56.0"
  }
}
```

- [ ] **Step 2: Install the dependency**

Run: `npm install`
Expected: lockfile updates and `@supabase/supabase-js` is installed without errors

- [ ] **Step 3: Verify the package is present**

Run: `npm ls @supabase/supabase-js`
Expected: one installed dependency tree showing `@supabase/supabase-js`

### Task 2: Define the database schema for leads and queued SMS

**Files:**
- Create: `supabase/schema.sql`

- [ ] **Step 1: Add the SQL schema**

```sql
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  customer_name text,
  customer_phone text not null,
  car_brand text not null,
  car_model text not null,
  car_year integer not null,
  service_key text not null,
  service_label text not null,
  source text not null default 'booking_form',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.sms_queue (
  id bigint generated always as identity primary key,
  lead_id bigint not null references public.leads(id) on delete cascade,
  target_phone text not null,
  message text not null,
  direction text not null default 'outbound',
  delivery_status text not null default 'pending',
  provider text not null default 'android_sim_gateway',
  attempts integer not null default 0,
  last_error text,
  locked_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists sms_queue_status_created_idx on public.sms_queue (delivery_status, created_at asc);
```

- [ ] **Step 2: Run the SQL in Supabase SQL Editor**

Run: paste `supabase/schema.sql` into Supabase SQL editor and execute it
Expected: both tables and indexes are created successfully

- [ ] **Step 3: Verify tables exist**

Run: `select count(*) from public.leads;` and `select count(*) from public.sms_queue;`
Expected: both queries return `0` on a fresh database

### Task 3: Add environment variable scaffolding

**Files:**
- Modify: `src/utils/supabase.js`
- Create: `.env.example`

- [ ] **Step 1: Replace the browser client helper**

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
```

- [ ] **Step 2: Add the shared env example file**

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ANDROID_GATEWAY_TOKEN=
WORKSHOP_PHONE=+919834756711
```

- [ ] **Step 3: Verify no secrets are hardcoded into frontend code**

Run: `npm run build`
Expected: build succeeds without exposing the service role key in `dist/`

### Task 4: Add a frontend API helper for booking submissions

**Files:**
- Create: `src/utils/api.js`

- [ ] **Step 1: Add the booking submission helper**

```js
export async function createLead(payload) {
  const response = await fetch('/api/leads/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to save your request right now.');
  }

  return data;
}
```

- [ ] **Step 2: Verify the helper builds**

Run: `npm run build`
Expected: build succeeds with the new utility imported nowhere yet

### Task 5: Update the booking form to collect phone numbers and submit leads

**Files:**
- Modify: `src/components/Booking.jsx`
- Modify: `src/components/Booking.module.css`
- Modify: `src/utils/constants.js`
- Create: `src/utils/api.js`

- [ ] **Step 1: Expand constants so the phone number is reused**

```js
export const PHONE_NUMBER = '+919834756711';
export const WHATSAPP_NUMBER = '919834756711';
export const TELEGRAM_URL = 'https://t.me/advancedcarworkshop';
```

- [ ] **Step 2: Replace the booking component with submit logic**

```jsx
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createLead } from '../utils/api';
import { CAR_BRANDS, PHONE_NUMBER, SERVICE_TYPES, TELEGRAM_URL, WHATSAPP_NUMBER } from '../utils/constants';
import styles from './Booking.module.css';

const initialForm = {
  brand: '',
  model: '',
  year: '',
  service: '',
  phone: '',
};

export default function Booking() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const selectedIndex = SERVICE_TYPES.indexOf(formData.service);
  const selectedService = selectedIndex >= 0 ? t(`services.items.${selectedIndex}.title`) : '';
  const isReady = Boolean(formData.brand && formData.model && formData.year && formData.service && formData.phone);

  const whatsappUrl = useMemo(() => {
    const message = `Hi ADVANCED CAR WORKSHOP, I want to book service for ${formData.brand} ${formData.model} (${formData.year}). Service: ${selectedService || 'Not selected yet'}. My phone number is ${formData.phone || 'not entered yet'}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [formData.brand, formData.model, formData.year, formData.service, formData.phone, selectedService]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isReady) {
      setSubmitState({ status: 'error', message: 'Please fill all fields, including your phone number.' });
      return;
    }

    setSubmitState({ status: 'loading', message: 'Saving your request...' });

    try {
      await createLead({
        customerPhone: formData.phone,
        carBrand: formData.brand,
        carModel: formData.model,
        carYear: Number(formData.year),
        serviceKey: formData.service,
        serviceLabel: selectedService,
        source: 'booking_form',
      });

      setSubmitState({ status: 'success', message: 'Your request is saved. We can now follow up by SMS.' });
    } catch (error) {
      setSubmitState({ status: 'error', message: error.message });
    }
  };

  return (
    <section className={styles.booking} id="booking">
      <div className="container">
        <div className={styles.bookingLayout}>
          <div className={styles.bookingIntro}>
            <div className="section-kicker">Smart booking</div>
            <h2 className={styles.sectionTitle}>{t('booking.title', 'Book high-tech service in seconds')}</h2>
            <p className={styles.sectionSubtitle}>{t('booking.subtitle', 'Prepare your request with the right vehicle data, then save it instantly for callback and SMS follow-up.')}</p>
          </div>

          <form className={`${styles.bookingForm} glass-card`} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.formGroup}>
                <span>{t('booking.brand', 'Car Brand')}</span>
                <select name="brand" value={formData.brand} onChange={handleChange} className={styles.formField}>
                  <option value="">{t('booking.selectBrand', 'Select Brand')}</option>
                  {CAR_BRANDS.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.model', 'Model')}</span>
                <input name="model" value={formData.model} onChange={handleChange} placeholder={t('booking.modelPlaceholder', 'Enter model name')} className={styles.formField} />
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.year', 'Year')}</span>
                <input name="year" type="number" min="1990" max="2026" value={formData.year} onChange={handleChange} placeholder="2024" className={styles.formField} />
              </label>

              <label className={styles.formGroup}>
                <span>{t('booking.serviceType', 'Service Type')}</span>
                <select name="service" value={formData.service} onChange={handleChange} className={styles.formField}>
                  <option value="">{t('booking.selectService', 'Select Service')}</option>
                  {SERVICE_TYPES.map((service, index) => (
                    <option key={service} value={service}>{t(`services.items.${index}.title`)}</option>
                  ))}
                </select>
              </label>

              <label className={`${styles.formGroup} ${styles.formGroupFull}`}>
                <span>Phone Number</span>
                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="9876543210" className={styles.formField} />
              </label>
            </div>

            <div className={styles.bookingOutput}>
              <p>{submitState.message || (isReady ? `Ready to save ${selectedService} for ${formData.brand} ${formData.model}.` : 'Fill the fields to save your request and unlock the fastest booking route.')}</p>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitState.status === 'loading'}>
                {submitState.status === 'loading' ? 'Saving...' : 'Save Request'}
              </button>
              <a href={`tel:${PHONE_NUMBER}`} className={styles.btnGlass}>Call Now</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.btnGlass}>WhatsApp Chat</a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.btnGlass}>Telegram</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add the full-width field class**

```css
.formGroupFull {
  grid-column: 1 / -1;
}
```

- [ ] **Step 4: Run build to verify the form compiles**

Run: `npm run build`
Expected: build succeeds with the updated booking form

### Task 6: Add the lead creation Vercel API route

**Files:**
- Create: `api/leads/create.js`

- [ ] **Step 1: Add the route implementation**

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const workshopPhone = process.env.WORKSHOP_PHONE || '+919834756711';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerPhone, carBrand, carModel, carYear, serviceKey, serviceLabel, source } = req.body || {};

  if (!customerPhone || !carBrand || !carModel || !carYear || !serviceKey || !serviceLabel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({
      customer_phone: customerPhone,
      car_brand: carBrand,
      car_model: carModel,
      car_year: carYear,
      service_key: serviceKey,
      service_label: serviceLabel,
      source: source || 'booking_form',
    })
    .select()
    .single();

  if (leadError) {
    return res.status(500).json({ error: 'Failed to save lead' });
  }

  const smsMessage = `ADVANCED CAR WORKSHOP: Thanks for contacting us. We received your ${serviceLabel} request for ${carBrand} ${carModel}. We will contact you soon. Call us at ${workshopPhone}.`;

  const { error: queueError } = await supabase
    .from('sms_queue')
    .insert({
      lead_id: lead.id,
      target_phone: customerPhone,
      message: smsMessage,
    });

  if (queueError) {
    return res.status(500).json({ error: 'Lead saved but SMS queue insert failed' });
  }

  return res.status(201).json({ ok: true, leadId: lead.id });
}
```

- [ ] **Step 2: Verify the route is included in Vercel build output**

Run: `npm run build`
Expected: frontend build still succeeds and the `api/` directory remains ready for Vercel deployment

### Task 7: Add the Android polling endpoint for pending SMS jobs

**Files:**
- Create: `api/sms/pending.js`

- [ ] **Step 1: Add the queue polling route**

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.headers.authorization !== `Bearer ${process.env.ANDROID_GATEWAY_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabase
    .from('sms_queue')
    .select('id, target_phone, message, attempts')
    .eq('delivery_status', 'pending')
    .order('created_at', { ascending: true })
    .limit(10);

  if (error) {
    return res.status(500).json({ error: 'Failed to load pending SMS jobs' });
  }

  return res.status(200).json({ items: data });
}
```

- [ ] **Step 2: Verify the auth contract is explicit**

Run: check that requests without `Authorization: Bearer <token>` return `401`
Expected: only the Android phone app can poll pending messages

### Task 8: Add the Android status update endpoint

**Files:**
- Create: `api/sms/update.js`

- [ ] **Step 1: Add the status update route**

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.headers.authorization !== `Bearer ${process.env.ANDROID_GATEWAY_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id, status, errorMessage } = req.body || {};

  if (!id || !status) {
    return res.status(400).json({ error: 'Missing id or status' });
  }

  const patch = status === 'sent'
    ? { delivery_status: 'sent', sent_at: new Date().toISOString(), last_error: null }
    : { delivery_status: 'failed', last_error: errorMessage || 'Unknown SMS error' };

  const { error } = await supabase
    .from('sms_queue')
    .update(patch)
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Failed to update SMS status' });
  }

  return res.status(200).json({ ok: true });
}
```

- [ ] **Step 2: Verify status transitions work**

Run: send a manual POST from your API client with `status: "sent"` and then with `status: "failed"`
Expected: matching `sms_queue` rows update correctly in Supabase

### Task 9: Document Vercel and Android SMS gateway setup

**Files:**
- Create: `README_SUPABASE_VERCEL.md`

- [ ] **Step 1: Write the deployment guide**

```md
# Supabase + Vercel + Android SIM SMS Setup

## Vercel env vars
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANDROID_GATEWAY_TOKEN`
- `WORKSHOP_PHONE=+919834756711`

## Deploy to Vercel
1. Import the project into Vercel.
2. Add all env vars in Project Settings.
3. Deploy the project.

## Android phone setup
1. Insert the workshop SIM into an Android phone.
2. Install an SMS gateway app that can poll HTTPS endpoints on an interval.
3. Configure the poll URL: `https://<your-vercel-domain>/api/sms/pending`
4. Configure the update URL: `https://<your-vercel-domain>/api/sms/update`
5. Add header: `Authorization: Bearer <ANDROID_GATEWAY_TOKEN>`
6. Set polling interval to 15-30 seconds.
7. When a pending item is returned, send the SMS from the phone SIM and POST the result to `/api/sms/update`.
```

- [ ] **Step 2: Verify the docs match the code paths exactly**

Run: compare `README_SUPABASE_VERCEL.md` against `api/leads/create.js`, `api/sms/pending.js`, and `api/sms/update.js`
Expected: all documented endpoints and env var names match exactly

### Task 10: Final verification

**Files:**
- Modify: `src/components/Booking.jsx`
- Modify: `src/components/Booking.module.css`
- Modify: `src/utils/constants.js`
- Modify: `src/utils/supabase.js`
- Create: `src/utils/api.js`
- Create: `api/leads/create.js`
- Create: `api/sms/pending.js`
- Create: `api/sms/update.js`
- Create: `supabase/schema.sql`
- Create: `.env.example`
- Create: `README_SUPABASE_VERCEL.md`

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: build succeeds with no import or syntax errors

- [ ] **Step 2: Test lead creation locally**

Run: submit the booking form in the browser with a test phone number
Expected: one new row in `public.leads` and one new row in `public.sms_queue`

- [ ] **Step 3: Test Android polling manually**

Run: `curl -H "Authorization: Bearer <ANDROID_GATEWAY_TOKEN>" https://<your-vercel-domain>/api/sms/pending`
Expected: JSON response with queued SMS items

- [ ] **Step 4: Test Android status update manually**

Run: `curl -X POST https://<your-vercel-domain>/api/sms/update -H "Content-Type: application/json" -H "Authorization: Bearer <ANDROID_GATEWAY_TOKEN>" -d '{"id":1,"status":"sent"}'`
Expected: JSON response `{ "ok": true }`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/components/Booking.jsx src/components/Booking.module.css src/utils/constants.js src/utils/supabase.js src/utils/api.js api/leads/create.js api/sms/pending.js api/sms/update.js supabase/schema.sql .env.example README_SUPABASE_VERCEL.md docs/superpowers/plans/2026-04-23-advanced-car-workshop.md
git commit -m "feat: queue workshop leads and SIM-based SMS follow-up"
```
