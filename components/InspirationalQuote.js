import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styles from '../screens/HomeScreenStyles';

const quotes = [
  "Keep walking gently, the earth sings under your steps.",
  "Every step you take brings you closer to your dreams.",
  "Nature always wears the colors of the spirit.",
  "In every walk with nature, one receives far more than he seeks.",
  "The journey of a thousand miles begins with one step.",
  "Wander often, wonder always.",
  "Let your feet guide you to new adventures.",
  "The earth has music for those who listen.",
  "Adventure is worthwhile.",
  "Life is short and the world is wide.",
  "Go where you feel most alive.",
  "Embrace the glorious mess that you are.",
  "To walk safely, walk softly.",
  "Take only memories, leave only footprints.",
  "Leave the roads, take the trails.",
  "Not all those who wander are lost.",
  "Walk as if you are kissing the earth with your feet.",
  "Find joy in the journey.",
  "Explore, dream, discover.",
  "Let the journey change you."
];

export default function InspirationalQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return <Text style={styles.quoteText}>{quote}</Text>;
}
