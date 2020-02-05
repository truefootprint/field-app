import Attachment from "../../app/models/attachment";

describe("Attachment", () => {
  it("can persist attachments", async () => {
    await Attachment.create({ md5: "md5-fingerprint", url: "some-url" });
    const attachments = await Attachment.findAll();

    expect(attachments.length).toBe(1);

    expect(attachments[0].md5).toBe("md5-fingerprint");
    expect(attachments[0].url).toBe("some-url");
    expect(attachments[0].pulled).toBe(false);
  });
});
