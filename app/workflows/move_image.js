import File from "../helpers/file";

const moveImageToDocumentStorage = async (image) => {
  const uri = image.uri;
  if (File.hasDocumentsPath(uri)) return;

  const fingerprint = await File.fingerprint(uri);
  const extension = File.extension(uri);
  const newFilename = `${fingerprint}.${extension}`;

  image.uri = File.path(newFilename);

  if (await File.exists(newFilename)) {
    await File.remove(uri);
  } else {
    await File.move(uri, newFilename);
    return true;
  }
};

export default moveImageToDocumentStorage;
