import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { scale, Colors, Spacing, buttonStyles } from '../../../styles'
import Ripple from 'react-native-material-ripple'
import { AppConstants } from '../../../constants'
import Icon from '../../Icon'

const OutlinedButton = ({
  style,
  tintColor,
  icon,
  onPress,
  label,
  disabled,
}) => {
  const prefixIcon = icon ? (
    <Icon source={icon} style={styles.prefixIconContainer} />
  ) : null

  const rippleBorderRadius =
    style && style.borderRadius ? style.borderRadius : AppConstants.roundness

  const buttonLabelStyle = disabled
    ? buttonStyles.disableLabel
    : buttonStyles.containedButtonLabel

  return (
    <Ripple
      disabled={disabled}
      rippleColor={tintColor}
      style={[
        styles.container,
        style,
        {
          borderColor: tintColor,
        },
      ]}
      rippleContainerBorderRadius={rippleBorderRadius}
      onPress={onPress}>
      <View style={styles.buttonBody}>
        {prefixIcon}
        <Text
          style={{
            // ...buttonStyles.buttonLabel,
            ...{
              color: tintColor,
            },
            ...buttonLabelStyle,
          }}>
          {label}
        </Text>
      </View>
    </Ripple>
  )
}

OutlinedButton.defaultProps = {
  disabled: false,
  icon: null,
  tintColor: Colors.Button.BLACK_COLOR,
}

OutlinedButton.propTypes = {
  disabled: PropTypes.bool,
  style: PropTypes.any,
  icon: PropTypes.any,
  label: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    borderRadius: AppConstants.roundness,
    paddingVertical: Spacing.x12,
    borderWidth: 2,
  },
  buttonBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixIconContainer: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.BLACK_COLOR,
    marginRight: Spacing.x10,
  },
})

export { OutlinedButton }
