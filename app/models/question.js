const Question = sequelize.define("question", {
  type: { type: Sequelize.STRING },
  text: { type: Sequelize.TEXT },
});

Question.onLoad = ({ activity, topic }) => {
  Question.belongsTo(activity);
  Question.belongsTo(topic);
};

export default Question;
