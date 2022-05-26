import React from 'react'
import { Image } from 'react-native'
import PropTypes from 'prop-types'

const Icon = ({ resizeMode, style, source }) => {
  return <Image source={source} resizeMode={resizeMode} style={style} />
}

Icon.defaultProps = {
  resizeMode: 'contain',
  style: null,
}

Icon.propTypes = {
  resizeMode: PropTypes.string,
  style: PropTypes.any,
  source: PropTypes.any,
}

export default Icon
