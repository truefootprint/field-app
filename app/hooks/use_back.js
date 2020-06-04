import { BackHandler } from "react-native";

// Overrides the default back button behaviour on android with a custom function.

const useBack = (navigation, onBack=()=>{}, dependencies=[]) => {
  const handleBack = () => {
    if (!navigation.isFocused()) return false;

    onBack();
    return true;
  };

  useEffect(() => {
    const listener = BackHandler.addEventListener("hardwareBackPress", handleBack);

    return () => BackHandler.removeEventListener("hardwareBackPress", listener);
  }, dependencies);
};

export default useBack;
