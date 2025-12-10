Feature: Serviços do Professor
  Para garantir o funcionamento dos serviços do painel
  Como consumidor da API
  Quero validar autenticação e listagens de turmas, alunos e monitores

  Scenario: Login do professor
    Given que possuo credenciais válidas de professor
    When eu faço login como professor
    Then a resposta deve ter status 200
    And o corpo deve conter sucesso verdadeiro
    And o corpo deve conter o professor com email "ana@cin.ufpe.br"

  Scenario: Listar turmas do professor
    When eu faço uma requisição GET para "/turmas?professorId=prof-1"
    Then a resposta deve ter status 200
    And o corpo deve conter a turma "Engenharia de Software"

  Scenario: Listar alunos e monitores da turma
    When eu faço uma requisição GET para "/turmas/turma-1/alunos"
    Then a resposta deve ter status 200
    And o corpo deve conter o aluno com matrícula "202301"
    When eu faço uma requisição GET para "/turmas/turma-1/monitores"
    Then a resposta deve ter status 200
    And o corpo deve conter o monitor com matrícula "M202301"
