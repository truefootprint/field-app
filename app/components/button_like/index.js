import styles from "./styles.js";

const ButtonLike = ({ color="blue", border=true, rounded=true, fill=false, center=false, children }) => {
  const classes = [
    "button_like",
    border && "border",
    rounded && "rounded",
    fill && "fill",
    center && "center",
  ];

  return (
    <View {...className(classes, styles(color))}>
      {children}
    </View>
  );
};

export default ButtonLike;
