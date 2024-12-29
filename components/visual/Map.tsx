import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ToastAndroid } from 'react-native';
import { IconButton, Button, Card, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerConfigDialog from '../settings/ServerConfigDialog';

const SERVER_URL_KEY = 'server_url';
const DEFAULT_SERVER_URL = 'http://192.168.1.105:8006';

const Map = ({ floorNumber, roomNumber, networkEntries, onDeleteEntry, onExportData }) => {
  const [uploading, setUploading] = React.useState(false);
  const [serverUrl, setServerUrl] = React.useState(DEFAULT_SERVER_URL);
  const [configVisible, setConfigVisible] = React.useState(false);

  React.useEffect(() => {
    loadServerUrl();
  }, []);

  const loadServerUrl = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem(SERVER_URL_KEY);
      if (savedUrl) {
        setServerUrl(savedUrl);
      }
    } catch (error) {
      console.error('Error loading server URL:', error);
    }
  };

  const sendToServer = async () => {
    setUploading(true);
    try {
      console.log('Attempting to send data to:', `${serverUrl}/sampling/`);
      for (const entry of networkEntries) {
        console.log('Sending entry:', JSON.stringify(entry, null, 2));
        
        const response = await fetch(`${serverUrl}/sampling/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            version_id: entry.version_id,
            id: entry.id,
            timestamp: entry.timestamp,
            token: entry.token,
            location: {
              position_metric: entry.location.position_px,
              position_px: entry.location.position_px,
              position_geo: {
                latitude: 0,
                longitude: 0
              },
              floor: entry.location.floor,
              building: entry.location.building
            },
            samples: entry.samples
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          throw new Error(`Server error: ${errorText}`);
        }

        const responseData = await response.json();
        console.log('Server response:', responseData);
      }
      
      ToastAndroid.show('Data successfully sent to server', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error sending data to server:', error);
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
    } finally {
      setUploading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const renderSamples = (samples) => {
    if (!Array.isArray(samples)) return null;
    
    return samples.map((sample, idx) => (
      <View key={idx} style={styles.sampleContainer}>
        <View style={styles.sampleHeader}>
          <Text style={styles.sampleTitle}>
            {sample.ssid || '<Hidden Network>'} ({sample.bssid})
          </Text>
          <Text style={[styles.signalStrength, { color: getSignalColor(sample.rssi) }]}>
            {sample.rssi} dBm
          </Text>
        </View>
        <View style={styles.sampleDetails}>
          <Text>Band: {sample.band}</Text>
          <Text>Channel: {sample.channel}</Text>
          <Text>Security: {sample.security}</Text>
          <Text>Frequency: {sample.frequency} MHz</Text>
        </View>
      </View>
    ));
  };

  const getSignalColor = (rssi) => {
    if (rssi >= -50) return '#4CAF50';
    if (rssi >= -60) return '#8BC34A';
    if (rssi >= -70) return '#FFC107';
    if (rssi >= -80) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Network Scans:</Text>
        {networkEntries.map((entry, index) => (
          <Card key={index} style={styles.entryContainer}>
            <Card.Content>
              <View style={styles.entryHeader}>
                <View>
                  <Text style={styles.entryTitle}>
                    Scan {index + 1}
                  </Text>
                  <Text style={styles.floorInfo}>
                    Floor: {entry.location?.floor || 'N/A'}
                  </Text>
                </View>
                <IconButton
                  icon="delete-outline"
                  size={24}
                  onPress={() => onDeleteEntry(index)}
                />
              </View>

              {/* Display WiFi Info */}
              {entry.ssid && (
                <View style={styles.wifiInfoContainer}>
                  <Text style={styles.wifiInfoTitle}>Connected Network:</Text>
                  <Text>SSID: {entry.ssid}</Text>
                  <Text>BSSID: {entry.bssid}</Text>
                  <Text>Strength: {entry.strength}</Text>
                  <Text>Frequency: {entry.frequency}</Text>
                  <Text>IP: {entry.ip}</Text>
                </View>
              )}
               {/* Display position if available */}
               {entry.location?.position_px && (
                <View style={styles.locationInfo}>
                  <Text style={styles.locationTitle}>Position:</Text>
                  <Text>X: {entry.location.position_px.x}</Text>
                  <Text>Y: {entry.location.position_px.y}</Text>
                </View>
              )}
              {/* Display Scan Data if available */}
              {entry.samples && (
                <View style={styles.networksContainer}>
                  <Text style={styles.networksTitle}>
                    Networks Found: {entry.samples.length}
                  </Text>
                  <Divider style={styles.divider} />
                  {renderSamples(entry.samples)}
                </View>
              )}

             
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button 
            mode="contained" 
            onPress={onExportData}
            style={[styles.button, styles.exportButton]}
            icon="file-export-outline"
          >
            Export
          </Button>
          
          <Button 
            mode="contained" 
            onPress={() => setConfigVisible(true)}
            style={[styles.button, styles.configButton]}
            icon="cog-outline"
          >
            Config
          </Button>
          
          <Button 
            mode="contained" 
            onPress={sendToServer}
            style={[styles.button, styles.uploadButton]}
            icon="cloud-upload-outline"
            loading={uploading}
            disabled={uploading || networkEntries.length === 0}
          >
            {uploading ? 'Sending...' : 'Send'}
          </Button>
        </View>
      </View>

      <ServerConfigDialog
        visible={configVisible}
        onDismiss={() => setConfigVisible(false)}
        onSave={(url) => {
          setServerUrl(url);
          ToastAndroid.show('Server URL updated', ToastAndroid.SHORT);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  entryContainer: {
    marginBottom: 16,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#000000'
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  floorInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  wifiInfoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  wifiInfoTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  networksContainer: {
    marginTop: 8,
  },
  networksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  sampleContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  sampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sampleTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
  signalStrength: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sampleDetails: {
    marginTop: 4,
  },
  locationInfo: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  locationTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
  },
  exportButton: {
    backgroundColor: '#2196F3',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
});

export default Map;