import { getOneSpot, getLondonSpots, postSpot } from "./models/Location.Models.js";
import { Context, Request } from 'koa';
import { LondonLocation } from "./models/index.js";

// interface KoaRequest<RequestBody = any> extends Request {
//     body?: RequestBody;
// }

// export interface KoaContext<RequestBody = any, ResponseBody = any> extends Context {
//     request: KoaRequest<RequestBody>;
//     body: ResponseBody;
// }

// export interface KoaResponseContext<ResponseBody> extends KoaContext<any, ResponseBody> {}

export async function getAllLondonSpots(ctx: Context) {
  try {
    const locations = await getLondonSpots();
    ctx.body = locations;
    ctx.status = 200;
  } catch (err) {
    ctx.body = "couldn't get locations :( " + err;
    ctx.status = 500;
  }
}

export async function getOneLondonSpot(ctx: Context) {
  try {
    const spot = await getOneSpot(ctx.request.params);
    if (spot) {
    ctx.body = spot[0];
    ctx.status = 200;
    }
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