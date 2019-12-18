import Button from "../../app/components/button";

describe("<Button />", () => {
  it("renders", () => {
    render(<Button />);
  });

  it("applies the theme", () => {
    const button = render(<Button color="green" />);
    const buttonLike = button.getByTestId("button_like");
    const expected = palette.green.primary;

    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("can set the text", () => {
    const button = render(<Button text="Submit" />);
    expect(button.getByTestId("text")).toHaveText("Submit");
  });

  it("can set an 'onPress' callback", () => {
    const callback = jest.fn();
    const button = render(<Button onPress={callback} />);

    fireEvent.press(button.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    const button = render(<Button disabled={true} />);
    const touchable = button.queryByTestId("touchable");
    const disabled = button.getByTestId("disabled");

    expect(touchable).toBeNull();
    expect(style(disabled).opacity).toBe(0.6);
  });
});
