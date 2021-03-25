var ShopModel = require("../models/shops");

async function getFavorites(req, res, next) {
  var listID = [];
  req.user.favorites.forEach((item) => {
    listID.push(item);
  });
  var foundFavorites = await ShopModel.find({ _id: { $in: listID } })
    .populate("comments")
    .populate("appointments")
    .exec();
  res.json({ result: true, favoriteShops: foundFavorites });
}

module.exports = getFavorites;
