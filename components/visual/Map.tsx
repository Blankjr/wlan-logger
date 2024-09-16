import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

NetInfo.fetch().then(state => {
  console.log('Connection type', state.type);
  console.log('Is connected?', state.isConnected);
  console.log(state.details)
});

const Map = ({ floorNumber, roomNumber }) => {
  return (
    <View style={styles.container}>
      <Text>Selected Floor: {floorNumber}</Text>
      <Text>Room Number: {roomNumber}</Text>
      {/* Map implementation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
