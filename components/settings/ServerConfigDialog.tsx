import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Dialog, TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL_KEY = 'server_url';
const DEFAULT_SERVER_URL = 'http://192.168.1.105:8006';

const ServerConfigDialog = ({ visible, onDismiss, onSave }) => {
  const [serverUrl, setServerUrl] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    loadSavedUrl();
  }, [visible]);

  const loadSavedUrl = async () => {
    try {
      const savedUrl = await AsyncStorage.getItem(SERVER_URL_KEY);
      setServerUrl(savedUrl || DEFAULT_SERVER_URL);
    } catch (error) {
      console.error('Error loading server URL:', error);
      setServerUrl(DEFAULT_SERVER_URL);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    if (!serverUrl.trim()) {
      setError('Server URL cannot be empty');
      return;
    }

    if (!validateUrl(serverUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      await AsyncStorage.setItem(SERVER_URL_KEY, serverUrl);
      onSave(serverUrl);
      onDismiss();
    } catch (error) {
      console.error('Error saving server URL:', error);
      setError('Failed to save server URL');
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Server Configuration</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.label}>Server URL</Text>
          <TextInput
            value={serverUrl}
            onChangeText={(text) => {
              setServerUrl(text);
              setError('');
            }}
            placeholder="Enter server URL"
            mode="outlined"
            error={!!error}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  error: {
    color: '#B00020',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ServerConfigDialog;