import ImageInput from "../../app/components/image_input";
import moveImageToDocumentStorage from "../../app/workflows/move_image";

jest.mock("../../app/workflows/move_image");

describe("<ImageInput />", () => {
  // Hide a Jest warning about 'act' that I couldn't work out how to fix:
  const error = console.error;
  beforeEach(() => console.error = () => {});
  afterEach(() => console.error = error);

  it("renders", () => {
    render(<ImageInput />);
  });

  it("applies the theme", () => {
    const input = render(<ImageInput color="green" />);
    const rectangle = input.getByTestId("rectangle");
    const expected = palette.green.primary;

    expect(style(rectangle).borderColor).toBe(expected);
  });

  it("shows the placeholder", () => {
    const input = render(<ImageInput placeholder="Add a photo" />);
    expect(input).toHaveText("Add a photo");
  });

  it("shows picked images", async () => {
    const input = render(<ImageInput />);
    const picker = input.getByTestId("picker");

    await fireEvent(picker, "pick", { uri: "first" });
    await fireEvent(picker, "pick", { uri: "second" });

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

  it("can set an 'onChange' callback", async () => {
    const callback = jest.fn();
    const input = render(<ImageInput onChange={callback} />);
    const picker = input.getByTestId("picker");

    await fireEvent(picker, "pick", { uri: "first" });
    expect(callback).lastCalledWith([{ uri: "first" }]);

    await fireEvent(picker, "pick", { uri: "second" });
    expect(callback).lastCalledWith([{ uri: "first" }, { uri: "second" }]);
  });

  it("moves the picked image from the cache to document storage", async () => {
    const input = render(<ImageInput />);
    const picker = input.getByTestId("picker");

    await fireEvent(picker, "pick", { uri: "uri" });
    expect(moveImageToDocumentStorage).lastCalledWith({ uri: "uri" });
  });
});
