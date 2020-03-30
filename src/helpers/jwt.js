const JWT = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const assignToken = payload => {
  return JWT.sign(
    {
      iss: "blogger_site",
      sub: payload,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    },
    jwtSecret
  );
};

module.exports = { assignToken };
