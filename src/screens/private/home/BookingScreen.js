import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Icons} from '../../../common/Icons';
import {Colors} from '../../../common/Colors';
import {Images} from '../../../common/Images';
import {ScrollView} from 'react-native-gesture-handler';
import {InterFonts, RobotoFonts} from '../../../common/Fonts';
import {API, GET_WITH_TOKEN, POST_WITH_TOKEN} from '../../../backend/Backend';
import MapViewDirections from 'react-native-maps-directions';
import {GOOLE_MAP_KEY} from '../../../components/inputs/ApplicationGooglePlace';
import Icon from '../../../components/ui/Icon';

const BookingScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeData = route?.params;
  console.log('routeData',routeData);
  
  // console.log(routeData);
  const [shareModal, setShareModal] = useState(false);
  const isFocus = useIsFocused();
  const [bookingInfo, setBookingInfo] = useState({});
  useEffect(() => {
    if (isFocus) {
      getBookingData();
    }
  }, [isFocus]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to cancel ride?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => navigation.navigate('CancelRide', {...bookingInfo}),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [bookingInfo]);
  let interval;
  useEffect(() => {
    if (isFocus) {
      interval = setInterval(() => {
        checkStatus();
      }, 8000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocus]);

  const checkStatus = () => {
    var apiData = {
      booking_id: routeData?.booking_id,
    };
    POST_WITH_TOKEN(API + 'check_booking_status', apiData, success => {
      console.log('==>Success check_booking_status', success);
      if (success?.data == 'Ongoing') {
        navigation.navigate('TrackRide', {...bookingInfo, ...routeData});
      } else if (success?.data == 'Driver cancel') {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'DrawerNavigation',
            },
          ],
        });
      }
      // navigation.navigate('SelectLocation')
    });
  };
