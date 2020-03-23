import * as Localization from "expo-localization";

const useLocale = () => {
  const [object, setObject] = useState({});

  useForeground(async () => {
    const { locale, timezone } = await Localization.getLocalizationAsync();

    setObject({ locale, timezone });
  });

  return object;
};

export default useLocale;
