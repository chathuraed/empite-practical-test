import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native'
import { InteractionManager, ActivityIndicator } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import BottomSheet from 'react-native-bottomsheet-reanimated'
import { requestLocationPermissions } from '../util'
import Icon from '../components/Icon'
import { Icons } from '../resource/Icons'
import { scale } from '../styles'

const RestaurentsScreen = ({ navigation }) => {
  const [isReady, setIsReady] = React.useState(false)
  const [userCoords, setUserCoords] = React.useState({
    latitude: 0,
    longitude: 0,
  })
  const [isLocationReady, setIsLocationReady] = React.useState(false)
  const [markers, setMarkers] = React.useState([])
  const mapRef = useRef(null)

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true)
    })
  }, [])

  React.useEffect(() => {
    const generateMarkers = () => {
      let tempMarkers = []
      for (let i = 0; i < 10; i++) {
        tempMarkers.push({
          title: `Marker ${i}`,
          description: `Description ${i}`,
          latLng: {
            latitude:
              userCoords.latitude +
              (Math.random() * (0.001 - 0.009) + 0.009).toFixed(3) * i,
            longitude:
              userCoords.longitude +
              (Math.random() * (0.001 - 0.009) + 0.009).toFixed(3) * i,
          },
        })
      }
      return tempMarkers
    }
    if (isLocationReady) {
      setMarkers(generateMarkers())
    }
  }, [isLocationReady, userCoords])

  const onMapReady = async () => {
    try {
      const granted = await requestLocationPermissions()
      console.log('permission', granted)
      if (granted) {
        getUserLocation()
      }
    } catch (e) {
      console.warn(e)
    }
  }

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setUserCoords(position.coords)
        setIsLocationReady(true)
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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        onMapReady={() => onMapReady()}
        region={{
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsCompass={false}
        showsTraffic={false}
        showsIndoors={false}
        showsBuildings={false}
        showsPointsOfInterest={false}
        loadingEnabled={true}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            zIndex={index}
            coordinate={marker.latLng}
            trackViewChanges={false}
            onPress={() => console.log('hi')}>
            <View key={`m${index}`}>
              <Icon
                style={{ width: scale(50), height: scale(50) }}
                source={Icons.hotel}
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        // backDropColor="red"
        ref="BottomSheet"
        initialPosition={'50%'}
        // snapPoints={snapPoints}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        // overDrag={false}
        // keyboardAware
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={
          <View>
            <Text style={styles.text}>Header</Text>
          </View>
        }
        body={
          <View style={styles.body}>
            <Text style={styles.text}>Body</Text>
            <TextInput style={{ width: '100%', backgroundColor: 'gray' }} />
            {/* <FlatlistComponent /> */}
          </View>
        }
      />
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
