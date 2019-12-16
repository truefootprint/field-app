import Activity from "../activity";
import Sticky from "../sticky";

const Project = ({ name, projectActivities=[] }) => (
  <Sticky.Container>
    {projectActivities.map((props, i) => (
      Activity({ color: palette.cycle(i), ...props })
    ))}
  </Sticky.Container>
);

export default Project;
