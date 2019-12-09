const Question = sequelize.define("question", {
  text: { type: Sequelize.TEXT },
});

export default Question;
