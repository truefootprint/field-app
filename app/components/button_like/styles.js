const styles = (theme) => StyleSheet.create({
  button_like: {
    height: 40,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  border: {
    borderColor: theme.primary,
    borderWidth: thin,
    elevation: 3,
  },

  rounded: {
    borderRadius: 5,
  },

  fill: {
    backgroundColor: theme.primary,
  },

  center: {
    justifyContent: "center",
  }
});

export default (color) => styles(palette[color]);
