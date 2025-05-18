import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';

export default function AccountScreen({ navigation }) {
  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleOptionPress = (option) => {
    // Buraya navigasyon veya işlemler eklenebilir
    alert(`${option} pressed`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.userName}>Nilsu Güngör</Text>

        <ScrollView style={styles.optionsContainer}>
          {['Settings', 'Privacy', 'Notifications', 'Help & Support', 'Log Out'].map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionButton}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <CustomBottomNav onNavigate={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
