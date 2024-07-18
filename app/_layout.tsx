import { DarkTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
  
}

export default function RootLayout() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
