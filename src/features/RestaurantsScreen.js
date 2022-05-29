import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { InteractionManager, ActivityIndicator } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { requestLocationPermissions } from '../util'
import Icon from '../components/Icon'
import { Icons } from '../resource/Icons'
import { Colors, FontSize, genericStyles, scale, Spacing } from '../styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppConstants } from '../constants'

const RestaurantsScreen = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false)
  const [userCoords, setUserCoords] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [isLocationReady, setIsLocationReady] = useState(false)
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState({})
  const mapRef = useRef(null)
  const bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true)
    })
  }, [])

  useEffect(() => {
    const generateMarkers = () => {
      let tempMarkers = []
      for (let i = 0; i < 10; i++) {
        tempMarkers.push({
          title: `Hotel ${i}`,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius vel arcu quis malesuada. Curabitur ut enim dolor. In ac velit sit amet ante lacinia consequat. Donec eget posuere sapien. Aliquam sed nulla eget justo consectetur eleifend. Nullam a massa consequat, elementum arcu ac, porttitor neque. Nam eros nisl, pellentesque ac tempor eget, euismod id enim. In sed enim mollis, tristique massa vel, posuere velit. Integer ac vestibulum ex, eget ultricies quam. Nunc sollicitudin, nulla eget venenatis facilisis, urna enim cursus lacus, vel maximus elit quam ac ante.',
          latLng: {
            latitude:
              userCoords.latitude +
              (Math.random() * (0.001 - 0.009) + 0.009).toFixed(3) * i,
            longitude:
              userCoords.longitude +
              (Math.random() * (0.001 - 0.009) + 0.009).toFixed(3) * i,
          },
          price: '$40',
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

  const onClickMapMarker = useCallback(marker => {
    setSelectedMarker(marker)
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])

  if (!isReady) {
    return <ActivityIndicator />
  }

  return (
    <GestureHandlerRootView style={genericStyles.flex1}>
      <BottomSheetModalProvider>
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
            showsPointsOfInterest={false}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                zIndex={index}
                coordinate={marker.latLng}
                trackViewChanges={false}
                onPress={() => onClickMapMarker(marker)}>
                <View key={`m${index}`}>
                  <Icon
                    style={styles.mapMarker}
                    source={Icons.hotel}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ))}
          </MapView>
          <BottomSheetModal
            enableDismissOnClose={true}
            enablePanDownToClose={true}
            onDismiss={() => setSelectedMarker(null)}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            {selectedMarker !== null && (
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>{selectedMarker.title}</Text>
                  <TouchableOpacity style={styles.bookNowButton}>
                    <Text style={styles.bookNowText}>
                      Book Now {selectedMarker.price}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.description}>
                  {selectedMarker.description}
                </Text>
                <View
                  style={[
                    genericStyles.rowJustify,
                    { marginVertical: Spacing.x20 },
                  ]}>
                  <Icon
                    style={styles.iconStyle}
                    source={Icons.foods}
                    resizeMode="contain"
                  />
                  <Icon
                    style={styles.iconStyle}
                    source={Icons.bathroom}
                    resizeMode="contain"
                  />
                  <Icon
                    style={styles.iconStyle}
                    source={Icons.vehicle_park}
                    resizeMode="contain"
                  />
                  <Icon
                    style={styles.iconStyle}
                    source={Icons.free_wifi}
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: Spacing.x12,
  },
  mapMarker: { width: scale(50), height: scale(50) },
  iconStyle: {
    width: scale(60),
    height: scale(60),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: FontSize.h3, fontWeight: 'bold' },
  bookNowButton: {
    backgroundColor: Colors.BLACK_COLOR,
    borderRadius: AppConstants.roundness,
  },
  bookNowText: {
    fontSize: FontSize.h3,
    fontWeight: 'bold',
    color: Colors.WHITE_COLOR,
    marginHorizontal: Spacing.x20,
  },
  description: { fontSize: FontSize.body, marginTop: Spacing.x8 },
})

export default RestaurantsScreen
