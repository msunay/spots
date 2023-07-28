import { getLocations } from "./models/Location.Models.js";


export async function getAllLocations(ctx) {
  try {
    const locations = await getLocations();
    ctx.body = locations;
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't get locations :( " + err;
    ctx.status = 500;
  }
}