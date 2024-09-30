const IS_DEV = process.env.APP_VARIANT === "development";
const IS_BETA = process.env.APP_VARIANT === "beta";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const APP_NAME = "wlan-logger";

export default {
  expo: {
    name: IS_DEV
    ? `[DEV] ${APP_NAME}`
    : IS_PREVIEW
      ? `[PREVIEW] ${APP_NAME}`
      : (APP_NAME),
    slug: APP_NAME,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/android/play_store_512.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/android/play_store_512.png",
        backgroundColor: "#ffffff",
      },
      // package: "com.blankjr.navigationclient",
      package:
      IS_DEV
        ? "com.blankjr.wlanlogger.dev"
        : "com.blankjr.wlanlogger",
      // useNextNotificationsApi: IS_DEV,  // Add this line to differentiate behavior
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/web/favicon.ico",
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "25fd7a75-8bc0-4ca9-938d-f6ca701a8556",
      },
    },
  },
};
