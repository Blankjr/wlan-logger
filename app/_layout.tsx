import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const theme = {
  
}

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </PaperProvider>
  );
}
