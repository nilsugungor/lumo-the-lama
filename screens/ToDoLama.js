import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import CustomBottomNav from '../components/CustomBottomNav';

const initialTasks = [
  { id: '1', task: '🛏️ Get out of bed', done: false },
  { id: '2', task: '🪥 Brush your teeth', done: false },
  { id: '3', task: '🚿 Take a shower', done: false },
  { id: '4', task: '🥣 Make breakfast', done: false },
  { id: '5', task: '🧘‍♀️ Do 5 minutes of meditation', done: false },
];

export default function ToDoLama({ navigation }) {
  const [tasks, setTasks] = useState(initialTasks);

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Checkbox
        value={item.done}
        onValueChange={() => toggleTask(item.id)}
        color={item.done ? '#007AFF' : undefined}
      />
      <Text style={[styles.todoText, item.done && styles.completedText]}>
        {item.task}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDoLama</Text>

      <FlatList
        data={tasks}
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
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});
