import { Image, ImageBackground, ScrollView, View } from "react-native"
import { Icons } from "../../common/Icons"
import { FULL_WIDTH } from "../../common/Constant"
import Typography from "../../components/ui/Typography"
import Icon from "../../components/ui/Icon"
import { useEffect, useState } from "react"
import { API, GET_WITH_TOKEN } from "../../backend/Backend"
import { ApplicationHeader } from "../../components/ApplicationHeader"

const ContactUs =()=>{
    const [data,setData] = useState()

    useEffect(()=>{
getData()
    },[])

    const getData =()=>{
        GET_WITH_TOKEN(API + "contact_us",(success)=>{
            console.log("==>success",success);
            setData(success?.data)
        })
    }

    return(
        <View style={{flex :1}} >
<ImageBackground
source={Icons.contactUser}
style={{height: 300,width: "100%",resizeMode: "cover"}}
>
    <ApplicationHeader mainStyle={{backgroundColor : "transparent",borderBottomWidth: 0}}   content={"Contact Us"} color="white" />
    </ImageBackground>
    <ScrollView style={{flex: 1,zIndex: 99999,bottom: 40,}} contentContainerStyle={{flexGrow: 1, padding: 15,zIndex: 99999999}} >
       
       <View style={{backgroundColor: "white", width : FULL_WIDTH*0.7,justifyContent: "center",
        padding: 20,alignItems: "center",alignSelf: "center",borderBlockColor: 10}} >
        <View>
<View>
<View style={{flexDirection :"row",alignItems: "center",marginBottom: 10,alignSelf: "center"}} >
        <Icon source={Icons.call} size={30} style={{marginRight : 8}} />
<Typography type="bold" size={24} >{"Call"}</Typography>

    </View>
    <Typography textAlign={"center"}  type="medium" size={18} > {data?.contact_phone}</Typography>
</View>


<View style={{marginVertical: 20,borderTopWidth: 1,borderBottomWidth: 1, borderColor : "lightgrey",paddingVertical: 20,width: "100%"}} >
<View style={{flexDirection :"row",alignItems: "center",marginBottom: 10,alignSelf: "center"}} >
        <Icon source={Icons.mail} size={30} style={{marginRight : 8}} />
<Typography type="bold" size={24} >{"Email"}</Typography>

    </View>
    <Typography textAlign={"center"}  type="medium" size={18} > {data?.contact_email}</Typography>
</View>


<View style={{marginBottom: 10}} >
<View style={{flexDirection :"row",alignItems: "center",marginBottom: 10,alignSelf: "center"}} >
        <Icon source={Icons.whatsAppBLack}  size={30} style={{marginRight : 8}} />
<Typography type="bold" size={24} >{"Whatsapp"}</Typography>

    </View>
    <Typography textAlign={"center"}  type="medium" size={18} > {data?.contact_whatsapp}</Typography>
</View>

</View>
       </View>
        </ScrollView>
        </View>
    )
}

export default ContactUs