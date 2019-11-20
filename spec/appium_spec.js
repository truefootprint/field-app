import { remote } from "webdriverio";

it("works with appium", async () => {
  const client = await remote({
    logLevel: "warn",
    capabilities: {
      platformName: "android"
    }
  });

  const field = await client.$("//android.widget.TextView");
  const text = await field.getText();

  expect(text).toBe("Open up App.js to start working on your app!");

  await client.deleteSession();
});
