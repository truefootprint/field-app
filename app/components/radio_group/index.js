import Radio from "../radio";

const RadioGroup = ({ children=[], defaultIndex, index, onChange=()=>{}, ...rest }) => {
  children = [children].flat();

  const hasDefault = typeof defaultIndex !== "undefined";
  const controlled = typeof index !== "undefined";
  const childIndex = children.findIndex(c => c.props.checked);

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
    { ...rest, ...child.props, checked: i === current, onCheck: handleCheck(child, i) }
  );

  const cloneChild = (child, i) => (
    child.type === Radio ? cloneElement(child, propsFor(child, i)) : child
  );

  const withKeys = (array) => (
    array.map((element, i) => <View key={i}>{element}</View>)
  );

  return (
    <View data={{ index: current }}>
      {withKeys(children.map(cloneChild))}
    </View>
  )
};

export default RadioGroup;
export { Radio };
