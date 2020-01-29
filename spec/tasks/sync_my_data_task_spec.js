import SyncMyDataTask from "../../app/tasks/sync_my_data_task";
import pushData from "../../app/workflows/push_data";
import pullData from "../../app/workflows/pull_data";
import Secret from "../../app/helpers/secret";
import hasWifi from "../../app/helpers/has_wifi";

jest.mock("../../app/workflows/push_data");
jest.mock("../../app/workflows/pull_data");
jest.mock("../../app/helpers/secret");
jest.mock("../../app/helpers/has_wifi");

describe("SyncMyDataTask", () => {
  beforeEach(() => {
    hasWifi.mockResolvedValue(true);
    Secret.read.mockResolvedValue("token");
  });

  it("pushes data", async () => {
    await SyncMyDataTask.run();

    expect(pushData).toHaveBeenCalled();
  });

  it("force pulls data if data was pushed", async () => {
    pushData.mockResolvedValue(true);
    await SyncMyDataTask.run();

    expect(pullData).lastCalledWith({ force: true, callback: expect.anything() });
  });

  it("does not force pull data if data was not pushed", async () => {
    pushData.mockResolvedValue(false);
    await SyncMyDataTask.run();

    expect(pullData).lastCalledWith({ force: false, callback: expect.anything() });
  });

  it("does not push or pull data if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    await SyncMyDataTask.run();

    expect(pushData).not.toHaveBeenCalled();
    expect(pullData).not.toHaveBeenCalled();
  });

  it("returns false if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    expect(await SyncMyDataTask.run()).toBe(false);
  });

  it("returns whether data was pushed or pulled", async () => {
    pushData.mockResolvedValue(false);
    pullData.mockResolvedValue(false);
    expect(await SyncMyDataTask.run()).toBe(false);

    pushData.mockResolvedValue(false);
    pullData.mockResolvedValue(true);
    expect(await SyncMyDataTask.run()).toBe(true);

    pushData.mockResolvedValue(true);
    pullData.mockResolvedValue(false);
    expect(await SyncMyDataTask.run()).toBe(true);

    pushData.mockResolvedValue(true);
    pullData.mockResolvedValue(true);
    expect(await SyncMyDataTask.run()).toBe(true);
  });

  describe("runWith", () => {
    it("can force pull data", async () => {
      pushData.mockResolvedValue(false);
      await SyncMyDataTask.runWith({ connected: true, force: true });

      expect(pullData).lastCalledWith({ force: true, callback: expect.anything() });
    });

    it("can pass the pulled data to the callback", async () => {
      pullData.mockImplementation(({ callback }) => callback({ fake: "data" }));

      const callback = jest.fn();
      await SyncMyDataTask.runWith({ connected: true, force: true, callback });

      expect(callback).lastCalledWith({ fake: "data" });
    });
  });
});
