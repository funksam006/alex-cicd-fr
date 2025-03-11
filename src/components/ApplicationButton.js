import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {Responsive} from '../assets/theme/Layout';
import {Colors} from '../common/Colors';
import {InterFonts, RobotoFonts} from '../common/Fonts';

// Highlight Button
export function ApplicationButton({onPress, content, buttonStyle, source, img,leftImg,imgStyle,buttonTextStyle}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{...styles.button, ...buttonStyle}}>
              {leftImg ? <Image source={leftImg} style={[styles.sources,imgStyle]} /> : null}

      <Text style={[styles.buttonText,buttonTextStyle]}>{content}</Text>
      
      {img ? <Image source={source} style={styles.sources} /> : null}
    </TouchableOpacity>
  );
}
export function ApplicationOutlineButton({
  onPress,
  content,
  buttonStyle,
  textstyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{...styles.outlinebutton, ...buttonStyle}}>
      <Text style={{...styles.outlineButtonText, ...textstyle}}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    width: '100%',
    backgroundColor: Colors.black,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS == 'android' ? 2 : null,
    flexDirection: 'row',
    
  },
  outlinebutton: {
    height: 54,
    width: '100%',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS == 'android' ? Responsive.height(2) : null,
    marginTop: 20,
  },
  buttonText: {
    fontSize: Responsive.font(17),
    fontFamily: InterFonts.extraBold800,
    color: Colors.white,
    letterSpacing: 1,
    lineHeight: 26,
  },
  outlineButtonText: {
    fontSize: Responsive.font(16),
    fontFamily: RobotoFonts.medium500,
    color: Colors.black,
  },
  sources: {
    width: 25,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
