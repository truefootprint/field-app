const styles = StyleSheet.create({
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.6,
  },

  foreground: {
    backgroundColor: "white",
    borderRadius: 2,
    width: "87%",
    elevation: 5,
  },
});

export default styles;
