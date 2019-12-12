import BasePresenter from "./base_presenter";
import ActivityPresenter from "./activity_presenter";

const ProjectPresenter = {};

ProjectPresenter.present = async (record) => {
  const presented = BasePresenter.present(record);
  const activities = await record.getActivities();
  const promises = activities.map(a => ActivityPresenter.present(a));

  presented.activities = await Promise.all(promises);

  return presented;
};

export default ProjectPresenter;
