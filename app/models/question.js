const Question = sequelize.define("question", {
  text: { type: Sequelize.TEXT },
});

Question.onLoad = ({ topic }) => {
  Question.belongsTo(topic);
};

export default Question;
