import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ index, name, projectSummary={}, projectActivities=[], currentProjectActivity={}, onAnswerQuestion=()=>{} }) => {
  const projectColor = palette.cycle(index);
  const summaryText = (projectSummary || {}).text;
  const activityCount = projectActivities.length;

  const isCurrent = (id) => id === currentProjectActivity.id;
  const activityColor = (i) => palette.cycle(index + i);

  return (
    <Sticky.Container>
      <Summary color={projectColor} name={name} text={summaryText} activityCount={activityCount} />

      {projectActivities.map(({ id, ...props }, i) => (
        Activity({ color: activityColor(i), onAnswerQuestion, isCurrent: isCurrent(id), ...props })
      ))}
    </Sticky.Container>
  );
};

export default Project;
