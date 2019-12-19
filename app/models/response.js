const Response = sequelize.define("response", {
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  value: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Response.onLoad = () => {
  // Set up associations here.
};

export default Response;
