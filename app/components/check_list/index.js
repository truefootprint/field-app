import Checkbox from "../checkbox";
import styles from "./styles.js";

const CheckList = ({ children=[], defaultIndexes, indexes, onChange=()=>{}, ...rest }) => {
  children = [children].flat();

  const hasDefault = typeof defaultIndexes !== "undefined";
  const controlled = typeof indexes !== "undefined";
  const childIndexes = filterIndex(children, c => c.type === Checkbox && c.props.checked);

  const [current, setCurrent] = useState(hasDefault ? defaultIndexes : childIndexes);

  useEffect(() => { controlled && setCurrent(indexes); }, [indexes]);

  const handleCheck = (child, i) => {
    return (active) => {
      const callback = child.props.onCheck;
      if (callback) callback(active);

      const newCurrent = contains(i, current) ? removeIndex(i) : addIndex(i);
      onChange(newCurrent);

      if (controlled) return;
      setCurrent(newCurrent);
    };
  };

  const addIndex = (i) => {
    let array = [...current, i]; array.sort(); return array;
  };

  const removeIndex = (i) => (
    current.filter(j => i !== j)
  );

  const propsFor = (child, i) => (
    { ...rest, ...child.props, checked: contains(i, current), onCheck: handleCheck(child, i) }
  );

  const cloneChild = (c, i) => (
    c.type === Checkbox ? cloneElement(c, propsFor(c, i)) : c
  );

  const wrap = (array) => (
    array.map((element, i) => {
      const classes = ["wrapper", i === array.length - 1 && "last_child"];

      return <View key={i} {...className(classes, styles)}>{element}</View>
    })
  );

  return (
    <View data={{ indexes: current }}>
      {wrap(children.map(cloneChild))}
    </View>
  )
};

export default CheckList;
export { Checkbox };
