import Attachment from "../models/attachment";
import Download from "../helpers/download";

const downloadFile = async (attachmentId) => {
  if (Download.inProgress()) return false;

  const attachment = await Attachment.findOne({ where: { id: attachmentId } });
  if (!attachment || attachment.pulled) return false;

  const extension = File.extension(attachment.url);
  const filename = `${attachment.md5}.${extension}`;

  const success = await Download.start(attachment.url, filename);
  if (success) await attachment.update({ pulled: true });

  return success;
};

export default downloadFile;
