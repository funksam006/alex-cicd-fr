import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Images } from '../../../common/Images';
import { Colors } from '../../../common/Colors';
import { InterFonts } from '../../../common/Fonts';
import { Responsive } from '../../../assets/theme/Layout';
import Toast from 'react-native-toast-message';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { API, POST } from '../../../backend/Backend';

const CELL_COUNT = 4;
const ForgotOtp = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [userotp, setuserotp] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [seconds, setSeconds] = useState(59);
  const [routeData, setRouteData] = useState(route?.params)
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);
  useEffect(() => {
    setRouteData(route?.params)
    Toast.show({
      type: "success",
      text1: `${route?.params?.otp}`
    })
  }, [])

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  const onVerify = () => {
    console.log('DHGFDHGFDHGF',routeData, value.length);
    // navigation.navigate('ResetPassword')
    if (value.length < 4) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter OTP."
      })
      return
    } else if (value != routeData?.otp) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid OTP"
      })
      return
    }

    var apiData = {
      username: routeData?.username,
      // vehicle_registration_id:routeData?.vehicle_id,
      otp: value,
      // mobile:routeData?.mobile,
    }
    POST(API + "recover_password_otp_verify", apiData,
      (success) => {
        console.log(success, '==>SUCCESS driver_otp_verify');
        navigation.navigate("ResetPassword", {
          ...routeData,
          otpData: success?.data,
          // input : selecetd == 1 ? routeData?.mobile : routeData?.email 
        })
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
        console.log(error, '==>error driver_otp_verify');
      },
      (fail) => {
        console.log(fail, '==>fail driver_otp_verify');
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
      },
    )
  }

  const onResend = () => {
    setSeconds(59)
    console.log(routeData, value.length);
    // navigation.navigate('ResetPassword')

    var apiData = {
      username: routeData?.username,
    }
    POST(API + "user_resend_otp", apiData,
      (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data}`
        })
        setRouteData({
          ...routeData,
          otp: success?.data
        })
        console.log(success, '==>SUCCESS user_resend_otp');
        // navigation.navigate("ResetPassword",{

        //   ...success?.data,
        //   // input : selecetd == 1 ? routeData?.mobile : routeData?.email 
        // })

      },
      (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
        console.log(error, '==>error user_resend_otp');

      },
      (fail) => {
        console.log(fail, '==>fail user_resend_otp');
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

        <Text style={styles.headingText}>OTP Verification</Text>
        <Text style={styles.otpText}>OTP has been sent to {routeData?.input}</Text>

        <View style={{ paddingTop: Responsive.height(20) }}>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            rootStyle={styles.otpContainer}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, symbol && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : '---')}
              </Text>
            )}
          />
        </View>
        {
          seconds != 0 &&
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        }
        <View style={styles.buttonContainer}>
          <ApplicationButton
            content={'Verify OTP'}
            onPress={() => onVerify()}
          />
        </View>
        {
          seconds == 0 &&
          <TouchableOpacity activeOpacity={0.5} onPress={() => onResend()} >
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        }
      </ScrollView>
      <Toast />
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
  otpContainer: {
    width: '80%',
    height: 70,
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.selectBorder,
    color: Colors.black,
    borderRadius: 10,
  },
  cell: {
    width: 50,
    height: 50,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1.27,
    borderColor: Colors.para,
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 12,
  },
  focusCell: {
    borderColor: Colors.selectBorder,
    color: Colors.black,
  },
  otpText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: InterFonts.regular400,
    marginTop: 10,
    textAlign: 'center',
  },
  timeText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: InterFonts.regular400,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  resendText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: InterFonts.medium500,
    textAlign: 'center',
  },
});

export default ForgotOtp;
