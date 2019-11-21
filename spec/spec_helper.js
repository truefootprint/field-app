const Environment = require("jest-environment-node");
const appium = require("./helpers/appium");

class SpecHelper extends Environment {
  constructor(config){
    super(config);
  }

  async setup() {
    await super.setup();

    this.global.appiumDriver = appium.driver;
    this.global.reloadApp = appium.reloadApp;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = SpecHelper;
