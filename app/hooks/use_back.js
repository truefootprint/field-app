import { BackHandler } from "react-native";

// Overrides the default back button behaviour on android with a custom function.

const useBack = (onBack=()=>{}, dependencies=[]) => {
  useEffect(() => {
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });

    return listener.remove;
  }, dependencies);
};

export default useBack;
