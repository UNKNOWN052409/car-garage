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
