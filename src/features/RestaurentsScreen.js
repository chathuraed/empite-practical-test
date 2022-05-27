import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { InteractionManager, ActivityIndicator } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { requestLocationPermissions } from '../util'

const RestaurentsScreen = ({ navigation }) => {
  const [isReady, setIsReady] = React.useState(false)
  const [userCoords, setUserCoords] = React.useState({
    latitude: 0,
    longitude: 0,
  })

  const mapRef = useRef(null)

  const onMapReady = () => {
    getUserLocation()
  }

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true)
    })
  }, [])

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setUserCoords(position.coords)
        mapRef.current.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      async error => {
        console.log('Geolocation Error' + error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  if (!isReady) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text>Restaurants Screen</Text>
      <MapView
        style={styles.map}
        ref={mapRef}
        onMapReady={() => onMapReady()}
        region={{
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}></MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})

export default RestaurentsScreen
