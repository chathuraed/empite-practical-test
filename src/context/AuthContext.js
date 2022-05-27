import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { showSnackBar } from '../util'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        setUser,
        login: async (email, password) => {
          try {
            setLoading(true)
            await auth().signInWithEmailAndPassword(email, password)
            setLoading(false)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
        register: async (email, password) => {
          try {
            setLoading(true)
            await auth().createUserWithEmailAndPassword(email, password)
            setLoading(false)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
        logout: async () => {
          try {
            setLoading(true)
            await GoogleSignin.signOut()
            await LoginManager.logOut()
            await auth().signOut()

            setLoading(false)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
        googleLogin: async () => {
          try {
            setLoading(true)
            const { idToken } = await GoogleSignin.signIn()
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
            setLoading(false)
            return auth().signInWithCredential(googleCredential)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
        facebookLogin: async () => {
          try {
            setLoading(true)
            const result = await LoginManager.logInWithPermissions([
              "email",
              "public_profile",
            ])

            if (result.isCancelled) {
              console.log('User cancelled the login process')
            }
            const data = await AccessToken.getCurrentAccessToken()

            if (!data) {
              console.log('Something went wrong obtaining access token')
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken
            )
            setLoading(false)
            return auth().signInWithCredential(facebookCredential)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  )
}
