import { BackHandler } from "react-native";

// Overrides the default back button behaviour on android with a custom function.

const useBack = (onBack=()=>{}) => {
  useEffect(() => {
    const listener = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });

    return listener.remove;
  }, []);
};

export default useBack;
