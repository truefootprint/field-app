import ImagePresenter from "../../app/presenters/image_presenter";
import Image from "../../app/models/image";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/file");

describe("ImagePresenter", () => {
  it("presents the image in a way that's compatible with formData file uploads", async () => {
    File.path.mockReturnValue("/documents/image.jpg");

    const image = await Image.create({ id: 1, filename: "image.jpg" });
    const presented = await ImagePresenter.presentElement(image);

    // This field is renamed to avoid confusion with backend ids.
    expect(presented.localId).toBe(1);

    // These fields match an <input type='file'> element.
    expect(presented.uri).toBe("/documents/image.jpg");
    expect(presented.name).toBe("image.jpg");
    expect(presented.type).toBe("image/jpeg");

    expect(File.path).lastCalledWith("image.jpg");
  });
});
