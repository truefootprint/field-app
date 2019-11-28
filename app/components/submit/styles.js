const styles = (theme) => StyleSheet.create({
  text: {
    color: "white",
    textTransform: "uppercase",
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
  },
});

export default (color) => styles(palette[color]);
