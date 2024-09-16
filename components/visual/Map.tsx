import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";

const Map = ({ floorNumber, roomNumber }) => {
  const netInfo = useNetInfo();
  console.log(netInfo.details)
  return (
    <View style={styles.container}>
      <Text>Selected Floor: {floorNumber}</Text>
      <Text>Room Number: {roomNumber}</Text>
      {/* Map implementation */}
      <Text>Type: {netInfo.type}</Text>
      <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
      {/* Check if the connection is Wi-Fi before accessing details */}
      {netInfo.type === 'wifi' && netInfo.details ? (
        <View>
          <Text>Strength: {netInfo.details.strength}</Text>
          <Text>IP Address: {netInfo.details.ipAddress}</Text>
          <Text>Link Speed: {netInfo.details.linkSpeed}</Text>
          <Text>bssid: {netInfo.details.bssid}</Text>
          <Text>ssid: {netInfo.details.ssid}</Text>
          <Text>subnet: {netInfo.details.subnet}</Text>
        </View>
      ) : (
        <Text>No Wi-Fi details available.</Text>
      )}

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
