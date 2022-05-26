import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, FlatList, View } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { Env } from '../constants'
import { AuthContext } from '../context/AuthContext'
import { requestLocationPermissions } from '../util'
import { ContainedButton } from '../components/Buttons'

const FlatListBasics = ({ data }) => {
  // return flatlist of weather info

  if (data.length === 0) return null
  return (
    <>
      {Object.keys(data).map(key => {
        return (
          <View key={key}>
            <Text>{key}</Text>
            {data[key].map(item => {
              return (
                <View key={item.id}>
                  <Text>{Date(item.dt)}</Text>
                  <Text>{item.weather[0].main}</Text>
                  {/* <Text>{item.vicinity}</Text> */}
                </View>
              )
            })}
          </View>
        )
      })}
    </>
  )
}

const WeatherScreen = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)

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
            setLoading(false)
            setWeatherInfo(data.list)
            const tempGroupByDt = data.list.reduce((acc, cur) => {
              const key = cur.dt_txt.split(' ')[0]
              if (!acc[key]) {
                acc[key] = []
              }
              acc[key].push(cur)
              return acc
            }, {})
            console.log(tempGroupByDt)
            setWeatherInfo(tempGroupByDt)
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocation()
    })
    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaView style={styles.root}>
      <Text>Weather Screen</Text>
      <Text>loading : {loading ? 'yes' : 'no'}</Text>
      <ContainedButton label="signout" onPress={logout} />
      {/* <FlatListBasics data={weatherInfo} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
})

export default WeatherScreen
