import React, { useContext } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext'
import { Colors, FontSize, scale, Spacing } from '../styles'
import { OutlinedButton } from '../components/Buttons/src/OutlinedButton'
import { Images } from '../resource/Images'
import Icon from '../components/Icon'
import { Icons } from '../resource/Icons'
import Line from '../components/Line'
import { useNavigation } from '@react-navigation/native'

const LandingScreen = ({ navigation }) => {
  console.log(navigation)
  const { googleLogin, facebookLogin } = useContext(AuthContext)
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.text}>SIGN IN OR REGISTER</Text>
        <OutlinedButton
          style={{ width: '100%', marginVertical: Spacing.x10 }}
          onPress={() => navigation.navigate('Login')}
          label="SIGN IN WITH EMAIL"
        />
        <OutlinedButton
          style={{ width: '100%' }}
          onPress={() => navigation.navigate('Register')}
          label="CREATE AN ACCOUNT"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Spacing.x40,
        }}>
        <Line height={scale(3)} color={Colors.Text.INACTIVE_COLOR} />
        <Text style={[styles.text, { marginHorizontal: Spacing.x8 }]}>OR</Text>
        <Line height={scale(3)} color={Colors.Text.INACTIVE_COLOR} />
      </View>
      <View
        style={{
          marginVertical: Spacing.x40,
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity onPress={() => googleLogin()}>
          <Icon
            style={styles.icon}
            source={Icons.google}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => facebookLogin()}>
          <Icon
            style={styles.icon}
            source={Icons.facebook}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    maxWidth: 400,
    maxHeight: 400,
  },
  text: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginVertical: Spacing.x10,
    color: Colors.Text.INACTIVE_COLOR,
  },
  icon: {
    width: scale(60),
    height: scale(60),
  },
})

export default LandingScreen
