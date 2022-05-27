import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Logo from '../../assets/logo.png'
import { ContainedButton } from '../components/Buttons'
import Input from '../components/Input'

import { Formik } from 'formik'
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext'

const LoginScreen = () => {
  const { loading, login, register } = React.useContext(AuthContext)
  
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(4, 'Too Short!').required('Required'),
  })

  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Formik
        enableReinitialize
        initialValues={{
          email: 'chathura@gmail.com',
          password: '12345678',
        }}
        validationSchema={loginSchema}
        onSubmit={values => login(values.email, values.password)}>
        {({ handleSubmit, isValid }) => (
          <>
            <Input name="email" placeholder="Email" />
            <Input name="password" placeholder="Password" secureTextEntry />
            <ContainedButton
              disabled={!isValid || loading}
              style={{ width: '100%' }}
              onPress={() => handleSubmit()}
              label="LOGIN"
            />
          </>
        )}
      </Formik>
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
})

export default LoginScreen
