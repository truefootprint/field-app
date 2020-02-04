import Attachment from "../models/attachment";
import Download from "../helpers/download";

const downloadFile = async (attachmentId) => {
  if (Download.inProgress()) return false;

  const attachment = await Attachment.findOne({ where: { id: attachmentId } });
  if (!attachment || attachment.pulled) return false;

  const success = await Download.start(attachment.url, attachment.filename);
  if (success) await attachment.update({ pulled: true });

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

export default downloadFile;
export { downloadRandomFile };
