import "./globals";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AppLoading } from "expo";
import loadApp from "./workflows/load_app";
import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <AppLoading startAsync={loadApp} onFinish={() => setLoading(false)} />;
  } else {
    return <View style={{ flex: 1 }} {...className("root")}><AppContainer /></View>
  }
};

export default App;
