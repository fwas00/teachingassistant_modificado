const { $, element, by } = require('protractor');

module.exports = {
  nameInput: () => $("input[name='namebox'], input[name='nome'], input[placeholder='Nome']"),
  cpfInput: () => $("input[name='cpfbox'], input[name='cpf'], input[placeholder='CPF']"),
  addButton: () => element(by.buttonText('Adicionar')).isPresent().then(exists => exists ? element(by.buttonText('Adicionar')) : element(by.css('button[type="submit"]'))),
  alunosList: () => element.all(by.css('[name="alunolist"], li.aluno, table tbody tr')),
  alunosMenu: () => element(by.css("a[name='alunos'], a[href='/alunos'], a[href='#/alunos']"))
};
