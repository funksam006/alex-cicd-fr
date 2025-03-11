import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import { Colors } from '../../../common/Colors';
import { Images } from '../../../common/Images';
import { Responsive } from '../../../assets/theme/Layout';
import { InterFonts } from '../../../common/Fonts';
import ApplicationOneButtonModal from '../../../components/modal/ApplicationOneButtonModal';
import { useNavigation } from '@react-navigation/native';

const AccountCreated = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.inputContainer}>
        <Image source={Images.created} style={styles.created} />

        <Text style={styles.headingText}>Congratulation!</Text>

        <Text style={styles.paraText}>Your account has been created sucessfuly. Now you can explore the app and start earning.</Text>

        <View style={styles.buttonContainer}>
          <ApplicationOneButtonModal content={'GO TO LOGIN'} onPress={() => navigation.navigate('Login')} />
        </View>
      </View>

      <View style={{ flex: 0.8 }}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  inputContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive.width(20)
  },
  created: {
    height: 120,
    width: 140,
    resizeMode: 'contain'
  },
  headingText: {
    color: Colors.black,
    fontSize: Responsive.font(24),
    fontFamily: InterFonts.medium500,
    marginVertical: 20
  },
  paraText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: InterFonts.regular400,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30
  }
})

export default AccountCreated;