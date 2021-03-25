var ShopModel = require("../models/shops");

async function addPriceFork(req, res, next) {
  var shop = await ShopModel.findOne({ shopName: req.body.shopName });

  var totalPrice = 0;
  var numberOfOffer = 0;
  for (let i = 0; i < shop.offers.length; i++) {
    totalPrice += shop.offers[i].price;
    numberOfOffer++;
  }
  var averagePrice = totalPrice / numberOfOffer;

  var priceFork;
  if (averagePrice < 50) {
    priceFork = 1;
  } else if (averagePrice < 70) {
    priceFork = 2;
  } else {
    priceFork = 3;
  }

  await ShopModel.updateOne(
    { shopName: req.body.shopName },
    { priceFork: priceFork }
  );

  res.json({ result: true });
}

module.exports = addPriceFork;
