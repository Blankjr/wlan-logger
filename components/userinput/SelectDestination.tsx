import * as React from 'react';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView, Platform, PermissionsAndroid } from 'react-native';
import WifiManager from "react-native-wifi-reborn";

const SelectDestination = ({ onSearch }) => {
  const [floorNumber, setFloorNumber] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location permission is required for WiFi connections",
            message:
              "This app needs location permission as this is required " +
              "to scan for wifi networks.",
            buttonNegative: "DENY",
            buttonPositive: "ALLOW"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the WiFi");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleSearch = async () => {
    try {
      await requestLocationPermission();

      const ssid = await WifiManager.getCurrentWifiSSID();
      const bssid = await WifiManager.getBSSID();
      const strength = await WifiManager.getCurrentSignalStrength();
      const frequency = await WifiManager.getFrequency();
      const ip = await WifiManager.getIP();

      const wifiInfo = {
        ssid,
        bssid,
        strength,
        frequency,
        ip
      };

      onSearch(floorNumber, roomNumber, wifiInfo);
    } catch (error) {
      console.error('Error fetching WiFi info:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={floorNumber}
        onValueChange={setFloorNumber}
        buttons={[
          { value: '0', label: 'Etage 0' },
          { value: '1', label: 'Etage 1' },
          { value: '2', label: 'Etage 2' },
          { value: '3', label: 'Etage 3' },
        ]}
      />
      <TextInput
        placeholder={'Raum-Nummer'}
        keyboardType="numeric"
        mode='outlined'
        style={styles.roomInput}
        value={roomNumber}
        onChangeText={setRoomNumber}
      />
      <Button
        icon="airplane-search"
        mode="contained"
        onPress={handleSearch}
      >
        Daten sammeln
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 275,
  },
  roomInput: {
    margin: 18,
    paddingHorizontal: 5,
  },
});

export default SelectDestination;