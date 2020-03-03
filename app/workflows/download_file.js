import Attachment from "../models/attachment";
import Download from "../helpers/download";
import File from "../helpers/file";

const downloadFile = async (attachmentId) => {
  if (Download.inProgress()) return false;

  const attachment = await Attachment.findOne({ where: { id: attachmentId } });
  if (!attachment || attachment.pulled) return false;

  const existsOnDevice = await File.exists(attachment.filename);
  if (existsOnDevice) { await setPulled(attachment); return false; }

  if (Download.inProgress()) return false; // Check again, just in case.

  const success = await Download.start(attachment.url, attachment.filename);
  if (success) await setPulled(attachment);

  return success;
};

const downloadRandomFile = async () => {
  const attachment = await Attachment.findOne({
    where: { pulled: false },
    order: sequelize.random(),
    attributes: ["id"],
  });

  if (attachment) {
    return await downloadFile(attachment.id);
  } else {
    return false;
  }
}

const setPulled = async (attachment) => {
  await attachment.update({ pulled: true });
};

export default downloadFile;
export { downloadRandomFile };
