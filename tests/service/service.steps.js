const { Given, When, Then } = require('cucumber');
const { apiGet, apiPost, apiDelete, ensureAlunoRemoved } = require('../support/api');
const chai = require('chai');
const expect = chai.expect;

let lastResponse;

Given('eu cadastro via serviço o aluno {string} com CPF {string}', async function (nome, cpf) {
  await ensureAlunoRemoved(cpf);
  lastResponse = await apiPost('/alunos', { nome, cpf });
});

When('eu faço uma requisição GET para {string}', async function (path) {
  lastResponse = await apiGet(path);
});

When('eu faço uma requisição POST para {string} com nome {string} e CPF {string}', async function (path, nome, cpf) {
  lastResponse = await apiPost(path, { nome, cpf });
});

When('eu faço uma requisição DELETE para {string}', async function (path) {
  lastResponse = await apiDelete(path);
});

Then('a resposta deve ter status {int}', function (status) {
  expect(lastResponse.response.status).to.equal(status);
});

Then('o corpo deve conter sucesso verdadeiro', function () {
  expect(lastResponse.body).to.have.property('success', true);
});

Then('o corpo deve conter o aluno com CPF {string}', function (cpf) {
  const body = lastResponse.body;
  const alunos = Array.isArray(body) ? body : body.data || body.alunos || [];
  const match = alunos.find ? alunos.find(a => (a.cpf || a.matricula) === cpf || a.cpf === cpf || a.id === cpf) : undefined;
  if (!match && body.cpf) {
    expect(body.cpf).to.equal(cpf);
    return;
  }
  expect(match, 'Aluno esperado não encontrado no corpo da resposta').to.exist;
});

Then('o corpo não deve conter o aluno com CPF {string}', function (cpf) {
  const body = lastResponse.body;
  const alunos = Array.isArray(body) ? body : body.data || body.alunos || [];
  const match = alunos.find ? alunos.find(a => (a.cpf || a.matricula) === cpf || a.id === cpf) : undefined;
  expect(match).to.be.undefined;
});
