import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import SelectDestination from '@/components/userinput/SelectDestination';
import Map from '@/components/visual/Map';

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [floorNumber, setFloorNumber] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');
  const [networkEntries, setNetworkEntries] = React.useState([]);

  const routes = [
    { key: 'selectDestination', title: 'Ziel wählen', unfocusedIcon: 'arrow-decision-outline', focusedIcon: 'arrow-decision' },
    { key: 'map', title: 'Karte', unfocusedIcon: 'map-legend', focusedIcon: 'map-search' },
  ];

  const handleSearch = (floorNumber, roomNumber, netInfo) => {
    setFloorNumber(floorNumber);
    setRoomNumber(roomNumber);
    setNetworkEntries(prevEntries => [
      ...prevEntries,
      {
        name: `Room ${roomNumber}`,
        ...netInfo
      }
    ]);
    setIndex(1); // Switch to Map
  };

  const handleDeleteEntry = (index) => {
    setNetworkEntries(prevEntries => 
      prevEntries.filter((_, i) => i !== index)
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'selectDestination':
        return <SelectDestination onSearch={handleSearch} />;
      case 'map':
        return <Map 
          floorNumber={floorNumber} 
          roomNumber={roomNumber} 
          networkEntries={networkEntries}
          onDeleteEntry={handleDeleteEntry}
        />;
      default:
        return null;
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}