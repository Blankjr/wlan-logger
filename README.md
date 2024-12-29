# WiFi Scanner App
A React Native mobile application for mapping and analyzing WiFi networks across different floors of a building. This app helps collect, visualize, and analyze WiFi signal data for indoor positioning and network coverage assessment.

> **Important**: This app must be tested on a real Android device due to the WiFi scanning functionality, which cannot be properly simulated in emulators.

## Features

### 🗺️ Floor-based Mapping
- Interactive floor plan selection (Floors 0-3)
- Tap-to-mark position on floor plans
- Visual position indicator

### 📡 Network Scanning
- Comprehensive WiFi network scanning
- Captures SSID, BSSID, signal strength, channel, and security details
- Support for both 2.4GHz and 5GHz bands
- Real-time scanning with position tracking

### 📊 Data Management
- Stores scan results with location metadata
- Export functionality to JSON format
- Server upload capabilities for data synchronization
- Delete individual scan entries

### 📱 User Interface
- Bottom navigation for easy access to main features
- Material Design components using React Native Paper
- Floor plan visualization
- Signal strength indicators with color coding

## Technical Details

### Dependencies
- React Native
- Expo
- React Native Paper for UI components
- @react-native-tethering/wifi for WiFi scanning
- expo-file-system for file operations
- expo-sharing for export functionality

### Data Structure
Each scan entry includes:
- Version ID
- Unique MongoDB-style ObjectID
- Timestamp
- Location data (coordinates, floor, building)
- Network samples with detailed WiFi information

## Get Started

1. Install dependencies
```bash
npm install
```

2. Start the app
* Run dev build now:
```bash
npm run dev
```

3. Build the app (apk)
```bash
npm run build-production
```

## Testing Requirements
### Device Requirements
- Must be tested on a physical Android device
- Emulators do not support the WiFi scanning functionality properly
- Test device should have WiFi capabilities and location services enabled

### Testing Setup
1. Enable Developer Options on your Android device
2. Enable USB debugging
3. Connect device via USB
4. Ensure device is recognized using `adb devices`
5. Run the app using `npm run dev`

## Required Permissions
The app requires the following Android permissions:
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION

These permissions are necessary for WiFi scanning functionality and are automatically requested when using the location selection feature (`SelectDestination.tsx`).
## Troubleshooting

### Build Configuration Issues

#### Android Package Warning
If you see this warning:
```
Warning: Specified value for "android.package" in app.config.js is ignored because 
an android directory was detected in the project.
EAS Build will use the value found in the native code.
```

**Solution:**
1. Delete the `android` folder
2. Let Expo create a new one automatically

**Note:** This issue occurs when switching between dev and preview builds. It's only relevant when deploying new features to external users and doesn't affect regular development.

### Common Issues

1. **WiFi Scanning Not Working**
   - Ensure location permissions are granted
   - Check if WiFi is enabled
   - Verify Android location services are active

2. **Build Failures**
   - Clean the project: `npm clean`
   - Remove node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. **Map Display Issues**
   - Verify floor plan images are in correct directory
   - Check image format compatibility
   - Ensure proper asset linking

## Project Structure
```
src/
  ├── components/
  │   ├── userinput/
  │   │   ├── SelectDestination.tsx   # Floor and position selection component
  │   │   └── MapSelector.tsx         # Interactive floor plan component
  │   │
  │   └── visual/
  │       └── Map.tsx                 # Network scan visualization
  ├── assets/
  │   └── maps/                       # Floor plan images
  └── app/
      └── index.tsx                   # Main app entry point
```

### Building for Production
1. Configure your EAS Build profile in `eas.json`
2. Run the build command for your target platform
3. Follow the Expo build process