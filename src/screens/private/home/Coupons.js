import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../../common/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ApplicationHeader} from '../../../components/ApplicationHeader';
import {Images} from '../../../common/Images';
import {RobotoFonts} from '../../../common/Fonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../backend/Backend';
import Toast from 'react-native-toast-message';

const Coupons = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [couponArr,setCouponArr] = useState([])
  useEffect(()=>{
    getCoupons()
  },[])

  const getCoupons =()=>{
    GET_WITH_TOKEN(API +"all_cupons",(success)=>{
setCouponArr(success?.data)
console.log(success);
    })
  }

  const onApply =(item)=>{
var apiData ={
  id : route?.params?.vechile_id,
  cupon_id : item?.id
}
POST_WITH_TOKEN(API+"apply_cupon",apiData,
  (success)=>{
    console.log("==>SUCCESS",success);
    setTimeout(() => {
      
      Toast.show({
        type: "success",
        // text1:"Error",
        text2: success?.message
      })
    }, 500);
    navigation.replace("BookNow",route?.params)
  },
  (error)=>{
    console.log("==>error",error);
    Toast.show({
      type: "error",
      text1:"Error",
      text2: error?.message
    })
  },
  (fail)=>{
    console.log("==>fail",fail);
    Toast.show({
      type: "error",
      text1:"Error",
      text2: fail?.message
    })
  },
  
         )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

      <ScrollView>
        <View style={{backgroundColor: Colors.white}}>
          <ApplicationHeader content={'Coupons'} />
        </View>

        <View style={styles.horizontalLine} />

        <FlatList
          data={couponArr}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.couponContainer}>
                <View style={{width: '20%'}}>
                  <Image source={Images.coupon} style={styles.coupon} />
                </View>

                <View style={styles.couponTextContainer}>
                  <Text style={styles.couponHeading}>{item?.name}</Text>
                  <Text style={styles.couponDes}>
                    {item?.description}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity activeOpacity={0.5} onPress={()=>onApply(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  couponContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.white,
  },
  coupon: {
    width: 80,
    height: 78,
    resizeMode: 'contain',
  },
  couponHeading: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: RobotoFonts.bold700,
  },
  couponDes: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: RobotoFonts.regular400,
  },
  couponTextContainer: {
    width: '60%',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.black,
    fontSize: 10,
    fontFamily: RobotoFonts.medium500,
  },
});

export default Coupons;
