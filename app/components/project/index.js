import Activity from "../activity";
import Sticky from "../sticky";

const Project = ({ name, projectActivities=[], onAnswerQuestion=()=>{} }) => (
  <Sticky.Container>
    {projectActivities.map((props, i) => (
      Activity({ color: palette.cycle(i), onAnswerQuestion, ...props })
    ))}
  </Sticky.Container>
);

export default Project;
