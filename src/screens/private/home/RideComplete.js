import { Dimensions, Image, ScrollView, Text, View } from "react-native"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { Images } from "../../../common/Images"
import { useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment"
import Icon from "../../../components/ui/Icon"
import { Icons } from "../../../common/Icons"
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from "../../../backend/Backend"
import { useEffect, useState } from "react"
import { ApplicationButton } from "../../../components/ApplicationButton"
import { Colors } from "../../../common/Colors"

const CompleteRide = () => {
    const route = useRoute()
    const [bookingInfo, setBookingInfo] = useState(route.params)
    console.log(route.params);
    const navigation = useNavigation()
    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        POST_WITH_TOKEN(API + "ride_complete_booking", {
            booking_id: route.params?.booking_id
        },
            (success) => {
                console.log(success, "=>>SUCSAC");
                setBookingInfo(success?.data)
            }
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <ApplicationHeader content={"Ride Complete"} />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={{ width: Dimensions.get('screen').width, height: 1, backgroundColor: "grey" }}></View>
                <View style={{ backgroundColor: Colors.black, padding: 20, alignSelf: "center", borderRadius: 100, marginVertical: 30, marginBottom: 10 }} >


                    <Image source={Icons.tikIcon} tintColor={"white"} style={{ width: 60, height: 60, resizeMode: "contain", alignSelf: "center", }} />
                </View>
                <Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>Ride Complete</Text>


                <View style={{ width: Dimensions.get('screen').width - 30, padding: 10, alignSelf: "center", borderTopWidth: 0.7, borderColor: "grey", marginVertical: 20, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                        <View style={{ flex: 1, }} >
                            <Text style={{ fontSize: 15, color: "grey" }} >{"Pickup"}</Text>
                            <Text numberOfLines={1} style={{ fontSize: 17, color: "black" }} >{bookingInfo?.pickuplocation}</Text>


                        </View>
                        <View>
                            <Text style={{ fontSize: 17, color: Colors.black, textAlign: "right" }} >{bookingInfo?.picup_time}</Text>
                            <Text style={{ fontSize: 15, color: "grey", textAlign: "right" }} >{bookingInfo?.picup_date}</Text>
                        </View>
                    </View>


                </View>
                <View style={{ width: Dimensions.get('screen').width - 30, padding: 10, alignSelf: "center", borderTopWidth: 0.7, borderColor: "grey", marginBottom: 20, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                        <View style={{ flex: 1, marginRight: 20 }} >
                            <Text style={{ fontSize: 15, color: "grey" }} >{"Drop"}</Text>
                            <Text numberOfLines={1} style={{ fontSize: 17, color: "black" }} >{bookingInfo?.droplocation}</Text>


                        </View>
                        <View>
                            <Text style={{ fontSize: 17, color: Colors.black, textAlign: "right" }} >{bookingInfo?.drop_time}</Text>
                            <Text style={{ fontSize: 15, color: "grey", textAlign: "right" }} >{bookingInfo?.drop_date}</Text>
                        </View>
                    </View>


                </View>
                <View style={{ width: Dimensions.get('screen').width - 30, padding: 10, alignSelf: "center", borderTopWidth: 0.7, borderColor: "grey", paddingVertical: 20, flexDirection: "row", alignItems: 'center' }}>
                    <View style={{ flex: 1, marginRight: 20 }} >
                        <Text style={{ fontSize: 16, color: "black" }} >{"Ride Distance :"}</Text>
                    </View>
                    <Text style={{ color: Colors.black, fontSize: 18, fontWeight: "bold" }}  >{bookingInfo?.distance}Km</Text>
                </View>

                <View style={{ padding: 15, borderRadius: 10, backgroundColor: "white", borderWidth: 1, borderColor: "lightgrey", alignSelf: "center", width: "90%", flexDirection: "row" }} >
                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "black", flex: 1 }} >{"Payment Mode"}</Text>
                    <View style={{ flexDirection: "row" }} >
                        <Icon source={Icons.arrowLeft} />
                        <Text style={{ color: "black", fontSize: 17, fontWeight: "medium" }} >{bookingInfo?.payment_mode_name || "Cash"}</Text>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 25 }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }} >{"Total Paid  Amount"}</Text>
                    <Text style={{ fontSize: 25, marginVertical: 6, fontWeight: "bold", color: Colors.black }} >{'R ' + bookingInfo?.fare}</Text>

                </View>
                {/* <ApplicationButton buttonStyle={{ width : "80%",alignSelf: "center" ,backgroundColor: "white",borderWidth:1,borderColor:"black"}} buttonTextStyle={{color :"black"}} content={"Get Help"} leftImg={Icons.support}  imgStyle={{height: 30,width :30,marginRight: 10}} onPress={()=>navigation.navigate('Help',{...bookingInfo})
} /> */}
                <ApplicationButton content={"Submit"} buttonStyle={{ width: "80%", alignSelf: "center", marginVertical: 20 }} onPress={() => navigation.navigate("GiveRating", { ...bookingInfo })} />
            </ScrollView>
        </View>
    )
}

export default CompleteRide