import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../../common/Colors';
import { InterFonts } from '../../../common/Fonts';
import { Responsive } from '../../../assets/theme/Layout';
import { Images } from '../../../common/Images';
import { Icons } from '../../../common/Icons';
ApplicationHeader
ApplicationButton
import ApplicationOneButtonModal from '../../../components/modal/ApplicationOneButtonModal';
import Toast from 'react-native-toast-message';
import { API, POST } from '../../../backend/Backend';
import ApplicationTextInput from '../../../components/inputs/ApplicationTextInput';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { isValidForm, validators } from '../../../backend/Validators';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isPasswordShows, setPasswordShows] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({});

  // const StartTimer = () => {
  //   console.log("djhdkjhajkd",seconds);
  //   if (seconds > 0) {
  //     const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }
  const onSubmit = () => {
    var errorData = {
      password: validators.checkRequire("Password", password),
      confirmPassword: validators.checkRequire("Confirm Password", confirmPassword) || (password != confirmPassword ? "Password and confirm password should match." : null)
    }
    console.log(route.params);
    setErrors(errorData)
    if (isValidForm(errorData)) {
      var apiData = {
        username: route.params?.id,
        password: password,
        password_confirmation: confirmPassword
      }

      POST(API + "reset_password", apiData,
        (success) => {
          console.log("==>RESET SUCCESS", success);
          setShowModal(true)
        },
        (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message
          })
          console.log("==>RESET error", error);
        },
        (fail) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: fail?.message
          })
          console.log("==>RESET fail", fail);
        },

      )

    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ApplicationHeader />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        <Text style={styles.headingText}>Reset Password</Text>

        <View style={styles.inputMainContainer}>
          <ApplicationTextInput
            icons
            source={Icons.lock}
            secureText
            onChangeText={setPassword}
            headingText="New Password"
            error={errors?.password}
            value={password}
            placeholder={"Enter new password"}
          />
          <ApplicationTextInput
            icons
            source={Icons.lock}
            secureText
            onChangeText={setConfirmPassword}
            headingText="Confirm Password"
            error={errors?.confirmPassword}
            value={confirmPassword}
            placeholder={"Enter confirm password"}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ApplicationButton
            content={'Continue'}
            onPress={() => {
              onSubmit()
            }}
          />
        </View>
      </ScrollView>

      {showModal ? (
        <ApplicationOneButtonModal
          onRequestClose={() => {
            navigation.reset({
              index: 0,
              routes: [{
                name: "Login"
              }]
            })
            setShowModal(false)
          }}
          source={Images.Congratulation}
          headingText={'Congratulations!'}
          subHeading={
            'Your account is ready to use. You willbe redirected to the login page in a few seconds.'
          }
        />
      ) : null}
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
    marginTop: 10,
  },
  inputHeadingText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: InterFonts.regular400,
    marginBottom: 10,
  },
  icons: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: InterFonts.regular400,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Responsive.width(15),
    justifyContent: 'space-between',
  },
  inputMainContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
});

export default ResetPassword;
