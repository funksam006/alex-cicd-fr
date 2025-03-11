import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {Colors} from '../../common/Colors';
import {Images} from '../../common/Images';
import {RobotoFonts} from '../../common/Fonts';
import {Icons} from '../../common/Icons';
import { useNavigation } from '@react-navigation/native';
import { ApplicationButton, ApplicationOutlineButton } from '../../components/ApplicationButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = () => {

    const navigation = useNavigation();
    useEffect(()=>{
      getToken()
      },[])
      
      const getToken = async ()=>{
        var token = await AsyncStorage.getItem("TOKEN")
        console.log('tokentokentokentoken',token);
        
        if (token) {
          navigation.reset({
            routes: [{name: "DrawerNavigation"}]
          })
        }
      }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle={'dark-content'}
      />
      <View style={styles.topContainer}>
        <Image source={Images.Welcome} style={styles.anyWhereImage} />

        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.paraText}>
          Have a better sharing experience
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <ApplicationButton content={'Create an account'} onPress={() => navigation.navigate('Signup')}/>

        <ApplicationOutlineButton content={'Log In'} onPress={() => navigation.navigate('Login')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  anyWhereImage: {
    height: 280,
    width: '100%',
    resizeMode: 'contain',
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24,
    fontFamily: RobotoFonts.medium500,
    color: Colors.heading,
    marginTop: 30,
  },
  paraText: {
    color: Colors.para,
    fontSize: 14,
    fontFamily: RobotoFonts.medium500,
    marginHorizontal: 80,
    textAlign: 'center',
    marginTop: 5,
  },
  arrowLeft: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
});

export default Welcome;