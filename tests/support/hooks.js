const path = require('path');
const { spawn } = require('child_process');
const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');

let serverModule;
let frontendProcess;

function registerTypeScript() {
  require('ts-node').register({
    transpileOnly: true,
    project: path.join(__dirname, '../../server/ta-server/tsconfig.json')
  });
}

async function ensureBackend() {
  if (!serverModule) {
    registerTypeScript();
    serverModule = require('../../server/ta-server/ta-server.ts');
  }
}

function startFrontend() {
  if (frontendProcess) return;
  frontendProcess = spawn('npm', ['run', 'start', '--', '--host', '0.0.0.0', '--port', '4250'], {
    cwd: path.join(__dirname, '../../gui/ta-gui'),
    stdio: 'inherit',
    shell: false
  });
}

async function resetData() {
  registerTypeScript();
  const { resetStore } = require('../../server/ta-server/data/store');
  resetStore();
}

BeforeAll(async function() {
  await ensureBackend();
  startFrontend();
});

Before({ tags: 'not @api' }, async function() {
  await ensureBackend();
  await resetData();
  await this.launchBrowser();
  await this.page.goto(this.uiBase);
});

Before({ tags: '@api' }, async function() {
  await ensureBackend();
  await resetData();
});

After(async function() {
  await this.closeBrowser();
});

AfterAll(async function() {
  if (serverModule && serverModule.closeServer) {
    serverModule.closeServer();
  }
  if (frontendProcess) {
    frontendProcess.kill('SIGTERM');
  }
  await this.shutdown();
});
