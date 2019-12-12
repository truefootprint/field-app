import ApplicationPresenter from "../../app/presenters/application_presenter";
import Topic from "../../app/models/topic";
import TopicPresenter from "../../app/presenters/topic_presenter";

describe("ApplicationPresenter", () => {
  const record = Topic.build({ id: 123, name: "name" });

  it("decides which presenter to use based on type", async () => {
    const element = await ApplicationPresenter.present_element(record);
    expect(element).toEqual({ id: 123, name: "name" });

    const collection = await ApplicationPresenter.present_collection([record]);
    expect(collection).toEqual([{ id: 123, name: "name" }]);
  });

  it("can present one record", async () => {
    const presented = await ApplicationPresenter.present_element(record);
    expect(presented).toEqual({ id: 123, name: "name" });
  });

  it("can present a collection of records", async () => {
    const presented = await ApplicationPresenter.present_collection([record]);
    expect(presented).toEqual([{ id: 123, name: "name" }]);
  });

  it("can present a nested collection", async () => {
    const presented = await ApplicationPresenter.present_collection([[record]]);
    expect(presented).toEqual([[{ id: 123, name: "name" }]]);
  });

  it("can present objects as nested keys", async () => {
    const presented = await ApplicationPresenter.present_nested("topic", TopicPresenter, () => record);
    expect(presented).toEqual({ topic: { id: 123, name: "name" } });
  });
});
