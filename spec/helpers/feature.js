import { remote } from "webdriverio";

const options = {
  logLevel: "warn",
  capabilities: {
    platformName: "android"
  }
};

const feature = (description, testCase) => (
  it(description, async () => {
    const driver = await remote(options);

    await testCase(driver);
    await driver.deleteSession();
  })
);

export default feature;
