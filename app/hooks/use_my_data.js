import useForeground from "./use_foreground";
import useWifi from "./use_wifi";
import FileCache from "../helpers/file_cache";

// We probably shouldn't use this component more than once and instead pass
// myData down from the root of the app to the components that need it.

const useMyData = ({ force } = {}) => {
  const [myData, setMyData] = useState();
  const connected = useWifi();
  const foreground = useForeground();

  const fetch = async () => {
    if (!foreground) return;

    const onMiss = () => connected && new Client().myData();
    const maxAge = force ? 0 : undefined;
    const data = await FileCache.fetch("my_data.json", { onMiss, maxAge, type: "object" });

    setMyData(data);
  };

  useEffect(() => { fetch(); }, [connected, foreground]);

  return myData;
};

export default useMyData;
