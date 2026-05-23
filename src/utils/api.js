export async function createLead(payload) {
  // Mock API call since backend doesn't exist yet
  // In production, this would call a real API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful save
      console.log('Lead saved (mock):', payload);
      resolve({ success: true, message: 'Request saved successfully' });
    }, 500);
  });
}
