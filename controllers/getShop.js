var ShopModel = require("../models/shops");

async function getShop(req, res, next) {
  var shop = await ShopModel.findById(req.params.id)
    .populate("appointments")
    .populate("comments")
    .exec();

  res.json({ result: true, shop: shop });
}

module.exports = getShop;
