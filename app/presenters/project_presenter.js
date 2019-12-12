import ApplicationPresenter from "./application_presenter";
import ActivityPresenter from "./activity_presenter";

class ProjectPresenter extends ApplicationPresenter {
  static async present_element(record) {
    const presented = await super.present_element(record)
    const activities = await record.getActivities();
    const promises = activities.map(a => ActivityPresenter.present(a));

    presented.activities = await Promise.all(promises);

    return presented;
  }
}

export default ProjectPresenter;
