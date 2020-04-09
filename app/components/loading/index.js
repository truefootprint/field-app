import { Animated } from "react-native";
import { Spinner } from "../svg_icon";
import styles from "./styles.js";

const Loading = () => {
  const [frame, setFrame] = useState(0);
  const t = useTranslate();

  // Don't show the loading text if we haven't determined the user's locale yet.
  const showText = !!useTranslate.locale;

  useEffect(() => {
    const interval = setInterval(() => setFrame(f => f + 1), 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <View {...className("loading", styles)}>
      <Spinner size={100} frame={frame} />

      {showText && <Text {...className("text")}>{t.loading}</Text>}
    </View>
  );
};

export default Loading;
