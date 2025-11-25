import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ActivityIndicator
} from "react-native";
import { api } from "../utils/api";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call the chatbot API
      const data = await api.chatbot(input);
      
      if (data && data.reply) {
        // Add bot response
        setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        // Handle error response
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: data?.error || "Failed to get response. Please try again." 
        }]);
      }
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Network error. Please check your connection and try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Farm Logo */}
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Text style={styles.fabText}>👨‍🌾</Text>
      </TouchableOpacity>

      {/* Chatbot Modal */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerIcon}>🌾</Text>
                <Text style={styles.headerText}>KrishiMantra Assistant</Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Welcome Message */}
            {messages.length === 0 && (
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeIcon}>🌱</Text>
                <Text style={styles.welcomeTitle}>Welcome to KrishiMantra!</Text>
                <Text style={styles.welcomeText}>
                  I'm your farming assistant. Ask me about:
                </Text>
                <View style={styles.suggestionsList}>
                  <Text style={styles.suggestionItem}>• Crop recommendations</Text>
                  <Text style={styles.suggestionItem}>• Pest management</Text>
                  <Text style={styles.suggestionItem}>• Weather guidance</Text>
                  <Text style={styles.suggestionItem}>• Fertilizer advice</Text>
                </View>
              </View>
            )}

            <FlatList
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={[
                  styles.messageContainer, 
                  item.sender === "user" ? styles.userContainer : styles.botContainer
                ]}>
                  {item.sender === "bot" && (
                    <Text style={styles.botIcon}>🌾</Text>
                  )}
                  <Text style={[
                    styles.messageText,
                    item.sender === "user" ? styles.userText : styles.botText
                  ]}>
                    {item.text}
                  </Text>
                </View>
              )}
              contentContainerStyle={styles.messagesList}
            />

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#2E7D32" />
                <Text style={styles.loadingText}>Assistant is thinking...</Text>
              </View>
            )}

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Ask about farming, crops, weather..."
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                editable={!loading}
                multiline={true}
                maxLength={500}
              />
              <TouchableOpacity 
                style={[styles.sendBtn, loading && styles.sendBtnDisabled]} 
                onPress={sendMessage}
                disabled={loading || !input.trim()}
              >
                <Text style={styles.sendText}>📤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2E7D32",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: { 
    fontSize: 28, 
    color: "#fff" 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  chatContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "85%",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#e8f5e8",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  closeIcon: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
    padding: 4,
  },
  
  // Welcome Section
  welcomeContainer: {
    backgroundColor: "#f0f8f0",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  welcomeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 12,
  },
  suggestionsList: {
    alignSelf: "stretch",
  },
  suggestionItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    paddingLeft: 8,
  },

  // Messages
  messagesList: {
    paddingBottom: 16,
  },
  messageContainer: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userContainer: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botContainer: {
    backgroundColor: "#f0f8f0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e8f5e8",
  },
  botIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  userText: {
    color: "#fff",
    fontWeight: "500",
  },
  botText: {
    color: "#333",
  },

  // Loading
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  loadingText: {
    marginLeft: 8,
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "500",
  },

  // Input Section
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#e8f5e8",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    maxHeight: 100,
    minHeight: 44,
  },
  sendBtn: {
    marginLeft: 12,
    backgroundColor: "#2E7D32",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sendBtnDisabled: {
    backgroundColor: "#ccc",
    elevation: 0,
  },
  sendText: { 
    fontSize: 18,
  },
});

export default Chatbot;