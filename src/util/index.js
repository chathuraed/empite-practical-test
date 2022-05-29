import { Platform } from 'react-native'
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions'

import Snackbar from 'react-native-snackbar'

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

export function getIsDay() {
  const hours = new Date().getHours()
  return hours > 6 && hours < 20
}

export function kelvinToCelcius(value) {
  if (Number.isFinite(value)) {
    // Checking if kelvin is a number.
    const KELVIN_CELSIUS_DIFF = 273.15 // maybe unnecessary here, but it is good practice to avoid magic numbers.
    let celsius = value - KELVIN_CELSIUS_DIFF
    let cel = celsius.toFixed(0) + ' °C'
    return cel // could also be just return kelvin - KELVIN_CELSIUS_DIFF;
  }
}
