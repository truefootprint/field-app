import pullData, { createAttachments } from "../../app/workflows/pull_data";
import File from "../../app/helpers/file";
import Client from "../../app/helpers/client";
import Response from "../../app/models/response";
import Content from "../../app/models/content";
import Attachment from "../../app/models/attachment";

jest.mock("../../app/helpers/file");
jest.mock("../../app/helpers/client");

describe("pullData", () => {
  let data;

  it("pulls myData from the cache and passes it to the callback", async () => {
    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ cached: "data" });

    await pullData({ callback: d => { data = d; } });

    expect(data).toEqual({ cached: "data" });
  });

  it("returns false when using the cache to indicate no fetch occured", async () => {
    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ cached: "data" });

    expect(await pullData()).toBe(false);
  });

  it("uses 'my_data.json' as the cache file", async () => {
    await pullData();

    expect(File.exists).lastCalledWith("my_data.json");
  });

  it("combines myData with responses from the local database", async () => {
    await Response.create({ questionId: 1, value: "answer" });

    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ id: 1, responses: [], issues: [] });

    await pullData({ callback: d => { data = d; } });

    expect(data.responses.length).toBe(1);
    expect(data.responses[0]).toMatchObject({ projectQuestionId: 1, value: "answer" });
  });

  it("combines myData with content from the local database", async () => {
    await Content.create({ subjectType: "Issue", subjectId: 123, text: "text" });
    const issue = { id: 123, versionedContent: {}, resolutions: [] };

    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ id: 1, responses: [], issues: [issue] });

    await pullData({ callback: d => { data = d; } });

    expect(data.issues[0].versionedContent).toMatchObject({ text: "text" });
  });

  describe("when myData is not in the cache", () => {
    beforeEach(() => {
      Client.mockImplementation(() => ({
        getMyData: () => ({ id: 1, responses: [], issues: [] }),
      }));
    });

    it("fetches myData from the backend", async () => {
      await pullData({ callback: d => { data = d; } });
      expect(data).toEqual({ id: 1, responses: [], issues: [] });
    });

    it("returns true to indicate that data was fetched", async () => {
      expect(await pullData()).toBe(true);
    });

    it("does not fetch data from the backend when not on wifi", async () => {
      await pullData({ connected: false, callback: d => { data = d; } });
      expect(data).toBeUndefined();
    });

    it("returns false when not on wifi to indicate no fetch occurred", async () => {
      expect(await pullData({ connected: false })).toBe(false);
    });

    it("deletes pushed responses after fetching", async () => {
      await Response.create({ questionId: 1, value: "answer", pushed: false });
      await Response.create({ questionId: 2, value: "answer", pushed: true });

      await pullData();
      const responses = await Response.findAll();

      expect(responses.length).toBe(1);
      expect(responses[0].pushed).toBe(false);
    });

    it("creates attachments after fetching", async () => {
      Client.mockImplementation(() => ({
        getMyData: () => ({ md5: "md5-fingerprint", url: "file-server-location" }),
      }));

      await pullData();
      const attachments = await Attachment.findAll();

      expect(attachments.length).toBe(1);
      expect(attachments[0].pulled).toBe(false);
    });

    it("does not delete pushed responses if no fetch occurs", async () => {
      await Response.create({ questionId: 1, value: "answer", pushed: false });
      await Response.create({ questionId: 2, value: "answer", pushed: true });

      await pullData({ connected: false });
      const responses = await Response.findAll();

      expect(responses.length).toBe(2);
    });

    it("does not include deleted responses in the combined data", async () => {
      await Response.create({ questionId: 1, value: "answer", pushed: true });

      await pullData({ callback: d => { data = d; } });
      expect(data.responses.length).toBe(0);
    });
  });
});

describe("createAttachments", () => {
  it("creates attachment records for files referenced in the data", async () => {
    const myData = { md5: "md5-fingerprint", url: "file-server-location" };
    await createAttachments(myData);

    const attachments = await Attachment.findAll();
    expect(attachments.length).toBe(1);

    expect(attachments[0].md5).toBe("md5-fingerprint");
    expect(attachments[0].url).toBe("file-server-location");
    expect(attachments[0].pulled).toBe(false);
  });

  it("updates the record's url if it has changed in the data", async () => {
    await Attachment.create({ md5: "md5-fingerprint", url: "old-url" });

    const myData = { md5: "md5-fingerprint", url: "new-url" };
    await createAttachments(myData);

    const attachments = await Attachment.findAll();
    expect(attachments.length).toBe(1);

    expect(attachments[0].url).toBe("new-url");
  });

  // This could happen if myData references an image that was uploaded by the
  // user, e.g. an issue or a resolution.
  it("sets 'pulled' to true if the file already exists on the device", async () => {
    File.exists.mockResolvedValue(true);

    const myData = { md5: "md5-fingerprint", url: "url.pdf" };
    await createAttachments(myData);

    const attachments = await Attachment.findAll();
    expect(attachments.length).toBe(1);

    expect(attachments[0].pulled).toBe(true);
    expect(File.exists).lastCalledWith("md5-fingerprint.pdf");
  });
});
