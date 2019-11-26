import Card from "../../app/components/card";

describe("<Card />", () => {
  it("renders", () => {
    render(<Card />);
  });

  it("applies the theme", () => {
    const card = render(<Card color="green" />);
    const expected = palette.green.primary;

    expect(style(card).borderTopColor).toBe(expected);

    const heading = card.getByTestId("heading");
    expect(style(heading).color).toBe(expected);
  });

  it("sets the heading", () => {
    const card = render(<Card heading="hello" />);
    const heading = card.getByTestId("heading");

    expect(heading).toHaveText("hello");
  });

  it("sets the ordinal", () => {
    const card = render(<Card number={3} outOf={5} />);
    const ordinal = card.getByTestId("ordinal");

    expect(ordinal).toHaveText("3 of 5");
  });
});
