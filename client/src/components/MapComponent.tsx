import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { RootState } from '../app/store';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { LocationPin, coords, region } from '../types';
import { useGetLondonSpotsQuery } from '../services/api-service';

export default function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState<coords>({} as coords);
  const [mapRegion, setmapRegion] = useState<region>({
    latitude: 51.508,
    longitude: -0.087,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPoints, setMarkerPoints] = useState<LocationPin[]>([]);

  const { data } = useGetLondonSpotsQuery();

  useEffect(() => {
    if (data) {
      setMarkerPoints(data);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={mapRegion}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          console.log('Map is ready');
        }}
        style={styles.map}>
        {markerPoints.map(locationPoint => (
          <Marker
            key={locationPoint._id}
            coordinate={{
              latitude: locationPoint.geometry.coordinates[1],
              longitude: locationPoint.geometry.coordinates[0],
            }}
            title={locationPoint.properties.Name}
            // icon=
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
