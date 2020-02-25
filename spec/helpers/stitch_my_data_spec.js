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

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { id: 123, responses: [], issues: [] } }] } };
    const responses = [{ projectQuestionId: 123, value: "answer" }];
    const result = stitchMyData(myData, responses, []);

    expect(result).toEqual({ a: { b: [{ c: { id: 123, responses, issues: [] } }] } });
  });

  it("overrides versionedContent for issues with content from the user", () => {
    const myData = { issues: [{ id: 1, versionedContent: { text: "text" }}] };
    const contents = [{ subjectType: "Issue", subjectId: 1, text: "new text" }];
    const result = stitchMyData(myData, [], contents);

    expect(result).toEqual({ issues: [{
      id: 1,
      versionedContent: {
        subjectType: "Issue",
        subjectId: 1,
        text: "new text",
      }
    }]});
  });

  it("overrides versionedContent for resolutions with content from the user", () => {
    const myData = { resolutions: [{ id: 1, issueId: 2, versionedContent: { text: "text" }}] };
    const contents = [{ subjectType: "Resolution", subjectId: 1, text: "new text" }];
    const result = stitchMyData(myData, [], contents);

    expect(result).toEqual({ resolutions: [{
      id: 1,
      issueId: 2,
      versionedContent: {
        subjectType: "Resolution",
        subjectId: 1,
        text: "new text",
      }
    }]});
  });

  it("does not override versionedContent if the user's content is older", () => {
    const myData = { issues: [{ id: 1, versionedContent: { text: "text", createdAt: now }}] };
    const contents = [{ subjectType: "Issue", subjectId: 1, text: "new text", createdAt: hourAgo }];
    const result = stitchMyData(myData, [], contents);

    expect(result).toEqual({ issues: [{
      id: 1,
      versionedContent: {
        text: "text", // has not updated
        createdAt: now,
      }
    }]});
  });

  it("combines myData with additional issues from the user", () => {
    const myData = { id: 1, responses: [], issues: [] };
    const contents = [{
      subjectType: ["ProjectQuestion", "Issue"],
      subjectId: 1,
      text: "text",
      createdAt: hourAgo,
      updatedAt: now,
    }];

    const result = stitchMyData(myData, [], contents);

    expect(result).toEqual({
      id: 1,
      responses: [],
      issues: [{
        subjectType: "ProjectQuestion",
        subjectId: 1,
        resolutions: [],
        createdAt: hourAgo,
        updatedAt: now,
        versionedContent: {
          subjectType: "Issue",
          subjectId: null, // The issue is not saved in the backend yet.
          text: "text",
          createdAt: hourAgo,
          updatedAt: now,
        },
      }],
    });
  });

  it("combines myData with additional resolutions from the user", () => {
    const myData = { id: 1, responses: [], issues: [{ id: 2, resolutions: [] }] };
    const contents = [{
      subjectType: ["Issue", "Resolution"],
      subjectId: 2,
      text: "text",
      createdAt: hourAgo,
      updatedAt: now,
    }];

    const result = stitchMyData(myData, [], contents);

    expect(result).toEqual({
      id: 1,
      responses: [],
      issues: [{
        id: 2,
        resolutions: [{
          issueId: 2,
          createdAt: hourAgo,
          updatedAt: now,
          versionedContent: {
            subjectType: "Resolution",
            subjectId: null, // The resolution is not saved in the backend yet.
            text: "text",
            createdAt: hourAgo,
            updatedAt: now,
          },
        }],
      }],
    });
  });

  // TODO: how to create resolutions for issues that are not persisted?
});
