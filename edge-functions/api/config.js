// Edge Functions for API Configuration
// Handles configuration requests at /api/config

// Configuration
const API_BASE_URL = 'https://z-api.aioec.tech/proxy/generate';

// Main request handler for the /api/config endpoint
export function onRequest(context) {
  return handleConfigRequest(context.env);
}

// Handle configuration request
async function handleConfigRequest(env) {
  const config = {
    apiBaseUrl: API_BASE_URL,
    // Add any other configuration that frontend might need
  };

  return new Response(JSON.stringify(config), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}