console.log('routeData?.booking_id',routeData?.booking_id,routeData?.id);

  const getBookingData = () => {
    var apiData = {
      booking_id: routeData?.booking_id!=undefined?routeData?.booking_id:routeData?.id,
    };
    POST_WITH_TOKEN(API + 'user_booking_trip_info', apiData, success => {
      console.log(success, '==>>BOOKING INFO');
      setBookingInfo(success?.data);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      {/* <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{
                    height: '85%',
                    width: '100%',
                }}
            /> */}
      <MapView
        region={{
          latitude: +(bookingInfo?.picup_lat || 37.78825),
          longitude: +(bookingInfo?.picup_long || -122.4324),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: +(bookingInfo?.picup_lat || 37.78825),
            longitude: +(bookingInfo?.picup_long || -122.4324),
          }}
        />
        <Marker
          coordinate={{
            latitude: +(bookingInfo?.drop_lat || 37.78825),
            longitude: +(bookingInfo?.drop_long || -122.4324),
          }}
        />
        <MapViewDirections
          origin={{
            latitude: +(bookingInfo?.picup_lat || 37.78825),
            longitude: +(bookingInfo?.picup_long || -122.4324),
          }}
          destination={{
            latitude: +(bookingInfo?.drop_lat || 37.78825),
            longitude: +(bookingInfo?.drop_long || -122.4324),
          }}
          strokeWidth={3}
          apikey={GOOLE_MAP_KEY}
        />
      </MapView>
      <View style={styles.mapContainer}>
        <Image source={Images.map} style={styles.map} />
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.reset({
          routes: [{
            name: 'DrawerNavigation'
          }]
        })}
          style={styles.sideCircle}>
          <Image source={Icons.backArrow} style={styles.sideHeaderIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.EtaContainer}>
          <Text style={styles.etaText}>ETA</Text>

          <Image source={Icons.fillClock} style={styles.fillClock} />
          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text
              numberOfLines={1}
              style={[styles.etaText, {fontFamily: InterFonts.bold700}]}>
              {bookingInfo?.eta_picup}
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{marginTop:5}}>
          <View style={[styles.locationContainer, {marginTop: 20}]}>
            <View style={{width: '5%'}}>
              <Image
                source={Icons.location}
                style={[styles.fillClock, {tintColor: 'black'}]}
              />
            </View>

            <View style={{width: '85%', paddingLeft: 20}}>
              <Text style={styles.meetText}>
                Meet at pickup point on the time
              </Text>
              <Text style={styles.addressText}>
                {bookingInfo?.pickuplocation}
              </Text>
            </View>

            {/* <View style={{width: '10%', alignItems: 'flex-end'}}>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={Icons.edit} style={styles.editIcon} />
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.locationContainer}>
            <View style={{width: '70%'}}>
              <Text style={styles.meetText}>Your Trip Code</Text>
              <Text style={styles.addressText}>
                Share this trip code with your driver to start ride
              </Text>
            </View>

            <View style={{width: '30%', alignItems: 'flex-end'}}>
              <Text style={styles.codeText}>{bookingInfo?.otp}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <View style={{width: '30%', flexDirection: 'row'}}>
              <View style={{position: 'absolute', zIndex: 1}}>
                <Image
                  source={{uri: bookingInfo?.profile_image}}
                  style={styles.image}
                />
              </View>
              <Image
                source={{uri: bookingInfo?.vehicle_image}}
                style={styles.taxi}
              />
            </View>

            <View style={{width: '70%'}}>
              <Text style={styles.meetText}>{bookingInfo?.vehicle_name}</Text>
              <Text style={[styles.addressText, {color: Colors.black}]}>
                {bookingInfo?.vehicle_model}
              </Text>
            </View>
          </View>

          <View style={styles.dropLocationContainer}>
            {/* <View style={{alignItems: 'flex-end', flex: 1}}>
              <TouchableOpacity activeOpacity={0.5}>
                <Image source={Icons.edit} style={styles.editIcon} />
              </TouchableOpacity>
            </View> */}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={[
                    styles.addressText,
                    {fontFamily: InterFonts.bold700},
                  ]}>
                  Drop Location
                </Text>
                <Text style={styles.dropLocationText}>
                  {bookingInfo?.droplocation}
                </Text>
              </View>

              <View>
                <Text style={styles.eta}>ETA</Text>
                <Text style={styles.addressText}>{bookingInfo?.eta_picup}</Text>
              </View>
            </View>
          </View>

          <View style={styles.mediaContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('CancelRide', {...bookingInfo})
              }>
              <Image
                source={Icons.plusCircle}
                style={[
                  styles.cancelIcon,
                  {transform: [{rotate: '45deg'}], tintColor: Colors.red},
                ]}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={()=>{
              navigation.navigate('Help',{...bookingInfo})
             }} activeOpacity={0.5}>
               <Image source={Icons.support} style={styles.cancelIcon}/>
             </TouchableOpacity> */}
            <Modal transparent visible={shareModal}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                onPress={() => setShareModal(false)}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    padding: 15,
                    backgroundColor: 'white',
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
                    {'Share Ride Details'}
                  </Text>
                  <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <View
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 45,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                      }}>
                      <Icon source={Icons.whatsappShare} size={30} style={{}} />
                    </View>
                    <View
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 45,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                      }}>
                      <Icon source={Icons.message} size={30} style={{}} />
                    </View>
                    <View
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 45,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                      }}>
                      <Icon source={Icons.gmail} size={30} style={{}} />
                    </View>
                    <View
                      style={{
                        height: 55,
                        width: 55,
                        borderRadius: 45,
                        backgroundColor: '#e0e0e0',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 15,
                      }}>
                      <Icon source={Icons.link} size={30} style={{}} />
                    </View>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
            {/* <TouchableOpacity
              onPress={() => setShareModal(true)}
              activeOpacity={0.5}>
              <Image source={Icons.share} style={styles.cancelIcon} />
            </TouchableOpacity> */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Chat', {data: bookingInfo})}>
              <Image source={Icons.Text} style={styles.cancelIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${bookingInfo?.mobile}`);
              }}
              activeOpacity={0.5}>
              <Image source={Icons.whatsApp} style={styles.cancelIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
  footer: {
    height: '60%',
    width: '100%',
    backgroundColor: Colors.white,
    bottom: 0,
    position: 'absolute',
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  mapContainer: {
    height: '88%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  EtaContainer: {
    height: 50,
    width: Dimensions.get('window').width * 0.7,
    borderWidth: 1,
    borderColor: Colors.selectBorder,
    borderRadius: 60,
    alignSelf: 'center',
    position: 'absolute',
    top: -30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  etaText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: InterFonts.semiBold600,
    marginHorizontal: 10,
  },
  fillClock: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  locationContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.line,
    marginHorizontal: 20,
    paddingVertical: 20,
    alignItems:'center'
  },
  meetText: {
    color: 'black',
    fontSize: 15,
    fontFamily: RobotoFonts.medium500,
  },
  addressText: {
    color: Colors.para,
    fontSize: 13,
    fontFamily: RobotoFonts.regular400,
  },
  editIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  codeText: {
    color: Colors.black,
    fontSize: 30,
    fontFamily: RobotoFonts.bold700,
  },
  taxi: {
    width: 114,
    height: 40,
    resizeMode: 'contain',
  },
  image: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 60,
  },
  dropLocationContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  dropLocationText: {
    color: 'black',
    fontSize: 15,
    fontFamily: InterFonts.regular400,
  },
  eta: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: InterFonts.semiBold600,
  },
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cancelIcon: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
});

export default BookingScreen;
