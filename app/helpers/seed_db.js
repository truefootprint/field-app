import { loadModels } from "../components/model_loader";
import Project from "../models/project";
import Activity from "../models/activity";
import Topic from "../models/topic";
import Question from "../models/question";

const seedDB = async (callback=()=>{}) => {
  await loadModels(() => {}, { force: true });

  const project = await Project.create({ name: "A path in the front garden" });
  const activity = await Activity.create({ name: "Lay foundation" });
  const topic = await Topic.create({ name: "Sizes and position" });
  const question = await Question.create({
    text: "What is the width of the foundation?",
    type: "free_text",
    units: "cm",
  });

  await project.addActivity(activity);
  await activity.addQuestion(question);
  await question.setTopic(topic);

  callback();
};

export default seedDB;
