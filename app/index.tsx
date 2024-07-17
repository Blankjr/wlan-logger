import SelectDestination from "@/components/userinput/SelectDestination";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {ThemeContext} from '../config/Theme/context';
import {MoonMeetDarkTheme} from '../config/Theme/theme';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text variant="displayLarge">Edit app/index.tsx to edit this screen.</Text>
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <SelectDestination></SelectDestination>
    </View>
  );
}
