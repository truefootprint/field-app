import Client from "../helpers/client";
import Image from "../models/image";
import ImagePresenter from "../presenters/image_presenter";

const uploadPhoto = async (imageId) => {
  const image = await ImagePresenter.presentOne({ id: imageId });
  if (!image || image.pushed) return false;

  const { exists } = await new Client().getPhotoExists(image);

  if (!exists) await new Client().postMyPhotos(image);
  await Image.update({ pushed: true }, { where: { id: image.localId } });

  return !exists;
};

const uploadRandomPhoto = async () => {
  const image = await Image.findOne({
    where: { pushed: false },
    order: sequelize.random(),
    attributes: ["id"],
  });

  return image ? await uploadPhoto(image.id) : false;
};

export default uploadPhoto;
export { uploadRandomPhoto };
