describe("minBy", () => {
  it("returns the minimum as per some callback", () => {
    const objects = [
      { count: 2 },
      { count: 1 },
      { count: 3 },
    ];

    const result = minBy(objects, o => o.count);
    expect(result.count).toBe(1);
  });
});

describe("maxBy", () => {
  it("returns the maximum as per some callback", () => {
    const objects = [
      { count: 2 },
      { count: 1 },
      { count: 3 },
    ];

    const result = maxBy(objects, o => o.count);
    expect(result.count).toBe(3);
  });
});
