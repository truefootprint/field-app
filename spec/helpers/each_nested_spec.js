import Attachment from "../../app/models/attachment";

describe("eachNested", () => {
  it("iterates over a nested object/array", async () => {
    const object = { some: { nested: [{ object: 123 }] } };

    await eachNested(object, async o => {
      if (typeof o === "number") {
        await Attachment.create({ md5: "md5", url: "url" });
      }
    });

    expect(await Attachment.count()).toBe(1);
  });
});
