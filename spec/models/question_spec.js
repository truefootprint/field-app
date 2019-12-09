import Question from "../../app/models/question";

describe("Question", () => {
  it("can persist questions", async () => {
    await Question.create({ text: "Any comments" });
    const questions = await Question.findAll();

    expect(questions.length).toBe(1);
    expect(questions[0].text).toBe("Any comments");
  });
});
