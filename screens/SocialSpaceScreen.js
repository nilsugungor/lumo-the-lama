import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';

import CustomBottomNav from '../components/CustomBottomNav'; // if you use it

const dummyPosts = [
  {
    id: '1',
    user: 'LlamaFan123',
    content: 'Just completed my first hike! Feeling great 🏞️',
    likes: 5,
    comments: 2,
  },
  {
    id: '2',
    user: 'SocialLlama',
    content: 'Anyone up for a virtual meetup this weekend?',
    likes: 8,
    comments: 3,
  },
  {
    id: '3',
    user: 'MountainLover',
    content: 'Check out this amazing sunset from today’s trek!',
    likes: 12,
    comments: 4,
  },
  {
    id: '4',
    user: 'NatureFan',
    content: 'Loving the peaceful vibes here, makes me want to camp out.',
    likes: 7,
    comments: 1,
    image: require('./assets/bryantpark.jpg'),
  },
  {
    id: '5',
    user: 'ChattyLlama',
    content: 'Does anyone know good trails near the river?',
    likes: 3,
    comments: 0,
  },
];

export default function SocialSpaceScreen({ navigation }) {
  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const goToActivities = () => {
    navigation.navigate('Activities');
  };

  const goToChatbot = () => {
    navigation.navigate('Chatbot');
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postUser}>{item.user}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.image && (
        <Image source={item.image} style={styles.postImage} resizeMode="cover" />
      )}
      <View style={styles.postActions}>
        <Text style={styles.postActionText}>♡ {item.likes}</Text>
        <Text style={styles.postActionText}>✉️ {item.comments}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LamaSocial!</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={goToActivities}>
          <Text style={styles.buttonText}>LamaActivities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToChatbot}>
          <Text style={styles.buttonText}>Talk to Lumo the Lama</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.feedTitle}>Social Feed</Text>

      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.feedContainer}
      />

      <CustomBottomNav onNavigate={handleNavPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#343F45',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  feedTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#444',
  },
  feedContainer: {
    paddingBottom: 80,
  },
  postContainer: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postUser: {
    fontWeight: '700',
    marginBottom: 5,
    color: '#222',
  },
  postContent: {
    fontSize: 15,
    marginBottom: 10,
    color: '#555',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postActionText: {
    fontSize: 14,
    color: '#777',
  },
});
