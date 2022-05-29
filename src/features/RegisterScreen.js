import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import Logo from '../../assets/logo.png'
import { TextButton } from '../components/Buttons'
import Input from '../components/Input'

import { Formik } from 'formik'
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext'
import { OutlinedButton } from '../components/Buttons'
import { FontSize, scale, Spacing } from '../styles'

import Ionicons from 'react-native-vector-icons/Ionicons'

const RegisterScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext)

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(4, 'Too Short!').required('Required'),
  })

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={scale(30)} />
      </TouchableOpacity>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <Text style={{ fontSize: FontSize.h3, marginVertical: Spacing.x16 }}>
        REGISTER
      </Text>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={values => register(values.email, values.password)}>
        {({ handleSubmit, isValid }) => (
          <>
            <Input name="email" placeholder="Email" autoCapitalize="none" />
            <Input name="password" placeholder="Password" secureTextEntry />
            <OutlinedButton
              disabled={!isValid}
              style={{ width: '100%' }}
              onPress={() => handleSubmit()}
              label="CREATE ACCOUNT"
            />
          </>
        )}
      </Formik>
      <TextButton
        style={{ marginTop: Spacing.x40 }}
        onPress={() => navigation.navigate('Login')}
        label="Already have an account?"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    maxWidth: 400,
    maxHeight: 400,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: Spacing.x10,
  },
})

export default RegisterScreen
