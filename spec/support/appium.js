const Environment = require("jest-environment-node");
const remote = require("webdriverio").remote;
const execSync = require("child_process").execSync;

const appiumDriver = remote({
  logLevel: "warn",
  capabilities: {
    platformName: "android",
    automationName: "UiAutomator2",
    newCommandTimeout: 2000000,
  },
});

const reloadApp = async () => {
  execSync("./bin/shake_device");

  const driver = await appiumDriver;
  await driver.setImplicitTimeout(60000);

  const reload = await driver.$("//*[@text='Reload']");
  await driver.touchAction({ action: "tap", element: reload });

  const inner = await driver.$("//*[@content-desc='root']/*");
  await inner.isDisplayed();
};

class AppiumEnvironment extends Environment {
  constructor(config) { super(config); }
  async teardown() { await super.teardown(); }
  runScript(script) { return super.runScript(script); }

  async setup() {
    await super.setup();

    this.global.appiumDriver = appiumDriver;
    this.global.reloadApp = reloadApp;
  }
}

module.exports = AppiumEnvironment;
