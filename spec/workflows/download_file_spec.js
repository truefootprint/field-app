import downloadFile, { downloadRandomFile } from "../../app/workflows/download_file";
import Attachment from "../../app/models/attachment";
import Download from "../../app/helpers/download";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/download");
jest.mock("../../app/helpers/file");

describe("downloadFile", () => {
  const url = "http://example.com/contract.pdf";

  it("downloads a file attachment from the backend", async () => {
    const attachment = await Attachment.create({ url, md5: "md5" });
    await downloadFile(attachment.id);

    expect(Download.start).lastCalledWith(url, "md5.pdf");
  });

  it("updates attachments to 'pulled' if the download succeeds", async () => {
    Download.start.mockResolvedValue(true);

    let attachment = await Attachment.create({ url, md5: "md5" });
    await downloadFile(attachment.id);

    attachment = await Attachment.findOne();
    expect(attachment.pulled).toBe(true);
  });

  it("does not update 'pulled' if the download failed or was paused", async () => {
    Download.start.mockResolvedValue(false);

    let attachment = await Attachment.create({ url, md5: "md5" });
    await downloadFile(attachment.id);

    attachment = await Attachment.findOne();
    expect(attachment.pulled).toBe(false);
  });

  it("does not try to download a file if there's a download in progress", async () => {
    Download.inProgress.mockReturnValue(true);

    const attachment = await Attachment.create({ url, md5: "md5" });
    await downloadFile(attachment.id);

    expect(Download.start).not.toHaveBeenCalled();
  });

  it("does not try to download a file that is already downloaded", async () => {
    const attachment = await Attachment.create({ url, md5: "md5", pulled: true });
    await downloadFile(attachment.id);

    expect(Download.start).not.toHaveBeenCalled();
  });

  // This could happen if myData references an image that was uploaded by the
  // user, e.g. an issue or a resolution.
  it("does not download the file if it's already on the device", async () => {
    File.exists.mockResolvedValue(true);

    const attachment = await Attachment.create({ url, md5: "md5" });
    await downloadFile(attachment.id);

    expect(Download.start).not.toHaveBeenCalled();
    expect(File.exists).lastCalledWith("md5.pdf");

    await attachment.reload();
    expect(attachment.pulled).toBe(true);
  });

  it("returns whether the download was successful", async () => {
    Download.start.mockResolvedValue(true);
    const attachment = await Attachment.create({ url, md5: "md5" });
    const result = await downloadFile(attachment.id);
    expect(result).toBe(true);

    const failedResult = await downloadFile(attachment.id);
    expect(failedResult).toBe(false); // The attachment is already downloaded.
  });

  describe("downloadRandomFile", () => {
    it("downloads a random file that hasn't been pulled", async () => {
      Download.start.mockResolvedValue(true);

      const pulled = await Attachment.create({ url, md5: "first", pulled: true });
      const notPulled = await Attachment.create({ url, md5: "second" });

      expect(await downloadRandomFile()).toBe(true);
      expect(Download.start).lastCalledWith(url, "second.pdf");

      expect(await downloadRandomFile()).toBe(false);
    });
  });
});
