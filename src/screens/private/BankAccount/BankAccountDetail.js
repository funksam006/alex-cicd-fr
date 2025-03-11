import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Icons } from "../../../common/Icons"
import Typography from "../../../components/ui/Typography"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { API, GET_WITH_TOKEN } from "../../../backend/Backend"

const BankAccountDetail = () => {
  const navigation = useNavigation()
  const [profileData, setProfileData] = useState()

  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus) {
      getProfile()
    }
  }, [isFocus])

  const getProfile = () => {
    GET_WITH_TOKEN(API + "profile", (success) => {
      console.log("==>>ProfileSUccessData", success.data);
      setProfileData(success?.data)
    })
  }

  const RenderField = ({
    label,
    value
  }) => {
    return (

      <View style={{ padding: 15, paddingVertical: 25, flexDirection: "row", alignItems: "center" }} >
        <View style={{ flex: 1 }} >
          {/* <Icon source={Icons.ownerProfile} size={30} /> */}
          <Typography style={{ marginLeft: 10 }} >{label}</Typography>
          <Typography type="medium" size={17} style={{ marginLeft: 10 }} >{value || "N/A"}</Typography>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", }} >
      <ApplicationHeader content={"Bank Acount"} rightContent="Edit" addIcons={true} source={Icons.edit} onPress={() => navigation.navigate("EditBankDetails", { ...profileData })} />
      <View style={{ backgroundColor: "white" }}  >

        <RenderField label="Bank Name" value={profileData?.bank_name} />
        <RenderField label="Account Holder’s Name" value={profileData?.account_holder_name} />
        <RenderField label="Bank Account Number" value={profileData?.account_no} />
        <RenderField label="Branch" value={profileData?.Branch || profileData?.branch} />
        <RenderField label="IFSC Code" value={profileData?.ifsc} />
        <RenderField label="Register Mobile" value={profileData?.registered_mobile} />

      </View>
    </View>
  )
}

export default BankAccountDetail