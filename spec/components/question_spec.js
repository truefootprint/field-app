import Question from "../../app/components/question";

describe("<Question />", () => {
  it("renders", () => {
    render(<Question />);
  });

  it("applies the theme", () => {
    const question = render(<Question color="green" />);
    const buttons = question.getAllByTestId("button_like");
    const expected = palette.green.primary;

    buttons.forEach(b => {
      expect(style(b).borderColor).toBe(expected);
    });
  });

  it("sets the text", () => {
    const question = render(<Question text="question text"/>);
    expect(question).toHaveText("question text");
  });

  it("has a 'Record an issue' checkbox", () => {
    const question = render(<Question />);
    const checkbox = question.getByTestId("checkbox");

    expect(checkbox).toHaveText("Record an issue");
  });

  it("has a submit button", () => {
    const question = render(<Question />);
    const submit = question.getAllByTestId("button_like")[1];

    expect(submit).toHaveText("Submit");
  });

  it("can render free text questions", () => {
    const question = render(
      <Question type="free_text" placeholder="Add a value" units="metres" />
    );

    const input = question.getByType("TextInput");
    const units = question.getByTestId("units");

    expect(props(input).placeholder).toBe("Add a value");
    expect(units).toHaveText("metres");
  });

  it("can render multi choice questions", () => {
    const options = [{ key: "yes", value: "Yes" }, { key: "no", value: "No" }];
    const question = render(<Question type="multi_choice" options={options} />);
    const radios = question.getAllByTestId("checkbox"); // Radios are Checkboxes.

    expect(radios[0]).toHaveText("Yes");
    expect(radios[1]).toHaveText("No");
  });

  it("can render photo upload questions", () => {
    const question = render(<Question type="photo_upload" />);
    const picker = question.queryByTestId("picker");

    expect(picker).toBeDefined();
  });
});
