import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CustomBottomNav({ onNavigate }) {
  const handleNavPress = (screen) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress('SavedPlaces')}>
        <Image source={require('../screens/assets/saved.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress('SocialSpace')}>
        <Image source={require('../screens/assets/socialspace.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress('Home')}>
        <Image source={require('../screens/assets/home.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress('Notifications')}>
        <Image source={require('../screens/assets/notifications.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress('Account')}>
        <Image source={require('../screens/assets/account.png')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#FFF3C2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
  },
  navButton: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});
