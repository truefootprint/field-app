// Unit tests use testID
// Feature tests use accessibilityLabel

const testId = (id) => ({
  testID: id,
  accessibilityLabel: id
});

export default testId;
