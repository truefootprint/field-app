import Radio from "../../app/components/radio";

describe("<Radio />", () => {
  it("renders", () => {
    render(<Radio />);
  });

  it("applies the theme", () => {
    const radio = render(<Radio color="green" />);
    const text = radio.getByTestId("text");
    const buttonLike = radio.getByTestId("button_like");
    const expected = palette.green.primary;

    expect(style(text).color).toBe(expected);
    expect(style(buttonLike).borderColor).toBe(expected);
  });

  it("sets the text", () => {
    const radio = render(<Radio>Yes</Radio>);
    const text = radio.getByTestId("text");

    expect(text).toHaveText("Yes");
  });

  it("has a white circle", () => {
    const radio = render(<Radio />);
    const circle = radio.getByTestId("circle");

    expect(style(circle).backgroundColor).toBe("white");
  });

  it("is an uncontrolled component by default", () => {
    const radio = render(<Radio />);
    expect(props(radio).data.checked).toBe(false);

    fireEvent.press(radio.getByTestId("touchable"));
    expect(props(radio).data.checked).toBe(true);
  });

  it("can set its default checked state", () => {
    const radio = render(<Radio defaultChecked />);
    expect(props(radio).data.checked).toBe(true);
  });

  it("can be controlled by setting 'checked'", () => {
    const radio = render(<Radio checked />);
    expect(props(radio).data.checked).toBe(true);

    fireEvent.press(radio.getByTestId("touchable"));
    expect(props(radio).data.checked).toBe(true);
  });

  describe("when checked", () => {
    const radio = render(<Radio checked>Yes</Radio>);

    it("makes the text white", () => {
      const text = radio.getByTestId("text");
      expect(style(text).color).toBe("white");
    });

    it("makes the circle black", () => {
      const circle = radio.getByTestId("circle");
      expect(style(circle).backgroundColor).toBe(palette.black.primary);
    });
  });

  describe("onCheck", () => {
    it("can set an 'onCheck' callback", () => {
      const callback = jest.fn();
      const radio = render(<Radio onCheck={callback} />);

      fireEvent.press(radio.getByTestId("touchable"));
      expect(callback).toHaveBeenCalled();
    });

    it("can use 'onCheck's return value to set checked", () => {
      let calls = 0;
      const callback = () => (calls += 1) === 2;

      const radio = render(<Radio onCheck={callback} />);
      expect(props(radio).data.checked).toBe(false);

      fireEvent.press(radio.getByTestId("touchable"));
      expect(props(radio).data.checked).toBe(false);

      fireEvent.press(radio.getByTestId("touchable"));
      expect(props(radio).data.checked).toBe(true);
    });

    it("passes the checked state to the callback", () => {
      const callback = jest.fn();
      const radio = render(<Radio onCheck={callback} />);

      fireEvent.press(radio.getByTestId("touchable"));
      expect(callback).lastCalledWith(false);

      fireEvent.press(radio.getByTestId("touchable"));
      expect(callback).lastCalledWith(true);
    });
  });
});
