import * as SecureStore from "expo-secure-store";

class Secret {
  static read = async (key, callback=()=>{}) => {
    const value = await SecureStore.getItemAsync(key);
    await callback(value);
    return value;
  };

  static write = async (key, value, callback=()=>{}) => {
    await SecureStore.setItemAsync(key, value);
    await callback(value);
    return value;
  };
}

export default Secret;
