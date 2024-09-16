Specified value for "android.package" in app.config.js is ignored because an android directory was detected in the project.
EAS Build will use the value found in the native code.



npx expo install expo-dev-client            
eas build --profile development --platform android

dauert ne weile weil auf expo servern, todo auf lokal auslagern
dannach kann dev server gestartet werden




Error: adb: failed to install /Users/christian/Desktop/navigation-client/android/app/build/outputs/apk/debug/app-debug.apk: Failure [INSTALL_FAILED_UPDATE_INCOMPATIBLE: Existing package com.blankjr.navigationclient signatures do not match newer version; ignoring!]