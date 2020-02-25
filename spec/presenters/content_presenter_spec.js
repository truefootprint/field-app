import ContentPresenter from "../../app/presenters/content_presenter";
import Content from "../../app/models/content";

describe("ContentPresenter", () => {
  it("presents the content with fields that match the backend APIs", async () => {
    const photosJson = JSON.stringify([{ uri: "image.jpg" }]);
    const content = await Content.create({
      id: 1,
      subjectType: "Issue",
      subjectId: 2,
      text: "text",
      photosJson,
      parentId: 3,
    });

    const presented = await ContentPresenter.presentElement(content);

    // This field is renamed to avoid confusion with backend ids.
    expect(presented.localId).toBe(1);

    expect(presented.subjectType).toBe("Issue");
    expect(presented.subjectId).toBe(2);
    expect(presented.text).toBe("text");
    expect(presented.photosJson).toBe(photosJson);
    expect(presented.parentId).toBe(3);

    expect(presented.createdAt).toBeDefined();
    expect(presented.updatedAt).toBeDefined();
  });

  it("parses subjectType into an array and renames Question -> ProjectQuestion", async () => {
    const content = await Content.create({
      subjectType: "Question,Issue",
      subjectId: 123,
      text: "text",
    });

    const presented = await ContentPresenter.presentElement(content);

    expect(presented.subjectType).toEqual(["ProjectQuestion", "Issue"]);
    expect(presented.subjectId).toEqual(123);
  });
});
