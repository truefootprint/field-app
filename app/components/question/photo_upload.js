import ImageInput from "../image_input";

const PhotoUpload = ({ color="blue", response, onAnswer=()=>{} }) => {
  // TODO: use the response.photos field instead of value (need to change backend)
  const defaultImages = response ? JSON.parse(response.value) : [];

  const handleChange = (images) => {
    onAnswer(JSON.stringify(images));
  };

  return (
    <ImageInput color={color} defaultImages={defaultImages} onChange={handleChange} />
  );
};

export default PhotoUpload;
