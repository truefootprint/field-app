import Summary from "../../app/components/summary";

describe("<Sticky />", () => {
  it("renders", () => {
    render(<Summary />);
  });

  it("applies the theme", () => {
    const summary = render(<Summary color="green" />);

    expect(style(summary).backgroundColor).toBe(palette.green.primary);
  });

  it("hides the heading if there is no summary text", () => {
    const withHeading = render(<Summary color="green" text="text" />);
    expect(withHeading).toHaveText("Project summary");

    const withoutHeading = render(<Summary color="green" />);
    expect(withoutHeading).not.toHaveText("Project summary");
  });

  it("hides the 'Project contract' button if hasContract is false", () => {
    const withContract = render(<Summary hasContract={true} />);
    expect(withContract).toHaveText("Project contract");

    const withoutContract = render(<Summary />);
    expect(withoutContract).not.toHaveText("Project contract");
  });

  it("calls 'onViewContract' when the button is pressed", () => {
    const callback = jest.fn();
    const summary = render(<Summary hasContract={true} onViewContract={callback} />);

    fireEvent.press(summary.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });
});
