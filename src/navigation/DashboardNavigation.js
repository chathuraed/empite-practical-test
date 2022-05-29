import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'

import WeatherScreen from '../features/WeatherScreen'
import RestaurantsScreen from '../features/RestaurantsScreen'
import { Colors, FontSize, scale, Spacing } from '../styles'

const Tab = createBottomTabNavigator()

const DashboardNavigation = ({ user, logout }) => {
  return (
    <Tab.Navigator initialRouteName="Weather">
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ focused, color }) => (
            <Feather name="cloud" size={25} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: Spacing.x8 }}
              onPress={() => logout()}>
              <Text
                style={{
                  marginRight: Spacing.x8,
                  fontWeight: '700',
                  color: Colors.Fancy.COLOR_RED,
                }}>
                Signout
              </Text>
            </TouchableOpacity>
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
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: Spacing.x8 }}
              onPress={() => logout()}>
              <Text
                style={{
                  marginRight: Spacing.x8,
                  fontWeight: '700',
                  color: Colors.Fancy.COLOR_RED,
                }}>
                Signout
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default DashboardNavigation
