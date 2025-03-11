import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Images} from '../../../common/Images';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {Colors} from '../../../common/Colors';
import {InterFonts, RobotoFonts} from '../../../common/Fonts';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Responsive} from '../../../assets/theme/Layout';
import {ApplicationButton} from '../../../components/ApplicationButton';
import {API, POST} from '../../../backend/Backend';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const CELL_COUNT = 4;

const SignOtp = () => {
  const route = useRoute();

  useEffect(() => {
    Toast.show({
      type: 'success',
      text2: `${route.params?.otpData?.otp}`,
    });
  }, []);

  const navigation = useNavigation();
  const [userotp, setuserotp] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  const onVerifyOtp = () => {
    var apiData = {
      id: route.params?.otpData?.id,
      otp: value,
      mobile: route?.params?.otpData?.mobile,
    };
    console.log('alldata', apiData);

    POST(
      API + 'user_otp_verify',
      apiData,
      success => {
        console.log('=>>>SUCCESSDAATAAA>>>>', success);
        navigation.navigate('BankAccount', {user_id: success?.data?.id});
        Toast.show({
          type: 'success',
          text1: success?.message,
        });
      },
      error => {
        Toast.show({
          type: 'error',
          text1: error?.message,
        });
        console.log('=>>>error', error);
      },
      fail => {
        console.log('=>>>fail', fail);
      },
    );
  };

  const resendOtp = () => {
    var apiData = {
      username:route?.params?.otpData?.mobile,
    };
    POST(
      API + 'user_resend_otp',
      apiData,
      success => {
        Toast.show({
          type: success.status == 1 ? 'success' : 'error',
          text1: `${success.data}`,
          // text2: success.data,
        });
        setSeconds(59);
        // setTimeout(() => {
        //     // setOtpModal(true)
        // }, 500);
      },
      error => {
        console.log(error, '=>>>>>Error');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message || 'Something went wrong',
        });
      },
      fail => {
        console.log(fail, '=>>>>>Fail');
      },
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <ApplicationHeader />

        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        <Text style={styles.headingText}>OTP Verification</Text>
        <Text style={styles.otpText}>
          OTP has been sent to {route?.params?.codeSelect}
          ********{route?.params?.otpData?.mobile % 100}
        </Text>

        <View style={{paddingTop: Responsive.height(20)}}>
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
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, symbol && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : '---')}
              </Text>
            )}
          />
        </View>
        {seconds > 0 && (
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        )}

        <View style={styles.buttonContainer}>
          <ApplicationButton
            content={'Verify OTP'}
            onPress={() => onVerifyOtp()}
          />
        </View>
        {seconds < 1 && (
          <TouchableOpacity activeOpacity={0.5} onPress={() => resendOtp()}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
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
    borderRadius: 10,
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
    fontFamily: RobotoFonts.regular400,
    marginTop: 10,
    textAlign: 'center',
  },
  timeText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: RobotoFonts.regular400,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  resendText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: RobotoFonts.medium500,
    textAlign: 'center',
  },
});

export default SignOtp;
