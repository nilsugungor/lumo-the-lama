import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';

const notifications = [
  { id: '1', message: 'LlamaFan123 liked your post.' },
  { id: '2', message: 'SocialLlama commented: "Amazing view!"' },
  { id: '3', message: 'MountainLover started following you.' },
  { id: '4', message: 'NatureFan liked your comment.' },
  { id: '5', message: 'ChattyLlama mentioned you in a post.' },
];

export default function NotificationsScreen({ navigation }) {
  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <CustomBottomNav onNavigate={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  notificationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
  },
});
