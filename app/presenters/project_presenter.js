import ApplicationPresenter from "./application_presenter";
import ActivityPresenter from "./activity_presenter";

class ProjectPresenter extends ApplicationPresenter {
  static async present_element(record) {
    return {
      ...await super.present_element(record),
      ...await super.present_nested("activities", ActivityPresenter, () => record.getActivities()),
    };
  }
}

export default ProjectPresenter;
