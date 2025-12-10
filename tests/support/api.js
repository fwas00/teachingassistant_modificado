const defaultBaseUrl = process.env.API_BASE_URL || 'http://localhost:4250';

async function apiGet(path) {
  const response = await fetch(`${defaultBaseUrl}${path}`);
  const body = await response.json();
  return { response, body };
}

async function apiPost(path, payload) {
  const response = await fetch(`${defaultBaseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const body = await response.json();
  return { response, body };
}

async function apiDelete(path) {
  const response = await fetch(`${defaultBaseUrl}${path}`, { method: 'DELETE' });
  let body;
  try {
    body = await response.json();
  } catch (_) {
    body = {};
  }
  return { response, body };
}

async function ensureAlunoRemoved(cpf) {
  if (!cpf) return;
  await apiDelete(`/alunos/${cpf}`);
}

async function resetTestState() {
  const cpfs = ['683', '900', '901', '902', '999'];
  for (const cpf of cpfs) {
    await ensureAlunoRemoved(cpf);
  }
}

module.exports = { apiGet, apiPost, apiDelete, resetTestState, ensureAlunoRemoved, defaultBaseUrl };
