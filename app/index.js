import "./globals";
import SyncMyDataTask from "./tasks/sync_my_data_task";
import PhotoUploadTask from "./tasks/photo_upload_task";
import FileDownloadTask from "./tasks/file_download_task";
import loadApp from "./workflows/load_app";
import Login from "./screens/login";
import Home from "./screens/home";
import Project from "./screens/project";
import Source from "./screens/source";

// Create the navigation stack so that you can't go back to the login screen.
const options = { headerMode: "none" };
const AppStack = createStackNavigator({ Home, Project, Source }, options);
const AuthStack = createSwitchNavigator({ Login, App: AppStack }, options);
const AppContainer = createAppContainer(AuthStack);

// These tasks run every 15 minutes when the app is in the background.
SyncMyDataTask.enable({ log: true });
PhotoUploadTask.enable({ log: true });
FileDownloadTask.enable({ log: true });

const App = () => {
  const [loaded, setLoaded] = useState();
  const [data, setData] = useState();
  const [token, setToken] = useSecret("token", () => setData({}));

  const foreground = useForeground();
  const connected = useWifi();

  useWhen([loaded, foreground, token], async () => {
    await SyncMyDataTask.runWith({ connected, callback: setData });
    await PhotoUploadTask.runWith({ connected });
    await FileDownloadTask.runWith({ connected });
  }, [connected]);

  if (!loaded || !data) {
    return <AppLoading startAsync={loadApp} onFinish={() => setLoaded(true)} />;
  }

  return (
    <AppContext.Provider value={{ data, token, setToken, connected }}>
      <View style={{ flex: 1 }} {...className("root")}>
        <AppContainer />
      </View>
    </AppContext.Provider>
  );
};

export default App;
