import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { AppConstants, Env } from '../constants'
import { AuthContext } from '../context/AuthContext'
import { kelvinToCelcius, requestLocationPermissions } from '../util'
import { Colors, FontSize, scale, Spacing } from '../styles'
import Icon from '../components/Icon'

const WeatherScreen = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)

  const [area, setArea] = useState({})
  const [weatherInfo, setWeatherInfo] = React.useState([])

  const getLocation = async () => {
    try {
      const granted = await requestLocationPermissions()
      if (granted) {
        setLoading(true)
        Geolocation.getCurrentPosition(
          async ({ coords: { latitude, longitude } }) => {
            const { data } = await axios.get(
              // `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&appid=${Env.WEATHER_API_KEY}` // TO FORCAST 16 DAYS need Paid Subscription
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Env.WEATHER_API_KEY}`
            )

            const response = await axios.get(
              `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${Env.WEATHER_API_KEY}`
            )
            setArea(response.data[0])

            console.log(area)
            setLoading(false)
            setWeatherInfo(data.list)
            // const tempGroupByDt = data.list.reduce((acc, cur) => {
            //   const key = cur.dt_txt.split(' ')[0]
            //   if (!acc[key]) {
            //     acc[key] = []
            //   }
            //   acc[key].push(cur)
            //   return acc
            // }, {})
            // setWeatherInfo(tempGroupByDt)
          },
          error => {
            console.log(error)
            setLoading(false)
          }
        )
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocation()
    })
    return unsubscribe
  }, [navigation])

  const renderItem = ({ item }) => {
    var iconurl =
      'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'
    return (
      <View style={styles.weatherCard}>
        <View style={styles.weatherContainer}>
          <View>
            <Text style={styles.areaName}>{area.name}</Text>
            <Text style={{ fontSize: FontSize.h4 }}>{item.dt_txt}</Text>
            <Text>Temperature : {kelvinToCelcius(item.main.temp)}</Text>
            <Text>Humidity : {item.main.humidity}</Text>
            <Text>Wind Speed : {item.wind.speed}</Text>
          </View>

          <View style={styles.iconContainer}>
            <Icon
              source={{ uri: iconurl }}
              style={{ width: scale(60), height: scale(60) }}
              resizeMode="contain"
            />
            <Text>{item.weather[0].description}</Text>
          </View>
        </View>
      </View>
    )
  }

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        style={{ flex: 1, marginVertical: Spacing.x10 }}
        data={weatherInfo}
        renderItem={renderItem}
        keyExtractor={item => item.dt.toString()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  weatherCard: {
    marginHorizontal: Spacing.x10,
    borderRadius: AppConstants.roundness,
    marginBottom: Spacing.x10,
    paddingHorizontal: Spacing.x12,
    backgroundColor: Colors.WHITE_COLOR,
    paddingBottom: Spacing.x12,
  },
  weatherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaName: { fontSize: FontSize.h3, fontWeight: '600' },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default WeatherScreen
