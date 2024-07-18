import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import SelectDestination from '@/components/userinput/SelectDestination';
import Map from '@/components/visual/Map';

const SelectDestinationRoute = () => <SelectDestination />;
const MapRoute = () => <Map />;

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'selectDestination', title: 'Select Destination', unfocusedIcon: 'arrow-decision-outline', focusedIcon: 'arrow-decision' },
    { key: 'map', title: 'Map', unfocusedIcon: 'map-legend', focusedIcon: 'map-search' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    selectDestination: SelectDestinationRoute,
    map: MapRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
