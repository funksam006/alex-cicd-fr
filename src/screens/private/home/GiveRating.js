import { Image, ScrollView, Text, TextInput, View } from "react-native"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AirbnbRating } from "react-native-ratings"
import { useState } from "react"
import { ApplicationButton } from "../../../components/ApplicationButton"
import Toast from "react-native-toast-message"
import { API, POST_WITH_TOKEN } from "../../../backend/Backend"

const GiveRating =()=>{
const route = useRoute()
const navigation = useNavigation()
const [rating,setRating] = useState("")
const [review,setReview] = useState("")
const bookingInfo = route.params

const onSubmit =()=>{
// if (!review) {
//     Toast.show({
//         type: "error",
//         text1: "Please Enter Review"
//     })
//     return
// }

POST_WITH_TOKEN(API + "add_driver_rating",{
    booking_id: bookingInfo?.booking_id,
    review,
    rating
},
(success)=>{
    console.log("---<<SUCCESS",success);
    navigation.reset({
        index: 0,
        routes: [
            {name: "DrawerNavigation"}
        ]
    })
}
)

}
    return(
        <View style={{flex: 1,backgroundColor :"white"}} >
<ApplicationHeader content={"Give Rating"}  style={{backgroundColor : "white",borderBottomWidth : 0.5,borderColor :"lightgrey"}} />
<ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1,alignItems: "center",padding: 15,paddingVertical: 25}} >
<Text style={{fontSize: 18,color: "black",fontWeight: "bold"}} >{"Write a review"}</Text>

<Image source={{uri :bookingInfo?.driver_profile }} style={{height: 100,width: 100,borderRadius: 50,marginVertical: 15}} />
<Text style={{color: "black",fontSize: 15}} >{`How was your ride with ${bookingInfo?.driver?.name}?`}</Text>

<View style={{marginTop: 20}} >
<AirbnbRating
  count={5}
  showRating={false}
  defaultRating={0}
  onFinishRating={setRating}
  size={40}
/>

</View>
<View style={{marginVertical: 20,width: "100%"}} >
<TextInput value={review} onChangeText={setReview} style={{
    height: 150,borderWidth: 1,borderColor: "black",
    width: "100%",
    textAlignVertical: "top",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "black",
    padding: 15
}} 
placeholder="Write your feedback"
/>

</View>

</ScrollView>
<View style={{borderTopWidth: 1,padding: 15,borderColor: "lightgrey"}} >
<ApplicationButton
content={"Submit"}
onPress={()=>onSubmit()}
/>
</View>
        </View>
    )
}

export default GiveRating