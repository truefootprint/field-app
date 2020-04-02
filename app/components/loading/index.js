import { Animated } from "react-native";
import { Spinner } from "../svg_icon";
import styles from "./styles.js";

const Loading = ({ text="Loading..." }) => { // TODO: translate default text
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <View {...className("loading", styles)}>
      <Spinner size={100} frame={frame} />

      <Text {...className("text")}>{text}</Text>
    </View>
  );
};

export default Loading;
