const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
const uiBaseUrl = process.env.UI_BASE_URL || 'http://localhost:4250';

async function apiGet(path) {
  const response = await fetch(`${apiBaseUrl}${path}`);
  const body = await response.json();
  return { response, body };
}

async function apiPost(path, payload) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await response.json();
  return { response, body };
}

async function apiDelete(path) {
  const response = await fetch(`${apiBaseUrl}${path}`, { method: 'DELETE' });
  let body;
  try {
    body = await response.json();
  } catch (_) {
    body = {};
  }
  return { response, body };
}

async function resetTestState() {
  try {
    await apiGet('/turmas');
  } catch (_) {
    // no-op
  }
}

module.exports = { apiGet, apiPost, apiDelete, resetTestState, apiBaseUrl, uiBaseUrl };
