import moveImageToDocumentStorage from "../../app/workflows/move_image";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/file");

describe("moveImageToDocumentStorage", () => {
  it("moves the image and names it after its fingerprint", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");

    await moveImageToDocumentStorage({ uri: "image.jpg" });

    expect(File.fingerprint).lastCalledWith("image.jpg");
    expect(File.extension).lastCalledWith("image.jpg");
    expect(File.move).lastCalledWith("image.jpg", "md5-fingerprint.jpg");
  });

  it("does not move the image if it's already in documents", async () => {
    File.hasDocumentsPath.mockReturnValue(true);

    await moveImageToDocumentStorage({ uri: "image.jpg" });

    expect(File.hasDocumentsPath).lastCalledWith("image.jpg");
    expect(File.move).not.toHaveBeenCalled();
  });

  it("updates the uri to point to the moved file", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");
    File.path.mockReturnValue("documents/md5-fingerprint.jpg");

    const image = { uri: "image.jpg" };
    await moveImageToDocumentStorage(image);

    expect(File.path).lastCalledWith("md5-fingerprint.jpg");
    expect(image.uri).toBe("documents/md5-fingerprint.jpg");
  });

  it("removes the file if it's a duplicate of a moved image", async () => {
    File.fingerprint.mockResolvedValue("md5-fingerprint");
    File.extension.mockReturnValue("jpg");
    File.exists.mockResolvedValue(true);

    await moveImageToDocumentStorage({ uri: "image.jpg" });

    expect(File.exists).lastCalledWith("md5-fingerprint.jpg");
    expect(File.remove).lastCalledWith("image.jpg");
  });

  it("updates the uri to point to the duplicate image file", async () => {
    File.exists.mockResolvedValue(true);
    File.path.mockReturnValue("documents/md5-fingerprint.jpg");

    const image = { uri: "image.jpg" };
    await moveImageToDocumentStorage(image);

    expect(image.uri).toBe("documents/md5-fingerprint.jpg");
  });

  it("returns true if the file was moved", async () => {
    const move = moveImageToDocumentStorage;

    File.hasDocumentsPath.mockReturnValue(true);
    expect(await move({ uri: "image.jpg" })).toBeFalsy();

    File.hasDocumentsPath.mockReturnValue(false);
    expect(await move({ uri: "image.jpg" })).toBe(true);

    File.exists.mockReturnValue(true);
    expect(await move({ uri: "image.jpg" })).toBeFalsy();
  });
});
