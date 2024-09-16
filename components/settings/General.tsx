import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Switch, Subheading, DefaultTheme } from 'react-native-paper'
// import { useStateValue } from '../Store'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
})
function SettingsScreen() {
//   const [state, dispatch] = useStateValue()
//   const { isDarkModeOn } = state
//   const handleThemeChange = () => dispatch({
//     type: 'TOGGLE_THEME',
//     payload: !isDarkModeOn,
//   })
  return (
    <View >
      <View style={styles.row}>
        <Subheading >Rot Grün Schwäche</Subheading>
        {/* <Switch value={isDarkModeOn} onValueChange={handleThemeChange} /> */}
      </View>
    </View>
  )
}
export default SettingsScreen