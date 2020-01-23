const Login = ({ navigation }) => {
  const { data, setToken } = useContext(AppContext);

  if (data && data.projects) {
    navigation.navigate("Home");
  }

  return (
    <Text>Login screen</Text>
  );
};

export default Login;
