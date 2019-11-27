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

  it("has a white circle", () => {
    const checkbox = render(<Radio />);
    const circle = checkbox.getByTestId("circle");

    expect(style(circle).backgroundColor).toBe("white");
  });

  it("makes the circle black when checked", () => {
    const radio = render(<Radio checked />);
    const circle = radio.getByTestId("circle");

    expect(style(circle).backgroundColor).toBe(palette.black.primary);
  });
});
