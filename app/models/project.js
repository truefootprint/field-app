const Project = sequelize.define("project", {
  name: { type: Sequelize.TEXT },
});

Project.onLoad = ({ activity }) => {
  Project.hasMany(activity);
};

export default Project;
