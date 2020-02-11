import ImagePicker from "../../app/components/image_picker";
import * as Picker from "expo-image-picker";

jest.mock("expo-image-picker");

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

  it("shows the text", () => {
    const picker = render(<ImagePicker text="Add a photo" />);
    expect(picker).toHaveText("Add a photo");
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

    expect(cancel).toHaveText("Cancel");

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

  it("calls 'onPick' after choosing from the library", async () => {
    const data = { uri: "uri", width: 800, height: 600, exif: "exif" };
    Picker.launchImageLibraryAsync.mockResolvedValue({ ...data, cancelled: false });

    const callback = jest.fn();
    const picker = render(<ImagePicker onPick={callback} />);
    const chooseLibrary = picker.getAllByTestId("menu_item")[1];

    expect(chooseLibrary).toHaveText("Choose from library");

    fireEvent.press(picker.getByTestId("plus"));
    await fireEvent.press(chooseLibrary);

    expect(callback).lastCalledWith(data);
  });

  it("calls 'onPick' after taking a photo", async () => {
    const data = { uri: "uri", width: 800, height: 600, exif: "exif" };
    Picker.launchCameraAsync.mockResolvedValue({ ...data, cancelled: false });

    const callback = jest.fn();
    const picker = render(<ImagePicker onPick={callback} />);
    const takePhoto = picker.getAllByTestId("menu_item")[0];

    expect(takePhoto).toHaveText("Take photo");

    fireEvent.press(picker.getByTestId("plus"));
    await fireEvent.press(takePhoto);

    expect(callback).lastCalledWith(data);
  });

  it("does not call 'onPick' if either operation was cancelled", async () => {
    Picker.launchImageLibraryAsync.mockResolvedValue({ cancelled: true });
    Picker.launchCameraAsync.mockResolvedValue({ cancelled: true });

    const callback = jest.fn();
    const picker = render(<ImagePicker onPick={callback} />);
    const takePhoto = picker.getAllByTestId("menu_item")[0];
    const chooseLibrary = picker.getAllByTestId("menu_item")[1];

    fireEvent.press(picker.getByTestId("plus"));
    await fireEvent.press(takePhoto);

    fireEvent.press(picker.getByTestId("plus"));
    await fireEvent.press(chooseLibrary);

    expect(callback).not.toHaveBeenCalled();
  });
});
