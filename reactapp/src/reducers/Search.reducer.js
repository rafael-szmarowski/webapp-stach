export default function search(search = {}, action) {
  if (action.type === "createSearch") {
    console.log("action", action);
    let newSearch = {
      salonOrHome: action.salonOrHome,
      completeDate: action.completeDate,
      date: action.date,
      hour: action.hour,
      address: action.address,
      latitude: action.latitude,
      longitude: action.longitude,
      offer: action.offer,
      experience: action.experience,
      service: action.service,
      priceFork: action.priceFork,
      rating: action.rating,
    };
    return newSearch;
  } else {
    return search;
  }
}
