import uploadPhoto, { uploadRandomPhoto } from "../../app/workflows/upload_photo";
import Image from "../../app/models/image";
import Client from "../../app/helpers/client";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/client");
jest.mock("../../app/helpers/file");

describe("uploadPhoto", () => {
  const imageId = 123;
  let getPhotoExists, postMyPhotos;

  beforeEach(async () => {
    postMyPhotos = jest.fn();
    getPhotoExists = () => ({ exists: false });
    Client.mockImplementation(() => ({ postMyPhotos, getPhotoExists }));

    await Image.create({ id: imageId, filename: "image.jpg" });

    File.path.mockReturnValue("/documents/image.jpg");
    File.extension.mockReturnValue("jpg");
  });

  it("uploads a photo to the backend", async () => {
    await uploadPhoto(imageId);

    expect(postMyPhotos).lastCalledWith({
      localId: 123,
      uri: "/documents/image.jpg",
      name: "image.jpg",
      type: "image/jpeg",
      pushed: false,
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
    });
  });

  it("updates 'pushed' in the database after pushing the photo", async () => {
    let image = await Image.findOne();
    expect(image.pushed).toBe(false);

    await uploadPhoto(imageId);

    image = await Image.findOne();
    expect(image.pushed).toBe(true);
  });

  it("does not update 'pushed' if the API request fails", async () => {
    Client.mockImplementation(() => ({
      postMyPhotos: () => { throw new Error("API request failed"); }
    }));

    try { await uploadPhoto(imageId); } catch {}

    const image = await Image.findOne();
    expect(image.pushed).toBe(false);
  });

  it("does not make an API request if the image is already pushed", async () => {
    expect(postMyPhotos.mock.calls.length).toBe(0);

    await uploadPhoto(imageId);
    expect(postMyPhotos.mock.calls.length).toBe(1);

    await uploadPhoto(imageId);
    expect(postMyPhotos.mock.calls.length).toBe(1);
  });

  it("returns whether the image was pushed to the backend", async () => {
    expect(await uploadPhoto(imageId)).toBe(true);
    expect(await uploadPhoto(imageId)).toBe(false);
    expect(await uploadPhoto(imageId)).toBe(false);

    await Image.create({ id: 456, filename: "another-image.jpg" });

    expect(await uploadPhoto(456)).toBe(true);
    expect(await uploadPhoto(456)).toBe(false);
  });

  // This could happen if the user pushes the same image from another device or
  // if they re-install the app and their local database is wiped.
  it("does not push the image if it's already on the server", async () => {
    getPhotoExists = () => ({ exists: true });
    Client.mockImplementation(() => ({ postMyPhotos, getPhotoExists }));

    expect(postMyPhotos.mock.calls.length).toBe(0);
    expect(await uploadPhoto(imageId)).toBe(false);

    const image = await Image.findOne();
    expect(image.pushed).toBe(true);
  });

  describe("uploadRandomPhoto", () => {
    it("uploads a random photo that hasn't been pushed", async () => {
      await Image.create({ id: 456, filename: "another-image.jpg", pushed: true });

      expect(await uploadRandomPhoto()).toBe(true);
      expect(postMyPhotos.mock.calls[0][0].localId).toBe(123);

      expect(await uploadRandomPhoto()).toBe(false);
    });
  });
});
