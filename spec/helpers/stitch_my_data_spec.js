import stitchMyData from "../../app/helpers/stitch_my_data";

describe("stitchMyData", () => {
  const now = new Date();
  const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  it("combines myData with additional responses from the user", () => {
    const myData = { id: 1, responses: [], issues: [] };
    const responses = [{ projectQuestionId: 1, value: "answer" }];
    const result = stitchMyData(myData, responses, []);

    expect(result).toEqual({ id: 1, responses, issues: [] });
  });

  it("combines myData with additional issue notes from the user", () => {
    const myData = { uuid: "some-uuid", resolved: false, notes: [] };
    const notes = [{ issueUuid: "some-uuid", text: "text" }];
    const result = stitchMyData(myData, [], notes);

    expect(result).toEqual({ uuid: "some-uuid", resolved: false, notes });
  });

  it("combines myData with additional issues from the user", () => {
    const myData = { id: 1, responses: [], issues: [] };
    const notes = [{
      issueUuid: "some-uuid",
      subjectType: "ProjectQuestion",
      subjectId: 1,
      text: "text",
      resolved: true,
      createdAt: hourAgo,
      updatedAt: now,
    }];

    const result = stitchMyData(myData, [], notes);

    expect(result).toEqual({
      id: 1,
      responses: [],
      issues: [{
        uuid: "some-uuid",
        subjectType: "ProjectQuestion",
        subjectId: 1,
        resolved: true,
        createdAt: hourAgo,
        updatedAt: now,
        notes: [{
          issueUuid: "some-uuid",
          text: "text",
          resolved: true,
          createdAt: hourAgo,
          updatedAt: now,

          // These fields are superfluous, they don't come from the backend but
          // don't cause harm being on the issue note as well as the issue.
          subjectType: "ProjectQuestion",
          subjectId: 1,
        }],
      }]
    });
  });

  it("sets existing issues to resolved if a note is added that is resolved", () => {
    const myData = { uuid: "some-uuid", resolved: false, notes: [] };
    const notes = [{ issueUuid: "some-uuid", resolved: true }];
    const result = stitchMyData(myData, [], notes);

    expect(result).toEqual({ uuid: "some-uuid", resolved: true, notes });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { id: 123, responses: [], issues: [] } }] } };
    const responses = [{ projectQuestionId: 123, value: "answer" }];
    const result = stitchMyData(myData, responses, []);

    expect(result).toEqual({ a: { b: [{ c: { id: 123, responses, issues: [] } }] } });
  });
});
