import uploadPhoto from "../../app/workflows/upload_photo";
import Image from "../../app/models/image";
import Client from "../../app/helpers/client";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/client");
jest.mock("../../app/helpers/file");

describe("uploadPhoto", () => {
  let myPhotos;

  beforeEach(() => {
    myPhotos = jest.fn();
    Client.mockImplementation(() => ({ myPhotos }));

    Image.create({ id: 1, filename: "image.jpg" });

    File.path.mockReturnValue("/documents/image.jpg");
    File.extension.mockReturnValue("jpg");
  });

  it("uploads a photo to the backend", async () => {
    await uploadPhoto();

    expect(myPhotos).lastCalledWith({
      localId: 1,
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

    await uploadPhoto();

    image = await Image.findOne();
    expect(image.pushed).toBe(true);
  });

  it("does not update 'pushed' if the API request fails", async () => {
    Client.mockImplementation(() => ({
      myPhotos: () => { throw new Error("API request failed"); }
    }));

    try { await uploadPhoto(); } catch {}

    const image = await Image.findOne();
    expect(image.pushed).toBe(false);
  });

  it("does not make an API request if there is no image to push", async () => {
    expect(myPhotos.mock.calls.length).toBe(0);

    await uploadPhoto();
    expect(myPhotos.mock.calls.length).toBe(1);

    await uploadPhoto();
    expect(myPhotos.mock.calls.length).toBe(1);
  });

  it("returns whether the image was pushed to the backend", async () => {
    expect(await uploadPhoto()).toBe(true);
    expect(await uploadPhoto()).toBe(false);
    expect(await uploadPhoto()).toBe(false);

    Image.create({ id: 2, filename: "another-image.jpg" });

    expect(await uploadPhoto()).toBe(true);
    expect(await uploadPhoto()).toBe(false);
  });
});
