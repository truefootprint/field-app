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
});
