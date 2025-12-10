Feature: Cadastro de Aluno

  Scenario: Cadastrar aluno com CPF inexistente
    Given que estou na página de alunos
    And não existe aluno com CPF "683"
    When eu cadastro o aluno "Paulo" com CPF "683"
    Then o aluno "Paulo" deve aparecer na lista
    And o sistema deve retornar sucesso
