const styles = (theme) => StyleSheet.create({
  text: {
    fontSize: 16,
    color: palette.black.primary,
  },

  free_text: {
    marginTop: 80,
  },

  free_text_issue: {
    marginTop: 20,
    marginBottom: 120,
  },

  multi_choice: {
    marginTop: 80,
  },

  multi_choice_issue: {
    marginTop: 20,
    marginBottom: 80,
  },

  photo_upload: {
    marginTop: 40,
  },

  photo_upload_issue: {
    marginTop: 40,
    marginBottom: 40,
  },
});

export default (color) => styles(palette[color]);
