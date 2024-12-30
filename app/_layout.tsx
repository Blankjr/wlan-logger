import { DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from 'react-native';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Color of the selected tab icon and text
    accent: 'red', // Color of the navigation bar background
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <PaperProvider theme={customTheme}>
      <View style={{
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        paddingTop: 30
      }}>
        <StatusBar 
          style={isDarkMode ? 'light' : 'dark'}
        />
      </View>
      <Stack>
        <Stack.Screen name="index" 
        options={{
          headerTitle: 'Wlan Logger',
        }}/>
      </Stack>
    </PaperProvider>
  );
}