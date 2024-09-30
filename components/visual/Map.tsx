import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

const Map = ({ floorNumber, roomNumber, networkEntries }) => {
  const netInfo = useNetInfo();

  return (
    <ScrollView style={styles.container}>
      <Text>Selected Floor: {floorNumber}</Text>
      <Text>Room Number: {roomNumber}</Text>
      
      <Text style={styles.sectionTitle}>Current Network Info:</Text>
      <Text>Type: {netInfo.type}</Text>
      <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
      {netInfo.type === 'wifi' && netInfo.details ? (
        <View>
          <Text>Strength: {netInfo.details.strength}</Text>
          <Text>IP Address: {netInfo.details.ipAddress}</Text>
          <Text>Link Speed: {netInfo.details.linkSpeed}</Text>
          <Text>BSSID: {netInfo.details.bssid}</Text>
          <Text>SSID: {netInfo.details.ssid}</Text>
          <Text>Subnet: {netInfo.details.subnet}</Text>
        </View>
      ) : (
        <Text>No Wi-Fi details available.</Text>
      )}

      <Text style={styles.sectionTitle}>Network Entries:</Text>
      {networkEntries.map((entry, index) => (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.entryTitle}>{entry.name}</Text>
          {Object.entries(entry).map(([key, value]) => 
            key !== 'name' && (
              <Text key={key}>{key}: {value}</Text>
            )
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  entryContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default Map;