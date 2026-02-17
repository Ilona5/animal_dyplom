import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { router, Stack } from "expo-router";
import { Animated } from "react-native";
import { useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const hints = [
    "Zrób zdjęcie zwierza",
    "Rozpoznaj zwierzę",
    "Sprawdż jakie to zwierzę",
  ];
  const hint = hints[Math.floor(Math.random() * hints.length)];
  const fade = useRef(new Animated.Value(0)).current;
const insets = useSafeAreaInsets();
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.profileButton,{top:insets.top+10}]}
          onPress={() => router.push("/profile")}
        >
          <Image
            source={require("../../assets/images/icons/profile.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />

        {/* Glass Card */}
        <Pressable onPress={() => router.push("/camera")}>
          <BlurView intensity={40} tint="light" style={styles.card}>
            <Text style={styles.icon}>🐾</Text>
            <Text style={styles.title}>AI Animal</Text>
            <Text style={styles.subtitle}>{hint}</Text>
          </BlurView>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EEF6",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Glass Card */
  card: {
    width: "80%",
    borderRadius: 26,
    padding: 26,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },

  icon: {
    fontSize: 42,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#4B5563",
  },

  /* Liquid shapes */
  blobTop: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(120,180,255,0.35)",
  },

  blobBottom: {
    position: "absolute",
    bottom: -140,
    left: -120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(180,140,255,0.25)",
  },
  profileButton: {
    position: "absolute",
    
    right: 16,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E9EEF6",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,

    // неоморфизм
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },

  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
