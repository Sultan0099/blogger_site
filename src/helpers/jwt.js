const JWT = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const assignToken = payload => {
  return JWT.sign(
    {
      iss: "blogger_site",
      sub: payload,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    jwtSecret
  );
};

module.exports = { assignToken };
