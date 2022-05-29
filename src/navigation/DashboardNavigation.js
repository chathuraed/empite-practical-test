import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'

import WeatherScreen from '../features/WeatherScreen'
import RestaurantsScreen from '../features/RestaurantsScreen'

const Tab = createBottomTabNavigator()

const DashboardNavigation = () => {
  return (
    <Tab.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Weather">
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ focused, color }) => (
            <Feather name="cloud" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          tabBarLabel: 'Restaurants',
          tabBarIcon: ({ focused, color }) => (
            <Feather name="navigation" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default DashboardNavigation
