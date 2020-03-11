const styles = (theme) => StyleSheet.create({
  issue: {
    backgroundColor: theme.secondaryTint,
    flex: 1,
    alignItems: "center",
  },

  inner: {
    width: "95%",
  },

  bottom: {
    width: "100%",
    height: 72,
    backgroundColor: theme.primaryTint,
    alignItems: "center",
    justifyContent: "center",
  },

  text_input: {
    width: "95%",
    backgroundColor: "white",
  },
});

export default (color) => styles(palette[color]);
