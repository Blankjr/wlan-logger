import * as React from 'react';
import { SegmentedButtons, TextInput, ToggleButton, Text, Button } from 'react-native-paper';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const SelectDestination = () => {
  const [value, setValue] = React.useState('');

  return (
      <SafeAreaView>

        <Text>Map Placeholder</Text>
        <Button icon="arrow-decision" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({

});

export default SelectDestination;
