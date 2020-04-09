import Layout from "../components/layout";
import LoginForm from "../components/login_form";
import NoWifi from "../components/no_wifi";
import Loading from "../components/loading";

const Login = ({ navigation }) => {
  const { token, setToken, data, connected } = useContext(AppContext);
  const [error, setError] = useState(false);

  useWhen([token], () => {
    Client.setToken(token);

    if (data.projects) {
      navigation.navigate("App");
    }
  }, [data]);

  const handleSubmit = async (phone) => {
    setError(false);

    const token = await generateToken(phone);
    token ? setToken(token) : setError(true)
  };

  const generateToken = async (phone) => {
    try {
      const { token } = await new Client().postTokens(phone);
      return token;
    } catch (error) {
      if (authFailed(error)) return null;
      throw error;
    }
  };

  const authFailed = (error) => (
    error && error.message && error.message.includes("401")
  );

  if (token) return <Loading />;
  if (!connected) return <NoWifi />;

  return <LoginForm onSubmit={handleSubmit} error={error} />;
};

export default Login;
