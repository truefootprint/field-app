import Modal from "../../app/components/modal";

describe("<Modal />", () => {
  it("renders", () => {
    render(<Modal />);
  });

  it("applies the theme", () => {
    const modal = render(<Modal color="green" />);
    const expected = palette.green.secondaryTint;

    expect(style(modal).backgroundColor).toBe(expected);
  });

  it("can set an 'onClose' callback", () => {
    const callback = jest.fn();
    const modal = render(<Modal onClose={callback} />);

    fireEvent.press(modal.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });
});
