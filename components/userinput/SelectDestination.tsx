import * as React from 'react';
import { SegmentedButtons, TextInput, ToggleButton } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const SelectDestination = () => {
  const [value, setValue] = React.useState('');

  return (
      <SafeAreaView style={styles.container}>
        {/* <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
          <ToggleButton
            icon="numeric-0-circle"
            value="0"
            style={value === '0' ? styles.selectedButton : styles.button}
          />
          <ToggleButton
            icon="numeric-1-circle"
            value="1"
            style={value === '1' ? styles.selectedButton : styles.button}
          />
          <ToggleButton
            icon="numeric-2-circle"
            value="2"
            style={value === '2' ? styles.selectedButton : styles.button}
          />
          <ToggleButton
            icon="numeric-3-circle"
            value="3"
            style={value === '3' ? styles.selectedButton : styles.button}
          />
        </ToggleButton.Row> */}
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            { value: '0', label: 'Etage 0' },
            { value: '1', label: 'Etage 1'},
            { value: '2', label: 'Etage 2' },
            { value: '3', label: 'Etage 3' },
          ]}
        />
        <TextInput
          placeholder={'Raum-Nummer'}
          keyboardType="numeric"
          mode='outlined'
          style={styles.roomInput}
        />
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 50
  },
  roomInput: {
    margin: 18
  }
});

export default SelectDestination;
