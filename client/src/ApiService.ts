import axios from 'axios';
import type { LocationType, FeaturesByTypes, LocationPin, NewSpot } from "./customTypings/Location";

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

export async function postSpot(newSpot: NewSpot) {
  let response: LocationPin = (await axios.post(`${baseURL}/london`, newSpot, {
    headers: {
      'Content-Type': 'application/json'
    }
  })).data;
  return response;
}