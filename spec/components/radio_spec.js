import Radio from "../../app/components/radio";

describe("<Radio />", () => {
  it("renders", () => {
    render(<Radio />);
  });

  it("applies the theme", () => {
    const radio = render(<Radio color="green" />);
    const text = radio.getByTestId("text");
    const buttonLike = radio.getByTestId("button_like");
    const expected = palette.green.primary;

    expect(style(text).color).toBe(expected);
    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("sets the text", () => {
    const radio = render(<Radio>Yes</Radio>);
    const text = radio.getByTestId("text");

    expect(text).toHaveText("Yes");
  });

  it("has a white circle", () => {
    const radio = render(<Radio />);
    const circle = radio.getByTestId("circle");

    expect(style(circle).backgroundColor).toBe("white");
  });

  describe("when checked", () => {
    const radio = render(<Radio defaultChecked>Yes</Radio>);

    it("makes the text white", () => {
      const text = radio.getByTestId("text");
      expect(style(text).color).toBe("white");
    });

    it("makes the circle black", () => {
      const circle = radio.getByTestId("circle");
      expect(style(circle).backgroundColor).toBe(palette.black.primary);
    });
  });
});
