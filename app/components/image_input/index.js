import moveImageToDocumentStorage from "../../workflows/move_image";
import Image from "../image";
import ImagePicker from "../image_picker";
import styles from "./styles.js";

const ImageInput = ({ color, placeholder, defaultImages=[], onChange=()=>{} }) => {
  const [images, setImages] = useState(defaultImages);

  const handlePick = async (image) => {
    await moveImageToDocumentStorage(image);
    const newImages = [...images, image];

    setImages(newImages);
    onChange(newImages);
  };

  const imageClasses = (i) => (["image", i === images.length - 1 && "last_child"]);

  return (
    <View>
      {images.map((image, i) => (
        <Image source={image} key={i} {...className(imageClasses(i), styles)} />
      ))}

      <ImagePicker text={placeholder} onPick={handlePick} color={color} {...className("picker")} />
    </View>
  );
};

export default ImageInput;
