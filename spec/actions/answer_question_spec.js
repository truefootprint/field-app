import answerQuestion from "../../app/actions/answer_question";
import Response from "../../app/models/response";
import SubmissionPeriod from "../../app/helpers/submission_period";

describe("answerQuestion", () => {
  it("creates a response", async () => {
    await answerQuestion({ question: { id: 123 }, answer: "answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(123);
    expect(responses[0].value).toBe("answer");
  });

  it("updates the response if it already exists", async () => {
    await Response.create({ questionId: 123, value: "answer" });

    await answerQuestion({ question: { id: 123 }, answer: "updated answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(1);

    expect(responses[0].questionId).toBe(123);
    expect(responses[0].value).toBe("updated answer");
  });

  it("does not update responses from previous submission periods", async () => {
    const yesterday = SubmissionPeriod.startedAt() - 1000;
    await Response.create({
      questionId: 123,
      value: "yesterday's answer",
      createdAt: yesterday,
    });

    await answerQuestion({ question: { id: 123 }, answer: "today's answer" });
    const responses = await Response.findAll();

    expect(responses.length).toBe(2);

    expect(responses[0].value).toBe("yesterday's answer");
    expect(responses[1].value).toBe("today's answer");
  });

  it("returns the response", async () => {
    const response = await answerQuestion({
      question: { id: 123 },
      answer: "answer"
    });

    expect(response.questionId).toBe(123);
  });

  it("calls the callback with the response", async () => {
    const callback = jest.fn();
    const response = await answerQuestion({
      question: { id: 123 },
      answer: "answer",
      callback
    });

    expect(callback).lastCalledWith(response);
  });
});
