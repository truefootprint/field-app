import IssueNotePresenter from "../../app/presenters/issue_note_presenter";
import IssueNote from "../../app/models/issue_note";

describe("IssueNotePresenter", () => {
  it("presents the issue note with fields that match the backend APIs", async () => {
    const photosJson = JSON.stringify([{ uri: "image.jpg" }]);
    const issueNote = await IssueNote.create({
      id: 1,
      issueUuid: await uuid(),
      subjectType: "Project",
      subjectId: 2,
      text: "text",
      photosJson,
      resolved: true,
    });

    const presented = await IssueNotePresenter.presentElement(issueNote);

    // This field is renamed to avoid confusion with backend ids.
    expect(presented.localId).toBe(1);

    expect(presented.subjectType).toBe("Project");
    expect(presented.subjectId).toBe(2);
    expect(presented.text).toBe("text");
    expect(presented.photosJson).toBe(photosJson);
    expect(presented.resolved).toBe(true);

    expect(presented.createdAt).toBeDefined();
    expect(presented.updatedAt).toBeDefined();
  });

  it("renames subject types to match the backend", async () => {
    const issueUuid = await uuid();
    const issueNote = await IssueNote.create({ issueUuid, subjectType: "Question", subjectId: 123 });
    const presented = await IssueNotePresenter.presentElement(issueNote);

    expect(presented.subjectType).toEqual("ProjectQuestion");
    expect(presented.subjectId).toEqual(123);
  });
});
