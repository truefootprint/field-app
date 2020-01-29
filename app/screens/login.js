import Layout from "../components/layout";
import LoginForm from "../components/login_form";
import NoWifi from "../components/no_wifi";

const Login = ({ navigation }) => {
  const { data, setToken, connected } = useContext(AppContext);
  const [error, setError] = useState(false);

  const loggedIn = () => data && data.projects;

  useEffect(() => {
    if (loggedIn()) navigation.navigate("App");
  }, [data]);

  const handleSubmit = async (phone) => {
    setError(false);

    const { token } = await new Client().postTokens(phone);
    token ? setToken(token) : setError(true)
  };

  return connected
    ? <LoginForm onSubmit={handleSubmit} error={error} />
    : <NoWifi />;
};

export default Login;
