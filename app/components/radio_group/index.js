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

      if (i === current) {
        onChange(-1);
        setCurrent(-1);
        return;
      }
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

  const wrap = (array) => (
    array.map((element, i) => {
      const classes = ["wrapper", i === array.length - 1 && "last_child"];

      return <View key={i} {...className(classes, styles)}>{element}</View>
    })
  );

  return (
    <View data={{ index: current }}>
      {wrap(children.map(cloneChild))}
    </View>
  )
};

export default RadioGroup;
export { Radio };
