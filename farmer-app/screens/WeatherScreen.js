import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { api } from '../utils/api';
import WeatherAlert from '../components/WeatherAlert';

export default function WeatherScreen() {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchWeatherAlerts();
  }, []);

  const fetchWeatherAlerts = async () => {
    try {
      const response = await api.getWeatherAlerts();
      setAlerts(response.alerts || []);
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('weather')}</Text>
      {alerts.map((alert) => (
        <WeatherAlert key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }
});