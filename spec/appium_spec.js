import feature from "./helpers/feature";

feature("works with appium", async driver => {
  const field = await driver.$("//android.widget.TextView");
  const text = await field.getText();

  expect(text).toBe("Open up App.js to start working on your app!");
});
