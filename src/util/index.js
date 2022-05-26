import { Platform } from 'react-native'
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions'

import Snackbar from 'react-native-snackbar'

import RNLocation from 'react-native-location'
import { Colors } from '../styles'

export function hexToRgb(hexValue, alpha) {
  const hex = hexValue.replace('#', '')
  const r = parseInt(
    hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
    16
  )
  const g = parseInt(
    hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
    16
  )
  const b = parseInt(
    hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
    16
  )
  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  return `rgb(${r}, ${g}, ${b})`
}

// Request location permissions
export async function requestLocationPermissions() {
  try {
    if (Platform.OS === 'ios') {
      const statuses = await requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ])

      return (
        statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
        statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
      )
    } else {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ])
      return (
        statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
          RESULTS.GRANTED &&
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
      )
    }
  } catch (err) {
    console.warn(err)
    return false
  }
}

export async function permissionHandle() {
  console.log('here')
  let permission = await RN.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
    },
  })
  console.log('here2')
  console.log(permission)
  let location

  if (!permission) {
    console.log('permission', !permission)
    permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    })
    console.log(permission)
    location = await RNLocation.getLatestLocation({ timeout: 100 })
    console.log(
      location,
      location.longitude,
      location.latitude,
      location.timestamp
    )
  } else {
    console.log('Here 7')
    location = await RNLocation.getLatestLocation({ timeout: 100 })
    console.log(
      location,
      location.longitude,
      location.latitude,
      location.timestamp
    )
  }
}

export function showSnackBar(
  message,
  backgroundColor = Colors.Shades.COLOR_ERROR
) {
  Snackbar.show({
    backgroundColor,
    text: message,
    duration: Snackbar.LENGTH_LONG,
  })
}
