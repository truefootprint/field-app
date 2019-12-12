import Activity from "../../app/models/activity";

describe("Activity", () => {
  it("can persist activities", async () => {
    await Activity.create({ name: "Clear the land" });
    const activities = await Activity.findAll();

    expect(activities.length).toBe(1);
    expect(activities[0].name).toBe("Clear the land");
  });
});
