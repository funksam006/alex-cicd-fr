import React, {Image, ImageBackground, StatusBar} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../common/Colors';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {Images} from '../../../common/Images';
import {RobotoFonts} from '../../../common/Fonts';
import SwipeButton from 'rn-swipe-button';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Icon from '../../../components/ui/Icon';
import { Icons } from '../../../common/Icons';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { FULL_HEIGHT, FULL_WIDTH } from '../../../common/Constant';
import { API, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';

const SearchingRide = () => {

    const navigation = useNavigation();
const route = useRoute()
const isFocus = useIsFocused()
const [loading,setLoading] = useState()
const routeData = route.params

console.log(routeData);
useEffect(()=>{
setLoading(isFocus)
onBookRide()
},[isFocus])

useEffect(()=>{
var interval = setInterval(() => {
  checkStatus()
}, 8000);
return ()=>clearInterval(interval)
},[])

const checkStatus =()=>{
  var apiData={
    booking_id: routeData?.booking_id
  }
  POST_WITH_TOKEN(API + 'check_booking_status',apiData,(success)=>{
    console.log("==>Success check_booking_status",success);
    if (success?.data == "accepted") {
      
      navigation.navigate('BookingScreen',{...route?.params,...success?.data})
    }else if (success?.data == "Driver cancel") {
      navigation.reset({
        index: 0,
        routes: [{
          name: "DrawerNavigation"
        }]
      })
    }
    // navigation.navigate('SelectLocation')
  })
}

const onBookRide =()=>{
  // 
  var apiData={
    booking_id: routeData?.booking_id
  }
  POST_WITH_TOKEN(API + 'search_ride',apiData,(success)=>{
    console.log("==>Success",success);
    
    // navigation.navigate('SearchingRide',{...route?.params,...success?.data})
    // navigation.navigate('SelectLocation')
  },
  (error)=>{
    console.log("==>error",error);
    // Toast.show({
    //   type: "error",
    //   text1: "Error",
    //   text2: error?.message
    // })
    
  },
  (fail)=>{
    Toast.show({
      type: "error",
      text1: "Error",
      text2: fail?.message
    })
    console.log("==>fail",fail);
  },
)
}

console.log(route.params,'==>>');
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ApplicationHeader content={'Searching for Driver'} />

      <MapView  initialRegion={{
                    latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
                    longitude:  +(routeData?.locationData?.pickup_long ||-122.4324),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} style={styles.map}>
       
      <Marker coordinate={{
         latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
         longitude:  +(routeData?.locationData?.pickup_long ||-122.4324),
      }} />

      </MapView>
      <Image source={Images.searching} style={styles.searching} />
        <View style={styles.footer}>
          {
            loading &&
          <SwipeButton
            disableResetOnTap
            // thumbIconImageSource={Icons.thumbCross}
            // // thumbIconWidth={50}
            // thumbIconStyles={{
              
            // }}
            thumbIconComponent={()=>{
return <View style={{backgroundColor: "white",height: 60,width: 60,justifyContent:"center",alignItems: "center"}} >
  <Icon source={Icons.cross} size={45} />
  </View>
            }}
            thumbIconBorderColor='white'
            railFillBorderColor='white'
            disabledThumbIconBorderColor='white'
            onSwipeSuccess={() => navigation.navigate('CancelRide',route.params)}
            forceReset={reset => {
              forceResetLastButton = reset;
            }}
            railBackgroundColor="#FFFFFF"
            railStyles={{
              backgroundColor: Colors.white,
              borderColor: Colors.white,
            }}
            thumbIconBackgroundColor="black"
            title=">> Swipe to cancel"
          
            containerStyles={{width: '100%'}}
          />
          }
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  map: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    justifyContent: 'space-between',
  },
  searching: {
    height: FULL_WIDTH*0.8,
    width: FULL_WIDTH*0.8,
    alignSelf: "center",
    top: FULL_HEIGHT*0.2,
    resizeMode: 'contain',
    marginTop: 30,
    position: "absolute",zIndex: 999999
  },
  searchingText: {
    color: Colors.black,
    fontSize: 19,
    fontFamily: RobotoFonts.medium500,
    textAlign: 'center',
  },
  footer: {
    bottom: 20,
    width: FULL_WIDTH*0.86,
    position: 'absolute',
    alignSelf: "center",
    alignItems: 'center',
    zIndex: 99999
  },
});

export default SearchingRide;
