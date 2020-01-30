import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ name, projectSummary={}, projectActivities=[], onAnswerQuestion=()=>{} }) => (
  <Sticky.Container>
    <Summary color="blue" name={name} text={projectSummary.text} activityCount={projectActivities.length} />

    {projectActivities.map((props, i) => (
      Activity({ color: palette.cycle(i), onAnswerQuestion, ...props })
    ))}
  </Sticky.Container>
);

export default Project;
