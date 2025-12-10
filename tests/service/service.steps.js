const { Given, When, Then } = require('cucumber');
const { apiGet, apiPost } = require('../support/api');
const chai = require('chai');
const expect = chai.expect;

let lastResponse;
let credenciais = { identificador: 'ana@cin.ufpe.br', senha: '123456' };

Given('que possuo credenciais válidas de professor', function () {
  credenciais = { identificador: 'ana@cin.ufpe.br', senha: '123456' };
});

When('eu faço login como professor', async function () {
  lastResponse = await apiPost('/auth/login', {
    tipo: 'professor',
    identificador: credenciais.identificador,
    senha: credenciais.senha
  });
});

When('eu faço uma requisição GET para {string}', async function (path) {
  lastResponse = await apiGet(path);
});

Then('a resposta deve ter status {int}', function (status) {
  expect(lastResponse.response.status).to.equal(status);
});

Then('o corpo deve conter sucesso verdadeiro', function () {
  expect(lastResponse.body).to.have.property('success', true);
});

Then('o corpo deve conter o professor com email {string}', function (email) {
  const usuario = lastResponse.body.data || lastResponse.body.usuario || lastResponse.body;
  expect(usuario).to.have.property('usuario');
  expect(usuario.usuario).to.have.property('email', email);
});

Then('o corpo deve conter a turma {string}', function (nome) {
  const turmas = lastResponse.body.data || lastResponse.body;
  const match = (turmas || []).find ? turmas.find(t => t.nome === nome) : undefined;
  expect(match, 'Turma esperada não encontrada').to.exist;
});

Then('o corpo deve conter o aluno com matrícula {string}', function (matricula) {
  const alunos = lastResponse.body.data || lastResponse.body;
  const match = (alunos || []).find ? alunos.find(a => a.matricula === matricula) : undefined;
  expect(match, 'Aluno esperado não encontrado').to.exist;
});

Then('o corpo deve conter o monitor com matrícula {string}', function (matricula) {
  const monitores = lastResponse.body.data || lastResponse.body;
  const match = (monitores || []).find ? monitores.find(m => m.matricula === matricula) : undefined;
  expect(match, 'Monitor esperado não encontrado').to.exist;
});
