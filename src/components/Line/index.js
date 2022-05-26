import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = ({ height, color }) => {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        height: height,
        backgroundColor: color,
      }}
    />
  )
}

export default Line

const styles = StyleSheet.create({})
