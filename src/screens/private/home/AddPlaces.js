import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Colors} from '../../../common/Colors';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {useNavigation} from '@react-navigation/native';
import {Icons} from '../../../common/Icons';
import {InterFonts, RobotoFonts} from '../../../common/Fonts';
import ApplicationGooglePlace from '../../../components/inputs/ApplicationGooglePlace';
import Toast from 'react-native-toast-message';
import {API, POST_WITH_TOKEN} from '../../../backend/Backend';

const AddPlaces = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [location, setLocation] = useState({});

  const onSave = () => {
    if (!name || !location?.address) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields.',
      });
      return;
    }
    var apiData = {
      address: location?.address,
      type: name,
      latitude: location?.lat,
      longitude: location?.lng,
    };
    POST_WITH_TOKEN(
      API + 'user_add_address',
      apiData,
      success => {
        console.log('===>SUCCESS', success);
        navigation.goBack();
      },
      error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error?.message,
        });
        console.log('===>error', error);
      },
      fail => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: fail?.message,
        });
        console.log('===>fail', fail);
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView
        style={{flex: 1, backgroundColor: Colors.white}}
        keyboardShouldPersistTaps="always">
        <View style={{}}>
          <ApplicationHeader
            content={'Add Places'}
            source={Icons.tikIcon}
            rightContent={'Saves'}
            addIcons
            onPress={() => onSave()}
          />

          <View style={styles.horizontalLine} />

          <View style={styles.inputMainContainer}>
            <Text style={styles.nameText}>Name</Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Name"
                placeholderTextColor={'grey'}
                style={styles.savedText}
              />
            </View>

            <Text style={[styles.nameText, {marginTop: 15}]}>Location</Text>

            <ApplicationGooglePlace
              placeholder={'Enter Location'}
              icon={Icons.gps}
              value={location}
              onSelect={e => {
                console.log(e);
                setLocation(e);
              }}
              style={styles.input}
              textInputProps={
                {
                  placeholderTextColor: 'grey',
                }
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputMainContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: 'black',
    fontSize: 14,
    fontFamily: RobotoFonts.regular400,
    marginBottom: 10,
  },
  gps: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  savedContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starContainer: {
    height: 35,
    width: 35,
    borderRadius: 60,
    backgroundColor: Colors.line,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  star: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  savedText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: InterFonts.regular400,
  },
});

export default AddPlaces;
