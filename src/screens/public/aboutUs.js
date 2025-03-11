import { FlatList, View } from "react-native"
import { ApplicationHeader } from "../../components/ApplicationHeader"
import { useEffect, useState } from "react"
import { API, GET } from "../../backend/Backend"
import RenderHTML from "react-native-render-html"

const AboutUs =()=>{
    const [data,setData]=useState()

    useEffect(()=>{
getFAQ()
    },[])
    const getFAQ =()=>{
GET(API+ "about_us",
    (success)=>{
        console.log("===Success",success);
        setData(success?.data)
    }
)
    }
    return(
        <View style={{flex:1,backgroundColor: "white"}} >
<ApplicationHeader content={"AboutUs"} />
<FlatList
data={data}
style={{padding: 15,paddingTop: 0}}
renderItem={({item})=>{
    return(
        <RenderHTML source={{html: `<div style="color :black;font-size :16px" >${item?.aboutus}</div>`}} />
    )
}}
/>
        </View>
    )
}

export default AboutUs