import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { enableLatestRenderer } from 'react-native-maps'
import { GoogleSignin } from '@react-native-community/google-signin'
import { AuthProvider } from './src/context/AuthContext'

enableLatestRenderer()

import RootNavigation from './src/navigation'
import { Env } from './src/constants'

// await GoogleSignin.configure({
//   iosClientId: '#id.apps.googleusercontent.com',
//   webClientId: '#id.apps.googleusercontent.com',
//   offlineAccess: false
// });

const App = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: Env.WEB_CLIENT_ID,
    })
  }, [])
  return (
    <AuthProvider>
      <SafeAreaView style={styles.root}>
        <RootNavigation />
      </SafeAreaView>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
})

export default App
