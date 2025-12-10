Feature: Operações no Dashboard do Professor
  Para acompanhar e coordenar minhas turmas
  Como professor autenticado
  Quero utilizar as ações disponíveis no painel

  Background:
    Given que estou logado como professor

  @gui
  Scenario: Listar turmas do professor
    When acesso o dashboard do professor
    Then devo visualizar minha lista de turmas

  @gui
  Scenario: Acessar uma turma específica
    When seleciono uma turma
    Then devo ver os alunos daquela turma

  @gui
  Scenario: Importar nova turma
    When importo um arquivo de turma válido
    Then a nova turma deve aparecer na lista

  @gui
  Scenario: Alocar monitor a aluno
    When aloco um monitor para um aluno
    Then a alocação deve ser salva com sucesso

  @gui
  Scenario: Visualizar notificações do professor
    When abro a área de notificações
    Then devo visualizar minhas notificações
