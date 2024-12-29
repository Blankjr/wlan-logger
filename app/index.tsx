import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import SelectDestination from '@/components/userinput/SelectDestination';
import Map from '@/components/visual/Map';

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [floorNumber, setFloorNumber] = React.useState('');
  const [networkEntries, setNetworkEntries] = React.useState([]);

  const routes = [
    { 
      key: 'selectDestination', 
      title: 'Select Position', 
      unfocusedIcon: 'arrow-decision-outline', 
      focusedIcon: 'arrow-decision' 
    },
    { 
      key: 'map', 
      title: 'Scan Results', 
      unfocusedIcon: 'signal-cellular-outline', 
      focusedIcon: 'signal-cellular-3' 
    },
  ];

  const handleSearch = (floorNumber, scanData) => {
    console.log('Received scan data:', JSON.stringify(scanData, null, 2));
    
    setFloorNumber(floorNumber);
    setNetworkEntries(prevEntries => {
      const newEntries = [...prevEntries, scanData];
      console.log('Updated network entries:', JSON.stringify(newEntries, null, 2));
      return newEntries;
    });
    setIndex(1); // Switch to Map
  };

  const handleDeleteEntry = (index) => {
    setNetworkEntries(prevEntries => {
      const newEntries = prevEntries.filter((_, i) => i !== index);
      console.log('Entries after deletion:', JSON.stringify(newEntries, null, 2));
      return newEntries;
    });
  };

  const handleExportData = async () => {
    const data = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      scans: networkEntries
    };

    const jsonString = JSON.stringify(data, null, 2);
    const fileUri = `${FileSystem.documentDirectory}wifi_scans_${Date.now()}.json`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      await Sharing.shareAsync(fileUri, { 
        mimeType: 'application/json', 
        dialogTitle: 'Export WiFi Scan Data' 
      });
      console.log('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'selectDestination':
        return (
          <SelectDestination 
            onSearch={handleSearch} 
          />
        );
      case 'map':
        return (
          <Map 
            floorNumber={floorNumber}
            networkEntries={networkEntries}
            onDeleteEntry={handleDeleteEntry}
            onExportData={handleExportData}
          />
        );
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