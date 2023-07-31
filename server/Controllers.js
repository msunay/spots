import { getOneSpot, getLondonSpots } from "./models/Location.Models.js";


export async function getAllLondonSpots(ctx) {
  try {
    const locations = await getLondonSpots();
    ctx.body = locations;
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't get locations :( " + err;
    ctx.status = 500;
  }
}

export async function getOneLondonSpot(ctx) {
  try {
    const spot = await getOneSpot(ctx.request.params);
    ctx.body = spot;
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't get spot :( " + err;
    ctx.status = 500;
  }
}