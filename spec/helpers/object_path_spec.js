describe("objectPath", () => {
  it("returns the path to the node being searched for", () => {
    const object = { foo: { bar: { baz: 123, qux: 456 } } };
    const path = objectPath(object, n => n === 123);

    expect(path).toEqual(["foo", "bar", "baz"]);
  });

  it("returns the first path only", () => {
    const object = { foo: 123, bar: 123, baz: 123 };
    const path = objectPath(object, n => n === 123);

    expect(path).toEqual(["foo"]);
  });

  it("works with arrays", () => {
    const object = { foo: [{ bar: [456, 123] }] };
    const path = objectPath(object, n => n === 123);

    expect(path).toEqual(["foo", "0", "bar", "1"]);
  });

  it("handles null/undefined cases", () => {
    const object = { a: undefined, b: null, c: [null] };
    const result = objectPath(object, o => false);

    expect(result).toBeUndefined();
  });

  it("handles dates", () => {
    const date = new Date();
    const result = objectPath({ date }, o => false);

    expect(result).toBeUndefined();
  });
});

describe("getAtPath", () => {
  it("gets the value at the object path", () => {
    const object = { foo: [{ bar: [456, 123] }] };
    const path = ["foo", "0", "bar", "1"];

    const result = getAtPath(object, path);
    expect(result).toBe(123);
  });
});
