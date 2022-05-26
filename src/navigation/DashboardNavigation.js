import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import WeatherScreen from '../features/WeatherScreen'
import RestaurentsScreen from '../features/RestaurentsScreen'

const Tab = createBottomTabNavigator()

const DashboardNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Weather">
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Restaurents" component={RestaurentsScreen} />
    </Tab.Navigator>
  )
}

export default DashboardNavigation
