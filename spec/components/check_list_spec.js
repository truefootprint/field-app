import CheckList, { Checkbox } from "../../app/components/check_list";

describe("<CheckList />", () => {
  it("renders", () => {
    render(<CheckList />);

    render(
      <CheckList>
        <CheckList>First</CheckList>
        <CheckList>Second</CheckList>
      </CheckList>
    );
  });

  it("sets indexes to an empty array when nothing is checked", () => {
    const checkList = render(
      <CheckList>
        <Checkbox>First</Checkbox>
        <Checkbox>Second</Checkbox>
      </CheckList>
    );

    expect(props(checkList).data.indexes).toEqual([]);
  });

  it("sets indexes to all checkboxes that are checked", () => {
    const checkList = render(
      <CheckList>
        <Checkbox>First</Checkbox>
        <Checkbox checked>Second</Checkbox>
        <Checkbox checked>Third</Checkbox>
      </CheckList>
    );

    expect(props(checkList).data.indexes).toEqual([1, 2]);
  });

  it("is an uncontrolled component by default", () => {
    const checkList = render(
      <CheckList>
        <Checkbox>First</Checkbox>
        <Checkbox>Second</Checkbox>
      </CheckList>
    );

    fireEvent.press(checkList.getAllByTestId("touchable")[0]);
    expect(props(checkList).data.indexes).toEqual([0]);
  });

  it("can set its default indexes state", () => {
    const checkList = render(
      <CheckList defaultIndexes={[1]}>
        <Checkbox checked>First</Checkbox>
        <Checkbox>Second</Checkbox>
      </CheckList>
    );

    expect(props(checkList).data.indexes).toEqual([1]);
  });

  it("can be controlled by setting 'indexes'", () => {
    const checkList = render(
      <CheckList indexes={[1]}>
        <Checkbox checked>First</Checkbox>
        <Checkbox>Second</Checkbox>
      </CheckList>
    );

    expect(props(checkList).data.indexes).toEqual([1]);

    fireEvent.press(checkList.getAllByTestId("touchable")[0]);
    expect(props(checkList).data.indexes).toEqual([1]); // does not change
  });

  it("can combine checkboxes and other components", () => {
    const checkList = render(
      <CheckList indexes={[1]}>
        <Checkbox checked>First</Checkbox>
        <Text>--- Help text ---</Text>
        <Checkbox>Second</Checkbox>
      </CheckList>
    );

    expect(checkList).toHaveText("First--- Help text ---Second");
  });

  describe("when indexes is set", () => {
    const checkList = render(
      <CheckList indexes={[1]}>
        <Checkbox checked>First</Checkbox>
        <Checkbox>Second</Checkbox>
        <Checkbox>Third</Checkbox>
      </CheckList>
    );

    it("sets 'checked' on the checkbox for that index", () => {
      const checkboxes = checkList.getAllByTestId("checkbox");

      expect(props(checkboxes[0]).data.checked).toBe(false);
      expect(props(checkboxes[1]).data.checked).toBe(true);
      expect(props(checkboxes[2]).data.checked).toBe(false);
    });
  });

  describe("property inheritance", () => {
    it("copies properties to checkboxes", () => {
      const checkList = render(
        <CheckList color="green">
          <Checkbox>First</Checkbox>
        </CheckList>
      );

      const text = checkList.getByTestId("text");
      expect(style(text).color).toBe(palette.green.primary);
    });

    it("does not override properties", () => {
      const checkList = render(
        <CheckList color="green">
          <Checkbox color="red">First</Checkbox>
        </CheckList>
      );

      const text = checkList.getByTestId("text");
      expect(style(text).color).toBe(palette.red.primary);
    });

    it("works alongside existing 'onCheck' callbacks", () => {
      const callback = jest.fn();
      const checkList = render(
        <CheckList>
          <Checkbox onCheck={callback}>First</Checkbox>
        </CheckList>
      );

      fireEvent.press(checkList.getAllByTestId("touchable")[0]);
      expect(callback).toHaveBeenCalled();
    });
  });

  describe("onChange", () => {
    it("can set an 'onChange' callback", () => {
      const callback = jest.fn();
      const checkList = render(
        <CheckList onChange={callback}>
          <Checkbox>First</Checkbox>
          <Checkbox>Second</Checkbox>
        </CheckList>
      );

      fireEvent.press(checkList.getAllByTestId("touchable")[0]);
      expect(callback).toHaveBeenCalled();
    });

    it("passes the new indexes to the callback", () => {
      const callback = jest.fn();
      const checkList = render(
        <CheckList onChange={callback}>
          <Checkbox>First</Checkbox>
          <Checkbox>Second</Checkbox>
        </CheckList>
      );

      fireEvent.press(checkList.getAllByTestId("touchable")[1]);
      expect(callback).lastCalledWith([1]);

      fireEvent.press(checkList.getAllByTestId("touchable")[0]);
      expect(callback).lastCalledWith([0, 1]);
    });
  });
});
