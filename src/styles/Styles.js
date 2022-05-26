import { StyleSheet, Platform } from 'react-native'
import { Colors } from './Colors'
import { moderateScale } from './Scaling'
import { hexToRgb } from '../util'
import { Spacing } from './Spacing'

const genericStyles = StyleSheet.create({
  flex1: { flex: 1 },
  alignItemsCenter: { alignItems: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowFlexStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  marginTop4: {
    marginTop: Spacing.x4,
  },
  marginTop6: {
    marginTop: Spacing.x6,
  },
  marginTop8: {
    marginTop: Spacing.x8,
  },
  marginTop10: {
    marginTop: Spacing.x10,
  },
  marginTop12: {
    marginTop: Spacing.x12,
  },
  marginTop14: {
    marginTop: Spacing.x14,
  },
  marginTop16: {
    marginTop: Spacing.x16,
  },
})

const shadowStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonShadow: {
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
})

const textStyles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
})

const buttonStyles = StyleSheet.create({
  buttonLabelBold: {
    fontFamily: Platform.select({
      ios: 'HelveticaNeue-Bold',
      android: 'Roboto-Bold',
    }),
    color: Colors.Text.SECONDARY_COLOR,
    fontSize: moderateScale(20),
  },
  buttonLabel: {
    fontFamily: Platform.select({
      ios: 'HelveticaNeue-Light',
      android: 'Roboto-Light',
    }),
    color: Colors.Text.SECONDARY_COLOR,
    fontSize: moderateScale(18),
  },
  disableLabel: {
    fontFamily: Platform.select({
      ios: 'HelveticaNeue-Bold',
      android: 'Roboto-Bold',
    }),
    color: hexToRgb(Colors.PRIMARY_COLOR, 0.5),
    fontSize: moderateScale(20),
  },
  containedButtonLabel: {
    fontFamily: Platform.select({
      ios: 'HelveticaNeue-Bold',
      android: 'Roboto-Bold',
    }),
    fontSize: moderateScale(20),
  },
})

export { genericStyles, textStyles, shadowStyles, buttonStyles }
