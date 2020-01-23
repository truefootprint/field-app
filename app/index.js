import "./globals";
import SyncMyDataTask from "./tasks/sync_my_data_task";
import PhotoUploadTask from "./tasks/photo_upload_task";
import loadApp from "./workflows/load_app";
import Home from "./screens/home";

const routes = { Home };
const options = { headerMode: "none" };

const RootStack = createStackNavigator(routes, options);
const AppContainer = createAppContainer(RootStack);

// These tasks run every 15 minutes when the app is in the background.
SyncMyDataTask.enable({ log: true });
PhotoUploadTask.enable({ log: true });

const App = () => {
  const [loaded, setLoaded] = useState();
  const [data, setData] = useState();

  const foreground = useForeground();
  const connected = useWifi();

  useWhen([loaded, foreground], () => {
    SyncMyDataTask.runWith({ connected, force: true, callback: setData });
    PhotoUploadTask.runWith({ connected });
  }, [connected]);

  if (!loaded || !data) {
    return <AppLoading startAsync={loadApp} onFinish={() => setLoaded(true)} />;
  }

  return (
    <AppContext.Provider value={{ data, connected }}>
      <View style={{ flex: 1 }} {...className("root")}>
        <AppContainer />
      </View>
    </AppContext.Provider>
  );
};

export default App;
