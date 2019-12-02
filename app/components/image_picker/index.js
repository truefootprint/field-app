import Lightbox from "../lightbox";
import Menu from "../menu";
import styles from "./styles.js";

const ImagePicker = ({ color="blue" }) => {
  const [visible, setVisible] = useState(false);

  const takePhoto = () => {
    alert("take photo");
  };

  const choosePhoto = () => {
    alert("choose photo");
  };

  const handleMenu = (_, index) => {
    setVisible(false);

    if (index === 0) takePhoto();
    if (index === 1) choosePhoto();
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
