import Activity from "../activity";
import Sticky from "../sticky";

const Project = ({ name, activities=[] }) => (
  <Sticky.Container>
    {activities.map((props, i) => Activity({ color: palette.cycle(i), ...props }))}
  </Sticky.Container>
);

export default Project;
