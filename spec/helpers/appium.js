const remote = require("webdriverio").remote;
const execSync = require("child_process").execSync;

module.exports.driver = remote({
  logLevel: "warn",
  capabilities: {
    platformName: "android",
  },
});

module.exports.reloadApp = async () => {
  execSync("./bin/shake_device");

  const driver = await module.exports.driver;
  await driver.setImplicitTimeout(60000);

  const reload = await driver.$("//*[@text='Reload']");
  await driver.touchAction({ action: "tap", element: reload });

  const inner = await driver.$("//*[@content-desc='root']/*");
  await inner.isDisplayed();
};
