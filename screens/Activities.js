import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CustomBottomNav from '../components/CustomBottomNav';

const activitiesData = [
  {
    id: '1',
    company: 'Nike',
    offer: '30% off on all running shoes!',
  },
  {
    id: '2',
    company: 'Adidas',
    offer: 'Buy 1 get 1 free on select sportswear.',
  },
  {
    id: '3',
    company: 'FitGym',
    offer: '50% off on 6-month membership.',
  },
  {
    id: '4',
    company: 'HealthyLife Store',
    offer: '20% off on all supplements.',
  },
];

export default function Activities({ navigation }) {
  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <Text style={styles.companyName}>{item.company}</Text>
      <Text style={styles.offerText}>{item.offer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      
      <FlatList
        data={activitiesData}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
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
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 80, // leave room for bottom nav
  },
  activityCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    color: '#007AFF',
  },
  offerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});
