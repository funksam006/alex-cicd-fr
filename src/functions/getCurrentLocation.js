import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geocoder from 'react-native-geocoder';

export const getCurrentLocation =async(
    onSuccess =()=>{}
)=>{
var result = await request(Platform.OS == 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
console.log(result);
    Geolocation.getCurrentPosition(
        async (position) => {
  console.log(position,'==>>');
          const { latitude, longitude } = position.coords;
          getAddress({
            lat : latitude,
            lng : longitude,
            onSuccess: (e)=> onSuccess({
lat: latitude,
lng : longitude,
address: e
            })
          })

        },
        error => console.log({error: error.message }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );
}

export const getAddress = ({
     lat= null,lng=null,onSuccess =()=>{}
})=>{
    Geocoder.geocodePosition({
        lat: lat,
          lng: lng
    })
    .then(res => {
      // res is an Array of geocoding object (see below)
      console.log(res, '=>>GEO LOCATIOn');
      if (res?.length > 0) {
        onSuccess(res[0]?.formattedAddress)
        // setpresentcity(`${res[0]?.subLocality || ""} ${res[0].locality}`);
        // setpresentpin(res[0].postalCode);
        // setlocality(`${res[0]?.subLocality || ""} ${res[0].locality}`);
        // setpresentstate(res[0].adminArea);
        // setpresentdistrict(res[0].subAdminArea);
      }
    })
    .catch(err => {});
}