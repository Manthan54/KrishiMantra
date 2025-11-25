import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { api } from '../utils/api';
import AdvisoryCard from '../components/AdvisoryCard';

export default function AdvisoryScreen() {
  const { t } = useTranslation();
  const [advisorySteps, setAdvisorySteps] = useState([]);

  useEffect(() => {
    fetchAdvisory();
  }, []);

  const fetchAdvisory = async () => {
    try {
      const response = await api.getAdvisory({ crop: 'wheat' });
      setAdvisorySteps(response.advisory_steps || []);
    } catch (error) {
      console.error('Error fetching advisory:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('advisory')}</Text>
      {advisorySteps.map((step, index) => (
        <AdvisoryCard key={index} step={step} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }
});