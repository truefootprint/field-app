const Environment = require("jest-environment-node");
const remote = require("webdriverio").remote;
const execSync = require("child_process").execSync;

const appiumDriver = remote({
  logLevel: "warn",
  capabilities: {
    platformName: "android",
  },
});

const reloadApp = async () => {
  execSync("./bin/reload");

  const driver = await appiumDriver;
  const root = await driver.$("//*[@content-desc='root']/*");

  await root.isDisplayed();
};

class SpecHelper extends Environment {
  constructor(config){
    super(config);
  }

  async setup() {
    await super.setup();

    this.global.appiumDriver = appiumDriver;
    this.global.reloadApp = reloadApp;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = SpecHelper;
