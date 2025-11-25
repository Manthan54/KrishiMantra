import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// ✅ Components & Screens
import GetStarted from "./components/GetStarted";
import OnboardingScreen from "./screens/OnboardingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AdvisoryScreen from "./screens/AdvisoryScreen";
import WeatherScreen from "./screens/WeatherScreen";
import MarketScreen from "./components/MarketScreen"; // or './screens/MarketScreen'
import PestDetectionScreen from "./screens/PestDetectionScreen"; 
import FertilizerCalculator from "./screens/FertilizerCalculator";

// ✅ Chatbot Component
import Chatbot from "./screens/Chatbot";

const Stack = createStackNavigator();

export default function App() {
  const [showGetStarted, setShowGetStarted] = useState(true);

  if (showGetStarted) {
    return <GetStarted onNext={() => setShowGetStarted(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Advisory" component={AdvisoryScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Market" component={MarketScreen} />
        <Stack.Screen name="PestDetection" component={PestDetectionScreen} />
        <Stack.Screen name="FertilizerCalculator" component={FertilizerCalculator} />
      </Stack.Navigator>

     
      <Chatbot />
    </NavigationContainer>
  );
}
