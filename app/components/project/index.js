import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ name, projectSummary={}, projectActivities=[], currentProjectActivity={}, onAnswerQuestion=()=>{} }) => (
  <Sticky.Container>
    <Summary color="blue" name={name} text={projectSummary.text} activityCount={projectActivities.length} />

    {projectActivities.map(({ id, ...props }, i) => (
      Activity({ color: palette.cycle(i), onAnswerQuestion, isCurrent: id === currentProjectActivity.id, ...props })
    ))}
  </Sticky.Container>
);

export default Project;
