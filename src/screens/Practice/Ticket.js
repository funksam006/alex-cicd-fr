import { useEffect, useState } from "react"
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Images } from "../../common/Images"
import Typography from "../../components/ui/Typography"
import Icon from "../../components/ui/Icon"
import { useDispatch, useSelector } from "react-redux"
import { updateTickets } from "../../../features/authReducer"
import { useIsFocused } from "@react-navigation/native"
export const Header =({title=""})=>{
    return(

    <View style={{height: 70,alignItems: 'center',flexDirection: 'row',backgroundColor: "skyblue",justifyContent: "space-between"}} >
<View  />
<Text style={{fontSize: 19,fontWeight: "medium",color: "white"}} >{title}</Text>

<View  />
    </View>
    )
}

const Ticket =({navigation,route})=>{
    const [ticketVal,setTicketVal] = useState([])
    const dispatch = useDispatch()
    const ticketData = useSelector((res) => res?.auth?.tickets)
const isFocus = useIsFocused()
const routeData = route?.params
    useEffect(()=>{
if (isFocus) {
    console.log(routeData);
    
    if (routeData?.item) {
        setTicketVal(routeData?.item)
    }
    
}
    },[isFocus])


const findVal =(val)=> {
    var arr = [...ticketVal]
    var findIndex  = arr.findIndex((e)=> e==val)
return findIndex>=0
}
    const setMultiple =(val)=>{
        var arr = [...ticketVal]
        var findIndex  = arr.findIndex((e)=> e==val)
        // if (findIndex >= 0 ) {
        //     arr.splice(findIndex,1)
        // }else{
        if (arr.length < 5) {
            
            arr.push(val)
        }
        // }
        setTicketVal(arr)



    }
    const randomIntArrayInRange = (min = 1, max=36, n = 5) =>{

     var arr=     Array.from(
          { length: n },
          (e) => Math.floor(Math.random() * (max - min + 1)) + min
        );
        setTicketVal(arr)
    }
      
    const onAdd =()=>{
        if (ticketVal.length < 5) {

            return
        }   
        var arr =[...ticketData]
        if (!!routeData) {
            arr[routeData?.index] = ticketVal
        }else{

            arr.push(ticketVal)
        }
        console.log(arr);
        
        dispatch(updateTickets(arr))
        navigation.navigate("TicketList")
    }


    return(
        <View style={{flex: 1,}} >
            <StatusBar translucent backgroundColor={"transparent"} />
            <Header  title="Create Ticket"/>
            <View style={{flex: 1,}} >
                <View style={{marginVertical: 20,flex: 1,
                    padding: 15,justifyContent: 'center',alignItems: 'center'}} >
                    <Typography textAlign={"center"} size={16}>{"Pick Any Five Number"}</Typography>
                <View style={{flexDirection: 'row',marginTop: 10,alignItems: 'center'}} >
                    
                    <View style={{flex: 1,flexDirection: 'row',}} >  
{
[1,2,3,4,5].map((e,i)=> <View style={styles.box} >
    <Typography  >{ticketVal[i] || ""}</Typography>
    </View>)
}
</View>
<Icon source={Images.Anywhere} onPress={()=>randomIntArrayInRange()}  />

                </View>
                </View>
                <View style={{marginBottom: 20,backgroundColor: "white",padding: 15,borderTopRightRadius: 20,borderTopLeftRadius: 20}} >
                    <View style={{flexDirection: 'row',}} >
<TouchableOpacity style={[styles.box,{borderWidth: 1,borderColor: "blue"}]} onPress={()=>setTicketVal([])} >
<Typography color="blue" >{"Clear"}</Typography>
</TouchableOpacity>
<TouchableOpacity style={[styles.box,{borderWidth: 1,borderColor: "blue"}]} onPress={()=> onAdd()} >
<Typography color="blue" >{"Add To Cart"}</Typography>

</TouchableOpacity>
                    </View>
<FlatList
data={ new Array(36)}
numColumns={6}
renderItem={({index})=>{
    return(
        <TouchableOpacity style={[styles.box,{backgroundColor: findVal(index+1) ? "blue" : "white"}]} onPress={()=> setMultiple(index+1)} >
            <Typography color={ findVal(index+1) ? "white" : "black"} >{index+1}</Typography>
</TouchableOpacity>
    )
}}
/>
                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    box :{
        flex: 1,marginRight: 7,backgroundColor: "white",elevation: 6,height: 50,borderRadius: 10,justifyContent: "center",alignItems: "center",marginVertical: 5}
})
export default Ticket