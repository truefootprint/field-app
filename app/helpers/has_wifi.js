import * as Network from "expo-network";

const wifi = Network.NetworkStateType.WIFI;
const mobile = Network.NetworkStateType.CELLULAR;

const hasWifi = async () => {
  try {
    const state = await Network.getNetworkStateAsync();
    return (state.type === wifi || state.type === mobile) && state.isInternetReachable;
  } catch {
    return false;
  }
};

export default hasWifi;
