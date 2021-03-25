export default function shopDetails(shopDetails = {}, action) {
  if (action.type === "selectOffer") {
    var shopDetailsCopy = action.shopDetails;
    return shopDetailsCopy;
  } else {
    return shopDetails;
  }
}
