import Sequelize from "sequelize";

sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./tmp/test-db.sqlite",
  logging: false,
});

export default sequelize;
