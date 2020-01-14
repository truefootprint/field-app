import Response from "../../app/models/response";

describe("Response", () => {
  it("can persist responses", async () => {
    await Response.create({ questionId: 123, value: "my answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(123);
    expect(responses[0].value).toBe("my answer");
    expect(responses[0].pushed).toBe(false);
  });
});
