import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import NeoButton from "./components/NeoButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

type RecognitionResult = {
  animal: string;
  confidence: number;
};

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const uri = params.uri as string | undefined;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    if (!uri) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(
        "https://unwhite-darius-trigonometrically.ngrok-free.dev/predict",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!data?.animal) {
        setError("Nie udało się rozpoznać zwierzęcia");
        return;
      }

      setResult({
        animal: data.animal,
        confidence: data.confidence ?? 0,
      });
    } catch (e) {
      setError("Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };
  const ANIMAL_MAP: Record<string, string> = {
    kot: "cat",
    krolik: "rabbit",
    papuga: "parrot",
  };

  const saveToHistory = async () => {
    if (!result || !uri) return;

  if (!result?.animal) return;

  const animalKey = ANIMAL_MAP[result.animal.toLowerCase()];

    if (!animalKey) {
      console.log("Nieznany gatunek:", result.animal);
      return;
    }

    try {
      await addDoc(collection(db, "history"), {
        animalId: animalKey, // 🔑 cat / rabbit / parrot
        label: result.animal, // 🏷 Kot / Królik / Papuga
        confidence: result.confidence,
        imageUrl: uri,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Błąd zapisu do Firestore", e);
    }
  };

  const animalKey = result?.animal
    ? ANIMAL_MAP[result.animal.toLowerCase()]
    : null;
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Wynik rozpoznania</Text>

      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text>Brak zdjęcia</Text>
      )}

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {result && (
        <Text style={styles.result}>
          Gatunek: {result.animal}
          {"\n"}
          Pewność: {(result.confidence * 100).toFixed(1)}%
        </Text>
      )}

      {!result && !loading && (
        <NeoButton label="Analizuj zdjęcie" onPress={runAnalysis} />
      )}

      {result && (
        <>
          <NeoButton label="Zapisz do historii" onPress={saveToHistory} />

          <NeoButton
            label="Szczegóły i pielęgnacja"
            onPress={() =>
              router.push({
                pathname: "/info",
                params: { name: animalKey },
              })
            }
          />
        </>
      )}

      <NeoButton label="Powrót do Home" onPress={() => router.push("/")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EEF6",
    padding: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 14,
    marginVertical: 12,
  },
  result: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 12,
  },
  error: {
    color: "red",
    marginTop: 12,
  },
});
