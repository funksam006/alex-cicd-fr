import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import ApplicationTextInput from '../../../components/inputs/ApplicationTextInput';
import { Colors } from '../../../common/Colors';
import { Icons } from '../../../common/Icons';
import { Images } from '../../../common/Images';
import { InterFonts, RobotoFonts } from '../../../common/Fonts';
import { Responsive } from '../../../assets/theme/Layout';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { API, POST } from '../../../backend/Backend';
import InstallReferrer from 'react-native-install-referrer';

const Signup = () => {

  const navigation = useNavigation();

  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isPasswordShows, setPasswordShows] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [errors, setErrors] = useState('');
  const [otpData, setOtpData] = useState('');
  const [codeSelect, setCodeSelect] = useState('+27')

  const formValidation = yup.object().shape({
    fullname: yup.string().required('Full name is required'),
    email: yup.string().required('Email is required').email("Email is invalid"),
    phoneNumber: yup
      .string()
      .matches(/^[6-9][0-9]{9}$/, "Phone Number is invalid")
      .min(5)
      .max(30)
      .required("Phone number is required"),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("Confirm Password is required"),
  });

  const [initialValues, setInitialValues] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    referCode: '',
    password: '',
    confirmPassword: ''
  });
  const isFocused = useIsFocused();

  const getInstallReferrer = async () => {
    try {
      const referrer = await InstallReferrer.getInstallReferrer();
      console.log('Install Referrer:', referrer);

      // Extract the referral code
      const urlParams = new URLSearchParams(referrer);
      const referralCode = urlParams.get('refrel');

      if (referralCode) {
        console.log('Referral Code:', referralCode);
        setInitialValues(prevValues => ({
          ...prevValues,
          referCode: referralCode
        }));
      }
    } catch (error) {
      console.error('Error fetching referrer:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getInstallReferrer();
    }
  }, [isFocused]);

  const register = (values) => {
    console.log("xnjajbxb", values);
    if (!isSelected) {
      Toast.show({
        type: "error",
        text1: "Please accept Terms & Condition and Privacy Policy"
      })
      return
    }
    const apiData = {
      name: values.fullname,
      mobile: values.phoneNumber,
      email: values.email,
      referral_by_code: values.referCode,
      password: values.password,
      password_confirmation: values.confirmPassword
    };
    console.log('values.phoneNumber', apiData);
    POST(
      API + "user_register",
      apiData,
      (success) => {
        console.log(success, '=>>>>>Success');
        Toast.show({
          type: success.status === 1 ? "success" : "error",
          text1: success.status === 1 ? "Success" : "Error",
          text2: success.message
        });
        setOtpData(success?.data);
        navigation.navigate('SignOtp', {
          otpData: success?.data,
          codeSelect: codeSelect
        })
        console.log('success?.data', success?.data);
      },
      (error) => {
        console.log(error, '=>>>>>Error');
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message || "Something went wrong"
        });
      },
      (fail) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Network Error"
        });
        console.log(fail, '=>>>>>Fail');
      }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Formik
        initialValues={initialValues}

        onSubmit={values => {
          console.log("ajskahajkdhjkadhjkhjkh");
          register(values);
        }}>
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>

            <ScrollView style={{ flex: 1 }}>
              <ApplicationHeader />

              <View style={styles.logoContainer}>
                <Image source={Images.logo} style={styles.logo} />
              </View>

              <Text style={styles.headingText}>Sign Up</Text>

              <View style={styles.inputMainContainer}>
                <ApplicationTextInput
                  headingText={'Full Name'}
                  source={Icons.person}
                  placeholder={'Enter full name'}
                  value={values.fullname}
                  error={errors?.fullname}
                  onChangeText={handleChange('fullname')}
                />

                <ApplicationTextInput
                  headingText={'Email'}
                  error={errors?.email}
                  source={Icons.sms}
                  placeholder={'Enter email'}
                  keyboardType={'email-address'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />

                <ApplicationTextInput
                  headingText={'Phone'}
                  type="phone"
                  error={errors?.phoneNumber}
                  countryCodeSelect={(e) => {
                    setCodeSelect(e)
                  }}
                  source={Icons.call}
                  placeholder={'Enter phone'}
                  keyboardType={'phone-pad'}
                  maxLength={30}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                />

                <ApplicationTextInput
                  headingText={'Refer Code'}
                  source={Icons.referalCode}
                  placeholder={'Enter your refer code'}
                  value={values.referCode}
                  error={errors.referCode}
                  onChangeText={handleChange('referCode')}
                />

                <ApplicationTextInput
                  headingText={'Password'}
                  error={errors?.password}
                  secure={true}
                  source={Icons.lock}
                  placeholder={'Enter Password'}
                  secureText
                  value={values.password}
                  onChangeText={handleChange('password')}
                />

                <ApplicationTextInput
                  headingText={'Confirm Password'}
                  error={errors?.confirmPassword}
                  secure={true}
                  source={Icons.lock}
                  placeholder={'Enter Confirm Password'}
                  secureText
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                />

                <View style={styles.rememberContainer}>
                  <TouchableOpacity
                    onPress={() => setSelected(!isSelected)}
                    activeOpacity={0.5}>
                    <Image
                      source={isSelected ? Icons.checkbox : Icons.unCheckbox}
                      style={styles.checkbox}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.input, { fontFamily: RobotoFonts.regular400 }]}>
                    I accept The <Text onPress={() => navigation.navigate("cms", { type: "Terms & Conditions", api: "terms" })} >Terms & Condition</Text> and <Text onPress={() => {
                      navigation.navigate("cms", { type: "Privacy Policy", api: "privacy" })
                    }} >Privacy Policy</Text> of the app
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <ApplicationButton
                    content={'SIGN UP'}
                    buttonStyle={{ backgroundColor: Colors.black }}
                    onPress={handleSubmit}
                  />
                </View>

                {/* <Text
                  style={[
                    styles.input,
                    { color: Colors.forgetLink, textAlign: 'center' },
                  ]}>
                  Or continue with
                </Text> */}

                {/* <View style={styles.rememberContainer}>
                  <TouchableOpacity activeOpacity={0.5}>
                    <Image
                      source={Images.facebook}
                      style={[styles.facebook, { marginRight: 15 }]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.5}>
                    <Image source={Images.google} style={styles.facebook} />
                  </TouchableOpacity>
                </View> */}

                <View style={[styles.rememberContainer, { marginBottom: 20 }]}>
                  <Text style={styles.input}>Already have an account?</Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.5}>
                    <Text style={styles.singText}>Log In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>

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
    marginVertical: 25,
  },
  inputMainContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
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
  inputHeadingText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: InterFonts.regular400,
    marginBottom: 10
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
    marginHorizontal: 15
  },
  checkbox: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonContainer: {
    marginVertical: Responsive.height(20),
  },
  facebook: {
    height: 66,
    width: 66,
    resizeMode: 'contain',
  },
  singText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: InterFonts.semiBold600,
    marginLeft: 5,
  },
});

export default Signup;
