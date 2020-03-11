import ImageRemover from "../../app/components/image_remover";
import File from "../../app/helpers/file";

jest.mock("../../app/components/downloader", () => ({
  __esModule: true, default: ({ children }) => children,
}));

jest.mock("../../app/helpers/file");

describe("<ImageRemover />", () => {
  beforeEach(() => {
    File.interpolate.mockImplementation(path => path);
  });

  it("renders", () => {
    render(<ImageRemover image={{ uri: "image.jpg" }} />);
  });

  it("shows the image", () => {
    const remover = render(<ImageRemover image={{ uri: "image.jpg" }} />);
    const image = remover.getByTestId("image");

    expect(props(image).source.uri).toBe("image.jpg");
  });

  it("shows the menu when clicking the image", () => {
    const remover = render(<ImageRemover image={{ uri: "image.jpg" }} />);
    const inner = remover.getByTestId("inner");
    const image = remover.getByTestId("image");

    expect(props(inner).data.visible).toBe(false);
    fireEvent.press(image);

    expect(props(inner).data.visible).toBe(true);
  });

  it("hides the menu when clicking cancel", () => {
    const remover = render(<ImageRemover image={{ uri: "image.jpg" }} />);
    const inner = remover.getByTestId("inner");
    const cancel = remover.getAllByTestId("menu_item")[1];

    expect(cancel).toHaveText("Cancel");

    fireEvent.press(remover.getByTestId("image"));
    fireEvent.press(cancel);

    expect(props(inner).data.visible).toBe(false);
  });

  it("hides the menu when clicking the background", () => {
    const remover = render(<ImageRemover image={{ uri: "image.jpg" }} />);
    const inner = remover.getByTestId("inner");
    const background = remover.getByTestId("background");

    fireEvent.press(remover.getByTestId("image"));
    fireEvent.press(background);

    expect(props(inner).data.visible).toBe(false);
  });
});
