import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const Maps = () => {
  const [latitude, setLatitude] = useState(-1.9501784);
  const [longitude, setLongitude] = useState(30.0603561);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Geolocation.getCurrentPosition(info => {setLatitude(info?.coords?.latitude); setLongitude(info?.coords?.longitude)});
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} pinColor='blue' />
      </MapView>
    </View>
 );
}

export default Maps;
