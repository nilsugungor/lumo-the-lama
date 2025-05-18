import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';

export default function Chatbot({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', from: 'lumo', text: 'Hi! I am Lumo the Lama. How can I help you today?' },
    { id: '2', from: 'user', text: 'Hi Lumo! I want to talk about walking in green areas.' },
    { id: '3', from: 'lumo', text: 'Walking in nature is amazing for mental health! Tell me more.' },
    { id: '4', from: 'user', text: 'It really helps me feel calmer and more focused.' },
    { id: '5', from: 'lumo', text: 'That’s great to hear! Keep it up 😊' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      from: 'user',
      text: inputText.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === 'lumo' ? styles.lumoBubble : styles.userBubble,
      ]}
    >
      <Text style={item.from === 'lumo' ? styles.lumoText : styles.userText}>
        {item.text}
      </Text>
    </View>
  );

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        { /* Title */}
        <Text style={styles.title}>Lumo the Lama</Text>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomBottomNav onNavigate={handleNavPress} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  chatContainer: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 12,
    borderRadius: 15,
  },
  lumoBubble: {
    backgroundColor: '#FFF3C2',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  lumoText: {
    color: '#333',
    fontSize: 16,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
