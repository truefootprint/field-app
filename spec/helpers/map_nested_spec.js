describe("mapNested", () => {
  it("maps over a nested object/array", () => {
    const object = { some: { nested: [{ object: 123 }] } };

    const expected = { some: { nested: [{ object: 246 }] } };
    const actual = mapNested(object, o => typeof o === "number" ? o * 2 : o);

    expect(actual).toEqual(expected);
  });

  it("handles null/undefined cases", () => {
    const object = { a: undefined, b: null, c: [null] };
    const result = mapNested(object, o => o);

    expect(result).toEqual(object);
  });

  it("handles dates", () => {
    const date = new Date();
    const result = mapNested({ date }, o => o);

    expect(result).toEqual({ date });
  });
});
