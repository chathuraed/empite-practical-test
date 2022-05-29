import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { scale, Colors, Spacing, buttonStyles } from '../../../styles'
import Ripple from 'react-native-material-ripple'
import { AppConstants } from '../../../constants'
import Icon from '../../Icon'

const ContainedButton = ({
  icon,
  rightIcon,
  onPress,
  label,
  labelColor,
  disabled,
  style,
}) => {
  const prefixIcon = icon ? (
    <Icon source={icon} style={styles.prefixIconContainer} />
  ) : null

  const rIcon = rightIcon ? (
    <Icon source={rightIcon} style={styles.rightIconContainer} />
  ) : null

  const rippleBorderRadius =
    style && style.borderRadius ? style.borderRadius : AppConstants.roundness

  const buttonLabelStyle = disabled
    ? buttonStyles.disableLabel
    : buttonStyles.containedButtonLabel

  return (
    <Ripple
      disabled={disabled}
      rippleContainerBorderRadius={rippleBorderRadius}
      style={[styles.container, style]}
      onPress={onPress}>
      <View style={styles.buttonBody}>
        {prefixIcon}
        <Text
          style={{
            ...{
              color: labelColor,
            },
            ...buttonLabelStyle,
          }}>
          {label}
        </Text>
        {rIcon}
      </View>
    </Ripple>
  )
}

ContainedButton.defaultProps = {
  disabled: false,
  icon: null,
  rightIcon: null,
  labelColor: Colors.Text.WHITE_COLOR,
}

ContainedButton.propTypes = {
  style: PropTypes.any,
  labelColor: PropTypes.string,
  icon: PropTypes.any,
  rightIcon: PropTypes.any,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    borderRadius: AppConstants.roundness,
    paddingVertical: Spacing.x12,
    backgroundColor: Colors.Button.PRIMARY_COLOR,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixIconContainer: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.WHITE_COLOR,
    marginRight: Spacing.x10,
  },
  rightIconContainer: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.WHITE_COLOR,
    marginLeft: Spacing.x10,
  },
})

export { ContainedButton }
