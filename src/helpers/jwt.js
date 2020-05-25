const JWT = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const assignToken = (payload) => {
  return JWT.sign(
    {
      iss: "blogger_site",
      sub: payload,
      iat: new Date().getTime(),
    },
    jwtSecret
  );
};

const verifyToken = (payload) => {
  return JWT.verify(payload, jwtSecret);
};

module.exports = { assignToken, verifyToken };
