import { FlatList, View, Image } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { API, GET_WITH_TOKEN } from "../../backend/Backend"
import Typography from "../../components/ui/Typography"
import { ApplicationHeader } from "../../components/ApplicationHeader"

const Notification = () => {

    const [notificationList, setNotificationList] = useState([])
    const isFocus = useIsFocused()
    useEffect(() => {
        if (isFocus) {
            getNotification()
        }
    }, [isFocus])

    // const getNotification = () => {
    //     GET_WITH_TOKEN(API + "notifications", (success) => {
    //         console.log("==>>Notification", success);
    //         setNotificationList(success?.data || [])
    //     })
    // }

    const getNotification = () => {
        GET_WITH_TOKEN(API + "user_notifications", (success) => {
            console.log("==>>Notification", success);
            setNotificationList(success?.data || [])
        })
    }

    return (
        <View >
            <ApplicationHeader content={"Notification"} />
            <FlatList
                data={notificationList}
                style={{ padding: 15 }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flexDirection: "row", elevation: 5, backgroundColor: "white", borderRadius: 10, alignItems: "center", marginVertical: 10, marginHorizontal: 5, padding: 15 }} >
                            {/* <View style={{ marginHorizontal: 10 }} >
                                <Image source={{ uri: item?.image }} style={{ width: 60, height: 60 }} borderRadius={30} resizeMode={"cover"} />
                            </View> */}
                            <View style={{ flex: 1, }} >
                                <Typography size={18} type="semiBold">{item?.title}</Typography>
                                <Typography size={14} >{item?.descriptions}</Typography>
                            </View>
                            {/* {
                                !!item?.unread_count &&
                                <View style={{ backgroundColor: "black", borderRadius: 20, height: 30, width: 30, justifyContent: "center", alignItems: "center", alignSelf: "flex-start" }} >
                                    <Typography type="bold" color="white">{item?.unread_count}</Typography>
                                </View>
                            } */}
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Notification