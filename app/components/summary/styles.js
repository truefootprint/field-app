const styles = (theme) => StyleSheet.create({
  summary: {
    backgroundColor: theme.primary,
    paddingLeft: "6.5%",
    paddingRight: "6.5%",
    paddingTop: 33,
    paddingBottom: 33,
    marginBottom: 33,
  },

  title: {
    fontSize: 25,
    lineHeight: 33,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.5,
    color: "white",
    marginBottom: 33,
  },

  heading: {
    fontSize: 14.5,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.9,
    textTransform: "uppercase",
    color: "white",
    marginBottom: 21,
  },

  text: {
    fontSize: 15,
    letterSpacing: 0.8,
    lineHeight: 22,
    color: "white",
    marginBottom: 33,
  },

  activity_count: {
    fontSize: 15,
    letterSpacing: 0.8,
    lineHeight: 22,
    color: "white",
    marginTop: 33,
  }
});

export default (color) => styles(palette[color]);
