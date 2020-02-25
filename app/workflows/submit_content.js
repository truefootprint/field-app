import Content from "../models/content";
import Image from "../models/image";
import pushData from "./push_data";
import uploadPhoto from "./upload_photo";

const submitContent = async ({ connected, subject, text, images=[], parent={}, callback=()=>{} }) => {
  const imagesToUpload = [];

  for (const image of images) {
      const filename = File.basename(image.uri);
      const [record, _] = await Image.findOrCreate({ where: { filename } });

      if (!record.pushed) imagesToUpload.push(record);
  }

  const subjectType = [subject.type].flat().join(",");
  const photosJson = JSON.stringify(images);

  const content = await createOrUpdate(Content, {
    where: {
      subjectType,
      subjectId: subject.id,
      pushed: false,
    },
    attributes: {
      subjectType,
      subjectId: subject.id,
      text, photosJson,
      parentId: parent.id,
    },
  });

  if (connected) {
    await pushData();

    for (let image of imagesToUpload) {
      await uploadPhoto(image.id);
    };
  }

  await callback(content);
  return content;
};

export default submitContent;
