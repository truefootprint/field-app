import pushData from "../../app/workflows/push_data";
import Response from "../../app/models/response";
import Content from "../../app/models/content";
import Client from "../../app/helpers/client";

jest.mock("../../app/helpers/client");

describe("pushData", () => {
  const oneDay = 24 * 60 * 60 * 1000;

  const todayStart = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const todayEnd = new Date(todayStart.getTime() + oneDay - 1);

  let postMyUpdates;

  beforeEach(async () => {
    postMyUpdates = jest.fn();
    Client.mockImplementation(() => ({ postMyUpdates }));

    await Response.create({ id: 1, questionId: 2, value: "answer" });
    await Content.create({ id: 3, subjectType: "Issue", subjectId: 4, text: "text" });
  });

  it("pushes responses and contents to the backend, partitioned by period", async () => {
    await pushData();

    expect(postMyUpdates).lastCalledWith([{
      periodStart: todayStart,
      periodEnd: todayEnd,
      responses: [{
        localId: 1,
        projectQuestionId: 2,
        value: "answer",
        pushed: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      }],
      contents: [{
        localId: 3,
        subjectType: "Issue",
        subjectId: 4,
        text: "text",
        photosJson: "[]",
        parentId: null,
        pushed: false,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      }],
    }]);
  });

  it("updates records to 'pushed' in the database after pushing them", async () => {
    let response = await Response.findOne();
    let content = await Content.findOne();

    expect(response.pushed).toBe(false);
    expect(content.pushed).toBe(false);

    await pushData();

    response = await Response.findOne();
    content = await Content.findOne();

    expect(response.pushed).toBe(true);
    expect(content.pushed).toBe(true);
  });

  it("does not update 'pushed' if the API request fails", async () => {
    Client.mockImplementation(() => ({
      postMyUpdates: () => { throw new Error("API request failed"); }
    }));

    try { await pushData(); } catch {}

    const response = await Response.findOne();
    const content = await Content.findOne();

    expect(response.pushed).toBe(false);
    expect(content.pushed).toBe(false);
  });

  it("does not make an API request if there is nothing to push", async () => {
    expect(postMyUpdates.mock.calls.length).toBe(0);

    await pushData();
    expect(postMyUpdates.mock.calls.length).toBe(1);

    await pushData();
    expect(postMyUpdates.mock.calls.length).toBe(1);
  });

  it("returns whether records were pushed to the backend", async () => {
    expect(await pushData()).toBe(true);
    expect(await pushData()).toBe(false);
    expect(await pushData()).toBe(false);

    Response.create({ questionId: 123, value: "answer" });

    expect(await pushData()).toBe(true);
    expect(await pushData()).toBe(false);
  });
});
