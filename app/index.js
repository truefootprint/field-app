import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { View } from "react-native";
import testId from "./helpers/test_id";

import Home from "./screens/home";
import Another from "./screens/another";

const routes = { Home, Another };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => (
  <View style={{ flex: 1 }} {...testId("root")}>
    <AppContainer />
  </View>
);

export default App;
