import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { api } from "../utils/api";
import CropCard from "../components/CropCard";

const { width } = Dimensions.get("window");

// Custom Arrow Components
const LeftArrow = ({ color = "white" }) => (
  <View style={[styles.arrow, { borderRightColor: color }]} />
);

const RightArrow = ({ color = "white" }) => (
  <View style={[styles.arrow, styles.rightArrow, { borderLeftColor: color }]} />
);

export default function DashboardScreen({ navigation, route }) {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);
  const [currentMediaSlide, setCurrentMediaSlide] = useState(0);
  const { soilType } = route.params || {};

  // Consistent feature data for farmers
  const farmingFeatures = [
    {
      id: 1,
      title: "Crop Advisory",
      description: "Get expert recommendations for crop selection based on your soil type and local conditions",
      icon: "🌾",
      color: "#2E7D32",
      navigationTarget: "Advisory",
    },
    {
      id: 2,
      title: "Pest Detection",
      description: "Identify crop diseases and pests using photo analysis with treatment suggestions",
      icon: "🔍",
      color: "#2E7D32",
      navigationTarget: "PestDetection",
    },
    {
      id: 3,
      title: "Weather Alerts",
      description: "Receive timely weather updates and farming alerts for your location",
      icon: "🌤️",
      color: "#2E7D32",
      navigationTarget: "Weather",
    },
    {
      id: 4,
      title: "Market Prices",
      description: "Track current market rates for crops to make informed selling decisions",
      icon: "💰",
      color: "#2E7D32",
      navigationTarget: "Market",
    },
    {
      id: 5,
      title: "Fertilizer Calculator",
      description: "Calculate the right amount of fertilizers needed for your crops and land area",
      icon: "🧪",
      color: "#2E7D32",
      navigationTarget: "FertilizerCalculator",
    },
  ];

  useEffect(() => {
    fetchRecommendations();

    // Auto-slide every 6 seconds for better readability
    const mediaInterval = setInterval(() => {
      setCurrentMediaSlide((prev) => (prev + 1) % farmingFeatures.length);
    }, 6000);

    return () => clearInterval(mediaInterval);
  }, [farmingFeatures.length]);

  const fetchRecommendations = async () => {
    try {
      const response = await api.recommendCrop({
        soil_type: soilType,
        season: "kharif",
      });
      setRecommendations(response.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const nextMediaSlide = () => {
    setCurrentMediaSlide((prev) => (prev + 1) % farmingFeatures.length);
  };

  const prevMediaSlide = () => {
    setCurrentMediaSlide(
      (prev) => (prev - 1 + farmingFeatures.length) % farmingFeatures.length
    );
  };

  const goToMediaSlide = (index) => {
    setCurrentMediaSlide(index);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.fullContainer}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>KrishiMantra Dashboard</Text>
            <Text style={styles.subtitle}>Your farming companion</Text>
          </View>

          {/* Crop Recommendations Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended Crops</Text>
            <View style={styles.sectionCard}>
              {recommendations.length > 0 ? (
                recommendations.map((crop, index) => (
                  <CropCard key={index} crop={crop} />
                ))
              ) : (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataIcon}>🌱</Text>
                  <Text style={styles.noDataText}>
                    No crop recommendations available for your soil type yet.
                  </Text>
                  <Text style={styles.noDataSubtext}>
                    Complete your soil analysis for personalized suggestions.
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Quick Access Tools */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Tools</Text>
            <View style={styles.quickToolsGrid}>
              <TouchableOpacity
                style={styles.quickTool}
                onPress={() => navigation.navigate("FertilizerCalculator")}
              >
                <Text style={styles.quickToolIcon}>🧪</Text>
                <Text style={styles.quickToolText}>Fertilizer Calculator</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.quickTool}
                onPress={() => navigation.navigate("PestDetection")}
              >
                <Text style={styles.quickToolIcon}>🔍</Text>
                <Text style={styles.quickToolText}>Pest Detection</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickTool}
                onPress={() => navigation.navigate("Advisory")}
              >
                <Text style={styles.quickToolIcon}>💬</Text>
                <Text style={styles.quickToolText}>Expert Advisory</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickTool}
                onPress={() => navigation.navigate("Weather")}
              >
                <Text style={styles.quickToolIcon}>🌤️</Text>
                <Text style={styles.quickToolText}>Weather Info</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Feature Showcase */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore Features</Text>
            <View style={styles.featureShowcase}>
              {/* Navigation Arrows */}
              <TouchableOpacity
                style={[styles.navArrow, styles.leftArrow]}
                onPress={prevMediaSlide}
                activeOpacity={0.7}
              >
                <LeftArrow />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navArrow, styles.rightArrow]}
                onPress={nextMediaSlide}
                activeOpacity={0.7}
              >
                <RightArrow />
              </TouchableOpacity>

              {/* Feature Content */}
              <View style={styles.featureContent}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>
                    {farmingFeatures[currentMediaSlide].icon}
                  </Text>
                </View>
                
                <Text style={styles.featureTitle}>
                  {farmingFeatures[currentMediaSlide].title}
                </Text>
                
                <Text style={styles.featureDescription}>
                  {farmingFeatures[currentMediaSlide].description}
                </Text>

                {/* Try Feature Button */}
                <TouchableOpacity
                  style={styles.tryFeatureButton}
                  onPress={() =>
                    navigation.navigate(farmingFeatures[currentMediaSlide].navigationTarget)
                  }
                >
                  <Text style={styles.tryFeatureText}>
                    Use {farmingFeatures[currentMediaSlide].title}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Slide Indicators */}
              <View style={styles.indicatorContainer}>
                {farmingFeatures.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.indicator,
                      currentMediaSlide === index && styles.activeIndicator
                    ]}
                    onPress={() => goToMediaSlide(index)}
                  />
                ))}
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${((currentMediaSlide + 1) / farmingFeatures.length) * 100}%`
                    }
                  ]}
                />
              </View>
            </View>

            {/* Feature Counter */}
            <Text style={styles.featureCounter}>
              Feature {currentMediaSlide + 1} of {farmingFeatures.length}
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("YourCrop")}
          >
            <Text style={styles.navIcon}>🌾</Text>
            <Text style={styles.navText}>My Crops</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Market")}
          >
            <Text style={styles.navIcon}>📊</Text>
            <Text style={styles.navText}>Market</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  fullContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  
  // Header Styles
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },

  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // No Data Styles
  noDataContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noDataIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  noDataText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
  noDataSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },

  // Quick Tools Grid
  quickToolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickTool: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: (width - 44) / 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickToolIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickToolText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
  },

  // Feature Showcase
  featureShowcase: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: "relative",
    minHeight: 280,
  },
  
  // Navigation Arrows
  navArrow: {
    position: "absolute",
    top: "40%",
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 12,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  rightArrow: {
    borderRightWidth: 0,
    borderLeftWidth: 12,
  },

  // Feature Content
  featureContent: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f8f0",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 36,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  
  // Try Feature Button
  tryFeatureButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tryFeatureText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Indicators and Progress
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  activeIndicator: {
    backgroundColor: "#2E7D32",
    width: 20,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2E7D32",
    borderRadius: 2,
  },
  featureCounter: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },

  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },

  bottomSpacing: {
    height: 20,
  },
});