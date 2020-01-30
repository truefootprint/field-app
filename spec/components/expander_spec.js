import Expander from "../../app/components/expander";

describe("<Expander />", () => {
  it("renders", () => {
    render(<Expander />);
  });

  it("applies the theme", () => {
    const expander = render(<Expander color="green"/>);
    const header = expander.getByTestId("header");
    const icon = expander.getByTestId("icon");
    const expected = palette.green.primary;

    expect(style(header).borderTopColor).toBe(expected);
    expect(style(icon).backgroundColor).toBe(expected);
  });

  it("activates the header when pressed, making it sticky", () => {
    const expander = render(<Expander />);

    const inactive = expander.getByTestId("header");
    expect(props(inactive).data.active).toBe(false);
    expect(props(inactive).data.active).toBe(false);

    fireEvent.press(inactive);

    const active = expander.getByTestId("header");
    expect(props(active).data.active).toBe(true);
    expect(props(active).data.active).toBe(true);
  });

  it("can render in an expanded state", () => {
    const expander = render(<Expander expanded={true} />);

    const active = expander.getByTestId("header");
    expect(props(active).data.active).toBe(true);
    expect(props(active).data.active).toBe(true);

    fireEvent.press(active);

    const inactive = expander.getByTestId("header");
    expect(props(inactive).data.active).toBe(false);
    expect(props(inactive).data.active).toBe(false);
  });

  it("it shows the content when the expander is active", () => {
    const expander = render(<Expander />);
    const header = expander.getByTestId("header");

    const hidden = expander.getByTestId("content");
    expect(style(hidden).display).toBe("none");

    fireEvent.press(header);

    const visible = expander.getByTestId("content");
    expect(style(visible).display).toBe("flex");
  });

  it("returns an array for compatibility with <Sticky.Container>", () => {
    const expander = Expander();

    expect(Array.isArray(expander)).toBe(true);
  });

  it("clears the sticky header after the content has finished", () => {
    const expander = Expander();
    const last = expander[expander.length - 1];

    // This works by adding an empty sticky element to the end of the array.
    expect(last.type.name).toBe("Sticky");
    expect(props(last).children).toBeUndefined();
  });

  it("generates unique keys for array elements based on their text", () => {
    const expander = Expander({ text: "header text" });

    // These satisfy React's requirement for unique keys for array elements.
    expect(expander[0].key).toBe("header text-0");
    expect(expander[1].key).toBe("header text-1");
    expect(expander[2].key).toBe("header text-2");
    expect(expander[3].key).toBe("header text-3");
  });
});
