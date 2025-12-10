const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const axios = require('axios');
const path = require('path');

const UI_BASE_URL = process.env.UI_BASE_URL || 'http://localhost:4250/gui/ta-gui';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

setDefaultTimeout(120 * 1000);

class TestWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.api = axios.create({ baseURL: API_BASE_URL, validateStatus: () => true });
    this.state = {};
  }

  async launchBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
    }
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    return this.page;
  }

  async closeBrowser() {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
  }

  async shutdown() {
    await this.closeBrowser();
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  get uiBase() {
    return UI_BASE_URL;
  }

  get apiBase() {
    return API_BASE_URL;
  }
}

setWorldConstructor(TestWorld);
