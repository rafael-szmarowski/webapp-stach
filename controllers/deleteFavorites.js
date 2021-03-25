async function deleteFavorites(req, res, next) {
  req.user.favorites.pull(req.params.id);
  req.user.save();
  res.json({ result: true });
}

module.exports = deleteFavorites;
