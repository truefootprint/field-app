import PhotoUploadTask from "../../app/tasks/photo_upload_task";
import uploadPhoto from "../../app/workflows/upload_photo";
import hasWifi from "../../app/helpers/has_wifi";

jest.mock("../../app/workflows/upload_photo");
jest.mock("../../app/helpers/has_wifi");

describe("PhotoUploadTask", () => {
  beforeEach(() => {
    hasWifi.mockResolvedValue(true);
  });

  it("uploads photos", async () => {
    await PhotoUploadTask.run();

    expect(uploadPhoto).toHaveBeenCalled();
  });

  it("does not upload photos if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    await PhotoUploadTask.run();

    expect(uploadPhoto).not.toHaveBeenCalled();
  });

  it("returns false if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    expect(await PhotoUploadTask.run()).toBe(false);
  });

  it("returns whether photos were uploaded", async () => {
    uploadPhoto.mockResolvedValueOnce(true);

    expect(await PhotoUploadTask.run()).toBe(true);
    expect(await PhotoUploadTask.run()).toBe(false);
  });

  describe("runWith", () => {
    beforeEach(() => {
      uploadPhoto.mockImplementation(async () => {
        await sleep(100);
        return true;
      });
    });

    it("uploads at least one photo, regardless of the time limit", async () => {
      await PhotoUploadTask.runWith({ connected: true, timeLimit: 0.00001 });
      expect(uploadPhoto.mock.calls.length).toBe(1);
    })

    it("stops uploading when there isn't 2x the slowest upload time remaining", async () => {
      await PhotoUploadTask.runWith({ connected: true, timeLimit: 0.25 });
      expect(uploadPhoto.mock.calls.length).toBe(1); // 1 * 0.1 + 0.2 > 0.25

      uploadPhoto.mock.calls = [];
      await PhotoUploadTask.runWith({ connected: true, timeLimit: 0.35 });
      expect(uploadPhoto.mock.calls.length).toBe(2); // 2 * 0.1 + 0.2 > 0.35

      uploadPhoto.mock.calls = [];
      await PhotoUploadTask.runWith({ connected: true, timeLimit: 0.45 });
      expect(uploadPhoto.mock.calls.length).toBe(3); // 3 * 0.1 + 0.2 > 0.45
    })

    it("stops uploading when there are no photos left to upload", async () => {
      let calls = 0;
      uploadPhoto.mockImplementation(() => {
        calls += 1;
        return calls < 3;
      });

      await PhotoUploadTask.runWith({ connected: true });
      expect(uploadPhoto.mock.calls.length).toBe(3);
    });

    it("stops uploading if wifi drops while the task is running", async () => {
      let calls = 0;
      uploadPhoto.mockImplementation(() => {
        calls += 1;
        if (calls === 3) throw new Error("wifi has dropped");
        return true;
      });

      expect(await PhotoUploadTask.runWith({ connected: true })).toBe(true);
      expect(uploadPhoto.mock.calls.length).toBe(3);
    });
  });
});
