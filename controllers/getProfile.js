var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const { signUpValidation, signInValidation } = require("../validation");
const UserModel = require("../models/users");
const CommentModel = require("../models/comments");
const AppointmentModel = require("../models/appointments");
const ShopModel = require("../models/shops");

async function getProfile(req, res, next) {
  const user = await req.user.populate("appointments").execPopulate();

  const appointIds = [];
  user.appointments.forEach((userAppoint) => {
    appointIds.push(userAppoint._id);
  });

  try {
    // Get all appointments by user
    const appointments = await AppointmentModel.find({
      _id: { $in: appointIds },
    });

    // Get all shopsId by user
    const shopsIds = [];
    appointments.forEach((appointment) => {
      shopsIds.push(appointment.shopId);
    });

    const shops = [];
    for (let i = 0; i < shopsIds.length; i++) {
      const shop = await ShopModel.findById(shopsIds[i]);
      shops.push(shop);
    }

    res.json({ result: true, appointments, user, shopsIds, shops });
  } catch (error) {
    res.json({ result: false, error });
  }
}

module.exports = getProfile;
