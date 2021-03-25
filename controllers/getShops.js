var ShopModel = require("../models/shops");

async function getShops(req, res, next) {
        let type = { $exists: true };
        let latitude = { $exists: true };
        let longitude = { $exists: true };
        let weekday = { $exists: true };
        let MaxMinutes = 1439;
        let MinMinutes = 0;
        let completeDate = null;
        let quoi = { $exists: true };
        let experience = { $exists: true };
        let picto = { $exists: true };
        let rating = 0;
        let priceFork = 0;
      
        let maxFork = 5;
        req.body.data.priceFork ? (maxFork = req.body.data.priceFork) : null;
      
        req.body.data.salonOrHome === "chez toi" ? (type = true) : null;
        req.body.data.rating ? (rating = req.body.data.rating) : null;
        req.body.data.priceFork ? (priceFork = req.body.data.priceFork) : null;
        req.body.data.offer ? (quoi = req.body.data.offer) : null;
        req.body.data.experience ? (experience = req.body.data.experience) : null;
        req.body.data.service ? (picto = req.body.data.service) : null;
        req.body.data.latitude ? (latitude = req.body.data.latitude) : null;
        req.body.data.longitude ? (longitude = req.body.data.longitude) : null;
      
        // We need to send the date and hour chosen by the user
        // First converting date to day of the week to check if the shop is opened
      
        if (req.body.data.date != null) {
          let dateGoodFormat =
            req.body.data.date.split("-")[2] +
            "-" +
            req.body.data.date.split("-")[1] +
            "-" +
            req.body.data.date.split("-")[0];
          weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][new Date(dateGoodFormat).getDay()];
        }
      
        // Then if hour chosen convert it to minutes
        req.body.data.hour
          ? (MaxMinutes =
              +req.body.data.hour.split(":")[0] * 60 +
              +req.body.data.hour.split(":")[1])
          : null;
      
        req.body.data.hour
          ? (MinMinutes =
              +req.body.data.hour.split(":")[0] * 60 +
              +req.body.data.hour.split(":")[1])
          : null;
      
        // if date is chosen convert it to UTC if needed
        req.body.data.completeDate
          ? (completeDate = new Date(req.body.data.completeDate))
          : null;
      
        var shopsList = await ShopModel.find({
          offers: {
            $elemMatch: {
              type: quoi,
            },
          },
          packages: {
            $elemMatch: {
              type: experience,
            },
          },
          atHome: type,
          rating: { $gte: rating },
          priceFork: { $gte: priceFork, $lte: maxFork },
          shopFeatures: picto,
      
          schedule: {
            $elemMatch: {
              dayOfTheWeek: weekday,
              openingHours: { $lte: MaxMinutes },
              closingHours: { $gte: MinMinutes },
            },
          },
        })
          .populate("appointments")
          .populate("comments")
          .exec();
      
        // We obtain all shops that are open on opening dates and hours plus all other chosen parameters, we need to filter first by already taken appointments and then by distance
      
        //Filter with nested appointments and number of employees
        let filteredAppointmentsShopsList = [];
        for (let i = 0; i < shopsList.length; i++) {
          if (completeDate != null) {
            let numberOfEmployees = null;
            let counterOfAppointments = null;
            numberOfEmployees = shopsList[i].shopEmployees.length;
            for (let j = 0; j < shopsList[i].appointments.length; j++) {
              if (
                completeDate > shopsList[i].appointments[j].startDate &&
                completeDate < shopsList[i].appointments[j].endDate
              ) {
                counterOfAppointments = counterOfAppointments + 1;
              }
            }
            if (counterOfAppointments < numberOfEmployees) {
              filteredAppointmentsShopsList.push(shopsList[i]);
            }
          } else {
            filteredAppointmentsShopsList.push(shopsList[i]);
          }
        }
            
        // Filter with distance the result of filteredAppointmentsShopsList
        // Distance in miles
        let distanceMax = 4;
      
        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          var R = 3963; // Radius of the earth in miles
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in miles
          return d;
        }
      
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
      
        let filteredDistanceShopsList = [];
      
        for (let i = 0; i < filteredAppointmentsShopsList.length; i++) {
          if (req.body.data.longitude != null && req.body.data.latitude != null) {
            let distance = Math.floor(
              getDistanceFromLatLonInKm(
                latitude,
                longitude,
                filteredAppointmentsShopsList[i].latitude,
                filteredAppointmentsShopsList[i].longitude
              )
            );
      
            if (distance < distanceMax) {
              filteredDistanceShopsList.push(filteredAppointmentsShopsList[i]);
            }
          } else {
            filteredDistanceShopsList.push(filteredAppointmentsShopsList[i]);
          }
        }
        res.json({ filteredDistanceShopsList });
      }

module.exports = getShops;
