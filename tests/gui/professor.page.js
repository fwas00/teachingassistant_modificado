class ProfessorDashboardPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async openLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginProfessor(email = 'ana@cin.ufpe.br', senha = '123456') {
    const inputs = this.page.locator('section.login .card input');
    await inputs.nth(0).fill(email);
    await inputs.nth(1).fill(senha);
    await this.page.getByRole('button', { name: 'Entrar' }).click();
    await this.page.waitForSelector('text=Bem-vindo');
  }

  async waitForDashboard() {
    await this.page.waitForSelector('app-professor-dashboard');
  }

  async turmas() {
    return this.page.locator('select option:not([disabled])').allTextContents();
  }

  async selecionarTurma(index = 1) {
    const select = this.page.locator('select');
    await select.selectOption({ index });
    await this.page.waitForSelector('section.lista-alunos table tbody tr');
  }

  async alunosVisiveis() {
    return this.page.locator('section.lista-alunos tbody tr td:first-child').allTextContents();
  }

  async abrirNotificacoes() {
    await this.page.getByRole('button', { name: 'Enviar Notificações' }).click();
    await this.page.waitForSelector('.notificacoes-popup');
  }

  async notificacoesResumo() {
    return this.page.locator('.notificacoes-popup ul li').allTextContents();
  }

  async abrirCadastroMonitor() {
    await this.page.getByRole('button', { name: 'Cadastrar Monitores' }).click();
    await this.page.waitForSelector('.popup-overlay .popup h3', { state: 'visible' });
  }

  async cadastrarMonitor(nome, matricula) {
    const popup = this.page.locator('.popup-overlay .popup');
    const inputs = popup.locator('input');
    await inputs.nth(0).fill(nome);
    await inputs.nth(1).fill(matricula);
    await popup.getByRole('button', { name: 'Salvar' }).click();
  }

  async verMensagens() {
    return this.page.locator('.feedback .alert').allTextContents();
  }

  async importarTurma(nome) {
    // Interface não possui upload real, então simulamos importação registrando via API mock da página
    await this.page.evaluate(turmaNome => {
      const windowAny = window;
      if (!windowAny.fakeTurmas) {
        windowAny.fakeTurmas = [];
      }
      windowAny.fakeTurmas.push({ id: `import-${Date.now()}`, nome: turmaNome });
    }, nome);
    await this.page.waitForTimeout(200);
  }
}

module.exports = { ProfessorDashboardPage };
