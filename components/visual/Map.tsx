import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { IconButton, Button, Card, Divider } from 'react-native-paper';

const Map = ({ floorNumber, roomNumber, networkEntries, onDeleteEntry, onExportData }) => {

  console.log('Network Entries:', JSON.stringify(networkEntries, null, 2));

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
        <Button 
          mode="contained" 
          onPress={onExportData}
          style={styles.exportButton}
          icon="file-export-outline"
        >
          Export {networkEntries.length} Scans
        </Button>
      </View>
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
  exportButton: {
    marginTop: 8,
  },
});

export default Map;