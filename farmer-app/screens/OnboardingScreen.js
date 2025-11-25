import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

export default function OnboardingScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [soilType, setSoilType] = useState('loamy');
  const [landSize, setLandSize] = useState('');
  const [pincode, setPincode] = useState('');

  const handleContinue = () => {
    navigation.navigate('Dashboard', { soilType, landSize, pincode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      
      <Text style={styles.label}>{t('language')}</Text>
      <Picker selectedValue={language} onValueChange={(value) => {
        setLanguage(value);
        i18n.changeLanguage(value);
      }}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="हिंदी" value="hi" />
        <Picker.Item label="मराठी" value="mr" />
      </Picker>

      <Text style={styles.label}>{t('soilType')}</Text>
      <Picker selectedValue={soilType} onValueChange={setSoilType}>
        <Picker.Item label="Loamy" value="loamy" />
        <Picker.Item label="Clay" value="clay" />
        <Picker.Item label="Sandy" value="sandy" />
        <Picker.Item label="Black" value="black" />
      </Picker>

      <Text style={styles.label}>{t('landSize')}</Text>
      <TextInput
        style={styles.input}
        value={landSize}
        onChangeText={setLandSize}
        keyboardType="numeric"
        placeholder="5"
      />

      <Text style={styles.label}>{t('pincode')}</Text>
      <TextInput
        style={styles.input}
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
        placeholder="411001"
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>{t('continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});