Feature: Dashboard do Professor
  Para garantir a visibilidade das turmas e listas
  Como professor
  Quero acessar o dashboard e visualizar minhas turmas, alunos e monitores

  Scenario: Visualizar dados iniciais da turma
    Given que estou no dashboard do professor
    And faço login como professor padrão
    When seleciono a turma "Engenharia de Software"
    Then devo ver a turma "Engenharia de Software" na lista de turmas
    And devo visualizar alunos listados na tabela
    And devo visualizar monitores cadastrados no popup
