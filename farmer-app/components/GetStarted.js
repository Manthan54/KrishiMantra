import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

// Custom Arrow Components
const LeftArrow = ({ color = '#007AFF' }) => (
  <View style={[styles.arrow, { borderRightColor: color }]} />
);

const RightArrow = ({ color = '#007AFF' }) => (
  <View style={[styles.arrow, styles.rightArrow, { borderLeftColor: color }]} />
);

export default function GetStarted({ onNext }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "1. Crop Recommendation",
      description: "Get the best crop suggestions based on soil and weather conditions using our /recommend_crop API.",
      icon: "🌾",
      apiEndpoint: "/recommend_crop"
    },
    {
      id: 2,
      title: "2. Advisory",
      description: "Get expert farming advice and suggestions using the /get_advisory API.",
      icon: "👨‍🌾",
      apiEndpoint: "/get_advisory"
    },
    {
      id: 3,
      title: "3. Weather Alerts",
      description: "Stay updated with real-time weather alerts using the /weather_alerts API.",
      icon: "🌤️",
      apiEndpoint: "/weather_alerts"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to KrishiMantra App</Text>
      
      {/* Slideshow Container */}
      <View style={styles.slideshowContainer}>
        {/* Navigation Arrows */}
        <TouchableOpacity 
          style={[styles.navButton, styles.leftNavButton]} 
          onPress={prevSlide}
        >
          <LeftArrow color="#4CAF50" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.rightNavButton]} 
          onPress={nextSlide}
        >
          <RightArrow color="#4CAF50" />
        </TouchableOpacity>

        {/* Slide Content */}
        <View style={styles.slideContent}>
          <Text style={styles.slideIcon}>{slides[currentSlide].icon}</Text>
          <Text style={styles.sectionTitle}>{slides[currentSlide].title}</Text>
          <Text style={styles.description}>
            {slides[currentSlide].description}
          </Text>
          <Text style={styles.apiEndpoint}>
            API: {slides[currentSlide].apiEndpoint}
          </Text>
        </View>

        {/* Slide Indicators */}
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                currentSlide === index && styles.activeIndicator
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${((currentSlide + 1) / slides.length) * 100}%` }
            ]} 
          />
        </View>
      </View>

      {/* Slide Counter */}
      <Text style={styles.slideCounter}>
        {currentSlide + 1} of {slides.length} features
      </Text>

      {/* Get Started Button */}
      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={onNext} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  slideshowContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    minHeight: 250,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftNavButton: {
    left: 10,
    marginTop: -20,
  },
  rightNavButton: {
    right: 10,
    marginTop: -20,
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  slideIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  apiEndpoint: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#4CAF50',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressContainer: {
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 1.5,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 1.5,
  },
  slideCounter: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  // Custom Arrow Styles
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  rightArrow: {
    borderRightWidth: 0,
    borderLeftWidth: 10,
  },
});