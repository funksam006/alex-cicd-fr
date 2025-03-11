import React, { useEffect, useCallback, useState } from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Icons } from '../../../common/Icons';
import { Colors } from '../../../common/Colors';
import { InterFonts } from '../../../common/Fonts';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { Images } from '../../../common/Images';
import { getCurrentLocation } from '../../../functions/getCurrentLocation';
import Icon from '../../../components/ui/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, GET_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../../../features/authReducer';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const Home = () => {
  const navigation = useNavigation();
  const [profileData, setProfileDta] = useState({});
  const [drawer, setDrawer] = useState(false);
  const [currentAdress, setCurrentAddress] = useState(null);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentAddress({
            lat: latitude,
            lng: longitude,
          });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }, [])
  )

  useEffect(() => {
    if (isFocus) {
      getCurrentLocation((location) => {
        setCurrentAddress(location);
      });
    }
  }, [isFocus]);

  useEffect(() => {
    if (isFocus) {
      getProfile();
      getCurrentRide();
    }
  }, [isFocus]);


  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.goBack();
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [isFocus]);

  const getCurrentRide = () => {
    GET_WITH_TOKEN(
      API + 'user_ongoing_booking_lists',
      success => {
        console.log('==>SUCCESS Ongoing', success);
        if (!!success?.data) {
          console.log('uccess?.data?.booking_status', success?.data?.booking_status);

          if (success?.data?.booking_status == 4) {
            navigation.navigate('TrackRide', success?.data);
          } else {
            navigation.navigate('BookingScreen', success?.data);
          }
        }
        // setProfileDta(success?.data)
      },
      error => {
        console.log('==>error Ongoing', error);
      },
      fail => {
        console.log('==>fail', fail);
      },
    );
  };

  const getProfile = () => {
    GET_WITH_TOKEN(
      API + 'profile',
      success => {
        console.log('==>SUCCESS', success);
        setProfileDta(success?.data);
        dispatch(updateUserData(success?.data));
      },
      error => {
        console.log('==>error', error);
      },
      fail => {
        console.log('==>fail', fail);
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Modal visible={drawer} transparent>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableOpacity
            onPress={() => setDrawer(false)}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
      <View style={styles.mapContainer}>
        {!!(!!currentAdress && currentAdress.lat && currentAdress.lng) ? (
          <MapView
            initialRegion={{
              latitude: +(currentAdress?.lat || 37.78825),
              longitude: +(currentAdress?.lng || -122.4324),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: +(currentAdress?.lat || 37.78825),
              longitude: +(currentAdress?.lng || -122.4324),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          />
        ) : (
          <MapView
            region={{
              latitude: +(currentAdress?.lat || 37.78825),
              longitude: +(currentAdress?.lng || -122.4324),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            initialRegion={{
              latitude: +(currentAdress?.lat || 37.78825),
              longitude: +(currentAdress?.lng || -122.4324),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          />
        )}
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.sideCircle}>
          <Icon
            touchable
            onPress={() => navigation.openDrawer(true)}
            source={Icons.sideHeaderIcon}
            style={styles.sideHeaderIcon}
          />
        </View>

        <View style={{ width: '80%' }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('EnterLocation')}
            style={styles.input}>
            <Text style={styles.enterText}>Enter Pickup & Drop location</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={[styles.locationContainer]}>
          <View style={{ flexDirection: 'row', flex: 1, marginRight: 10 }}>
            <Image source={Icons.location} style={styles.location} />
            <Text style={styles.locationText}>
              {currentAdress?.address || ''}
            </Text>
          </View>
          <View>
            <Icon
              source={Icons.gps}
              onPress={() => {
                getCurrentLocation(e => {
                  setCurrentAddress(e);
                });
              }}
              style={styles.location}
              touchable
            />
          </View>
        </View>

        <View style={{ marginVertical: 5 }}>
          <ApplicationButton
            content={'SELECT LOCATION'}
            buttonStyle={{ backgroundColor: Colors.black }}
            onPress={() => {
              navigation.navigate('EnterLocation', {
                pick: currentAdress,
              });
            }}
          />
        </View>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sideHeaderIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  headerContainer: {
    position: 'absolute',
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sideCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    backgroundColor: Colors.white,
    width: '100%',
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    justifyContent: 'center',
  },
  footer: {
    height: 150,
    width: '100%',
    backgroundColor: Colors.white,
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
  location: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  locationText: {
    color: Colors.black,
    fontSize: 15,
    flex: 1,
    fontFamily: InterFonts.regular400,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 10,
  },
  mapContainer: {
    height: '85%',
    // width: '100%',
    flex: 1,
  },
  map: {
    height: '100%',
    // width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  enterText: {
    color: Colors.para,
    fontFamily: InterFonts.regular400,
    fontSize: 16,
  },
});

export default Home;
