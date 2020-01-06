import ApplicationPresenter from "../../app/presenters/application_presenter";
import Response from "../../app/models/response";

describe("ApplicationPresenter", () => {
  const attributes = { id: 1, questionId: 2, value: "answer", pushed: false };
  const record = Response.build(attributes);

  it("decides which presenter to use based on type", async () => {
    const element = await ApplicationPresenter.presentElement(record);
    expect(element).toEqual(attributes);

    const collection = await ApplicationPresenter.presentCollection([record]);
    expect(collection).toEqual([attributes]);
  });

  it("can present one record", async () => {
    const presented = await ApplicationPresenter.presentElement(record);
    expect(presented).toEqual(attributes);
  });

  it("can present a collection of records", async () => {
    const presented = await ApplicationPresenter.presentCollection([record]);
    expect(presented).toEqual([attributes]);
  });

  it("can present a nested collection", async () => {
    const presented = await ApplicationPresenter.presentCollection([[record]]);
    expect(presented).toEqual([[attributes]]);
  });

  it("can present objects as nested keys", async () => {
    const presented = await ApplicationPresenter.presentNested("response", ApplicationPresenter, () => record);
    expect(presented).toEqual({ response: attributes });
  });

  it("can present records fetched with the 'raw' option", async () => {
    await record.save();

    const response = await Response.findOne({ raw: true });
    const presented = await ApplicationPresenter.presentElement(response);

    expect(presented).toMatchObject(attributes);
  });

  it("parses date strings into date objects", async () => {
    const date = new Date();
    const record = await Response.create({ ...attributes, createdAt: date });

    const response = await Response.findOne({ raw: true });
    const presented = await ApplicationPresenter.presentElement(response);

    expect(presented.createdAt).toEqual(date);
  });

  it("can present all records of the model", async () => {
    class TestPresenter extends ApplicationPresenter {
      static model() { return Response; }
    }

    await Response.create(attributes);
    const presented = await TestPresenter.presentAll();

    expect(presented.length).toBe(1);
    expect(presented[0]).toMatchObject(attributes);
  });

  it("can present all records filtered by some conditions", async () => {
    class TestPresenter extends ApplicationPresenter {
      static model() { return Response; }
    }

    await Response.create(attributes);

    const presented = await TestPresenter.presentAll({ id: 1 });
    expect(presented.length).toBe(1);

    const noResults = await TestPresenter.presentAll({ id: 2 });
    expect(noResults.length).toBe(0);
  });
});
