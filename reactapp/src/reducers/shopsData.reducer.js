export default function shopsData(shopsData = [], action) {
  if (action.type === "saveShopsData") {
    var shopsDataCopy = action.shopsData;
    return shopsDataCopy;
  } else {
    return shopsData;
  }
}
