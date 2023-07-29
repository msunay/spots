import LondonLocation from "./index.js";

export async function getLocations() {
  try {
    const locationsArr = await LondonLocation.find({}).lean();
    return locationsArr;
  } catch (err) {
    console.log(err);
  }
}