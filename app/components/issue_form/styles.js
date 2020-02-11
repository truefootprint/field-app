const styles = (theme) => StyleSheet.create({
  issue_form: {
    marginTop: 48,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: palette.black.primary,
  },

  text_input: {
    marginTop: 45,
  },

  image_input: {
    marginTop: 55,
  },

  submit: {
    marginTop: 30,
    marginBottom: 7,
  },
});

export default (color) => styles(palette[color]);
