import axios from 'axios';
import type { LocationType, FeaturesByTypes, LocationPin } from "./customTypings/Location";

const baseURL = 'http://localhost:3000';

export async function getLondonSpots() {
  const spotArr = (await axios.get(`${baseURL}/london`)).data;

  return spotArr;
}

export async function getSpot(id: string) {
  const spot: LocationPin = (await axios.get(`${baseURL}/london/details/${id}`)).data;
  console.log(spot,'spot')
  return spot;
}
