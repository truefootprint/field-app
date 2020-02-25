import submitContent from "../../app/workflows/submit_content";
import pushData from "../../app/workflows/push_data";
import Content from "../../app/models/content";
import Image from "../../app/models/image";
import uploadPhoto from "../../app/workflows/upload_photo";

jest.mock("../../app/workflows/push_data");
jest.mock("../../app/workflows/upload_photo");

describe("submitContent", () => {
  const subject = { type: "Issue", id: 123 }

  it("creates a content record", async () => {
    await submitContent({ text: "text", images: [], subject });
    const contents = await Content.findAll();

    expect(contents.length).toBe(1);

    expect(contents[0].subjectType).toBe("Issue");
    expect(contents[0].subjectId).toBe(123);
    expect(contents[0].text).toBe("text");
    expect(contents[0].photosJson).toBe("[]");
  });

  it("updates the content if it already exists", async () => {
    await Content.create({ subjectType: "Issue", subjectId: 123, text: "text" });

    await submitContent({ text: "updated text", images: [], subject });
    const contents = await Content.findAll();

    expect(contents.length).toBe(1);
    expect(contents[0].text).toBe("updated text");
  });

  it("does not update content if it is already pushed", async () => {
    await Content.create({ subjectType: "Issue", subjectId: 123, text: "text", pushed: true });

    await submitContent({ text: "new text", images: [], subject });
    const contents = await Content.findAll();

    expect(contents.length).toBe(2);
    expect(contents[0].text).toBe("text");
    expect(contents[1].text).toBe("new text");
  });

  it("calls the pushData workflow if there is a connection", async () => {
    await submitContent({ text: "text", images: [], subject, connected: false });
    expect(pushData).not.toHaveBeenCalled();

    await submitContent({ text: "text", images: [], subject, connected: true });
    expect(pushData).toHaveBeenCalled();
  });

  it("returns the content record", async () => {
    const content = await submitContent({ text: "text", images: [], subject });

    expect(content.text).toBe("text");
  });

  it("calls the callback with the contenet", async () => {
    const callback = jest.fn();
    const content = await submitContent({ text: "text", images: [], subject, callback });

    expect(callback).lastCalledWith(content);
  });

  describe("when the subject type is a composite", () => {
    const subject = { type: ["Question", "Issue"], id: 123 };

    it("joins the array into a string", async () => {
      await submitContent({ text: "text", images: [], subject });
      const content = await Content.findOne();

      expect(content.subjectType).toBe("Question,Issue");
    });
  });

  describe("when there are images", () => {
    it("creates image records", async () => {
      await submitContent({ text: "text", images: [{ uri: "image.jpg" }], subject });
      const images = await Image.findAll();

      expect(images.length).toBe(1);
      expect(images[0].filename).toBe("image.jpg");
    });

    it("does not create an image if it already exists", async () => {
      await Image.create({ filename: "image.jpg" });

      await submitContent({ text: "text", images: [{ uri: "image.jpg" }], subject });
      const images = await Image.findAll();

      expect(images.length).toBe(1);
      expect(images[0].filename).toBe("image.jpg");
    });

    it("calls the uploadPhoto workflow when connected", async () => {
      await submitContent({
        text: "text", images: [{ uri: "image.jpg" }], subject, connected: true,
      });

      const image = await Image.findOne();
      expect(uploadPhoto).lastCalledWith(image.id);
    });

    it("does not call uploadPhoto when not connected", async () => {
      await submitContent({
        text: "text", images: [{ uri: "image.jpg" }], subject, connected: false,
      });

      expect(uploadPhoto).not.toHaveBeenCalled();
    });
  });
});
