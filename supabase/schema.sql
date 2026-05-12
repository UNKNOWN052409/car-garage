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
