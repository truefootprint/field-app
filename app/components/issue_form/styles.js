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

  text_section: {
    marginTop: 45,
  },

  text: {
    lineHeight: 24,
    fontStyle: "normal",
    fontSize: 16,
  },

  images_section: {
    marginTop: 55,
  },

  image: {
    marginBottom: 20,
  },

  submit: {
    marginTop: 30,
    marginBottom: 7,
  },
});

export default (color) => styles(palette[color]);
