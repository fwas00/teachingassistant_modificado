const axios = require('axios');

const apiBase = process.env.API_BASE_URL || 'http://localhost:3000';

const client = axios.create({ baseURL: apiBase, validateStatus: () => true });

async function loginProfessor() {
  return client.post('/auth/login', {
    tipo: 'professor',
    identificador: 'ana@cin.ufpe.br',
    senha: '123456'
  });
}

module.exports = { client, loginProfessor };
