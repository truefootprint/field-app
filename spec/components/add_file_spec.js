import AddFile from "../../app/components/add_file";

describe("<AddFile />", () => {
  it("renders", () => {
    render(<AddFile />);
  });

  it("applies the theme", () => {
    const addFile = render(<AddFile color="green" />);
    const circle = addFile.getByTestId("circle");
    const expected = palette.green.primary;

    expect(style(addFile).borderColor).toBe(expected);
    expect(style(circle).backgroundColor).toBe(expected);
  });

  it("can set an 'onAdd' callback", () => {
    const callback = jest.fn();
    const addFile = render(<AddFile onAdd={callback} />);

    fireEvent.press(addFile.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });
});
