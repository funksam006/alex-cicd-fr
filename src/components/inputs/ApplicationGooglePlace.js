import { StyleSheet, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import Icon from "../ui/Icon"
import { Colors } from "../../common/Colors"
import { InterFonts } from "../../common/Fonts"
import React, { useEffect, useRef } from "react"
import { getCurrentLocation } from "../../functions/getCurrentLocation"
import 'react-native-get-random-values';

export const GOOLE_MAP_KEY = "AIzaSyBc5rc3nqDp3H0jKF-HoxiN5FAGuEbC6hw"
const ApplicationGooglePlace = ({
  placeholder,
  style,
  onSelect = ({ address, lat, lng }) => { },
  icon,
  value,
  textInputProps
}) => {
  const ref = useRef()
  useEffect(() => {
    if (ref.current && value?.address) {
      ref.current.setAddressText(value?.address);
    }
  }, [value?.address]);


  const fetchLocation = () => {
    getCurrentLocation((e) => {
      console.log(e);
      onSelect(e)

    })
  }


  return (
    <View style={styles.inputContainer}>
      <GooglePlacesAutocomplete
        ref={ref}
        onFail={(e) => console.log(e, '=>FAIL INOUT')}
        placeholder={placeholder}

        styles={{
          container: [styles.input, { backgroundColor: "transparent" }],
          textInput: { backgroundColor: "transparent", color: 'black' },
          description: { color: 'black' }
        }}
        textInputProps={textInputProps}
        fetchDetails={true}
        onPress={(data, details) => {
          console.log(details?.geometry,);
          // setSelectedLocation(data.description);
          // setPickupLat(details.geometry.location.lat);
          // setPickupLong(details.geometry.location.lng);
          onSelect({
            address: data?.description,
            lat: details?.geometry?.location?.lat || data?.geometry?.location?.lat,
            lng: details?.geometry?.location?.lng || data?.geometry?.location?.lng
          })

        }}
        query={{
          key: GOOLE_MAP_KEY,
          language: 'en',
          // components: 'country:in', 
        }}
      />

      {icon &&
        <Icon onPress={() => fetchLocation()} source={icon} style={{ marginTop: 13 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    marginTop: 15
  },
  input: {
    color: "black",
    fontSize: 15,
    fontFamily: InterFonts.regular400,
  },
})
export default ApplicationGooglePlace