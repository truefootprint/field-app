const Menu = ({ onSelect=()=>{}, children=[] }) => {
  children = [children].flat();

  return (
    <View>
      {children.map((child, i) => (
        <TouchableOpacity key={i} onPress={() => onSelect(child, i)} activeOpacity={0.8}>
          {child}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Menu;
