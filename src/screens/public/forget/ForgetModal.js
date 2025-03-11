import { Image, Modal, TouchableOpacity } from "react-native"

import { useState } from "react"
import Toast from "react-native-toast-message"


import { useNavigation } from "@react-navigation/native"
import { Icons } from "../../../common/Icons"
import CommonModal from "../../../components/modal/CommonModal"
import Icon from "../../../components/ui/Icon"

import { Colors } from "../../../common/Colors"
import ApplicationTextInput from "../../../components/inputs/ApplicationTextInput"
import { API, POST } from "../../../backend/Backend"
import { ApplicationButton } from "../../../components/ApplicationButton"

const ForgetModal = ({ visible, onClose = () => { }, }) => {
  const [username, setUsername] = useState("")
  const navigation = useNavigation();

  const onCheck = () => {
    if (!!username) {
      var apiData = {
        mobile_no: username,
      };
      POST(
        API + 'foget_password',
        apiData,
        success => {
          Toast.show({
            type: success.status == 1 ? 'success' : 'error',
            text1: success.status == 1 ? 'Success' : 'Error',
            text2: success.message,
          });
          onClose()
          navigation.navigate('ForgotPassword', {
            data: success?.data
          })
        },
        error => {
          console.log(error, '=>>>>>Error');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.message || 'Something went wrong',
          });
        },
        fail => {
          console.log(fail, '=>>>>>Fail');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: fail.message || 'Something went wrong',
          });
        },
      );
    }
  }

  return (
    <CommonModal visible={visible} onClose={onClose} >
      <Icon source={Icons.close} onPress={onClose} size={24} touchable style={{ alignSelf: "flex-end", position: "absolute", top: 15, right: 15, zIndex: 99999999 }} />
      <ApplicationTextInput
        style={{ marginTop: 15 }}
        headingText={'Phone no.'}
        source={Icons.person}
        placeholder={'Enter phone no.'}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <ApplicationButton
        content={'Submit'}
        buttonStyle={{ backgroundColor: Colors.black }}
        onPress={() => onCheck()}
      />
    </CommonModal>
  )
}

export default ForgetModal