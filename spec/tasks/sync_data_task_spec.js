import SyncDataTask from "../../app/tasks/sync_data_task";
import pushData from "../../app/workflows/push_data";
import pullData from "../../app/workflows/pull_data";
import hasWifi from "../../app/helpers/has_wifi";

jest.mock("../../app/workflows/push_data");
jest.mock("../../app/workflows/pull_data");
jest.mock("../../app/helpers/has_wifi");

describe("SyncDataTask", () => {
  beforeEach(() => {
    hasWifi.mockResolvedValue(true);
  });

  it("pushes data", async () => {
    await SyncDataTask.run();

    expect(pushData).toHaveBeenCalled();
  });

  it("force pulls data if data was pushed", async () => {
    pushData.mockResolvedValue(true);
    await SyncDataTask.run();

    expect(pullData).lastCalledWith({ force: true, callback: expect.anything() });
  });

  it("does not force pull data if data was not pushed", async () => {
    pushData.mockResolvedValue(false);
    await SyncDataTask.run();

    expect(pullData).lastCalledWith({ force: false, callback: expect.anything() });
  });

  it("does not push or pull data if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    await SyncDataTask.run();

    expect(pushData).not.toHaveBeenCalled();
    expect(pullData).not.toHaveBeenCalled();
  });

  it("returns false if there's no connection", async () => {
    hasWifi.mockResolvedValue(false);
    expect(await SyncDataTask.run()).toBe(false);
  });

  it("returns whether data was pushed or pulled", async () => {
    pushData.mockResolvedValue(false);
    pullData.mockResolvedValue(false);
    expect(await SyncDataTask.run()).toBe(false);

    pushData.mockResolvedValue(false);
    pullData.mockResolvedValue(true);
    expect(await SyncDataTask.run()).toBe(true);

    pushData.mockResolvedValue(true);
    pullData.mockResolvedValue(false);
    expect(await SyncDataTask.run()).toBe(true);

    pushData.mockResolvedValue(true);
    pullData.mockResolvedValue(true);
    expect(await SyncDataTask.run()).toBe(true);
  });

  describe("runWith", () => {
    it("can force pull data", async () => {
      pushData.mockResolvedValue(false);
      await SyncDataTask.runWith({ connected: true, force: true });

      expect(pullData).lastCalledWith({ force: true, callback: expect.anything() });
    });

    it("can pass the pulled data to the callback", async () => {
      pullData.mockImplementation(({ callback }) => callback({ fake: "data" }));

      const callback = jest.fn();
      await SyncDataTask.runWith({ connected: true, force: true, callback });

      expect(callback).lastCalledWith({ fake: "data" });
    });
  });
});
