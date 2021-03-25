const CommentModel = require('../models/comments');
const AppointmentModel = require('../models/appointments');
const ShopModel = require('../models/shops');

async function addComment(req, res, next) {
  var shop = await ShopModel.findById(req.body.shop_id);

  var newComment = new CommentModel({
    comment: req.body.comment,
    rating: +req.body.rating,
    commentDate: new Date(),
  });

  var saveComment = await newComment.save();

  req.user.comments.push(saveComment);
  await req.user.save();

  await ShopModel.updateOne(
    { _id: req.body.shop_id },
    { $push: { comments: saveComment._id } }
  );

  var newRating =
    (+req.body.rating + shop.rating * shop.comments.length) /
    (shop.comments.length + 1);

  await ShopModel.updateOne({ _id: req.body.shop_id }, { rating: newRating });

  await AppointmentModel.updateOne(
    { _id: req.body.appointmentId },
    { commentExists: true }
  );

  res.json({ result: true, comment: saveComment });
}

module.exports = addComment;
