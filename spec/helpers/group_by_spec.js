describe("groupBy", () => {
  it("groups elements according to the return value of the callback", () => {
    const objects = [
      { count: 2 },
      { count: 1 },
      { count: 3 },
    ];

    const result = groupBy(objects, o => o.count % 2 === 0)

    expect(result).toEqual({
      [true]: [{ count: 2 }],
      [false]: [{ count: 1 }, { count: 3 }],
    });
  });
});
