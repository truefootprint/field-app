import chunk from "../../app/helpers/chunk";

describe("chunk", () => {
  it("works the same as Ruby's chunk method", () => {
    const array = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const chunks = chunk(array, (n) => n % 2 === 0);

    expect(chunks).toEqual([
      [false, [3, 1]],
      [true, [4]],
      [false, [1, 5, 9]],
      [true, [2, 6]],
      [false, [5, 3, 5]],
    ]);
  });
});
