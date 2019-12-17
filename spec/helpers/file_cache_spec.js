import FileCache from "../../app/helpers/file_cache";
import File from "../../app/helpers/file";

jest.mock("../../app/helpers/file");

describe("FileCache", () => {
  it("fetches cached data from a file", async () => {
    File.exists.mockResolvedValue(true);
    File.read.mockResolvedValue("some data");

    const content = await FileCache.fetch("data.txt")

    expect(File.read).lastCalledWith("data.txt");
    expect(content).toEqual("some data")
  });

  it("can fetch JavaScript objects stored as json", async () => {
    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ some: "data" });

    const object = await FileCache.fetch("data.json", { type: "object" })

    expect(File.readObject).lastCalledWith("data.json");
    expect(object).toEqual({ some: "data" });
  });

  it("calls 'onMiss' to populate the cache when its empty", async () => {
    File.exists.mockResolvedValue(false);

    const onMiss = () => "some data";
    const content = await FileCache.fetch("data.txt", { onMiss });

    expect(File.exists).lastCalledWith("data.txt");
    expect(File.write).lastCalledWith("data.txt", "some data");

    expect(content).toEqual("some data");
  });

  it("does not write a file if 'onMiss' is not provided", async () => {
    File.exists.mockResolvedValue(false);

    const content = await FileCache.fetch("data.txt");

    expect(File.write).not.toHaveBeenCalled();
    expect(content).toBeUndefined();
  });

  it("can write JavaScript objects returned from 'onMiss'", async () => {
    File.exists.mockResolvedValue(false);

    const onMiss = () => ({ some: "data" });
    const content = await FileCache.fetch("data.txt", { onMiss, type: "object" });

    expect(File.writeObject).lastCalledWith("data.txt", { some: "data" });
    expect(content).toEqual({ some: "data" });
  });

  it("refreshes the cache if 'maxAge' seconds have passed", async () => {
    const now = new Date().getTime() / 1000;

    File.exists.mockResolvedValue(true);
    File.read.mockResolvedValue("cached data");
    File.modified.mockResolvedValue(now - 5);

    const onMiss = () => "fresh data";

    const maxAge6 = await FileCache.fetch("data.txt", { onMiss, maxAge: 6 });
    expect(maxAge6).toEqual("cached data");

    const maxAge4 = await FileCache.fetch("data.txt", { onMiss, maxAge: 4 });
    expect(maxAge4).toEqual("fresh data");
  });

  const getMidnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

  it("sets 'maxAge' to the seconds since midnight by default", async () => {
    const midnight = getMidnight().getTime() / 1000;

    File.exists.mockResolvedValue(true);
    File.read.mockResolvedValue("cached data");

    const onMiss = () => "fresh data";

    File.modified.mockResolvedValue(midnight - 3);
    const beforeMidnight = await FileCache.fetch("data.txt", { onMiss });
    expect(beforeMidnight).toEqual("fresh data");

    File.modified.mockResolvedValue(midnight + 3);
    const afterMidnight = await FileCache.fetch("data.txt", { onMiss });
    expect(afterMidnight).toEqual("cached data");
  });

  const sharedExamples = (onMiss) => {
    it("does not write a file", async () => {
      File.exists.mockResolvedValue(false);

      const content = await FileCache.fetch("data.txt", { onMiss });

      expect(File.write).not.toHaveBeenCalled();
      expect(content).toBeUndefined();
    });

    it("returns the cached file if it exists (even though it's stale)", async () => {
      File.exists.mockResolvedValue(true);
      File.read.mockResolvedValue("stale data");
      File.modified.mockResolvedValue(0); // 50 years ago - definitely expired!

      const content = await FileCache.fetch("data.txt", { onMiss });
      expect(content).toEqual("stale data");
    });
  };

  describe("when 'onMiss' throws an error", () => {
    sharedExamples(() => { throw new Error("failed to get data from api"); });
  });

  describe("when 'onMiss' returns undefined", () => {
    sharedExamples(() => undefined);
  });

  describe("when 'onMiss' returns null", () => {
    sharedExamples(() => null);
  });
});
