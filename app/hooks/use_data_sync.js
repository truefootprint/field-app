import useForeground from "./use_foreground";
import useWifi from "./use_wifi";

// Call onSync when the app is foregrounded or when the wifi status changes.
// The callback can change its behaviour depending on whether it is connected.

const useDataSync = (onSync) => {
  const connected = useWifi();
  const foreground = useForeground();

  const sync = async () => {
    if (foreground) {
      await onSync(connected);
    }
  };

  useEffect(() => { sync(); }, [connected, foreground]);

  return [connected, foreground];
};

export default useDataSync;
