import { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Potrzebne jest pozwolenie na aparat</Text>
        <TouchableOpacity
          style={styles.permissionsButton}
          onPress={requestPermission}
        >
          <Text style={{ color: "white" }}>Daj dostęp</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    router.push({
      pathname: "/result",
      params: { uri: photo.uri },
    });
  };

  const pickImage = async () => {
    // 🔹 запрос разрешения на галерею
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Potrzebne jest pozwolenie na galerię");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      router.push({
        pathname: "/result",
        params: { uri: result.assets[0].uri },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <View style={styles.buttons}>
        <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
          <Text style={styles.text}>Zrób zdjęcie</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage} style={styles.galleryButton}>
          <Text style={styles.text}>Wybierz z galerii</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  permissionsButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#367BEB",
    marginTop: 16,
  },

  buttons: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },

  captureButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 50,
    marginBottom: 10,
  },

  galleryButton: {
    backgroundColor: "#367BEB",
    padding: 14,
    borderRadius: 14,
  },

  text: {
    color: "white",
    fontSize: 16,
  },
});
