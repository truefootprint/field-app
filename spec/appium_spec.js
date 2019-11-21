const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

it("works with appium", async () => {
  const driver = await appiumDriver;
  await reloadApp();

  let field, text, button;

  field = await driver.$("//android.widget.TextView");
  text = await field.getText();
  expect(text).toBe("Home Screen");

  button = await driver.$("//android.widget.Button");
  await driver.touchAction({ action: "tap", element: button });
  await sleep(500);

  field = await driver.$("//android.widget.TextView");
  text = await field.getText();
  expect(text).toBe("Another Screen");

  button = await driver.$("//android.widget.Button");
  await driver.touchAction({ action: "tap", element: button });
  await sleep(500);

  field = await driver.$("//android.widget.TextView");
  text = await field.getText();
  expect(text).toBe("Home Screen");
});
