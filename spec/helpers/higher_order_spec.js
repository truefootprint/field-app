describe("higherOrder", () => {
  it("returns a wrapping function that calls the original with combined options", () => {
    const callback = (options) => options;

    const wrapper = HOF(callback, { foo: 123 });
    const result = wrapper({ bar: 456 });

    expect(result).toEqual({ foo: 123, bar: 456 });
  })
});
