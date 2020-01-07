import NetInfo from "@react-native-community/netinfo";
import hasWifi from "../helpers/has_wifi";

// Calls the function when the internet becomes reachable via wifi.

const useWifi = (onConnect=()=>{}) => {
  const [connected, setConnected] = useState(false);

  const handleChange = async (_net_info_state) => {
    // NetInfo's state doesn't include isInternetReachable so use hasWifi:
    const connected = await hasWifi();

    setConnected(connected);

    if (connected) {
      onConnect();
    }
  };

  useEffect(() => NetInfo.addEventListener(handleChange), []);

  return connected;
};

export default useWifi;
