const { $, element, by } = require('protractor');

module.exports = {
  loginTipoSelect: () => $('section.login select'),
  loginTipoOption: label => element(by.cssContainingText('section.login option', label)),
  loginIdentificadorInput: () => $('section.login input:not([type="password"])'),
  loginSenhaInput: () => $('section.login input[type="password"]'),
  loginButton: () => element(by.buttonText('Entrar')),
  welcomeHeader: () => element(by.cssContainingText('h1', 'Bem-vindo')),
  turmaSelect: () => $('section.painel select'),
  turmaOption: nome => element(by.cssContainingText('section.painel option', nome)),
  alunosTabela: () => element.all(by.css('.lista-alunos tbody tr')),
  abrirCadastroMonitores: () => element(by.buttonText('Cadastrar Monitores')),
  monitoresPopupItems: () => element.all(by.css('.popup ul li')),
  fecharPopup: () => element(by.cssContainingText('.popup-actions button', 'Fechar'))
};
