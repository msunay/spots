import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LocationPin, coords, region } from '../Types';
import { useGetLondonSpotsQuery } from '../services/api-service';
import images from '../config/images';
import { Image } from 'expo-image';
import { useNavigation, Link } from 'expo-router';

export default function MapComponent() {
  const [mapRegion, setmapRegion] = useState<region>({
    latitude: 51.508,
    longitude: -0.087,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPoints, setMarkerPoints] = useState<LocationPin[]>([]);

  const { data } = useGetLondonSpotsQuery();

  const navigation = useNavigation();

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
        style={styles.map}
      >
        <Image
          source={images.spotsLogo}
          style={styles.image}
        />
        {markerPoints.map(locationPoint => (
          <Link
            key={locationPoint._id}
            href={{
            pathname: "/modal",
            params: { id: locationPoint._id }
          }}>
            <Marker
              key={locationPoint._id}
              coordinate={{
                latitude: locationPoint.geometry.coordinates[1],
                longitude: locationPoint.geometry.coordinates[0],
              }}
              title={locationPoint.properties.Name}
              pinColor='navy'
            >
              <Callout
                style={styles.callout}
                tooltip={true}
                // onPress={() => {
                //   navigation.navigate("modal", { id: locationPoint._id })
                // }}
              >
                <Text>{locationPoint.properties.Name}</Text>
              </Callout>
            </Marker>
          </Link>
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    resizeMode: 'contentFit',
    height: 80,
    width: 300,
    marginTop: 50,
    alignSelf: 'center'
  },
  callout: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 12,
    // shadowColor: '#171717',
    // shadowOffset: {
    //   width: -2,
    //   height: 4
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10
  }
});
