const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

it("increments a counter", async () => {
  const driver = await appiumDriver;
  await reloadApp();

  let field, text, button;

  return; // TODO

  field = await driver.$("//*[@content-desc='card.text']");
  text = await field.getText();
  expect(text).toBe("counter: 0");

  button = await driver.$("//*[@content-desc='card.button']");
  await driver.touchAction({ action: "tap", element: button });
  await sleep(50);

  field = await driver.$("//*[@content-desc='card.text']");
  text = await field.getText();
  expect(text).toBe("counter: 1");

  button = await driver.$("//*[@content-desc='card.button']");
  await driver.touchAction({ action: "tap", element: button });
  await sleep(50);

  field = await driver.$("//*[@content-desc='card.text']");
  text = await field.getText();
  expect(text).toBe("counter: 2");
});
