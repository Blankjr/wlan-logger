import * as React from 'react';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNetInfoInstance } from "@react-native-community/netinfo";

const SelectDestination = ({ onSearch }) => {
  const [floorNumber, setFloorNumber] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');
  const { netInfo, refresh } = useNetInfoInstance();

  const handleSearch = async () => {
    try {
      // Refresh the network state
      await refresh();

      const networkDetails = netInfo.type === 'wifi' && netInfo.details
        ? {
            strength: netInfo.details.strength,
            ipAddress: netInfo.details.ipAddress,
            linkSpeed: netInfo.details.linkSpeed,
            bssid: netInfo.details.bssid,
            ssid: netInfo.details.ssid,
            subnet: netInfo.details.subnet,
          }
        : { message: 'No Wi-Fi details available.' };

      onSearch(floorNumber, roomNumber, networkDetails); 
    } catch (error) {
    console.error('Error fetching network info:', error);
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