import pullData, { combineData } from "../../app/workflows/pull_data";
import File from "../../app/helpers/file";
import Client from "../../app/helpers/client";
import Response from "../../app/models/response";

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
    File.readObject.mockResolvedValue({ id: 1, responses: [] });

    await pullData({ callback: d => { data = d; } });

    expect(data.responses.length).toBe(1);
    expect(data.responses[0]).toMatchObject({ projectQuestionId: 1, value: "answer" });
  });

  describe("when myData is not in the cache", () => {
    beforeEach(() => {
      Client.mockImplementation(() => ({
        myData: () => ({ id: 1, responses: [] }),
      }));
    });

    it("fetches myData from the backend", async () => {
      await pullData({ callback: d => { data = d; } });
      expect(data).toEqual({ id: 1, responses: [] });
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

describe("combineData", () => {
  let data;

  it("combines myData with additional responses from the user", () => {
    const myData = { id: 123, responses: [] };
    const responses = [{ projectQuestionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ id: 123, responses });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { id: 123, responses: [] } }] } };
    const responses = [{ projectQuestionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ a: { b: [{ c: { id: 123, responses } }] } });
  });
});
