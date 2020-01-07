import * as Network from "expo-network";

const wifi = Network.NetworkStateType.WIFI;

const hasWifi = async () => {
  try {
    const state = await Network.getNetworkStateAsync();
    return state.type === wifi && state.isInternetReachable;
  } catch {
    return false;
  }
};

export default hasWifi;
