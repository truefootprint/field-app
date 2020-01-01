import pullData, { combineData } from "../../app/workflows/pull_data";
import File from "../../app/helpers/file";
import Client from "../../app/helpers/client";
import Response from "../../app/models/response";

jest.mock("../../app/helpers/file");
jest.mock("../../app/helpers/client");

describe("pullData", () => {
  it("pulls myData from the cache", async () => {
    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ cached: "data" });

    const result = await pullData();

    expect(result).toEqual({ cached: "data" });
  });

  it("calls the callback with the result", async () => {
    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ cached: "data" });

    const callback = jest.fn();
    await pullData({ callback });

    expect(callback).lastCalledWith({ cached: "data" });
  });

  it("uses 'my_data.json' as the cache file", async () => {
    await pullData();

    expect(File.exists).lastCalledWith("my_data.json");
  });

  it("fetches myData from the backend on a cache miss", async () => {
    Client.mockImplementation(() => ({
      myData: () => ({ client: "data" })
    }));

    const result = await pullData();

    expect(result).toEqual({ client: "data" });
  });

  it("does not fetch data from the backend when not on wifi", async () => {
    Client.mockImplementation(() => ({
      myData: () => ({ client: "data" })
    }));

    const result = await pullData({ connected: false });

    expect(result).toBeUndefined();
  });

  it("combines myData with responses from the local database", async () => {
    await Response.create({ questionId: 1, value: "answer" });

    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ questionId: 1, responses: [] });

    const result = await pullData();

    expect(result.responses.length).toBe(1);
    expect(result.responses[0]).toMatchObject({ questionId: 1, value: "answer" });
  });
});

describe("combineData", () => {
  it("combines myData with additional responses from the user", () => {
    const myData = { questionId: 123, responses: [] };
    const responses = [{ questionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ questionId: 123, responses });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { questionId: 123, responses: [] } }] } };
    const responses = [{ questionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ a: { b: [{ c: { questionId: 123, responses } }] } });
  });
});
