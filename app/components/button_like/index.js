import styles from "./styles.js";

const ButtonLike = ({ color="blue", fill=false, center=false, children }) => {
  const classes = ["button_like", fill && "fill", center && "center"];

  return (
    <View {...className(classes, styles(color))}>
      {children}
    </View>
  );
};

export default ButtonLike;
