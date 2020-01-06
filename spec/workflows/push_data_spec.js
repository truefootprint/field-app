import pushData from "../../app/workflows/push_data";
import Response from "../../app/models/response";
import Client from "../../app/helpers/client";

jest.mock("../../app/helpers/client");

describe("pushData", () => {
  const oneDay = 24 * 60 * 60 * 1000;

  const todayStart = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const todayEnd = new Date(todayStart.getTime() + oneDay - 1);

  let myUpdates;

  beforeEach(() => {
    myUpdates = jest.fn();
    Client.mockImplementation(() => ({ myUpdates }));

    Response.create({ id: 1, questionId: 2, value: "answer" });
  });

  it("pushes responses to the backend, partitioned by period", async () => {
    await pushData();

    expect(myUpdates).lastCalledWith([
      {
        periodStart: todayStart,
        periodEnd: todayEnd,
        responses: [
          {
            localId: 1,
            projectQuestionId: 2,
            value: "answer",
            pushed: false,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
          },
        ],
      },
    ]);
  });

  it("updates responses to 'pushed' in the database after pushing them", async () => {
    let response = await Response.findOne();
    expect(response.pushed).toBe(false);

    await pushData();

    response = await Response.findOne();
    expect(response.pushed).toBe(true);
  });

  it("does not delete responses if the API request fails", async () => {
    Client.mockImplementation(() => ({
      myUpdates: () => { throw new Error("API request failed"); }
    }));

    try { await pushData(); } catch {}

    expect(await Response.count()).toBe(1);
  });

  it("does not make an API request if there are no responses to push", async () => {
    expect(myUpdates.mock.calls.length).toBe(0);

    await pushData();
    expect(myUpdates.mock.calls.length).toBe(1);

    await pushData();
    expect(myUpdates.mock.calls.length).toBe(1);
  });

  it("returns whether responses were pushed to the backend", async () => {
    expect(await pushData()).toBe(true);
    expect(await pushData()).toBe(false);
    expect(await pushData()).toBe(false);

    Response.create({ questionId: 123, value: "answer" });

    expect(await pushData()).toBe(true);
    expect(await pushData()).toBe(false);
  });
});
