import Project from "../models/project";
import Activity from "../models/activity";
import Question from "../models/question";
import Topic from "../models/topic";

const loadModels = async (callback, options = {}) => {
  const m = sequelize.models;

  Project.onLoad(m);
  Activity.onLoad(m);
  Question.onLoad(m);
  Topic.onLoad(m);

  await sequelize.sync(options);

  callback();
};

export default loadModels;
