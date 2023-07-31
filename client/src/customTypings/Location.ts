export interface LocationType {
  _id?: any;
  type: string;
  name: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    }
  };
  features: {
    type: string,
    properties: {
      Name: { type: string;
        description: string;
        gx_media_links: string;
      }
    },
    geometry: {
      type: string,
      coordinates: number[]
    }
  }[];
}

export interface LocationPin {
  _id: string;
  type?: string;
  properties: {
    Name: string;
    description?: string;
    gx_media_links?: string;
  },
  geometry: {
    type: string;
    coordinates: number[];
  }
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