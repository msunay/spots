import LondonLocation from "./index.js";

export async function getLondonSpots() {
  try {
    const locationsArr = await LondonLocation.find({});
    return locationsArr;
  } catch (err) {
    console.log(err);
  }
}

export async function getOneSpot(id) {
  try {
    const spot = await LondonLocation.find(id);
    return spot;
  } catch (err) {
    console.log(err);
  }
}