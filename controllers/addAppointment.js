var ShopModel = require("../models/shops");
var AppointmentModel = require("../models/appointments");

async function addAppointment(req, res, next) {
  var newAppointment = new AppointmentModel({
    chosenOffer: req.body.chosenOffer,
    chosenPrice: req.body.chosenPrice,
    chosenEmployee: req.body.chosenEmployee,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    chosenPayment: req.body.chosenPayment,
    appointmentStatus: req.body.appointmentStatus,
    shopId: req.body.shop_id,
    commentExists: false,
  });

  var saveAppointment = await newAppointment.save();

  await ShopModel.updateOne(
    { _id: req.body.shop_id },
    { $push: { appointments: saveAppointment._id } }
  );
  req.user.appointments.push(saveAppointment);
  req.user.loyaltyPoints += req.body.loyaltyPoints;

  await req.user.save();

  res.json({ result: true });
}

module.exports = addAppointment;
