import { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { API, GET } from "../../backend/Backend"
import { ApplicationHeader } from "../../components/ApplicationHeader"
import RenderHTML from "react-native-render-html"
import Icon from "../../components/ui/Icon"
import { Icons } from "../../common/Icons"

const FAQ  =()=>{
    const [data,setData] = useState([])
    const [showIndex,setShowIndex] = useState(null)
    useEffect(()=>{
        setShowIndex(null)
getFAQ()
    },[])
    const getFAQ =()=>{
GET(API+ "faq",
    (success)=>{
        console.log("===Success",success);
        setData(success?.data)
    }
)
    }

    return(
        <View style={{flex:1,}} >
            <ApplicationHeader content={"FAQ"} />
            <FlatList
            data={data}
            style={{padding: 15}}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity style={{backgroundColor: "white",borderRadius: 10,padding :15,marginVertical: 15}} onPress={()=>setShowIndex(index == showIndex ? null: index)} >
                        <View style={{flexDirection: "row",alignItems:"center"}} >
                            <View style={{flex:1}} >
<RenderHTML

source={{html  :`<div style="color:black;font-size: 17px" ><b>${item?.questions}</b></div>`}}
/>
</View>
<Icon source={Icons.backArrow} style={{transform :[{rotate : showIndex == index ? "90deg" : "270deg"}]}} />
</View>
{
    showIndex == index && 
    <View style={{borderTopWidth: 1,borderColor: "lightgrey"}} >
<RenderHTML
source={{html  :`<div style="color:black;font-size: 14px" >${item?.answers}</div>`}}
/>

    </View>
}
                        </TouchableOpacity>
                )
            }}
            />
        </View>
    )
}

export default FAQ