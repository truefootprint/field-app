import Question from "../../app/components/question";
import moveImageToDocumentStorage from "../../app/workflows/move_image";

jest.mock("../../app/workflows/move_image");

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

  it("enables the submit button after answering the question", () => {
    const question = render(<Question type="free_text" />);
    const input = question.getByTestId("native_input");

    expect(question.queryByTestId("disabled")).not.toBeNull();

    fireEvent(input, "changeText", "answer");
    fireEvent(input, "blur");

    expect(question.queryByTestId("disabled")).toBeNull();
  });

  it("filters responses to the submission period", () => {
    const response = { value: "old answer", createdAt: new Date(0).toString() };
    const question = render(<Question type="free_text" responses={[response]} />);
    const input = question.getByTestId("native_input");

    expect(props(input).value).toBe("");
  });

  describe("free text questions", () => {
    it("renders", () => {
      const question = render(
        <Question type="free_text" placeholder="Add a value" units="metres" />
      );

      const input = question.getByTestId("native_input");
      const units = question.getByTestId("units");

      expect(props(input).placeholder).toBe("Add a value");
      expect(units).toHaveText("metres");
    });

    it("can set an 'onAnswer' callback", () => {
      const callback = jest.fn();
      const question = render(<Question type="free_text" onAnswer={callback} />);
      const input = question.getByTestId("native_input");

      fireEvent(input, "changeText", "answer");
      fireEvent(input, "blur");

      expect(callback).lastCalledWith("answer");
    });

    it("populates the input from the response", () => {
      const response = { value: "answer", createdAt: new Date().toString() };
      const question = render(<Question type="free_text" responses={[response]} />);
      const input = question.getByTestId("native_input");

      expect(props(input).value).toBe("answer");
    });

    describe("when the answer hasn't changed", () => {
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

  describe("multi choice questions", () => {
    it("renders", () => {
      const options = [{ id: 1, text: "Yes" }, { id: 2, text: "No" }];
      const question = render(<Question type="multi_choice" multiChoiceOptions={options} />);
      const radios = question.getAllByTestId("checkbox"); // Radios are Checkboxes.

      expect(radios[0]).toHaveText("Yes");
      expect(radios[1]).toHaveText("No");
    });

    it("can set an 'onAnswer' callback", () => {
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

    it("populates the input from the response", () => {
      const options = [{ id: 1, text: "Yes" }, { id: 2, text: "No" }];
      const response = { value: "2", createdAt: new Date().toString() };
      const question = render(
        <Question type="multi_choice" multiChoiceOptions={options} responses={[response]} />
      );

      const radios = question.getAllByTestId("checkbox"); // Radios are Checkboxes.

      expect(props(radios[0]).data.checked).toBe(false);
      expect(props(radios[1]).data.checked).toBe(true);
    });
  });

  describe("photo upload questions", () => {
    // Hide a Jest warning about 'act' that I couldn't work out how to fix:
    const error = console.error;
    beforeEach(() => console.error = () => {});
    afterEach(() => console.error = error);

    it("renders", () => {
      const question = render(<Question type="photo_upload" />);
      const picker = question.queryByTestId("picker");

      expect(picker).toBeDefined();
    });

    it("can set an 'onAnswer' callback", async () => {
      const callback = jest.fn();
      const question = render(<Question type="photo_upload" onAnswer={callback} />);
      const picker = question.getByTestId("picker");

      await fireEvent(picker, "pick", { uri: "uri" });
      expect(callback).lastCalledWith([{ uri: "uri" }]);
    });

    it("populates the input from the response", () => {
      const response = {
        value: JSON.stringify([{ uri: "http://placekitten.com/800/500" }]),
        createdAt: new Date().toString(),
      };

      const question = render(<Question type="photo_upload" responses={[response]} />);
      const images = question.getAllByType("Image");

      expect(images.length).toBe(1);
      expect(props(images[0]).source.uri).toBe("http://placekitten.com/800/500");
    });
  });
});
