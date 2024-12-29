import { DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Color of the selected tab icon and text
    accent: 'red', // Color of the navigation bar background
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={customTheme}>
      <Stack>
        <Stack.Screen name="index" 
        options={{
          headerTitle: 'Wlan Logger',
        }}/>
      </Stack>
    </PaperProvider>
  );
}
