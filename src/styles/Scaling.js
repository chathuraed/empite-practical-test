import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375 // 360;
const guidelineBaseHeight = 667 // 640;

const scale = size => {
  return (width / guidelineBaseWidth) * size
}

const horizontalScale = size => (width / guidelineBaseWidth) * size
const verticalScale = size => (height / guidelineBaseHeight) * size
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor

export { scale, horizontalScale, verticalScale, moderateScale }
