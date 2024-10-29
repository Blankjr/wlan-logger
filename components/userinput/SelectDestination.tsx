import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, PermissionsAndroid, ToastAndroid } from 'react-native';
import { Button, SegmentedButtons } from 'react-native-paper';
import TetheringManager, { Network, Event, TetheringError } from '@react-native-tethering/wifi';
import MapSelector from './MapSelector';

const SelectDestination = ({ onSearch }) => {
  const [floorNumber, setFloorNumber] = React.useState('');
  const [selectedPosition, setSelectedPosition] = React.useState(null);
  const [scanning, setScanning] = React.useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Request each permission individually
        const fineLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs location permission for WiFi scanning",
            buttonNegative: "DENY",
            buttonPositive: "ALLOW"
          }
        );

        const coarseLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs location permission for WiFi scanning",
            buttonNegative: "DENY",
            buttonPositive: "ALLOW"
          }
        );

        console.log('Permissions status:', { fineLocation, coarseLocation });

        return (
          fineLocation === PermissionsAndroid.RESULTS.GRANTED &&
          coarseLocation === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const scanNetworks = async () => {
    try {
      setScanning(true);
      
      // Check and request permissions
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) {
        ToastAndroid.show('Location permissions are required for WiFi scanning', ToastAndroid.LONG);
        return;
      }

      // Check if WiFi is enabled
      const isWifiEnabled = await TetheringManager.isWifiEnabled();
      console.log('WiFi enabled:', isWifiEnabled);

      if (!isWifiEnabled) {
        console.log('Enabling WiFi...');
        await TetheringManager.setWifiEnabled();
        // Wait for WiFi to initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Double check WiFi is enabled
      const wifiEnabled = await TetheringManager.isWifiEnabled();
      if (!wifiEnabled) {
        throw new Error('Failed to enable WiFi');
      }

      console.log('Starting network scan...');
      const networks = await TetheringManager.getWifiNetworks(true);
      console.log('Found networks:', networks);

      // Transform networks data to match the schema
      const samples = networks.map(network => ({
        ssid: network.ssid,
        rssi: network.level,
        channel: getChannelFromFrequency(network.frequency),
        security: getSecurityType(network.capabilities),
        hidden: network.ssid === '',
        band: network.frequency > 4000 ? '5GHz' : '2.4GHz',
        frequency: network.frequency,
        bssid: network.bssid,
      }));

      const scanData = {
        'version:id': '1.0',
        id: generateUUID(),
        timestamp: Date.now(),
        token: 'scanner_1',
        location: {
          position_px: selectedPosition,
          floor: `Etage ${floorNumber}`,
          building: '4'
        },
        samples
      };

      console.log('Scan data:', scanData);
      onSearch(floorNumber, scanData);
      ToastAndroid.show('Scan complete!', ToastAndroid.SHORT);

    } catch (error) {
      console.error('Scan error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      ToastAndroid.show(
        error instanceof TetheringError 
          ? `Scanning error: ${error.message}`
          : 'Failed to scan networks',
        ToastAndroid.LONG
      );
    } finally {
      setScanning(false);
    }
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  // Helper functions
  const getChannelFromFrequency = (frequency) => {
    if (frequency >= 2412 && frequency <= 2484) {
      return Math.round((frequency - 2412) / 5 + 1);
    } else if (frequency >= 5170 && frequency <= 5825) {
      return Math.round((frequency - 5170) / 5 + 34);
    }
    return 0;
  };

  const getSecurityType = (capabilities) => {
    if (capabilities.includes('WPA3') || capabilities.includes('SAE')) return 'WPA3';
    if (capabilities.includes('WPA2')) return 'WPA2';
    if (capabilities.includes('WPA')) return 'WPA';
    if (capabilities === '[ESS]') return 'OPEN';
    return 'Unknown';
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
      
      {floorNumber && (
        <MapSelector
          floor={floorNumber}
          onPositionSelect={handlePositionSelect}
        />
      )}

      {selectedPosition && (
        <Button
          icon="wifi"
          mode="contained"
          loading={scanning}
          onPress={scanNetworks}
          style={styles.scanButton}
          disabled={scanning}
        >
          {scanning ? 'Scanning...' : 'Scan Networks'}
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scanButton: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default SelectDestination;