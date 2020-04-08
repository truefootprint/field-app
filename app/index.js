import "./globals";
import SyncMyDataTask from "./tasks/sync_my_data_task";
import PhotoUploadTask from "./tasks/photo_upload_task";
import FileDownloadTask from "./tasks/file_download_task";
import loadApp from "./workflows/load_app";
import Login from "./screens/login";
import Home from "./screens/home";
import Project from "./screens/project";
import Source from "./screens/source";
import Issue from "./screens/issue";
import Loading from "./components/loading";
import DevConsole from "./components/dev_console";

import { ErrorBoundary } from "./helpers/global_errors";

// Create the navigation stack so that you can't go back to the login screen.
const options = { headerMode: "none" };
const AppStack = createStackNavigator({ Home, Project, Source, Issue }, options);
const AuthStack = createSwitchNavigator({ Login, App: AppStack }, options);
const AppContainer = createAppContainer(AuthStack);

// These tasks run every 15 minutes when the app is in the background.
SyncMyDataTask.enable({ log: true });
PhotoUploadTask.enable({ log: true });
FileDownloadTask.enable({ log: true });

const App = () => {
  useScreens();

  const [loaded, setLoaded] = useState();
  const [data, setData] = useState();
  const [token, setToken] = useSecret("token", () => setData({}));
  const { locale, timezone } = useLocale();

  const foreground = useForeground();
  const connected = useWifi();

  useEffect(() => { loadApp(() => setLoaded(true)); }, []);

  useWhen([loaded, foreground, token], async () => {
    await SyncMyDataTask.runWith({ connected, callback: setData });
    await PhotoUploadTask.runWith({ connected });
    await FileDownloadTask.runWith({ connected });
  }, [connected]);

  useWhen([locale, timezone], async () => {
    Client.setLocale(locale);
    Client.setTimezone(timezone);
  });

  if (!loaded || !data) return <Loading />;

  return (
    <ErrorBoundary>
    <AppContext.Provider value={{ data, setData, token, setToken, connected }}>
      <View style={{ flex: 1 }} {...className("root")}>
        <AppContainer />
        <DevConsole />
      </View>
    </AppContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
