it("increments a counter", async () => {
  return; // TODO

  const driver = await appiumDriver;
  await reloadApp();

  let field, text, button;

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
