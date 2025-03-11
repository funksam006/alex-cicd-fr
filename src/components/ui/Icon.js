import { StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
// import Press from '../HOC/Press';

const Icon = ({
  size = 23,
  source = null,
  disable = false,
  onPress = () => { },
  touchable = false,
  marginRight = 0,
  loading = false,
  loaderColor = '#fff',
  tintColor = undefined,
  style,
  opacity = 1,
  round = false,
  resizeMode= "cover"
}) => {
  return (
    <TouchableOpacity
    
      disable={disable || !touchable}
      onPress={onPress}
      activeOpacity={0.95}
      style={[styles.wrapper(size), { marginRight }, style,]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={loaderColor} />
      ) : (
        <Image style={[styles.icon(size), {
          tintColor, opacity,
           borderRadius: round ? (size / 2) : 0
        }]} resizeMode={resizeMode} source={source} />
      )}
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: size => {
    return {
      height: size,
      width: size,
      resizeMode: 'contain',

    };
  },
  wrapper: size => {
    return {
      height: size,
      width: size,
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: 5,
    };
  },
});
