import Sticky from "../../app/components/sticky";

describe("<Sticky />", () => {
  it("renders", () => {
    render(<Sticky />);
    render(<Sticky.Container />);
  });

  it("sets the layout's indices to the sticky elements", () => {
    const container = render(<Sticky.Container>
        <Sticky />
        <Text>not sticky</Text>
        <Sticky />
      </Sticky.Container>
    );

    expect(props(container).stickyHeaderIndices).toEqual([0, 2]);
  });
});
