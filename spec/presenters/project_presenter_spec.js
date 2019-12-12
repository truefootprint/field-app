import ProjectPresenter from "../../app/presenters/project_presenter";
import Project from "../../app/models/project";
import Activity from "../../app/models/activity";

describe("ProjectPresenter", () => {
  it("presents projects", async () => {
    const project = Project.build({ id: 123, name: "name" });
    const presented = await ProjectPresenter.present(project);

    expect(presented).toMatchObject({ id: 123, name: "name" });
  });

  it("includes activities", async () => {
    const project = await Project.create({ id: 123, name: "project name" });
    const activity = await Activity.create({ id: 456, name: "activity name" });

    await project.addActivity(activity);
    const presented = await ProjectPresenter.present(project);

    expect(presented).toMatchObject({
      id: 123,
      name: "project name",
      activities: [
        { id: 456, name: "activity name" },
      ]
    });
  });
});
