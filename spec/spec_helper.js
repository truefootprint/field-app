const Environment = require("jest-environment-node");
const remote = require("webdriverio").remote;

const appiumDriver = remote({
  logLevel: "warn",
  capabilities: {
    platformName: "android",
  },
});

class SpecHelper extends Environment {
  constructor(config){
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.appiumDriver = appiumDriver;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = SpecHelper;
