import Image from "react-native-fullwidth-image"
import ImagePicker from "../image_picker";
import styles from "./styles.js";

const ImageInput = ({ color, defaultImages=[], onChange=()=>{} }) => {
  const [images, setImages] = useState(defaultImages);

  const handlePick = (image) => {
    const newImages = [...images, image];

    setImages(newImages);
    onChange(newImages);
  };

  const imageClasses = (i) => (
    ["image", i === images.length - 1 && "last_child"]
  );

  return (
    <View>
      {images.map((image, i) => (
        <Image source={image} key={i} {...className(imageClasses(i), styles)} />
      ))}

      <ImagePicker onPick={handlePick} color={color} {...className("picker")} />
    </View>
  );
};

export default ImageInput;
