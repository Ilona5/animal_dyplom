import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

type Item = {
  id: string;
  animalId: string; // 🔑 ключ для animals.ts (cat, rabbit…)
  label: string; // 🏷️ отображаемое имя
  confidence: number;
  imageUrl?: string;
  createdAt?: any;
};


export default function HistoryScreen() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const q = query(collection(db, "history"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      setItems(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Item, "id">),
        }))
      );
    });

    return () => unsub();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() =>
        router.push({
          pathname: "/info",
          params: { name: item.animalId },
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.label}</Text>

        <Text style={styles.badge}>Pewność: {item.confidence}</Text>

        {item.createdAt && (
          <Text style={styles.date}>
            {new Date(item.createdAt.seconds * 1000).toLocaleString()}
          </Text>
        )}
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9AA8B6" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historia rozpoznań</Text>

      {items.length === 0 ? (
        <Text style={styles.empty}>Brak zapisanych wyników</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#E9EEF6",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    alignSelf: "center",
  },
  empty: {
    marginTop: 40,
    opacity: 0.5,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9EEF6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,

    shadowColor: "#FFFFFF",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "600" },
  date: { fontSize: 12, opacity: 0.5, marginTop: 4 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(180,140,255,0.25)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 12,
    marginTop: 4,
  },
});
