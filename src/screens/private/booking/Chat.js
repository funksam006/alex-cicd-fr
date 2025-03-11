import { FlatList, Image, Text, TextInput, View } from "react-native"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from "../../../backend/Backend"
import Icon from "../../../components/ui/Icon"
import { Icons } from "../../../common/Icons"

const Chat = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const bookingData = route?.params?.data
    console.log(bookingData);
    const [msg, setMsg] = useState("")
    const [chatList, setChatList] = useState([])
    const [chatData, setChatData] = useState()

    const isFocus = useIsFocused()
    useEffect(() => {
        if (isFocus) {
            getChat()
        }
    }, [isFocus])

    const getChat = () => {
        console.log({
            booking_id: bookingData?.booking_id,
            receiver_id: bookingData?.driver_id
        });
        POST_WITH_TOKEN(API + "chat_with_user",
            {
                booking_id: bookingData?.booking_id,
                receiver_id: bookingData?.driver_id
            },
            (success) => {
                console.log(success);
                setChatData(success)
                setChatList(success?.data)
            },

        )
    }

    const onSend = () => {
        if (!msg) {
            return
        }
        setMsg("")
        POST_WITH_TOKEN(API + "add_chats", {
            booking_id: bookingData?.booking_id,
            receiver_id: bookingData?.driver_id,
            message: msg
        },
            success => {
                console.log(success, "==>>");
                getChat()
            },
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <ApplicationHeader
                // content={<View style={{flexDirection :"row"}} >
                //     <Icon  source={bookingData?.profile_image ?{uri : bookingData?.profile_image } : Icons.person} round size={30} style={{}} />
                //     <Text style={{color: "black",fontSize: 17,marginRight: 15}} >{bookingData?.driver_name}</Text>
                //     </View>}
                content={bookingData?.driver_name}
                image={bookingData?.profile_image ? { uri: bookingData?.profile_image } : Icons.person}
            />
            <FlatList
                data={chatList}
                style={{ flex: 1, backgroundColor: "#F6F8FB", padding: 15 }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: item?.chat_type == "right" ? "black" : "white", maxWidth: "70%", alignSelf: item?.chat_type == "right" ? "flex-end" : "flex-start", marginVertical: 10, borderRadius: 10, padding: 15, }} >
                            <Text style={{ color: item?.chat_type != "right" ? "black" : "white" }} >{item?.message}</Text>
                        </View>
                    )
                }}
            />
            <View style={{ backgroundColor: "white", padding: 15, }} >
                <View style={{ padding: 5, borderRadius: 50, borderColor: "grey", borderWidth: 0.8, paddingHorizontal: 20, flexDirection: "row", alignItems: "center" }} >
                    <TextInput
                        value={msg}
                        onChangeText={setMsg}
                        style={{ color: "black", height: 45, flex: 1 }}
                        placeholder="Type something here"

                    />
                    <Icon source={Icons.chatCamera} size={30} style={{ marginRight: 10 }} />
                    <Icon source={Icons.send} size={30} touchable onPress={() => onSend()} />

                </View>
            </View>
        </View>
    )
}
export default Chat