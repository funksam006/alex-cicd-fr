import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image, Text, Share, Linking, TouchableOpacity, View, FlatList, StyleSheet, Alert } from "react-native"
import { Icons } from "../common/Icons"
import { Colors } from "../common/Colors"
import { InterFonts } from "../common/Fonts"
import { useState } from "react"
import Icon from "../components/ui/Icon"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"

const CustomDrawer = () => {
  const navigation = useNavigation()
  const profileData = useSelector((res) => res?.auth?.userData)

  const onShare = async () => {
    try {
      const shareLink = profileData?.share_link;
      if (!shareLink) {
        Alert.alert("Error", "No share link available");
        return;
      }

      const result = await Share.share({
        message: `Install the app using this link: ${shareLink} and use referral code: ${profileData?.referral_code}`,
      });

      if (result.action === Share.sharedAction) {
        console.log("Link shared successfully!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const openPlayStore = () => {
    const url = `https://play.google.com/store/apps/details?id=com.bookingalexuser&pcampaignid=web_share`;
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", }} >
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.black, padding: 15 }} >
        {profileData?.profile ?
          <Image source={{ uri: profileData?.profile }} style={{ height: 50, width: 50, borderWidth: 1, borderColor: "white" }} borderRadius={25} />
          : <Image source={Icons.person} style={{ height: 50, width: 50, borderWidth: 1, borderColor: "white" }} borderRadius={25} />}
        <View style={{ marginLeft: 10, paddingVertical: 15, flex: 1 }} >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }} > {profileData?.name}</Text>
          <Text style={{ color: "white", fontSize: 14, }} > {profileData?.email}</Text>
        </View>

      </View>
      <View style={styles.horizontalLine} />
      <FlatList
        data={[
          {
            name: "Saved Places",
            icon: Icons.drawerSaved,
            navigate: "SavedPlaces"
          },
          {
            name: "Notification",
            icon: Icons.drawerNotificaction,
            navigate: "Notification"
          },
          {
            name: "My Wallet",
            icon: Icons.drawerPayment,
            navigate: "MyWallet"
          },

          {
            name: "Bank Account",
            icon: Icons.bankIcon,
            navigate: "BankAccountDetail"
          },
          // {
          //   name : "Payment Options",
          //   icon : Icons.drawerPayment
          // },
          {
            name: "Help",
            icon: Icons.drawerHelp,
            navigate: "Help",

          },
          {
            name: "Contact us",
            icon: Icons.drawerContact,
            navigate: "ContactUs"
          },
          {
            name: "About us",
            icon: Icons.drawerAboutUs,
            navigate: "AboutUs"
          },

          {
            name: "FAQ",
            icon: Icons.drawerFaq,
            navigate: "FAQ"
          },
          {
            name: "Rate Application",
            icon: Icons.drawerRating,
          },
          {
            name: "Share Application",
            icon: Icons.drawerShare
          },
          {
            name: "Logout",
            icon: Icons.logout,
          },
        ]}
        style={{ flex: 1, padding: 15 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              if (item.name == "Logout") {
                Alert.alert("Logout", "Are you sure you want to logout?", [{
                  text: "NO"
                }, {
                  text: "YES",
                  onPress: () => {
                    AsyncStorage.removeItem("TOKEN")
                    navigation.reset({
                      routes: [{ name: "Login" }]
                    })
                  }
                }])
              } else if (item.name === 'Share Application') {
                onShare()
              } else if (item.name === 'Rate Application') {
                openPlayStore()
              }
              else if (!!item?.navigate) {
                navigation.navigate(item.navigate, item?.params)
              }
            }} style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }} >
              <Icon source={item.icon} />
              <Text style={{ marginLeft: 10, fontSize: 16, color: item.name == "Logout" ? "red" : "black", fontWeight: "medium" }} >{item?.name}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sideHeaderIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  headerContainer: {
    position: 'absolute',
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sideCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    backgroundColor: Colors.white,
    width: '100%',
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    justifyContent: 'center',
  },
  footer: {
    height: 150,
    width: '100%',
    backgroundColor: Colors.white,
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
  location: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  locationText: {
    color: Colors.black,
    fontSize: 15,
    flex: 1,
    fontFamily: InterFonts.regular400,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 10,
  },
  mapContainer: {
    height: '85%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  enterText: {
    color: Colors.para,
    fontFamily: InterFonts.regular400,
    fontSize: 16,
  },
});
export default CustomDrawer