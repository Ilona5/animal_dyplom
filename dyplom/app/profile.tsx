import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  // 🔹 ЗАГРУЗКА ПРОФИЛЯ ПРИ ВХОДЕ
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        const raw = await AsyncStorage.getItem("@petProfile");
        if (!raw) return;

        const profile = JSON.parse(raw);
        setName(profile.name || "");
        setSpecies(profile.species || "");
        setDescription(profile.description || "");
        setImageUri(profile.imageUri || null);
      };

      loadProfile();
    }, [])
  );

  // 🔹 ВЫБОР ФОТО
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 🔹 СОХРАНЕНИЕ
  const saveProfile = async () => {
    try {
      const profile = {
        name,
        species,
        description,
        imageUri,
      };

      await AsyncStorage.setItem("@petProfile", JSON.stringify(profile));
      Alert.alert("Sukces", "Profil zapisany");
    } catch {
      Alert.alert("Błąd", "Nie udało się zapisać profilu");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={26} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profil pupila</Text>
            <View style={{ width: 26 }} />
          </View>

          {/* IMAGE */}
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Text style={{ opacity: 0.5 }}>Dodaj zdjęcie</Text>
            )}
          </TouchableOpacity>

          {/* INPUTS */}
          <TextInput
            placeholder="Imię"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Gatunek"
            style={styles.input}
            value={species}
            onChangeText={setSpecies}
          />
          <TextInput
            placeholder="Opis"
            style={[styles.input, { height: 80 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.saveText}>Zapisz profil</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EEF6",
    padding: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  imageBox: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#DDE6F5",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    fontWeight: "600",
  },
});
