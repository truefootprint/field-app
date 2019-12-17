// TODO: unit tests - probably need to use jest mocks

import FileCache from "./file_cache";
import * as Network from "expo-network";
const wifi = Network.NetworkStateType.WIFI;

const syncData = async (callback, options={}) => {
  const onMiss = () => wifiOnly(() => new Client().myData());
  const maxAge = options.force ? 0 : undefined;
  const myData = await FileCache.fetch("my_data.json", { onMiss, maxAge, type: "object" });

  callback(myData);
};

const wifiOnly = async (callback) => {
  const state = await Network.getNetworkStateAsync();

  if (state.type === wifi && state.isInternetReachable) {
    return await callback();
  }
};

export default syncData;
