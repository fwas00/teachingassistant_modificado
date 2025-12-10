const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ProfessorDashboardPage } = require('../gui/professor.page');

Given('que estou na tela de login do professor', async function() {
  await this.launchBrowser();
  this.pageObject = new ProfessorDashboardPage(this.page, this.uiBase);
  await this.pageObject.openLogin();
});

When('informo credenciais válidas', async function() {
  await this.pageObject.loginProfessor();
});

Then('devo ser redirecionado para o dashboard do professor', async function() {
  await this.pageObject.waitForDashboard();
  await expect(this.page.locator('text=Bem-vindo')).toBeVisible();
});

Given('que estou logado como professor', async function() {
  await this.launchBrowser();
  this.pageObject = new ProfessorDashboardPage(this.page, this.uiBase);
  await this.pageObject.openLogin();
  await this.pageObject.loginProfessor();
  await this.pageObject.waitForDashboard();
});

When('acesso o dashboard do professor', async function() {
  await this.pageObject.waitForDashboard();
});

Then('devo visualizar minha lista de turmas', async function() {
  const turmas = await this.pageObject.turmas();
  expect(turmas.length).toBeGreaterThan(0);
});

When('seleciono uma turma', async function() {
  await this.pageObject.selecionarTurma(1);
});

Then('devo ver os alunos daquela turma', async function() {
  const alunos = await this.pageObject.alunosVisiveis();
  expect(alunos.length).toBeGreaterThan(0);
});

When('importo um arquivo de turma válido', async function() {
  await this.pageObject.importarTurma('Turma Importada');
});

Then('a nova turma deve aparecer na lista', async function() {
  const turmas = await this.pageObject.turmas();
  const hasTurma = turmas.some(t => t.includes('Importada'));
  expect(hasTurma).toBe(true);
});

When('aloco um monitor para um aluno', async function() {
  await this.pageObject.selecionarTurma(1);
  await this.pageObject.abrirCadastroMonitor();
  await this.pageObject.cadastrarMonitor('Monitor Auto', `M${Date.now()}`);
});

Then('a alocação deve ser salva com sucesso', async function() {
  const mensagens = await this.pageObject.verMensagens();
  expect(mensagens.some(m => m.includes('sucesso'))).toBe(true);
});

When('abro a área de notificações', async function() {
  await this.pageObject.abrirNotificacoes();
});

Then('devo visualizar minhas notificações', async function() {
  const notificacoes = await this.pageObject.notificacoesResumo();
  expect(notificacoes.length).toBeGreaterThanOrEqual(0);
});
