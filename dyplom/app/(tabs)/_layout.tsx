import { Tabs } from "expo-router";
import { Image } from "react-native";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2B6CB0",
        tabBarInactiveTintColor: "#7F8A9A",
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarStyle: {
          backgroundColor: "#E9EEF6",
          borderTopWidth: 0,
          height: 72,
          paddingBottom: 10,
          paddingTop: 6,
          borderRadius: 24,
          marginHorizontal: 16,
          marginBottom: 10,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/icons/home.png")}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: focused ? "#2B6CB0" : "#7F8A9A",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/icons/camera.png")}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: focused ? "#2B6CB0" : "#7F8A9A",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/icons/history.png")}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: focused ? "#2B6CB0" : "#7F8A9A",
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: "Info",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/icons/info.png")}
              style={{
                width: 22,
                height: 22,
                resizeMode: "contain",
                tintColor: focused ? "#2B6CB0" : "#7F8A9A",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
