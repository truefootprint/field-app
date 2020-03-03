const styles = (theme) => StyleSheet.create({
  issue_note: {
    width: "75%",
    backgroundColor: "white",
    borderRadius: 7,
    marginBottom: 5,
    overflow: "hidden",
  },

  has_content: {
    marginTop: 32,
  },

  same_user: {
    marginTop: 5,
  },

  this_user: {
    alignSelf: "flex-end",
    backgroundColor: theme.primary,
  },

  text: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
    color: palette.black.primary,
    marginLeft: 12,
    marginBottom: 12,
    marginRight: 12,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
  },

  images: {
    backgroundColor: theme.secondaryTint,
  },

  image: {
    marginBottom: 10,
    borderRadius: 7,
  },

  first_child: {
    borderRadius: 0,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },

  last_child: {
    marginBottom: 0,
  },

  resolved: {
    borderColor: "white",
    borderWidth: 2,
    marginTop: 27,
    marginBottom: 5,
  },

  white: {
    color: "white",
  },
});

export default (color) => styles(palette[color]);
