import * as Picker from "expo-image-picker";
import Lightbox from "../lightbox";
import Menu from "../menu";
import styles from "./styles.js";

const options = { exif: true };

const ImagePicker = ({ color="blue", text, icon, onPick=()=>{} }) => {
  const [visible, setVisible] = useState(false);
  const t = useTranslate();

  const handlePick = (result) => {
    const { cancelled, uri, width, height, exif } = result;

    if (!cancelled) {
      onPick({ uri, width, height, exif });
    }
  };

  const handleMenu = async (_, index) => {
    setVisible(false);

    if (index === 0) handlePick(await Picker.launchCameraAsync(options));
    if (index === 1) handlePick(await Picker.launchImageLibraryAsync(options));
  };

  return (
    <View {...className("image_picker", styles(color))}>
      {text && <Text {...className("text")}>{text}</Text>}

      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.8}>
        {icon ? icon : (
          <View {...className("rectangle")}>
            <View {...className("circle")}>
              <Text {...className("plus")}>+</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <Lightbox visible={visible} onDismiss={() => setVisible(false)}>
        <Menu onSelect={handleMenu}>
          <Text {...className("menu_item")}>{t.photo.take}</Text>
          <Text {...className("menu_item")}>{t.photo.choose}</Text>
          <Text {...className("menu_item")}>{t.cancel}</Text>
        </Menu>
      </Lightbox>
    </View>
  );
};

export default ImagePicker;
