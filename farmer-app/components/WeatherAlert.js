import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherAlert({ alert }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getSeverityColor(alert.severity) }]}>
      <View style={styles.header}>
        <Text style={styles.type}>{alert.type.toUpperCase()}</Text>
        <Text style={[styles.severity, { color: getSeverityColor(alert.severity) }]}>
          {alert.severity.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.message}>{alert.message}</Text>
      <Text style={styles.action}>Action: {alert.action}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  type: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  severity: { fontSize: 14, fontWeight: 'bold' },
  message: { fontSize: 14, marginBottom: 8, color: '#333' },
  action: { fontSize: 14, fontWeight: '600', color: '#2196F3' }
});