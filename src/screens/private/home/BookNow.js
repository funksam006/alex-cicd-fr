import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Icons } from '../../../common/Icons';
import { Colors } from '../../../common/Colors';
import { InterFonts, RobotoFonts } from '../../../common/Fonts';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { Images } from '../../../common/Images';
import { ScrollView } from 'react-native-gesture-handler';
import { API, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';
import Icon from '../../../components/ui/Icon';
import MapViewDirections from 'react-native-maps-directions';
import { GOOLE_MAP_KEY } from '../../../components/inputs/ApplicationGooglePlace';

const BookNow = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [couponCode, setCouponCode] = useState("")
  const routeData = route?.params
  const [vehcileData, setVehcileData] = useState(routeData?.vehcileData)
  console.log(routeData);
  const isFocus = useIsFocused()
  useEffect(() => {
    if (isFocus) {

      onSelect(routeData?.vehcileData)
    }
  }, [isFocus])
  const onSelect = (e = routeData?.vehcileData) => {
    var apiData = {
      id: e?.id
    }
    POST_WITH_TOKEN(API + "search_vehicle_id", apiData,
      (success) => {
        console.log("-->>SUCCESS", success);
        setVehcileData(success?.data)
      },
      (error) => {
        console.log("-->>error", error);
        // navigation.navigate("BookNow",{
        //   ...routeData,
        //   vehcileData: e
        // })

      },
      (fail) => {
        console.log("-->>fail", fail);
        // navigation.navigate("BookNow",{
        //   ...routeData,
        //   vehcileData: e
        // })
      },

    )
  }

  const onBookRide = () => {
    navigation.navigate('SelectLocation', {
      ...routeData,
      vechile_id: vehcileData?.id
    })
    // 
    //   var apiData={
    //     vehicle_fare_id: vehcileData?.id
    //   }
    //   POST_WITH_TOKEN(API + 'book_a_ride',apiData,(success)=>{
    //     console.log("==>Success",success);
    //     navigation.navigate('SelectLocation',success?.data)
    //   },
    //   (error)=>{
    //     console.log("==>error",error);

    //   },
    //   (fail)=>{
    //     console.log("==>fail",fail);
    //   },
    // )
  }

  const onApply = () => {
    console.log(couponCode);
    if (!couponCode) {
      console.log("er");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter coupon"
      })
      return
    }
    var apiData = {
      id: vehcileData?.id,
      cupon_code: couponCode
    }
    POST_WITH_TOKEN(API + "apply_cupon_code", apiData,
      (success) => {
        console.log("==>SUCCESS", success);
        Toast.show({
          type: "success",
          // text1:"Error",
          text2: success?.message
        })
        onSelect()
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
        console.log("==>fail", fail);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
      },

    )
  }

  const removeCoupon = () => {
    var apiData = {
      id: vehcileData?.id,
    }
    POST_WITH_TOKEN(API + "remove_cupon_code", apiData,
      (success) => {
        console.log("==>SUCCESS", success);
        onSelect()
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
        console.log("==>fail", fail);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
      },
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />

      <View style={styles.mapContainer}>
        {/* <Image source={Images.map} style={styles.map} /> */}
        <MapView
          initialRegion={{
            latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
            longitude: +(routeData?.locationData?.pickup_long || -122.4324),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
              longitude: +(routeData?.locationData?.pickup_long || -122.4324),
            }}
          >
          </Marker>
          <Marker
            coordinate={{
              latitude: +(routeData?.drop_data?.drop_lat || 37.78825),
              longitude: +(routeData?.drop_data?.drop_long || -122.4324),
            }}
          />
          <MapViewDirections
            origin={{
              latitude: +(routeData?.locationData?.pickup_lat || 37.78825),
              longitude: +(routeData?.locationData?.pickup_long || -122.4324),
            }}
            destination={{
              latitude: +(routeData?.drop_data?.drop_lat || 37.78825),
              longitude: +(routeData?.drop_data?.drop_long || -122.4324),
            }}
            strokeWidth={3}
            apikey={GOOLE_MAP_KEY}
          />
        </MapView>

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
        <ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.kmContainer}>
              <Text style={styles.kmText}>{vehcileData?.total_distance} Km</Text>

              <View>
                <Text style={styles.tshText}>{'R ' + vehcileData?.fare}</Text>
                <Text style={styles.priceText}>Estimate Price</Text>
              </View>
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.kmContainer}>
              <View style={{ flex: 1 }} >
                <Text style={[styles.kmText, { color: Colors.black }]}>{vehcileData?.name || vehcileData?.vehicle_type?.name}</Text>
                <Text style={[styles.priceText, {}]}>
                  {vehcileData?.time_duration}
                </Text>
              </View>

              <Image style={styles.taxi} source={{ uri: vehcileData?.image }} />
            </View>

            <View style={styles.horizontalLine} />

            <View style={styles.pickupMainContainer}>
              <View style={{ width: '10%' }}>
                <Image source={Icons.oneLocation} style={styles.oneLocation} />
              </View>

              <View style={{ width: '80%', justifyContent: 'space-between', flex: 1 }}>
                <View>
                  <Text style={styles.pickupText}>Pickup</Text>
                  <Text style={styles.address} numberOfLines={2} >{routeData?.locationData?.pickup_location}</Text>
                </View>

                <View>
                  <Text style={styles.pickupText}>Drop</Text>
                  <Text numberOfLines={2} style={styles.address}>{routeData?.drop_data?.drop_location}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => {
                navigation.navigate('EnterLocation', {
                  pick: {
                    lat: routeData?.pick_data?.pick_up_lat,
                    lng: routeData?.pick_data?.pick_up_long,
                    address: routeData?.pick_data?.pick_up_location
                  }
                })
              }} style={{ width: '10%' }}>
                <Image source={Icons.edit} style={styles.edit} />
              </TouchableOpacity >
            </View>

            <View style={styles.horizontalLine} />
            {
              !!vehcileData?.cupon?.cupon_code ?
                <>
                  <View style={{ padding: 16, backgroundColor: "white", borderWidth: 0.6, borderColor: "grey", width: "100%", borderRadius: 10, flexDirection: "row", alignItems: "center" }} >
                    <View style={{ flex: 1 }} >
                      <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }} >#{vehcileData?.cupon?.cupon_code} </Text>
                    </View>
                    <Icon source={Icons.close} size={24} touchable onPress={() => removeCoupon()} />
                  </View>
                </>
                :
                <>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.applyCouponText}>Apply Coupon</Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Coupons', {
                        ...route?.params,
                        vechile_id: vehcileData?.id
                      })}>
                      <Text style={styles.applyCouponText}>Coupon Code</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.applyMainContainer}>
                    <TextInput placeholder="Enter coupon code" value={couponCode} onChangeText={setCouponCode} style={styles.input} />

                    <TouchableOpacity style={styles.applyButton} activeOpacity={0.5} onPress={() => onApply()} >
                      <Text style={styles.applyText}>APPLY</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }

          </View>

          <View style={[styles.horizontalLine, { borderTopWidth: 2 }]} />

          <View style={styles.walletMainContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('PaymentMode', {
                ...route?.params,
                vechile_id: vehcileData?.id
              })}
              style={styles.walletContainer}>
              <Image
                style={styles.wallet}
                source={
                  vehcileData?.payment_mode?.image ?
                    {
                      uri: vehcileData?.payment_mode?.image
                    }
                    : Images.wallet
                }
              />

              <Text style={[styles.kmText, { fontSize: 18 }]}>
                {vehcileData?.payment_mode?.name ||
                  'My Wallet'
                }
              </Text>

              <Image
                style={[
                  styles.sideHeaderIcon,
                  { transform: [{ rotate: '180deg' }] },
                ]}
                source={Icons.backArrow}
              />
            </TouchableOpacity>

            <ApplicationButton
              content={'BOOK NOW'}
              onPress={() => onBookRide()}
              buttonStyle={{ width: '47%', height: 50 }}
            />
          </View>
        </ScrollView>
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
    height: '50%',
    width: '100%',
    backgroundColor: Colors.white,
    bottom: 0,
    position: 'absolute',
    paddingVertical: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    fontFamily: InterFonts.regular400,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
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
  enterText: {
    color: Colors.para,
    fontFamily: InterFonts.regular400,
    fontSize: 16,
  },
  kmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kmText: {
    color: "black",
    fontSize: 20,
    fontFamily: InterFonts.medium500,
  },
  tshText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: InterFonts.bold700,
  },
  priceText: {
    color: Colors.para,
    fontSize: 12,
    fontFamily: InterFonts.regular400,
  },
  horizontalLine: {
    borderTopColor: Colors.line,
    borderTopWidth: 0.5,
    marginVertical: 10,
  },
  taxi: {
    width: 130,
    height: 52,
    resizeMode: 'contain',
  },
  pickupMainContainer: {
    flexDirection: 'row',
  },
  oneLocation: {
    width: 15,
    height: 90,
  },
  pickupText: {
    color: Colors.para,
    fontSize: 13,
    fontFamily: InterFonts.semiBold600,
  },
  address: {
    color: "black",
    fontSize: 16,
    fontFamily: InterFonts.regular400,
  },
  edit: {
    height: 20,
    width: 24,
    resizeMode: 'contain',
    tintColor: Colors.black
  },
  applyCouponText: {
    color: "black",
    fontSize: 11,
    fontFamily: InterFonts.medium500,
  },
  applyMainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    height: 48,
    borderRadius: 10,
    marginVertical: 15,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  input: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: RobotoFonts.regular400,
  },
  applyButton: {
    height: 48,
    backgroundColor: Colors.black,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  applyText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: RobotoFonts.medium500,
  },
  walletMainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  wallet: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
    alignItems: 'center',
  },
});

export default BookNow;
