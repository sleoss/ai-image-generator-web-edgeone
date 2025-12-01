// Edge Functions for AI Image Generation API
// Handles image generation requests at /api/generate

// Configuration
const API_BASE_URL = 'https://z-api.aioec.tech/proxy/generate';

// Main request handler for the /api/generate endpoint
export function onRequestPost(context) {
  return handleGenerateRequest(context.request, context.env);
}

// Handle image generation request
async function handleGenerateRequest(request, env) {
  try {
    const body = await request.json();
    const { prompt, seed } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get API key from environment or request headers
    const apiKey = env.API_KEY || request.headers.get('X-API-Key');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key is required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Forward request to the actual AI API
    const apiResponse = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, seed })
    });

    if (!apiResponse.ok) {
      return new Response(JSON.stringify({
        error: `API request failed: ${apiResponse.status} ${apiResponse.statusText}`
      }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Generation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}