import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { DotIndicator } from 'react-native-indicators'
import { BallIndicator } from 'react-native-indicators'
import { PulseIndicator } from 'react-native-indicators'
import { UIActivityIndicator } from 'react-native-indicators'

const FullScreenLoader = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <UIActivityIndicator color="black" size={60} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default FullScreenLoader
