import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

// const { Navigator, Screen } = createBottomTabNavigator();

import MapComponent from './components/MapComponent';

export const App = () => {
  return (
    <View style={styles.container}>
      <MapComponent />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
