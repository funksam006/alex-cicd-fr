import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Overlay } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icons } from '../../../common/Icons';
import { Colors } from '../../../common/Colors';
import { InterFonts } from '../../../common/Fonts';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { Images } from '../../../common/Images';
import { API, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';

const SelectLocation = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const routeData = route.params
  console.log(routeData, '==');
  const vechile_id = route.params?.vechile_id
  const onBookRide = () => {
    // 
    var apiData = {
      vehicle_fare_id: vechile_id
    }
    POST_WITH_TOKEN(API + 'book_a_ride', apiData,
      (success) => {
        console.log("==>Success", success);
        if (success?.data?.booking_type == 2) {
          // alert("")
          setTimeout(() => {

            Toast.show({
              type: "success",
              text1: "Booking has been schedule"
            })
          }, 500);
          navigation.reset({
            index: 0,
            routes: [{
              name: "DrawerNavigation"
            }]
          })
        } else {

          navigation.navigate('SearchingRide', { ...route?.params, ...success?.data })
        }
        // navigation.navigate('SelectLocation')
      },
      (error) => {
        console.log("==>error", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })

      },
      (fail) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
        console.log("==>fail", fail);
      }
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
            longitude: +(routeData?.locationData?.pickup_long || -122.4324),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          <Marker coordinate={{
            latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
            longitude: +(routeData?.locationData?.pickup_long || -122.4324),
          }} />
        </MapView>
        {/* <Image source={Images.map}  /> */}
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.sideCircle}>
          <Image source={Icons.backArrow} style={styles.sideHeaderIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Image source={Icons.location} style={styles.location} />

          <Text style={styles.locationText}>{routeData?.locationData?.pickup_location}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <ApplicationButton
            onPress={() => onBookRide()}
            content={'Confirm Pickup point'}
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
  mapContainer: {
    height: '90%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  footer: {
    // height: 150,
    width: '100%',
    backgroundColor: Colors.white,
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  location: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  locationText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: InterFonts.regular400,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default SelectLocation;
