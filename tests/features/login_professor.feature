Feature: Login do Professor
  Como professor
  Quero acessar o dashboard
  Para gerenciar minhas turmas e monitores

  @gui
  Scenario: Login válido do professor
    Given que estou na tela de login do professor
    When informo credenciais válidas
    Then devo ser redirecionado para o dashboard do professor
