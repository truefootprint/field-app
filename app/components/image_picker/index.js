import * as Picker from "expo-image-picker";
import Lightbox from "../lightbox";
import Menu from "../menu";
import styles from "./styles.js";

const options = { exif: true };

const ImagePicker = ({ color="blue", onPick=()=>{} }) => {
  const [visible, setVisible] = useState(false);

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
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.8}>
        <View {...className("rectangle", styles(color))}>
          <View {...className("circle")}>
            <Text {...className("plus")}>+</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Lightbox visible={visible} onDismiss={() => setVisible(false)}>
        <Menu onSelect={handleMenu}>
          <Text {...className("menu_item")}>Take photo</Text>
          <Text {...className("menu_item")}>Choose from library</Text>
          <Text {...className("menu_item")}>Cancel</Text>
        </Menu>
      </Lightbox>
    </View>
  );
};

export default ImagePicker;
