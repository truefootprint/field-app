import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ index, name, projectSummary={}, projectActivities=[], currentProjectActivity={}, onAnswerQuestion=()=>{} }) => (
  <Sticky.Container>
    <Summary color={palette.cycle(index)} name={name} text={projectSummary.text} activityCount={projectActivities.length} />

    {projectActivities.map(({ id, ...props }, i) => (
      Activity({ color: palette.cycle(index + i), onAnswerQuestion, isCurrent: id === currentProjectActivity.id, ...props })
    ))}
  </Sticky.Container>
);

export default Project;
