import { useNavigation, useRoute } from "@react-navigation/native"
import { TouchableOpacity, View } from "react-native"
import Typography from "../../../components/ui/Typography"
import Icon from "../../../components/ui/Icon"
import { Icons } from "../../../common/Icons"
import { useEffect, useState } from "react"
import { API, GET_WITH_TOKEN } from "../../../backend/Backend"
import { ApplicationHeader } from "../../../components/ApplicationHeader"


const Help =()=>{
    const navigation = useNavigation()
    const route = useRoute()
    const [apiData,setApiData] = useState({})
useEffect(()=>{

    GET_WITH_TOKEN(API + "help_details", (s)=> setApiData(s?.data))
},[])

    return(
        <View style={{flex:1,}} >
<ApplicationHeader content={"Help"} />

<View style={{flex:1,padding: 15}} >
<TouchableOpacity style={{padding: 15,backgroundColor: "white",borderRadius: 8,flexDirection: "row",}} onPress={()=>{
    navigation.navigate("HelpIndex",{
        name : "Booking Related Issue",
        email : apiData?.booking_related_issue_email,
        number : apiData?.booking_related_issue_call
    })
}} >
    <View style={{flex: 1}} >
<Typography type="semiBold" >{"Booking Related Issue"}</Typography>
</View>
<Icon source={Icons.arrow} resizeMode="contain" tintColor={"black"} />
</TouchableOpacity>


<TouchableOpacity style={{padding: 15,backgroundColor: "white",borderRadius: 8,
marginTop :15,flexDirection: "row",}} onPress={()=>{
    navigation.navigate("HelpIndex",{
        name : "Payment & Refund Related Issue",
        email : apiData?.payment_refund_related_email,
        number : apiData?.payment_refund_related_call
    })
}} >
    <View style={{flex: 1}} >
<Typography type="semiBold" >{"Payment & Refund Related Issue"}</Typography>
</View>
<Icon source={Icons.arrow} resizeMode="contain" tintColor={"black"} />
</TouchableOpacity>
</View>
        </View>
    )
}

export default Help