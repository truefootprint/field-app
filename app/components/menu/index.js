const Menu = ({ onSelect=()=>{}, children=[] }) => {
  children = [children].flat();

  return (
    <View>
      {children.map((child, i) => (
        <TouchableHighlight key={i} onPress={() => onSelect(child, i)}>
          {child}
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default Menu;
