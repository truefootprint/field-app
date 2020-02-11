import IssueForm from "../../app/components/issue_form";

describe("<IssueForm />", () => {
  it("renders", () => {
    render(<IssueForm />);
  });

  it("applies the theme", () => {
    const form = render(<IssueForm color="green" />);
    const rectangle = form.getByTestId("rectangle");
    const circle = form.getByTestId("circle");
    const button = form.getByTestId("button_like");

    const expected = palette.green.primary;

    expect(style(rectangle).borderColor).toBe(expected);
    expect(style(circle).backgroundColor).toBe(expected);
    expect(style(button).backgroundColor).toBe(expected);
  });
});

