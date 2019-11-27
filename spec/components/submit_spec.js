import Submit from "../../app/components/submit";

describe("<Submit />", () => {
  it("renders", () => {
    render(<Submit />);
  });

  it("applies the theme", () => {
    const submit = render(<Submit color="green" />);
    const buttonLike = submit.getByTestId("button_like");
    const expected = palette.green.primary;

    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("can set the text", () => {
    const submit = render(<Submit />);
    expect(submit.getByTestId("text")).toHaveText("Submit");

    const save = render(<Submit text="Save" />);
    expect(save.getByTestId("text")).toHaveText("Save");
  });

  it("can set an 'onSubmit' callback", () => {
    const callback = jest.fn();
    const submit = render(<Submit onSubmit={callback} />);

    fireEvent.press(submit.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });
});
