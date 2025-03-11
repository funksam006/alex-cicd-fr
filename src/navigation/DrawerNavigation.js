import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";
import CustomDrawer from "./CustomDrawer";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
    useEffect(() => {
        getTocken()
    }, [])
    const getTocken = async () => {
        var token = await AsyncStorage.getItem("TOKEN")
        console.log('tokentoken', token);

    }
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} >
            <Drawer.Screen options={{ headerShown: false }} name="Tab" component={TabNavigation} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation