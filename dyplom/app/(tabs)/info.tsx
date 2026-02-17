import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { animals } from "../../constants/animals";
import React, { useState } from "react";

export default function InfoScreen() {
  const params = useLocalSearchParams();
  const name = params.name as string;
  const { width } = Dimensions.get("window");
  const info = animals[name];
  const [imageIndex, setImageIndex] = useState(0);
  const animal = animals[name];

  if (!info) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Brak informacji o zwierzęciu</Text>
          <Text style={styles.emptySubtitle}>
            Wybierz zdjęcie lub rozpoznaj zwierzę
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* GALERIA */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setImageIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {animal.gallery?.map((img: string, i: number) => (
          <Image key={i} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      {/* DOTS */}
      <View style={styles.dots}>
        {animal.gallery?.map((_: string, i: number) => (
          <View
            key={i}
            style={[styles.dot, imageIndex === i && styles.activeDot]}
          />
        ))}
      </View>

      {/* OPIS */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Opis</Text>
        <Text style={styles.text}>{info.overview}</Text>
      </View>

      {/* PIELĘGNACJA */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pielęgnacja</Text>
        {info.care.map((item: string, i: number) => (
          <Text key={i} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      {/* ŻYWIENIE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Żywienie</Text>
        {info.feeding.map((item: string, i: number) => (
          <Text key={i} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      {/* WARUNKI */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Warunki</Text>
        {info.housing.map((item: string, i: number) => (
          <Text key={i} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      {/* BŁĘDY */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Najczęstsze błędy</Text>
        {info.mistakes.map((item: string, i: number) => (
          <Text key={i} style={styles.listItem}>
            ⚠️ {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#367BEB",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 240,
    resizeMode: "cover",
  },
  section: {
    padding: 16,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#E9EEF6",
  },

  emptyCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#a8c7f9ff",
    alignItems: "center",

    // неоморфизм
    shadowColor: "#FFFFFF",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1F2937",
  },

  emptySubtitle: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: "#E9EEF6",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
});
