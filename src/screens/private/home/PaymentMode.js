import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Colors } from '../../../common/Colors';
import { ApplicationHeader } from '../../../components/ApplicationHeader';
import { Images } from '../../../common/Images';
import { RobotoFonts } from '../../../common/Fonts';
import { Icons } from '../../../common/Icons';
import { useNavigation } from '@react-navigation/native';
import { ApplicationButton } from '../../../components/ApplicationButton';
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';
import Paystack from 'paystack-react-native';

const PaymentMode = ({ route }) => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState();
  const [paymentArr, setPaymentArr] = useState([])
  const [transactionSuccess, setTransactionSuccess] = useState(null);

  const initiatePayment = () => {
    const paymentConfig = {
      email: 'customer@example.com',
      amount: 5000,
      reference: `order_${new Date().getTime()}`,
      key: 'pk_live_88c892797c6e19dd87d0038b601cf4350cee7322',
    };

    Paystack.pay(paymentConfig, response => {
      if (response.status === 'success') {
        setTransactionSuccess(true);
      } else {
        setTransactionSuccess(false);
      }
    });
  };

  useEffect(() => {
    getPaymentMode()
  }, [])

  const getPaymentMode = () => {
    GET_WITH_TOKEN(API + "payment_modes",
      (success) => {
        console.log("==>SUCCESS", success);
        setPaymentArr(success?.data)
      }
    )
  }

  const onSelect = () => {
    if (!!selectedValue?.id) {
      // navigation.navigate('BookNow' ,{...route?.params, payment_mode : selectedValue})
      var apiData = {
        id: route?.params?.vechile_id,
        type: selectedValue?.id
      }
      POST_WITH_TOKEN(API + "set_payment_mode", apiData,
        (success) => {
          console.log("==>SUCCESS", success);
          navigation.replace("BookNow", route?.params)
        },
        (error) => {
          console.log("==>error", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.message
          })
        },
        (fail) => {
          console.log("==>fail", fail);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: fail?.message
          })
        },

      )
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select payment option."
      })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: Colors.white }}>
          <ApplicationHeader content={'Payment Mode'} />
        </View>
        <FlatList
          data={paymentArr}
          renderItem={({ item, index }) => {
            return <View style={styles.paymentCard}>
              <Image source={item?.image ? { uri: item?.image } : Images.mayWallet} style={styles.mayWallet} />

              <Text style={styles.walletText}>{item?.name}</Text>

              <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedValue(item)}>
                <Image source={selectedValue?.id == item.id ? Icons.selected : Icons.unSelected} style={styles.selected} />
              </TouchableOpacity>
            </View>
          }}
        />

        <TouchableOpacity onPress={() => initiatePayment()}>
          <Text>Pay</Text>
        </TouchableOpacity>

        {/* <View style={styles.paymentCard}>
        <Image source={Images.credit} style={styles.mayWallet} />

        <View>
          <Text style={styles.walletText}>Credit Card</Text>
          <Text style={styles.cardnumber}>**** **** **12</Text>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedValue('Credit Card')}>
          <Image source={selectedValue == 'Credit Card' ? Icons.selected : Icons.unSelected} style={styles.selected} />
        </TouchableOpacity>
      </View>

      <View style={styles.paymentCard}>
        <Image source={Images.debit} style={styles.mayWallet} />

        <View>
          <Text style={styles.walletText}>Debit Card</Text>
          <Text style={styles.cardnumber}>**** **** **12</Text>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedValue('Debit Card')}>
          <Image source={selectedValue == 'Debit Card' ? Icons.selected : Icons.unSelected} style={styles.selected} />
        </TouchableOpacity>
      </View>

      <View style={styles.paymentCard}>
        <Image source={Images.airtelMoney} style={styles.mayWallet} />

        <Text style={styles.walletText}>Airtel Money</Text>

        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedValue('Airtel Money')}>
          <Image source={selectedValue == 'Airtel Money' ? Icons.selected : Icons.unSelected} style={styles.selected} />
        </TouchableOpacity>
      </View>

      <View style={styles.paymentCard}>
        <Image source={Images.tigo} style={styles.mayWallet} />

        <Text style={styles.walletText}>Tigo-Pesa</Text>

        <TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedValue('Tigo-Pesa')}>
          <Image source={selectedValue == 'Tigo-Pesa' ? Icons.selected : Icons.unSelected} style={styles.selected} />
        </TouchableOpacity>
      </View> */}
      </ScrollView>

      <View style={styles.footer}>
        <ApplicationButton content={'SELECT & CONTINUE'} onPress={() => {
          onSelect()
        }} />
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  paymentCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mayWallet: {
    height: 34,
    width: 34,
    resizeMode: 'contain',
  },
  walletText: {
    color: "black",
    fontSize: 16,
    fontFamily: RobotoFonts.medium500,
  },
  selected: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  cardnumber: {
    color: Colors.para,
    fontSize: 14,
    fontFamily: RobotoFonts.medium500,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white
  }
});

export default PaymentMode;
