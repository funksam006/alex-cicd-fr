import { Modal, Text, View } from "react-native"
import MapView from "react-native-maps"
import Icon from "../ui/Icon"
import { Icons } from "../../common/Icons"
import { FULL_HEIGHT, FULL_WIDTH } from "../../common/Constant"
import { getAddress, getCurrentLocation } from "../../functions/getCurrentLocation"
import { useEffect, useState } from "react"
import { ApplicationButton } from "../ApplicationButton"

const MapLocationSelectModal = ({ visible = false, onClose = () => { }, onSubmit = () => { } }) => {
    const [addressData, setAddressData] = useState({})
    const [currentAdress, setCurrentAddress] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    useEffect(() => {
        getCurrentLocation((e) => {
            console.log(e);
            setCurrentAddress({
                latitude: +e?.lat,
                longitude: +e?.lng
            })
        })
    }, [])

    return (
        <Modal visible={visible} >
            <ApplicationButton
                buttonStyle={{ position: "absolute", zIndex: 99999, bottom: 30, width: "90%", marginLeft: "5%" }} content={"Submit"} onPress={() => {
                    if (!!addressData?.address) {
                        onSubmit(addressData)
                    } else {
                        onClose()
                    }
                }} />
            {/* <View style={{flex: 1,justifyContent: "center",alignItems: "center"}} > */}
            <View style={{ position: "absolute", zIndex: 99999, width: FULL_WIDTH, padding: 15, flexDirection: "row", alignItems: "center" }}  >
                <View style={{ backgroundColor: "white", flex: 1, padding: 15, paddingHorizontal: 15, borderRadius: 10, flexDirection: "row", alignItems: "center" }} >
                    <View style={{ flex: 1 }} >
                        <Text style={{ color: "black", fontSize: 17 }}  >{addressData?.address || "Search Location"}</Text>
                    </View>
                    <Icon source={Icons.close} touchable onPress={() => onClose()} style={{ backgroundColor: "white", marginLeft: 10, padding: 20, borderRadius: 10 }} />
                </View>
            </View>
            <Icon source={Icons.pin} size={40} resizeMode="contain" style={{ position: "absolute", zIndex: 9999999, top: FULL_HEIGHT * 0.45, left: FULL_WIDTH * 0.45 }} />
            <MapView initialRegion={{
                latitude: +(currentAdress.latitude || 37.78825),
                longitude: +(currentAdress?.longitude || -122.4324),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
                region={{
                    latitude: +(currentAdress.latitude || 37.78825),
                    longitude: +(currentAdress?.longitude || -122.4324),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} style={{ flex: 1 }}
                onRegionChangeComplete={(e) => {
                    console.log(e);
                    getAddress({
                        lat: e.latitude,
                        lng: e.longitude,
                        onSuccess: (a) => {
                            setAddressData({
                                address: a,
                                lat: e?.latitude,
                                lng: e?.longitude
                            })
                            console.log(a,);
                        }
                    })
                }}
            >
            </MapView>
            {/* </View> */}
        </Modal>
    )
}

export default MapLocationSelectModal