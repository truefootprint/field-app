import ImageInput from "../../app/components/image_input";

describe("<ImageInput />", () => {
  it("renders", () => {
    render(<ImageInput />);
  });

  it("applies the theme", () => {
    const input = render(<ImageInput color="green" />);
    const rectangle = input.getByTestId("rectangle");
    const expected = palette.green.primary;

    expect(style(rectangle).borderColor).toBe(expected);
  });

  it("shows picked images", () => {
    const input = render(<ImageInput />);
    const picker = input.getByTestId("picker");

    fireEvent(picker, "pick", { uri: "first" });
    fireEvent(picker, "pick", { uri: "second" });

    const images = input.getAllByType("Image");
    expect(images.length).toBe(2);

    expect(props(images[0]).source.uri).toBe("first");
    expect(props(images[1]).source.uri).toBe("second");
  });

  it("can set its default images array", () => {
    const image = { uri: "http://placekitten.com/800/500" };
    const input = render(<ImageInput defaultImages={[image]} />);

    const images = input.getAllByType("Image");
    expect(images.length).toBe(1);

    expect(props(images[0]).source.uri).toBe("http://placekitten.com/800/500");
  });

  it("can set an 'onChange' callback", () => {
    const callback = jest.fn();
    const input = render(<ImageInput onChange={callback} />);
    const picker = input.getByTestId("picker");

    fireEvent(picker, "pick", { uri: "first" });
    expect(callback).lastCalledWith([{ uri: "first" }]);

    fireEvent(picker, "pick", { uri: "second" });
    expect(callback).lastCalledWith([{ uri: "first" }, { uri: "second" }]);
  });
});
