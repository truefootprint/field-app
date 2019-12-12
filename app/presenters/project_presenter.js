import ApplicationPresenter from "./application_presenter";
import ActivityPresenter from "./activity_presenter";

class ProjectPresenter extends ApplicationPresenter {
  static async presentElement(record) {
    return {
      ...await super.presentElement(record),
      ...await super.presentNested("activities", ActivityPresenter, () => record.getActivities()),
    };
  }
}

export default ProjectPresenter;
