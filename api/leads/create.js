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
      source: source || 'booking_form'
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
      message: smsMessage
    });

  if (queueError) {
    return res.status(500).json({ error: 'Lead saved but SMS queue insert failed' });
  }

  return res.status(201).json({ ok: true, leadId: lead.id });
}
