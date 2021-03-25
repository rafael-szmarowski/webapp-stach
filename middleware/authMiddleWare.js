const UserModel = require("../models/users");

async function authMiddleWare(req, res, next) {
  const extractedToken = req.headers.authorization?.replace("Bearer ", "");
  const user = await UserModel.findOne({ token: extractedToken });
  if (!user) {
    return res.sendStatus(403);
  } else {
    req.user = user;
    next();
  }
}

module.exports = authMiddleWare;
