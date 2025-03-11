import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Colors } from '../../../common/Colors';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { Icons } from '../../../common/Icons';
import { InterFonts } from '../../../common/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { Responsive } from '../../../assets/theme/Layout';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from '../../../components/ui/Icon';
import ApplicationGooglePlace from '../../../components/inputs/ApplicationGooglePlace';
import { setNestedObjectValues } from 'formik';
import Toast from 'react-native-toast-message';
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN, POST_WITH_TOKEN_FORMDATA } from '../../../backend/Backend';
import MapLocationSelectModal from '../../../components/modal/MapLocationSelectModal';
// import { API, POST_WITH_TOKEN } from '../../../Backend/Backend';

const EnterLocation = () => {
  const [mapModal, setMapModal] = useState(false)
  const navigation = useNavigation();
  const route = useRoute()
  const [increase, setincrease] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({})
  const [dropLocation, setDropLocation] = useState({})
  const [thirdLocation, setThirdLocation] = useState({})
  const [savedAddress, setSavedAddress] = useState([])
  const isFocus = useIsFocused()
  useEffect(() => {
    if (isFocus) {
      if (!!route.params?.pick) {
        setCurrentLocation(route.params?.pick)
      }
      getSavedAddress()
    }
  }, [isFocus])

  const getSavedAddress = () => {
    GET_WITH_TOKEN(API + "get_all_fav_address",
      (success) => {
        setSavedAddress(success?.data)
      }

    )
  }

  const onSelectLocation = () => {
    if (!currentLocation?.address || !dropLocation?.address) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select Current Location and Drop Location"
      })
      return
    }
    var arr = [{
      drop_location: dropLocation?.address,
      drop_lat: dropLocation?.lat,
      drop_long: dropLocation?.lng
    }]
    if (increase && thirdLocation?.address) {
      arr.push({
        drop_location: thirdLocation?.address,
        drop_lat: thirdLocation?.lat,
        drop_long: thirdLocation?.lng
      })
    }


    var formdata = new FormData()
    formdata.append("pickup_location", currentLocation?.address)
    formdata.append("pickup_lat", currentLocation?.lat)
    formdata.append("pickup_long", currentLocation?.lng)

    formdata.append("drop_data", JSON.stringify(arr))
    // if (increase && thirdLocation?.address) {

    //   formdata.append("drop_data[]",{
    //     drop_location : thirdLocation?.address,
    //     drop_lat: thirdLocation?.lat,
    //     drop_long: thirdLocation?.lng
    //   })
    // }
    POST_WITH_TOKEN_FORMDATA(API + "confirm_location", formdata,
      (success) => {
        console.log("===>SUcces", success);
        navigation.navigate("TaxiBooking", success?.data)
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
        console.log("===>error", error);

      },
      (fail) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: fail?.message
        })
        console.log("===>fail", fail);
      },
    )
  }

  const addFav = (id) => {
    POST_WITH_TOKEN(API + "add_remove_address",
      { address_id: id },
      (success) => {
        getSavedAddress()
      }
    )
  }

  return (
    <View style={styles.container}>
      <MapLocationSelectModal visible={mapModal} onClose={() => setMapModal(false)} onSubmit={(e) => {
        if (!!currentLocation?.address) {
          setDropLocation(e)
        } else {
          setCurrentLocation(e)
        }
        setMapModal(false)
      }} />
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
        <View style={styles.mainContainer}>
          <ApplicationHeader content={'Enter Pickup & Drop location'} />

          <View style={styles.inputMainContainer}>
            <View style={{ width: '10%', justifyContent: 'center' }}>
              <Image source={increase ? Icons.twoLocation : Icons.oneLocation}
                style={[styles.oneLocation, {
                  height: increase ? 150 : 80
                }]} />
            </View>

            <View style={{ width: '70%', marginRight: 10 }}>
              <ApplicationGooglePlace
                value={currentLocation}
                placeholder='Enter current location'
                icon={Icons.gps}
                onSelect={(e) => {
                  setCurrentLocation(e)
                }}
                textInputProps={{
                  placeholderTextColor: 'grey',

                }}
              />

              <ApplicationGooglePlace
                value={dropLocation}

                placeholder='Enter Drop location'
                icon={Icons.location}
                onSelect={(e) => {
                  setDropLocation(e)
                }}
                textInputProps={{
                  placeholderTextColor: 'grey',

                }}
              />


              {
                increase ?
                  <ApplicationGooglePlace
                    placeholder='Enter Stop location'
                    icon={Icons.location}
                    onSelect={(e) => {
                      setThirdLocation(e)
                    }}
                  />


                  : null
              }
            </View>

            <View style={{ width: '20%', justifyContent: 'center' }}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => setincrease(!increase)}>
                <Image source={increase ? Icons.minus : Icons.plusCircle} style={styles.plusCircle} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          <TouchableOpacity activeOpacity={0.5}
            onPress={() => navigation.navigate('SavedPlaces')}
            style={styles.savedContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.starContainer}>
                <Image source={Icons.star} style={styles.star} />
              </View>
              <Text style={styles.savedText}>Saved Places</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          <FlatList
            data={savedAddress}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity onPress={() => {
                    console.log({
                      address: item?.address,
                      lat: item?.latitude,
                      lng: item?.longitude
                    }, currentLocation?.address);
                    if (!currentLocation?.address) {
                      setCurrentLocation({
                        address: item?.address,
                        lat: +item?.latitude,
                        lng: +item?.longitude
                      })
                    } else {
                      setDropLocation({
                        address: item?.address,
                        lat: +item?.latitude,
                        lng: +item?.longitude
                      })
                    }
                  }} style={styles.savedContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.starContainer}>
                        <Image source={Icons.location} style={styles.star} />
                      </View>
                      <View style={{
                        marginHorizontal: 10,
                        flex: 1,
                      }} >

                        <Text style={styles.savedText}>{item?.address}</Text>
                      </View>
                      <Icon touchable size={28} onPress={() => addFav(item?.id)} source={Icons.star} style={styles.selectStar} />
                    </View>

                  </TouchableOpacity>

                  <View style={styles.horizontalLine} />
                </>
              )
            }}
          />

          <TouchableOpacity onPress={() => setMapModal(true)} style={styles.savedContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.starContainer, { backgroundColor: Colors.black }]}>
                <Image source={Icons.setLocation} style={styles.star} />
              </View>
              <Text style={styles.savedText}>Set Location On Map</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ApplicationButton content={'Confirm Location'}
          onPress={() => onSelectLocation()}
          img source={Icons.arrowLeft} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mainContainer: {
    backgroundColor: Colors.white,
  },
  gps: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
  },
  input: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: InterFonts.regular400,
  },
  plusCircle: {
    height: 33,
    width: 33,
    resizeMode: 'contain',
    tintColor: Colors.black
  },
  inputMainContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginVertical: 10,
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
    color: "black",
    fontSize: 16,

    fontFamily: InterFonts.regular400,
  },
  selectStar: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    tintColor: Colors.black
  },
  unSelectStar: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    tintColor: Colors.line
  },
  footer: {
    paddingHorizontal: Responsive.width(20),
    paddingVertical: Responsive.height(20),
    backgroundColor: Colors.white
  },
  oneLocation: {
    width: 20,
    resizeMode: 'contain'
  }
});

export default EnterLocation;
