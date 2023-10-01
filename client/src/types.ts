export interface coords {
  lat: number;
  lng: number;
}

export interface region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface LocationType {
  _id?: any;
  type: string;
  name: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: {
    type: string;
    properties: {
      Name: { type: string; description: string; gx_media_links: string };
    };
    geometry: {
      type: string;
      coordinates: number[];
    };
  }[];
}

export interface LocationPin {
  _id: string;
  type: string;
  properties: {
    Name: string;
    description: string | null;
    gx_media_links: string | null;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface FeaturesByTypes {
  NewSpots: LocationPin[];
  OutdoorSpots: LocationPin[];
  ParkourGyms: LocationPin[];
  ParkourParks: LocationPin[];
  UnderCoverSpots: LocationPin[];
}

export interface NewSpot {
  spotName: string;
  spotType: string;
  coordinates: number[];
}
