import { ScrollView } from "react-native-gesture-handler";
import Layout from "../components/layout";
import Button from "../components/button";
import { Phone, ArrowRight, Exclamation } from "../components/svg_icon";
import { ListItem, CheckBox } from "react-native-elements";
import { useEffect } from "react";

const LanguageSelection = ({ navigation }) => {
  const [data, setData] = useState(<Text>Nothing</Text>);
  const [dataHere, setDataHere] = useState(false);
  const [locales, setLocales] = useState([]);
  const { locale, timezone } = useLocale();
  const [checked, setChecked] = useState(locale);
  

  useEffect(() => {
    initialItemListRender();
    //andleSubmit();
  }, []);

  const initialItemListRender = async () => {
    let res = await new Client().getSupportedLanguages();
    setLocales(res);
    renderItemList(res);
  };

  useEffect(() => {
    renderItemList(locales);
  }, [checked]);

  const handleCheckBoxPress = (locale) => {
    setChecked(locale);
  };

  const renderItemList = (locales) => {
    let lang = Object.keys(locales).sort().map((lang_name) => (
      <ListItem key={locales[lang_name]} bottomDivider 
      onPress={() => handleCheckBoxPress(locales[lang_name])}>
        <CheckBox
          onPress={() => handleCheckBoxPress(locales[lang_name])}
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={locales[lang_name] == checked}
        />
        <ListItem.Content>
          <ListItem.Title>{lang_name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));
    setData(lang);
  };

  const handlePress = async () => {
    //let res = await new Client().submitLocale(checked);
    //useWhen([locale, timezone], async () => {
      useTranslate.setLocale(checked);
      Client.setLocale(checked);
      //Client.setTimezone(timezone);
    //});
   
    navigation.navigate("Login");
  };

  return (
    <Layout>
      <ScrollView>
        {data}
      </ScrollView>
      <Button
        color={"blue"}
        icon={<ArrowRight color="white" />}
        onPress={() => handlePress()}
      />
    </Layout>
  );
};

export default LanguageSelection;
