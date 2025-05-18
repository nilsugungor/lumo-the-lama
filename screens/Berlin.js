import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

import CustomBottomNav from '../components/CustomBottomNav';
import styles from './SavedPlacesScreenStyles';

const ORS_API_KEY = '5b3ce3597851110001cf62485c6d9d59b3534862964fc51d4adb6958'; // Your API key
const GREEN_AREAS_URL = 'https://drive.google.com/uc?export=download&id=1DxdvxPdUyQAIPRQCE_zYd9dIJfp3C_Vk'; // Public JSON URL

export default function SavedPlacesScreen({ navigation }) {
  // Fixed origin in Berlin (Example: Brandenburg Gate)
  const fixedOrigin = {
    latitude: 52.516275,
    longitude: 13.377704,
  };

  // Fixed destination text (you can change this)
  const [destinationText, setDestinationText] = useState('Alexanderplatz');
  const [origin] = useState(fixedOrigin);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [greenAreas, setGreenAreas] = useState([]);
  const [nearbyGreenAreas, setNearbyGreenAreas] = useState([]);

  // Load green areas from JSON on component mount
  useEffect(() => {
    const fetchGreenAreas = async () => {
      try {
        const response = await axios.get(GREEN_AREAS_URL);
        setGreenAreas(response.data);
      } catch (error) {
        console.error('Failed to load green areas:', error);
      }
    };

    fetchGreenAreas();
  }, []);

  // Calculate distance between two coords (Haversine formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getRoute = async () => {
    if (!origin) {
      Alert.alert('Error', 'Origin location not set.');
      return;
    }
    if (!destinationText.trim()) {
      Alert.alert('Error', 'Destination text is empty.');
      return;
    }

    try {
      // Geocode destination text to coordinates (limited to Berlin approx)
      const geocodeResponse = await axios.get(
        'https://api.openrouteservice.org/geocode/search',
        {
          params: {
            api_key: ORS_API_KEY,
            text: destinationText,
            'focus.point.lon': origin.longitude,
            'focus.point.lat': origin.latitude,
            'boundary.rect.min_lat': origin.latitude - 0.2,
            'boundary.rect.max_lat': origin.latitude + 0.2,
            'boundary.rect.min_lon': origin.longitude - 0.2,
            'boundary.rect.max_lon': origin.longitude + 0.2,
          },
        }
      );

      const features = geocodeResponse.data.features;
      if (!features || features.length === 0) {
        Alert.alert('Error', 'Destination not found.');
        return;
      }

      const coords = features[0].geometry.coordinates;
      const destination = {
        latitude: coords[1],
        longitude: coords[0],
      };
      setDestinationCoords(destination);

      // Request walking route
      const routeResponse = await axios.post(
        'https://api.openrouteservice.org/v2/directions/foot-walking/geojson',
        {
          coordinates: [
            [origin.longitude, origin.latitude],
            [destination.longitude, destination.latitude],
          ],
        },
        {
          headers: {
            Authorization: ORS_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const geometry = routeResponse.data.features[0].geometry.coordinates;
      const route = geometry.map(([lon, lat]) => ({
        latitude: lat,
        longitude: lon,
      }));

      setRouteCoords(route);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get route.');
    }
  };

  const exploreGreenAreas = () => {
    if (!origin) {
      Alert.alert('Error', 'Origin not set.');
      return;
    }
    // Calculate distance to all green areas and pick closest 3
    const sortedAreas = greenAreas
      .map(area => ({
        ...area,
        distance: getDistance(
          origin.latitude,
          origin.longitude,
          area.latitude,
          area.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    setNearbyGreenAreas(sortedAreas);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Find Lamastic Locations!</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter destination in Berlin"
          value={destinationText}
          onChangeText={setDestinationText}
          returnKeyType="search"
          onSubmitEditing={getRoute}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={getRoute}>
            <Text style={styles.buttonText}>Show Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={exploreGreenAreas}>
            <Text style={styles.buttonText}>Explore Green Areas</Text>
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: fixedOrigin.latitude,
            longitude: fixedOrigin.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={origin} title="Start (fixed location)" pinColor="blue" />

          {destinationCoords && (
            <Marker coordinate={destinationCoords} title="Destination" pinColor="red" />
          )}

          {routeCoords.length > 0 && (
            <Polyline coordinates={routeCoords} strokeColor="blue" strokeWidth={4} />
          )}

          {/* Show all green areas */}
          {greenAreas.map((area, idx) => (
            <Marker
              key={`green-${idx}`}
              coordinate={{ latitude: area.latitude, longitude: area.longitude }}
              title={area.name}
              pinColor="green"
            />
          ))}

          {/* Highlight nearby green areas */}
          {nearbyGreenAreas.map((area, idx) => (
            <Marker
              key={`nearby-green-${idx}`}
              coordinate={{ latitude: area.latitude, longitude: area.longitude }}
              title={`${area.name} (Nearby)`}
              pinColor="lime"
            />
          ))}
        </MapView>
      </View>

      <CustomBottomNav onNavigate={(screen) => navigation.navigate(screen)} />
    </KeyboardAvoidingView>
  );
}
