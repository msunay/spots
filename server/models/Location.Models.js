import LondonLocation from "./index.js";

export async function getLocations() {
  try {
    const locationsArr = await LondonLocation.find({}).lean();
    console.log(locationsArr);
    return locationsArr;
  } catch (err) {
    console.log(err);
  }
}