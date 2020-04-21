import Activity from "../activity";
import Sticky from "../sticky";
import Summary from "../summary";

const Project = ({ index, name, projectActivities=[], sourceMaterials=[], currentProjectActivity={}, onViewSource=()=>{}, onAnswerQuestion=()=>{}, onViewIssue=()=>{} }) => {
  const t = useTranslate();

  const projectColor = palette.cycle(index);
  const activityColor = (i) => palette.cycle(index + i);
  const isCurrent = (id) => id === (currentProjectActivity || {}).id;

  const hasContract = sourceMaterials.length > 0;
  const viewContract = () => onViewSource({...sourceMaterials[0], color: projectColor });

  return (
    <Sticky.Container>
      <Summary
        color={projectColor}
        projectName={name}
        hasContract={hasContract}
        onViewContract={viewContract}
      />

      {projectActivities.map(({ id, ...props }, i) => (
        Activity({ color: activityColor(i), isCurrent: isCurrent(id), onAnswerQuestion, onViewIssue, ...props })
      ))}
    </Sticky.Container>
  );
};

export default Project;
