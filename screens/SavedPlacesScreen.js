import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Dimensions, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

import CustomBottomNav from '../components/CustomBottomNav';

const ORS_API_KEY = '5b3ce3597851110001cf62485c6d9d59b3534862964fc51d4adb6958';

export default function SavedPlacesScreen({ navigation }) {
  const [origin, setOrigin] = useState(null);
  const [greenAreas, setGreenAreas] = useState([]);
  const [destinationText, setDestinationText] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const getRoute = async () => {
    if (!origin) {
      Alert.alert('Error', 'Could not get your location.');
      return;
    }
    if (!destinationText.trim()) {
      Alert.alert('Error', 'Destination address not entered.');
      return;
    }
    try {
      const geocodeResponse = await axios.get(
        'https://api.openrouteservice.org/geocode/search',
        {
          params: {
            api_key: ORS_API_KEY,
            text: destinationText,
            'focus.point.lon': origin.longitude,
            'focus.point.lat': origin.latitude,
            'boundary.rect.min_lat': origin.latitude - 0.5,
            'boundary.rect.max_lat': origin.latitude + 0.5,
            'boundary.rect.min_lon': origin.longitude - 0.5,
            'boundary.rect.max_lon': origin.longitude + 0.5,
          },
        }
      );

      const features = geocodeResponse.data.features;
      if (!features || features.length === 0) {
        Alert.alert('Error', 'Address not found.');
        return;
      }

      const coords = features[0].geometry.coordinates;
      const destination = {
        latitude: coords[1],
        longitude: coords[0],
      };

      setDestinationCoords(destination);

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
      Alert.alert('Error', 'Could not get route.');
    }
  };

  const exploreGreenAreas = () => {
    if (!origin) {
      Alert.alert('Error', 'Could not get your location.');
      return;
    }

    const parks = [
      { name: 'Treptower Park', latitude: origin.latitude + 0.005, longitude: origin.longitude + 0.005 },
      { name: 'Familienpark', latitude: origin.latitude + 0.004, longitude: origin.longitude + 0.006 },
      { name: 'Tiergarten', latitude: origin.latitude + 0.003, longitude: origin.longitude + 0.004 },
      { name: 'Viktoriapark', latitude: origin.latitude - 0.003, longitude: origin.longitude + 0.002 },
      { name: 'Mauerpark', latitude: origin.latitude + 0.002, longitude: origin.longitude + 0.003 },
    ];

    setGreenAreas(parks.map(park => ({
      geometry: { coordinates: [park.longitude, park.latitude] },
      properties: { name: park.name },
    })));
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
          placeholder="Where do you want to go, cute llama?"
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
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
        </View>

        {origin && (
          <>
            {/* PARKLAR ÜSTÜNE BAŞLIK */}
            <Text style={styles.sectionTitle}>Recommended Places</Text>

            <View style={styles.parksContainer}>
              {['Treptower Park', 'Mauerpark', 'Viktoriapark', 'Tempelhofer Feld'].map((park, index) => (
                <View key={index} style={styles.parkBox}>
                  <Text style={styles.parkText}>{park}</Text>
                </View>
              ))}
            </View>

            <MapView
              style={styles.map}
              region={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={origin} title="You're here cute llama" />
              {destinationCoords && (
                <Marker coordinate={destinationCoords} title="Llama's Destination" />
              )}
              {routeCoords.length > 0 && (
                <Polyline coordinates={routeCoords} strokeColor="blue" strokeWidth={4} />
              )}
              {Array.isArray(greenAreas) && greenAreas.map((area, index) => (
                <Marker
                  key={`green-marker-${index}`}
                  coordinate={{
                    latitude: area.geometry.coordinates[1],
                    longitude: area.geometry.coordinates[0],
                  }}
                  title={area.properties.name || 'Green Area'}
                  pinColor="green"
                />
              ))}
            </MapView>

            {/* MAPİN ALTINA BAŞLIK */}
            <Text style={styles.sectionTitle}>Recommended Places</Text>

            <View style={styles.parksContainer}>
              {['Treptower Park', 'Mauerpark', 'Viktoriapark', 'Tempelhofer Feld'].map((park, index) => (
                <View key={index} style={styles.parkBox}>
                  <Text style={styles.parkText}>{park}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>

      <CustomBottomNav onNavigate={(screen) => navigation.navigate(screen)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    borderRadius: 10,
  },
  parksContainer: {
    flexDirection: 'column',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  parkBox: {
    backgroundColor: '#f9f4eb',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  parkText: {
    color: '#343F45',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
    color: '#2e2e2e',
    textAlign: 'center',
  },
});
