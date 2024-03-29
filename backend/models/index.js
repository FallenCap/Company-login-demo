/**
 * File this containts all the Models related to Database.
 * This used to generate the Tables in the Database.
 * This is the main file to generate tables automatically in the Database.
 */

"use strict";
const { Cilo, tenantify, singlify } = require("cilo");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const modelsPath = __dirname; // because config is in the same directory as models

const cilo = new Cilo(
  Sequelize,
  config.database,
  config.username,
  config.password,
  modelsPath,
  config
);
cilo.buildMainORM();
cilo.buildTenantORMs().then(() => {
  console.log("Tenant ORM built");
});
const db = () => cilo.getCurrentORM();

module.exports = {
  cilo,
  db,
  tenantify: tenantify(cilo),
  singlify: singlify(cilo),
};
