import Image from "../../app/models/image";

describe("Image", () => {
  it("can persist images", async () => {
    await Image.create({ filename: "image.jpg" });
    const images = await Image.findAll();

    expect(images.length).toBe(1);

    expect(images[0].filename).toBe("image.jpg");
    expect(images[0].pushed).toBe(false);
  });
});
