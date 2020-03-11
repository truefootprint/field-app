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
    height: 72,
    backgroundColor: theme.primaryTint,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    flexDirection: "row",
  },

  text_input: {
    flex: 1,
    backgroundColor: "white",
  },

  image_input: {
    marginLeft: 8,
  }
});

export default (color) => styles(palette[color]);
