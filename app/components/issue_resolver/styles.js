const styles = (theme) => StyleSheet.create({
  issue_resolver: {
    borderColor: "white",
    borderWidth: 2,
    marginTop: 27,
    marginBottom: 20,
    padding: 27,
    paddingTop: 20,
  },

  prompt_text: {
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.8,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },

  touchable: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },

  confirm_text: {
    fontFamily: "Roboto-Medium-Italic",
    letterSpacing: 0.8,
    color: palette.black.primary,
    marginBottom: 35,
  },

  lightbox: {
    padding: 20,
  },

  submit: {
    marginTop: 35,
  },
});

export default (color) => styles(palette[color]);
