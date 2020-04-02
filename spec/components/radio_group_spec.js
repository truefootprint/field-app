import RadioGroup, { Radio } from "../../app/components/radio_group";
import Checkbox from "../../app/components/checkbox";

describe("<RadioGroup />", () => {
  it("renders", () => {
    render(<RadioGroup />);

    render(
      <RadioGroup>
        <Radio>Yes</Radio>
        <Radio>No</Radio>
      </RadioGroup>
    );
  });

  it("sets index to -1 when nothing is checked", () => {
    const group = render(
      <RadioGroup>
        <Radio>Yes</Radio>
        <Radio>No</Radio>
      </RadioGroup>
    );

    expect(props(group).data.index).toBe(-1);
  });

  it("sets index to the first radio that is checked", () => {
    const group = render(
      <RadioGroup>
        <Radio>Yes</Radio>
        <Radio checked>No</Radio>
        <Radio checked>Not sure</Radio>
      </RadioGroup>
    );

    expect(props(group).data.index).toBe(1);
  });

  it("is an uncontrolled component by default", () => {
    const group = render(
      <RadioGroup>
        <Radio>Yes</Radio>
        <Radio>No</Radio>
      </RadioGroup>
    );

    fireEvent.press(group.getAllByTestId("touchable")[0]);
    expect(props(group).data.index).toBe(0);
  });

  it("can set its default index state", () => {
    const group = render(
      <RadioGroup defaultIndex={1}>
        <Radio checked>Yes</Radio>
        <Radio>No</Radio>
      </RadioGroup>
    );

    expect(props(group).data.index).toBe(1);
  });

  it("can be controlled by setting 'index'", () => {
    const group = render(
      <RadioGroup index={1}>
        <Radio checked>Yes</Radio>
        <Radio>No</Radio>
      </RadioGroup>
    );

    expect(props(group).data.index).toBe(1);

    fireEvent.press(group.getAllByTestId("touchable")[0]);
    expect(props(group).data.index).toBe(1); // does not change
  });

  it("can combine radios and other components", () => {
    const group = render(
      <RadioGroup index={1}>
        <Radio checked>Yes</Radio>
        <Text>--- Help text ---</Text>
        <Radio>No</Radio>
      </RadioGroup>
    );

    expect(group).toHaveText("Yes--- Help text ---No");
  });

  describe("when index is set", () => {
    const group = render(
      <RadioGroup index={1}>
        <Radio checked>Yes</Radio>
        <Radio>No</Radio>
        <Radio>Not sure</Radio>
      </RadioGroup>
    );

    it("sets 'checked' on the radio for that index", () => {
      const radios = group.getAllByTestId("checkbox"); // Radios are Checkboxes.

      expect(props(radios[0]).data.checked).toBe(false);
      expect(props(radios[1]).data.checked).toBe(true);
      expect(props(radios[2]).data.checked).toBe(false);
    });
  });

  describe("property inheritance", () => {
    it("copies properties to radios", () => {
      const group = render(
        <RadioGroup color="green">
          <Radio>Yes</Radio>
        </RadioGroup>
      );

      const text = group.getByTestId("text");
      expect(style(text).color).toBe(palette.green.primary);
    });

    it("does not override properties", () => {
      const group = render(
        <RadioGroup color="green">
          <Radio color="red">Yes</Radio>
        </RadioGroup>
      );

      const text = group.getByTestId("text");
      expect(style(text).color).toBe(palette.red.primary);
    });

    it("works alongside existing 'onCheck' callbacks", () => {
      const callback = jest.fn();
      const group = render(
        <RadioGroup>
          <Radio onCheck={callback}>Yes</Radio>
        </RadioGroup>
      );

      fireEvent.press(group.getAllByTestId("touchable")[0]);
      expect(callback).toHaveBeenCalled();
    });

    it("also works with checkboxes for convenience", () => {
      const group = render(
        <RadioGroup color="green">
          <Checkbox>Hello</Checkbox>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
          <Checkbox checked>Goodbye</Checkbox>
        </RadioGroup>
      );

      const text = group.getAllByTestId("text")[0];
      expect(style(text).color).toBe(palette.green.primary);

      expect(props(group).data.index).toBe(-1);
      fireEvent.press(group.getAllByTestId("touchable")[3]);
      expect(props(group).data.index).toBe(-1);
    });
  });

  describe("onChange", () => {
    it("can set an 'onChange' callback", () => {
      const callback = jest.fn();
      const group = render(
        <RadioGroup onChange={callback}>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
        </RadioGroup>
      );

      fireEvent.press(group.getAllByTestId("touchable")[0]);
      expect(callback).toHaveBeenCalled();
    });

    it("passes the new index to the callback", () => {
      const callback = jest.fn();
      const group = render(
        <RadioGroup onChange={callback}>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
        </RadioGroup>
      );

      fireEvent.press(group.getAllByTestId("touchable")[1]);
      expect(callback).lastCalledWith(1);

      fireEvent.press(group.getAllByTestId("touchable")[0]);
      expect(callback).lastCalledWith(0);
    });

    it("only calls if the index has actually changed", () => {
      const callback = jest.fn();
      const group = render(
        <RadioGroup onChange={callback}>
          <Radio>Yes</Radio>
          <Radio checked>No</Radio>
        </RadioGroup>
      );

      fireEvent.press(group.getAllByTestId("touchable")[1]);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
