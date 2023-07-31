import axios from 'axios';
import type { LocationType, FeaturesByTypes } from "./customTypings/Location";

const baseURL = 'http://localhost:3000';

export async function getLondonSpots() {
  const response = (await axios.get(`${baseURL}/london`)).data;
  const featuresByTypes: FeaturesByTypes = {
    NewSpots: undefined,
    OutdoorSpots: undefined,
    ParkourGyms: undefined,
    ParkourParks: undefined,
    UnderCoverSpots: undefined
  };
  response.forEach((currentFeatureType: LocationType) => {
    let elem = currentFeatureType.name.replace(/\s+/g, '')
    console.log(elem); // TODO fix typescript
    switch (elem) {
      case "OutdoorSpots":
        featuresByTypes[elem] = currentFeatureType.features;
        break;
      case "ParkourGyms":
        featuresByTypes[elem] = currentFeatureType.features;
        break;
      case "ParkourParks":
        featuresByTypes[elem] = currentFeatureType.features;
        break;
      case "UnderCoverSpots":
        featuresByTypes[elem] = currentFeatureType.features;
        break;
      case "NewSpots?":
        featuresByTypes[elem.slice(0, elem.length - 1)] = currentFeatureType.features;
        break;
    }
  })
  console.log(featuresByTypes);
  return featuresByTypes;
}