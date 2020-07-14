import Constants from "expo-constants";
import DevConsole from "../dev_console";

// If the version is tapped five times, we throw some errors so we can test the
// Sentry integration and that the user sees some alert messages in production.

const Version = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#ddd");
  const [showConsole, setShowConsole] = useState(false);

  const handlePress = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount % 5 == 0) {
      setShowConsole(true);
    } else {
      setColor("#ddd");
    }
  };

  const throwTestErrors = () => {
    (async () => {
      throw new Error('Test error 1 out of 3: from a promise');
    })();

    setTimeout(() => {
      throw new Error('Test error 2 out of 3: from a timeout');
    }, 1000);

    throw new Error('Test error 3 out of 3: from the main thread');
  }

  return (
    <View>
      <Touchable onPress={handlePress}>
        <Text style={{ marginBottom: 20, color, fontSize: 12, textAlignVertical: "center", textAlign: "center" }}>
          FieldApp version {Constants.manifest.version}
        </Text>
      </Touchable>
      { showConsole && <DevConsole /> }
    </View>
  );
};

export default Version;
