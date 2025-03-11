import React, { useCallback } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, ScrollView, TextInput } from "react-native"
import { FULL_HEIGHT, FULL_WIDTH } from "../../../common/Constant"
import Typography from "../../../components/ui/Typography"
import { ApplicationHeader } from "../../../components/ApplicationHeader"
import { useEffect, useState } from "react"
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from "../../../backend/Backend"
import { Colors } from "../../../common/Colors"
import Toast from 'react-native-toast-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MyWallet = () => {
  const [transList, setTransList] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [withDrawModal, setWithDrawModal] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getTransactionList();
    }, [])
  )

  const getTransactionList = () => {
    GET_WITH_TOKEN(API + "wallet_details", (success) => {
      setTransList(success)
    })
  }

  const post_addwallet = () => {
    setShowModal(!showModal);
    POST_WITH_TOKEN(API + "add_wallet_amt",
      {
        amount: amount
      },
      (success) => {

        getTransactionList();
        if (success?.data?.payment_url) {
          setAmount('')
          navigation.navigate("PaystackWebViewScreen", {
            paymentUrl: success?.data?.payment_url,
          });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Payment URL not found",
          });
        }
      },
      (error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
      }
    )
  }

  const withDrawAmmount = () => {
    POST_WITH_TOKEN(API + "withdrawal_amount_request",
      {
        amount: amount
      },
      (success) => {

        getTransactionList();
        setAmount('');
        setWithDrawModal(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: success?.message
        })
      },
      (error) => {
        console.log('error>>>', error);
        setErrorMessage(error?.message)
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error?.message
        })
      }
    )
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.trans}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography size={16} type="medium500">{item?.payment_type}</Typography>
          <Typography size={20} type="bold700" color={item?.transaction_type == 1 ? '#2BA24C' : '#FF0303'}>{'R ' + item?.amount}</Typography>
        </View>
        <Typography size={14} type="regular400">{item?.transaction_date}</Typography>
      </View>
    )
  }
  return (
    <ScrollView>
      <ApplicationHeader content={"My Wallet"} />
      <View style={styles.balanceCont}>
        <Typography size={14} type="regular400" color="white" textAlign={'center'} style={{ marginTop: 25 }}>Total Available Balance</Typography>
        <Typography size={48} type="bold700" color="white" textAlign={'center'} style={{ marginTop: 10 }}>{transList?.wallet_amount}</Typography>
        <TouchableOpacity onPress={() => setShowModal(!showModal)} style={styles.addBtn}>
          <Typography size={18} type="regular400" color="white" textAlign={'center'}>Add Money</Typography>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setWithDrawModal(!withDrawModal)} style={[styles.addBtn, { width: '75%', marginBottom: 20 }]}>
          <Typography size={18} type="regular400" color="white" textAlign={'center'}>Withdraw to Bank Account</Typography>
        </TouchableOpacity>

      </View>
      <Typography size={16} type="regular400" style={{ marginLeft: 25, marginTop: 25, marginBottom: 15 }}>Transaction History</Typography>
      <FlatList
        data={transList?.transaction_history}
        key={item => item.id}
        renderItem={renderItem}
      />
      {showModal &&
        <Modal transparent={true}>
          <TouchableWithoutFeedback onPress={() => { setWithDrawModal(false), setShowModal(false) }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                justifyContent: 'center'
              }}>
              <View style={{ width: FULL_WIDTH * 0.9, backgroundColor: Colors.white, alignSelf: 'center', borderRadius: 10, padding: 20 }}>
                <TextInput placeholder='Enter amount' style={styles.input} inputMode={'numeric'} value={amount} onChangeText={(text) => setAmount(text)} />
                <TouchableOpacity onPress={() => post_addwallet()} style={styles.addBtn}>
                  <Typography size={18} type="regular400" color="white" textAlign={'center'}>Submit</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      }

      {withDrawModal &&
        <Modal transparent={true}>
          <TouchableWithoutFeedback onPress={() => { setWithDrawModal(false), setShowModal(false) }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
                justifyContent: 'center'
              }}>
              <View style={{ width: FULL_WIDTH * 0.9, backgroundColor: Colors.white, alignSelf: 'center', borderRadius: 10, padding: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Typography size={18} type="regular400" textAlign={'center'}>Total Available Balance: </Typography>
                  <Typography size={18} type="regular400" textAlign={'center'}>{transList?.wallet_amount}</Typography>
                </View>
                <TextInput placeholder='Enter amount' style={styles.input} inputMode={'numeric'} value={amount} onChangeText={(text) => {setAmount(text), setErrorMessage('')}} />

                {errorMessage ? (
                  <Typography size={16} type="regular400" color="red" textAlign="center" style={{ marginBottom: 10 }}>
                    {errorMessage}
                  </Typography>
                ) : null}

                <TouchableOpacity onPress={withDrawAmmount} style={styles.addBtn}>
                  <Typography size={18} type="regular400" color="white" textAlign={'center'}>Submit</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      }

    </ScrollView>
  )
}

export default MyWallet

const styles = StyleSheet.create({
  balanceCont: {
    width: FULL_WIDTH * 0.9,
    height: FULL_HEIGHT * 0.315,
    backgroundColor: '#5470F2',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 25
  },
  addBtn: {
    width: FULL_WIDTH * 0.5,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'darkblue',
    alignItem: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  },
  trans: {
    width: FULL_WIDTH * 0.9,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
    alignSelf: 'center'
  },
  input: {
    width: FULL_WIDTH * 0.8,
    padding: 10,
    borderWidth: 2,
    borderColor: '#5470F2',
    borderRadius: 10,
    marginBottom: 25,
    color: Colors.black
  }
})