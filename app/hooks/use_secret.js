import * as SecureStore from "expo-secure-store";

const useSecret = (key, onMiss=()=>{}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    get(key, v => v ? setValue(v) : onMiss());
  }, []);

  const setSecret = (value) => {
    set(key, value, v => setValue(v));
  };

  return [value, setSecret];
};

const get = async (key, callback) => {
  const value = await SecureStore.getItemAsync(key);
  await callback(value);
};

const set = async (key, value, callback) => {
  await SecureStore.setItemAsync(key, value);
  await callback(value);
};

export default useSecret;
