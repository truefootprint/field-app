const IssueNote = sequelize.define("issue_note", {
  issueUuid: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  subjectType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subjectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
  },
  photosJson: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
  pushed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: timestampField("createdAt"),
  updatedAt: timestampField("updatedAt"),
});

export default IssueNote;
