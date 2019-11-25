import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import Card from "../../app/components/card";

describe("<Card />", () => {
  it("increments a counter", () => {
    const card = render(<Card />);

    expect(card).toHaveText("counter: 0");

    fireEvent.press(card.getByTestId("card.button"));
    expect(card).toHaveText("counter: 1");

    fireEvent.press(card.getByTestId("card.button"));
    expect(card).toHaveText("counter: 2");
  });
});
