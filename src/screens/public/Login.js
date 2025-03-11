import React, {useEffect, useState} from 'react';
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
import {Colors} from '../../common/Colors';
import {ApplicationHeader} from '../../components/ApplicationHeader';
import ApplicationTextInput from '../../components/inputs/ApplicationTextInput';
import {Icons} from '../../common/Icons';
import {Images} from '../../common/Images';
import {InterFonts, RobotoFonts} from '../../common/Fonts';
import {Responsive} from '../../assets/theme/Layout';
import {ApplicationButton} from '../../components/ApplicationButton';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { API, POST } from '../../backend/Backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgetModal from './forget/ForgetModal';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../../features/authReducer';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const [forgetModal,setForgetModel]=useState(false)
 


  const login = () => {
    var apiData = {
      username: username,
      password: password,
      type :3
    };
    POST(
      API + 'user_login',
      apiData,
      success => {
        Toast.show({
          type: success.status == 1 ? 'success' : 'error',
          text1: success.status == 1 ? 'Success' : 'Error',
          text2: success.message,
        });
        AsyncStorage.setItem("TOKEN", JSON.stringify(success?.data?.api_token))
        dispatch(updateUserData(success?.data))
        navigation.reset({
          routes: [{
            name: 'DrawerNavigation'
          }]
        })
        console.log(success?.data);
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
      <ForgetModal visible={forgetModal} onClose={()=>setForgetModel(false)} />
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <ApplicationHeader />

        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        <Text style={styles.headingText}>Log In</Text>

        <View style={styles.inputMainContainer}>
          <ApplicationTextInput
            headingText={'Phone no. or Email id'}
            source={Icons.person}
            placeholder={'Enter phone no. or email id'}
            value={username}
            onChangeText={text => setUsername(text)}
          />

          <Text style={styles.inputHeadingText}>Password</Text>

          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
              }}>
              <Image source={Icons.lock} style={styles.icons} />

              <TextInput
                secureTextEntry={!isPasswordShow}
                style={styles.input}
                placeholderTextColor={Colors.para}
                placeholder="Enter password"
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setPasswordShow(!isPasswordShow)}>
              <Image
                style={styles.icons}
                source={isPasswordShow ? Icons.openEye : Icons.closeEye}
              />
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setForgetModel(true)}>
              <Text style={styles.forgetText}>Forget the password?</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.rememberContainer}>
            <TouchableOpacity
              onPress={() => setSelected(!isSelected)}
              activeOpacity={0.5}>
              <Image
                source={isSelected ? Icons.checkbox : Icons.unCheckbox}
                style={styles.checkbox}
              />
            </TouchableOpacity>
            <Text style={[styles.input, {fontFamily: RobotoFonts.regular400}]}>
              Remember me
            </Text>
          </View> */}

          <View style={styles.buttonContainer}>
            <ApplicationButton
              content={'Log in'}
              buttonStyle={{backgroundColor: Colors.black}}
              onPress={() => login()}
            />
          </View>

          {/* <Text
            style={[
              styles.input,
              {color: Colors.forgetLink, textAlign: 'center'},
            ]}>
            Or continue with
          </Text> */}

          {/* <View style={styles.rememberContainer}>
            <TouchableOpacity activeOpacity={0.5}>
              <Image
                source={Images.facebook}
                style={[styles.facebook, {marginRight: 15}]}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
              <Image source={Images.google} style={styles.facebook} />
            </TouchableOpacity>
          </View> */}

          <View style={[styles.rememberContainer, {marginBottom: 20}]}>
            <Text style={styles.input}>Don’t have an account?</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.5}>
              <Text style={styles.singText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    color: 'black',
    fontSize: 16,
    fontFamily: InterFonts.regular400,
  },
  inputHeadingText: {
    color: 'black',
    fontSize: 14,
    fontFamily: InterFonts.regular400,
  },
  forgetText: {
    color: Colors.forgetLink,
    fontSize: 16,
    fontFamily: InterFonts.medium500,
    marginTop: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  checkbox: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  buttonContainer: {
    marginVertical: Responsive.height(30),
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

export default Login;
