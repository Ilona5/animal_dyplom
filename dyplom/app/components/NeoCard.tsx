// app/components/NeoCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

export default function NeoCard({ children }: { children: any }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E9EEF6",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
});
