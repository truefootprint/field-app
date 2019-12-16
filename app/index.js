import "./globals";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import loadModels from "./helpers/load_models";
import loadFonts from "./helpers/load_fonts";
import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

const App = () => {
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    loadModels(() => setLoaded(c => c + 1));
    loadFonts(() => setLoaded(c => c + 1));
  }, []);

  if (loaded < 2) return null;

  return (
    <View style={{ flex: 1 }} {...className("root")}>
      <AppContainer />
    </View>
  );
};

export default App;
