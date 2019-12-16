// TODO: unit tests - probably need to use jest mocks

import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
const wifi = Network.NetworkStateType.WIFI;

const directory = FileSystem.documentDirectory;
const filename = "my_data.json";
const path = `${directory}${filename}`;

const syncData = async (callback, options={}) => {
  const getData = () => new Client().myData();

  if (options.force) {
    callback(await getData());
  } else {
    callback(await withCaching(await wifiOnly(getData)));
  }
};

const wifiOnly = async (callback) => {
  const state = await Network.getNetworkStateAsync();

  if (state.type === wifi && state.isInternetReachable) {
    return await callback();
  }
};

const withCaching = async (callback) => {
  const epochSeconds = await File.modified(filename);

  if (isSameDay(epochSeconds)) {
    return await File.readObject(filename);
  }

  let data;
  try { data = await callback(); } catch {}

  if (content) {
    File.writeObject(data);
    return data;
  }

  if (epochSeconds) {
    return await File.readObject(filename);
  }
};

const isSameDay = (epochSeconds) => {
  if (!epochSeconds) return false;

  const dateUpdated = new Date(epochSeconds * 1000);
  const currentDate = new Date();

  return dateUpdated.getDay() === currentDate.getDay();
};

export default syncData;
