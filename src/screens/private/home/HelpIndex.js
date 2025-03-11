import { useNavigation, useRoute } from "@react-navigation/native"

import Typography from "../../../components/ui/Typography"
import Icon from "../../../components/ui/Icon"
import { Icons } from "../../../common/Icons"
import { View } from "react-native"
import { ApplicationHeader } from "../../../components/ApplicationHeader"

const HelpIndex =()=>{
    const navigation = useNavigation()
    const route = useRoute()

    const routeData = route?.params

    console.log(routeData);

    return(
        <View style={{flex : 1,}}  >
<ApplicationHeader content={routeData?.name} />
<View style={{flex:1}} >
<View style={{backgroundColor :"white",padding: 20,justifyContent: "center",alignItems: "center",paddingVertical: 35,borderBottomWidth: 0.6,borderColor: "lightgrey"}} >
    <View style={{flexDirection :"row",alignItems: "center",marginBottom: 10}} >
        <Icon source={Icons.call} size={30} style={{marginRight : 8}} />
<Typography type="bold" size={24} >{"Call"}</Typography>

    </View>
    <Typography type="medium" size={18} > {routeData?.number}</Typography>
</View>


<View style={{backgroundColor :"white",padding: 20,justifyContent: "center",alignItems: "center",paddingVertical: 35,borderBottomWidth: 0.6,borderColor: "lightgrey"}} >
    <View style={{flexDirection :"row",alignItems: "center",marginBottom: 10}} >
        <Icon source={Icons.mail} size={30} style={{marginRight : 8}} />
<Typography type="bold" size={24} >{"Email"}</Typography>

    </View>
    <Typography type="medium" size={18} > {routeData?.email}</Typography>
</View>


</View>
        </View>
    )
}

export default HelpIndex