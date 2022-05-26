import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import { showSnackBar } from '../util'

export const AuthContext = createContext()

// Provider component that gives our components access to the authContext
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log('user new', user)
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
            await auth().signOut()
            setLoading(false)
          } catch (e) {
            console.log('error', e)
            showSnackBar(e.message)
            setLoading(false)
          }
        },
        googleLogin: async () => {
          const { idToken } = await GoogleSignin.signIn()
          const googleCredential = auth.GoogleAuthProvider.credential(idToken)
          return auth().signInWithCredential(googleCredential)
        },
      }}>
      {children}
    </AuthContext.Provider>
  )
}
