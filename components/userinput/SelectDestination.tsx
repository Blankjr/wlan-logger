import * as React from 'react';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const SelectDestination = ({ onSearch }) => {
  const [floorNumber, setFloorNumber] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');

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
        onPress={() => onSearch(floorNumber, roomNumber)}
      >
        Weg Suche
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
