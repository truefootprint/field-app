import ResponsePresenter from "../../app/presenters/response_presenter";
import Response from "../../app/models/response";

describe("ResponsePresenter", () => {
  it("presents the response with fields that match the backend APIs", async () => {
    const response = await Response.create({ id: 1, questionId: 2, value: "answer" });
    const presented = await ResponsePresenter.presentElement(response);

    // This field is renamed to avoid confusion with backend ids.
    expect(presented.localId).toBe(1);

    // This field has a different name in the backend.
    expect(presented.questionId).toBeUndefined();
    expect(presented.projectQuestionId).toBe(2);

    expect(presented.value).toBe("answer");
    expect(presented.createdAt).toBeDefined();
    expect(presented.updatedAt).toBeDefined();
  });
});
