import ButtonLike from "../../app/components/button_like";

describe("<ButtonLike />", () => {
  it("renders", () => {
    render(<ButtonLike />);
  });

  it("applies the theme", () => {
    const buttonLike = render(<ButtonLike color="green" />);
    const expected = palette.green.primary;

    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("can add a border", () => {
    const bordered = render(<ButtonLike />);
    expect(style(bordered).borderWidth).toBeDefined();

    const noBorder = render(<ButtonLike border={false} />);
    expect(style(noBorder).borderWidth).toBeUndefined();
  });

  it("can round the corners", () => {
    const rounded = render(<ButtonLike />);
    expect(style(rounded).borderRadius).toBeDefined();

    const unrounded = render(<ButtonLike rounded={false} />);
    expect(style(unrounded).borderRadius).toBeUndefined();
  });

  it("can fill the background", () => {
    const unfilled = render(<ButtonLike />);
    expect(style(unfilled).backgroundColor).toBe("white");

    const filled = render(<ButtonLike color="green" fill={true} />);
    const expected = palette.green.primary;
    expect(style(filled).backgroundColor).toBe(expected);
  });

  it("can horizontally center content", () => {
    const leftAligned = render(<ButtonLike />);
    expect(style(leftAligned).justifyContent).toBeUndefined();

    const centered = render(<ButtonLike center={true} />);
    expect(style(centered).justifyContent).toBe("center");
  });
});
