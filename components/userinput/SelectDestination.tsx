import * as React from 'react';
import { ToggleButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const SelectDestination = () => {
  const [value, setValue] = React.useState('0');

  return (
    <View>
      <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
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
      </ToggleButton.Row>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'red',
  },
});

export default SelectDestination;
