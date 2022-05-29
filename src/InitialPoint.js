import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import FullScreenLoader from './components/FullScreenLoader'
import { AuthContext } from './context/AuthContext'
import RootNavigation from './navigation'

const InitialPoint = () => {
  const { loading } = React.useContext(AuthContext)
  return (
    <>
      <SafeAreaView style={styles.root}>
        <RootNavigation />
        {loading && <FullScreenLoader />}
        {/* <FullScreenLoader /> */}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
})

export default InitialPoint
