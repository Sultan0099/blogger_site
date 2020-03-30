const JWT = require("jsonwebtoken");
const secret = require("../config/keys").jwtSecret;

const checkUserAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: "Not Authorized " });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await JWT.verify(token, secret);
      if (payload) {
        next();
      } else {
        res.status(401).send("unauthorized");
      }
    }
  } catch (err) {
    res.status(401).json({ msg: err });
  }
};

module.exports = { checkUserAuth };
