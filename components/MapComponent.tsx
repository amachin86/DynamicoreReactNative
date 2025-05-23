import React, { useEffect, useState } from 'react';
import { View, PermissionsAndroid, Platform, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapComponent = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permiso de ubicación',
              message: 'Esta app necesita acceso a tu ubicación.',
              buttonNeutral: 'Preguntar luego',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('Permiso denegado.');
            setLoading(false);
            return;
          }
        }
        getCurrentLocation();
      } catch (err) {
        setErrorMsg('Error al solicitar permisos.');
        setLoading(false);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setLoading(false);
        },
        error => {
          setErrorMsg('No se pudo obtener la ubicación.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  const handleCenterLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      },
      error => {
        setErrorMsg('No se pudo centrar la ubicación.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      {region && !loading && (
        <>
          <MapView style={styles.map} region={region} showsUserLocation>
            <Marker coordinate={region} title="Tu ubicación" />
          </MapView>
          <TouchableOpacity style={styles.button} onPress={handleCenterLocation}>
            <Text style={styles.buttonText}>Centrar ubicación</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MapComponent;
