const merge = require("lodash.merge");
const devConfig = require("./dev");
const prodConfig = require("./prod");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;

const baseConfig = {};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = devConfig;
    break;

  case "production":
  case "prod":
    envConfig = prodConfig;
    break;

  default:
    envConfig = devConfig;
}
module.exports = merge(baseConfig, envConfig);
