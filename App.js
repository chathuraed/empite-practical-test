import React from 'react'
import { enableLatestRenderer } from 'react-native-maps'
import { GoogleSignin } from '@react-native-community/google-signin'
import { AuthProvider } from './src/context/AuthContext'

enableLatestRenderer()

import { Env } from './src/constants'
import InitialPoint from './src/InitialPoint'

const App = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: Env.WEB_CLIENT_ID,
    })
  }, [])
  return (
    <AuthProvider>
      <InitialPoint />
    </AuthProvider>
  )
}

export default App
