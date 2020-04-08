import Constants from "expo-constants";

// If the version is tapped five times, we throw some errors so we can test the
// Sentry integration and that the user sees some alert messages in production.

const Version = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#ddd");

  const handlePress = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount % 5 == 0) {
      setColor("#999");
      throwTestErrors();
    } else {
      setColor("#ddd");
    }
  };

  const throwTestErrors = () => {
    setTimeout(() => {
      throw new Error('Test error: async timeout');
    }, 1000);

    (async () => {
      throw new Error('Test error: async promise');
    })();

    throw new Error('Test error: synchronous');
  }

  return (
    <Touchable onPress={handlePress}>
      <Text style={{ marginBottom: 20, color, fontSize: 12 }}>
        FieldApp version {Constants.manifest.version}
      </Text>
    </Touchable>
  );
};

export default Version;
