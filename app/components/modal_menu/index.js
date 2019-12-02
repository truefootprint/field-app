import Lightbox from "../lightbox";

const ModalMenu = ({ visible=true, onSelect=()=>{}, onDismiss=()=>{}, children=[] }) => {
  children = [children].flat();

  const menuItem = (child, i) => (
    <TouchableOpacity key={i} onPress={() => onSelect(child, i)} activeOpacity={0.8}>
      {child}
    </TouchableOpacity>
  );

  return (
    <Lightbox visible={visible} onDismiss={onDismiss}>
      {children.map(menuItem)}
    </Lightbox>
  );
};

export default ModalMenu;
