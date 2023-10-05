import { getOneSpot, getLondonSpots, postSpot } from "./models/Location.Models.js";


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
    ctx.body = spot[0];
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't get spot :( " + err;
    ctx.status = 500;
  }
}

export async function addNewSpot(ctx) {
  try {
    const newSpot = await postSpot(ctx.request.body);
    ctx.body = newSpot;
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't add spot :( " + err;
    ctx.status = 400;
  }
}