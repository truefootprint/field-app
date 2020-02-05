import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ index, name, projectSummary={}, projectActivities=[], sourceMaterials=[], currentProjectActivity={}, onViewSource=()=>{}, onAnswerQuestion=()=>{} }) => {
  const projectColor = palette.cycle(index);
  const summaryText = (projectSummary || {}).text;
  const activityCount = projectActivities.length;

  const isCurrent = (id) => id === currentProjectActivity.id;
  const activityColor = (i) => palette.cycle(index + i);

  const hasContract = sourceMaterials.length > 0;
  const viewContract = () => onViewSource(sourceMaterials[0]);

  return (
    <Sticky.Container>
      <Summary
        color={projectColor}
        name={name}
        text={summaryText}
        activityCount={activityCount}
        hasContract={hasContract}
        onViewContract={viewContract}
      />

      {projectActivities.map(({ id, ...props }, i) => (
        Activity({ color: activityColor(i), onAnswerQuestion, isCurrent: isCurrent(id), ...props })
      ))}
    </Sticky.Container>
  );
};

export default Project;
