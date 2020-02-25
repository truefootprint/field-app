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

  it("shows a disabled submit button", () => {
    const form = render(<IssueForm />);
    const disabled = form.queryByTestId("disabled");

    expect(disabled).not.toBeNull();
  });

  it("activates the submit button when text has changed", () => {
    const form = render(<IssueForm />);
    const input = form.getByTestId("native_input");

    fireEvent(input, "changeText", "");
    expect(form.queryByTestId("disabled")).not.toBeNull();

    fireEvent(input, "changeText", "description");
    expect(form.queryByTestId("disabled")).toBeNull();

    fireEvent(input, "changeText", "");
    expect(form.queryByTestId("disabled")).not.toBeNull();
  });

  it("activates the input when the photos have changed", () => {
    // TODO
  });

  describe("when an issue is provided", () => {
    const photos = [{ uri: "image.jpg" }];

    const issue = { versionedContent: {
      text: "description", photosJson: JSON.stringify(photos),
    }};

    it("pre-populates the text input", () => {
      const form = render(<IssueForm issue={issue} />);
      const nativeInput = form.getByTestId("native_input");

      expect(props(nativeInput).value).toBe("description");
    });

    it("pre-populates the image input", () => {
      const form = render(<IssueForm issue={issue} />);
      const picker = form.queryByTestId("circle");
      const image = form.getByType("Image");

      expect(props(image).source.uri).toBe("image.jpg");
      expect(picker).not.toBeNull();
    });

    describe("when the form is not editable", () => {
      it("swaps the text input for a text element", () => {
        const form = render(<IssueForm issue={issue} editable={false} />);
        const nativeInput = form.queryByTestId("native_input");
        const textElement = form.queryByTestId("text");

        expect(nativeInput).toBeNull();
        expect(textElement).toHaveText("description");
      });

      it("swaps the image input for image elements", () => {
        const form = render(<IssueForm issue={issue} editable={false} />);
        const picker = form.queryByTestId("circle");
        const image = form.getByType("Image");

        expect(picker).toBeNull();
        expect(image).not.toBeNull();
        expect(props(image).source.uri).toBe("image.jpg");
      });
    });
  });
});

