import { useRoute } from "@react-navigation/native"
import { View } from "react-native"
import { ApplicationHeader } from "../../components/ApplicationHeader"
import { useEffect, useState } from "react"
import { API, GET, GET_WITH_TOKEN } from "../../backend/Backend"
import RenderHTML from "react-native-render-html"
import WebView from "react-native-webview"

const CMS =()=>{
    const route = useRoute()
    const [cmsData,setCmsData] = useState({})

    useEffect(()=>{
getData()
    },[])

    const getData =()=>{
        GET(API + (route.params?.api =="terms"?  "terms_conditions" : "privacy_policy_user"),(s)=>{
            setCmsData(s?.data)
            console.log(s);
        })
    }

    return(
        <View style={{flex:1,backgroundColor:"white"}}>
<ApplicationHeader content={route.params?.type} />
<View style={{flex: 1,padding: 15}} >
<WebView 

source={{html : `
    <html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0">
    </head>
${cmsData?.description|| ""}
</html>
`}}
/>
        </View>
        </View>
    )
}
export default CMS
