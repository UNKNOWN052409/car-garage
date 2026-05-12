export async function createLead(payload) {
  const response = await fetch('/api/leads/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to save your request right now.');
  }

  return data;
}
