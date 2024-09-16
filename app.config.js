const IS_DEV = process.env.APP_VARIANT === "development";
const IS_BETA = process.env.APP_VARIANT === "beta";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const APP_NAME = "Freibewegen";

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
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      // package: "com.blankjr.navigationclient",
      package:
      IS_DEV
        ? "com.blankjr.navigationclient.dev"
        : "com.blankjr.navigationclient",
      // useNextNotificationsApi: IS_DEV,  // Add this line to differentiate behavior
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
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
        projectId: "53469d35-baad-4722-9cc9-6c1f986bd03e",
      },
    },
  },
};
