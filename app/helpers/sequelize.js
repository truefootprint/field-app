import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";

const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "field-app",
  dialectOptions: {
    description: "TrueFootprint Field App",
    version: "1.0",
  }
});

export { Sequelize, sequelize };
