const Image = sequelize.define("image", {
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pushed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: timestampField("createdAt"),
  updatedAt: timestampField("updatedAt"),
});

Image.onLoad = () => {
  // Set up associations here.
};

export default Image;
