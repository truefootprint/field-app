import addIssueNote from "../../app/workflows/add_issue_note";
import pushData from "../../app/workflows/push_data";
import uploadPhoto from "../../app/workflows/upload_photo";
import IssueNote from "../../app/models/issue_note";
import Image from "../../app/models/image";

jest.mock("../../app/workflows/push_data");
jest.mock("../../app/workflows/upload_photo");

describe("addIssueNote", () => {
  it("creates an issue note", async () => {
    await addIssueNote({ subjectType: "Project", subjectId: 123, text: "text", resolved: true });
    const issueNotes = await IssueNote.findAll();

    expect(issueNotes.length).toBe(1);

    expect(issueNotes[0].subjectType).toBe("Project");
    expect(issueNotes[0].subjectId).toBe(123);
    expect(issueNotes[0].text).toBe("text");
    expect(issueNotes[0].resolved).toBe(true);
    expect(issueNotes[0].pushed).toBe(false);
  });

  it("generates an issueUuid for new issues", async () => {
    await addIssueNote({ subjectType: "Project", subjectId: 123, text: "text" });
    const issueNote = await IssueNote.findOne();

    expect(issueNote.issueUuid.length).toBe(36);
  });

  it("re-uses the given issue's uuid when available", async () => {
    const issue = { uuid: "12300000-0000-0000-0000-000000000000" }

    await addIssueNote({ issue, subjectType: "Project", subjectId: 123, text: "text" });
    const issueNote = await IssueNote.findOne();

    expect(issueNote.issueUuid).toBe(issue.uuid);
  });

  it("calls the pushData workflow if there is a connection", async () => {
    await addIssueNote({ connected: false, subjectType: "Project", subjectId: 123, text: "text" });
    expect(pushData).not.toHaveBeenCalled();

    await addIssueNote({ connected: true, subjectType: "Project", subjectId: 123, text: "text" });
    expect(pushData).toHaveBeenCalled();
  });

  it("returns the issue note", async () => {
    const issueNote = await addIssueNote({
      subjectType: "Project",
      subjectId: 123,
      text: "text",
    });

    expect(issueNote.subjectId).toBe(123);
  });

  it("calls the callback with the issue note", async () => {
    const callback = jest.fn();
    const issueNote = await addIssueNote({
      subjectType: "Project",
      subjectId: 123,
      text: "text",
      callback
    });

    expect(callback).lastCalledWith(issueNote);
  });

  describe("when photos are provided", () => {
    const photos = [{ uri: "image.jpg" }];

    it("creates an image", async () => {
      await addIssueNote({ subjectType: "Project", subjectId: 123, photos });
      const images = await Image.findAll();

      expect(images.length).toBe(1);
      expect(images[0].filename).toBe("image.jpg");
    });

    it("sets photosJson on the record", async () => {
      await addIssueNote({ subjectType: "Project", subjectId: 123, photos });
      const issueNote = await IssueNote.findOne();

      expect(issueNote.photosJson).toBe(JSON.stringify(photos));
    });

    it("calls the uploadPhoto workflow when connected", async () => {
      await addIssueNote({ connected: true, subjectType: "Project", subjectId: 123, photos });

      const image = await Image.findOne();
      expect(uploadPhoto).lastCalledWith(image.id);
    });

    it("does not call the uploadPhoto workflow when note connected", async () => {
      await addIssueNote({ connected: false, subjectType: "Project", subjectId: 123, photos });

      expect(uploadPhoto).not.toHaveBeenCalled();
    });
  });
});
