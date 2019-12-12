const Activity = sequelize.define("activity", {
  name: { type: Sequelize.TEXT },
});

Activity.onLoad = ({ project, question }) => {
  Activity.belongsTo(project);
  Activity.hasMany(question);
};

export default Activity;
