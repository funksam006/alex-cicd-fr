import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Responsive } from '../assets/theme/Layout';
import { Icons } from '../common/Icons';
import { useNavigation } from '@react-navigation/native';
import { InterFonts, RobotoFonts } from '../common/Fonts';
import { Colors } from '../common/Colors';
import Icon from './ui/Icon';

// Highlight Button
export function ApplicationHeader({ image, content, rightContent, addIcons, onPress, source, style }) {

  const navigation = useNavigation();

  return (
    <>
      <View style={[styles.header, style]}>
        <View style={styles.innerHeader}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
            <Image source={Icons.backArrow} style={styles.backArrow} />
          </TouchableOpacity>
          {
            !!image &&
            <Icon source={image} round style={{ marginLeft: 5, marginRight: 5 }} />
          }
          <Text style={styles.headingText}>{content}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={[styles.innerHeader, { justifyContent: 'flex-end', width: '40%' }]}>
          {
            addIcons ?
              <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                <Image source={source} style={styles.backArrow} />
              </TouchableOpacity>
              : null
          }
          {rightContent == 'Edit' ?
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.addText}>{rightContent}</Text>
            </TouchableOpacity>
            :
            <Text style={styles.addText}>{rightContent}</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Responsive.width(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white"
  },
  backArrow: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // tintColor: Colors.black
  },
  innerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%'
  },
  headingText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: RobotoFonts.regular400,
    color: Colors.heading
  },
  addText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: InterFonts.semiBold600,
    color: Colors.black
  }
})