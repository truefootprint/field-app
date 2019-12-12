import QuestionPresenter from "../../app/presenters/question_presenter";
import Question from "../../app/models/question";
import Topic from "../../app/models/topic";

describe("QuestionPresenter", () => {
  it("presents questions", async () => {
    const question = Question.build({ id: 123, text: "text", type: "free_text" });
    const presented = await QuestionPresenter.present(question);

    expect(presented).toMatchObject({ id: 123, text: "text", type: "free_text" });
  });

  it("includes the topic", async () => {
    const question = Question.build({ id: 123, text: "text", type: "free_text" });
    const topic = await Topic.create({ id: 456, name: "name" });

    await question.setTopic(topic);
    const presented = await QuestionPresenter.present(question);

    expect(presented).toMatchObject({ id: 123, topic: { id: 456, name: "name" } });
  });
});
