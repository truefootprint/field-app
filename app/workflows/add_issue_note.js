import IssueNote from "../models/issue_note";
import Image from "../models/image";
import pushData from "./push_data";
import uploadPhoto from "./upload_photo";

const addIssueNote = async ({ connected, subjectType, subjectId, issue, text, photos, resolved, callback=()=>{} }) => {
  photos = [photos].flat().filter(p => p);
  const imagesToUpload = [];

  // Guard against the user submitting an issue note with no content.
  if (isBlank(text) && photos.length === 0 && !resolved) return;

  for (const image of photos) {
      const filename = File.basename(image.uri);
      const [record, _] = await Image.findOrCreate({ where: { filename } });

      if (!record.pushed) imagesToUpload.push(record);
  }

  const issueNote = await IssueNote.create({
    issueUuid: issue ? issue.uuid : await uuid(),
    subjectType,
    subjectId,
    text,
    photosJson: JSON.stringify(photos),
    resolved,
  });

  if (connected) {
    await pushData();

    for (const image of imagesToUpload) {
      await uploadPhoto(image.id);
    };
  }

  await callback(issueNote);
  return issueNote;
};

const isBlank = (string) => (
  !string || /^\s*$/.test(string)
);

export default addIssueNote;
