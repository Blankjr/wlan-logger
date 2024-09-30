import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { IconButton, Button } from 'react-native-paper';

const Map = ({ floorNumber, roomNumber, networkEntries, onDeleteEntry, onExportData }) => {
  const netInfo = useNetInfo();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Network Entries:</Text>
        {networkEntries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{entry.name}</Text>
              <IconButton
                icon="close"
                size={20}
                onPress={() => onDeleteEntry(index)}
              />
            </View>
            {Object.entries(entry).map(([key, value]) => 
              key !== 'name' && (
                <Text key={key}>{key}: {value}</Text>
              )
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={onExportData}
          style={styles.exportButton}
        >
          Export Data
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  entryContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32, // Add extra padding at the bottom
  },
  exportButton: {
    marginTop: 8,
  },
});

export default Map;