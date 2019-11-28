import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import "./globals";
import FontLoader from "./components/font_loader";

import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => (
  <View style={{ flex: 1 }} {...className("root")}>
    <FontLoader>
      <AppContainer />
    </FontLoader>
  </View>
);

export default App;
