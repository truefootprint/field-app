import combineData from "../../app/helpers/combine_data";

describe("combineData", () => {
  it("combines myData with additional responses from the user", () => {
    const myData = { questionId: 123, responses: [] };
    const responses = [{ questionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ questionId: 123, responses });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { questionId: 123, responses: [] } }] } };
    const responses = [{ questionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ a: { b: [{ c: { questionId: 123, responses } }] } });
  });
});
