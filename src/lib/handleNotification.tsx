import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const schedulePushNotification = async (notificationContent ?: Notifications.NotificationContentInput) => {
  await Notifications.scheduleNotificationAsync({
    // identifier: "review",
    content: notificationContent ?? {
      title: "Brak wody w doniczce 🌱💧",
      body: "Jak najszybciej uzupełnij poziom wody w doniczce!",
    },
    trigger: null
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token: string = "";

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFAABBCC"
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({projectId: "7f3917fb-975b-4bfd-884b-b343bac89ff7"})).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};