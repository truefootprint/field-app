import palette from "../../app/helpers/palette";

describe("palette", () => {
  it("has a list of names", () => {
    expect(palette.names).toEqual([
      "green", "blue", "yellow", "red", "purple", "black", "white", "grey"
    ]);
  });

  it("has a list of colors", () => {
    expect(palette.colors).toEqual([
      "green", "blue", "yellow", "red", "purple"
    ]);
  });

  it("can cycle between colors", () => {
    expect(palette.cycle(0)).toBe("green");
    expect(palette.cycle(1)).toBe("blue");
    expect(palette.cycle(2)).toBe("yellow");
    expect(palette.cycle(3)).toBe("red");
    expect(palette.cycle(4)).toBe("purple");

    expect(palette.cycle(5)).toBe("green");
    expect(palette.cycle(6)).toBe("blue");

    expect(palette.cycle(100)).toBe("green");
    expect(palette.cycle(101)).toBe("blue");
  });
});
