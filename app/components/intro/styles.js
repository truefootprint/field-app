const styles = (theme) => StyleSheet.create({
  intro: {
    width: "88%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  button: {
    marginTop: 50,
    marginBottom: 20,
  },
});

const markdown = (theme) => ({
  body: {
    color: palette.black.primary,
  },

  paragraph: {
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  heading1: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  heading2: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  heading3: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  heading4: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  heading5: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  heading6: {
    color: theme.primaryTint,
    marginTop: 10,
    marginBottom: 10,
  },

  hr: {
    height: thin,
    backgroundColor: "#ddd",
    marginTop: 10,
    marginBottom: 10,
  },

  blockquote: {
    paddingHorizontal: 15,
    paddingVertical: 0,
    backgroundColor: "white",
    borderLeftWidth: 4,
    borderLeftColor: "#ddd",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default (color) => {
  const stylesheet = styles(palette[color]);
  stylesheet.markdown = markdown(palette[color]);

  return stylesheet;
};
