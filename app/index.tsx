import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
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

  const handleExportData = async () => {
    const data = {
      entries: networkEntries,
      exportDate: new Date().toISOString(),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const fileUri = `${FileSystem.documentDirectory}network_data_${Date.now()}.json`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      await Sharing.shareAsync(fileUri, { mimeType: 'application/json', dialogTitle: 'Export Network Data' });
    } catch (error) {
      console.error('Error exporting data:', error);
      // You might want to show an error message to the user here
    }
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
          onExportData={handleExportData}
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