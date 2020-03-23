import Image from "../image";
import Lightbox from "../lightbox";
import Menu from "../menu";
import styles from "./styles.js";

const ImageRemover = ({ color="blue", image, onRemove=()=>{} }) => {
  const [visible, setVisible] = useState(false);
  const t = useTranslate();

  const handleMenu = async (_, index) => {
    setVisible(false);

    if (index === 0) onRemove(image);
  };

  return (
    <View {...className("image_remover", styles)}>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.8}>
        <Image color={color} source={image} {...className("image")} />
      </TouchableOpacity>

      <Lightbox visible={visible} onDismiss={() => setVisible(false)}>
        <Menu onSelect={handleMenu}>
          <Text {...className("menu_item")}>{t.photo.remove}</Text>
          <Text {...className("menu_item")}>{t.cancel}</Text>
        </Menu>
      </Lightbox>
    </View>
  )
};

export default ImageRemover;
