import ModalMenu from "../../app/components/modal_menu";

describe("<ModalMenu />", () => {
  it("renders", () => {
    render(<ModalMenu />);
  });

  it("can set an 'onDismiss' callback", () => {
    const callback = jest.fn();
    const menu = render(<ModalMenu onDismiss={callback} />);

    fireEvent.press(menu.getByTestId("touchable"));
    expect(callback).toHaveBeenCalled();
  });

  it("can set an 'onSelect' callback", () => {
    const callback = jest.fn();
    const item = <Text testID="item">First</Text>;
    const menu = render(<ModalMenu onSelect={callback}>{item}</ModalMenu>);

    fireEvent.press(menu.getByTestId("item"));
    expect(callback).toHaveBeenCalled();
  });

  it("passes the child and index to the callback", () => {
    const callback = jest.fn();
    const item = <Text testID="item">First</Text>;
    const menu = render(<ModalMenu onSelect={callback}>{item}</ModalMenu>);

    fireEvent.press(menu.getByTestId("item"));
    expect(callback).lastCalledWith(item, 0);
  });
});
