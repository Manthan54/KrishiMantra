import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { api } from "../utils/api"; // ✅ Import your API file

export default function PestDetectionScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const detectPest = async () => {
    if (!image) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      const response = await api.detectPest(image);
      setResult(response);
    } catch (error) {
      Alert.alert("Error", "Failed to detect pest. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pest & Disease Detection</Text>
      <Text style={styles.subtitle}>
        Take a clear photo of affected leaves or plants
      </Text>

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setImage(null)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      {image && !loading && (
        <TouchableOpacity style={styles.detectButton} onPress={detectPest}>
          <Text style={styles.detectButtonText}>Detect Pest</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Analyzing image for pests...</Text>
        </View>
      )}

      {/* ✅ Nicely formatted detection result */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Detection Result:</Text>
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Pest: {result.pest}</Text>
            <Text style={styles.resultText}>Confidence: {result.confidence}</Text>
            <Text style={styles.resultText}>
              Recommendation: {result.recommendation}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Tips for Better Detection:</Text>
        <Text style={styles.tip}>• Take clear, well-lit photos of affected areas</Text>
        <Text style={styles.tip}>
          • Focus on leaves, stems, or fruits showing damage
        </Text>
        <Text style={styles.tip}>
          • Include a reference object for scale if possible
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginBottom: 15,
  },
  placeholderContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#888",
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  detectButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detectButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
    textAlign: "center",
  },
  resultCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  tipsContainer: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
  },
  tip: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
});
