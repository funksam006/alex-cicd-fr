import { StyleSheet, Text } from 'react-native';
import React, { memo } from 'react';
// import fonts from '../../Constants/fonts';

const Typography = ({
  size = 12,
  children,
  type = 'regular',
  color = '#000000',
  textAlign = undefined,
  style = {},
  numberOfLines,
  ...props
}) => {
  return (
    <Text
      style={[styles.font(type), { fontSize: size, color, textAlign }, style]}
      numberOfLines={numberOfLines}
      {...props}>
      {children} 
    </Text>
  );
};

export default memo(Typography);

const styles = StyleSheet.create({
  font: type => ({
    // fontFamily: fonts[type] || undefined,
    textAlignVertical: 'center',
    includeFontPadding: false,
  }),
});
