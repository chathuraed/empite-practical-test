import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AuthContext } from '../context/AuthContext'
import DashboardNavigation from './DashboardNavigation'
import StackNavigation from './StackNavigation'

const RootNavigation = () => {
  const { user } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log('user', user)
  }, [user])
  return (
    <NavigationContainer>
      {user ? <DashboardNavigation /> : <StackNavigation />}
    </NavigationContainer>
  )
}

export default RootNavigation
