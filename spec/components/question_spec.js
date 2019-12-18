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

    const input = question.getByTestId("native_input");
    const units = question.getByTestId("units");

    expect(props(input).placeholder).toBe("Add a value");
    expect(units).toHaveText("metres");
  });

  it("can render multi choice questions", () => {
    const options = [{ id: 1, text: "Yes" }, { id: 2, text: "No" }];
    const question = render(<Question type="multi_choice" multiChoiceOptions={options} />);
    const radios = question.getAllByTestId("checkbox"); // Radios are Checkboxes.

    expect(radios[0]).toHaveText("Yes");
    expect(radios[1]).toHaveText("No");
  });

  it("can render photo upload questions", () => {
    const question = render(<Question type="photo_upload" />);
    const picker = question.queryByTestId("picker");

    expect(picker).toBeDefined();
  });

  it("can receive answers from free text questions", () => {
    const callback = jest.fn();
    const question = render(<Question type="free_text" onAnswer={callback} />);
    const input = question.getByTestId("native_input");

    fireEvent(input, "changeText", "answer");
    fireEvent(input, "blur");

    expect(callback).lastCalledWith("answer");
  });

  it("can receive answers from multi choice questions", () => {
    const callback = jest.fn();
    const options = [{ id: 1, text: "Yes" }, { id: 2, text: "No" }];
    const question = render(
      <Question type="multi_choice" multiChoiceOptions={options} onAnswer={callback} />
    );

    fireEvent(question.getByText("Yes"), "check");
    expect(callback).lastCalledWith(1);

    fireEvent(question.getByText("No"), "check");
    expect(callback).lastCalledWith(2);
  });

  it("can receive answers from photo upload questions", () => {
    const callback = jest.fn();
    const question = render(<Question type="photo_upload" onAnswer={callback} />);
    const picker = question.getByTestId("picker");

    fireEvent(picker, "pick", { uri: "uri" });
    expect(callback).lastCalledWith("uri");
  });

  it("enables the submit button after answering the question", () => {
    const question = render(<Question type="free_text" />);
    const input = question.getByTestId("native_input");

    expect(question.queryByTestId("disabled")).not.toBeNull();

    fireEvent(input, "changeText", "answer");
    fireEvent(input, "blur");

    expect(question.queryByTestId("disabled")).toBeNull();
  });

  describe("when the answer to a free text question hasn't changed", () => {
    it("disables the submit button", () => {
      const question = render(<Question type="free_text" />);
      const input = question.getByTestId("native_input");

      fireEvent(input, "changeText", "");
      expect(question.queryByTestId("disabled")).not.toBeNull();

      fireEvent(input, "changeText", "answer");
      expect(question.queryByTestId("disabled")).toBeNull();

      // De-selecting the input counts as answering the question.
      fireEvent(input, "blur");

      fireEvent(input, "changeText", "answer");
      expect(question.queryByTestId("disabled")).not.toBeNull();

      fireEvent(input, "changeText", "new answer");
      expect(question.queryByTestId("disabled")).toBeNull();
    });

    it("does not call 'onAnswer' a second time", () => {
      const callback = jest.fn();
      const question = render(<Question type="free_text" onAnswer={callback} />);
      const input = question.getByTestId("native_input");

      fireEvent(input, "changeText", "answer");
      fireEvent(input, "blur");

      expect(callback.mock.calls.length).toBe(1);

      fireEvent(input, "changeText", "answer");
      fireEvent(input, "blur");

      expect(callback.mock.calls.length).toBe(1);
    })
  });
});
