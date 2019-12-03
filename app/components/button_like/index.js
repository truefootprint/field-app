import styles from "./styles.js";

const ButtonLike = ({ color="blue", rounded=true, fill=false, center=false, children }) => {
  const classes = ["button_like", rounded && "rounded", fill && "fill", center && "center"];

  return (
    <View {...className(classes, styles(color))}>
      {children}
    </View>
  );
};

export default ButtonLike;
