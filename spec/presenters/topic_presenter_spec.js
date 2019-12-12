import TopicPresenter from "../../app/presenters/topic_presenter";
import Topic from "../../app/models/topic";

describe("TopicPresenter", () => {
  it("presents topics", async () => {
    const topic = Topic.build({ id: 123, name: "name" });
    const presented = await TopicPresenter.present([topic]);

    expect(presented).toEqual([{ id: 123, name: "name" }]);
  });
});
