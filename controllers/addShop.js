var ShopModel = require("../models/shops");

async function addShop(req, res, next) {
    var newShop = new ShopModel({
        shopName: req.body.shopName,
        shopImages: [
          req.body.shopImage1,
          req.body.shopImage2,
          req.body.shopImage3,
          req.body.shopImage4,
        ],
        shopAddress: req.body.shopAddress,
        shopPhone: req.body.shopPhone,
        shopMail: req.body.shopMail,
        shopDescription: req.body.shopDescription,
        shopFeatures: [
          req.body.shopFeatures1,
          req.body.shopFeatures2,
          req.body.shopFeatures3,

        ],
        shopEmployees: [
          req.body.shopEmployee1,
          req.body.shopEmployee2,

        ],
        offers: [
          {
            type: req.body.offerName1,
            price: req.body.offerPrice1,
            duration: req.body.offerDuration1,
          },
          {
            type: req.body.offerName2,
            price: req.body.offerPrice2,
            duration: req.body.offerDuration2,
          },
          {
            type: req.body.offerName3,
            price: req.body.offerPrice3,
            duration: req.body.offerDuration3,
          },
          {
            type: req.body.offerName4,
            price: req.body.offerPrice4,
            duration: req.body.offerDuration4,
          },
          {
            type: req.body.offerName5,
            price: req.body.offerPrice5,
            duration: req.body.offerDuration5,
          },
          {
            type: req.body.offerName6,
            price: req.body.offerPrice6,
            duration: req.body.offerDuration6,
          },
        ],
        packages: [
          {
            type: req.body.packageName1,
            price: req.body.packagePrice1,
            duration: req.body.packageDuration1,
            description: req.body.packageDescription1,
          },
          {
            type: req.body.packageName2,
            price: req.body.packagePrice2,
            duration: req.body.packageDuration2,
            description: req.body.packageDescription2,
          },

        ],
        schedule: [

          {
            dayOfTheWeek: "Tuesday",
            openingHours: req.body.openingHoursTuesday,
            closingHours: req.body.closingHoursTuesday,
          },
          {
            dayOfTheWeek: "Wednesday",
            openingHours: req.body.openingHoursWednesday,
            closingHours: req.body.closingHoursWednesday,
          },
          {
            dayOfTheWeek: "Thursday",
            openingHours: req.body.openingHoursThursday,
            closingHours: req.body.closingHoursThursday,
          },
          {
            dayOfTheWeek: "Friday",
            openingHours: req.body.openingHoursFriday,
            closingHours: req.body.closingHoursFriday,
          },
          {
            dayOfTheWeek: "Saturday",
            openingHours: req.body.openingHoursSaturday,
            closingHours: req.body.closingHoursSaturday,
          },
        ],
        atHome: req.body.atHome,
        rating: 0,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
    
      await newShop.save();
    
      res.json({ result: true });
}

module.exports = addShop;
