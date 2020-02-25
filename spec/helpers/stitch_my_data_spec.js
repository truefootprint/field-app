import stitchMyData from "../../app/helpers/stitch_my_data";

describe("stitchMyData", () => {
  it("combines myData with additional responses from the user", () => {
    const myData = { id: 123, responses: [] };
    const responses = [{ projectQuestionId: 123, value: "answer" }];
    const contents = [];

    const result = stitchMyData(myData, responses, contents);
    expect(result).toEqual({ id: 123, responses });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { id: 123, responses: [] } }] } };
    const responses = [{ projectQuestionId: 123, value: "answer" }];
    const contents = [];

    const result = stitchMyData(myData, responses, contents);
    expect(result).toEqual({ a: { b: [{ c: { id: 123, responses } }] } });
  });

  // TODO:
  //    - override versionedContent for Issue if newer in database
  //    - override versionedContent for Resolution if newer in database
  //    - add to issues if composite ["...", "Issue"] key in database
  //    - add to resolutions if composite ["...", "Resolution"] key in database
});
