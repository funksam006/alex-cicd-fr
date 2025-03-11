import { ScrollView, View } from "react-native"
import { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import ApplicationTextInput from "../../../components/inputs/ApplicationTextInput"
import { isValidForm, validators } from "../../../backend/Validators"
import { ApplicationButton } from "../../../components/ApplicationButton"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { API, POST_WITH_TOKEN } from "../../../backend/Backend"
import Toast from "react-native-toast-message"

const EditBankDetails = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const routeData = route.params
  const [bankName, setBankName] = useState(routeData?.bank_name)
  const [accountHolderName, setaccountHolderName] = useState(routeData?.account_holder_name)
  const [bankAccountNumber, setbankAccountNumber] = useState(`${routeData?.account_no || ""}`)
  const [branch, setbranch] = useState(routeData?.branch)
  const [ifsc, setifsc] = useState(routeData?.ifsc)
  const [phoneNumber, setPhoneNumber] = useState(routeData?.registered_mobile)
  const [errorData, setErrorData] = useState({
    bank_name: "",
    account_holder_name: "",
    accout_no: "",
    branch: "",
    ifsc: "",
    phoneNumber: ""
  })

  const updateBankDetail = () => {
    var errors = {
      bank_name: validators.checkRequire("Bank Name", bankName),
      account_holder_name: validators.checkRequire("Account Holder's Name", accountHolderName),
      accout_no: validators.checkNumber("Account Number", bankAccountNumber),
      branch: validators.checkRequire("Branch", branch),
      ifsc: validators.checkRequire("IFSC", ifsc)
    }
    setErrorData(errors)
    if (isValidForm(errors)) {
      var apiData = {
        user_id: routeData?.id,
        bank_name: bankName,
        account_holder_name: accountHolderName,
        account_no: bankAccountNumber,
        branch: branch,
        ifsc: ifsc,
        registered_mobile: phoneNumber
      }
      console.log('apiData >>>>>', apiData);

      POST_WITH_TOKEN(API + "user_bank_details", apiData,
        (success) => {
          console.log('success>>>>', success.data);

          navigation.goBack()
        },
        (error) => {
          console.log('error>>>>>', error);

          Toast.show({
            type: "error",
            text1: error?.message || "Somthing went wrong"
          })

        },
        (fail) => {
          Toast.show({
            type: "error",
            text1: fail?.message || "Somthing went wrong"
          })
        },
      )
    }
  }

  return (
    <View style={{ flex: 1 }} >
      <ApplicationHeader content={"Edit Bank Details"} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, padding: 15, backgroundColor: "white" }} >
        <ApplicationTextInput headingText="Bank Name" value={bankName} onChangeText={setBankName} placeholder={"Enter Bank Name"} error={errorData?.bank_name} />

        <ApplicationTextInput headingText="Account Holder's Name" value={accountHolderName} onChangeText={setaccountHolderName} placeholder={"Enter Account Holder's Name"} error={errorData?.account_holder_name} />


        <ApplicationTextInput headingText="Bank Account Number" value={bankAccountNumber} onChangeText={setbankAccountNumber} placeholder={"Enter Bank Account Number"} error={errorData?.accout_no} />


        <ApplicationTextInput headingText="Branch" value={branch} onChangeText={setbranch} placeholder={"Enter Branch"} error={errorData?.branch} />


        <ApplicationTextInput headingText="IFSC Code" value={ifsc} onChangeText={setifsc} placeholder={"Enter IFSC Code"} error={errorData?.ifsc} />

        <ApplicationTextInput keyboardType="numeric" headingText="Register Mobile" value={phoneNumber} onChangeText={setPhoneNumber} placeholder={"Enter Register Mobile"} error={errorData?.phoneNumber} />


        <ApplicationButton
          content={"Submit"}
          onPress={() => {
            updateBankDetail()
          }}
        />
      </ScrollView>
    </View>
  )
}

export default EditBankDetails