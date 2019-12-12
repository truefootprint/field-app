import Topic from "../../app/models/topic";

describe("Topic", () => {
  it("can persist topics", async () => {
    await Topic.create({ name: "Cement" });
    const topics = await Topic.findAll();

    expect(topics.length).toBe(1);
    expect(topics[0].name).toBe("Cement");
  });
});
