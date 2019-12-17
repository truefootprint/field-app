import { AppState } from "react-native";

const useForeground = (onForeground=()=>{}) => {
  const [foreground, setForeground] = useState(true);

  useEffect(() => {
    onForeground(); // Treat the first render as a foreground event.

    const listener = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setForeground(true);
        onForeground();
      } else {
        setForeground(false);
      }
    });

    return () => AppState.removeEventListener("change", listener);
  }, []);

  return foreground;
};

export default useForeground;
