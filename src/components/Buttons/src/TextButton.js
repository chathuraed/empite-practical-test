import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import {
  scale,
  Colors,
  Spacing,
  buttonStyles,
  textStyles,
} from '../../../styles'
import Icon from '../../Icon'

const TextButton = ({
  underline,
  prefixIcon,
  suffixIcon,
  onPress,
  label,
  style,
  bold,
}) => {
  const prefixIconView = prefixIcon ? (
    <Icon source={prefixIcon.icon} style={styles.prefixIconContainer} />
  ) : null

  const suffixIconView = suffixIcon ? (
    <Icon source={suffixIcon.icon} style={styles.suffixIconContainer} />
  ) : null

  const labeStyles = bold
    ? buttonStyles.buttonLabelBold
    : buttonStyles.buttonLabel
  const underlineStyle = underline ? textStyles.underline : null

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.buttonBody}>
        {prefixIconView}
        <Text style={[labeStyles, underlineStyle]}>{label}</Text>
        {suffixIconView}
      </View>
    </TouchableOpacity>
  )
}

TextButton.defaultProps = {
  bold: true,
  underline: false,
  prefixIcon: null,
  suffixIcon: null,
}

TextButton.propTypes = {
  bold: PropTypes.bool,
  style: PropTypes.any,
  underline: PropTypes.bool,
  prefixIcon: PropTypes.object,
  suffixIcon: PropTypes.object,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttonBody: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixIconContainer: {
    width: scale(14),
    height: scale(14),
    tintColor: Colors.ACCENT_COLOR,
    marginRight: Spacing.x10,
  },
  suffixIconContainer: {
    width: scale(14),
    height: scale(14),
    tintColor: Colors.ACCENT_COLOR,
    marginLeft: Spacing.x10,
  },
})

export { TextButton }
