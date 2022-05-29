import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useField } from 'formik'
import { AppConstants } from '../../constants'
import { FontSize, Spacing } from '../../styles'

const Input = React.forwardRef(({ name, ...props }, ref) => {
  const [field, meta, helpers] = useField(name)
  const [color, setColor] = React.useState(props.disabled ? '#efefef' : '#FFF')
  const [borderColor, setBorderColor] = React.useState('#e8ecf3')
  const [borderWidth, setBorderWidth] = React.useState(StyleSheet.hairlineWidth)

  const onBlur = React.useCallback(() => {
    helpers.setTouched(true)
    setColor('#FFF')
    setBorderColor('#E8ECF3')
    setBorderWidth(StyleSheet.hairlineWidth)
  }, [helpers])

  const onFocus = React.useCallback(() => {
    setColor('#e8f4f8')
    setBorderColor('#7E9DEA')
    setBorderWidth(StyleSheet.hairlineWidth * 2)
  }, [])

  const onChangeText = React.useCallback(
    value => {
      helpers.setValue(value)
      if (props.onChange) {
        props.onChange(value)
      }
    },
    [helpers, props]
  )

  const border = meta.error && meta.touched ? '#ff89a5' : borderColor
  const hasError = meta.error && meta.touched

  return (
    <View
      style={[
        styles.container,
        hasError && styles.errorInput,
        {
          borderColor: border,
          backgroundColor: color,
          borderWidth: borderWidth,
        },
      ]}>
      <TextInput
        {...field}
        {...props}
        ref={ref}
        disabled={props.disabled}
        style={styles.input}
        value={field.value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={() => null}
        onChangeText={onChangeText}
      />
      {hasError && <Text style={styles.errorText}>{meta.error}</Text>}
      {/* code={{key: meta.error || '', params: {field: props.label || field.name}}} */}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: AppConstants.roundness,
    paddingHorizontal: Spacing.x10,
    paddingVertical: Spacing.x2,
    marginVertical: Spacing.x10,
  },
  input: { fontSize: FontSize.caption },
  errorText: {
    fontSize: FontSize.smallLabel,
    color: 'red',
  },
})

export default Input
