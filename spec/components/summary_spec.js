import Summary from "../../app/components/summary";

describe("<Sticky />", () => {
  it("renders", () => {
    render(<Summary />);
  });

  it("applies the theme", () => {
    const summary = render(<Summary color="green" />);

    expect(style(summary).backgroundColor).toBe(palette.green.primary);
  });
});
