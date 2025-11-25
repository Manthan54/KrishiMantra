import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { api } from "../utils/api"; // ✅ use central API

const FertilizerCalculator = () => {
  const [landArea, setLandArea] = useState("");
  const [cropType, setCropType] = useState("");
  const [fertilizerResult, setFertilizerResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateFertilizer = async () => {
    setErrorMessage("");
    setFertilizerResult(null);

    try {
      const data = await api.calculateFertilizer(landArea, cropType.trim());

      if (data.status !== "success") {
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setFertilizerResult(data.result);
    } catch (err) {
      setErrorMessage("Failed to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fertilizer Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Land Area (in acres)"
        value={landArea}
        onChangeText={setLandArea}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Crop Type (e.g., Rice, Wheat, Maize)"
        value={cropType}
        onChangeText={setCropType}
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={calculateFertilizer}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      {fertilizerResult && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Required Fertilizer:</Text>
          <Text style={styles.resultText}>
            Nitrogen (N): {fertilizerResult.nitrogen} kg
          </Text>
          <Text style={styles.resultText}>
            Phosphorus (P): {fertilizerResult.phosphorus} kg
          </Text>
          <Text style={styles.resultText}>
            Potassium (K): {fertilizerResult.potassium} kg
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#064e3b",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#16a34a",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#dcfce7",
    borderRadius: 10,
    width: "100%",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#166534",
  },
  resultText: {
    fontSize: 16,
    color: "#064e3b",
  },
});

export default FertilizerCalculator;
