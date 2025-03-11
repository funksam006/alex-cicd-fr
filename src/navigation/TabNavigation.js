import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTab from "./CustomTab";
import Home from "../screens/private/home/Home";
import Account from "../screens/private/account/Account";
import BookingHistory from "../screens/private/BookingHistory";
import MyOffers from "../screens/private/MyOffers";

const Tab = createBottomTabNavigator()

export const commonActions={
    headerShown: false
}
const TabNavigation =()=>{
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle:{
                position: "absolute",
            }
        }} tabBar={(props) => <CustomTab {...props} />} >
            <Tab.Screen options={commonActions}  name="HomeTab" component={Home} />
            <Tab.Screen options={commonActions}  name="BookingHistory" component={BookingHistory} />
            <Tab.Screen options={commonActions}  name="MyOffers" component={MyOffers} />
            <Tab.Screen options={commonActions}  name="Account" component={Account} />
        </Tab.Navigator>
    )
}

export default TabNavigation