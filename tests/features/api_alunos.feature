Feature: API de Alunos
  Para garantir a integridade dos dados de alunos
  Como testador
  Eu quero validar as operações de serviço

  Scenario: Listar alunos via GET
    Given não existe aluno com CPF "900"
    And eu cadastro via serviço o aluno "Teste API" com CPF "900"
    When eu faço uma requisição GET para "/alunos"
    Then a resposta deve ter status 200
    And o corpo deve conter o aluno com CPF "900"

  Scenario: Cadastrar aluno via POST
    Given não existe aluno com CPF "901"
    When eu faço uma requisição POST para "/alunos" com nome "Aluno Serviço" e CPF "901"
    Then a resposta deve ter status 201
    And o corpo deve conter sucesso verdadeiro
    And o corpo deve conter o aluno com CPF "901"

  Scenario: Remover aluno via DELETE
    Given não existe aluno com CPF "902"
    And eu cadastro via serviço o aluno "Remover" com CPF "902"
    When eu faço uma requisição DELETE para "/alunos/902"
    Then a resposta deve ter status 200
    And o corpo não deve conter o aluno com CPF "902"
