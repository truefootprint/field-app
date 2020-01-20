import Client from "../helpers/client";
import Image from "../models/image";
import ImagePresenter from "../presenters/image_presenter";
import File from "../helpers/file";

const uploadPhoto = async (imageId) => {
  const image = await ImagePresenter.presentOne({ id: imageId });
  if (!image || image.pushed) return false;

  const existsOnDevice = await File.exists(image.name);
  if (!existsOnDevice) { await setPushed(image); return false; }

  const existsOnServer = (await new Client().getPhotoExists(image)).exists;
  if (existsOnServer) { await setPushed(image); return false; }

  await new Client().postMyPhotos(image);
  await setPushed(image);

  return true;
};

const uploadRandomPhoto = async () => {
  const image = await Image.findOne({
    where: { pushed: false },
    order: sequelize.random(),
    attributes: ["id"],
  });

  if (image) {
    await uploadPhoto(image.id);
    return true;
  } else {
    return false;
  }
};

const setPushed = async (image) => {
  await Image.update({ pushed: true }, { where: { id: image.localId } });
};

export default uploadPhoto;
export { uploadRandomPhoto };
