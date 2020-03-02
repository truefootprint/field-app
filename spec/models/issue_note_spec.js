import IssueNote from "../../app/models/issue_note";

describe("IssueNote", () => {
  it("can persist issue notes", async () => {
    await IssueNote.create({ subjectType: "Question", subjectId: 123, text: "text" });
    const issueNotes = await IssueNote.findAll();

    expect(issueNotes.length).toBe(1);
    const note = issueNotes[0];

    expect(note.issueUuid.length).toBe(36);
    expect(note.subjectType).toBe("Question");
    expect(note.subjectId).toBe(123);
    expect(note.text).toBe("text");
    expect(note.pushed).toBe(false);
  });
});
