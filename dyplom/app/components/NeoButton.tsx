// app/components/NeoButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type Props = { label: string; onPress?: () => void; style?: ViewStyle };

export default function NeoButton({ label, onPress, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 260,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    // Neomorph effect: subtle outer + inner shadows
    backgroundColor: "#E9EEF6",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    color: "#213547",
    fontWeight: "600",
    fontSize: 16,
  },
});
