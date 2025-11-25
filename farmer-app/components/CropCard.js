import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CropCard({ crop }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cropName}>{crop.crop_name}</Text>
      <Text style={styles.confidence}>Confidence: {crop.confidence}%</Text>
      <Text style={styles.reason}>{crop.reason}</Text>
      <Text style={styles.yield}>Expected Yield: {crop.expected_yield}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cropName: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50', marginBottom: 5 },
  confidence: { fontSize: 14, color: '#666', marginBottom: 5 },
  reason: { fontSize: 14, marginBottom: 5 },
  yield: { fontSize: 14, fontWeight: '600', color: '#2196F3' }
});