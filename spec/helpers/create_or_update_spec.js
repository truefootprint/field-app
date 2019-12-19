import Response from "../../app/models/response";

describe("createOrUpdate", () => {
  it("creates a record if it doesn't exist", async () => {
    await createOrUpdate(Response, {
      where: { questionId: 123 },
      attributes: { questionId: 456, value: "answer" },
    });

    const responses = await Response.findAll();
    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(456);
    expect(responses[0].value).toBe("answer");
  });

  it("updates a record if it exists", async () => {
    await Response.create({ questionId: 123, value: "old answer" });

    await createOrUpdate(Response, {
      where: { questionId: 123 },
      attributes: { questionId: 456, value: "new answer" },
    });

    const responses = await Response.findAll();
    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(456);
    expect(responses[0].value).toBe("new answer");
  });

  it("only updates the first record it finds", async () => {
    await Response.create({ questionId: 123, value: "first" });
    await Response.create({ questionId: 123, value: "second" });

    await createOrUpdate(Response, {
      where: { questionId: 123 },
      attributes: { questionId: 456, value: "new answer" },
    });

    const responses = await Response.findAll();
    expect(responses.length).toBe(2);

    expect(responses[0].value).toBe("new answer");
    expect(responses[1].value).toBe("second");
  });
});
