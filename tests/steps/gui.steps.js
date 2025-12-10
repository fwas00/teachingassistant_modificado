const { Given, When, Then } = require('cucumber');
const { browser, ExpectedConditions: EC } = require('protractor');
const page = require('../gui/alunos.page');
const { uiBaseUrl } = require('../support/api');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

Given('que estou no dashboard do professor', async function () {
  await browser.get(uiBaseUrl);
});

Given('faço login como professor padrão', async function () {
  await browser.wait(EC.presenceOf(page.loginIdentificadorInput()), 10000);
  await page.loginTipoSelect().click();
  const professorOption = page.loginTipoOption('Professor');
  if (await professorOption.isPresent()) {
    await professorOption.click();
  }
  await page.loginIdentificadorInput().clear();
  await page.loginIdentificadorInput().sendKeys('ana@cin.ufpe.br');
  await page.loginSenhaInput().clear();
  await page.loginSenhaInput().sendKeys('123456');
  await page.loginButton().click();
  await browser.wait(EC.visibilityOf(page.welcomeHeader()), 10000);
});

When('seleciono a turma {string}', async function (turmaNome) {
  await browser.wait(EC.presenceOf(page.turmaSelect()), 10000);
  await page.turmaSelect().click();
  const option = page.turmaOption(turmaNome);
  await browser.wait(EC.presenceOf(option), 5000);
  await option.click();
  await wait(500);
});

Then('devo ver a turma {string} na lista de turmas', async function (turmaNome) {
  const option = page.turmaOption(turmaNome);
  await expect(option.isPresent()).to.eventually.equal(true);
});

Then('devo visualizar alunos listados na tabela', async function () {
  await browser.wait(async () => (await page.alunosTabela().count()) > 0, 10000);
  await expect(page.alunosTabela().count()).to.eventually.be.greaterThan(0);
});

Then('devo visualizar monitores cadastrados no popup', async function () {
  await page.abrirCadastroMonitores().click();
  await browser.wait(async () => (await page.monitoresPopupItems().count()) > 0, 10000);
  await expect(page.monitoresPopupItems().count()).to.eventually.be.greaterThan(0);
  if (await page.fecharPopup().isPresent()) {
    await page.fecharPopup().click();
  }
});
