import ActivityPresenter from "../../app/presenters/activity_presenter";
import Activity from "../../app/models/activity";
import Question from "../../app/models/question";

describe("ActivityPresenter", () => {
  it("presents activities", async () => {
    const activity = Activity.build({ id: 123, name: "name" });
    const presented = await ActivityPresenter.present(activity);

    expect(presented).toMatchObject({ id: 123, name: "name" });
  });

  it("includes questions", async () => {
    const activity = await Activity.create({ id: 123, name: "name" });
    const question = await Question.create({ id: 456, text: "text" });

    await activity.addQuestion(question);
    const presented = await ActivityPresenter.present(activity);

    expect(presented).toMatchObject({
      id: 123,
      name: "name",
      questions: [
        { id: 456, text: "text" },
      ]
    });
  });
});
