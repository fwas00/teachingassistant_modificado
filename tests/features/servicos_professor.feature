Feature: Serviços REST do Professor
  Para automatizar fluxos acadêmicos
  Como consumidor das APIs do professor
  Quero garantir que os serviços retornem dados consistentes

  Background:
    Given o estado do sistema é reiniciado

  @api
  Scenario: Autenticar professor
    When realizo POST para "/auth/login" com credenciais do professor
    Then o serviço deve responder com sucesso e dados do professor

  @api
  Scenario: Listar turmas do professor
    When faço GET em "/turmas?professorId=prof-1"
    Then devo receber as turmas do professor

  @api
  Scenario: Listar alunos de uma turma
    When faço GET em "/turmas/turma-1/alunos"
    Then devo receber a lista de alunos da turma

  @api
  Scenario: Importar turma
    When faço POST em "/turmas/importar" com dados válidos
    Then a turma deve ser criada e listada para o professor

  @api
  Scenario: Alocar monitor
    When faço POST em "/turmas/turma-1/monitores" para cadastrar um monitor
    Then o monitor deve ser retornado e persistido

  @api
  Scenario: Enviar notificações
    When faço POST em "/turmas/turma-1/notificacoes"
    Then devo receber resumo de notificações enviadas

  @api
  Scenario: Revalidar alocações
    When faço GET em "/turmas/turma-1/revalidar"
    Then devo receber o resultado da revalidação

  @api
  Scenario: Realocar alunos
    When faço POST em "/turmas/turma-1/realocacao" com limite máximo 2
    Then devo receber a confirmação da realocação
