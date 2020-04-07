import * as SecureStore from "expo-secure-store";

class Secret {
  static read = async (key, callback=()=>{}) => {
    let value;

    // This guards against corruption / loss of encryption key.
    try { value = await SecureStore.getItemAsync(key); }
    catch { await this.remove(key); }

    await callback(value);
    return value;
  };

  // Sometimes this fails in the emulator. Fixed by uninstalling expo.
  static write = async (key, value, callback=()=>{}) => {
    await SecureStore.setItemAsync(key, value);
    await callback(value);
    return value;
  };

  static remove = async (key, callback=()=>{}) => {
    await SecureStore.deleteItemAsync(key);
    await callback();
  }
}

export default Secret;
