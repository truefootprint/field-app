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
  const epochSeconds = await lastModified();

  if (isSameDay(epochSeconds)) {
    return await readCache();
  }

  let content;
  try { content = await callback(); } catch {}

  if (content) {
    writeCache(content);
    return content;
  }

  if (epochSeconds) {
    return await readCache();
  }
};

const cacheExists = async () => {
  const { exists } = await FileSystem.getInfoAsync(path);
  return exists;
};

const isSameDay = (epochSeconds) => {
  if (!epochSeconds) return false;

  const dateUpdated = new Date(epochSeconds * 1000);
  const currentDate = new Date();

  return dateUpdated.getDay() === currentDate.getDay();
};

const lastModified = async () => {
  const { modificationTime } = await FileSystem.getInfoAsync(path);
  return modificationTime;
};

const readCache = async () => {
  const content = await FileSystem.readAsStringAsync(path);
  return JSON.parse(content);
};

const writeCache = async (data) => {
  const content = JSON.stringify(data);
  await FileSystem.writeAsStringAsync(path, content);
};

export default syncData;
