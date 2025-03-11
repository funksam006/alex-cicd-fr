import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Colors} from '../../common/Colors';
import {Images} from '../../common/Images';
import {RobotoFonts} from '../../common/Fonts';
import {Icons} from '../../common/Icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoarding = () => {

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
        <Image source={Images.Anywhere} style={styles.anyWhereImage} />

        <Text style={styles.headingText}>Anywhere you are</Text>
        <Text style={styles.paraText}>
          Sell houses easily with the help of Listenoryx and to make this line
          big I am writing more
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button}
        onPress={() =>  navigation.navigate('Welcome')}
         activeOpacity={0.5}>
          <Image source={Icons.arrowLeft} style={styles.arrowLeft} />
        </TouchableOpacity>
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
    height: 210,
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
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 60,
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnBoarding;