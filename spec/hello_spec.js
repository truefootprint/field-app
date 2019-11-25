import React from "react";
import { render } from "react-native-testing-library";

import App from "../App";

describe("<App />", () => {
  it("has 1 child", () => {
    const app = render(<App />);

    expect(app.getByTestId("home.text").props.children).toBe("Home Screen");
  });
});
