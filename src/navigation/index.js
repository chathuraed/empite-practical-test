import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import DashboardNavigation from './DashboardNavigation'
import StackNavigation from './StackNavigation'

const RootNavigation = () => {
  const { user, logout } = React.useContext(AuthContext)

  React.useEffect(() => {
    console.log('logged user', user)
  }, [user])
  return (
    <>
      <NavigationContainer>
        {user ? (
          <DashboardNavigation user={user} logout={logout} />
        ) : (
          <StackNavigation />
        )}
      </NavigationContainer>
    </>
  )
}

export default RootNavigation
