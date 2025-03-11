import React, { isValidElement, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../../../common/Colors';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { Responsive } from '../../../assets/theme/Layout';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { isValidForm, validators } from '../../../backend/Validators';
import { API, POST } from '../../../backend/Backend';
import ApplicationTextInput from '../../../components/inputs/ApplicationTextInput';
import Toast from 'react-native-toast-message';

const BankAccount = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const [bankName, setBankName] = useState("")
  const [name, setName] = useState("")
  const [accountNumber, setAccountNumber] = useState('')
  const [branch, setbranch] = useState('')
  const [ifscCode, setIfscCode] = useState()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [errors, setErrors] = useState({})

  const onSubmit = () => {
    var errorData = {
      bankName: validators.checkRequire("Bank Name", bankName),
      name: validators.checkRequire("Account Holder's Name", name),
      accountNumber: validators.checkNumber("Bank Account Number", accountNumber),
      branch: validators.checkRequire("Branch", branch),
      ifsc : validators.checkRequire("IFSC",ifscCode),
      phoneNumber: validators.checkNumber("Register Phone no.", phoneNumber)
    }
    console.log('route?.params?.user_id>>>>', route?.params?.user_id);
    
    setErrors(errorData)
    console.log(errorData);
    if (isValidForm(errorData)) {
      var apiData = {
        user_id: route?.params?.user_id,
        bank_name: bankName,
        account_holder_name: name,
        account_no: accountNumber,
        branch: branch,
        ifsc: ifscCode,
        registered_mobile: phoneNumber
      }
      console.log(apiData);
      POST(API + "user_bank_details", apiData,
        (success) => {
          console.log(success, '==>SUCCESS Bank');
          navigation.navigate('Login');
        },
        (error) => {
          console.log(error, '==>error Bank');
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message
          })

        },
        (fail) => {
          console.log(fail, '==>fail Bank');
          Toast.show({
            type: "error",
            text1: "Error",
            text2: fail?.message
          })
        },
      )
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ApplicationHeader content={'Bank Account Details'} />
      <View style={styles.horizontalLine} />

      <ScrollView>
        <View style={styles.inputContainer}>
          <ApplicationTextInput
            headingText={'Bank Name'}
            placeholder={'Enter bank name'}
            value={bankName}
            onChangeText={setBankName}
            error={errors?.bankName}
          />

          <ApplicationTextInput
            headingText={'Account Holder’s Name'}
            placeholder={'Enter account holder name'}
            value={name}
            onChangeText={setName}
            error={errors?.name}
          />

          <ApplicationTextInput
            headingText={'Bank Account Number'}
            placeholder={'Enter bank account number'}
            value={accountNumber}
            keyboardType={"number-pad"}
            onChangeText={setAccountNumber}
            error={errors?.accountNumber}
          />

          <ApplicationTextInput
            headingText={'IFSC Code'}
            placeholder={'Enter ifsc code'}
            value={ifscCode}
            onChangeText={setIfscCode}
            error={errors?.ifscCode}
          />

          <ApplicationTextInput
            headingText={'Branch'}
            placeholder={'Enter branch'}
            value={branch}
            onChangeText={setbranch}
            error={errors?.branch}
          />

          <ApplicationTextInput
            headingText={'Register phone no. with bank'}
            placeholder={'Enter register phone no. with bank'}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors?.phoneNumber}
          />

          <View style={{ marginVertical: Responsive.height(30) }}>
            <ApplicationButton
              content={'Submit'}
              buttonStyle={{ backgroundColor: Colors.black }}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  horizontalLine: {
    borderTopColor: Colors.line,
    borderTopWidth: 1,
  },
  inputContainer: {
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.height(20),
  },
});

export default BankAccount;
