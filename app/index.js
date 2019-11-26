import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "./globals";

import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => (
  <View style={{ flex: 1 }} {...className("root")}>
    <AppContainer />
  </View>
);

export default App;
