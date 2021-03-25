async function addFavorites(req, res, next) {
  req.user.favorites.push(req.body.id);
  req.user.save();
  res.json({ result: true });
}

module.exports = addFavorites;
