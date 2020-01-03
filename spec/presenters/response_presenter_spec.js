import ResponsePresenter from "../../app/presenters/response_presenter";
import Response from "../../app/models/response";

describe("ResponsePresenter", () => {
  it("presents the response with fields that match the backend APIs", async () => {
    const response = await Response.create({ questionId: 1, value: "answer" });
    const presented = await ResponsePresenter.presentElement(response);

    expect(presented.projectQuestionId).toBe(1);
    expect(presented.value).toBe("answer");

    expect(presented.createdAt).toBeDefined();
    expect(presented.updatedAt).toBeDefined();

    // These fields are app-specific and are ignored by the backend.
    expect(presented.id).toBeUndefined();
    expect(presented.questionId).toBeUndefined();
  });
});
