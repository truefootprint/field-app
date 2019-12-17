import NetInfo from "@react-native-community/netinfo";
import * as Network from "expo-network";
const wifi = Network.NetworkStateType.WIFI;

// Calls the function when the internet becomes reachable via wifi.

const useWifi = (onConnect=()=>{}) => {
  const [connected, setConnected] = useState(false);

  const handleChange = async (_net_info_state) => {
    // NetInfo's state doesn't include isInternetReachable so use Network:
    let state = {};
    try { state = await Network.getNetworkStateAsync(); } catch {};

    if (state.type === wifi && state.isInternetReachable) {
      setConnected(true);
      onConnect();
    } else {
      setConnected(false);
    }
  };

  useEffect(() => NetInfo.addEventListener(handleChange), []);

  return connected;
};

export default useWifi;
