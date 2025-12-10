const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('o estado do sistema é reiniciado', async function() {
  // reset já executado nos hooks, mas mantemos a asserção para garantir previsibilidade
  const turmas = await this.api.get('/turmas?professorId=prof-1');
  expect(turmas.status).toBe(200);
});

When('realizo POST para "{string}" com credenciais do professor', async function(endpoint) {
  this.lastResponse = await this.api.post(endpoint, {
    tipo: 'professor',
    identificador: 'ana@cin.ufpe.br',
    senha: '123456'
  });
});

Then('o serviço deve responder com sucesso e dados do professor', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(this.lastResponse.data.success).toBe(true);
  expect(this.lastResponse.data.data.email).toBe('ana@cin.ufpe.br');
});

When('faço GET em "{string}"', async function(endpoint) {
  this.lastResponse = await this.api.get(endpoint);
});

Then('devo receber as turmas do professor', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(Array.isArray(this.lastResponse.data.data)).toBe(true);
  expect(this.lastResponse.data.data.length).toBeGreaterThan(0);
});

Then('devo receber a lista de alunos da turma', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(Array.isArray(this.lastResponse.data.data)).toBe(true);
  expect(this.lastResponse.data.data[0]).toHaveProperty('nome');
});

When('faço POST em "{string}" com dados válidos', async function(endpoint) {
  this.lastResponse = await this.api.post(endpoint, {
    id: 'turma-import',
    nome: 'Turma Importada',
    professorId: 'prof-1',
    alunos: [],
    monitores: []
  });
});

Then('a turma deve ser criada e listada para o professor', async function() {
  expect([200, 201]).toContain(this.lastResponse.status);
  const turmas = await this.api.get('/turmas?professorId=prof-1');
  const existe = turmas.data.data.some(t => t.id === 'turma-import');
  expect(existe).toBe(true);
});

When('faço POST em "{string}" para cadastrar um monitor', async function(endpoint) {
  this.lastResponse = await this.api.post(endpoint, {
    nome: 'Monitor API',
    matricula: `M${Date.now()}`
  }, { headers: { 'x-professor-id': 'prof-1' } });
});

Then('o monitor deve ser retornado e persistido', async function() {
  expect(this.lastResponse.status).toBe(200);
  const lista = await this.api.get('/turmas/turma-1/monitores');
  const encontrado = lista.data.data.some(m => m.nome === 'Monitor API');
  expect(encontrado).toBe(true);
});

When('faço POST em "{string}"', async function(endpoint) {
  this.lastResponse = await this.api.post(endpoint, {}, { headers: { 'x-professor-id': 'prof-1' } });
});

Then('devo receber resumo de notificações enviadas', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(Array.isArray(this.lastResponse.data.data)).toBe(true);
});

Then('devo receber o resultado da revalidação', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(this.lastResponse.data.data).toHaveProperty('resumo');
});

When('faço POST em "{string}" com limite máximo {int}', async function(endpoint, limite) {
  this.lastResponse = await this.api.post(endpoint, { limiteMaximo: limite }, { headers: { 'x-professor-id': 'prof-1' } });
});

Then('devo receber a confirmação da realocação', function() {
  expect(this.lastResponse.status).toBe(200);
  expect(this.lastResponse.data.success).toBe(true);
});
