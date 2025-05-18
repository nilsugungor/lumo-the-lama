import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';

export default function HabitTrackerScreen({ navigation }) {
  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the HabitTracker screen.</Text>
      <CustomBottomNav onNavigate={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
