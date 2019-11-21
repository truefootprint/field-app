it("works with appium", async () => {
  const driver = await appiumDriver;
  await reloadApp();

  const field = await driver.$("//android.widget.TextView");
  const text = await field.getText();

  expect(text).toBe("Open up App.js to start working on your app!");
});
