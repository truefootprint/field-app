const styles = (theme) => StyleSheet.create({
  button_like: {
    height: 40,
    borderColor: theme.primary,
    borderWidth: thin,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  fill: {
    backgroundColor: theme.primary,
  },

  center: {
    justifyContent: "center",
  }
});

export default (color) => styles(palette[color]);
