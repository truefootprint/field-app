const Content = sequelize.define("content", {
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
    allowNull: false,
  },
  photosJson: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
  parentId: {
    type: Sequelize.INTEGER,
  },
  pushed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: timestampField("createdAt"),
  updatedAt: timestampField("updatedAt"),
});

Content.onLoad = () => {
  // Set up associations here.
};

export default Content;
