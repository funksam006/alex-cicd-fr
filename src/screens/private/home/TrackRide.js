import { Text, View } from "react-native"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import MapView, { Marker } from "react-native-maps"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import MapViewDirections from "react-native-maps-directions"
import { GOOLE_MAP_KEY } from "../../../components/inputs/ApplicationGooglePlace"
import Icon from "../../../components/ui/Icon"
import { Icons } from "../../../common/Icons"
import { API, POST_WITH_TOKEN } from "../../../backend/Backend"
import { useEffect } from "react"

const TrackRide = () => {

  const navigation = useNavigation()
  const route = useRoute()
  const bookingInfo = route.params
  console.log(bookingInfo, '==>>BPPLNG');
  const isFocus = useIsFocused()

  let interval
  useEffect(() => {
    if (isFocus) {

      interval = setInterval(() => {
        checkStatus()
      }, 8000);
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isFocus])

  const checkStatus = () => {
    var apiData = {
      booking_id: bookingInfo?.booking_id
    }
    POST_WITH_TOKEN(API + 'check_booking_status', apiData, (success) => {
      console.log("==>Success check_booking_status", success);
      if (success?.data == "Completed") {

        navigation.navigate('RideComplete', { ...route?.params })
      } else if (success?.data == "Driver cancel") {
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

  const completeRide = () => {
    navigation.navigate("RideComplete", { ...bookingInfo })
    return
    POST_WITH_TOKEN(API + "ride_complete_booking", {
      booking_id: bookingInfo?.booking_id
    },
      success => {
        console.log("==>BOOKING", success);
        // navigation.navigate("RideComplete",{})
        navigation.navigate("RideComplete", { ...bookingInfo })
      }
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      <ApplicationHeader content={"Track Ride"} />
      {
        bookingInfo?.picup_lat &&
        <MapView
          initialRegion={{
            latitude: +(bookingInfo?.picup_lat || 37.78825),
            longitude: +(bookingInfo?.picup_long || -122.4324),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ flex: 1 }}
        >
          <Marker coordinate={{
            latitude: +(bookingInfo?.picup_lat || 37.78825),
            longitude: +(bookingInfo?.picup_long || -122.4324),
          }} />
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
            onReady={(e) => {
              console.log(e?.duration, '==>>START');
            }}
            apikey={GOOLE_MAP_KEY}
          />
        </MapView>
      }
      <View style={{ padding: 15, backgroundColor: "white", flexDirection: "row", alignItems: "center" }} >
        <Icon touchable onPress={() => navigation.navigate("CancelRide", { ...bookingInfo })} source={Icons.close} size={45} tintColor={"black"} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }} >
            {bookingInfo?.time_duration}
          </Text>
        </View>
        <View />
        {/* <Icon source={Icons.tikIcon} touchable onPress={completeRide} size={45} tintColor={"black"} /> */}

      </View>
    </View>
  )
}

export default TrackRide