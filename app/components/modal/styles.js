const styles = (theme) => StyleSheet.create({
  modal: {
    backgroundColor: theme.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  inner: {
    backgroundColor: "white",
    width: "92%",
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    flex: 1,
  },

  top: {
    flexDirection: "row",
  },

  heading: {
    flex: 1,
    fontSize: 24,
    fontFamily: "Roboto-Medium",
    color: palette.black.primary,
    letterSpacing: 0.9,
    marginTop: 3,
    marginBottom: 10,
  },

  touchable: {
    marginTop: 5,
  }
});

export default (color) => styles(palette[color]);
