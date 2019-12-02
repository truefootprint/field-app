import ImagePicker from "../../app/components/image_picker";

describe("<ImagePicker />", () => {
  it("renders", () => {
    render(<ImagePicker />);
  });

  it("applies the theme", () => {
    const picker = render(<ImagePicker color="green" />);
    const rectangle = picker.getByTestId("rectangle");
    const circle = picker.getByTestId("circle");

    const expected = palette.green.primary;

    expect(style(rectangle).borderColor).toBe(expected);
    expect(style(circle).backgroundColor).toBe(expected);
  });

  it("shows the menu when clicking the plus", () => {
    const picker = render(<ImagePicker />);
    const inner = picker.getByTestId("inner");

    expect(props(inner).data.visible).toBe(false);

    fireEvent.press(picker.getByTestId("plus"));
    expect(props(inner).data.visible).toBe(true);
  });

  it("hides the menu when clicking cancel", () => {
    const picker = render(<ImagePicker />);
    const inner = picker.getByTestId("inner");
    const cancel = picker.getAllByTestId("menu_item")[2];

    fireEvent.press(picker.getByTestId("plus"));
    fireEvent.press(cancel);

    expect(props(inner).data.visible).toBe(false);
  });

  it("hides the menu when clicking the background", () => {
    const picker = render(<ImagePicker />);
    const inner = picker.getByTestId("inner");
    const background = picker.getByTestId("background");

    fireEvent.press(picker.getByTestId("plus"));
    fireEvent.press(background);

    expect(props(inner).data.visible).toBe(false);
  });
});
