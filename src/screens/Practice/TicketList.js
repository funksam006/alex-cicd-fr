import { useState } from "react"
import { Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Header } from "./Ticket"
import { useDispatch, useSelector } from "react-redux"
import Typography from "../../components/ui/Typography"
import Icon from "../../components/ui/Icon"
import { Images } from "../../common/Images"
import { Icons } from "../../common/Icons"
import { updateTickets } from "../../../features/authReducer"

const TicketList =({navigation})=>{
    const ticketList = useSelector((res) => res?.auth?.tickets)
    const dispatch = useDispatch()
const onDelete =(i)=>{
    Alert.alert("Delete Ticket?","Are you sure you want to delete this ticket?",[{
        text:"NO",
    },
    {
        text: "YES",
        onPress: ()=>deleteItem(i)
    }
])
}

const deleteItem =(i)=>{
    var arr= [...ticketList]
    arr.splice(i,1)
    dispatch(updateTickets(arr))

}

    return(
        <View style={{flex: 1,}} >
            <StatusBar translucent backgroundColor={"transparent"} />
            <Header  title=" Ticket"/>
        <View style={{flex: 1,padding: 15}} >
<FlatList 
data={ticketList}
renderItem={({item,index})=>{
    return(
        <View style={{flexDirection: "row",padding: 15,backgroundColor: "white",marginBottom: 20,borderRadius: 10,alignItems: 'center'}} >

            {
item.map((e)=> <View style={styles.box}  >
    <Typography>{e}</Typography>
    </View>)
            }
            <Icon source={Images.Anywhere} style={{marginHorizontal : 10}} onPress={()=>navigation.navigate("Tickets",{
                item : item,
                index : index
            })} />
            <Icon source={Icons.close} style={{marginHorizontal : 10}} onPress={()=> onDelete(index)}  />
            </View>
    )
}}
/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box :{
        flex: 1,marginRight: 10,backgroundColor: "white",elevation: 6,height: 50,borderRadius: 10,justifyContent: "center",alignItems: "center",marginVertical: 5}
})
export default TicketList