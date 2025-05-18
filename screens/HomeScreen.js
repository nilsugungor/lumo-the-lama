import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';
import InspirationalQuote from '../components/InspirationalQuote';

export default function HomeScreen({ navigation }) {
  const userName = 'Llama';
  const [habitImageToggled, setHabitImageToggled] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleHabitPress = () => {
    setHabitImageToggled(true);
    setTimeout(() => {
      navigation.navigate('HabitTracker');
    }, 500);
  };

  const handleToDoPress = () => {
    navigation.navigate('ToDoLama');
  };

  const goToSavedPlaces = () => {
    navigation.navigate('SavedPlaces');
  };

  return (
    <View style={styles.container}>
      {/* Header: Avatar + Welcome */}
      <View style={styles.headerRow}>
        <Image
          source={require('./assets/lamavatar.png')}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome, {userName}</Text>
          <InspirationalQuote />
        </View>
      </View>

      {/* Main Map */}
      <TouchableOpacity onPress={goToSavedPlaces} activeOpacity={0.8} style={styles.mapContainer}>
        <Image
          source={require('./assets/main-map.png')}
          style={[styles.mainMapImage, { height: screenHeight * 0.4 }]}
        />
      </TouchableOpacity>

      {/* Two Buttons (Habit + ToDo) */}
      <View style={styles.rowButtonsContainer}>
        <TouchableOpacity
          onPress={handleHabitPress}
          activeOpacity={0.8}
          style={styles.rectangleButton}
        >
          <Image
            source={
              habitImageToggled
                ? require('./assets/habit-active.png')
                : require('./assets/habit-default.png')
            }
            style={styles.rectangleImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToDoPress}
          activeOpacity={0.8}
          style={styles.rectangleButton}
        >
          <Image
            source={require('./assets/todo-default.png')}
            style={styles.rectangleImage}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <CustomBottomNav onNavigate={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingBottom: 70,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    marginTop: 10,
  },
  headerTextContainer: {
    flex: 1,
    marginTop: 6,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  mapContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  mainMapImage: {
    width: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  rowButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  rectangleButton: {
    flex: 1,
    marginHorizontal: 6,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
});
