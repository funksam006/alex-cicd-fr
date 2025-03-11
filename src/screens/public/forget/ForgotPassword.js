import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Colors } from '../../../common/Colors';
import { InterFonts } from '../../../common/Fonts';
import { Icons } from '../../../common/Icons';
import Toast from 'react-native-toast-message';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { Images } from '../../../common/Images';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { API, POST } from '../../../backend/Backend';

const ForgotPassword = () => {

  const navigation = useNavigation();
  const route = useRoute()
  const [selecetd, setSelected] = useState('');
  const routeData = route.params?.data


  const onSubmit = () => {
    var apiData = {
      username: routeData?.id,
      type: selecetd
    }
    POST(API + "recover_password", apiData,
      (success) => {
        console.log(success, '==>SUCCESS Bank');
        navigation.navigate("ForgotOtp", {
          ...routeData,
          ...success?.data,
          input: selecetd == 1 ? routeData?.mobile : routeData?.email
        })
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
        console.log(error, '==>error Bank');

      },
      (fail) => {
        console.log(fail, '==>fail Bank');
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
      },
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ApplicationHeader />
      <ScrollView style={{ flex: 1 }}>

        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        <Text style={styles.headingText}>Forgot Password</Text>
        <Text style={styles.otpText}>
          select which contact details should be use to reset your password
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSelected('1')}
          style={selecetd == '1' ? styles.selectedView : styles.unselectedView}>
          <View style={styles.iconContainer}>
            <Image source={Icons.chat} style={styles.chatIcon} />
          </View>

          <View>
            <Text style={selecetd == '1' ? styles.selectedText : styles.unselectedText}>via SMS</Text>
            <Text style={styles.numberText}>{routeData?.mobile}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setSelected('2')}
          style={selecetd == '2' ? styles.selectedView : styles.unselectedView}>
          <View style={styles.iconContainer}>
            <Image source={Icons.sms} style={styles.chatIcon} />
          </View>

          <View>
            <Text style={selecetd == '2' ? styles.selectedText : styles.unselectedText}>via Email</Text>
            <Text style={styles.numberText}>{routeData?.email}</Text>
          </View>
        </TouchableOpacity>
        {
          !!selecetd &&
          <View style={styles.buttonContainer}>
            <ApplicationButton
              content={'Continue'}
              onPress={() => onSubmit()}
            />
          </View>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logo: {
    height: 127,
    width: 127,
    resizeMode: 'contain',
  },
  headingText: {
    fontSize: 24,
    fontFamily: InterFonts.extraBold800,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 25,
  },
  buttonContainer: {
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  otpText: {
    color: Colors.black,
    fontFamily: InterFonts.regular400,
    fontSize: 16,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10
  },
  selectedView: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: Colors.selectBackground,
    borderWidth: 1,
    borderColor: Colors.selectBorder,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  unselectedView: {
    flexDirection: 'row',
    height: 80,
    borderWidth: 1,
    borderColor: Colors.para,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  selectedText: {
    color: Colors.selectBorder,
    fontFamily: InterFonts.medium500,
    fontSize: 13
  },
  unselectedText: {
    color: Colors.para,
    fontFamily: InterFonts.medium500,
    fontSize: 13
  },
  numberText: {
    color: Colors.black,
    fontFamily: InterFonts.bold700,
    fontSize: 16
  },
  iconContainer: {
    height: 54,
    width: 54,
    borderWidth: 1,
    borderColor: Colors.selectBorder,
    borderRadius: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: Colors.black
  }
});

export default ForgotPassword;
