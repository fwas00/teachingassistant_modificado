const { Given, When, Then } = require('cucumber');
const { browser, ExpectedConditions: EC } = require('protractor');
const { ensureAlunoRemoved, apiPost, defaultBaseUrl } = require('../support/api');
const page = require('../gui/alunos.page');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

Given('que estou na página de alunos', async function () {
  await browser.get(defaultBaseUrl);
  await browser.wait(EC.presenceOf(page.alunosMenu()), 10000).catch(() => Promise.resolve());
  if (await page.alunosMenu().isPresent()) {
    await page.alunosMenu().click();
  }
});

Given('não existe aluno com CPF {string}', async function (cpf) {
  await ensureAlunoRemoved(cpf);
});

When('eu cadastro o aluno {string} com CPF {string}', async function (nome, cpf) {
  const nameInput = page.nameInput();
  const cpfInput = page.cpfInput();
  await browser.wait(EC.presenceOf(nameInput), 10000);
  await nameInput.clear();
  await nameInput.sendKeys(nome);
  await cpfInput.clear();
  await cpfInput.sendKeys(cpf);
  const button = await page.addButton();
  await button.click();
  await wait(500);
});

Then('o aluno {string} deve aparecer na lista', async function (nome) {
  const alunos = page.alunosList();
  await browser.wait(async () => (await alunos.count()) > 0, 10000);
  const match = await alunos.filter(async elem => {
    const text = (await elem.getText()).toLowerCase();
    return text.includes(nome.toLowerCase());
  });
  await expect(match.count()).to.eventually.be.greaterThan(0);
});

Then('o sistema deve retornar sucesso', async function () {
  const successToast = element(by.css('.toast-success, .alert-success'));
  const hasSuccess = await successToast.isPresent();
  if (hasSuccess) {
    await expect(successToast.isDisplayed()).to.eventually.equal(true);
    return;
  }
  const response = await apiPost('/alunos/validar', {});
  expect(response.response.status).to.be.within(200, 299);
});
