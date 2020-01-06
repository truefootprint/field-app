import "./globals";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import loadApp from "./workflows/load_app";
import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => {
  const [loaded, setLoaded] = useState();

  useEffect(() => loadApp(setLoaded, { force: false }), []);

  return (
    <View style={{ flex: 1 }} {...className("root")}>
      {loaded && <AppContainer />}
    </View>
  );
};

export default App;
