import { StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import images from '../../config/images'

import { Text, View } from '../../components/Themed';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from  '../_layout';
import MapComponent from '../../components/MapComponent';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, '(Home)'>;

export default function TabOneScreen({ navigation, route }: HomeScreenProps) {
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <MapComponent
        navigation={navigation}
        route={route}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
