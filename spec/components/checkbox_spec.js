import Checkbox from "../../app/components/checkbox";

describe("<Checkbox />", () => {
  it("renders", () => {
    render(<Checkbox />);
  });

  it("applies the theme", () => {
    const checkbox = render(<Checkbox color="green" />);
    const text = checkbox.getByTestId("text");
    const buttonLike = checkbox.getByTestId("button_like");
    const expected = palette.green.primary;

    expect(style(text).color).toBe(expected);
    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("sets the text", () => {
    const checkbox = render(<Checkbox>Yes</Checkbox>);
    const text = checkbox.getByTestId("text");

    expect(text).toHaveText("Yes");
  });

  it("has an empty square", () => {
    const checkbox = render(<Checkbox />);
    const square = checkbox.getByTestId("square");

    expect(props(square).children).toBe(false);
  });

  it("is an uncontrolled component by default", () => {
    const container = render(<Checkbox />);
    const checkbox = container.getByTestId("checkbox");

    expect(props(checkbox).data.checked).toBe(false);

    fireEvent.press(container.getByTestId("touchable"));
    expect(props(checkbox).data.checked).toBe(true);
  });

  it("can set its default checked state", () => {
    const container = render(<Checkbox defaultChecked />);
    const checkbox = container.getByTestId("checkbox");

    expect(props(checkbox).data.checked).toBe(true);
  });

  it("can be controlled by setting 'checked'", () => {
    const container = render(<Checkbox checked />);
    const checkbox = container.getByTestId("checkbox");

    expect(props(checkbox).data.checked).toBe(true);

    fireEvent.press(container.getByTestId("touchable"));
    expect(props(checkbox).data.checked).toBe(true);
  });

  describe("when checked", () => {
    const checkbox = render(<Checkbox checked>Yes</Checkbox>);

    it("adds a tick to the square", () => {
      const square = checkbox.getByTestId("square");

      expect(props(square).children.type.name).toBe("Tick");
    });

    it("makes the text white", () => {
      const text = checkbox.getByTestId("text");
      expect(style(text).color).toBe("white");
    });
  });

  describe("when disabled", () => {
    it("removes the outer border", () => {
      const checkbox = render(<Checkbox disabled>Yes</Checkbox>);
      const buttonLike = checkbox.getByTestId("button_like");

      expect(style(buttonLike).borderColor).toBeUndefined();
    });

    it("removes the background fill that would show when checked", () => {
      const checkbox = render(<Checkbox disabled checked>Yes</Checkbox>);
      const buttonLike = checkbox.getByTestId("button_like");

      expect(style(buttonLike).backgroundColor).toBe("white");
    });

    it("makes the text grey", () => {
      const checkbox = render(<Checkbox disabled checked>Yes</Checkbox>);
      const text = checkbox.getByTestId("text");
      const expected = palette.grey.primary;

      expect(style(text).color).toBe(expected);
    });

    it("removes the square's border", () => {
      const checkbox = render(<Checkbox disabled checked>Yes</Checkbox>);
      const square = checkbox.getByTestId("square");

      expect(style(square).borderWidth).toBe(0);
    });

    it("sets the square's background fill to grey", () => {
      const checkbox = render(<Checkbox disabled checked>Yes</Checkbox>);
      const square = checkbox.getByTestId("square");
      const expected = palette.grey.primaryTint;

      expect(style(square).backgroundColor).toBe(expected);
    });
  });

  describe("onCheck", () => {
    it("can set an 'onCheck' callback", () => {
      const callback = jest.fn();
      const checkbox = render(<Checkbox onCheck={callback} />);

      fireEvent.press(checkbox.getByTestId("touchable"));
      expect(callback).toHaveBeenCalled();
    });

    it("passes the new state to the callback", () => {
      const callback = jest.fn();
      const checkbox = render(<Checkbox onCheck={callback} />);

      fireEvent.press(checkbox.getByTestId("touchable"));
      expect(callback).lastCalledWith(true);

      fireEvent.press(checkbox.getByTestId("touchable"));
      expect(callback).lastCalledWith(false);
    });
  });
});
