const { BeforeAll, AfterAll, Before, setDefaultTimeout } = require('cucumber');
const { resetTestState, defaultBaseUrl } = require('./api');
const { browser } = require('protractor');
const { spawn } = require('child_process');

setDefaultTimeout(60 * 1000);

let serverProcess;

async function waitForServerReady(url) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return true;
      }
    } catch (_) {
      // ignore
    }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Servidor não respondeu a tempo.');
}

BeforeAll(async function () {
  try {
    await waitForServerReady(defaultBaseUrl);
    return;
  } catch (_) {
    // tentará subir servidor
  }

  serverProcess = spawn('npm', ['run', 'start', '--prefix', 'server/ta-server'], {
    stdio: 'inherit',
    shell: true
  });

  await waitForServerReady(defaultBaseUrl);
});

Before(async function () {
  await resetTestState();
  await browser.waitForAngularEnabled(false);
});

AfterAll(async function () {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
});
