import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/public/Login";
import OnBoarding from "../screens/public/OnBoarding";
import Welcome from "../screens/public/Welcome";
import Signup from "../screens/public/register/Signup";
import SignOtp from "../screens/public/register/SignOtp";
import ForgotPassword from "../screens/public/forget/ForgotPassword";
import ForgotOtp from "../screens/public/forget/ForgotOtp";
import ResetPassword from "../screens/public/forget/ResetPassword";
import TabNavigation from "./TabNavigation";
import EnterLocation from "../screens/private/home/EnterLocation";
import SavedPlaces from "../screens/private/home/SavedPlaces";
import AddPlaces from "../screens/private/home/AddPlaces";
import TaxiBooking from "../screens/private/home/TaxiBooking";
import VehicleType from "../screens/private/home/VehicleType";
import BookNow from "../screens/private/home/BookNow";
import Coupons from "../screens/private/home/Coupons";
import PaymentMode from "../screens/private/home/PaymentMode";
import SelectLocation from "../screens/private/home/SelectLocation";
import SearchingRide from "../screens/private/home/SearchingRide";
import BookingScreen from "../screens/private/home/BookingScreen";
import CancelRide from "../screens/private/home/CancelRide";
import CMS from "../screens/public/CMS";
import Home from "../screens/private/home/Home";
import DrawerNavigation from "./DrawerNavigation";
import EditProfile from "../screens/private/account/EditProfile";
import FAQ from "../screens/public/FAQ";
import AboutUs from "../screens/public/aboutUs";
import Chat from "../screens/private/booking/Chat";
import TrackRide from "../screens/private/home/TrackRide";
import CompleteRide from "../screens/private/home/RideComplete";
import GiveRating from "../screens/private/home/GiveRating";
import ChangePassword from "../screens/private/account/ChangePassword";
import Help from "../screens/private/home/Help";
import HelpIndex from "../screens/private/home/HelpIndex";
import ContactUs from "../screens/private/ContactUs";
import Notification from "../screens/private/Notification";

const Stack = createStackNavigator()

export const commonActions={
    headerShown: false
}
const RootStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen options={commonActions}  name="OnBoarding" component={OnBoarding} />
            <Stack.Screen options={commonActions}  name="Welcome" component={Welcome} />
            <Stack.Screen options={commonActions}  name="cms" component={CMS} />
            <Stack.Screen options={commonActions}  name="Login" component={Login} />
            <Stack.Screen options={commonActions}  name="Signup" component={Signup} />
            <Stack.Screen options={commonActions}  name="SignOtp" component={SignOtp} />
            <Stack.Screen options={commonActions}  name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen options={commonActions}  name="ForgotOtp" component={ForgotOtp} />
            <Stack.Screen options={commonActions}  name="ResetPassword" component={ResetPassword} />

            {/* after Login */}
            <Stack.Screen options={commonActions}  name="Home" component={Home} /> 
            <Stack.Screen options={commonActions}  name="FAQ" component={FAQ} />
            <Stack.Screen options={commonActions}  name="AboutUs" component={AboutUs} />
            <Stack.Screen options={commonActions}  name="Chat" component={Chat} />
            
            <Stack.Screen options={commonActions}  name="RideComplete" component={CompleteRide} />
            <Stack.Screen options={commonActions}  name="GiveRating" component={GiveRating} />
            <Stack.Screen options={commonActions}  name="TrackRide" component={TrackRide} />
            <Stack.Screen options={commonActions}  name="ChangePassword" component={ChangePassword} />
            <Stack.Screen options={commonActions}  name="Help" component={Help} />
            <Stack.Screen options={commonActions}  name="DrawerNavigation" component={DrawerNavigation} />
            <Stack.Screen options={commonActions}  name="HelpIndex" component={HelpIndex} />
            <Stack.Screen options={commonActions}  name="EditProfile" component={EditProfile} />
            <Stack.Screen options={commonActions}  name="EnterLocation" component={EnterLocation} />
            <Stack.Screen options={commonActions}  name="SavedPlaces" component={SavedPlaces} />
            <Stack.Screen options={commonActions}  name="ContactUs" component={ContactUs} />
            <Stack.Screen options={commonActions}  name="AddPlaces" component={AddPlaces} />
            <Stack.Screen options={commonActions}  name="TaxiBooking" component={TaxiBooking} />
            <Stack.Screen options={commonActions}  name="VehicleType" component={VehicleType} />
            <Stack.Screen options={commonActions}  name="Notification" component={Notification} />
            <Stack.Screen options={commonActions}  name="BookNow" component={BookNow} />
            <Stack.Screen options={commonActions}  name="Coupons" component={Coupons} />
            <Stack.Screen options={commonActions}  name="PaymentMode" component={PaymentMode} />
            <Stack.Screen options={commonActions}  name="SelectLocation" component={SelectLocation} />
            <Stack.Screen options={commonActions}  name="SearchingRide" component={SearchingRide} />
            <Stack.Screen options={commonActions}  name="BookingScreen" component={BookingScreen} />
            <Stack.Screen options={commonActions}  name="CancelRide" component={CancelRide} />
        </Stack.Navigator>
    )
}

export default RootStack

// const Stack = createStackNavigator()

// export const commonActions={
//     headerShown: false
// }
// const RootStack =()=>{
// return(
//     <Stack.Navigator>
//        <Stack.Screen options={commonActions}  name="Tickets" component={Ticket} />
//        <Stack.Screen options={commonActions}  name="TicketList" component={TicketList} />
// </Stack.Navigator>
// )
// }

// export default RootStack