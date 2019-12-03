import Image from "react-native-fullwidth-image"
import ImagePicker from "../image_picker";
import styles from "./styles.js";

const ImageInput = ({ color, onChange=()=>{} }) => {
  const [images, setImages] = useState([]);

  const handlePick = (image) => {
    const newImages = [...images, image];

    setImages(newImages);
    onChange(newImages);
  };

  return (
    <View>
      {images.map((image, i) => (
        <Image source={image} key={i} {...className("image", styles)} />
      ))}

      <ImagePicker onPick={handlePick} color={color} {...className("picker")} />
    </View>
  );
};

export default ImageInput;
