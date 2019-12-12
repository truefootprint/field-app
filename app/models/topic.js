const Topic = sequelize.define("topic", {
  name: { type: Sequelize.TEXT },
});

Topic.onLoad = ({ question }) => {
  Topic.hasMany(question);
};

export default Topic;
