import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdvisoryCard({ step }) {
  return (
    <View style={styles.card}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepNumber}>Step {step.step}</Text>
        <Text style={styles.duration}>{step.duration}</Text>
      </View>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.description}>{step.description}</Text>
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
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  stepNumber: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  duration: { fontSize: 14, color: '#666' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, color: '#333' }
});