// screens/MarketScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function MarketScreen() {
  const mockCropPrices = [
    { name: "CABBAGE", quantity: "10 kg", price: "₹ 100 - ₹ 150", dailyChange: -20 },
    { name: "CAULIFLOWER", quantity: "10 kg", price: "₹ 100 - ₹ 180", dailyChange: 10 },
    { name: "CHILLI", quantity: "10 kg", price: "₹ 400 - ₹ 500", dailyChange: -5 },
    { name: "NATI TOMATO", quantity: "10 kg", price: "₹ 60 - ₹ 140", dailyChange: -15 },
    { name: "OKRA", quantity: "10 kg", price: "₹ 160 - ₹ 240", dailyChange: 20 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crop Prices for Nearby Mandi</Text>

      {/* Crop List */}
      {mockCropPrices.map((crop, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.cropQuantity}>{crop.quantity}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.price}>{crop.price}</Text>
            <Text
              style={[
                styles.dailyChange,
                crop.dailyChange > 0 ? { color: "green" } : { color: "red" },
              ]}
            >
              {crop.dailyChange > 0 ? "▲" : "▼"} ₹ {Math.abs(crop.dailyChange)}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cropName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },
  cropQuantity: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2e7d32",
  },
  dailyChange: {
    fontSize: 13,
    marginTop: 4,
  },
});
