export default function favorite(favorite = [], action) {
  if (action.type === "favoriteShop") {
    let newFavorite = [...favorite, action.shopID];
    return newFavorite;
  } else {
    return favorite;
  }
}
