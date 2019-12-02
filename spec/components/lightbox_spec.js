import Lightbox from "../../app/components/lightbox";

describe("<Lightbox />", () => {
  it("renders", () => {
    render(<Lightbox />);
  });

  it("can set its visibility", () => {
    const lightbox = render(<Lightbox visible={false} />);
    const inner = lightbox.getByTestId("inner");

    expect(props(inner).data.visible).toBe(false);
  });

  it("can set an 'onDismiss' callback", () => {
    const callback = jest.fn();
    const lightbox = render(<Lightbox onDismiss={callback} />);

    fireEvent.press(lightbox.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });
});
