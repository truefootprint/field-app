import * as SQLite from "expo-sqlite";
import Sequelize from "rn-sequelize";
import Logger from "./logger";

const Op = Sequelize.Op;

const sequelize = new Sequelize({
  dialectModule: SQLite,
  logging: Logger.log,
  database: "field-app",
  dialectOptions: {
    description: "TrueFootprint Field App",
    version: "1.0",
  }
});

export { Sequelize, Op, sequelize };
