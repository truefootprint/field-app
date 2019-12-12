import Project from "../../app/models/activity";

describe("Project", () => {
  it("can persist projects", async () => {
    await Project.create({ name: "Install a water pump" });
    const projects = await Project.findAll();

    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe("Install a water pump");
  });
});
