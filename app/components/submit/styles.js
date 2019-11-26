const styles = (theme) => StyleSheet.create({
  text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default (color) => styles(palette[color]);
