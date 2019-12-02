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
});
