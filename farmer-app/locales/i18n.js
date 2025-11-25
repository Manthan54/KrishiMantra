import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to KrishiMantra',
      language: 'Language',
      soilType: 'Soil Type',
      landSize: 'Land Size (acres)',
      pincode: 'Pincode',
      continue: 'Continue',
      dashboard: 'Dashboard',
      recommendations: 'Crop Recommendations',
      advisory: 'Advisory',
      weather: 'Weather Alerts'
    }
  },
  hi: {
    translation: {
      welcome: 'कृषि मंत्र में आपका स्वागत है',
      language: 'भाषा',
      soilType: 'मिट्टी का प्रकार',
      landSize: 'भूमि का आकार (एकड़)',
      pincode: 'पिनकोड',
      continue: 'जारी रखें',
      dashboard: 'डैशबोर्ड',
      recommendations: 'फसल सुझाव',
      advisory: 'सलाह',
      weather: 'मौसम चेतावनी'
    }
  },
  mr: {
    translation: {
      welcome: 'कृषी मंत्रात आपले स्वागत आहे',
      language: 'भाषा',
      soilType: 'मातीचा प्रकार',
      landSize: 'जमिनीचा आकार (एकर)',
      pincode: 'पिनकोड',
      continue: 'पुढे चला',
      dashboard: 'डॅशबोर्ड',
      recommendations: 'पीक शिफारसी',
      advisory: 'सल्ला',
      weather: 'हवामान इशारे'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;