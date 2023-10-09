import LondonLocation from ".";

export async function getLondonSpots() {
  try {
    const locationsArr = await LondonLocation.find({});
    return locationsArr;
  } catch (err) {
    console.log(err);
  }
}

export async function getOneSpot(id: String) {
  try {
    const spot = await LondonLocation.find(id);
    return spot;
  } catch (err) {
    console.log(err);
  }
}

export async function postSpot({ spotName, spotType, coordinates }: { spotName: String, spotType: String, coordinates: Number[] }) {
  try {
    const newSpot = new LondonLocation({
      type: spotType,
      properties: {
        Name: spotName,
        decription: null,
        gx_media_links: null
      },
      geometry: {
        type: "Point",
        coordinates
      }
    })
    const response = await newSpot.save();
    return response;
  } catch (err) {
    console.log(err);
  }
}

