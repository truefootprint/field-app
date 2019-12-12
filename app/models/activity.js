const Activity = sequelize.define("activity", {
  name: { type: Sequelize.TEXT },
});

Activity.onLoad = ({ question }) => {
  Activity.hasMany(question);
};

export default Activity;
