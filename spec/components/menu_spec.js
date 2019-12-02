import Menu from "../../app/components/menu";

describe("<Menu />", () => {
  it("renders", () => {
    render(<Menu />);
  });

  it("can set an 'onSelect' callback", () => {
    const callback = jest.fn();
    const item = <Text testID="item">First</Text>;
    const menu = render(<Menu onSelect={callback}>{item}</Menu>);

    fireEvent.press(menu.getByTestId("item"));
    expect(callback).toHaveBeenCalled();
  });

  it("passes the child and index to the callback", () => {
    const callback = jest.fn();
    const item = <Text testID="item">First</Text>;
    const menu = render(<Menu onSelect={callback}>{item}</Menu>);

    fireEvent.press(menu.getByTestId("item"));
    expect(callback).lastCalledWith(item, 0);
  });
});
