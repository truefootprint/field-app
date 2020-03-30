const styles = StyleSheet.create({
  login_form: {
    flex: 1,
    backgroundColor: "white",
  },

  inner: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
  },

  row1: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
    color: palette.black.primary,
    marginLeft: 16,
  },

  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  input: {
    flex: 1,
    marginRight: 10,
  },

  error: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
    color: "#900",
    marginTop: 26,
  },
});

export default styles;
