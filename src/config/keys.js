if (process.env.NODE_ENV === "production") {
  moduel.export = require("./prod");
} else {
  module.exports = require("./dev");
}
