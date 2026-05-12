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
