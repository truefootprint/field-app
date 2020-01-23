import Layout from "../components/layout";
import LoginForm from "../components/login_form";
import NoWifi from "../components/no_wifi";

const Login = ({ navigation }) => {
  const { data, setToken, connected } = useContext(AppContext);
  const loggedIn = () => data && data.projects;

  useEffect(() => {
    if (loggedIn()) navigation.navigate("App");
  }, [data]);

  return connected
    ? <LoginForm onSubmit={() => setToken("token from api")} />
    : <NoWifi />;
};

export default Login;
