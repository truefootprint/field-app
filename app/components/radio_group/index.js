import Radio from "../radio";
import Checkbox from "../checkbox";
import styles from "./styles.js";

const RadioGroup = ({ children=[], defaultIndex, index, onChange=()=>{}, ...rest }) => {
  children = [children].flat();

  const hasDefault = typeof defaultIndex !== "undefined";
  const controlled = typeof index !== "undefined";
  const childIndex = children.findIndex(c => c.type === Radio && c.props.checked);

  const [current, setCurrent] = useState(hasDefault ? defaultIndex : childIndex);

  useEffect(() => { controlled && setCurrent(index); }, [index]);

  const handleCheck = (child, i) => {
    return (active) => {
      const callback = child.props.onCheck;
      if (callback) callback(active);

      if (i === current) return;
      onChange(i);

      if (controlled) return;
      setCurrent(i);
    };
  };

  const propsFor = (child, i) => (
    child.type === Radio
      ? { ...rest, ...child.props, checked: i === current, onCheck: handleCheck(child, i) }
      : { ...rest, ...child.props } // Inherit props for checkboxes (e.g. color)
  );

  const cloneChild = (c, i) => (
    (c.type === Radio || c.type === Checkbox) ? cloneElement(c, propsFor(c, i)) : c
  );

  const withKeys = (array) => (
    array.map((element, i) => (
      <View key={i} {...className("container", styles)}>{element}</View>
    ))
  );

  return (
    <View data={{ index: current }}>
      {withKeys(children.map(cloneChild))}
    </View>
  )
};

export default RadioGroup;
export { Radio };
