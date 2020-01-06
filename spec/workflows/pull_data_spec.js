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

  it("combines myData with responses from the local database", async () => {
    await Response.create({ questionId: 1, value: "answer" });

    File.exists.mockResolvedValue(true);
    File.readObject.mockResolvedValue({ projectQuestionId: 1, responses: [] });

    const result = await pullData();

    expect(result.responses.length).toBe(1);
    expect(result.responses[0]).toMatchObject({ projectQuestionId: 1, value: "answer" });
  });

  describe("when myData is not in the cache", () => {
    beforeEach(() => {
      Client.mockImplementation(() => ({
        myData: () => ({ projectQuestionId: 1, responses: [] }),
      }));
    });

    it("fetches myData from the backend", async () => {
      const result = await pullData();
      expect(result).toEqual({ projectQuestionId: 1, responses: [] });
    });

    it("does not fetch data from the backend when not on wifi", async () => {
      const result = await pullData({ connected: false });
      expect(result).toBeUndefined();
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

      const result = await pullData();
      expect(result.responses.length).toBe(0);
    });
  });
});

describe("combineData", () => {
  it("combines myData with additional responses from the user", () => {
    const myData = { projectQuestionId: 123, responses: [] };
    const responses = [{ projectQuestionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ projectQuestionId: 123, responses });
  });

  it("handles arbitrary levels of nesting", () => {
    const myData = { a: { b: [{ c: { projectQuestionId: 123, responses: [] } }] } };
    const responses = [{ projectQuestionId: 123, value: "answer" }];

    const result = combineData(myData, responses);
    expect(result).toEqual({ a: { b: [{ c: { projectQuestionId: 123, responses } }] } });
  });
});
